# Gather Complete — T-196 Core/Domain Separation

date: 2026-06-15
task: Split core harness (project-agnostic) from coding-specific skills/tools into a swappable domain pack
skill: harness_editor (planning by harness_doc_auditor)
status: gather-done (design+plan phase only · execution deferred per user)

## Objective
Extract every coding-specific rule, skill, and tool out of the project-agnostic core so the
harness can be reused for non-coding projects (e.g. construction quantity-takeoff) by swapping
in a different `domain/<name>.md` pack. Core engine (Boot, routing, loop, tokens, MECE, CFP,
gates framework, index sync) stays untouched and works for any project.

## Constraints (hard)
- LOW/MEDIUM-tier model followable: every moved rule keeps its FULL commands/paths/thresholds
  INLINE inside `domain/coding.md` — never replaced by a bare pointer.
- MOVE != DELETE: every rule removed from core MUST reappear in the pack (S1 verify enforces).
- Core-file edits reset the prompt cache → batch all core edits, never trickle.
- Co-config step: the user's AI must configure the domain WITH the user (extend existing
  detected.md provider flow in Implement/02_setup.md).

## Affected files (from Phase 1 grep sweep)
Core rule files (coding contamination found):
- CLAUDE.md: R14 (src/ paths), R15 (DB Hard Stop — TS types, src/db/, fully coding)
- AGENTS.md: L2 (Next.js note), L234-236 (Critical Project Rules: Miniflare D1 / Edge / PapaParse)
Implement/ docs with coding hardcode (hit counts): 01(2) 02(5) 03(7) 04(4) 05(3) 08(1)
Skills to relocate (coding-domain): coder, editor, variable_manager
Tools/scripts to relocate (coding-domain): scripts/code_graph.py, scripts/symbol_indexer.py
Existing anchors to reuse: Implement/02_setup.md (detected.md co-config step + docs/domain_rules.md placeholder)

## Classification (final · user-confirmed)
- repo_researcher -> CORE (user decision: general repo survey, not coding-only)
- Decision rule: works on code syntax/symbols/imports/.ts/.py/linter -> coding pack;
  works on files/sessions/tokens/harness rules -> core.

## Acceptance criteria
1. domain/_TEMPLATE.md + domain/coding.md exist; coding.md holds DB gate + 3 Critical Rules + Next.js note INLINE.
2. grep -icE "miniflare|next\.js|src/db|papaparse" CLAUDE.md AGENTS.md -> 0 (core clean).
3. Implement/ files point to the pack instead of hardcoding coding specifics.
4. Implement/02_setup.md has a domain-pack selection co-config step.
5. coder/editor/variable_manager + code_graph.py/symbol_indexer.py registered under the coding pack; core manifests no longer list them as core.
6. No rule lost: each removed core rule is present in coding.md.
