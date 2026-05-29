---
name: Harness Editor
description: Manages all edits to harness configuration files (CLAUDE.md, AGENTS.md, SKILL.md, knowledge/, Implement/) with mandatory MECE planning and full close sequence.
---

## Sections
```
- id: 1
  name: "Diagnose & Plan"
  steps: ["wc-l scope probe", "File Size Contract check", "confirm mece_plan.md + T-N roadmap [/]"]
- id: 2
  name: "Edit & Verify"
  steps: ["[pre-edit] emit", "targeted Edit/Write", "[✓ written] grep verify", "5-element contract intact check"]
- id: 3
  name: "Close & Sync"
  steps: ["index sync (skill-manifest if new skill)", "harness_flow update", "Implement/ update", "roadmap [X]"]
```

# Harness Editor Skill

## Trigger
Activated when:
- Task edits any harness config: `CLAUDE.md` · `AGENTS.md` · any `.agents/skills/*/SKILL.md`
- Task modifies `knowledge/` docs (harness_flow, session_index, error_index, registry)
- Task updates `Implement/` documentation
- Orchestrator delegates `Skill: harness_editor` section from a MECE plan

## Refusal Contract
Skip entirely (emit `[harness-skip]`) if:
- No harness file is being modified — purely `src/` edits → delegate to `coder` / `editor`

HALT (emit `[harness-refused]`) if:
- `mece_plan.md` missing or not dated today → Phase 1+2 required first
- No T-ID assigned in roadmap before starting
- Target SKILL.md >250L with no split plan ready → write split plan before edit
- Step 5 incomplete at task end (flow_updated=no when harness file changed) → complete Step 5 first · do NOT emit `[harness-edit-done]` until `flow_updated=yes`

## Workflow (ordered steps)

### Step 1 · Scope Probe (mandatory before any edit)
```
wc -l <target_files>              → zone check (🟢 ≤200 · 🟡 201-250 · 🔴 >250)
grep -n "<target_symbol>" <file>  → exact line number before every Edit
```
File Size Contract:
- 🟢 ≤200L → edit freely
- 🟡 201–250L → must have `SKILL_detail.md` + `@` reference in Workflow
- 🔴 >250L → HALT · split plan before any edit

### Step 2 · MECE Plan Gate (cannot skip)
```
[ ] mece_plan.md dated today   → required
[ ] T-N in roadmap marked [/]  → required
```
Missing either → `[harness-refused]` → stop · write plan → retry.

### Step 3 · Edit per Behavioral Contracts
For each target file:
- Emit `[pre-edit] Symbol: <name> · file: <path>` before every Edit
- Targeted Edit only (grep line numbers first) — no full-file rewrites for existing files
- `[✓ written]` + grep verify immediately after each change
- SKILL.md edits: `grep -c "## Trigger\|## Refusal\|## Workflow\|## Output Contract\|## Routing" <file>` → must stay ≥5

### Step 4 · Index Sync
After all edits complete:
- New skill created → add entry to `skill-manifest.json` + row to `registry.md`
- New file in `knowledge/` or `Implement/` → call `file_manager` skill
- No `src/` symbol changes → skip `variable_manager`
- Any file added/modified in `knowledge/index_files.json` scope:
  ① Assign `topics[]` from `knowledge/topic_registry.json` (closed list — no free-text tags)
  ② Run: `python3 scripts/backlink_analyzer.py` → refreshes `related[]` 3-tier links

### Step 5 · Docs Close (mandatory — same task, no deferral)
```
[A] knowledge/harness_flow_20260526.md:
    grep -n target section → targeted edit · [✓ written]
[B] Affected docs — check all that apply:
    REPO_MAP.md            ← new file / dir / skill created or removed → MANDATORY entry
    Implement/04_skills.md ← skill added or contract changed
    Implement/08_checklist.md ← workflow changed
[C] Roadmap: [/] T-<N> → [X]
[D] Write active_thread.md: phase: done
```

@.agents/skills/harness_editor/SKILL_detail.md

## Output Contract
Emit before returning:
`[harness-edit-done] files: <N> · lines_changed: <total> · flow_updated: <yes|no> · impl_updated: <yes|no>`

Per changed SKILL.md: emit `wc-l: <N>L (🟢|🟡|🔴)` after verify.

**User-facing close (Thai — mandatory after `[harness-edit-done]`):**
```
งานเสร็จแล้วครับ ✅
แก้ไข <N> ไฟล์: <สรุปสั้น ๆ ว่าเปลี่ยนอะไร — ภาษาไทย>
สั่งงานต่อได้เลยครับ
```
Rule: [harness-edit-done] = harness signal (English · machine-readable) · user summary = Thai · always both · never English-only close.

## Routing
→ After `[harness-edit-done]` + Thai user summary → return to orchestrator / session_manager §3
→ `[blocked]` → halt · report `T-<N>: <cause>` · wait for orchestrator decision
→ New skill created → S4 (manifest+registry) must complete before returning
→ Structural CFP pattern discovered during edit (recurring rule violation in harness) → emit `[escalate-to-harness_doctor]` · halt current section · let harness_doctor diagnose before continuing

## MECE Constraints Block (copy into mece_plan.md for sections using `harness_editor`)
```
- mece_plan.md dated today + T-N roadmap [/] REQUIRED before any file edit
- [pre-edit] emit before every Edit · [✓ written] grep verify after every change
- File Size Contract: ≤200L 🟢 · 201-250L 🟡 (SKILL_detail.md required) · >250L 🔴 HALT+split
- harness_flow_20260526.md + affected Implement/ MUST be updated in same task (Step 5)
- [harness-edit-done] emit required before returning to orchestrator
```

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
