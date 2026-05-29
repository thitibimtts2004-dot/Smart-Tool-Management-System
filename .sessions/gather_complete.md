date: 2026-05-29
objective: T-038 — enforce mece_plan.md full Phase 0-3 template + conditional reset/close behavioral contract
constraints:
  - harness_editor full workflow (Step 1-5) mandatory
  - mece_plan_schema.md = authoritative template (all future plans must copy from it)
  - conditional reset/close paths must be explicit in template
  - mece/SKILL.md + AGENTS.md + schema must all be consistent
affected_files:
  - docs/session_templates/mece_plan_schema.md
  - .agents/skills/mece/SKILL.md
  - AGENTS.md
  - knowledge/harness_flow_20260526.md
  - Implement/04_skills.md
  - Implement/08_checklist.md
acceptance_criteria:
  - mece_plan_schema.md has full Phase 0-3 blocks + token tracking + conditional close paths
  - AGENTS.md M5 references Phase-Checklist Template explicitly
  - mece/SKILL.md Output Contract has format validation gate
  - harness_flow + Implement/ updated
verification_intent: grep Phase 0-3 blocks in schema + AGENTS.md M5 reference + SKILL.md output contract
