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
