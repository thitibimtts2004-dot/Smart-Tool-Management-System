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
- [X] T-043: CHAT_TOTAL formula fix — compact_size field in compact_state.md + B1 reads compact_size → CHAT_TOTAL = compact_size + 7300 + triangular undercount note in R1 · attempts: 1 · tool_calls: 12

- [X] T-044: token formula accuracy fix · attempts: 1 · tool_calls: 20 — compact_size 0.30→0.45 · sys_fixed dynamic · hooks_per_turn 1300→700

- [X] T-045: token formula accuracy test · attempts: 1 · tool_calls: 8 — harness 32.3k vs actual 40.6k · error: 20.5% · ratio: 1.26× (T-044 improvement: 1.49×→1.26×)

- [X] T-046: token formula accuracy fix v2 · attempts: 1 · tool_calls: 8 — turn_tokens ×1.3 + compact_size 0.45→0.52 · expected boot error <3%

- [X] T-047: Knowledge Conflict Detection — S1 schema extension · attempts: 1 · tool_calls: 4 — 6 fields added to 28 entries (summary/key_claims/supersedes/superseded_by/key_claims_generated_at/key_claims_stale) + backlink_analyzer.py soft-warn
- [X] T-048: Knowledge Conflict Detection — S2 backfill_knowledge_index.py · attempts: 1 · tool_calls: 2 — 2-step workflow (extract+write) · scaled excerpt 60L cap · auto-supersedes from _YYYYMMDD.md pattern
- [X] T-049: Knowledge Conflict Detection — S3 knowledge_conflict_checker.py · attempts: 1 · tool_calls: 2 — 0 LLM tokens Stage 1 · phrase matching ≥3 words · verdict: clean/low_priority/review_recommended · token_estimate: 295 (budget <2000)
- [X] T-050: Knowledge Conflict Detection — S4 R8 integration · attempts: 1 · tool_calls: 3 — AGENTS.md +1L · EXCLUDE list prevents circular loop · stale key_claims rule · verdict→action mapping

## Token Efficiency & Observability — Phase 1 (T-051–T-055)

- [X] T-051: Cache hit logging infra — CACHE_READ/CACHE_WRITE fields in session_tokens.md, B1 printf, bootstrap_sessions.py, session_compactor.py · attempts:1 · tool_calls:6
- [X] T-056: Context cache Stop hook — scripts/write_context_cache.sh + .claude/settings.json Stop event → session_context_cache.md written every turn end · attempts:1
- [X] T-052: 4-bucket token attribution footer — CLAUDE.md R1 emit rule added [sys:Nk tools:Nk hist:Nk out:Nk] · attempts:1 · tool_calls:2
- [X] T-053: token_log.jsonl telemetry — write_context_cache.sh appends JSON line per Stop event · attempts:1 · tool_calls:3
- [X] T-054: Provider routing decision tree — AGENTS.md §R4 table (haiku/sonnet routing by task type+volume) · attempts:1 · tool_calls:3
- [X] T-055: 30-day token efficiency rollout — phases 1+2 complete (T-051–T-054) · phase 3 = ongoing per-session habit via CLAUDE.md R1+R3 + AGENTS.md R4 · attempts:1 · tool_calls:1

## Provider-Agnostic Model Tiers

- [X] T-057: Model tier system — MODEL_HIGH/MEDIUM/LOW · Implement/03_config.md §Model Tiers · AGENTS.md R4 + OmO · mece/SKILL_detail.md · detected.md fields · attempts:1 · tool_calls:10
- [X] T-058: Implement.md bootstrap prompt — Phase 0-5 agent instruction · Track A/B/C · Model Tiers Phase 3 · verify checklist · attempts:1 · tool_calls:4
- [X] T-059: Token Efficiency Pack v2 — Output Contracts · State-Retention · Tool Compression · Spike Detection · harness_flow Y28 · attempts:1 · tool_calls:14
- [X] T-060.1: JSONL per-turn logging rule in CLAUDE.md R1 · attempts:1 · tool_calls:2
- [X] T-060.2: Cache hit % guardrail ≥60% in CLAUDE.md · attempts:1 · tool_calls:1
- [X] T-060.3: Alert types (5 additional) in CLAUDE.md · attempts:1 · tool_calls:1
- [X] T-060.4: Fix token_estimator.py SYSTEM_FIXED dynamic + hooks_per_turn=700 · attempts:1 · tool_calls:2
- [X] T-060.5: Tool schema serialization + session_summary rule in AGENTS.md · attempts:1 · tool_calls:2
- [X] T-060.6: Rolling summary trigger (SESSION_TOTAL >40k + turns ≥8) in CLAUDE.md R3 · attempts:1 · tool_calls:2
- [X] T-060.7: Cache breakpoint hash tracking in AGENTS.md Boot · attempts:1 · tool_calls:2
- [X] T-060.8: Implement/03_config.md sync — all T-060 changes · attempts:1 · tool_calls:5

## Execution Log File System — T-061

