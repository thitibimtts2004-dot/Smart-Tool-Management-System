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

- [X] T-063.1: mece_plan_schema.md PATH A Clear + NEVER ad-hoc rule · attempts:1 · tool_calls:2
- [X] T-063.2: CLAUDE.md PATH A Clear enforcement rule · attempts:1 · tool_calls:1
- [X] T-063.3: AGENTS.md PATH A Clear enforcement rule · attempts:1 · tool_calls:1
- [X] T-063.4: index_cfp_fix.json CFP-025 status → fixed · attempts:1 · tool_calls:1
- [X] T-063.5: Implement/03_config.md sync · attempts:1 · tool_calls:1

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

## Asset Plan Harness Upgrade — T-070

- [X] T-070.1: backup old harness → AP/.sessions/harness_backup_20260601/ (8 items) · attempts:1 · tool_calls:2
- [X] T-070.2: copy core files (CLAUDE.md·AGENTS.md·CFP·REPO_MAP·INVARIANTS) · sha1 verified · attempts:1 · tool_calls:1
- [X] T-070.3: rsync .agents/ (+ harness_editor + skeptical_reviewer added) · attempts:1 · tool_calls:1
- [X] T-070.4: rsync Implement/ (+ 6 new files) · attempts:1 · tool_calls:1
- [X] T-070.5: rsync scripts/ + docs/session_templates/ + token_benchmark.md · attempts:1 · tool_calls:2
- [X] T-070.6: .gitignore append + session_tokens 6 fields + .claude/settings.json · attempts:1 · tool_calls:1

## Harness BC Gaps Fix — T-071

- [X] T-071.1: mece_plan_schema.md — PATH A + PATH C Session Close BC (Pre/Contract/Post/Enforce) · attempts:1 · tool_calls:2
- [X] T-071.2: mece/SKILL_detail.md — Phase 3 close block Session Close BC · attempts:1 · tool_calls:1
- [X] T-071.3: .claude/settings.json — UserPromptSubmit hook C0.5 LOOP_WEIGHT warn (>30) + required (>50) · attempts:1 · tool_calls:1
- [X] T-071.4: CLAUDE.md — trim R1 detail → pointer · 252L→191L (≤200L) · attempts:1 · tool_calls:1
- [X] T-071.5: AGENTS.md — trim Phase 1-3 + Sub-agent detail → pointer · 281L→200L (≤200L) · attempts:1 · tool_calls:3
- [X] T-071.6: CODING_FAILURE_PATTERNS.md — CFP-030 session close BC skipped · attempts:1 · tool_calls:1

## Cross-Platform Hooks + Dynamic Root — T-072

- [X] T-072.1: .claude/settings.json — ROOT pattern + python3 LOOP_WEIGHT + PreToolUse gate (all Edit/Write except .sessions/) · attempts:1 · tool_calls:2
- [X] T-072.2: Implement/03_config.md — PostToolUse template python3 + PreToolUse template + Cross-Platform Notes block · attempts:1 · tool_calls:1

## harness_doctor Topic Matching + BC Enforcement — T-073

- [X] T-073.1: knowledge/cfp_topics.md — canonical topic registry · 8 topics · 26 CFPs assigned · attempts:1 · tool_calls:2
- [X] T-073.2: knowledge/index_cfp_fix.json — schema update (topic/recurrences[]/count/approved_proposal) · 20 entries · attempts:1 · tool_calls:1
- [X] T-073.3: CODING_FAILURE_PATTERNS.md — CFP template block (topic:/count:/recurrences:) · attempts:1 · tool_calls:2
- [X] T-073.4: .agents/skills/harness_doctor/SKILL_detail.md — §1 rewrite: BC-A Resume + BC-B Keyword + BC-C AI Judge + BC-D Exhaustion Gate + BC-E Threshold · attempts:1 · tool_calls:2
- [X] T-073.5: .agents/skills/harness_doctor/SKILL.md — Resume Gate BC + Threshold BC + Output Contract 11 signals · attempts:1 · tool_calls:3

## T-076 · BC Retrofit — Behavior Contract enforcement across all harness skills
- [X] T-076.1: harness_editor/SKILL.md — 4 BC blocks: Refusal Gate · Scope Probe · MECE Gate · Docs Close · attempts:1 · tool_calls:4
- [X] T-076.2: self_improve/SKILL.md — 2 BC blocks: Cooldown Gate · Approval Gate · attempts:1 · tool_calls:2
- [X] T-076.3: self_improve/SKILL_detail.md — 3 BC blocks: Pre-Edit Backup · Hard Rules · Audit Log Write · attempts:1 · tool_calls:3
- [X] T-076.4: session_manager/SKILL.md — 2 BC blocks: Handoff Validation · 5-file Completion Gate · attempts:1 · tool_calls:2
- [X] T-076.5: mece/SKILL.md — 2 BC blocks: Validation Gate · mece-fail Halt · attempts:1 · tool_calls:2

## T-077 · harness_doctor CFP-006 — Loop_W footer reads stale boot value
- [X] T-077.1: .claude/settings.json — C0.5 hook >&2 → stdout · agent now sees [compact-warn] · attempts:1 · tool_calls:1
- [X] T-077.2: CLAUDE.md R1 footer BC — Pre strengthened: MUST read file · stale Loop_W detection · BC-footer-read enforce · attempts:1 · tool_calls:1

## T-075 — error_index redesign
- [X] T-075.1: Create knowledge/error_topics.md (6 topics: database-d1, edge-runtime, csv-parsing, auth-token, api-external, type-safety)
- [X] T-075.2: Rewrite knowledge/error_index.md (Topic→Problem→Occurrences schema + ERR-007 seed)
- [X] T-075.3: Edit CLAUDE.md R9 — Topic Lookup BC + Active Fix BC
- [X] T-075.4: R8 index sync (index_files.json + roadmap)

## T-079 — Implement/03_config.md + 04_skills.md — error_index schema + BC hooks
- [X] T-079.1: 04_skills.md ~361 — ERR-XXX template → new schema + BC Topic Lookup inline · attempts:1 · tool_calls:2
- [X] T-079.2: 04_skills.md ~480 — grep search example + it_work/topic fields + BC Active Fix note · attempts:1 · tool_calls:2
- [X] T-079.3: 03_config.md R9 — BC Topic Lookup + BC Active Fix (Pre/Contract/Post/Enforce) · attempts:1 · tool_calls:2
- [X] T-079.4: 04_skills.md Phase 2 ~740 — BC Write-Before-Present (mirror AGENTS.md) · attempts:1 · tool_calls:2

## T-080 — Implement/08_checklist.md + 09_migration.md — error_index schema + BC hooks
- [X] T-080.1: 08_checklist.md ~387 — ERR-XXX template → new schema + BC Topic Lookup + BC Active Fix · attempts:1 · tool_calls:2
- [X] T-080.2: 09_migration.md ~347 — M5 Step 5 add BC Topic Lookup + BC Active Fix + Step 6 verify · attempts:1 · tool_calls:2

## T-081 — CLAUDE.md + AGENTS.md — BC format for all enforcement points
- [X] T-081.1: CLAUDE.md — Phase Transition Gate + R8 + R12 + R14 + R15 → BC format · attempts:1 · tool_calls:5
- [X] T-081.2: AGENTS.md — schema-gate + Completion Gate → BC format · attempts:1 · tool_calls:2

## T-082 — CLAUDE.md — BC format for remaining enforcement gaps
- [X] T-082.1: Phase 3 close sequence → BC (Behavior Contract — Phase 3 Close Sequence) · attempts:1 · tool_calls:1
- [X] T-082.2: R5 Index-First Lookup → BC (Behavior Contract — Index-First Lookup) · attempts:1 · tool_calls:1
- [X] T-082.3: Never-Full-Load → BC (Behavior Contract — Never-Full-Load) · attempts:1 · tool_calls:1

