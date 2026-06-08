# Promotions Tracker
<!-- Seeded by: python3 scripts/session_analyzer.py --seed -->
<!-- Threshold: pattern appears in ≥3 sessions → promotion candidate -->

| skill | pattern | count | status | first_seen | last_seen |
|---|---|---|---|---|---|

## Promotion Filter Guide
<!-- Use when a pattern in the table above reaches status: candidate -->

| Pattern type | Decision | Action |
|---|---|---|
| Deterministic (always same steps, no judgment) | → tool script | Create `scripts/<name>.py` · add to tool-manifest.json |
| Contextual (requires judgment, varies by situation) | → skill rule | Add to relevant SKILL.md §Hard Rules or §Workflow · run 9arm audit after |
| Ambiguous (unclear) | → hold | Mark status: hold · add note column with reason |

### Examples
- "always run session_analyzer --seed at close" → **deterministic** → tool script (already done: session_analyzer.py)
- "check SKILL.md line count before edit" → **deterministic** → tool script candidate
- "choose spawn vs inline based on file count" → **contextual** → skill rule (R4 in CLAUDE.md)
- "decide when to compact mid-task" → **contextual** → skill rule (LOOP_WEIGHT thresholds)
