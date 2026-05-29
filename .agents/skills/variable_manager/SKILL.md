---
name: Variable Index Manager
description: Tracks variable, function, and component definitions and usage in knowledge/index_variables.json.
---

## Sections
```
- id: 1
  name: "Symbol Sync"
  steps: ["check skip conditions", "update index_variables.json", "run symbol_indexer.py", "update used_in links", "[✓ written] verify"]
```

# Variable Index Manager

## Trigger
Run after any symbol is: created · renamed · deleted · body edited · called from a new location.
Called by coder or editor after their section completes.

## Refusal Contract
Skip entirely (emit `[symbol-index-skip]`) if:
- No symbol was created, renamed, deleted, or body-edited this task
- index_variables.json entry already correct with no used_in changes

HALT (emit `[symbol-index-halt]`) if:
- `python scripts/symbol_indexer.py` is missing or fails → report before proceeding
- Rename detected but used_in list not available → cannot safely rename call sites

## Workflow (ordered steps)
1. Identify change type: create · edit · usage-link · rename · delete
2. Apply to index_variables.json:
   - create → add entry with source_path + line_number
   - edit → run `python scripts/symbol_indexer.py` (refreshes line numbers)
   - usage-link → append new location to `used_in[]`
   - rename → update JSON key + trace all `used_in` files via editor skill
   - delete → erase entry from JSON
3. Verify: `grep -c '"<symbol-name>"' knowledge/index_variables.json` → ≥1 (add) or 0 (delete)
4. Emit `[✓ written]` with symbol name + action taken

## Trigger Conditions (detail)
1. **Creation**: any new symbol — component, function, hook, type, constant, API logic.
2. **Body Edit**: code change to existing symbol → run symbol_indexer.py (line drift breaks lookups).
3. **Usage Link**: symbol called/imported in new file → append to used_in[].
4. **Rename**: update JSON key AND trace used_in to rename call sites via editor.
5. **Deletion**: remove from JSON entirely.

## Output Contract
Emit before returning: `[symbol-index] action: <create|edit|link|rename|delete|skip> · symbol: <name> · used_in: <N>`

## Routing
→ Return to calling skill (coder or editor) after emit.
Context Gate: new hard constraint → add to INVARIANTS.md §I2 before returning.

## MECE Constraints Block (copy into mece_plan.md for sections using `variable_manager`)
```
- Always called AFTER coder/editor completes — never before src/ edits
- python scripts/symbol_indexer.py MUST run to sync lookup index after JSON update
- Rename: update JSON key AND emit [symbol-index] with old_name + new_name noted
- [symbol-index] emit required before returning to calling skill
- Do NOT update used_in[] manually — use symbol_indexer.py output to validate
```
