---
name: ascii_flow
description: Produces ASCII flow diagrams and architecture charts using a strict char palette and box/connector templates.
---

## Sections
```
- id: 1
  name: "Diagram Production"
  steps: ["verify invoke pattern", "select chars §1", "build boxes §2", "apply detail §3", "connect §4", "verify box count"]
```

# ascii_flow Skill

## Trigger
Activated when creating or updating:
- ASCII flow diagrams / architecture charts in any `.md` file
- Flow reference docs (e.g., `knowledge/harness_flow_*.md`)
- Any `.md` file that will contain a box/connector diagram

Reference style: `knowledge/harness_flow_20260525.md`

## Refusal Contract
Skip entirely (emit `[ascii-skip]`) if:
- No diagram or flow doc is required in this task
- Task is purely code/config — no architectural documentation needed
- Calling skill does not include `[→ ascii_flow]` invoke pattern

## Workflow
Sequential: verify `[→ ascii_flow]` invoke pattern → select chars from §1 Char Palette → build boxes from §2 templates → apply §3 detail level → connect with §4 flow connectors → structure per §5 doc format → emit `[ascii-done]`.
Full char palette, templates, guidelines, connectors, doc structure: `@.agents/skills/ascii_flow/SKILL_detail.md`

## Output Contract
Every diagram produced must use:
- Chars exclusively from §1 Char Palette (no Unicode outside palette)
- Box structure from §2 box-templates
- Node detail level from §3 detail-guidelines
- Connector patterns from §4 flow-connectors
- Emit `[ascii-done] <title> · lines: <N>` on completion

## Routing
→ After diagram written and verified:
- Emit `[ascii-done] diagram: <file> · boxes: <N>`
- Return to calling skill (coder / editor / mece) — do not initiate further actions

## MECE Constraints Block (copy into mece_plan.md for sections using `ascii_flow`)
```
- Only trigger when section creates/updates a .md file with a flow diagram
- Chars must be from §1 Char Palette only — no Unicode outside palette
- [ascii-done] emit required after diagram written and box-count verified
- Verify: grep -c "┌" <file> → matches expected box count
- Return to calling skill immediately after [ascii-done] — do not initiate further actions
```

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task

@.agents/skills/ascii_flow/SKILL_detail.md
