skill: harness_editor
CFP_COUNT: 19
task: T-044 token formula accuracy fix
date: 2026-05-31
objective: Correct token formula — compact_size 0.30→0.45 · sys_fixed dynamic · hooks_per_turn 1300→700
outcome: CHAT_TOTAL after compact ~39,870 vs actual 39,700 (error < 0.5%)
changes:
  - CLAUDE.md §R1: ratio 0.45 · sys_fixed dynamic · hooks 700
  - AGENTS.md §B1: sys_fixed=(python3 wc-c) · compact_restore + fresh use sys_fixed
  - mece_plan_schema.md §PATH B: c*0.45 · compact_size + sys_fixed
  - harness_flow Y25 added · roadmap T-044 [X]
sections_done: S1 S2 S3 S4
resume_at: none
