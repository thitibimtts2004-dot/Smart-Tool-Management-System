skill: harness_editor
CFP_COUNT: 19
task: T-040 — Migration Guide: Implement/09_migration.md (4 tracks M1-M4)

objective: |
  Create migration guide for users upgrading from older harness version
  to current version — covers index re-format, tree re-structure,
  skill/config overwrite, and post-migration verification.

outcome: COMPLETE

changes:
  - Implement/09_migration.md — NEW (298L) · 4 tracks: M1 re-format indexes · M2 re-structure tree · M3 update/overwrite skills+config · M4 verify + rollback plan
  - Implement/00_index.md — Track C entry added + 09_migration.md row in Parts table
  - knowledge/harness_flow_20260526.md — Y21 added: migration guide gap documented
  - knowledge/index_files.json — 09_migration.md entry added (topics/backlinks/references)
  - docs/master_roadmap.md — T-040 [X]

validation:
  V1: 09_migration.md ≥50L → 298L PASS
  V2: 09_migration refs in 00_index.md ≥3 → 5 PASS
  V3: Y21 in harness_flow → 1 PASS
  V4: T-040 [X] in roadmap → 1 PASS
  V5: Track C in 00_index.md → 1 PASS
  V6: 09_migration.md in index_files.json → found PASS

mece_plan_hash: task-complete
resume_at: none
sections_done: S1 S2 S3
sections_pending: none
