# Session Handoff
skill: harness_editor
CFP_COUNT: 37
task: T-180 — provider-aware compact-reset of token counters + visible [compact-reset] emit
status: COMPLETE (S1-S6 + close)

## Objective
After /compact, CHAT_TOTAL stayed stale → false [compact-STOP] every turn. Make the reset provider-aware + visible.

## Outcome
DONE + LIVE-VALIDATED. A real /compact this session fired the SessionStart:compact hook → emitted
"[compact-reset] trigger: hook · CHAT_TOTAL→56770 · LOOP_WEIGHT→0 · SESSION_TOTAL→0 · cache: cold". Bug fixed.

## Changes
- NEW scripts/compact_reset.py (single-source reset; --dry-run/--trigger; never crashes hook).
- .claude/settings.json: SessionStart:compact hook → auto-runs compact_reset.py (claude-code).
- AGENTS.md: C0 plain-text confirm (other providers) + C0.5 stuck-counter guard + B1 single-source note.
- CLAUDE.md: R1 mandates surfacing [compact-reset]; R3 stuck-counter guard note.
- CFP-040 (topic:token-tracking). Docs/index: harness_flow Y-T180 · Implement/03_config §Token Tracking · tool-manifest compact_reset_py · REPO_MAP scripts row.

## Validation
Independent haiku reviewer: Verify-1..6 + syntax = OVERALL PASS. Live hook fire confirmed in production.

## Next
None for T-180. Unrelated pending: stale REPO_MAP.md skill list → route via harness_editor.
