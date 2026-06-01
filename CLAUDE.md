# CLAUDE.md — Hard Constraints & Gateway

> Read first. Every AI agent, no exceptions.
> Destructive gates + DB stop → **INVARIANTS.md** · Repo structure → **REPO_MAP.md**

## ⚡ MANDATORY BOOT GATE
Before ANY response — verify `[Boot]` trace emitted this session.
If not: STOP → run B1→B2→B3 → emit boot trace → then respond.
Skipping boot = invalid session state = CFP violation.

## Boot (3 tool calls max)
→ Full B1/B2/B3 commands + compact-restore logic: **AGENTS.md §Boot Sequence**
- B1: checks compact_state.md + resets SESSION_TOTAL=0 · sets CHAT_TOTAL=sys_fixed on compact-restore OR phase≠in_progress + loads CFP_COUNT
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
- `CACHE_READ` / `CACHE_WRITE` — cumulative cache tokens this session · sourced from API `usage` fields
```
# turn cost (same formula for both counters)
turn_tokens   = (user_msg_chars × 0.3) + tool_result_tokens + output_tokens
output_tokens = (thai_chars × 1.7) + (en_chars × 0.3) + reasoning_tokens
# reasoning_tokens = usage.thinking_tokens if extended thinking active ELSE 0
# thai_chars ×1.7 = estimate only — may drift from actual; verify: POST /v1/messages/count_tokens

# 4-bucket attribution (estimate per turn):
bucket_sys    = sys_fixed / total_turns_so_far   # amortized system prompt cost
bucket_tools  = tool_result_tokens               # tool schema + result tokens
bucket_hist   = SESSION_TOTAL × 0.4             # accumulated history re-sent
bucket_output = output_tokens                    # this response only
# Sub-attribution (subset of bucket_tools — track per turn · no double-count):
bucket_retrieval   = RAG/context-retrieval tokens within bucket_tools (0 if no RAG used)
# bucket_tool_schema = tool definition tokens within bucket_tools (stable; measure once at boot)

# SESSION_TOTAL — incremental cost per turn (resets each task)
SESSION_TOTAL += turn_tokens

# CHAT_TOTAL — cumulative context window (never shrinks until /compact)
# Boot B1 fresh session:    CHAT_TOTAL = sys_fixed
# Boot B1 compact-restore:  CHAT_TOTAL = compact_size + sys_fixed
#   compact_size = read from compact_state.md (written at PATH B: CHAT_TOTAL_pre_compact × 0.52)
#   system_fixed = dynamic: (CLAUDE.md + AGENTS.md) chars × 0.3 + 3500 (skill est.) ≈ 11,070
#
# Per-turn growth (triangular accumulation — compact_base re-sent every turn):
CHAT_TOTAL_n = CHAT_TOTAL_{n-1} + hooks_per_turn + turn_tokens × 1.5
# hooks_per_turn = 700 (deferred-tools ~600 + HARNESS REMINDER ~100) · ⚠️ unverified estimate — measure actual: python3 scripts/token_estimator.py --schema-only
# ⚠️ Triangular undercount: true API total = Σ(each turn's full context re-sent)
#    For long sessions: actual ≈ CHAT_TOTAL × 1.5–2× · 1.5× calibrated from T-046 measurement
#    Use CHAT_TOTAL as lower-bound estimate, not exact figure
# ⚠️ Cache invalidation: tool schema edit → prefix reset → CHAT_TOTAL spike ≈ +sys_fixed added back
#    Detect via [spike:cache-collapse] · emit when cache_hit_pct drops >20pp vs prior turn

# Cache tracking (from Anthropic API usage fields when available):
# CACHE_READ  += usage.cache_read_input_tokens   (cheap: ~10× less than uncached input)
# CACHE_WRITE += usage.cache_creation_input_tokens
# cache_hit%  = CACHE_READ / (CACHE_READ + uncached_input_tokens) × 100
# If API usage fields not accessible: omit cache% from footer (do not estimate)
```
Each turn (in order):
1. Compute turn_tokens → SESSION_TOTAL += turn_tokens · CHAT_TOTAL += 700 + turn_tokens × 1.5
2. Write SESSION_TOTAL at: token pause · blocked halt · completion gate
3. Write CHAT_TOTAL at: /compact (reset→0) · session close (accumulate)
4. Write JSONL entry → `.sessions/token_log.jsonl` (append one line):
   `{"turn_id":"<uuid4>","timestamp":"<ISO-8601>","task_id":"<T-NNN>","phase":"<gather|mece|execute|verify|close>","skill_name":"<name>","session_total":<N>,"chat_total":<N>,"cache_read_tokens":<N>,"cache_write_tokens":<N>,"cache_hit_pct":<N.N>,"bucket_sys":<N>,"bucket_tools":<N>,"bucket_hist":<N>,"bucket_output":<N>,"turn_tokens":<N>,"hooks_overhead":700,"call_id":"<uuid4>","call_role":"initial|tool_loop|followup|final","success_state":"success|partial|failed","quality_score":0,"reasoning_tokens":<N>,"tool_called":false,"tool_name":"<name>","estimated_cost_usd":0.0000}`
   If API usage fields not available: set cache_* = 0, cache_hit_pct = 0
   # new fields default when unavailable: reasoning_tokens=0, quality_score=0, estimated_cost_usd=0.0, tool_called=false, tool_name=""
   # 21 fields total (13 existing + 8 new · null-safe defaults)
   # estimated_cost_usd formula — compute per turn before JSONL write:
   # MODEL_HIGH (Sonnet 4.x): (in×0.000003) + (cw×0.00000375) + (cr×0.0000003) + (out×0.000015)
   # MODEL_LOW  (Haiku 3.x):  (in×0.00000025) + (cw×0.0000003) + (cr×0.00000003) + (out×0.00000125)
   # in=turn_tokens-output_tokens · cw=cache_write_tokens · cr=cache_read_tokens · out=output_tokens
   # tier: read model_high/low from detected.md · default MODEL_HIGH if unknown
   # Telemetry retention: .sessions/token_log.jsonl — keep 30 days · archive older entries monthly
   #   trim script: python3 scripts/trim_exec_log.py --also-jsonl --days=30
