Task: T-157 token-tracking fix | Status: DONE (6/6 sections + close)
Decisions:
- persist-every-turn: write SESSION_TOTAL+CHAT_TOTAL every turn before footer (closes CFP-031 persist gap)
- consume-once reset: session_reset=armed in compact_state.md, consumed exactly once by B1 + UserPromptSubmit hook (armed→consumed); replaces buggy date-match reset
Pending: none — T-157 closed
Files: AGENTS.md(B1) · Implement/03_config.md(B1 mirror x2 + R1) · .claude/settings.json(token-state hook) · CLAUDE.md(R1) · docs/session_templates/mece_plan_schema.md(PATH A/B/C) · CODING_FAILURE_PATTERNS.md(CFP-031) · docs/master_roadmap.md(T-157.1-6 [X]) · knowledge/harness_flow_20260526.md(Y90)
Next: pick next roadmap item
Verified: integration test passed this session — /compact reboot consumed marker (B1 emitted [reset-skip] marker=consumed, SESSION preserved=0); no double-reset
