date: 2026-06-01
objective: Audit and update Implement/ docs for T-067+T-068 changes (LOOP_WEIGHT, PostToolUse hook, C0.5 BC gate, compact_checkpoint)
constraints:
  - Every condition/trigger must use Behavior Contract (Pre/Contract/Post/Enforce) — CFP-026
  - Never full-read files >80L — grep first
  - 03_config.md is ground truth — update first
affected_files:
  - Implement/03_config.md · 04_skills.md · 06_orchestrator.md · 08_checklist.md · 09_migration.md · 00_index.md · 01_overview.md · 02_setup.md
acceptance_criteria:
  - All 8 files have LOOP_WEIGHT where applicable
  - C0.5 gate in 03_config.md uses full BC format
  - PostToolUse hook spec in 03_config.md
  - compact_checkpoint in M1.5 of 03_config.md + 04_skills.md
  - 08_checklist.md has T-067+T-068 verification items
  - 09_migration.md has migration steps for new fields + hook
verification_intent: grep each file for LOOP_WEIGHT, Pre:/Contract:/Post:/Enforce:, compact_checkpoint
