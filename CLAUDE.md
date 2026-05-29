# CLAUDE.md — Hard Constraints & Gateway

> Read first. Every AI agent, no exceptions.
> Destructive gates + DB stop → **INVARIANTS.md** · Repo structure → **REPO_MAP.md**

## ⚡ MANDATORY BOOT GATE
Before ANY response — verify `[Boot]` trace emitted this session.
If not: STOP → run B1→B2→B3 → emit boot trace → then respond.
Skipping boot = invalid session state = CFP violation.

## Boot (3 tool calls max)
→ Full B1/B2/B3 commands + compact-restore logic: **AGENTS.md §Boot Sequence**
- B1: checks compact_state.md + resets SESSION_TOTAL=0 · sets CHAT_TOTAL=7300 (system_fixed) on compact-restore OR phase≠in_progress + loads CFP_COUNT
- B2: identifies skill_name (skips manifest if compact-restore or orchestrator pre-resolved)
- B3: loads SKILL.md + mece/SKILL.md (skips if hashes match → saves ~2.9k tokens)
- [B4] Platform Probe: `detected.md` platform: unknown → list tools → update · else skip

Reply line 1: `**[Boot]** Thread: <done|in_progress> · Tasks: <N> · Skill: <name> · Sections: <N> · Tokens: ~<N>k · CFP: <N>`
After any task → write `.sessions/active_thread.md`: `task: · phase: done|in_progress|blocked · next:`

## Per-Turn Routing (every message — before any work)
Run C0→C1→C2→C3. → Full logic + topic switch criteria: **AGENTS.md §Per-Turn Routing**

## Loop Architecture
| Phase | Summary |
|---|---|
| 1 Info Gather | G1→G2→G3 · emit [✓ gather] · write gather_complete.md |
| 2 MECE Plan | Plan → confirm → write mece_plan.md · emit [✓ MECE] |
| 3 Execution | REACT LOOP L1–L5 |
→ Full Phase 1–3 detail: **AGENTS.md §Loop Architecture**

## ⚡ PHASE TRANSITION GATE (hard — no exceptions)
Before ANY Edit/Write to `src/`:
```
[✓ gather]  gather_complete.md written today
[✓ MECE]   mece_plan.md written today + user confirmed
```
Missing either → STOP → run missing phase → only then proceed.
Boot ≠ Phase 1. Phase 1 = G1 greps + G2 reads + G3 assess + [✓ gather] emitted.
PreToolUse hook checks both files for today's date — mece_plan.md MUST include Phase 0-3 checklist blocks.

Phase 3 close sequence (no exceptions):
0. mece_plan.md — verify all sections marked [X] · mark any remaining [ ] → [X] before proceeding
1. Write session_handoff.md: skill_name + CFP_COUNT + task
2. Write compact_state.md: dt/sk/sk_h/mece_h/p3/section/step — BEFORE /compact
   section=S<N> (current section number) · step=<last completed step description>
3. `/compact` — ALWAYS run

---

## R1 · Token Tracking
Two counters — both in working memory, sourced from files at Boot:
- `SESSION_TOTAL` — resets at session close (per-task cost) · file: `.sessions/session_tokens.md`
- `CHAT_TOTAL` — resets only on /compact or new chat (true context window size) · file: `.sessions/chat_tokens.md`
```
# turn cost (same formula for both counters)
turn_tokens   = (user_msg_chars × 0.3) + tool_result_tokens + output_tokens
output_tokens = (thai_chars × 1.7) + (en_chars × 0.3)

# SESSION_TOTAL — incremental cost per turn (resets each task)
SESSION_TOTAL += turn_tokens

# CHAT_TOTAL — cumulative context window (never shrinks until /compact)
# Boot B1 fresh session: CHAT_TOTAL starts at system_fixed = 7,300
#   system_fixed = CLAUDE.md 2.6k + AGENTS.md 3.4k + skills 1.3k (one-time)
# Each turn adds only hooks + new content:
CHAT_TOTAL_n = CHAT_TOTAL_{n-1} + hooks_per_turn + turn_tokens
# hooks_per_turn = 1,300 (deferred-tools list + HARNESS REMINDER injected every turn)
```
Each turn: compute turn_tokens → SESSION_TOTAL += turn_tokens · CHAT_TOTAL += 1,300 + turn_tokens.
Write SESSION_TOTAL at: token pause · blocked halt · completion gate.
Write CHAT_TOTAL at: /compact (reset→0) · session close (accumulate).
Emit `*(Session: ~NNNk | Chat: ~NNNk tokens)*` every response.

## R2 · Tool Budget
Max 5 tool calls/turn. Retry max 2×; diagnose on 2nd fail.

## R3 · Session Pause Protocol
| Counter | Threshold | Action |
|---|---|---|
| SESSION_TOTAL | >60k | finish current step → TOKEN PAUSE |
| SESSION_TOTAL | >80k | `/compact` immediately |
| SESSION_TOTAL | >90k | HALT → save state → report |
| CHAT_TOTAL | >120k | ⚠️ แนะนำ /compact — context window หนักมาก |
| CHAT_TOTAL | >180k | 🛑 /compact บังคับ ก่อนรับงานใหม่ |

## R4 · Sub-agent Decision
Probe: `find <path> -name "<pat>" | wc -l` or `grep -rl "<kw>" src/ | wc -l`
< 5 files / < 300 lines → main context | ≥5 → spawn sub-agent → summary ≤500 tokens
Spawn: read `spawn_tool` from `detected.md` · platform-unknown → run B4 first.
→ Spawn patterns, constraints block template: **AGENTS.md §Sub-agent Rules**