- [X] T-061.1: exec_log dir + AGENTS.md L4.5 OFFLOAD rule · attempts:1 · tool_calls:3
- [X] T-061.2: CLAUDE.md Tool-Result Offload rule · attempts:1 · tool_calls:2
- [X] T-061.3: scripts/trim_exec_log.py (prune 24h/50 files) · attempts:1 · tool_calls:2
- [X] T-061.4: Completion Gate trim_exec_log step in AGENTS.md · attempts:1 · tool_calls:2
- [X] T-061.5: Implement/03_config.md sync — exec_log + offload rule · attempts:1 · tool_calls:2

## Harness Doctor — CFP-024 Structural Fix

- [X] T-062: harness_doctor CFP-024 — R16 MANDATORY CFP write · CLAUDE.md + Implement/03_config.md · attempts:1 · tool_calls:6

## Harness Doctor — CFP-025 Structural Fix

- [ ] T-063.1: mece_plan_schema.md PATH A Clear + NEVER ad-hoc rule
- [ ] T-063.2: CLAUDE.md PATH A Clear enforcement rule
- [ ] T-063.3: AGENTS.md PATH A Clear enforcement rule
- [ ] T-063.4: index_cfp_fix.json CFP-025 status → fixed
- [ ] T-063.5: Implement/03_config.md sync

## Token Formula Accuracy Fix — T-064

- [X] T-064.1: CLAUDE.md R1 — 1.3×→1.5× + cache invalidation cascade note · attempts:1 · tool_calls:2
- [X] T-064.2: AGENTS.md bucket_sys — tool schema carry-forward note · attempts:1 · tool_calls:2
- [X] T-064.3: scripts/token_estimator.py — multiplier 1.3→1.5 + --schema-drift flag · attempts:1 · tool_calls:3
- [X] T-064.4: Implement/03_config.md sync · attempts:1 · tool_calls:2

## Token System Upgrade — T-065

- [X] T-065.1: CLAUDE.md R1 — reasoning_tokens formula + Thai drift note + hooks_overhead note
- [X] T-065.2: CLAUDE.md R1 — JSONL schema extension (13→21 fields, null-safe)
- [X] T-065.3: CLAUDE.md R1 — bucket sub-attribution notes (bucket_retrieval + bucket_tool_schema)
- [X] T-065.4: CLAUDE.md R3/R10 + bootstrap — auto history cap + CHAT_TOTAL adj + session_memory.md
- [X] T-065.5: AGENTS.md Phase 3 — cache control rules + tool schema hash detection

## Token Optimization Pack — T-066

- [X] T-066.1: CLAUDE.md R4 + AGENTS.md — provider phase routing table (G1/G2→MODEL_LOW, MECE/Execute→MODEL_HIGH, Reviewer→MODEL_LOW)
- [X] T-066.2: CLAUDE.md R1 — estimated_cost_usd formula (Sonnet/Haiku price tiers)
- [X] T-066.3: CLAUDE.md R1 — bucket_retrieval active + footer [ret:Nk] display
- [X] T-066.4: AGENTS.md Phase 3 — [schema-gate] rule for mid-session SKILL.md edits
- [X] T-066.5: CLAUDE.md R1 — telemetry retention 30-day policy + trim_exec_log reference

## Loop Weight Tracking — T-067

- [X] T-067.1: session_tokens.md + B1 printf — TURN_COUNT + LOOP_WEIGHT fields
- [X] T-067.2: PostToolUse hook — LOOP_WEIGHT weight increment (S/M/L)
- [X] T-067.3: CLAUDE.md R1 footer + R3 table + AGENTS.md Phase 3 warn template
- [X] T-067.4: AGENTS.md M1.5 — proactive compact checkpoint trigger
- [X] T-067.5: mece_plan_schema.md — compact step template

## Behavior Contract Enforcement — T-068

- [X] T-068.1: CFP-026 — conditions/triggers without BC (AGENTS.md C0.5 gate + mece_plan_schema BC block + CODING_FAILURE_PATTERNS.md)

## Implement/ Docs Upgrade (T-067+T-068 Sync) — T-069

- [X] T-069.1: 03_config.md — R3 LOOP_WEIGHT rows + C0.5 BC + PostToolUse spec + compact_checkpoint formula
- [X] T-069.2: 04_skills.md — M1.5 compact_checkpoint formula + footer BC
- [X] T-069.3: 06_orchestrator.md — C0.5 BC gate + LOOP_WEIGHT cycle routing + compact_checkpoint ref
- [X] T-069.4: 08_checklist.md — T-067+T-068 verification items · attempts:1 · tool_calls:2
- [X] T-069.5: 09_migration.md — M5 migration section: TURN_COUNT+LOOP_WEIGHT fields · PostToolUse hook · compact_checkpoint · attempts:1 · tool_calls:2
- [X] T-069.6: 01_overview.md + 02_setup.md — session_tokens.md 6-field schema description · attempts:1 · tool_calls:3
