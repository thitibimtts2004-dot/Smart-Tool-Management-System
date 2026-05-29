---
name: Coder (Creator)
description: Focused skill for implementing new features and creating application files.
---

## Sections
```
- id: 1
  name: "Scope & Index"
  steps: ["R4 scope probe", "check index_files + index_variables for conflicts", "confirm no duplicates"]
- id: 2
  name: "Build"
  steps: ["create files to standards", "write code", "self-correct linter errors", "[✓ written] verify each file"]
- id: 3
  name: "Sync & Close"
  steps: ["call file_manager", "call variable_manager", "python scripts/symbol_indexer.py", "roadmap [X]"]
```

# Coder Skill

## Trigger
Activated when:
- Orchestrator delegates a `Skill: coder` section from a MECE plan
- Task requires creating new files, components, or features from scratch
- `mece_plan.md` section type = "Scope & Index" / "Build" / "Sync & Close"

## Refusal Contract
Halt and emit `[coder-refused]` if:
- Task is editing/fixing *existing* code → delegate to `editor` skill instead
- `gather_complete.md` or `mece_plan.md` missing/stale before any `src/` write
- No T-ID assigned in roadmap before starting

On refusal: emit `[coder-refused] Reason: <edit-not-create | missing-plan | no-task-id>` → HALT.

## Workflow
Sequential: Roadmap [/] → gather context (G2 targeted reads) → write new file(s) → verify (grep + build check) → Index Sync (file_manager + variable_manager) → Roadmap [X] → session close.
Full per-step detail: `## Roadmap Protocol` · `## Responsibilities` · `## Coding Standards` below.

## Output Contract
Required outputs per section:

| Action | Required |
|---|---|
| Every file created | `[✓ written]` + grep verify (file exists at path) |
| Section 3 done | `index_files.json` + `index_variables.json` updated via `file_manager` + `variable_manager` |
| Every task complete | Roadmap `[ ] → [X] T-<N>` annotation |
| Linter error found | Fix inline before proceeding — never leave TS errors |

## Routing
- Section 3 (Sync & Close) done → return to orchestrator / session_manager §3
- `[blocked]` → halt · report `T-<N>: <cause>` · wait for orchestrator decision
- File created → trigger `file_manager` + `variable_manager` before closing section

## Responsibilities
You are the "Builder". When the Agent delegates a new feature task to you, focus on writing robust, error-free code and establishing new files.

## Roadmap Protocol (MANDATORY — before and after every task)

**Before writing any code:**
```
1. python scripts/lookup.py "<feature topic>" --session --json
   → check if a prior session already built or attempted this feature
   → High-score match: Read that session JSON → review files_changed[] and History[]
     to understand what was built, what approach was used, what was left incomplete
   → No match or irrelevant: proceed to step 2
2. grep docs/master_roadmap.md for existing task matching this work
   → Found: note the Task ID (e.g. T-017) → set status [/] (in progress)
   → Not found: assign next T-<N> → add [ ] T-<N>: <description> to roadmap
3. Note the Task ID — all work in this session is under that ID
```

**After completing code:**
```
1. Mark roadmap: [X] T-<N>: <description> · session_<NNN>
2. Call file_manager + variable_manager to sync indexes
```

## Coding Standards (Cloudflare & Next.js)
1. **Framework Strictness**: Follow standard directory conventions for new files (`src/app/`, `src/components/`, etc.).
2. **Database Integrity**: When creating Drizzle schemas, ensure they match the Technical Requirements Document carefully.
3. **Self-Correction (Linter)**: If you notice a TypeScript error or Linter warning while writing, fix it immediately before finishing your execution.
4. **Aesthetics & UI**: Use TailwindCSS standard utility classes. Strive for a minimalist, modern enterprise look.
5. **Local Staging**: When generating large files or major architectural components, write them to a temporary staging area (e.g., `/tmp/` or local `temp/` inside the project) first using your creation tools, verify their structure, and then move them to their final destination. This prevents token waste on failed direct file injections.

**Staged file cleanup:** If a staged write fails or is abandoned mid-task:
- Delete the staged file immediately
- Emit `[staged-drop] <path>` to signal that this content must not appear in subsequent context or `context_files:`

## Read Protocol

For every file read during task execution: follow R5 (grep → [pre-read] → offset+limit).
After each Read result, emit verdict immediately:
```
**[post-read]** File: `<path>` · Verdict: relevant|partial|irrelevant
```
- `irrelevant` → drop from context · do NOT include in `context_files:` when spawning sub-agents
- `partial` → keep excerpt only (note line range) · discard remaining content
- `relevant` → keep in working context

Skipping verdict = CFP-004 violation. Every Read needs a verdict.

## Limitations
- Do **NOT** manipulate `.agents/` or `*.json` index files directly — call `file_manager` + `variable_manager` skills after creating files.
- **DO** update `docs/master_roadmap.md` — roadmap entries are mandatory (see Roadmap Protocol above).
- Source work scope: `src/`, `wrangler.toml`, `package.json`, `next.config.ts`.

## Flow Diagram Rule
Creating any `.md` file that contains a flow diagram or architecture chart → **load `ascii_flow` skill first**.
```
[→ ascii_flow] Before drawing any box diagram in <file>
```
Style reference: `knowledge/harness_flow_20260525.md` · Skill: `.agents/skills/ascii_flow/SKILL.md`

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

## MECE Constraints Block (copy into mece_plan.md for sections using `coder`)
```
- Roadmap `[ ] T-<N>` written BEFORE any file creation begins (R-Roadmap gate)
- [✓ written] verify each file immediately after Write — mandatory
- Do NOT edit index files (index_files.json / index_variables.json) directly — call file_manager after
- Edge Runtime: no Node.js APIs — WebCrypto only
- R15: any touch of src/db/ → [db-gate] → HALT for explicit confirm
```

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
