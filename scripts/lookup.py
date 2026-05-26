"""
lookup.py — Pre-read oracle for agent R5 tier lookups.

Returns ranked matches (file + line + read_hint) before any Read call.
Agents use this as T0 BEFORE the T1/T2/T3 grep tiers in editor/SKILL.md.

Usage:
    python scripts/lookup.py "JobDashboard"            # exact symbol
    python scripts/lookup.py "job dashboard"           # keyword search
    python scripts/lookup.py --file "SiteJobDashboard" # file search
    python scripts/lookup.py --raw "job"               # all matches, no ranking

Output: JSON array sorted by score desc, each item:
  {
    "type":      "symbol" | "file",
    "name":      "<symbol or filename>",
    "file":      "src/components/...",
    "line":      42,
    "line_end":  98,
    "read_hint": {"offset": 37, "limit": 60},
    "keywords":  [...],
    "score":     3
  }
"""

import json
import re
import sys
from pathlib import Path

PROJECT_ROOT = Path("/Volumes/BriteBrain/Projects/Asset Plan")
INDEX_VARS = PROJECT_ROOT / "knowledge/index_variables.json"
INDEX_FILES = PROJECT_ROOT / "knowledge/index_files.json"

CAMEL_RE = re.compile(r"(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])")


def tokenize(text: str) -> list[str]:
    """Split query into searchable tokens."""
    # Split on spaces + camelCase
    words = re.split(r"[\s_\-/\.]+", text)
    tokens = []
    for w in words:
        parts = CAMEL_RE.split(w)
        tokens.extend([p.lower() for p in parts if p])
    return [t for t in tokens if len(t) > 1]


def load_index(path: Path) -> dict:
    if not path.exists():
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def score_symbol(entry: dict, tokens: list[str], query_exact: str) -> int:
    """Score a symbol entry against query tokens."""
    score = 0
    name = entry.get("name", "")
    keywords = [k.lower() for k in entry.get("keywords", [])]
    source = entry.get("source", entry.get("file", ""))

    # Exact name match = highest priority
    if name.lower() == query_exact.lower():
        score += 10

    # Name contains query (partial)
    if query_exact.lower() in name.lower():
        score += 5

    # Token matches against name tokens
    name_tokens = [t.lower() for t in CAMEL_RE.split(name) if t]
    for t in tokens:
        if t in name_tokens:
            score += 3
        if t in keywords:
            score += 2
        if t in source.lower():
            score += 1

    return score


def search_symbols(query: str, top_n: int = 8) -> list[dict]:
    data = load_index(INDEX_VARS)
    variables = data.get("variables", {})
    tokens = tokenize(query)
    results = []

    for name, entry in variables.items():
        entry["name"] = name
        s = score_symbol(entry, tokens, query)
        if s > 0:
            results.append((s, entry))

    results.sort(key=lambda x: -x[0])
    out = []
    for score, entry in results[:top_n]:
        read_hint = entry.get("read_hint", {})
        if not read_hint:
            line = entry.get("line", 1)
            line_end = entry.get("line_end", line + 60)
            read_hint = {"offset": max(1, line - 5), "limit": min(80, line_end - line + 15)}
        out.append({
            "type": "symbol",
            "name": entry["name"],
            "file": entry.get("source", entry.get("file", "?")),
            "line": entry.get("line"),
            "line_end": entry.get("line_end"),
            "read_hint": read_hint,
            "keywords": entry.get("keywords", []),
            "score": score,
        })
    return out


def score_file(key: str, entry: dict, tokens: list[str], query_exact: str) -> int:
    """Score a file entry against query tokens."""
    score = 0
    desc = entry.get("description", "").lower()
    kw = [k.lower() for k in entry.get("keywords", [])]
    key_lower = key.lower()

    if query_exact.lower() in key_lower:
        score += 6
    for t in tokens:
        if t in key_lower:
            score += 3
        if t in kw:
            score += 2
        if t in desc:
            score += 1

    # Section name matches
    for sec in entry.get("key_sections", []):
        sec_name = sec.get("name", "").lower()
        for t in tokens:
            if t in sec_name:
                score += 2

    return score


def search_files(query: str, top_n: int = 5) -> list[dict]:
    data = load_index(INDEX_FILES)
    tokens = tokenize(query)
    results = []

    for key, entry in data.items():
        if not isinstance(entry, dict):
            continue
        s = score_file(key, entry, tokens, query)
        if s > 0:
            results.append((s, key, entry))

    results.sort(key=lambda x: -x[0])
    out = []
    for score, key, entry in results[:top_n]:
        sections = entry.get("key_sections", [])
        # Find best matching section
        best_section = None
        best_sec_score = 0
        tok_set = set(tokens)
        for sec in sections:
            sec_tokens = set(tokenize(sec.get("name", "")))
            overlap = len(tok_set & sec_tokens)
            if overlap > best_sec_score:
                best_sec_score = overlap
                best_section = sec

        if best_section:
            read_hint = best_section.get("read_hint", {})
            line = best_section.get("line")
        else:
            read_hint = {}
            line = entry.get("line")

        out.append({
            "type": "file",
            "name": key,
            "file": key,
            "line": line,
            "line_end": None,
            "read_hint": read_hint,
            "keywords": entry.get("keywords", []),
            "best_section": best_section.get("name") if best_section else None,
            "score": score,
        })
    return out


def format_human(results: list[dict]) -> str:
    if not results:
        return "No matches found."
    lines = []
    for r in results:
        rh = r.get("read_hint") or {}
        hint = f"offset={rh.get('offset','?')} limit={rh.get('limit','?')}" if rh else "no hint"
        sec = f" [{r['best_section']}]" if r.get("best_section") else ""
        lines.append(
            f"[score={r['score']}] {r['type'].upper()} `{r['name']}`{sec}\n"
            f"  file: {r['file']}\n"
            f"  line: {r.get('line','?')}  read_hint: {hint}"
        )
    return "\n\n".join(lines)


def main():
    args = sys.argv[1:]
    if not args or args[0] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)

    file_only = "--file" in args
    raw = "--raw" in args
    json_out = "--json" in args
    flags = {"--file", "--raw", "--json"}
    query_parts = [a for a in args if a not in flags]
    query = " ".join(query_parts)

    if not query:
        print("Usage: python scripts/lookup.py <query> [--file] [--raw] [--json]")
        sys.exit(1)

    sym_results = [] if file_only else search_symbols(query)
    file_results = search_files(query)
    combined = sym_results + file_results
    combined.sort(key=lambda x: -x["score"])

    if json_out:
        print(json.dumps(combined, indent=2))
    else:
        print(f"Query: \"{query}\"  →  {len(combined)} match(es)\n")
        print(format_human(combined))


if __name__ == "__main__":
    main()
