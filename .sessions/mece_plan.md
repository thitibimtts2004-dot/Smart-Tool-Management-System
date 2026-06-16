# MECE Plan — T-206 harness_editor "single front-door" rule for new project skills
date: 2026-06-16
task: Add one Operating Stance bullet to harness_editor/SKILL.md establishing that the bundled `skill-creator` plugin may only scaffold a draft, and every project skill must pass through harness_editor (auditor bar + R8 index wiring). Reuse skill-creator's ideas, not its files.
skill: harness_editor

## Phase 0 — Boot (once per session)
- [X] B1: compact-restore · SESSION_TOTAL=0 (reset-consumed) · CHAT recomputed=44631
- [X] B2-B3: skill=harness_editor (compact-restore sk=)
- [X] C0-C3: same topic (project skill-creation architecture) · continuation · no switch

---

## Phase 1 — Info Gather
- [X] Read bundled skill-creator structure (global plugin · scaffold + eval/grader + validate + description-opt)
- [X] Read harness_editor Operating Stance L27-33 (auditor-bar + minimal-output already present from T-205)
- [X] Confirmed: no rule currently forbids using the bundled creator directly = the open back-door
- [X] Insertion point = one new Operating Stance bullet after L33 (principle, not a BC/section = minimal)

---

## Phase 2 — MECE Plan

### Sections
- [X] S1 · EDIT: add one Operating Stance bullet "Single front-door for new skills" to harness_editor/SKILL.md after L33
      Tool: Edit · Avoid: new BC, new section, full-file rewrite
      Verify-1: grep "Single front-door" SKILL.md returns the new bullet · wc -l still ≤250 (🟢/🟡 only)
- [X] S2 · LOG: append Y-T206 entry to knowledge/harness_flow_20260526.md (Stage 4 requirement)
      Tool: Bash heredoc append
      Verify-2: grep "Y-T206" harness_flow returns 1 line
- [X] S3 · ROADMAP: T-206 [/] -> [X] in docs/master_roadmap.md
      Tool: Edit
      Verify-3: grep "[X] T-206" returns the closed line
- [X] S4 · INDEX: run rule_indexer.py (harness rule file edited = R8 sync)
      Tool: Bash
      Verify-4: exit 0 · [r8-sync-check]

### Cycle grouping
- Serial S1 -> S2 -> S3 -> S4 (S2/S3/S4 all depend on S1 landing first; <5 files = main context, no sub-agents)

---

## Phase 3 — Execution
(REACT loop per section above)

## Phase 3 Close Checklist
- [ ] all sections [X]
- [ ] R8 index sync clean (rule_indexer exit 0 · index_reconcile no drift)
- [ ] roadmap T-206 [X]
- [ ] active_thread.md phase:done
- [ ] PATH A clear Phase 1-3 (keep Phase 0)
