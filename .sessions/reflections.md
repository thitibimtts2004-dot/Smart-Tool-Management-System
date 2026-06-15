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

## T-183 (2026-06-13) · index-sync reconciler
- intent: user spotted that rule_indexer (T-182) had no defined regen trigger; wanted index sync to stop depending on agent memory
- outcome: 4-col trigger matrix in AGENTS.md + fail-safe Stop-hook reconciler (index_reconcile.py) that detects drift + auto-runs idempotent regenerators (guarded)
- friction: backlink_analyzer.py is broken (pre-existing) → had to guard auto-run so its crash is non-fatal; validated live
- lesson: deterministic/idempotent indexes should AUTO-RUN at session close, not rely on R8 memory; only judgment-type updates need an agent decision. Enforcement > documentation.
- promoted_patterns: fail-safe hook script (always exit 0, swallow exceptions, like compact_reset.py) · idempotent-vs-judgment split for deciding what to automate

## T-191 · 2026-06-14 · Topic-Facet Backlink Schema v2
- intent: design+build 2-facet weighted backlink schema; fix "AI not stable" concern raised by user
- outcome: 80 entries -> v2 (type+topic, per-file major/minor, hash-lock determinism); off-vocab 84->0; analyzer weighted-score rewrite
- friction: index was 80 files not the assumed ~13; 84 off-vocab tags; 7 harness files are Never-Full-Load so tagged from description not line-ranges; 1 stale entry (deleted file still indexed)
- lesson: SCOPE-PROBE index size before promising scope — 13 vs 80 changes the whole plan; do not assume from prior memory
- promoted_patterns: sub-agents WRITE batch results to files + return only a 1-line summary (keeps main context lean — 385k subagent tokens stayed out of context); deterministic type-from-path + AI-only-for-judgment split; close-checklist must be verified against the skill, not from memory
