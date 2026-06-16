# Gather Complete — T-209 project_presenter tightening
dt: 2026-06-16
task: tighten project_presenter SKILL.md process + add real HTML template (8 gaps) — port doc_builder patterns
skill: harness_editor

## Objective
Fix 8 audited gaps in `.agents/skills/project_presenter/SKILL.md` by porting the proven patterns
from its sibling `doc_builder`. User confirmed: fix ALL 8 + realign file-output scope to match
doc_builder (write OUTSIDE the target project, not into the customer repo).

## The 8 gaps (audit verdict)
1. YAML header broken — no `name:`, no `description:` (only `triggers:`)         → ❌ framework violation
2. No Loop Guard — §2 interview "loop until stop" has no max-iter / eject        → loose process (main complaint)
3. No real HTML template — §5 is bullet hints only, no paste-ready skeleton      → "no template" (main complaint)
4. BC over-enforcement — 2 BCs + MECE block guard judgment/process, not destruction → [over-enforcement]
5. No Grounding/Coverage gate — can drift/fabricate, only a soft Hard Rule        → can invent content
6. Scope inconsistency — writes INTO target project; sibling writes outside       → align to doc_builder
7. No Model Routing — reasoning phases (§2/§4) have no tier floor                  → weak model invents
8. Scattered rules — Prerequisites + Refusal Contract + MECE block overlap 3×      → dedup

## Constraints
- Edit ONE file only: `.agents/skills/project_presenter/SKILL.md` — NOT src/, NOT doc_builder
- Behavioral skill edit → Stage 3.5 [behave-test] required at close
- Preserve existing trigger keywords (back-compat) · preserve §3/§4 storytelling structure (it works)
- Mirror doc_builder wording: YAML header · Scope rule · Model Routing · Grounding Gate · Loop Guard · Output Contract
- R8 index sync after edit (rule_indexer — SKILL.md is a harness rule file)

## Affected files
| File | Action | Lines read |
|---|---|---|
| .agents/skills/project_presenter/SKILL.md | rewrite (target) | full 193L |
| .agents/skills/doc_builder/SKILL.md | pattern source (read-only) | full 225L |
| docs/session_templates/mece_plan_schema.md | plan template | 1-90 + PATH A |

## Acceptance criteria
- [ ] YAML has `name: project_presenter` + `description:` block
- [ ] Loop Guard section present (max 3 iter · Loop_W>50 eject · [present-eject] signal)
- [ ] §5 has paste-ready HTML+CSS template skeleton (not bullets)
- [ ] BC count reduced — interview/screenshot reframed as Operating Stance / steps
- [ ] Grounding Gate present (every claim traces to §1 scan · [grounding-drop] signal)
- [ ] Output paths OUTSIDE target project (present_output/<project>/ mirroring doc_output/)
- [ ] Model Routing section present (§2/§4 floor = model_medium, never model_low)
- [ ] Overlapping rules deduped into one home each
- [ ] [behave-test] passes at close
