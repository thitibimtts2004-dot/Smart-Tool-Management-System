---
name: mece
description: Loop Phase 2 — builds a section-based plan that maps 1:1 to target Skill sections[]. Runs once per task. Skipped on resume if plan exists.
---

## Sections
```
- id: 1
  name: "Build Plan"
  steps: ["load target Skill sections[]", "M1.5 reasoning (dependency_map + risk_flags)", "map steps per section", "Verify + Rollback + Constraints per section", "write + validate mece_plan.md"]
- id: 2
  name: "Confirm & Register"
  steps: ["send plan → wait confirm", "R-Roadmap [ ] T-<N> per section", "emit [✓ MECE]"]
```

---

# MECE Planner

## Trigger
- **Phase 2:** after Info Gather completes — tasks with >3 steps OR any side effect
- **Side effects:** file create/edit/delete · DB write · index update · symbol rename

## Refusal Contract
Emit `[mece-skip]` and skip to Phase 3 when:
- Read-only task: grep / search / explain / lookup — no side effects
- Single-file edit, backlinks = 0, no ERR documentation needed
- Resuming with existing valid plan → load plan → jump to pending section (skip Phase 1+2)

On refusal: emit `[mece-skip] reason: <read-only | single-file | resuming>` → return to main agent.

## Plan Format (key fields — 1:1 with target Skill sections[])

```
Section N — <name from Skill sections[N]>:
  Skill:          <editor|coder|file_manager|variable_manager|agent|ascii_flow|harness_doctor>
  Tool:           <Bash|Read|Edit|Write>
  Constraints:    (≤5 lines from skill's MECE Constraints Block — see S1-D)
  Steps:          [A] → [B] → [C]  (≤5 per section)
  Verify:         <grep/compile/read-back command>  (≤2 per section · ≤60 chars each)
  Rollback:       <undo if this section fails>  (≤15 words)
  Expected_Traces: <emit signals the skill must produce — from skill Output Contract>
  Refusal_Path:   <if skill emits [skill-refused] → action: halt|skip|retry>
  Data_Sent:      Thai ___ch | ENG: ___ch  ← fill AFTER section completes
  Token:          ___k                     ← fill AFTER section completes
```

Rules: match section count exactly · steps = 1 atomic action · total plan ≤120 lines
→ Full templates (Bug Fix · New Feature · Refactor · Multi-skill): `@.agents/skills/mece/SKILL_detail.md §Templates`

## Workflow

**Section 1 — Build Plan:**
```
[S1-A]   Load sections[] from Boot context (re-read SKILL.md only if skill changed)
[S1-A.5] REASON pass (≤600 tok · memory only · do NOT write to file):
           □ Sequential: section A output → B input?
           □ Parallel: no shared state → can run together
           □ Irreversible: [gate]/delete/DB write → flag + scope note
           □ Risk surface: highest blast-radius section
           → informs Cycle grouping + Verify-N criteria
[S1-B]   Map MECE steps to each section
[S1-C]   Add Verify + Rollback per section
[S1-D]   Copy Constraints: from each section's SKILL.md ## MECE Constraints Block (≤5 lines)
           Fallback (no MECE Constraints Block): read skill's ## Refusal Contract + ## Output Contract
           → extract: refusal conditions → Refusal_Path: · required emits → Expected_Traces:
[S1-E]   Write .sessions/mece_plan.md using Phase-Checklist Template (docs/session_templates/mece_plan_schema.md)
           → no simplified format (CFP-019) → validate immediately:
           grep -cE "^  Constraints:" → = section count
           grep -c "## Phase 0" → = 1
           grep -c "## Phase 1" → = 1
           grep -c "## Phase 2" → = 1
           grep -c "## Phase 3" → ≥ 1
           grep -cE "^  Tool:" → = section count
           FAIL any check → rewrite to fix → re-validate before proceeding · emit `[mece-fail] Step: S1-E · Cause: <missing block>`
```

**Section 2 — Confirm & Register:**
```
[S2-A] Send plan → wait confirm ("ok" / "go" / "ดำเนิน" / "yes" / explicit approval)
[S2-B] R-Roadmap: add [ ] T-<N>: <section-name> per section
[S2-C] Emit [✓ MECE]
```

→ Phase-Checklist Template (Phase 0–3 blocks for mece_plan.md): `@.agents/skills/mece/SKILL_detail.md §Checklist`
→ Verify Pattern Lookup table (by action type): `@.agents/skills/mece/SKILL_detail.md §VerifyPatterns`

## Output Contract

| Action | Required emit |
|---|---|
| Plan ready | `[✓ MECE] Plan covers <N> sections in <M> Cycles · user confirmed · roadmap entries added` |
| Section done | `[MECE] ✓ Section <N> done · → Section <N+1> next` |
| Cycle done | `[cycle N] All <X> sections done · results: cycle_N_*.json · spawning Cycle <N+1>` |
| Plan skipped | `[mece-skip] reason: <read-only | single-file | resuming>` |
| Token check | `TOKEN CHECK` before every new Cycle/Section |
| Validate fail | `[mece-fail] Step: <S1-E check> · Cause: <which field missing>` |

Required files written:
- `.sessions/mece_plan.md` — **Phase-Checklist Template mandatory** (docs/session_templates/mece_plan_schema.md) — Phase 0–3 blocks required · no simplified format (CFP-019) · S1-E validates on write
- `docs/master_roadmap.md` — `[ ] T-<N>` per section (M4, before Phase 3)

## On-Demand Wire Triggers (load only when condition fires — never pre-load)

| Condition | Load |
|---|---|
| Sub-agent spawn needed (≥5 files OR section >8 steps) | `agent/SKILL.md §Spawn Rules` |
| OmO roles (sections > 2 OR [gate]/DB action) | `agent/SKILL.md §OmO` |
| CFP pattern / R16 fires | `self_improve/SKILL.md §CFP Logging` |
| DB edit detected (`src/db/` touch) | `INVARIANTS.md §I2` |
| Error recurring ("still broken" / same ERR-XXX) | `error_index.md ERR-XXX entry` |
| Session close ("ปิด/close/done") | `session_manager/SKILL.md §3` |
| Token >60k | `session_manager/SKILL.md §2 TOKEN PAUSE` |

Rule: 1 lookup + 1 targeted Read = 2 tool calls max per trigger.

## Routing
- `[✓ MECE]` emitted → return to main agent → Phase 3 REACT LOOP begins
- S1-E validate fail → rewrite mece_plan.md → retry once → `[mece-fail]` → HALT
- `[mece-skip]` → return to main agent → Phase 3 directly (existing plan loaded)
- Token >60k during Phase 2 → TOKEN PAUSE → `session_manager §2`

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
