# BC Over-Enforcement Audit (skill_auditor) — 2026-06-12
Rule: BC justified ONLY for irreversible damage. skip=unrecoverable -> KEEP; skip=worse-but-recoverable -> ceremony.

| skill | BC | verdict | why | ~tok |
|---|---|---|---|---|
| session_manager | Handoff Contract Validation | DOWNGRADE | missing field recoverable | 80 |
| session_manager | Self-Improve Gate | DOWNGRADE* | auditor said REMOVE; user-valued learning loop -> downgrade only | 90 |
| session_manager | 5-File Completion Gate | KEEP | cold-resume state integrity | - |
| session_manager | Close Checklist Pre-Check | DOWNGRADE | duplicate of a Hard Rule | 100 |
| repo_researcher | Clone Gate | KEEP | downstream data-integrity cascade | - |
| repo_researcher | Size Routing | DOWNGRADE | efficiency guard not damage | 70 |
| repo_researcher | Output Write | DOWNGRADE | missing template recoverable | 80 |
| harness_doctor | Resume Gate | KEEP | double-apply harness edit risk | - |
| harness_doctor | Prior-Fix Check | DOWNGRADE | judgment guard, approval gate catches | 70 |
| harness_doctor | Pre-Audit Checklist | REMOVE | methodology ceremony | 80 |
| harness_doctor | Fix Record | KEEP | permanent fix-history loss | - |
| harness_doctor | Harness-Editor-Delegate | KEEP | uncontrolled harness edits | - |
| variable_manager | Symbol-Return | DOWNGRADE* | auditor said REMOVE; = index-sync tracking, user-valued -> downgrade only | 60 |

Over-enforced: 7 · ~480 tok/invocation recurring.
DO NOT edit without per-BC review + user confirm. Touches harness behavior.