## R5 · Index-First Lookup (hard)
T0 (run before T1–T3): `python scripts/lookup.py "<keyword>" --json`
Emit BEFORE every Read: `**[pre-read]** Target: \`<symbol>\` · Tier: T<N> · Line: <N> · Will read: offset=<N> limit=60`
Emit AFTER every Read: `**[post-read]** File: \`<path>\` · Verdict: relevant|partial|irrelevant`
Emit BEFORE symbol Edit: `**[pre-edit]** Symbol: \`<name>\` · used_in: <N files> · safe to edit: <yes|needs review>`
Skip any gate = `[violation] R5` → discard → re-run. `irrelevant` → DROP from context immediately.

## Never-Full-Load (hard — no exceptions)
```
CLAUDE.md                      → NEVER re-read (in context at boot)
knowledge/index_variables.json → grep ONLY · NEVER Read full
knowledge/index_files.json     → grep ONLY · NEVER Read full
CODING_FAILURE_PATTERNS.md     → grep -c + Read offset=N limit=30 per entry ONLY
docs/master_roadmap.md         → grep -n or tail -30 · NEVER full Read
INVARIANTS.md                  → on-demand when R14/R15 gate fires ONLY
knowledge/error_index.md       → grep → Read ≤40L ONLY
knowledge/index_cfp_fix.json   → full ok ≤30 entries · grep ONLY beyond 30
```
Full-Read permitted: `.agents/skills/*/SKILL.md` (≤80L) · `src/` ≤80L G2 only · `.sessions/active_thread.md` · `.sessions/session_handoff.md` · `.sessions/compact_state.md` · `REPO_MAP.md` · `knowledge/topic_registry.json`
Violation → emit `[violation] never-full-load` → discard → re-run as grep.

## R6–R7 · Output + Density
R6: `cmd 2>&1 | grep -iE "error|warn|fail" | tail -20`
R7: table/bullet > prose · comparison → table · steps → numbered · enum → bullet

## R8 · Index Sync (fire on file changes)
- Create/delete/move file → `index_files.json` entry + assign `topics[]` from `topic_registry.json` + run `python3 scripts/backlink_analyzer.py`
- Edit imports → update `backlinks[]` in `index_files.json`
- Create/delete/rename symbol → `index_variables.json` + `python scripts/symbol_indexer.py`
- Session close → `python scripts/session_indexer.py`
- Before editing any file: **3-tier check** — `backlinks[]` (who cites it) · `references[]` (what it cites) · `related[]` (topic overlap ≥50% — semantic impact)

## R9 · Error Protocol
Step 0 (run FIRST on any debug): Signals: "still broken" · "same error" · "กลับมาอีก" · same ERR-XXX in roadmap
→ grep roadmap prior AttemptID → read `### Failed Approaches:` → choose DIFFERENT approach
→ Emit: `[recurring] ERR-XXX · Prior: N · Previous: <summary> · New: <different>`
3 checks before debug: grep error_index.md → grep index_variables.json → grep index_files.json
New error: `T-{Parent}-{BugID}-{Attempt}` · `[ ]→[/]→[X]` (→ERR-XXX) · write error_index entry + `### Failed Approaches:`

## R10–R11 · Tool Cap + English
R10: Truncate tool results at 300 lines. >300 → grep relevant section only.
R11: `.sessions/`, `knowledge/`, comments, commits → English only. Thai: user replies only.

## R12 · Post-Edit Verification
| Action | Verify |
|---|---|
| Edit src/ | Re-read changed section · check no broken imports |
| DB schema | No ERR-007 violations |
| Create/delete file | `index_files.json` updated + backlinks resolved |
| Error fix | ERR-XXX in error_index.md + roadmap `[X]` |

## R13 · Escalation
AttemptID=02 / tool error 2× / R12 FAIL twice → emit and halt:
`[blocked] Task: <T-ID> · Attempts: 2 · Cause: <root cause> · Need: <missing>`

## R14 · Destructive Action Gates
Emit `[gate]` + wait confirm before: delete/overwrite `src/` or `knowledge/` · any `src/db/` edit · batch >5 files.
`[gate] Action: \`<what>\` · Scope: \`<files>\` · Risk: \`<why>\` · Waiting: confirm`

## R15 · DB Hard Stop
Any `src/db/` edit or TS type with DB columns → HALT:
`[db-gate] File: \`<path>\` · Symbol: \`<name>\` · Change: \`<what>\` · DB impact: \`<tables>\` · → Waiting for explicit "yes"`

## R16 · Self-Improvement (C0 detection)
Signals: "ทำไมไม่ทำตาม" · "you skipped" · "didn't log" · "ลืม" + harness step name
→ emit `[self-improve] Rule: <R-N> · Missed: <what>` → execute missed step → emit `[✓ backfilled]` → log CFP
→ Full CFP format + index_cfp_fix.json write: **self_improve/SKILL.md §CFP Logging**

## R-Roadmap · Log Before Starting
`[ ] T-<N>: desc` | `[ ] T-{Parent}-{BugID}-{Attempt}: desc` | `  - [ ] T-N.sub: desc`
`[ ] → [/] → [X]` · grep roadmap before creating — never duplicate T-IDs.
Completion: `[X] T-N: desc (→ERR-XXX) · attempts: N · tool_calls: N`

## Knowledge Base Paths
```
knowledge/index_files.json · knowledge/index_variables.json · knowledge/error_index.md
docs/master_roadmap.md · .agents/skills/registry.md · INVARIANTS.md · REPO_MAP.md
.sessions/session_*.json · CODING_FAILURE_PATTERNS.md · .agents/platform/detected.md
```

@AGENTS.md