## T-083 — Loop_W hook fix + mece schema enforce + BC-B find-existing-first
- [X] T-083.1: mece/SKILL.md S1-E + AGENTS.md M5 BC — schema Read mandatory before mece_plan.md write (CFP-019 fix) · attempts:1 · tool_calls:4
- [X] T-083.2: CLAUDE.md R1 footer BC — [token-state] hook inject mandate · NEVER cached/estimated (CFP-031) · attempts:1 · tool_calls:2
- [X] T-083.3: .claude/settings.json — UserPromptSubmit hook exit-0 bug fix · token-state echo before exit · attempts:1 · tool_calls:2
- [X] T-083.4: CLAUDE.md R16 BC-B — 4-step find-existing-first mandate (grep index_cfp_fix.json → cfp_topics.md → AI judge → new-topic-proposed) · attempts:1 · tool_calls:2
- [X] T-083.5: CODING_FAILURE_PATTERNS.md — CFP-031 added (Loop_W stale 0) · index_cfp_fix.json CFP-006 recurrence + CFP-028 + CFP-031 registered · attempts:1 · tool_calls:4
- [X] T-083.6: compact_state.md mece_h updated 9fec9499→039c2b26 · session_handoff + active_thread updated · attempts:1 · tool_calls:3

## T-084 — T-083 Roadmap Backfill + T-063 CFP-025 PATH A Clear Fix
- [X] T-084.1: docs/master_roadmap.md — T-083 section backfill · attempts:1 · tool_calls:2
- [X] T-084.2: mece_plan_schema.md — PATH A NEVER ad-hoc rule · attempts:1 · tool_calls:2
- [X] T-084.3: CLAUDE.md + AGENTS.md — PATH A Clear enforcement rule · attempts:1 · tool_calls:3
- [X] T-084.4: index_cfp_fix.json CFP-025 status→fixed + Implement/03_config.md sync · attempts:1 · tool_calls:3

## T-085 — BC Gaps Fix + File Size Enforcement ≤250L
- [X] T-085.1: CLAUDE.md — Boot Gate BC added · Boot section condensed · R1 formula pointer · attempts:1 · tool_calls:4
- [X] T-085.2: AGENTS.md — TOKEN PAUSE BC + C3 Topic Switch BC · 250L ✅ · attempts:1 · tool_calls:4
- [X] T-085.3: token_auditor/SKILL.md — Halt Threshold BC · agent/SKILL.md — Cycle HALT BC · attempts:1 · tool_calls:3
- [X] T-085.4: Roadmap [X] + Index Sync · attempts:1 · tool_calls:2
- [X] T-085.5: CLAUDE.md Move strategy — R3/R4/R10-R11 → 03_config.md + R13 BC · 250L ✅ · attempts:1 · tool_calls:10
- [X] T-085.6: symbol_indexer.py run → Asset Plan index 74 symbols ✅ · attempts:2 · tool_calls:3

## T-086 · Repo Researcher Skill
- [X] T-086.1: .agents/skills/repo_researcher/SKILL.md — 91L ≤250 · 3 BCs ✅ · attempts:1 · tool_calls:2
- [X] T-086.2: scripts/repo_scout.py — clone+validate+enumerate+lang detect → JSON ✅ · attempts:1 · tool_calls:2
- [X] T-086.3: 3 research templates (summary+improvement+repo_map) ✅ · attempts:1 · tool_calls:3
- [X] T-086.4: skill-manifest.json + tool-manifest.json + knowledge/research/ ✅ · attempts:1 · tool_calls:4
- [X] T-086.5: index_files.json synced — 5 new entries ✅ · attempts:1 · tool_calls:2

## T-087 · Harness Health Checklist
- [X] T-087.1: docs/harness_health_checklist.md — 362L · 17 checks · all BC/Rule domains ✅ · attempts:1 · tool_calls:1
- [X] T-087.2: harness_doctor/SKILL.md — BC-pre-audit added · checklist ref ✅ · attempts:1 · tool_calls:1
- [X] T-087.3: index_files.json synced + roadmap [X] ✅ · attempts:1 · tool_calls:1

## T-089 · BC Enforcement: Logic Connector Skills
- [X] T-089.1: file_manager — BC-Index-Return ✅ · attempts:1 · tool_calls:1
- [X] T-089.2: variable_manager — BC-Symbol-Return ✅ · attempts:1 · tool_calls:1
- [X] T-089.3: coder — BC-Index-Sync-Gate ✅ · attempts:1 · tool_calls:1
- [X] T-089.4: editor — BC-Error-Index-Gate + BC-Symbol-Change-Gate ✅ · attempts:1 · tool_calls:1
- [X] T-089.5: ascii_flow — BC-Invoke-Gate + BC-Ascii-Return ✅ · attempts:1 · tool_calls:1
- [X] T-089.6: skeptical_reviewer — BC-Output-Format ✅ · attempts:1 · tool_calls:1
- [X] T-089.7: harness_flow Y37 + roadmap [X] ✅ · attempts:1 · tool_calls:2

## T-088 · doc_builder Skill
- [X] T-088.1: .agents/skills/doc_builder/SKILL.md ✅ · attempts:1 · tool_calls:1
- [X] T-088.2: .agents/skills/doc_builder/SKILL_detail.md ✅ · attempts:1 · tool_calls:1
- [X] T-088.3: skill-manifest.json — doc_builder entry added ✅ · attempts:1 · tool_calls:1
- [X] T-088.4: index_files.json + roadmap [X] ✅ · attempts:1 · tool_calls:2

## T-090 · project_presenter Skill
- [X] T-090.1: .agents/skills/project_presenter/SKILL.md ✅ · attempts:1 · tool_calls:2
- [X] T-090.2: .agents/skills/project_presenter/SKILL_detail.md ✅ · attempts:1 · tool_calls:1
- [X] T-090.3: docs/session_templates/storytelling_template.md ✅ · attempts:1 · tool_calls:1
- [X] T-090.4: skill-manifest.json — project_presenter entry added ✅ · attempts:1 · tool_calls:3

## T-091 · harness_doctor structural fixes P1–P5
- [X] T-091.1: index_cfp_fix.json CFP-033/034/037 count=3 status=fixing ✅ · attempts:1 · tool_calls:1
- [X] T-091.2: AGENTS.md BC-M5-verify added (P1) ✅ · attempts:2 · tool_calls:2
- [X] T-091.3: AGENTS.md close-gate-check+pre-read-L1+L4.5-purge-signal (P2+P3+P5) ✅ · attempts:1 · tool_calls:3
- [X] T-091.4: mece_plan_schema.md r8-sync-check added (P4) ✅ · attempts:1 · tool_calls:1
- [X] T-091.5: index_files.json T-090 files indexed (R8) ✅ · attempts:1 · tool_calls:1

## T-092 · Hybrid BC Migration
- [X] T-092.1: harness_editor/SKILL.md — §BC Selection Guide added · 178L · attempts:1 · tool_calls:3
- [X] T-092.2: AGENTS.md — 8→4 BCs (C3/M5-present/Bash-filter/Schema-gate → Signal Contracts) · attempts:1 · tool_calls:5
- [X] T-092.3: CLAUDE.md — 15→6 BCs (Footer/Cache/Index-First/Never-Full-Load/Index-Sync/Topic-Lookup/Active-Fix/Post-Edit/Escalation → Signal Contracts) · attempts:1 · tool_calls:7