Footer (Behavior Contract — no exceptions):
  Pre:      read SESSION_TOTAL + LOOP_WEIGHT from `.sessions/session_tokens.md` (or working memory if just updated)
  Contract: MUST append to EVERY response — no response is valid without this footer:
            `*(Turn: N · Loop_W: N | Session: ~NNNk | Chat: ~NNNk tokens)*`
            When API usage available: `*(Turn: N · Loop_W: N | Session: ~NNNk | Chat: ~NNNk | Cache hit: NN% [sys:Nk tools:Nk hist:Nk out:Nk])*`
  Post:     footer missing = invalid response · re-emit immediately if omitted
  Enforce:  R1 step 7 (last step before sending) · skip = CFP-026 violation → [self-improve] backfill
Always compute and display 4-bucket breakdown in footer when SESSION_TOTAL > 5k:
  `[sys:Nk tools:Nk hist:Nk out:Nk]` (+ `[ret:Nk]` when bucket_retrieval > 0) — use bucket formulas above · omit if SESSION_TOTAL ≤ 5k (too small to be useful)
**Spike Detection:** after computing turn_tokens — check all 6 alert types:
| Alert | Condition | Emit |
|---|---|---|
| turn-spike | turn_tokens > 3 × avg_turn | `[spike:turn] turn:~NNk avg:~NNk cause:<tool result\|loop\|output>` |
| cache-collapse | cache_hit_pct drops >20pp vs prior turn | `[spike:cache-collapse] hit%:NN→NN` |
| loop-explosion | same tool called ≥3× same turn | `[spike:loop-explosion] tool:<name> calls:<N>` |
| retrieval-inflation | bucket_tools > 0.5 × turn_tokens | `[spike:retrieval-inflation] tools:~NNk of ~NNk` |
| output-runaway | bucket_output > 5k | `[spike:output-runaway] output:~NNk` |
| tool-result-inflation | single tool result > 200L before truncation | `[spike:tool-result-inflation] tool:<name> lines:<N>` |

