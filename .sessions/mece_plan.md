# MECE Plan — T-158 mece skill fixes
date: 2026-06-08
task: T-158 fix mece skill — resolve 3 weak components found in 9arm audit (audit_mece.json, CONDITIONAL 6/9)
skill: harness_editor

## Phase 0 — Boot (once per session · keep [X] on resume · reset on topic switch only)
- [X] B1: compact_state.md checked · SESSION_TOTAL=0 · CHAT_TOTAL=sys_fixed · CFP_COUNT=36 stored
- [X] B2-B3: skill=harness_editor identified · SKILL.md loaded · hashes checked
- [X] C0-C3: routing confirmed · topic-switch from T-157(done)/audit-mece(done) → T-158 fix · skill_auditor→harness_editor
→ TOKEN CHECK: SESSION_TOTAL ~0k

---

## Phase 1 — Info Gather
- [X] G0: clarity gate — audit gave precise line-cited findings → criteria clear
- [X] G1: mece/SKILL.md scanned (full read by skill_auditor agent this session)
- [X] G2: audit_mece.json = batch read result · line refs per finding
- [X] G3: 3 sections → file/line + Verify-N draft · [✓ gather] emitted
- [X] gather_complete.md written today (objective · constraints · affected_files · acceptance)

### Files Read — Phase 1
| File | Why | Lines read |
|---|---|---|
| .agents/skills/mece/SKILL.md | audit subject | full (via skill_auditor agent) |
| .sessions/audit_mece.json | findings + line refs | full |

→ TOKEN CHECK: SESSION ~0k

---

## Phase 2 — Plan
- [X] M1.5: serial (single file mece/SKILL.md → no parallel) · irreversible: none (content edit, git-revertable) · risk: mece is load-bearing
       dependency_map: [audit_mece.json → mece/SKILL.md]
       risk_flags: [load-bearing skill — wording-only, no procedure change]
- [X] M2: 3 sections · Tool=Edit · Avoid=full-read SKILL.md (grep/offset) · Model=high · Verify-N per section
- [X] M3: plan + Verify-N sent to user → user confirmed (plan-only, halt before Phase 3)
- [X] M4: roadmap T-158.1/.2/.3 added
- [X] M5: this file written using template · [✓ MECE]

→ TOKEN CHECK: SESSION ~0k
→ [mece-complete] + /compact before Phase 3 (BC-mece-compact) — user explicitly said "ห้ามลงมือ" → HALT after this write

---

## Phase 3 — Execute

### Cycle grouping
Cycle 1 — serial · agents: 1 (main context · 1 file <5 → no sub-agent) → S1 → S2 → S3
(all edit .agents/skills/mece/SKILL.md → shared file → MUST be serial, never parallel)

### Per-Section Invariants (apply to EVERY S<N> · written ONCE)
Constraints — every section carries these PLUS its own line:
  - mece_plan.md dated today + T-N roadmap [/] REQUIRED before any file edit
  - [pre-edit] emit before every Edit · [✓ written] grep verify after every change
  - grep/offset only (mece/SKILL.md 196L >80 · no full-read) · re-read section before edit (R5)
  - mece is load-bearing → refine wording ONLY · never change workflow steps S1-A..S2-C or the 1 BC
  - Output Contracts: [post-read] ≤1L · [✓ written] ≤1L · L4.5 PURGE after each tool result
Marking rule — flip [X] ONLY when [✓ written] + Verify-N both pass this turn

### S1 · T-158.1 · Output Spec — Structure consolidation   [Cycle1 · HIGH]
Context: artifact spec for mece_plan.md is scattered across 3 distant blocks; merge into one labeled block so an agent reads one place.
File: .agents/skills/mece/SKILL.md (L54-70 Plan Format · L105-115 S1-E · L141-154 Output Contract)
Tool: Edit · Avoid: full-read · Model: high · Input_From: audit_mece.json
Action: create one `## Output Spec — Structure` block listing mandatory/optional fields; mark Plan Format as example + pointer to mece_plan_schema.md (canonical); dedupe [mece-skip] format (define once, pointer elsewhere)
Verify-1: `grep -c "## Output Spec" .agents/skills/mece/SKILL.md` =1 · `grep -c "mece_plan_schema.md" mece/SKILL.md` >=1 · [mece-skip] format literal appears once

### S2 · T-158.2 · When NOT to Use — 3 refusals inline   [Cycle1 · MED]
Context: L49 is pointer-only; 2 of 3 refusals not in situ → agent reading only this section misses them.
File: .agents/skills/mece/SKILL.md (When NOT to Use L45-52)
Tool: Edit · Avoid: full-read · Model: high · Input_From: audit_mece.json
Action: state all 3 refusals inline with reason — single-file (<5 lines), read-only/lookup, resume (pending sections exist)
Verify-2: `grep -A8 "When NOT to Use" mece/SKILL.md | grep -ciE "read-only|resume"` >=2

### S3 · T-158.3 · Tone Guide Prohibited fix   [Cycle1 · LOW]
Context: L188 Prohibited contains enforcement echoes (Hard Rules), not tone guardrails.
File: .agents/skills/mece/SKILL.md (Tone Guide L184-188)
Tool: Edit · Avoid: full-read · Model: high · Input_From: audit_mece.json
Action: replace Prohibited with tone prohibitions — no inline prose after signals, no hedging, no token counts in plan output, no section names diverging from target skill sections[]
Verify-3: `grep -A6 "Tone Guide" mece/SKILL.md | grep Prohibited` shows tone items · no "BC"/"enforce" echoes

### Phase 3 Close Checklist
- [ ] re-audit mece (skill_auditor) → confirm no ✅ dropped to ⚠️/❌ · BC count still 1
- [ ] R8: SKILL.md content edit (no rename) → no manifest change · emit [r8-sync-check]
- [ ] Roadmap [X]: T-158.1-3 (attempts + tool_calls)
- [ ] harness_editor Stage4: harness_flow Y-entry + Implement/ check + [harness-edit-done]
- [ ] [session-health] · session_handoff.md written · active_thread phase:done
- [ ] PATH A: close-gate check → clear mece_plan.md Phase 1-3
- [ ] self_improve CFP check · harness_doctor gate