## T-093 · Enforcement Gap Fix (3 gaps post-T-092)
- [X] T-093.1: .claude/settings.json — PreToolUse hook: add Read tool + PROHIBITED file list (never-full-load machine block) · attempts:1 · tool_calls:3
- [X] T-093.2: AGENTS.md — C0.5 BC (10L) → Signal Contract (1L) · BC count 4→3 · attempts:1 · tool_calls:2
- [X] T-093.3: docs/session_templates/mece_plan_schema.md — tick gate note (×2: S1+SN templates) · attempts:1 · tool_calls:2

## T-094 · BC Selection Guide Expand + Manifest Trigger Fix
- [X] T-094.1: harness_editor/SKILL.md — §BC Selection Guide: add Anti-patterns table + real examples + expanded decision tree
- [X] T-094.2: skill-manifest.json — harness_editor trigger + keywords: add BC/hook/signal/tier selection triggers

## T-095 · Manifest Tool Routing + MECE Schema Integration
- [X] T-095.1: skill-manifest.json — activates_at[] + tools{} added to 17 skills · attempts:1 · tool_calls:2
- [X] T-095.2: mece_plan_schema.md — Avoid: field + M2 grep note · attempts:1 · tool_calls:2
- [X] T-095.3: AGENTS.md — M2 Signal Contract added · attempts:1 · tool_calls:1

## T-096 · harness_doctor BC Upgrade + BLOCK Gate
- [X] T-096.1: mece_plan_schema.md — harness_doctor close item → full BC · attempts:1 · tool_calls:2
- [X] T-096.2: CODING_FAILURE_PATTERNS.md CFP-038 — BLOCK/HALT enforcement · attempts:1 · tool_calls:2

## T-097 · settings.json PreToolUse Close-Gate Hook
- [X] T-097.1: .claude/settings.json — close-gate block: Edit active_thread.md phase:done blocked until .close_checklist_ack exists · attempts:1 · tool_calls:2

## T-098 · mece_plan_schema.md Phase 3 Execution Complete Pause BC
- [X] T-098.1: docs/session_templates/mece_plan_schema.md — BC-exec-pause block inserted before §Close Checklist · attempts:1 · tool_calls:2

## T-099 · CFP-039 Close Checklist Output Gap
- [X] T-099.1: CODING_FAILURE_PATTERNS.md CFP-039 + index_cfp_fix.json + cfp_topics.md session-close updated · attempts:1 · tool_calls:3

## T-100 · kcc bug fix L183 AttributeError
- [X] T-100.1: scripts/knowledge_conflict_checker.py — isinstance(entry_b, dict) guard added at L183 · attempts:1 · tool_calls:2

## T-101 · BC-mece-compact — Force /compact Before Phase 3
- [X] T-101.1: AGENTS.md — BC-mece-compact added after BC-M5-verify · [mece-complete] + /compact prompt · attempts:1 · tool_calls:3
- [X] T-101.2: mece_plan_schema.md — compact note added after Phase 2 TOKEN CHECK · attempts:1 · tool_calls:2

## T-102 · skill_auditor — New Skill: Audit SKILL.md Against 9arm Framework
- [X] T-102-A.1: .agents/skills/skill_auditor/SKILL.md created (197L) · 8 components + 6 connection types · adversarial stance · BC over-enforcement detection · attempts:1 · tool_calls:8
- [X] T-102-A.2: skill-manifest.json — skill_auditor entry added · keywords + on_demand_files · attempts:1 · tool_calls:1
- [X] T-102-A.3: index_files.json + harness_flow Y45 + roadmap [X] · attempts:1 · tool_calls:1

## T-105 · harness_editor SKILL.md — 9arm Framework Upgrade
- [X] T-105.1: .agents/skills/harness_editor/SKILL.md — add Operating Stance + When NOT to Use + Signal Contract + Output Contract labels + Tone Guide + Hard Rules + YAML keywords

## T-106 · mece/SKILL.md — 9arm Framework Upgrade
- [X] T-106.1: .agents/skills/mece/SKILL.md — add Operating Stance + Prerequisites + Hard Rules + Tone Guide + YAML keywords · 146L → 180L 🟢 · BC count: 2 (unchanged) · attempts:1 · tool_calls:6

## T-107 · Over-Prescription Fixes: AGENTS.md + CLAUDE.md + mece/SKILL.md
- [X] T-107.1: AGENTS.md — BC-M5-verify: replace 4 grep commands with principle-based assessment · attempts:1 · tool_calls:2
- [X] T-107.2: AGENTS.md — C2 freshness check: replace mechanical grep with intent-based description · attempts:1 · tool_calls:2
- [X] T-107.3: CLAUDE.md — R16 Doctor Flow: replace keyword scoring (score ≥ 2) with judgment-based matching · attempts:1 · tool_calls:2
- [X] T-107.4: mece/SKILL.md — add Signal Contract: write mece_plan.md before presenting plan to user · attempts:1 · tool_calls:1

## T-108 · Index System Fixes: variable_manager + AGENTS.md Index Sync Invariant
- [X] T-108.1: variable_manager/SKILL.md — diagnose current trigger + schema · attempts:1 · tool_calls:2
- [X] T-108.2: variable_manager/SKILL.md — judgment-based trigger + schema (used_in/signature/last_modified) · attempts:1 · tool_calls:3
- [X] T-108.3: AGENTS.md — Index Sync Invariant trigger → cross-file dependency judgment · attempts:1 · tool_calls:2
- [X] T-108.4: harness_flow + roadmap close · attempts:1 · tool_calls:2

## T-109 · mece Close/Handoff Flow Fixes: BC-exec-pause + Close Checklist + Hard Rules
- [X] T-109.1: mece_plan_schema.md — confirm BC-exec-pause line numbers · attempts:1 · tool_calls:1
- [X] T-109.2: mece_plan_schema.md — replace keyword matching with intent assessment + PATH A pointer · attempts:1 · tool_calls:2
- [X] T-109.3: mece/SKILL.md — Hard Rule 8: post-exec new task routing · attempts:1 · tool_calls:2
- [X] T-109.4: harness_flow + roadmap close · attempts:1 · tool_calls:3

## T-110 · Skill Manifest Discovery & Match Signal
- [X] T-110.1: AGENTS.md B2 — head-80 → head-160 · attempts:1 · tool_calls:2
- [X] T-110.2: AGENTS.md B2 — add skill-match/miss/explicit signal contract · attempts:1 · tool_calls:1
- [X] T-110.3: skill-manifest.json — move skill_auditor into skills{} block · attempts:1 · tool_calls:3
- [X] T-110.4: harness_flow Y49 + roadmap close · attempts:1 · tool_calls:2

## T-112 · harness_editor ↔ skill_auditor Wiring
- [X] T-112.1: harness_editor/SKILL.md Step 1 — add conditional audit wiring (Why/How/Judgment-call) · attempts:1 · tool_calls:1
- [X] T-112.2: harness_editor/SKILL.md Hard Rules — add structural-edit audit rule · attempts:1 · tool_calls:1
- [X] T-112.3: harness_flow Y50 + roadmap close · attempts:1 · tool_calls:2

## T-113 · coder + editor + skill_auditor 9arm Upgrade
- [X] T-113.1: editor/SKILL.md — Operating Stance + When NOT to Use · attempts:1 · tool_calls:2
- [X] T-113.2: editor/SKILL.md — Tone Guide + Error→Thai · attempts:1 · tool_calls:2
- [X] T-113.3: editor/SKILL.md — Cross-skill routing + Dead Loop + Hard Rules · attempts:1 · tool_calls:2
- [X] T-113.4: coder/SKILL.md — Error→editor routing + Never invent root cause · attempts:1 · tool_calls:2
- [X] T-113.5: coder/SKILL.md — Context-aware proactive offer · attempts:1 · tool_calls:2
- [X] T-113.6: skill_auditor/SKILL.md — Failure Mode Map + SKILL_detail.md split · attempts:1 · tool_calls:4

