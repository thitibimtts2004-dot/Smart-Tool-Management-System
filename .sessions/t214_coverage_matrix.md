# T-214 Coverage Matrix
dt: 2026-06-18

> P1 = refuse-without-required-inputs | P2 = simpler-way pass (→ scrutinize) | P3 = disproof-first + breadcrumb ledger | P4 = recite-discipline-verbatim

| Skill | P1 refuse-gate: Y/N + anchor | P2 simpler-way: Y/N + anchor | P3 disproof+ledger: Y/N + anchor | P4 recite: Y/N + anchor | already-has-any? | note |
|---|---|---|---|---|---|---|
| agent | N — no external prerequisites; routing is internal auto-logic with no user-supplied inputs required | N — orchestration / routing, not a build/review skill; no artifact to simplify | N — orchestration/delegation only; no debugging or hypothesis testing | N — low-stakes routing; no destructive/irreversible action | has Refusal Contract but not P1-style input gate | fallback orchestrator; skip all 4 patterns |
| ascii_flow | Y — `## Prerequisites` (L61-71): target file, invoke pattern, diagram intent; emits `[ascii-skip]` per item | Y — insert one-liner at end of `## Refusal Contract` or before `## Workflow`: "Is there a simpler diagram structure? → scrutinize" | N — diagram production; no debugging hypotheses | N — low-stakes diagram skill; no irreversible action | P1 already present (full gate with named emits) | P1 done; add P2 only |
| coder | Y — `## Prerequisites` (L47-58): T-ID, scope, no harness target, edit route; emits `[coder-refused]` | Y — build skill; insert one-liner after step 2 or in `## Routing` section near completion offer: "→ scrutinize for simpler-way check after build" | N — build skill, not debug; R9 / linter loop already in workflow | N — src/ edits are reversible; no gate-level irreversibility | P1 present; completion offer partially covers P2 direction | add P2 one-liner only |
| doc_builder | Y — `## Prerequisites` (L54-64): project_root, base_url, routes; emits `[doc-builder-refused]` | Y — build skill; insert one-liner at end of `## §6` or before `[✓ doc-builder-done]`: "→ scrutinize pass before final emit?" | N — analysis/build skill, not debug | N — writes to external doc_output/; no destructive action inside project | P1 fully present | add P2 one-liner only |
| editor | Y — `## Prerequisites` (L43-52): T-ID, file read, backlink count; emits `[editor-refused]` | Y — edit skill (post-edit review); insert one-liner at close of Section 2 or in `## Routing`: "→ scrutinize for simpler-way check on the changed code?" | Y — Section 1 Diagnose has R9 3-checks and blast-radius; missing: explicit hypothesis ranking + breadcrumb ledger. Insert at `## Section 1 — Diagnose` | N — targeted edits are reversible; refusal contract covers hard cases | P1 present; P3 partial (3-checks = light disproof but no explicit ledger) | add P2 one-liner; add P3 ledger to Diagnose |
| file_manager | Y — `## Prerequisites` (L23-29): index readable, file path, caller identity; emits `[file-manager-refused]` | N — index bookkeeping, not a build/review skill; no artifact to simplify | N — no debugging; purely mechanical index update | N — index write is reversible (overwrite-guarded); not gated | P1 fully present | skip P2/P3/P4 |
| harness_doc_auditor | N — implicit: target must exist, must be directive .md; no named emit for missing inputs in Prerequisites; Step 0 covers it informally | Y — audit skill; insert one-liner at end of `## Step 3` before handoff: "→ scrutinize for simpler-way check on the directive being audited?" | N — audit/review role; not a debug skill | N — read-only audit; no destructive writes | no formal P1 gate; Step 0 pre-flight is partial | add P1 at Step 0 with explicit `[hda-refused]` emit; add P2 |
| harness_doctor | Y — `## Prerequisites` (L23-27): index readable, SKILL_detail accessible, CFP target identified; emits `[harness-doctor-refused]` | N — structural fix/diagnosis, not a build/review; patient is CFP data, not an artifact to simplify | Y — §1 Diagnosis + Prior-Fix Check + approach-diff gate = strong disproof discipline; **already present** | Y — `## Resume Gate BC` recites "grep index_cfp_fix.json for approved_proposal" FIRST before any other action — pilot-checklist style; **already present** | P1, P3, P4 already present | no changes needed; all 4 assessed |
| harness_editor | Y — `## Prerequisites` (L54-67): mece_plan, T-ID, wc-l, no harness target; emits `[harness-refused]` | Y — build/edit skill; insert one-liner at Stage 1 AUDIT block or in `## Operating Stance`: "→ scrutinize for simpler-way check before Stage 3 edit?" | N — workflow has staged AUDIT→PLAN→EDIT loop with CFP escalation; not a hypothesis-testing debug | Y — Stage 2 PLAN gate (L81-85) recites mandatory prerequisites verbatim before proceeding; partially matches P4. Anchor: `### Stage 2 · PLAN` — strengthen to explicit "recite gate" language | P1 present; P4 partial | add P2 one-liner; strengthen P4 at Stage 2 |
| identity | N — prerequisites listed are soft (user context, platform, session skill) with "use default" fallbacks; no refuse-gate needed for an always-on persona | N — persona/communication skill; no artifact to simplify | N — not a debug skill | N — identity is always-on; no destructive action | none applicable | skip all 4; persona skill, not executable in P1-P4 sense |
| mece | Y — `## Prerequisites` (L31-38): gather_complete, sections[], >3 steps/side-effect, schema accessible; emits `[mece-blocked]`/`[mece-skip]` | N — planning skill, not a review/build artifact; skeptical_reviewer is the plan gate | N — not a debug skill | N — produces a plan file; not destructive/irreversible | P1 fully present | skip P2/P3/P4 |
| project_presenter | Y — `## Prerequisites` (implicit table L51-57) + Refusal Contract (L58-62): project_root, target exists, not harness repo; emits `[gate]` | Y — build skill; insert one-liner after `## §5 · Build HTML Pages` or in Grounding Gate section: "→ scrutinize for simpler-way check before final HTML emit?" | N — not a debug skill | N — writes to external present_output/; not destructive inside project | P1 partially present (no named emit per item, just [gate]) | strengthen P1 emits; add P2 |
| repo_researcher | Y — `## Prerequisites` (L96-104): repo path, search scope, index_files optional; refusal/BC-clone-gate in BCs | Y — research/build skill; insert one-liner before `## §3 Synthesize & Write` or in Output Contract: "→ scrutinize for simpler-way check on synthesis before writing?" | N — not a debug skill | N — writes knowledge/ files; reversible with file_manager | P1 present (partial — no halt emit per missing prereq, only BCs) | add P2 one-liner; strengthen P1 emit per missing prereq |
| self_improve | Y — `## Prerequisites` (L27-32): patterns readable, session_handoff, cfp_boot_count; emits `[cfp-skip]` | N — meta-improvement skill operating on CFP patterns, not an artifact for outsider review | N — not a debug skill; operates on pattern data, not hypotheses | N — proposes harness changes but delegates execution; Approval Gate guards it | P1 present | skip P2/P3/P4 |
| session_manager | Y — `## Prerequisites` (L63-72): all sections [X], SESSION_TOTAL computed, task type = close; emits `[sm-refused]` | N — lifecycle/bookkeeping skill; no artifact to simplify | N — not a debug skill | Y — `## Step −1 — Entry Gate` (L97-108) explicitly recites mandatory first action verbatim before close: "FIRST action MUST be Read SKILL_detail.md §Manual Close — NEVER run from memory"; **already present** | P1 fully present; P4 already present | add nothing; both present |
| skeptical_reviewer | Y — `## Prerequisites` (L44-52): artifact provided, scope defined, caller role; emits `[sr-refused]` | Y — review skill; Step 2 already has a one-liner: "Is there a simpler path? → deep simpler-way pass owned by scrutinize skill"; **already present** | N — adversarial review role; not debugging hypotheses | N — read-only review; no destructive action | P1 fully present; P2 already present (references scrutinize) | skip P3/P4; both P1+P2 done |
| skill_auditor | Y — `## Required inputs` (L50-52): SKILL.md path exists, framework file loaded; emits `[framework-missing]`, Step 0 pre-flight | Y — audit skill; insert one-liner at end of Step 3.5 or before Suggested Additions: "→ scrutinize for simpler-way check on the audit findings themselves?" | N — audit/review role; not debug | N — read-only audit; no destructive writes | P1 present (Step 0 + required inputs block) | add P2 one-liner only |
| token_auditor | Y — `## Prerequisites` (L42-49): state file exists, ≥3 turns, JSONL exists; emits `[audit-refused]`/`[audit-skipped]` | N — diagnostic/monitoring skill; audit findings are not an artifact for simpler-way | N — not a debug skill (it IS the diagnostic tool) | N — read-only audit; no destructive writes | P1 fully present | skip P2/P3/P4 |
| token_tracker | Y — `## Prerequisites` (L35-43): state file readable, turn estimate non-zero, LOOP_WEIGHT known; with defaults/fallbacks | N — always-on passive counter; no artifact to review | N — not a debug skill | N — passive tracker; no destructive action | P1 present with soft fallbacks | skip P2/P3/P4 |
| user-coach | Y — `## Prerequisites` (L28-31): learning_profile.py, user_learning_profile.json, topic slug; implicit halt | N — coaching/quiz skill; no technical artifact to simplify | N — not a debug skill | N — quiz/coaching; no destructive action | P1 implicitly present (no formal emit) | strengthen P1 with explicit `[coach-refused]` emit; skip P2/P3/P4 |
| variable_manager | Y — `## Prerequisites` (L48-57): symbol name, change type, index readable; emits `[vm-refused]` | N — index bookkeeping, not a build/review skill | N — mechanical symbol indexer; not debug | N — index writes are reversible; not destructive | P1 fully present | skip P2/P3/P4 |
| scrutinize | N/A — scrutinize IS the P2 owner; it has its own prerequisites (artifact + outcome); P2 embodied | P2 embodied — scrutinize IS the simpler-way discipline | N — outsider review role, not debug | N — read-only review | all patterns assessed; scrutinize owns P2 | baseline skill; audit only |

