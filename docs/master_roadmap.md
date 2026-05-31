# Master Roadmap

> Status: `[ ]` pending → `[/]` in progress → `[X]` done

---

## T-000: Harness initialized

- [X] T-000: Setup complete

---

<!-- Add project tasks below -->

## 9arm-Inspired Harness Improvements

- [X] T-001: Multi-surface Verifier — expand Reviewer prompt in mece/SKILL.md with task_type + surface table
- [X] T-002: Formal Closeout Schema — add objective/outcome/changes/validation/root_cause/follow_ups to session_manager §3 Step 4
- [X] T-003: Requirements Interviewer Upgrade — add refusal logic + output contract to AGENTS.md G0 + 03_config.md
- [X] T-004: Skill Governance Labels — add "bucket" field to skill-manifest.json
- [X] T-005: File Role Architecture Doc — create knowledge/harness-file-role-map.md
- [X] T-006: Skeptical Reviewer Phase — add M4.5 gate + new skeptical_reviewer/SKILL.md (after T-001+T-003)

## Contract Gap Audit — 6 Skills Fixed

- [X] T-007: file_manager + variable_manager — add Refusal + Workflow + Routing
- [X] T-008: self_improve — add Routing (→ return to session_manager §3)
- [X] T-009: token_tracker + token_auditor — add Refusal + Routing
- [X] T-010: ascii_flow — add Refusal + Routing
- [X] T-011: identity — declare as persona-only scope (not executable contract)
- [X] T-012: editor + coder — add File Size Contract (≤200L rule + split strategy)

- [X] T-013: editor + self_improve — split into SKILL.md (≤200L contract) + SKILL_detail.md (procedures) · attempts: 1 · tool_calls: 6



- [X] T-014: session_manager — add 5 contract elements + split 273L→92L + SKILL_detail.md · attempts: 1 · tool_calls: 5

- [X] T-015: mece — split 505L→116L + add R/O/Rt · SKILL_detail.md created · attempts: 1
- [X] T-016: coder (128L) + agent (199L) — add T/R/O/Rt contract elements · attempts: 1
- [X] T-017: harness_doctor (241L) + skeptical_reviewer (87L) — add R/O/Rt · attempts: 1
- [X] T-018: ascii_flow + token_tracker + token_auditor — add missing T/O elements · attempts: 1

- [X] T-019: token formula fix — CLAUDE.md R1 + token_tracker/SKILL.md + scripts/token_estimator.py · accuracy: 84.5% vs 137.3k actual · attempts: 1 · tool_calls: 12

- [X] T-020: MECE template behavioral contract closure — mece/SKILL.md + SKILL_detail.md + 5 MECE Constraints Blocks added · attempts: 1 · tool_calls: 18

- [X] T-021: harness_editor skill creation — new skill for harness file editing with mandatory MECE plan + index + harness_flow + Implement updates · attempts: 1 · tool_calls: 22

- [X] T-022: backlink cross-links — harness_doctor ↔ harness_editor bidirectional Routing cross-references · attempts: 1 · tool_calls: 4

- [X] T-024: populate index_files.json — 10 harness file entries (GAP-1/4/5/6) + backlinks · 12 entries total · attempts: 1 · tool_calls: 5

- [X] T-025: compact improvements — B1 CHAT_TOTAL reset + pre-compact state emit + compact_state section+step fields · attempts: 1 · tool_calls: 14


- [X] T-023: harness_doctor — add Workflow heading + split 242L → SKILL_detail.md · attempts: 1 · tool_calls: 3
- [X] T-026: harness immune system repair — S1 doctor split · S2 self_improve contract · S3 CFP detection signals · attempts: 1 · tool_calls: 12


- [X] T-027: topic-graph backlink system — topic_registry.json + 3-tier index_files.json + backlink_analyzer.py · attempts: 1 · tool_calls: 18


- [X] T-028: post-T-027 index sync + behavioral contract clarity — G1-G6 gaps closed · CFP-020 logged · 47 related[] links · attempts: 1 · tool_calls: 16

- [X] T-029: session bootstrap + template system — .gitignore fix · docs/session_templates/ · bootstrap_sessions.py · self_improve_log · 60 related[] links · attempts: 1 · tool_calls: 20

- [X] T-030: session_compactor.py health check + identity/SKILL.md schema update · attempts: 1 · tool_calls: 6

- [X] T-031: behavioral contract — ## Workflow added to 7 skills · ascii_flow split 228L→58L · 14/15 skills 5/5 · attempts: 1 · tool_calls: 18

- [X] T-032: harness_doctor — CFP-021 L5 DECIDE mece_plan update + CLAUDE.md Phase 3 step 0 · first fix recorded · attempts: 1 · tool_calls: 12

- [X] T-033: REPO_MAP.md structure tree update — 24 entries added · 114L→158L · attempts: 1 · tool_calls: 12

- [X] T-034: harness_editor Step 5B — REPO_MAP.md MANDATORY trigger added · attempts: 1 · tool_calls: 5

- [X] T-035: session-health check — Completion Gate + session_manager trigger + Output Contract · attempts: 1 · tool_calls: 10
- [X] T-036: CFP-022 — CHAT_TOTAL boot init fix · AGENTS.md+CLAUDE.md B1 CHAT_TOTAL:0→7300 · attempts: 1 · tool_calls: 12
- [X] T-037: CFP-023 + harness_editor Step 5 gate + Docs backfill T-034/035/036 · attempts: 1 · tool_calls: 28
- [X] T-038: mece_plan full Phase 0-3 template enforcement + conditional close paths (→ mece_plan_schema.md · AGENTS.md M5 · mece/SKILL.md S1-E · harness_flow Y19 · Implement/04+08) · attempts: 1 · tool_calls: 22
- [X] T-039: 08_checklist Behavioral Contract + Thai close backfill (Step 5 missed) + stale ref fix + mece_plan_schema conditional Step 5 gate (→ harness_flow Y20 · Implement/04+08 · mece_plan_schema §Close · 08 BC) · attempts: 1 · tool_calls: 18
- [X] T-040: Migration Guide — Implement/09_migration.md (298L · 4 tracks M1-M4) + 00_index.md Track C + 01_overview.md Track A/B/C + 02_setup.md §9 + harness_flow Y21 · attempts: 1 · tool_calls: 20
- [X] T-041: Asset Plan Priority 1+2 features — mece_plan_schema.md (Tool/Rollback/Data_Sent/Token fields · Files Read tables · TOKEN CHECK runtime · [mece-audit]+feedback) + AGENTS.md M1.5 (dependency_map/risk_flags) + Implement/04+08 · attempts: 1 · tool_calls: 22
- [X] T-042: Token Optimization Pack — safe_run.py (priority-first filter · 97.5% git noise reduction) + AGENTS.md (reviewer inline · compact 30k · cache note) + CLAUDE.md R3 + Implement/04+08 + docs/token_benchmark.md · attempts: 1 · tool_calls: 28
