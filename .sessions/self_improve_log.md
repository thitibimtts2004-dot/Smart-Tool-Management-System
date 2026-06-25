# Self-Improve Log

## SI-1
date: 2026-05-29
cfp_fixed: [CFP-021]
deferred: []
action: harness_doctor T-032 — added "mark mece_plan.md [ ] → [X]" to AGENTS.md L5 DECIDE + CLAUDE.md Phase 3 close step 0
result: [✓ harness-updated] — CFP-021 logged + fix applied + index_cfp_fix.json updated (1 fix recorded)

## SI-2
date: 2026-05-29
cfp_fixed: [CFP-021 recurrence]
deferred: []
action: CFP-021 recurred immediately (T-032 edited AGENTS.md+CLAUDE.md without mece_plan.md). Fixed harness_doctor/SKILL.md: added Refusal Contract gate (§5 requires mece_plan.md today) + Routing §5 explicit harness_editor delegation. Retroactively wrote gather_complete.md + mece_plan.md for T-032.
result: [✓ harness-updated] — recurrence_count incremented to 1 · harness_doctor now has explicit mece_plan gate

## SI-001 · 2026-05-29 · T-036
- CFP: CFP-022
- Pattern: CHAT_TOTAL Boot Init Gap — Reset to 0 Instead of system_fixed (7,300)
- Fix: AGENTS.md B1 cmd `CHAT_TOTAL: 0` → `CHAT_TOTAL: 7300` · AGENTS.md note + CLAUDE.md note updated
- Detection: user observed `Chat: ~0k` at boot instead of `~7k`
- Trigger: user said "เรียกหมอ" → harness_doctor refused (first-time CFP) → redirected to self_improve §3+§4

[2026-06-09] knowledge_conflict_checker: behave_test_log.jsonl → review_recommended · no_action (data-log, no semantic conflict · T-161)

## 2026-06-12 · T-180 close
- kcc on harness_flow_20260526.md: candidates Y-T178/Y-T179 flagged (shared token topic) → action: no_action (sequential distinct entries, not duplicates).
- CFP-040 added (topic:token-tracking · stale-counter-after-compact). CFP count 36→37.
- T-180 LIVE-VALIDATED: SessionStart:compact hook fired in production → [compact-reset] trigger:hook CHAT→56770.
2026-06-22 T-224 kcc: out_of_scope.md flagged vs mattpocock-comparison (score 1.0) + other comparison docs → no_action (source→implementation reference, not duplicate; cross-linked in references[])

## 2026-06-23 · T-227 · kcc no_action
file: knowledge/harness_flow_20260526.md flagged (score 1.0) vs mattpocock-skills-comparison-2026-06-19.md.
verdict: no_action — comparison doc is the SOURCE that proposed git-guardrails; the flow Y-entry merely
RECORDS the implementation (derivation, not duplicate). Same over-flag pattern as T-224. No index change.
[2026-06-23] T-252 kcc(harness_flow Y-entry): flagged topic overlap w/ prior index-sync Y-entries (T-183/T-215) — JUDGED no_action: harness_flow is an append-only chronological flow log; sequential topic overlap is by-design, not a supersede/merge conflict.

## 2026-06-24 · T-263 · CFP-044 RESOLVED (structural fix · count≥3 fix-required → fixed)
trigger: CFP-044 (skill invoked from memory, owning SKILL.md never loaded) hit count=3 → fix-required.
solution: structural forcing function — .active_skill today-set marker (posttool_track.py) + manifest
  owns_paths + skill_gate.py (PreToolUse ownership + review close-gate, fail-open) + review_intent.py
  (UserPromptSubmit arm). Skill invocation is no longer opt-in; the gate enforces SKILL.md load.
post-fix actions: index_cfp_fix.json CFP-044 → status:resolved + resolved_by:T-263 + recurred_after_fix:[]
  · CODING_FAILURE_PATTERNS.md status:fixed · roadmap T-263 [X].
measurement plan (does it stay fixed?):
  - PASSIVE: recurred_after_fix[] stays empty across future sessions = holds. Any new "review in head"
    occurrence → R16 BC-E appends here → if non-empty, the structural fix FAILED → re-open + escalate.
  - ACTIVE: the skill_gate IS the detector now — a recurrence of the failure mode is physically blocked
    at the tool boundary (not reliant on a human noticing), so silent recurrence is much less likely.
  - OPEN ITEM: no scheduled N-session re-test; rely on passive recurrence logging for now.
note: self_improve_log entry was initially MISSED at close (logged only to ledger + CFP file); backfilled
  same session after user audit caught the gap.