## T-114 · Editor Lightweight Fix Path + error_index Schema Extension
- [X] T-114.1: editor/SKILL.md — Lightweight path criteria in Operating Stance + Trigger · attempts:1 · tool_calls:2
- [X] T-114.2: editor/SKILL.md — Lightweight Close sub-section in Workflow Section 3 · attempts:1 · tool_calls:1
- [X] T-114.3: knowledge/error_index.md — severity field + lightweight annotation entry type + decision table · attempts:1 · tool_calls:2

## T-115 · harness_doctor + self_improve 9arm Upgrade
- [X] T-115.1: harness_doctor/SKILL.md — Operating Stance + Hard Rules + Tone Guide · attempts:1 · tool_calls:2
- [X] T-115.2: self_improve/SKILL.md — Operating Stance + Hard Rules (rename Invariants + extend) · attempts:1 · tool_calls:2
- [X] T-115.3: YAML Headers — harness_doctor + self_improve + skill-manifest.json keywords sync · attempts:1 · tool_calls:3

## T-116 · Token Tracking System Fixes
- [X] T-116.1: 03_config.md — B1 script compact-restore CHAT_TOTAL logic sync
- [X] T-116.2: AGENTS.md + 03_config.md — CHAT_TOTAL ×1.5 threshold note
- [X] T-116.3: 03_config.md — LOOP_WEIGHT tiebreak rule (LW>50 + SESSION<10k)
- [X] T-116.4: AGENTS.md + 03_config.md — Turn-1 footer note + JSONL bucket required rule

## T-117 · Token Management Skills Sync
- [X] T-117.1: token_tracker/SKILL.md — LOOP_WEIGHT + footer format + sys_fixed + CHAT_TOTAL file + compact-restore + JSONL + Hard Rules (TT-1→9)
- [X] T-117.2: token_auditor/SKILL.md — >80k threshold + path fix + LOOP_WEIGHT check + R5→R8 + CHAT_TOTAL audit (TA-1→5)
- [X] T-117.3: session_manager/SKILL.md — CHAT_TOTAL health + 6-field reset + >80k threshold (SM-1→3)
- [X] T-117.4: agent/SKILL.md — threshold sync >60k + LOOP_WEIGHT per-spawn tracking (AG-1→2)

## T-118 · Skill Behavioral Gap Fix (skill_auditor + harness_editor)
- [X] T-118.1: harness_editor/SKILL.md — add Scripts section + When new data arrives later
- [X] T-118.2: skill_auditor/SKILL.md — add When new data arrives later

## T-119 · ascii_flow/SKILL.md Behavioral Gap Fix
- [X] T-119.1: add Operating Stance + Prerequisites
- [X] T-119.2: add Output Tone + Hard Rules
- [X] T-119.3: fix framework gaps (YAML keywords + When NOT to Use redirects + Workflow stop condition)
- [X] T-119.4: close + index sync

## T-120 · doc_builder/SKILL.md Behavioral Gap Fix
- [X] T-120.1: add YAML header
- [X] T-120.2: restructure Refusal Contract → Prerequisites + When NOT to Use
- [X] T-120.3: add Operating Stance + Output Tone + Hard Rules
- [X] T-120.4: close + index sync

## T-121 · session_manager §3 Close Checklist Gate
- [X] T-121.1: add mece_plan Close Checklist pre-check to §3 Workflow
- [X] T-121.2: close + sync

## T-122 · harness_doctor Hard Rules fix_plan Mandate
- [X] T-122.1: add count≥5 fix_plan constraint to Hard Rules + Output Contract
- [X] T-122.2: close + sync

## T-123 · self_improve/SKILL.md 9arm gap fix
- [X] T-123.1: add Prerequisites checklist (3 items)
- [X] T-123.2: fix scatter cooldown + remove over-prescription §2 Step 4
- [X] T-123.3: close + sync (harness_flow Y58)

## T-124 · harness_doctor/SKILL.md 9arm gap fix
- [X] T-124.1: add Prerequisites checklist (3 items)
- [X] T-124.2: de-duplicate Trigger section + fix scatter "attempt 3"
- [X] T-124.3: close + sync (harness_flow Y59)

## T-125 · harness_editor/SKILL.md 9arm gap fix
- [X] T-125.1: fix Prerequisites Why + remove File Size Contract dup + MECE rule scatter
- [X] T-125.2: close + sync + active_thread phase:done (harness_flow Y60)

## T-126 · CFP recurrence schema — fixes[] + prior-fix logic
- [X] T-126.1: fix index_cfp_fix.json CFP-037 entry (status:fixed + fixes[] T-121+T-122)
- [X] T-126.2: close + sync

## T-127 · file_manager/SKILL.md 9arm gap fix
- [X] T-127.1: add Operating Stance + Prerequisites (2 behavioral ❌)
- [X] T-127.2: YAML triggers + Output Tone + Hard Rules consolidation (4 framework ⚠️)
- [X] T-127.3: structure fixes (emit dup A + skip scatter B + grep over-prescription C)
- [X] T-127.4: add When NOT to Use → redirect to variable_manager (redundancy clarify)
- [X] T-127.5: close + sync (harness_flow Y61)

## T-128 · skill redundancy boundary clarification
- [X] T-128.1: token_tracker/auditor "Do NOT" notes
- [X] T-128.2: coder/editor keyword dedup + boundary redirects
- [X] T-128.3: close + sync (harness_flow Y62)

## T-129 · CFP-037 structural fix — harness_editor BC-docs-close add Close Checklist gate
- [X] T-129.1: add [E] item to BC-docs-close Contract + Enforce line
- [X] T-129.2: update index_cfp_fix.json CFP-037 fixes[] + status
- [X] T-129.3: close + sync (harness_flow Y63)

## T-130 · agent/SKILL.md 9arm gap fix (Batch A)
- [X] T-130.1: add YAML triggers + When NOT to Use + Operating Stance 2→4 bullets
- [X] T-130.2: Prerequisites add Why/Missing + Output Tone section + Hard Rules 3→5
- [X] T-130.3: structure fixes (B/A/C) + close + sync (harness_flow)

## T-131 · variable_manager/SKILL.md 9arm gap fix (Batch A)
- [X] T-131.1: add YAML triggers + Operating Stance (absent → 4 bullets)
- [X] T-131.2: Prerequisites add Why/Missing + Hard Rules 1→5
- [X] T-131.3: structure fix (B/C) + close + sync (harness_flow)

## T-132 · skeptical_reviewer/SKILL.md 9arm gap fix (Batch A)
- [X] T-132.1: add YAML triggers + Prerequisites (absent → 3 items) + Operating Stance 1→4
- [X] T-132.2: Workflow stop condition + Hard Rules 1→5
- [X] T-132.3: structure fix (B/C) + close + sync (harness_flow)

## T-133 · mece/SKILL.md Cycle syntax support
- [X] T-133.1: Plan Format Cycle block syntax + S1-A.5 decision rule + Hard Rule 7 exception + On-Demand trigger row

## T-134 · session_manager/SKILL.md 9arm gap fix (Batch B)
- [X] T-134.1: YAML triggers + When NOT to Use + Operating Stance + Prerequisites + Hard Rules + Tone Guide

## T-135 · token_tracker/SKILL.md 9arm gap fix (Batch B)
- [X] T-135.1: YAML triggers + When NOT to Use + Operating Stance + Prerequisites + Tone Guide

## T-136 · token_auditor/SKILL.md 9arm gap fix (Batch B)
- [X] T-136.1: YAML triggers + When NOT to Use + Operating Stance + Prerequisites + Hard Rules + Tone Guide

