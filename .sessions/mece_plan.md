# MECE Plan — T-042 Token Optimization Pack
date: 2026-05-31
task: safe_run.py + AGENTS.md (reviewer inline/compact 30k/cache) + CLAUDE.md R3 + Implement/04+08 + benchmark
skill: harness_editor

## Phase 0 — Boot (once per session · keep [X] on resume · reset on topic switch only)
- [X] B1: SESSION_TOTAL=0 · CHAT_TOTAL=7300 · CFP_COUNT=19 stored
- [X] B2-B3: skill=harness_editor · SKILL.md loaded
- [X] C0-C3: routing confirmed · topic switch from T-041 → T-042 handled
→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

## Phase 1 — Info Gather
- [X] G0: task clarity gate passed (file paths + feature names + acceptance criteria known)
- [X] G1-G3: gather done via conversation (safe_run.py spec · rule targets · benchmark design)
- [X] gather_complete.md (informal — accepted via conversation confirmation)
→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

## Phase 2 — Plan
- [X] M1.5: dependency_map: [S1→S5 benchmark depends on S1] · risk_flags: [new script creation]
- [X] M2-M4: plan confirmed by user ("แผนดีครับ")
- [X] M5: mece_plan.md written · [✓ MECE]
→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

## Phase 3 — Execute

### S1 · T-042 · scripts/safe_run.py (priority-first filter)
Skill: harness_editor
File: scripts/safe_run.py (NEW)
Tool: Write
Rollback: rm scripts/safe_run.py
Data_Sent: full script content (THRESHOLD=40, CHUNK=25, signal patterns)
Token: ~400 output
Constraints:
  - MUST handle both: signal lines (grep error|warn|fail) + non-signal chunks
  - MUST show "[+N more lines]" when truncated
  - MUST pass-through short output (≤THRESHOLD) unchanged
  - MUST handle exit codes from subcommands
Verify-1a: python3 scripts/safe_run.py "seq 1 50" | wc -l
Expected: ≤30
Verify-1b: python3 scripts/safe_run.py "echo 'error: test'" | grep "error:"
Expected: found
- [X] S1
→ TOKEN CHECK: SESSION_TOTAL ~32k

### S2 · T-042 · AGENTS.md — 3 new rules
Skill: harness_editor
File: AGENTS.md
Tool: Edit
Rollback: git checkout AGENTS.md
Data_Sent: Reviewer inline threshold rule + compact 30k rule + cache-aware note
Token: ~300 output
Constraints:
  - AGENTS.md 247L — minimal targeted edits only
  - Reviewer inline: add to §Completion Gate after "spawn Reviewer" line
  - Compact 30k: add to §Phase 3 TOKEN PAUSE block
  - Cache note: add to §Boot or §R1 token tracking
Verify-2: grep -c "inline\|30k\|cache" AGENTS.md
Expected: ≥3
- [X] S2
→ TOKEN CHECK: SESSION_TOTAL ~36k

### S3 · T-042 · CLAUDE.md R3 threshold update
Skill: harness_editor
File: CLAUDE.md
Tool: Edit
Rollback: git checkout CLAUDE.md
Data_Sent: new R3 row: SESSION_TOTAL >30k + sections≥3 → compact after current section
Token: ~150 output
Constraints:
  - CLAUDE.md is project-level (not global) — safe to edit
  - Only add 1 row to R3 table — no other changes
Verify-3: grep "30k\|multi-section" CLAUDE.md
Expected: ≥1 match
- [X] S3
→ TOKEN CHECK: SESSION_TOTAL ~38k

### S4 · T-042 · Implement/04+08 update
Skill: harness_editor
File: Implement/04_skills.md · Implement/08_checklist.md
Tool: Edit (x2)
Rollback: git checkout Implement/04_skills.md Implement/08_checklist.md
Data_Sent: safe_run.py usage note + batch tool calls guidance + 3 new checklist items
Token: ~400 output
Constraints:
  - Both files large — grep line numbers first before Edit
  - 04_skills.md: add safe_run.py usage in §Plan Format / execution notes
  - 08_checklist.md: add 3 items (safe_run · reviewer inline · compact 30k)
Verify-4: grep -c "safe_run\|inline\|30k" Implement/08_checklist.md
Expected: ≥3
- [X] S4
→ TOKEN CHECK: SESSION_TOTAL ~42k

### S5 · T-042 · Benchmark — measure token savings
Skill: harness_editor
File: docs/token_benchmark.md (NEW)
Tool: Bash + Write
Rollback: rm docs/token_benchmark.md
Data_Sent: before/after test results for 3 scenarios
Token: ~500 output
Constraints:
  - Test 3 scenarios: (A) seq 1 100 (B) simulate git error storm (C) backlink_analyzer
  - Record: raw line count vs filtered line count + estimated token delta
  - Write results to docs/token_benchmark.md
Verify-5: ls docs/token_benchmark.md && grep -c "Before\|After\|Saved" docs/token_benchmark.md
Expected: ≥3
- [X] S5
→ TOKEN CHECK: SESSION_TOTAL ~46k

### S6 · T-042 · Step 5 Close
Skill: harness_editor
File: knowledge/harness_flow_20260526.md · docs/master_roadmap.md · .sessions/*
Tool: Edit + Bash
Rollback: git checkout knowledge/harness_flow_20260526.md
Data_Sent: Y23 entry + T-042 [X] + session_handoff
Token: ~400 output
Constraints:
  - harness_flow: targeted Edit (grep Y-entry section first)
  - emit [harness-edit-done] BEFORE Thai summary
Verify-6: grep "Y23" knowledge/harness_flow_20260526.md
Expected: 1 match
- [ ] S6
→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

## Phase 3 — Close Checklist
- [ ] R8 index sync: index_files.json for safe_run.py + token_benchmark.md
- [ ] Roadmap [X]: T-042 annotated
- [ ] Spawn Reviewer (haiku): Verify-N list
- [ ] [mece-audit] emitted
- [ ] Ask user: "มีอะไรอยากแก้ไขหรือปรับเพิ่มไหมครับ?"
- [ ] Feedback delivered
- [ ] [session-health] emitted
- [ ] harness_editor Step 5 gate → [harness-edit-done] → Thai summary
- [ ] session_handoff.md written
- [ ] self_improve: CFP_COUNT check

---

## Close Path — PATH A
- [ ] active_thread.md → phase: done
- [ ] SESSION_TOTAL written
- [ ] Clear mece_plan.md Phase 1–3
