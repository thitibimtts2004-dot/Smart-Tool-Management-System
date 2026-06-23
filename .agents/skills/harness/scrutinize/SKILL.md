---
name: Scrutinize
description: >
  Outsider review of a finished (or near-finished) artifact — code, plan, doc, or skill.
  Reads it cold, as if seeing it for the first time, then runs a MANDATORY "is there a simpler
  way to get the same result?" pass. Sole owner of the simpler-way discipline (single source of truth).
  Distinct from skeptical_reviewer (which is a contrarian necessity/flaw gate on a PLAN before execution).
  Trigger on: "scrutinize this", "review as an outsider", "fresh eyes on this", "is there a simpler way",
  "ตรวจแบบคนนอก", "มีวิธีง่ายกว่านี้ไหม", "มองใหม่อีกที".
---

## Sections
```
- id: 1
  name: "Outsider Pass"
  steps: ["read artifact cold (no prior context)", "flag unjustified / confusing / assumed parts", "list what an outsider cannot follow"]
- id: 2
  name: "Simpler-Way Pass"
  steps: ["state the core approach in 1 line", "ask: simpler way for same outcome?", "propose simplest alternative OR justify none exists", "emit verdict"]
```

---

# Scrutinize

## Operating Stance
- Outsider by default. Read the artifact as if you have NO history with it. Prior context is a liability here — it hides what a newcomer would trip over. If you find yourself "remembering why" a choice was made, that is exactly the spot to flag.
- The simpler-way pass is mandatory, not optional. Every scrutinize run MUST end with an explicit simpler-alternative verdict — either a concrete simpler option, or a one-line reason none exists. "Looks fine" without the pass is an incomplete review.
- Same outcome, less machinery. A simpler alternative only counts if it produces the SAME result. Do not propose simplifications that quietly drop a requirement — that is scope-cutting, not simplification.
- Verdict first, evidence second. Lead with the finding ("this can be 3 steps instead of 7"), then show the reasoning. Never bury it.
- Read-only. Scrutinize never edits the artifact. It reports findings + the simpler-way verdict; fixing is delegated (harness_editor / coder / editor).

## When NOT to Use
- The artifact is still being drafted / mid-write → wait for a finished-enough version · a moving target produces noise findings.
- You need an adversarial PLAN review BEFORE execution (necessity, flaws, wrong-layer) → that is `skeptical_reviewer` (M4.5 gate) · scrutinize reviews an artifact's clarity + simplicity, it is not the pre-execution gate.
- The task is trivial (≤3 lines · typo · single obvious change) → emit `[scrutinize-skip] reason:trivial` · no ceremony.
- User wants praise / validation → scrutinize is outsider-critical by default · redirect to a presenter skill if encouragement is the goal.

## When to Invoke
**Phrase variants** (user says one of these):
- "scrutinize this" / "review this as an outsider" / "fresh eyes on this" / "is there a simpler way?"
- Thai: "ตรวจแบบคนนอก" / "มีวิธีง่ายกว่านี้ไหม" / "มองใหม่อีกที" / "ทำให้ง่ายกว่านี้ได้ไหม"
- Orchestrator delegates a `Skill: scrutinize` section from a MECE plan (typically after a build/edit completes).

**Proactive trigger:**
→ After a build/refactor/skill completes and before close → offer: "Want a scrutinize pass — outsider read + simpler-way check?"

## Prerequisites
**Hard prerequisites — refuse without these two** — emit `[scrutinize-refused] reason:<X>` and halt. Do not review partially.

- [ ] A concrete, finished-enough artifact provided (path or inline content)
      → Why: cannot read an abstraction cold — needs the actual code/plan/doc
      → Missing: emit `[scrutinize-refused] reason:no-artifact` · halt · ask for it
- [ ] The artifact's intended outcome stated (what it is supposed to achieve)
      → Why: the simpler-way pass needs the target outcome to judge "same result"
      → Missing: emit `[scrutinize-refused] reason:no-outcome` · halt · ask "what should this achieve?"