## T-137 · LOOP_WEIGHT gate fix
- [X] T-137.1: AGENTS.md close-gate + LOOP_WEIGHT check → hook-value-only
- [X] T-137.2: session_manager SKILL.md Hard Rule + Step 2 → preserve on close

## T-138 · repo_researcher/SKILL.md 9arm gap fix (Batch C)
- [X] T-138.1: YAML triggers + When NOT + Op Stance + Prerequisites + Hard Rules + Tone Guide

## T-139 · project_presenter/SKILL.md 9arm gap fix (Batch C)
- [X] T-139.1: YAML triggers + When NOT + Op Stance + Prerequisites + Hard Rules + Tone Guide

## T-140 · identity/SKILL.md 9arm gap fix (Batch C)
- [X] T-140.1: YAML triggers + Prerequisites

## T-141 · ascii_flow/SKILL.md 9arm gap fix (Batch C)
- [X] T-141.1: YAML triggers + When NOT + Tone Guide

## T-142 · doc_builder/SKILL.md 9arm gap fix (Batch C)
- [X] T-142.1: YAML triggers + Tone Guide

## T-143 · self_improve/SKILL.md 9arm gap fix (Batch D)
- [X] T-143.1: When NOT to Use + Tone Guide

## T-144 · identity/SKILL.md 9arm gap fix (Batch D)
- [X] T-144.1: Invoke section ≥3 bullets + Workflow halt condition

## T-145 · editor/SKILL.md 9arm gap fix (Batch D)
- [X] T-145.1: YAML triggers array + Prerequisites section

## T-146 · coder/SKILL.md 9arm gap fix (Batch D)
- [X] T-146.1: YAML triggers fix + Prerequisites Why/Missing reformat

## T-147 · mece/SKILL.md 9arm gap fix (Batch D)
- [X] T-147.1: Invoke 3rd bullet + Refusal Contract → When NOT to Use

## T-148 · repo_researcher/SKILL.md 9arm gap fix (Batch D)
- [X] T-148.1: Prerequisites Why:/Missing: reformat

## [X] T-149 · CFP Decay System — last_seen + window_count + stale
- [X] T-149.1: Create scripts/cfp_decay.py
- [X] T-149.2: Migrate index_cfp_fix.json (30 entries)
- [X] T-149.3: Update self_improve/SKILL.md BC-B + BC-E
- [X] T-149.4: Update session_manager/SKILL.md §3 Step 0
- [X] T-149.5: Close — harness_flow Y83 + roadmap + active_thread

## T-150 · Session Index Schema Upgrade + session_analyzer.py
> Constraint: ถ้าสร้าง SKILL.md ใหม่ → ต้องผ่าน 9arm audit (9/9) ก่อน merge
- [X] T-150.1: Upgrade index_sessions.json schema — topic/skill/actions/friction/promoted fields
- [X] T-150.2: Create scripts/session_analyzer.py — cross-session pattern detection (≥3 repeats → promotions.md candidate)
- [X] T-150.3: Create .sessions/promotions.md template + seeding logic in session_manager SKILL.md
- [X] T-150.4: Harness flow Y84 + roadmap + active_thread

## T-151 · Reflection Step + Promotion Loop [X]
> Constraint: ถ้าสร้าง SKILL.md ใหม่ → ต้องผ่าน 9arm audit (9/9) ก่อน merge
- [X] T-151.1: Add reflection step to mece_plan_schema.md Close Checklist (intent/outcome/friction/lesson)
- [X] T-151.2: Add reflection write to session_manager SKILL.md §3 Step 0 (reflections.md append)
- [X] T-151.3: Promotion filter logic in promotions.md — deterministic? → tool | contextual? → skill rule
- [X] T-151.4: Harness flow Y85 + roadmap + active_thread

## T-152 · verify_runner.py — Verify-N Automation Tool [X]
> Constraint: ถ้าสร้าง SKILL.md ใหม่ → ต้องผ่าน 9arm audit (9/9) ก่อน merge
- [X] T-152.1: Create scripts/verify_runner.py — reads mece_plan.md Verify-N lines → runs each → PASS/FAIL report
- [X] T-152.2: Update AGENTS.md Phase 3 L4 — call verify_runner.py instead of inline grep (optional AI verify only)
- [X] T-152.3: Update tool-manifest.json — register verify_runner
- [X] T-152.4: Harness flow Y86 + roadmap + active_thread

## T-153 · session_close.py — 5-File Close Automation Tool
> Constraint: ถ้าสร้าง SKILL.md ใหม่ → ต้องผ่าน 9arm audit (9/9) ก่อน merge
- [X] T-153.1: Create scripts/session_close.py — writes all 5 mandatory files (session JSON + tokens + thread + handoff + index)
- [X] T-153.2: Update session_manager SKILL.md §3 Steps 1-5 — call session_close.py instead of manual file writes
- [X] T-153.3: Update tool-manifest.json — register session_close
- [X] T-153.4: Harness flow Y87 + roadmap + active_thread

## T-154 · Code Audit — session_close.py + verify_runner.py
- [X] T-154.1: Audit scripts/session_close.py — pattern · error handling · edge cases
- [X] T-154.2: Audit scripts/verify_runner.py — pattern · edge cases · condition parsing
- [X] T-154.3: Fix critical gaps found (if any) + harness_flow Y88 + close

## T-155 · user-coach Learning System — post-task quiz + adaptive glossing [X]
> Constraint: new SKILL.md → must pass 9arm audit before merge
- [X] T-155.1: knowledge/user_learning_profile.json — JSON proficiency store (global + topics[] + history[])
- [X] T-155.2: scripts/learning_profile.py — record + analyze engine (usage layer)
- [X] T-155.3: .agents/skills/user-coach/SKILL.md — 8-component skill, USE->QUIZ->RECORD->ADAPT
- [X] T-155.4: .claude/settings.json — additive UserPromptSubmit hook -> analyze -> [learning-state]
- [X] T-155.5: register user-coach in skill-manifest.json + skill-index.md

[X] T-156: harness_editor cycle rewrite — 5-stage lifecycle (AUDIT->PLAN->EDIT->CLOSE . CFP loop-back) + Implement-map table + trim/bugfix
  [X] T-156.1: Workflow -> 5 cyclic stages . audit-first mandatory . CFP loop-back . fix L96 grep
  [X] T-156.2: Implement-map table (edit file -> Implement doc)
  [X] T-156.3: trim redundancy + <=180L
  [X] T-156.4: sync Implement/04_skills.md
  [X] T-156.5: skill_auditor re-audit + close

## T-157 · token-tracking fix — persist-every-turn + consume-once reset marker
> Constraint: B1 boot block is load-bearing (3 copies must match) · no src/ touched · harness_editor
- [X] T-157.1: AGENTS.md B1 bash — reset SESSION_TOTAL via marker armed→consumed (not date-match) [Cycle1·serial·HIGH]
- [X] T-157.2: Implement/03_config.md §R1 + B1 mirror — sync to S2 canonical + persist-every-turn [Cycle1·serial]
- [X] T-157.3: .claude/settings.json token-state hook — marker logic consistent with B1 [Cycle1·serial·HIGH]
- [X] T-157.4: CLAUDE.md §R1 — reset 2-condition rule + persist-every-turn [Cycle2·parallel]
- [X] T-157.5: mece_plan_schema.md PATH A/B/C — reset annotations + PATH B writes session_reset=armed [Cycle2·parallel]
- [X] T-157.6: CFP-031 update + harness_flow Y-entry + roadmap [X] + close [Cycle3·serial]

## T-158 · mece skill fixes — 3 weak components (9arm audit CONDITIONAL 6/9)
- [X] T-158.1: mece/SKILL.md — consolidate Output Spec Structure (merge L54-70+L105-115+L141-154 into one block + pointer to schema) [Cycle1·serial·HIGH]
- [X] T-158.2: mece/SKILL.md — When NOT to Use: 3 refusals inline (single-file/read-only/resume + reason) [Cycle1·serial]
- [X] T-158.3: mece/SKILL.md — fix Tone Guide Prohibited (tone prohibitions, not enforcement echoes) [Cycle1·serial]

