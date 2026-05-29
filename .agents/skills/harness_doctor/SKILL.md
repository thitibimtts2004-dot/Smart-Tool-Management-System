# Harness Doctor Skill

## Overview
Structural fix agent for CFP patterns that recurred AFTER a fix was already applied.
Reads index_cfp_fix.json + relevant harness files → proposes structural change →
waits approval → executes following harness conventions.

## Trigger
- `self_improve §2.5` detects `recurred_after_fix[] not empty`
- User says "harness doctor" / "fix harness pattern" / "recurring cfp" / "ซ่อม harness"
- `self_improve §3` escalation after `deferred_count ≥ 3`

## Refusal Contract
Halt and emit `[harness-doctor-refused]` if:
- First-time CFP with no prior fix attempt → use `self_improve §3+§4` instead
- CFP has `status=active` and `fixes=[]` → not a structural recurrence yet
- Proposal targets `self_improve/SKILL.md` → circular dependency → present to user manually
- §5 Execute begins harness file edits without `.sessions/mece_plan.md` dated today → HALT · write mece_plan first · delegate edits to `harness_editor` (its gate applies — do NOT bypass)

## Workflow
Sequential — each section gates the next:
1. **Diagnosis** — load index_cfp_fix.json → find top recurred CFP → emit `[harness-diagnosis]`
2. **Harness Audit** — grep harness files for structural gap → classify gap type (a/b/c/d) → emit `[audit-finding]`
3. **Proposal** — draft minimal structural fix → dry-run validate → emit `[harness-proposal]` → HALT
4. **Approval Gate** — wait explicit user confirm ("ทำเลย" / "proceed") · no auto-proceed
5. **Execute + Verify** — apply approved change → update index_cfp_fix.json → verify detection signal → emit `[✓ harness-fix]`

## Output Contract

| Step | Required emit / file |
|---|---|
| §1 done | `[harness-diagnosis] CFP-N · recurrences: K · prior fixes: N` |
| §2 done | `[harness-audit] gap found in <file> §<section>` |
| §3 done | `[harness-proposal] <change>` · HALT for approval |
| §4 approved | `[harness-approved] Proceeding to §5` |
| §5 done | `[✓ harness-fix] CFP-N · file: <path> · change: <desc>` |
| §5 done | `knowledge/index_cfp_fix.json` updated · `status: fixed` |

## Routing
- §3 done → HALT · wait for explicit user approval (no auto-proceed)
- §5 Execute: ALWAYS delegate harness file edits to `harness_editor` skill — write mece_plan.md + T-ID in roadmap FIRST · do NOT edit AGENTS.md / CLAUDE.md / SKILL.md directly (CFP-021 prevention)
- §5 done → return to `session_manager §3 Step 1` (continue close flow)
- `[harness-doctor-refused]` → return to caller with refusal reason · no changes made

**Sections:**
1. Diagnosis — identify target CFP + prior fix history + current model
2. Harness Audit — grep harness files to locate the structural gap
3. Proposal — draft structural fix · dry-run validate · HALT for approval
4. Approval Gate — wait explicit user confirm · no auto-proceed
5. Execute + Verify — apply fix · update index · confirm detection signal

→ Full step-by-step procedures for each section:
`@.agents/skills/harness_doctor/SKILL_detail.md`

---

## MECE Constraints Block (copy into mece_plan.md for sections using `harness_doctor`)
- Sections 1-2 (Diagnosis + Audit): read-only — no src/ or harness edits
- Section 3 (Proposal): emit [harness-proposal] then HALT · do NOT execute yet
- Section 4 (Approval Gate): wait explicit user confirm · no auto-proceed
- Section 5 (Execute): apply only the approved proposal — no scope creep
- [✓ harness-fix] trace required at completion · update index_cfp_fix.json status

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
