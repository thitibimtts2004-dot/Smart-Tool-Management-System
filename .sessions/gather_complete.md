date: 2026-06-22
objective: T-224 — add a design-DECISION rejection log so settled "we decided NOT to build X" debates are not reopened. ONE file knowledge/out_of_scope.md (problem/rationale/refs per rejected idea), complementing CFP which only logs bugs. Mirror the T-229 glossary discipline: grep-first lookup → append-on-new-rejection → NEVER always-loaded.
constraints:
  - ONE file knowledge/out_of_scope.md — NOT a dir, NOT a new skill, NOT a new script/hook (roadmap line 814 MERGES/FOLDS verdict — T-224 simplified)
  - on-demand grep only — NEVER always-load (adds per-turn token weight · contradicts leanness · this exact pattern was rejected for CONTEXT.md glossary, roadmap 815e)
  - reuse existing owners: scrutinize already owns the simpler-way / reject discipline → wire read+write there, do not invent a new gate
  - seed content already exists: the 6 rejected ideas (a)-(f) in roadmap line 815 ARE the first entries (roadmap says so explicitly)
affected_files:
  - knowledge/out_of_scope.md  (NEW — usage-contract header + 6 seed entries)
  - .agents/skills/harness/scrutinize/SKILL.md  (Simpler-Way Pass: grep out_of_scope first · reject verdict → append entry)
  - knowledge/index_files.json  (R8 — register the new knowledge file)
  - docs/master_roadmap.md  (T-224 [ ]→[X])
out_of_scope:
  - a .out-of-scope/ directory or any new skill/script/hook (the ORIGINAL T-224 shape — already rejected/folded to one file · roadmap 814)
  - always-loading out_of_scope.md into every turn (rejected — leanness · roadmap 815e)
  - editing CLAUDE.md R-Roadmap as the primary home (heavy core file · scrutinize is the lighter natural owner) — at most a 1-line pointer, only if needed
  - any src/ file
acceptance_criteria:
  - knowledge/out_of_scope.md exists with a grep-first/append usage-contract header + the 6 seed entries (a)-(f), each with problem/rationale/refs
  - scrutinize SKILL.md instructs: grep out_of_scope.md before proposing/justifying a build (HIT → surface rationale, do not reopen unless user overrides) AND append a new entry on a reject verdict
  - file registered in knowledge/index_files.json (R8) · roadmap T-224 [X]
  - no new dir / skill / script / hook added (git status confirms)
verification_intent: grep knowledge/out_of_scope.md for the 6 idea slugs + header contract · grep scrutinize SKILL.md for out_of_scope (≥1) · grep index_files.json for out_of_scope.md · git status shows only the 1 new knowledge file (no new dir/skill/script)