## T-159 · skill_auditor — low-tier (Haiku spawn) support
- [X] T-159.1: skill_auditor/SKILL.md — add Tier&effort block in Workflow + Routing line (mechanical-vs-judgment split + low-tier fallbacks) [Cycle1·serial]
- [X] T-159.2: re-audit (Haiku low-tier) walkthrough + Implement sync (04_skills) + harness_flow Y-entry + close [Cycle1·serial]

- [X] T-159.3: skill_auditor — add neutral-abstention line (skip != pass, bias rules apply every tier) [Cycle1·serial]

- [X] T-160: skill_auditor 2-tier finalize — S1 guard (no Sonnet<medium · false-confidence) + S2 in-file Output section labels (convergent fix 3/4 audits) [Cycle1·serial]

- [X] T-161: harness_editor Stage 3.5 BEHAVIORAL VERIFY — spawn floor(Haiku)+real(Sonnet) tiers vs edited harness, signal-grep scoring, behave_test_log.jsonl feedback log · attempts:1 · tool_calls:~16

- [X] T-162: harness_editor Stage 3.5 → 3-config effort-aware ladder (Haiku floor → Sonnet@med → Sonnet@high · sequential early-exit · reuse [behave-gap]+effort:high) · attempts:1 · tool_calls:~24

- [X] T-163: KMS backend security — write complete kms-api-secured.js Cloudflare Worker (JWT auth + PBKDF2 + 16 endpoints + D1) · attempts:1 · tool_calls:15
- [X] T-164: harness_editor Stage 3.5 dogfood — behavioral-verify 3 doctor/improvement contracts (A Doctor Flow BC · B harness_doctor approach-diff · C self_improve blocked-self-edit) · all 3 behave-pass at floor (Haiku early-exit) · no gaps · test-only · attempts:1 · tool_calls:~22 [Cycle1·serial]
- [X] T-165: BC coverage tracker — enumerate all 42 formal BCs (CLAUDE 6 · AGENTS 4 · skills 32) → knowledge/bc_coverage.md · cross-ref behave_test_log → 1/42 tested ≈ 2% · R8 index synced · test-only · attempts:1 · tool_calls:~12 [Cycle1·serial]

- [X] T-166: skill_auditor Step 4.5 Cross-Model Comprehension Probe (3-tier spawn → diff → Suggested Additions for low-mid tier) · attempts:1 · tool_calls:~9

- [X] T-167: KMS 3-role permission system (god/content_manager/content_creator) — API canWrite() + JWT managed_groups + endpoint guards + UI role dropdown + group checklist + button visibility · attempts:1 · tool_calls:~22
- [X] T-168: skill_auditor self-audit fixes (A1 Step0 pre-flight · A2 stop Class A/B split · A3 [handoff-wait] · A4 [systemic-gap]) · re-probe Haiku Q2+Q4 fixed · attempts:1 · tool_calls:~12
- [X] T-169: self_improve self-audit via skill_auditor (probe 3-tier) · fixes G1 V20-contradiction · G2 §4 fence repair · G3 [cfp-escalate] mechanism · G4 Thai-format pointer · G3b escalate cross-ref · re-probe: 3/4 RESOLVED + G3b fixed · Haiku floor Q4/Q6/Q7 now correct · 206→207L · 0 BC added · attempts:1 · tool_calls:~16
- [X] T-170: skill model-certification sweep — 3-tier probe per skill → model_routing into skill-manifest.json · Pilot 4 (agent,coder,editor,harness_editor) → scale 14
- [X] T-171: skill model-certification scale — 3-tier probe + flag-verify + model_routing for remaining 14 skills (5 cycles, /compact between) · follows T-170 pilot
- [X] T-172: provider-aware harness enhancement — detected.md provider profile fields + 03_config §Model Tiers (3 tiers x 3 providers) + NEW §Provider Profiles + R1 formula branching + 04_skills MEDIUM robustness floor

- [X] T-173: provider-aware functional — B4 auto-detect+fill provider fields (map from Known Provider Profiles, unknown->generic) + AGENTS routing sync (code edits->MODEL_MEDIUM, HIGH=opus) + 03_config table sync

- [X] T-174: close all model-coverage gaps — certify self_improve+skill_auditor (3-tier probe) + audit provider-aware additions + wire token_formula into token_estimator.py + close T-171 -> 20/20 certified
- [ ] T-175: reduce BC over-enforcement — 7 flagged (3 REMOVE/5 DOWNGRADE) · ~480 tok/invocation · findings: .sessions/bc_overenforcement_audit.md · CAUTION downgrade-not-remove: Self-Improve Gate + Symbol-Return (user-valued tracking) · attempts:0

- [X] T-176-S1: per-BC recoverability review of CLAUDE.md+AGENTS.md (10 BCs) — read-only gate
- [X] T-176-S2: apply confirmed BC downgrades (Operating Stance + soft signal)
- [X] T-176-S3: consolidate token-threshold redundancy (13 dup -> single source)
- [X] T-176-S4: verify + close

- [X] T-177-S1: confirm token_estimator CLI + PostToolUse stdin contract (read-only) · field=tool_response
- [X] T-177-S2: extend PostToolUse hook to estimate+accumulate SESSION/CHAT (→scripts/posttool_track.py · 3 standalone tests pass · live SESSION 101->201) · attempts:1
- [X] T-177-S3: resolve "never estimate" contradiction in CLAUDE.md R1 (hook-estimate = source, labelled approx) · AGENTS.md L162 already consistent
- [X] T-177-S4: verify counter moves (SESSION 0->50k, CHAT 14k->89k) + CFP-028 resolved-pending + fix-note
- [X] T-178-S1: posttool_track.py provider-aware (reuse token_estimator _M table)
- [X] T-178-S2: reword rules+CFP — provider-aware + still lower bound
- [X] T-178-S3: live verify counter + provider-switch proof
- [X] T-178-S4: close (roadmap/active_thread/Step-5/index/PATH A)
- [X] T-179-S1: extract shared audit engine -> knowledge/audit_engine_rubric.md
- [X] T-179-S2: slim skill_auditor (277L -> <230L) -> reference engine
- [X] T-179-S3: new skill harness_doc_auditor (directive-file rubric, 8 items) · attempts:1
- [X] T-179-S4: register in skill-manifest.json + index sync (manifest+index_files+REPO_MAP+registry) · attempts:1
- [X] T-179-S5: behavioural verify both auditors + close (probe FOLLOWABLE · behave 4 cited findings · both <230L) · attempts:1

[X] T-180: provider-aware compact-reset + visible [compact-reset] emit (skill: harness_editor)
  [X] T-180-S1: scripts/compact_reset.py — single-source reset logic
  [X] T-180-S2: SessionStart:compact hook in .claude/settings.json
  [X] T-180-S3: AGENTS.md C0 plain-text confirm + C0.5 stuck guard + B1 note
  [X] T-180-S4: CLAUDE.md R1/R3 cross-ref [compact-reset] emit
  [X] T-180-S5: CFP-037 stale-counter-after-compact
  [X] T-180-S6: docs + index sync (flow · Implement/03 · tool-manifest · REPO_MAP)
- [X] T-181: fix agent/SKILL.md per skill_auditor audit — collapse token thresholds (drift L118 vs L124) to AGENTS.md §C0.5 ref + add Phase 3 Close pointer · [ ]

