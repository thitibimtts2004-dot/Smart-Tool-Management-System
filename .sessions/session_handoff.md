skill: harness_editor
CFP_COUNT: 19
task: T-041 — Asset Plan Priority 1+2 features: mece_plan_schema.md + AGENTS.md M1.5 + Implement/04+08

objective: |
  Add Asset Plan Priority 1+2 features to harness:
  - mece_plan_schema.md Section Template: Tool/Rollback/Data_Sent/Token fields
  - mece_plan_schema.md Phase Blocks: Files Read table + TOKEN CHECK runtime cmd
  - mece_plan_schema.md Phase 3 Close: [mece-audit] + Ask user + Feedback delivered
  - AGENTS.md M1.5: dependency_map[] + risk_flags[] named outputs
  - Implement/04_skills.md: M1.5 Named Outputs block added to Plan Format
  - Implement/08_checklist.md: 6 new checklist items for T-041 features

outcome: COMPLETE

changes:
  - docs/session_templates/mece_plan_schema.md — 126L→151L · Tool/Rollback/Data_Sent/Token per section · Files Read tables (Phase 1+2) · TOKEN CHECK runtime cmd · [mece-audit]+feedback in Phase 3 Close
  - AGENTS.md — M1.5 expanded: dependency_map[] + risk_flags[] named outputs
  - Implement/04_skills.md — M1.5 Named Outputs block added to §Plan Format
  - Implement/08_checklist.md — 6 new checklist items (M1.5 named outputs · schema Section Template · Files Read · TOKEN CHECK · [mece-audit]+feedback)
  - knowledge/harness_flow_20260526.md — Y22 added (T-041 scope + △ note updated)
  - knowledge/index_files.json — 3 new entries: mece_plan_schema.md · Implement/04_skills.md · Implement/08_checklist.md
  - docs/master_roadmap.md — T-041 [X] (tool_calls: 22)

validation:
  V1: Tool/Rollback/Data_Sent/Token in mece_plan_schema.md → 8 (≥4) PASS
  V2: Files Read + cat session_tokens → 6 (≥2) PASS
  V3: mece-audit + Ask user + Feedback delivered → 3 (≥3) PASS
  V4: dependency_map + risk_flags in AGENTS.md → 2 (≥1) PASS
  V5: Y22 in harness_flow → 1 PASS
  V6: T-041 [X] in roadmap → 1 PASS

mece_plan_hash: task-complete
resume_at: none
sections_done: S1 S2 S3 S4 S5
sections_pending: none
