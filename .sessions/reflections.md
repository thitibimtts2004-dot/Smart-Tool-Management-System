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


## T-196 · 2026-06-15 · Core ⟷ Domain Pack Split
- intent: separate harness into project-agnostic CORE + swappable per-project domain pack (user wants future non-coding projects e.g. construction takeoff to add skills/tools without forking core)
- outcome: 6 sections S0-S5 — _TEMPLATE.md + coding.md packs created; CLAUDE/AGENTS/Implement(02·03·04·08) cleaned to point at pack; R14/R15 gates genericized (mechanism in core, trigger in pack); 5 manifest entries tagged domain:coding; R8 index sync run
- friction: stale SESSION counter (260k) kept firing false [compact-STOP] across turns — real signal was CHAT (42k, healthy); manual reset didn't stick until next boot; R2 5-call budget tight on multi-file probes (over-granular probing)
- lesson: MOVE!=DELETE — write the pack slot BEFORE stripping core (verified S1→S2); illustrative "(e.g. coding's…)" pointers are NOT enforced rules — keep them for LOW/MED model followability; trust CHAT over SESSION when counters disagree
- promoted_patterns: domain-pack template lets any project self-configure via co-config Q&A (Step 4d); tag-don't-move for logical relocation (manifest domain: field, files stay put); batch text-insertion + json.loads validate beats json re-dump (preserves formatting)


## T-199 · 2026-06-15 · Session Record-Keeping — Rich Detail + Thin Index + Auto-Heal Close
- intent: fix stale index_sessions.json (last detail = session_003, 8 Jun); user spotted the architecture was BACKWARDS (stub detail file vs bloated index) and that close was unreliable because it was a manual step
- outcome: session_close.py detail writer enriched (files_changed from git, task_ids, skill, date, real summary) + new --record-only mode; session_indexer thinned to 7-key pointer + junk-keyword filter + fixed a latent dup-merge bug (was keying existing by path, fresh scan by id → duplicates); index_reconcile.py gained a guarded idempotent session_close_guard that auto-fires --record-only at Stop when phase==done and task not yet recorded; doc drift fixed (session_manager Step 1/6 + mece_plan_schema PATH A); verified end-to-end (session_004 created rich, guard skips on re-run); CFP-030 marked structurally-resolved
- friction: my initial diagnosis was WRONG (claimed Step 1 ls-t|head-1 overwrote session_003) — user's "think neutrally, don't take your own side" + an independent auditor caught it; true cause was simpler (script fine, just never run). Verify-2 first run FAILED (dup entries) → surfaced the real merge-key bug → fixed in-scope
- lesson: when the user asks for a NEUTRAL re-check, actually try to disprove your own theory — it caught a real bias here; idempotency belongs in the GUARD (the "already recorded?" check), not the writer (session_close.py is a dumb next-numbered writer by design); a failing verify is a gift — it exposed the latent dup bug
- promoted_patterns: auto-heal at the Stop-hook rhythm (close self-heals beside backlink/symbol/repo_map — no reliance on AI memory); guarded-idempotent subprocess (read state → check-if-done → act-once); find-existing-CFP-first (appended CFP-030 recurrence instead of creating a duplicate CFP); detail-file=rich source-of-truth, index=thin greppable pointer (mirrors index_files.json philosophy)


## T-200 · 2026-06-15 · Migration force-refreshes detected.md
- intent: user installed harness via 09_migration.md and found detected.md kept OLD model IDs + token_formula — agent never refreshed it during migration
- outcome: M2.4 was a silent no-op when detected.md already existed; combined with B4's skip-if-filled rule this left stale values forever. Rewrote M2.4 to back up old → reset platform/api_provider to unknown → MANDATE inline B4 re-detection THIS run → verify+diff. Added M0.3 hard rule + When-to-use signal row. Scope held to one file.
- friction: roadmap is Never-Full-Load — used offset+limit (3 lines) but the PostToolUse hook still flagged it (heuristic false-positive on the protected list); harmless
- lesson: "file exists → skip" is the wrong idempotency test for machine-specific files — existence ≠ currency; detected.md must be RE-DETECTED on migration, not preserved. The healing must live where the agent is live (migration step), because boot-time B4 deliberately won't re-detect a filled file.
- promoted_patterns: distinguish copy-able harness files from machine-specific ones (detected.md = always re-detect, never copy/preserve); put the refresh where an agent is already running rather than deferring to a conditional next-boot probe


## T-201 · 2026-06-15 · doc_builder audit + 6 fixes + model routing
- intent: audit doc_builder via skill_auditor + fix 6 defects (scope leak into project tree·runaway loop·hallucination·log/token leak·not step-by-step·redundancy) + add model_medium→high routing for the understanding phase; harness-only, never touch target src/
- outcome: fixes across SKILL.md + SKILL_detail.md (outputs relocated to doc_output/<project>/ outside target; Grounding Gate "no evidence=no write"; Loop Guard + [doc-builder-eject]; quiet capture script + mandatory safe_run; step-by-step walkthrough 1-step=1-instruction+1-image; Tone Guide/MECE-block dedup) + new ## Model Routing section; skill_auditor re-audit returned PASS 0🔴; rule_indexer run
- friction: token pressure (SESSION ~80k, CHAT ~105k → mid-task /compact); R2 5-call budget overrun once on S4 (6 calls)
- lesson: ground analysis via grep before asserting — avoid the very hallucination the skill guards against; spawn adversarial re-audit as a sub-agent to keep main context lean
- promoted_patterns: adversarial re-audit by sub-agent after self-edits; grounding-gate ("no evidence=no write") reusable for any doc-gen skill
- follow-up: T-202 opened for 2 residual gaps — Coverage Gate (anti-missing-feature, the inverse of grounding) + cross-role single-source link spec (target=_blank + deep anchor + owner-role chosen by most-used)

## T-202 (2026-06-15) · doc_builder coverage + single-source
What worked: distilled 7 user risk points → 2 real gaps by grepping the LIVE skill files (not memory), avoiding the hallucination risk being analyzed. Built Coverage Gate as the exact inverse of the existing Grounding Gate (reused structure → เรียบง่าย, no parallel prose). Offloaded close ceremony to sub-agent.
What to improve: S2 had no checkbox line in the mece template — had to insert one mid-execution.
Reusable: "gate twin" pattern — when a gate guards one direction (anti-extra), its inverse (anti-missing) can reuse the same shape (inventory + verify-back + signal + halt).
## T-208 (2026-06-16) · harness_editor — CFP-041 token-lag fix
- What worked: the fix validated ITSELF live mid-session — the new mid-turn live-grep rule caught CHAT near the 120k ceiling and caught a resume-phrase typed without a real /compact. Strongest possible behave-test evidence.
- Tripwire avoided: rewrote stale compact_state.md (section=S1 → CLOSE) BEFORE recommending compact, so the real /compact resumed cleanly at CLOSE instead of bouncing back to S1.
- Lean win: skipped the separate model_low Reviewer — Completion Gate allows inline verify for ≤3 Verify-N + no src/ change. Saved a subagent.
- Carry-forward: paired-doc mandate (rule file + its Implement doc) held — S3 kept Implement/03_config.md in sync with CLAUDE.md §R1.