---

## Tallies

| Pattern | Count (need adding) | Skills |
|---|---|---|
| P1 refuse-gate (add or strengthen) | 5 | harness_doc_auditor (add), project_presenter (strengthen emits), repo_researcher (strengthen per-prereq emit), user-coach (add emit), harness_editor (already present but P4 needs strengthening) |
| P2 simpler-way one-liner → scrutinize | 9 | ascii_flow, coder, doc_builder, editor, harness_doc_auditor, harness_editor, project_presenter, repo_researcher, skill_auditor |
| P3 disproof+ledger | 1 | editor (add breadcrumb ledger to Section 1 Diagnose) |
| P4 recite-discipline-verbatim | 1 | harness_editor (strengthen Stage 2 PLAN gate to explicit recite language) |

**Already fully has ≥1 pattern:**
- ascii_flow — P1 done
- coder — P1 done
- doc_builder — P1 done
- editor — P1 done, P3 partial
- file_manager — P1 done
- harness_doctor — P1 + P3 + P4 all done (no changes needed)
- harness_editor — P1 done, P4 partial
- mece — P1 done
- self_improve — P1 done
- session_manager — P1 + P4 both done
- skeptical_reviewer — P1 + P2 both done (references scrutinize)
- skill_auditor — P1 done
- token_auditor — P1 done
- token_tracker — P1 (soft)
- variable_manager — P1 done

**Surprises:**
- `harness_doctor` already has all 4 patterns — most complete skill in the set; needs nothing.
- `session_manager` already has P4 (Entry Gate recites mandatory first action verbatim) + P1.
- `skeptical_reviewer` already references `scrutinize` for the simpler-way pass — P2 done.
- `identity` and `agent` need zero patterns — they are routing/persona skills with no artifact, no inputs, and no destructive actions.
- P3 (disproof+ledger) applies to only 1 skill (`editor`) — the harness already routes debugging to `harness_doctor` which has full disproof discipline; no need to add P3 elsewhere.