**Cache Guardrail:** after emitting footer — if cache_hit_pct < 60% AND cache_read_tokens > 0:
  emit `[cache-warn] hit%: NN% (target ≥60%) · recommend /compact before next task`

## R2 · Tool Budget
Max 5 tool calls/turn. Retry max 2×; diagnose on 2nd fail.

## R3 · Session Pause Protocol
| Counter | Threshold | Action |
|---|---|---|
| SESSION_TOTAL | >40k + turns ≥8 | rolling summary: summarize prior 4 turns → `.sessions/session_memory.md` · keep last 2 turns raw in context |
| SESSION_TOTAL | >30k + multi-section (≥3 remaining) | compact after current section (cache-warm + triangular-sum prevention) |
| turns | ≥ 15 | [history-cap] summarize oldest 10 turns → `.sessions/session_memory.md` · CHAT_TOTAL -= Σ(turn_tokens of removed turns) · keep summary in context |
| SESSION_TOTAL | >60k | finish current step → TOKEN PAUSE |
| SESSION_TOTAL | >80k | `/compact` immediately |
| SESSION_TOTAL | >90k | HALT → save state → report |
| CHAT_TOTAL | >120k | ⚠️ แนะนำ /compact — context window หนักมาก |
| CHAT_TOTAL | >180k | 🛑 /compact บังคับ ก่อนรับงานใหม่ |
| LOOP_WEIGHT | >30 | 🟡 [compact-warn] Skill: `<name>` · Remaining: `<[ ] sections>` · Resume: `.sessions/mece_plan.md` → first `[ ]` |
| LOOP_WEIGHT | >50 | 🔶 [compact-required] stop new work · write `compact_state.md` · user runs `/compact` |

## R4 · Sub-agent Decision
Probe: `find <path> -name "<pat>" | wc -l` or `grep -rl "<kw>" src/ | wc -l`
< 5 files / < 300 lines → main context | ≥5 → spawn sub-agent → summary ≤500 tokens
Spawn: read `spawn_tool` from `detected.md` · platform-unknown → run B4 first.
→ Spawn patterns, constraints block template: **AGENTS.md §Sub-agent Rules**
Phase routing — override task-type tier by phase (~35% cost saving):
| Phase | Tier | Reason |
|---|---|---|
| G1 Scan / G2 Reads | MODEL_LOW | Grep + classify only |
| MECE Plan M1-M3 | MODEL_HIGH | Reasoning heavy |
| L1-L5 REACT Loop | MODEL_HIGH | Code edits need quality |
| Reviewer (Completion Gate) | MODEL_LOW | Verify only — read-only |

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
**Re-insertion rule:** tool result reused in subsequent turn → compress to ≤20L excerpt before re-inserting into context · full result accessible at exec_log/ path
**Tool-Result Offload:** tool result >50L → write full result to `.sessions/exec_log/<uuid>.txt` → inject only: `[result-offloaded] path=<file> lines=<N>` into history. Agent reads file via Read tool if context needed. (prevents triangular CHAT_TOTAL bloat · >300L: truncate first via R10, then offload)
**Output Contracts:** routine harness signals must be terse — emit verdict only, no prose explanation:
- `[post-read]` → `[post-read] <path> · <relevant|partial|irrelevant>` (1 line max)
- `[✓ written]` → `[✓ written] <symbol>` (1 line max)
- `[✓ gather]` / `[✓ MECE]` → signal only (no summary unless user asks)
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
→ emit `[self-improve] Rule: <R-N> · Missed: <what>` → execute missed step → emit `[✓ backfilled]`
→ **MANDATORY tool call (same response):** Edit `CODING_FAILURE_PATTERNS.md` — append CFP entry immediately · no deferral
  CFP format: `## CFP-<N+1> · <title>` · Symptom · Root cause · Prevention · Detection signal
→ After Edit: `grep -c "^## CFP-" CODING_FAILURE_PATTERNS.md` → verify count = N+1 · emit `[✓ CFP-<N+1>]`

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
