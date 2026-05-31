date: 2026-05-31
objective: T-044 — fix token formula: compact_size ratio 0.30→0.45, sys_fixed dynamic, hooks_per_turn 1300→700
constraints:
  - CLAUDE.md Never-Full-Load: grep+offset only
  - B1 bash one-liner: surgical edits only, must not break existing logic
  - mece_plan_schema.md: template file — change ratio formula only
affected_files:
  - CLAUDE.md (R1 formula block lines 13,64-67,71,76)
  - AGENTS.md (B1 bash line 10, prose note line 19)
  - docs/session_templates/mece_plan_schema.md (PATH B line 133, line 129)
  - knowledge/harness_flow_20260526.md (Y25)
  - docs/master_roadmap.md (T-044)
acceptance_criteria:
  - grep "sys_fixed" AGENTS.md → ≥4 hits
  - grep "0.45" mece_plan_schema.md → ≥1 hit
  - grep "700" CLAUDE.md → hooks_per_turn updated
  - B1 formula: CHAT_TOTAL = compact_size + sys_fixed (not 7300)
verification_intent: boot fresh session → compare harness CHAT_TOTAL vs actual API baseline