## T-182 — Cross-file dup detection (Scan D) + auto-gen rule index (2026-06-13)
- [X] T-182-S1: add Scan D to audit_engine_rubric.md §6 (Cross-File Duplication/Drift)
- [X] T-182-S2: wire Scan D into skill_auditor/SKILL.md
- [X] T-182-S3: wire Scan D into harness_doc_auditor/SKILL.md
- [X] T-182-S4: create rule_indexer.py + rules_defined[]/rules_referenced[] in index_files.json + tool-manifest
- [X] T-182 complete: Scan D in shared engine + both auditors + rule_indexer.py cache · attempts:1 · Verify-1..4 PASS

## T-183 — index-sync reconciler: regen trigger matrix + Stop-hook drift net (2026-06-13)
- [X] T-183-S1: AGENTS.md §Index Sync — add Trigger + Regen-command columns + rule_indexer row
- [X] T-183-S2: scripts/index_reconcile.py (NEW, fail-safe) + wire Stop hook + R8 register
- [X] T-183-S3: reconciler auto-runs idempotent regenerators (rule_indexer/backlink/session) on changed source files (guarded)
- [X] T-183 complete: regen trigger matrix + fail-safe Stop-hook reconciler (index_reconcile.py) auto-runs idempotent indexers · attempts:1 · Verify-1..3 PASS

[X] T-184: mece SKILL.md polish (vocab align S1-A.5 + single-Cycle ≤120L clarify + CFP-019 gloss) · attempts:1 · tool_calls:7

