# MECE Plan — T-196 Split core harness ⟷ coding domain pack
date: 2026-06-15
task: Split core harness (project-agnostic) from coding-specific skills/tools into a swappable domain pack
skill: harness_editor

## Phase 0 — Boot (once per session · keep [X] on resume · reset on topic switch only)
- [X] B1: compact_state.md checked · SESSION_TOTAL=0 · CHAT_TOTAL=sys_fixed · CFP_COUNT=37 stored
- [X] B2-B3: skill=harness_doc_auditor identified · SKILL.md loaded (compact-restore)
- [X] C0-C3: routing confirmed · topic-switch from T-195 done · new topic = core/domain split
→ TOKEN CHECK: SESSION_TOTAL ~8k

---

## Phase 1 — Info Gather
- [X] G0: task clarity gate — 4 user turns clarified scope/method/classification
- [X] G1: core files + Implement/ + skills/tools scanned
- [X] G2: grep sweeps (coding contamination in core + Implement/ + skill/tool classification)
- [X] G3: every target → file + Verify-N draft · [✓ gather] emitted
- [X] gather_complete.md written today

### Files Read — Phase 1
| File | Why | Lines read |
|---|---|---|
| CLAUDE.md / AGENTS.md | grep coding contamination | grep only |
| Implement/*.md | grep coding hardcode per file | grep only |
| .agents/skills/{coder,editor,variable_manager,repo_researcher}/SKILL.md | classify core vs coding | grep head -4 |
| scripts/code_graph.py / symbol_indexer.py | classify tool domain | head -5 |

→ TOKEN CHECK: SESSION_TOTAL ~8k

---

## Phase 2 — Plan
- [X] M1.5: reasoning pass
       dependency_map: [S0 schema → S1 pack, S1 pack → S2 core-clean, S2 → S3 Implement, S1 → S4 setup, S0 → S5 relocate]
       risk_flags: [core-file edit = cache reset (batch), MOVE!=DELETE rule-loss risk, low/med-model must follow moved rules inline]
- [X] M2: 6 sections S0–S5 · Context/Skill/Model/Tool/Verify per section
- [X] M3: plan + Verify-N sent to user → confirmed across 4 turns (scope, method, classification, repo_researcher)
- [ ] M4: roadmap [ ] T-196 added  (this turn)
- [X] M5: mece_plan.md written using template · [✓ MECE] emitted

### Files Read — Phase 2
| File | Why | Lines read |
|---|---|---|
| docs/session_templates/mece_plan_schema.md | M5 template (CFP-019) | full template |
| .agents/skills/skill-manifest.json | skill inventory | python parse |
| .agents/tools/tool-manifest.json | tool inventory | python parse |

→ TOKEN CHECK: SESSION_TOTAL ~8k
→ **[mece-complete]**: execution DEFERRED by user ("ยังไม่ต้องลงมือทำ") — plan locked + committed as baseline · resume on explicit "ลุย"

---

## Phase 3 — Execute   (NOT STARTED — all [ ] · awaiting user "ลุย")

### Cycle grouping
Cycle 1 — serial · agents: 1 → S0
Cycle 2 — serial · agents: 1 → S1   (Input_From: S0 schema)
Cycle 3 — serial · agents: 1 → S2   (Input_From: S1 pack — rules must exist before removal)
  [/compact checkpoint after S2 — core edits done, heaviest cache reset behind us]
Cycle 4 — serial · agents: 1 → S3
Cycle 5 — serial · agents: 1 → S4   (different Implement file than S3 — no shared write)
Cycle 6 — serial · agents: 1 → S5
(kept fully serial for LOW/MEDIUM-model safety per user constraint)

### Per-Section Invariants (apply to EVERY S<N> — written ONCE)
Constraints — every section carries these PLUS its own line:
  - mece_plan.md dated today + T-196 roadmap [/] REQUIRED before any file edit
  - [pre-edit] before every Edit · [✓ written] grep verify after every change
  - MOVE != DELETE: any rule pulled from core MUST already be present in domain/coding.md
  - moved rules keep FULL commands/paths/thresholds INLINE (LOW/MED-model followable)
  - Output Contracts: [post-read] ≤1 line · [✓ written] ≤1 line
  - L4.5 PURGE: drop Bash/grep after verdict · keep Read excerpts ≤10L
Marking rule — flip section box to [X] ONLY when [✓ written] + Verify-N both pass this turn
TOKEN CHECK after EVERY section · CHAT_TOTAL >80k → [compact-rec] · hard STOP >120k

### S0 · T-196 · Define 2-layer model + domain pack schema        [Cycle 1 · serial]
Context: Decide the core/domain boundary contract + the slot schema every domain pack must fill. Foundation for all later sections.
Skill: harness_editor
Model: model_high   (architecture/structural reasoning — the one section that justifies high tier)
Input_From: none
File: domain/_TEMPLATE.md (new)
Tool: Write
Avoid: Edit (file is new)
Rollback: rm domain/_TEMPLATE.md
Data_Sent: schema with slots — paths · domain_gates · critical_rules · framework_notes · skills[] · tools[] · co-config Q&A block
Token: ~600 output
Constraints: → §Per-Section Invariants · PLUS: schema must be cold-readable by a MEDIUM model with no chat history
Verify-1: `grep -cE "^## (paths|domain_gates|critical_rules|framework|skills|tools)" domain/_TEMPLATE.md` → ≥5
- [ ] S0

### S1 · T-196 · Create coding pack + move coding rules in        [Cycle 2 · serial]
Context: Instantiate domain/coding.md from the template; copy the 4 coding rule-spots out of core INTO it (verbatim, inline). Pack must be complete BEFORE core is stripped.
Skill: harness_editor
Model: model_medium
Input_From: S0 schema (domain/_TEMPLATE.md)
File: domain/coding.md (new)
Tool: Write
Avoid: —
Rollback: rm domain/coding.md
Data_Sent: DB Hard Stop (R15 full BC) · Critical Rules (Miniflare D1 / Edge Runtime / PapaParse) · Next.js note · src/ + src/db/ path conventions — all INLINE with full commands
Token: ~700 output
Constraints: → §Per-Section Invariants · PLUS: every moved rule reproduced word-for-word, no summarizing
Verify-1: `grep -icE "miniflare|edge runtime|papaparse|src/db|next\.js|db-gate" domain/coding.md` → ≥5
Verify-2: `ls domain/coding.md domain/_TEMPLATE.md` → both exist
- [ ] S1

### S2 · T-196 · Clean core (CLAUDE.md + AGENTS.md)               [Cycle 3 · serial]
Context: Remove coding-specific rules from core; replace with neutral wording ("main work files" for src/) + a pointer to the active domain pack. Only after S1 proves the pack holds them.
Skill: harness_editor
Model: model_medium
Input_From: S1 (domain/coding.md must exist + verified)
File: CLAUDE.md, AGENTS.md
Tool: Edit
Avoid: Write (must surgical-edit, not rewrite)
Rollback: git checkout CLAUDE.md AGENTS.md
Data_Sent: R14 → neutral paths + pointer · R15 → replace with "→ see active domain pack (domain/<name>.md §domain_gates)" + generic gate framework kept · AGENTS L2 Next.js → pointer · L234-236 Critical Rules → pointer to coding.md
Token: ~500 output
Constraints: → §Per-Section Invariants · PLUS: gate FRAMEWORK (R14/R15 mechanism) stays in core — only the coding-specific PAYLOAD moves
Verify-1: `grep -icE "miniflare|next\.js|src/db|papaparse" CLAUDE.md AGENTS.md` → 0
Verify-2: `grep -c "domain/coding.md\|domain pack\|domain/<name>" CLAUDE.md AGENTS.md` → ≥2
- [ ] S2

### /compact checkpoint  (after S2 — sections=6 ≥3 → inserted after core edits)
- [ ] /compact checkpoint
  Pre: `python3 scripts/compute_compact_size.py` → compact_size
  Pre: write compact_state.md (section=S3 · step="start Implement/ cleanup" · skill=harness_editor · compact_size=<value> · session_reset=armed)
  How: user runs /compact
  Post: SESSION_TOTAL=0 · LOOP_WEIGHT=0 · CHAT_TOTAL ≈ compact_size + sys_fixed
  Verify: `cat .sessions/session_tokens.md` → SESSION_TOTAL: 0
  Resume: "Resume T-196 · Skill: harness_editor · ต่อจาก S3"

### S3 · T-196 · Clean Implement/ docs                            [Cycle 4 · serial]
Context: Update install docs (01,02,03,04,05,08) so coding specifics point to the pack instead of being hardcoded — keeps "install the core" separate from "install the coding pack".
Skill: harness_editor
Model: model_medium
Input_From: S2 (core wording finalized)
File: Implement/01_overview.md, 02_setup.md, 03_config.md, 04_skills.md, 05_scripts.md, 08_checklist.md
Tool: Edit
Avoid: Write
Rollback: git checkout Implement/
Data_Sent: replace each coding hardcode with "(coding pack — see domain/coding.md)" + keep core install steps generic
Token: ~600 output
Constraints: → §Per-Section Invariants · PLUS: do NOT touch the model-tier reference table (03_config L188-266 — by design)
Verify-1: `grep -c "domain/coding.md\|coding pack" Implement/*.md | awk -F: '{s+=$2} END{print s}'` → ≥6
- [ ] S3

### S4 · T-196 · Extend setup co-config (domain selection)        [Cycle 5 · serial]
Context: Add a step in 02_setup where the user's AI walks the user through picking/creating a domain pack — extends the existing detected.md provider co-config flow + formalizes docs/domain_rules.md.
Skill: harness_editor
Model: model_medium
Input_From: S1 (pack structure exists)
File: Implement/02_setup.md
Tool: Edit
Avoid: Write
Rollback: git checkout Implement/02_setup.md
Data_Sent: new "Step: choose domain pack" block — AI asks domain → copy _TEMPLATE.md → coding default → fill slots WITH user (mirror detected.md 4b flow)
Token: ~400 output
Constraints: → §Per-Section Invariants · PLUS: step must be MEDIUM-model executable with no inference (explicit prompts inline)
Verify-1: `grep -icE "domain pack|domain/_TEMPLATE|choose domain|domain_rules" Implement/02_setup.md` → ≥2
- [ ] S4

### S5 · T-196 · Relocate coding skills + tools + clean manifests [Cycle 6 · serial]
Context: Register coder/editor/variable_manager + code_graph.py/symbol_indexer.py under the coding pack; remove/tag them in core manifests so a non-coding project loads a clean core skill set.
Skill: harness_editor + file_manager
Model: model_medium
Input_From: S0 (pack ownership model)
File: .agents/skills/skill-manifest.json, .agents/tools/tool-manifest.json, domain/coding.md (skills[]/tools[] lists)
Tool: Edit
Avoid: Write
Rollback: git checkout .agents/skills/skill-manifest.json .agents/tools/tool-manifest.json domain/coding.md
Data_Sent: tag/move coder,editor,variable_manager,code_graph.py,symbol_indexer.py → domain:coding · list them in coding.md skills[]/tools[]
Token: ~500 output
Constraints: → §Per-Section Invariants · PLUS: run rule_indexer.py + backlink_analyzer.py after (R8); do NOT break coder→variable_manager→symbol_indexer dependency chain
Verify-1: `grep -ic "coding" .agents/skills/skill-manifest.json` → ≥1 (coder/editor/variable_manager tagged)
Verify-2: `grep -icE "coder|editor|variable_manager|code_graph|symbol_indexer" domain/coding.md` → ≥5
- [ ] S5

---

**Phase 3 Execution Complete Pause:** all S0–S5 [X] → emit [exec-complete] → Close Checklist.

---

## Phase 3 — Close Checklist  (run after execution — not now)
- [ ] R8 index sync: rule_indexer.py + backlink_analyzer.py + symbol_indexer.py · emit [r8-sync-check]
- [ ] Roadmap [X]: T-196 annotated (attempts + tool_calls)
- [ ] Spawn Reviewer (model_low · read-only): run each Verify-N exactly · PASS/FAIL report
- [ ] [mece-audit] emitted
- [ ] Ask user for feedback (1 message)
- [ ] Reflection → .sessions/reflections.md
- [ ] [session-health] emitted
- [ ] PATH A: clear mece_plan.md Phase 1-3 (exact cmd · CFP-025)
- [ ] harness_editor Step 5 gate: harness_flow_20260526.md Y-entry + affected Implement/ updated
- [ ] session_handoff.md written
- [ ] self_improve §1-3

## Close Path
PATH A (task complete) — see schema §PATH A for exact clear command.
