# T-212 Hot/Cold Tag Map — safety-gate guard

date: 2026-06-17

## HOT — stay in prefix (NEVER move)
| Block | Why hot |
|---|---|
| Boot B1–B3 | runs every session start |
| Per-Turn C0–C3 | runs every message |
| R1 token · R2 budget · R3 pause | fire every turn |
| R5 index-first · Never-Full-Load | gate every Read |
| R6/R7 output+density · R11 English | shape every reply |
| R14 destructive gate · R15 domain hard-stop | SAFETY — never lazy-loaded |
| R16 self-improve | C0 detection every turn |
| Phase 1→2→3 summary table + triggers + PreToolUse-hook rule | the WHAT/WHEN of phases |

## COLD — move BODY out, keep 1-line trigger+pointer
| Rule/Block | trigger? | safety gate? | fires only when | → target |
|---|---|---|---|---|
| R8 index-sync body | no (body) | no | file create/delete/move | 03_config.md |
| R9 error-protocol body | no (body) | no | real error/debug | 03_config.md |
| R12 post-edit-verify body | no (body) | no | after Edit/Write | 03_config.md |
| R13 escalation body | no (body) | no | 2nd failed attempt | 03_config.md |
| AGENTS Phase 1 G0–G3 detail | no (body) | no | entering Phase 1 | 04_skills.md |
| AGENTS Phase 2 M1–M6 detail | no (body) | no | entering Phase 2 | 04_skills.md |
| AGENTS Phase 3 L1–L5 + purge + cache notes | no (body) | no | entering Phase 3 loop | 06_orchestrator.md |
| AGENTS Sub-agent Rules table | no (body) | no | spawning a sub-agent | 03_config.md |

## SAFETY-GATE GUARD (Verify-1)
- R14 + R15 appear ONLY in the HOT table → confirmed absent from the externalized set.
- Every `→ trigger + pointer` line stays in core (only BODIES move).
- 3-layer phase guard intact: hot trigger + state files + PreToolUse hook (external code).

VERDICT: cold set contains zero safety gates, zero triggers — safe to externalize.