## Index-system review findings (2026-06-14 · repo_researcher design review)
- [X] T-185: REPO_MAP auto-update on file add/move DONE (attempts:1 · tool_calls:~14) — repo_map_check.py (detect+--append, NOT overwrite — preserves curated descriptions, fail-safe exit 0) + flagged by index_reconcile.py Stop hook (judgment-only, never auto-regen) + AGENTS.md Index Sync row + tool-manifest entry
- [X] T-187: lookup.py CRITICAL bug — hardcoded PROJECT_ROOT="Asset Plan" (L67) → derived dynamically via Path(__file__).resolve().parent.parent (robust to rename/move) · verified ROOT="Harness Agent" + lookup returns source:index_files not grep-fallback (attempts:1 · tool_calls:~5)
- [X] T-188: backlink_analyzer.py crash FIXED (attempts:1 · related[] 0→349 links / 61 of 79 files · stray "files" wrapper flattened) — validate_topics L49 `'list' object has no attribute .get`. TRUE ROOT CAUSE: index_files.json has a stray `"files":[...]` LIST wrapper (3 entries appended in wrong shape) amid 76 correct path→dict entries → loop hits the list → crash → exits before writing related[] → backlinks empty (NOT topic_registry — that's a valid dict). Fix: normalize_index() flattens wrapper + isinstance guards (fail-safe). related[] should NOT be empty — harness files cross-reference heavily
- [ ] T-189: index coverage — wire ascii_flow + doc_builder to index · write central index schema doc · add .html to index_reconcile indexable ext · topic-vocab cleanup: ~10+ entries use off-vocabulary topics (behavior_contract vs behavioral_contract, hyphen-vs-underscore, repo-structure, session-management) → align to knowledge/topic_registry.json closed vocab (found during T-188; now WARN-not-fatal)
- [ ] T-186: dependency propagation (FUTURE — lower priority) — populate used_in[] + post-edit caller-check script. NOTE: index_variables.json empty is EXPECTED now (harness-dev repo, no app code in src/ yet) — matters once src/ has TS/Next.js code
- [X] T-190: REPO_MAP full auto-sync — repo_map_check.py --sync makes STRUCTURE mirror reality (recursive folder scan incl nested + per-folder file counts written to a marker-delimited AUTO block · git -M content-based rename detection carries curated description old→new name · descriptions NEVER auto-overwritten · fail-safe exit 0) · index_reconcile.py auto-runs --sync at Stop hook (was --dry-run flag-only) · AGENTS.md Index Sync row + safety-net note. Sections S1-S6 · rename via git (user-confirmed) · only .py/.md touched (git-reversible · R14/R15 n/a)

- [X] T-191: Topic-facet backlink schema v2 (type+topic facets · per-file major/minor · AI-tag-once hash-lock determinism) · 80 entries migrated · 0 off-vocab (was 84) · 5 sub-agents · attempts:1
- [X] T-192: Code-Linkage Index (hard-relationship) — extract structural edges (import/call/type) from code files into index, hash-locked + deterministic, distinct from semantic topic edges. S1 design spec (code_linkage_index.md) · S2 Tier-A regex import extractor (code_graph.py · 48 files, 1 real edge) · S3 integrate (tool-manifest + index_reconcile auto-run + AGENTS.md R8 row · rule_indexer ran). Tier-B AST call/type graph DESIGNED but DEFERRED until src/ has TS app code. attempts:1 · tool_calls:~22
- [X] T-193: Index-tooling audit fixes (search/research redundancy+gap pass) — (1) wired symbol_indexer.py into index_reconcile.py Stop-hook auto-run so index_variables.json self-heals like the other indexes (idempotent-verified · scans src/ only → no-op until TS lands · guarded). (2) SSOT fix: AGENTS.md safety-net prose listed `session_indexer` (never auto-run) + omitted code_graph/symbol_indexer → corrected to match code reality. (3) Two-namespace trap documented (snake_case topic_registry file-facets vs kebab-case cfp_topics CFP-classes · token_tracking≠token-tracking) in topic_facet_schema.md §9 + cfp_topics.md header pointer. Audit verdict: index system clean, no real redundancy/conflict, gaps closed. attempts:1 · tool_calls:~12
- [X] T-194: Implement/ reconcile to current CLAUDE.md/AGENTS.md (7 sections · attempts:1) — S1 AI-guided model+provider setup step (02_setup Step 4b + 07_platform · headline: AI asks user's models → maps MODEL_HIGH/MEDIUM/LOW + provider profile fields into detected.md) · S2 compact model 50k→60k + [compact-rec] recommend-not-forced (03_config·04_skills·06_orch · all 50k-compact stale gone) · S3 per-turn C0.5 block inserted (03_config) · S4 05_scripts §9 +11 new scripts w/ trigger table · S5 02_setup Step 4c all 5 hooks documented · S6 09_migration M2.5 script-check + M2.6 hooks re-wire · S7 8 action-citations prefixed knowledge/. Docs-only (no src/ · R14/R15 n/a). All fixes low/medium-tier followable (exact cmd/path/threshold inline · user hard constraint)
- [X] T-195: 08_checklist.md reconcile + install-completeness audit (attempts:1) — install audit (Explore sub-agent): scripts 18/18 ✅ · hooks 5/5 ✅ · skills 16/16 ✅ · templates ✅ (domain_rules.md by-design user-created). 5 stale checklist verify-commands fixed: L50/L51 retargeted CLAUDE.md→AGENTS.md (B1-4 + CFP_COUNT live in AGENTS.md) · L94 old "30k multi-section rule" replaced w/ current R3 model (60-80k pause·80-90k/80-120k compact-rec·>90k/>120k HALT · asserts 30k gone) · L102 stale "CHAT=7300·>180k บังคับ" → dynamic sys_fixed=(CLAUDE+AGENTS×0.3)+3500 · >120k HALT. All 5 corrected greps re-run PASS vs live canonical. Docs-only.
- [X] T-195b: deeper Implement/ stale-sweep (caught what T-194 S2 missed — grepped "50k" but old rule used "30k"/"7300") — 03_config R3 table: removed stale ">30k+sections≥3 compact" row · ">80k /compact immediately"→"80-90k [compact-rec] recommend-not-forced" · ">120k /compact บังคับ"→">120k HALT" · 04_skills L697 "Compact at 30k" → current R3 model · 09_migration L44+L134 CHAT fallback 7300→11070. index_ tree-diagram refs confirmed FALSE-positive (prefix implied by tree · no fix). Sweep re-run clean. Docs-only.

- [X] T-196: Split core harness ⟷ coding domain pack — extract coding rules/skills/tools (coder,editor,variable_manager,code_graph,symbol_indexer + DB gate/Miniflare/Edge/PapaParse/Next.js) into swappable domain/coding.md · core stays project-agnostic · plan in .sessions/mece_plan.md · EXECUTED+CLOSED 2026-06-15 · S0-S5 done · core split live · attempts:1
- [X] T-197: make Implement/09_migration.md self-contained (M0 git-clone source + VERSION stamp + replace <harness_repo> x4 + inline repo-map M1.5 + SKIP_COPY guard) · attempts:1 · tool_calls:~16
- [X] T-198: M1 re-index Asset Plan (real coding project) + symbol_indexer.py classify() upgrade. M1: ran symbol_indexer(hardcoded root)+backlink+code_graph+repo_map_check FROM Asset Plan path (dynamic-root scripts targeted wrong repo when run from Harness Agent cwd) → index_variables 87 symbols · index_files 86 files/160 import-edges · repo_map 607 folders · all JSON valid. classify(): path+keyword type inference (APIRoute/PageComponent/Middleware/Interface/Enum/Class/ReactComponent/Hook/Function) w/ upgrade-only-if-Unknown guard (never clobbers 51 curated types) → Unknown 36→9 (75%↓). synced master→Asset Plan copy. src/ untouched (read-only). remaining 9 Unknown = barrel re-exports + Next.js segment config (scan-missing, out of scope). attempts:1
- [X] T-198b: symbol_indexer.py PROJECT_ROOT hardcoded path → dynamic `Path(__file__).resolve().parent.parent` (matches repo_map_check pattern · cwd-independent · copied-in script auto-targets its own project · removes /Volumes/.../Asset Plan footgun). Verified: Asset Plan copy run from any cwd still resolves Asset Plan (87 sym/9 Unknown unchanged) · Harness Agent copy now targets self (0 sym, harmless). Q2 finding: backlink_analyzer fully regenerates derived backlinks each run (idx[p] rebuilt) — no curated field, so upgrade-only-if-Unknown guard is N/A there (nothing curated to clobber). Remaining root-resolution inconsistency: backlink+code_graph still cwd-relative (not file-based) — noted, not changed. attempts:1
- [X] T-198c: symbol_indexer.py merge guard relaxed to fully-auto (user challenge: "มันควรจะเป็น Auto เหมือนกัน"). Investigation: pre-existing types were NOT human-typed — index_variables.json is gitignored, types seeded once by "harness index enrichment" commit, old indexer wrote only "Unknown". Fix: classify() is now authoritative — overwrites existing type when confident, keeps prior only when classify returns Unknown (never regress to Unknown). Verified reproducible: re-run yields identical 87 sym / same breakdown (DBTable 12, PageComponent 16, ReactComponent 16, APIRoute 6, Function 18, Hook 3, Interface 4, Middleware 3, Unknown 9) → proves old "curated" labels were just what classify re-derives. Synced master→Asset Plan copy. Same principle as backlink (full regen, no curated field to protect). attempts:1
- [X] T-198d: Asset Plan token-management footer "not working" → root cause: `.claude/settings.json` stale (older harness version). CLAUDE.md IDENTICAL (footer rule present) but settings.json drifted — PostToolUse used OLD inline python (LOOP_WEIGHT only, NO Session/Chat accumulation) instead of calling the updated `posttool_track.py`; UserPromptSubmit used old p3-reset instead of T-180 armed-reset. posttool_track.py itself was present+identical in Asset Plan but settings.json never called it ("new tool installed, old plug still in"). Prior harness migration (M2-M4) MISSED settings.json. Fix: backed up Asset Plan settings.json→.bak, copied master→Asset Plan. Verified: calls posttool_track.py ✓ · T-180 armed-reset ✓ · valid JSON ✓ · identical to master ✓. NOTE: hooks reload only on NEW session (user must restart Asset Plan session). NOT touched src/. attempts:1

- [X] T-199: Fix session record-keeping — rich detail file + thin pointer index + reliable auto-close (S1 enrich session_close.py +--record-only · S2 thin session_indexer +dup-merge fix · S3 guarded idempotent auto-close in index_reconcile · S4 doc drift fixed · S5 verified end-to-end session_004 · S6 sync+CFP-030-recurrence) · attempts:1 · tool_calls:~22
- [X] T-200: Migration force-refreshes detected.md (Implement/09_migration.md M2.4 rewritten — back up old → reset platform/api_provider to unknown → agent runs B4 inline this run → verify no field=unknown; M0.3 run-contract + When-to-use signal row added; fixes stale model IDs/token_formula surviving old-harness migration) · attempts:1 · tool_calls:~8
- [X] T-201: Audit doc_builder via skill_auditor + fix 6 defects (F1 scope-leak·F2 runaway-loop·F3 hallucination·F4 log/token-leak·F5 not-step-by-step·F6 redundancy) + model_medium→high routing for understanding phase (→ skill_auditor re-audit PASS 0🔴) · attempts:1
[X] T-202: doc_builder cover ALL risks · S1 Coverage Gate (anti-missing-feature · inverse of Grounding Gate) · S2 cross-role single-source link (target=_blank + deep anchor + owner-by-most-used) · S3 re-audit+close · model medium→high understanding · attempts:1 · DONE 2026-06-15
- [X] T-203: Unbiased re-audit of doc_builder (T-202 changes) via neutral skill_auditor sub-agent + simplicity check → caught a real self-introduced contradiction (shared/<task>.html in SKILL_detail §6 vs owner-anchor model in SKILL.md) that the prior biased audit missed · fixed 2 T-202 bugs (shared-page contradiction + Coverage Inventory format pointer) · rule_indexer exit 0 · attempts:1 · DONE 2026-06-16
- [X] T-205: Unbiased audit of harness_editor (project skill-creator) via neutral skill_auditor sub-agent + verify 2 user principles → both ⚠️ weak (auditor-bar Q-A + minimal-output Q-B implied not explicit) · fixed +2 Operating Stance principle bullets + 2 drift cross-links (Scan A/C/D) · flow_updated · rule_indexer exit 0 · attempts:1 · DONE 2026-06-16
- [X] T-206: harness_editor single front-door rule — bundled skill-creator may scaffold a DRAFT only; every project skill must pass through harness_editor (auditor bar + R8 index wiring: backlink·index_files·skill-manifest·REPO_MAP) before it counts · +1 Operating Stance bullet (minimal · no new BC/section) · reuse ideas not files (plugin is global+overwritten-on-update+unwired) · flow Y-T206 · rule_indexer exit 0 · attempts:1 · DONE 2026-06-16
- [/] T-207: upgrade Money_Assistance harness → current via Implement/09_migration.md (Track C M0-M5) · S1 fix stale source VERSION stamp (e4494a4→1566ea7, 2026-06-16) + push · S2-S5 clone-from-GitHub + re-index + copy skills/CLAUDE/AGENTS/Implement + verify+stamp · preserve DEST domain pack + project state · never touch src/

- [X] T-204: Install + adapt Harness into Money_Assistance (Track A fresh install)
  - [X] T-204a S1: scaffold framework engine (copy live files)
  - [X] T-204b S2: reset knowledge indexes + governance docs
  - [X] T-204c S3: bootstrap .sessions/ state
  - [X] T-204d S4: configure detected.md (provider + model tiers)
  - [X] T-204e S5: create + configure domain pack (finance agent team)
  - [X] T-204f S6: wire .claude hooks + git init + .gitignore
  - [X] T-204g S7: verify install (session_compactor + 22-check)
