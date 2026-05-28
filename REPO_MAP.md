# REPO_MAP.md — Repository Structure

> Reference map for all agents. Full-Read permitted (see Never-Full-Load rule).
> Update when adding/removing top-level directories or harness files.

---

## Root Files

| File | Purpose |
|---|---|
| `CLAUDE.md` | Hard constraints + boot sequence + R1–R16 rules (never re-read at runtime) |
| `AGENTS.md` | Agent orientation, boot sequence detail, loop architecture, sub-agent rules |
| `INVARIANTS.md` | Destructive gates + DB hard stop + invariants I1–I8 (load on-demand at R14/R15) |
| `REPO_MAP.md` | This file — repo layout reference |
| `CODING_FAILURE_PATTERNS.md` | CFP-005–CFP-019 known agent failure modes (grep only · Read ≤30L per entry) |
| `CLAUDE.th.md` | Thai-language version of CLAUDE.md (reference only) |
| `README.md` | Project overview for humans |
| `Implement.md` | Short pointer to Implement/ directory |

---

## Directories

### `.agents/`
Agent configuration and skill library.

```
.agents/
  platform/
    detected.md          ← platform auto-detection (spawn_tool, explore_type, etc.)
    session_protocol.md  ← context window + session boundary rules per provider
  skills/
    skill-manifest.json  ← keyword→skill routing table (grep only at B2)
    registry.md          ← skill list + descriptions
    agent/               ← SKILL.md: orchestrator / parallel fan-out
    ascii_flow/          ← SKILL.md: diagram generation
    coder/               ← SKILL.md: TypeScript/Next.js code writing
    editor/              ← SKILL.md: file editing (current project skill)
    file_manager/        ← SKILL.md: file create/move/delete
    harness_doctor/      ← SKILL.md: structural CFP fix agent
    identity/            ← SKILL.md: project identity / orientation
    mece/                ← SKILL.md: MECE plan template + phase-checklist format
    self_improve/        ← SKILL.md: R16 complaint handler + CFP logging format
    session_manager/     ← SKILL.md: session open/close + compact_state write
    token_auditor/       ← SKILL.md: token budget audit
    token_tracker/       ← SKILL.md: session/chat token tracking
    variable_manager/    ← SKILL.md: symbol create/rename/delete
```

### `.sessions/`
Runtime session state. All files English-only.

```
.sessions/
  active_thread.md      ← task / phase / next (B1 reads at boot)
  mece_plan.md          ← Phase 0–3 checklist + section plan (written at M5)
  session_handoff.md    ← cross-session resume context (skill + sections + resume_at)
  compact_state.md      ← boot cache (dt/sk/sk_h/mece_h/p3) written before /compact
  gather_complete.md    ← date + task written at [✓ gather] (PreToolUse hook checks)
  session_tokens.md     ← SESSION_TOTAL (resets at session close)
  chat_tokens.md        ← CHAT_TOTAL (resets only at /compact or new chat)
  cycle_N_<id>.json     ← sub-agent result files (written by each spawned agent)
```

### `knowledge/`
Index files + error log. Protected zone (I1 gate required for overwrite).

```
knowledge/
  index_files.json      ← file path → exports + backlinks (grep only · never full-read)
  index_variables.json  ← symbol → file + line + type + used_in (grep only)
  index_sessions.json   ← session history + keywords (populated by session_indexer.py)
  index_cfp_fix.json    ← CFP fix tracking keyed by CFP-XXX ID
  error_index.md        ← ERR-XXX entries (grep → Read ≤40L only)
  cfp_archive.md        ← archived CFP-001–CFP-004
```

### `docs/`

```
docs/
  master_roadmap.md     ← T-N task ledger (grep -n or tail -30 · never full-read)
```

### `scripts/`
Python automation. Run after symbol/session changes (R8 index sync).

```
scripts/
  lookup.py             ← T0 index-first lookup (R5): python scripts/lookup.py "<keyword>" --json
  symbol_indexer.py     ← regenerates index_variables.json + index_files.json
  session_indexer.py    ← appends to index_sessions.json at session close
```

### `src/`
Application source code. Currently empty — Next.js app will live here.
Protected: I1 gate for delete/overwrite · I2 hard stop for src/db/ edits.

### `Implement/`
Human-readable implementation guides for bootstrapping the harness on a new project.

```
Implement/
  00_index.md       ← guide index + reading order
  01_overview.md    ← architecture overview
  02_setup.md       ← step-by-step setup checklist
  03_config.md      ← CLAUDE.md + AGENTS.md full config reference
  04_skills.md      ← all SKILL.md specs
  05_scripts.md     ← scripts spec
  06_orchestrator.md ← orchestrator + MECE plan protocol
  07_platform.md    ← platform adapter + session routing
  08_checklist.md   ← verification checklist for implemented harness
```