**Soft input — defaults, does not halt:**
- [ ] Scope (whole artifact vs one section)
      → Why: unbounded scope produces noise on every line
      → Missing: default to whole artifact · emit `[scrutinize-scope] defaulting:whole` so the caller can override

## Workflow — 2 mandatory passes (Outsider → Simpler-Way · both required)

### Section 1 · Outsider Pass
```
[O1] Read the artifact cold — suppress prior context. Pretend this is your first contact with it.
[O2] Flag every spot where an outsider would stall:
       - a choice with no stated reason ("why this, not the obvious thing?")
       - a term/name/step that assumes context not present in the artifact
       - a jump the reader cannot follow without outside knowledge
[O3] List findings as: `[outsider] <location> — <what a newcomer cannot follow>`
       no findings → emit `[outsider] clean — newcomer can follow end-to-end`
```

### Section 2 · Simpler-Way Pass  (MANDATORY — never skip)
```
[S1] State the core approach in ONE line (the essence of how it works now).
[S2] Ask the forcing question: "Is there a materially simpler way to get the SAME outcome?"
       check: fewer steps · fewer files/moving parts · reuse of an existing thing instead of new · less ceremony
[S3] Produce ONE of:
       - `[simpler-way] YES — <concrete simpler alternative> · same outcome: <why it still meets the target>`
       - `[simpler-way] NO — <one-line reason the current approach is already minimal>`
       (a "NO" must be a reasoned decision, not a skipped step)
[S4] Emit overall verdict: `[scrutinize-verdict] outsider:<clean|N findings> · simpler-way:<YES|NO>`
```

## Output Contract
- `[scrutinize-refused] reason:<X>` — missing prerequisite · halt
- `[scrutinize-skip] reason:trivial` — below ceremony threshold
- `[outsider] <location> — <finding>` · or `[outsider] clean`
- `[simpler-way] YES|NO — <alternative or reason>` (mandatory every run)
- `[scrutinize-verdict] outsider:<...> · simpler-way:<...>` — closing line, always emitted
- Read-only: never emits `[✓ written]` · proposes, never edits.

## Output Tone
- Lead with the signal, never with preamble. "This is a solid artifact, but…" is prohibited — open with `[outsider]` or `[simpler-way]`.
- Finding format: location first, finding second — `[outsider] <location> — <what breaks>`.
- Simpler-way: one line per verdict — `[simpler-way] YES|NO — <alternative or reason>`. No elaboration unless asked.
- Strip: "I noticed that…" · "It seems like…" · "You might want to…" — declarative only.
- Keep the machine-readable signal words (`[outsider]` · `[simpler-way]` · `[scrutinize-verdict]`) in every output — the orchestrator routes on them.
- No praise, no softening. Findings are facts, not suggestions.

## Hard Rules
- Never edit the artifact — emit findings only. Fixing is delegated (harness_editor / coder / editor).
- Never emit `[simpler-way]` without first stating the core approach in one line ([S1]).
- Never mark `[simpler-way] NO` without a written reason — a skipped [S1] or [S2] is a violation, not a pass.
- Never skip the Simpler-Way Pass — run it even when the Outsider Pass finds nothing.
- Never propose a simplification that silently drops a requirement — that is scope-cutting, not simplification.
- The Outsider Pass must suppress prior context — if you remember why a choice was made, flag that exact spot.
- Quality heuristic: if the review runs longer than the artifact, the review is too heavy — tighten it.

## Relationship to skeptical_reviewer (single-source note)
- `scrutinize` = OWNER of the "is there a simpler way?" discipline (deep standalone pass) + outsider/fresh-eyes read of a built artifact.
- `skeptical_reviewer` = contrarian gate on a PLAN before execution (necessity, flaws, wrong-layer). It references scrutinize for the deep simpler-way pass — it does not re-implement it.
- Always-on short form: per roadmap T-214, individual skills carry a one-line "simpler-way?" prompt that points HERE — they never copy the full pass. This file is the single source of truth.
