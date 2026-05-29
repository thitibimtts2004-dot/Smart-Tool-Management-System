---
name: File Index Manager
description: Manages the lifecycle of files and their dependencies in knowledge/index_files.json.
---

## Sections
```
- id: 1
  name: "Index Update"
  steps: ["check skip conditions", "update index_files.json entry", "add/remove backlinks", "[✓ written] verify no stale links"]
```

# File Index Manager

## Trigger
Run after any file is: created · moved · deleted · has imports changed.
Called by coder or editor after their section completes.

## Refusal Contract
Skip entirely (emit `[file-index-skip]`) if:
- No file was created, moved, deleted, or had imports changed this task
- index_files.json entry already exists with correct backlinks and no import changes

HALT (emit `[file-index-halt]`) if:
- index_files.json is missing or unreadable → report to user before proceeding

## Workflow (ordered steps)
1. `grep -A 6 '"<changed-file-path>"' knowledge/index_files.json` → check current entry
2. Determine action: add entry · update backlinks · remove entry · remove stale backlinks
3. Apply changes via grep-only (Never-Full-Load: use targeted edits, not full read)
4. Verify: `grep -c "<changed-file-path>" knowledge/index_files.json` → ≥1 (for add/update) or 0 (for delete)
5. Emit `[✓ written]` with count of backlinks updated

## The Many-to-Many Backlink Rule
1. **Creation/Import**: Creating File A that imports B and C → append File A to `backlinks[]` of B and C.
2. **Deletion**: File removed → erase its entry AND remove it from every other file's `backlinks[]`.
3. **Modification**: Import removed → remove the backlink from the target file.

## Pre-Analysis Role
Before coder/editor touches a file: `grep` this index to check all backlinks affected.

## Output Contract
Emit before returning: `[file-index] action: <add|update|remove|skip> · files: <N> · backlinks: <N>`

## Routing
→ Return to calling skill (coder or editor) after emit.
Context Gate: new hard constraint discovered → add to INVARIANTS.md §I2 before returning.

## MECE Constraints Block (copy into mece_plan.md for sections using `file_manager`)
```
- Always called AFTER coder/editor completes — never before src/ edits
- backlinks[] cascade: update every file that imports the changed file
- size object required for every new file entry (bytes + lines)
- python scripts/symbol_indexer.py runs AFTER index_files.json update
- [file-index] emit required before returning to calling skill
```
