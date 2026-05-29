---
name: Code Editor
description: Focused skill for surgically editing, modifying, and debugging existing application code.
---

## Sections
```
- id: 1
  name: "Diagnose"
  steps: ["R9 3-checks (error_index → symbol_index → file_index)", "read source at line", "assess blast radius"]
- id: 2
  name: "Edit & Verify"
  steps: ["R5 index-first lookup", "apply targeted edit", "[✓ written] grep verify change exists"]
- id: 3
  name: "Sync & Close"
  steps:
    - "python scripts/symbol_indexer.py"
    - "roadmap: mark [X] T-{N}-{BugID}-{AttemptID} with completion annotation"
    - "error_index: assign next ERR-N → write full entry (Symptom/Root Cause/Resolution)"
    - "active_thread.md → phase: done"
```

# Code Editor Skill

## Responsibilities
You are the "Surgeon". Your job is to modify existing code safely without breaking established logic.

## Trigger
Activated when:
- User reports a bug or error → fix task
- Code requires a targeted modification or refactor
- Orchestrator delegates an `edit src/` section from a MECE plan

## Refusal Contract
Halt and emit `[edit-refused]` if:
- No roadmap T-ID assigned before editing (R-Roadmap gate)
- Edit targets `src/` but `gather_complete.md` or `mece_plan.md` missing/stale (Phase Transition Gate)
- Destructive overwrite >5 lines without pre-edit blast-radius check

On refusal: emit `[edit-refused] Reason: <what's missing>` → prompt user/orchestrator to resolve → HALT.

## Roadmap Protocol (MANDATORY — before and after every edit)

**Before editing:**
```bash
# Step 1 — find parent task and assign ID
grep -n "\[.\] T-" docs/master_roadmap.md | tail -10
# → Bug fix:  find parent T-<N> → count existing bugs → assign T-{N}-{BugID}-01
# → Sub-task: find parent T-<N> → assign T-<N>.{sub}: <description>

# Step 2 — add entry to roadmap ([ ] → [/] when starting)
[ ] T-{N}-{BugID}-01: <short description of bug>   ← add before starting
[/] T-{N}-{BugID}-01: <short description of bug>   ← update when starting

# Step 3 — Run R9 3-step checks before touching any code
```

**After editing — 4 mandatory steps:**
```bash
# Step 1 — sync symbol index
python scripts/symbol_indexer.py

# Step 2 — mark roadmap done
[X] T-{N}-{BugID}-01: <description> (→ ERR-XXX) · attempts: 1 · tool_calls: <N>

# Step 3 — write error_index entry (REQUIRED for every bug fix)
grep "## ERR-" knowledge/error_index.md | tail -1
# → take highest number + 1 → assign as ERR-XXX
## ERR-XXX: <Short title>
- **Task:** T-{N}-{BugID}-01 · **Session:** session_<NNN>
- **File:** src/path/to/file.ts · **Line:** <N>
- **Symptom:** <what the error looked like>
- **Root Cause:** <why it happened>
- **Resolution:** <exact fix applied>

# Step 4 — call variable_manager if any symbol body was changed
```

## Workflow

**Section 1 — Diagnose:**
- R9 Step 0: recurring-fix detection (check error_index + roadmap for prior AttemptIDs)
- 3-checks: grep error_index → grep index_variables → grep index_files
- Read source at line (R5 index-first: T0→T1→T2→T3 escalation)
- Assess blast radius before any edit

**Section 2 — Edit & Verify:**
- R5 index-first lookup → emit `[pre-edit]` blast-radius gate
- Apply targeted edit (<5 lines → Edit tool; >5 lines → stage first)
- `[✓ written]` grep verify: confirm change exists in file

**Section 3 — Sync & Close:**
- `python scripts/symbol_indexer.py`
- Roadmap `[ ] → [X]` with ERR-XXX · attempts · tool_calls
- Write ERR-XXX entry in `knowledge/error_index.md`
- Write `active_thread.md` → `phase: done`

→ Full lookup tiers, post-read verdicts, pre-edit gate, R9 step 0 detail:
`@.agents/skills/editor/SKILL_detail.md`

## Output Contract

Every edit session MUST emit (no exceptions):
| Gate | Emit | When |
|---|---|---|
| Before Read | `[pre-read] Target: · Tier: T<N> · Line: · Will read: offset= limit=` | Every Read call |
| After Read | `[post-read] File: · Verdict: relevant\|partial\|irrelevant` | Every Read result |
| Before Edit | `[pre-edit] Symbol: · used_in: <N files> · safe to edit: yes\|needs review` | Every named-symbol Edit |
| After Edit | `[✓ written]` + grep verify result | Every successful Edit/Write |
| Bug fix close | ERR-XXX entry in error_index.md | Every bug fix |
| Section close | Roadmap `[X]` with annotation | Every completed task |

## Routing
- Section 3 done → return to orchestrator (session_manager §3 Step 1)
- `[blocked]` halt → report `T-{N}: <cause>` → wait for user/orchestrator decision
- Sub-task complete → return to parent task context

## Limitations
- Do not create entirely new architectures — delegate to `coder` skill instead.
- Source work scope: `src/`, targeted config files.

## File Size Contract (applies to all .md files created or edited)
**Behavioral contract first:** every harness skill/rule file must have — Trigger · Refusal · Workflow · Output Contract · Routing.
Prose rules without these 5 elements = incomplete contract → add before shipping.

**Size zones:**
| Zone | Lines | Action |
|---|---|---|
| 🟢 Ideal | ≤200L | No action needed |
| 🟡 Acceptable | 201–250L | Must have `SKILL_detail.md` with `@` reference at bottom of Workflow |
| 🔴 Must split | >250L | Split required — no exceptions |

**Split rules:**
1. `SKILL.md` = contract only (Trigger · Refusal · Workflow · Output Contract · Routing) — keep in 🟢 zone
2. `SKILL_detail.md` = examples, templates, detailed procedures
3. Add reference in primary: `@.agents/skills/<name>/SKILL_detail.md` at bottom of Workflow section
4. Never split the contract itself — all 5 elements stay in SKILL.md

## MECE Constraints Block (copy into mece_plan.md for sections using `editor`)
```
- [pre-read] T0 lookup + emit before every Read · [post-read] verdict (relevant|partial|irrelevant)
- [pre-edit] emit before every named-symbol Edit · blast radius: check used_in count first
- [✓ written] grep-verify after every Edit/Write — mandatory before marking section done
- R14: [gate] + wait confirm before delete/overwrite >5 lines or batch >5 files
- Harness files (.agents/): check wc -l → flag >200L → split if >250L
```

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
