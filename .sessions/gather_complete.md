# Gather Complete — T-158 mece SKILL.md fixes
date: 2026-06-08
task: T-158 fix mece skill — resolve 3 weak components found in 9arm audit (audit_mece.json, CONDITIONAL 6/9)

## Objective
Raise mece/SKILL.md from CONDITIONAL (6/9) toward PASS by fixing the 3 weak components + reducing the 3 structure redundancies the audit flagged. No new behavior — clarity/consolidation only.

## Source of gather
9arm audit run this session (skill_auditor agent, full read of mece/SKILL.md 196L + framework). Findings persisted to .sessions/audit_mece.json with cited line numbers.

## Findings to fix (with audit line refs)
1. [HIGH] Output Spec - Structure weak - artifact spec scattered across L54-70 (Plan Format), L105-115 (S1-E), L141-154 (Output Contract). No single block; agent reads 3 distant places to know a valid mece_plan.md shape.
2. [MED] When NOT to Use weak - L49 is pointer-only ("see Prerequisites items 3,4"); 2 of 3 refusals (read-only, resume) not stated in situ.
3. [LOW] Tone Guide Prohibited weak - L188 Prohibited holds enforcement echoes (from Hard Rules), not tone prohibitions.

## Structure redundancies (fold into fix 1/2)
- validation gate restated 4x (L114-115, L117-126 BC, L159-160, L161)
- [mece-skip] emit format defined 3x (L36, L50, L148)
- Plan Format (L54-70) over-prescribed exact syntax - mark as example + pointer to mece_plan_schema.md (canonical)

## Affected files
- .agents/skills/mece/SKILL.md (ONLY) - content edits, no rename - no manifest change

## Constraints
- mece is load-bearing (Phase 2 of every task) - refine wording ONLY, never change the actual planning procedure/steps
- harness_editor: Edit tool - grep/offset only (196L >80, no full-read) - re-read each section before edit (R5)
- BC count must stay 1 (audit: appropriate, no overreach) - do not add new BCs

## Acceptance criteria
- AC1: single "## Output Spec - Structure" block exists; the 3 old scattered specs consolidated or pointer-only
- AC2: When NOT to Use states all 3 refusals inline (single-file, read-only, resume) with reason
- AC3: Tone Guide Prohibited lists tone prohibitions (no enforcement echoes)
- AC4: no behavior/step change - workflow S1-A..S2-C + BC intact; re-audit would not drop any pass to weak/missing
