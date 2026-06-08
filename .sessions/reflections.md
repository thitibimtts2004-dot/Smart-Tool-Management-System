# Reflections Log
<!-- Appended each session close by session_manager §3 Step 0 -->
<!-- Format: intent | outcome | friction | lesson | promoted_patterns -->

---
date: 2026-06-07
task: T-152 verify_runner.py
intent: Create Verify-N automation tool + wire into AGENTS.md [L4]
outcome: scripts/verify_runner.py created (149L) · AGENTS.md [L4] updated · T-152 [X]
friction: User had to prompt twice before Phase 1+2 were actually run (CFP-010 recurrence)
lesson: topic switch → Phase 1 gather must run tools immediately, not announce intent
promoted_patterns: verify_runner.py call after every section (deterministic → already integrated)

---
date: 2026-06-07
task: T-153 session_close.py
intent: Create session_close.py automation + wire into session_manager SKILL.md §3 Steps 1-5
outcome: scripts/session_close.py created (184L) · SKILL.md §3 updated (189L) · tool-manifest registered · Y87 · T-153[X]×4
friction: haiku reported session_close key added but verify returned False — root cause was tool-manifest has "tools" wrapper key, not flat structure · verify command corrected
lesson: always check manifest structure before writing verify command — grep keys first
promoted_patterns: none (session_close.py is deterministic tool, already wired)
---
date: 2026-06-07
task: T-152.3+T-152.4 backlog close
intent: Register verify_runner in tool-manifest + mark T-152.3+T-152.4 [X] (missed from prior session)
outcome: verify_runner added to tool-manifest.json · T-152.3+T-152.4 [X] · S1+S2 parallel spawn worked
friction: tool-manifest has "tools" wrapper key — verify command must use d.get("tools",d)
lesson: after task close, double-check all subtasks [X] before writing session_handoff
promoted_patterns: parallel spawn for independent small tasks — confirmed effective

## 2026-06-08 · T-157 token-tracking fix
What worked: consume-once marker design verified live via the /compact reboot this session (B1 [reset-skip] marker=consumed) — the fix tested itself. B1 byte-identity kept across 3 copies + JSON-escaped hook variant via replace_all + diff check.
Watch: stale compact_state.md still produces a misleading resume-hint at boot (resolved by cross-checking active_thread/mece) — the marker fix prevents the wrongful RESET but not the stale hint; future cleanup could neutralize p3 on close.
