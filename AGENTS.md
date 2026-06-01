# Agent Orientation — Asset Plan · ALL agents
> Next.js: read `node_modules/next/dist/docs/` first — conventions may differ from training data.
> Constraints → `CLAUDE.md` · Gates → `INVARIANTS.md` · Structure → `REPO_MAP.md`

---

## Boot Sequence (3 tool calls max)

```
[B1] Bash: (cs_dt=$(grep "^dt=" .sessions/compact_state.md 2>/dev/null | cut -d= -f2 | cut -d' ' -f1); today=$(date +%Y-%m-%d); compact_restore=false; [ "$cs_dt" = "$today" ] && compact_restore=true && echo "[compact-restore]" && cat .sessions/compact_state.md && echo "---"; phase=$(grep "^phase:" .sessions/active_thread.md 2>/dev/null | awk '{print $2}'); sys_fixed=$(python3 -c "import os; print(int((os.path.getsize('CLAUDE.md') + os.path.getsize('AGENTS.md'))*0.3) + 3500)" 2>/dev/null || echo 11070); if [ "$compact_restore" = "true" ]; then cs=$(grep "^compact_size=" .sessions/compact_state.md 2>/dev/null | cut -d= -f2 || echo "0"); ct=$((sys_fixed + ${cs:-0})); printf "SESSION_TOTAL: 0\nCHAT_TOTAL: $ct\nCACHE_READ: 0\nCACHE_WRITE: 0\nTURN_COUNT: 0\nLOOP_WEIGHT: 0\n" > .sessions/session_tokens.md; elif [ "$phase" != "in_progress" ]; then printf "SESSION_TOTAL: 0\nCHAT_TOTAL: $sys_fixed\nCACHE_READ: 0\nCACHE_WRITE: 0\nTURN_COUNT: 0\nLOOP_WEIGHT: 0\n" > .sessions/session_tokens.md; fi; cat .sessions/active_thread.md 2>/dev/null | tail -4; echo "---"; cat .sessions/session_tokens.md 2>/dev/null; echo "---"; grep -n "\[/\]" docs/master_roadmap.md 2>/dev/null | head -3; echo "---"; echo "CFP_COUNT: $(grep -c '^## CFP-' CODING_FAILURE_PATTERNS.md 2>/dev/null || echo 0)")
[B2] IF [compact-restore]: parse sk= → skill_name · parse section= + step= → resume_hint · SKIP manifest read
     IF prompt has `skill: <name>`: use directly · SKIP manifest
     ELSE: grep -B1 -A6 '"keywords"' .agents/skills/skill-manifest.json | head -80 → match → skill_name
[B3] IF [compact-restore]: sha1sum <skill>/SKILL.md → compare sk_h · sha1sum mece/SKILL.md → compare mece_h
       match → SKIP read (~2.9k tokens saved) | mismatch → Read offset=1 limit=80
     ELSE: Read .agents/skills/<skill_name>/SKILL.md offset=1 limit=80
           Read .agents/skills/mece/SKILL.md offset=31 limit=110
```
- B1 resets SESSION_TOTAL=0 · compact-restore: CHAT_TOTAL = compact_size + sys_fixed · fresh session: CHAT_TOTAL = sys_fixed · sys_fixed = (CLAUDE.md + AGENTS.md chars × 0.3) + 3500 · CFP_COUNT → cfp_boot_count in working memory
- B1 cache breakpoint: if compact_state.md has `prefix_hash=<val>` → compare vs `sha1sum CLAUDE.md | cut -c1-8` → mismatch → emit `[cache-miss-boot] prefix changed · cache cold this session`
- B1 session_tokens.md format: `SESSION_TOTAL: 0\nCHAT_TOTAL: N\nCACHE_READ: 0\nCACHE_WRITE: 0` — add cache fields on fresh session init only if file is being reset
- on_demand_files = lookup table for G2 only — NEVER auto-load at B3
- mece_plan.md has pending sections? Skip Phase 1+2 → resume Phase 3:
  `grep -n "^\- \[ \]\|^\- \[/\]" .sessions/mece_plan.md | head -3` → first pending item
  Resume staleness gate (V3): compare mece_plan_hash in handoff vs sha1sum · git status src/ → [plan-stale] if changed

[B4] Platform Probe: `detected.md` platform: unknown → list tools → update detected.md · else skip

Reply line 1: `**[Boot]** Thread: <done|in_progress> · Tasks: <N> · Skill: <name> · Sections: <N> · Tokens: ~<N>k · CFP: <N>`
compact-restore reply: append ` · Resume: S<N> — <step>` when section= + step= fields present in compact_state.md

> Boot ending ≠ ready to work. Run C0–C3 → Phase 1 next. SKILL.md load ≠ Phase 1.

---

## Per-Turn Routing (every message)

**Run C0→C0.5→C1→C2→C3 before any work. No exceptions.**

```
[C0.5] LOOP_WEIGHT gate (Behavior Contract — runs every turn before C1):
  Pre:      read `grep "^LOOP_WEIGHT:" .sessions/session_tokens.md` → get value N
  Contract: N >30 → MUST emit [compact-warn] as FIRST line of response before any other content
            N >50 → MUST emit [compact-required] → write compact_state.md → STOP (no new work accepted)
  Post:     [compact-warn] MUST contain all 3 fields or response is invalid:
              Skill: <current skill_name>
              Remaining: <[ ] sections from mece_plan.md>
              Resume: .sessions/mece_plan.md → first [ ] · compact_state.md → section/step
  Enforce:  skip = CFP-026 violation → emit [self-improve] CFP-026 → backfill immediately

[C0] c0_resolved=true in memory → clear flag → skip to C1
     COMPLAINT CHECK: "ลืม"/"you skipped"/"didn't log"/"harness says" + harness step name
     "ลืม" triggers ONLY on step names: roadmap/CFP/index/pre-read/session/boot/skill/gate/MECE
     "ลืมบอกให้เพิ่ม X" = feature request → pass to C1 normally
     YES → R16 self-improve → set c0_resolved=true → resume C1

[C1] Read active_thread.md → extract task: field
[C2] Compare new topic vs task:
     → different topic → TOPIC SWITCH (→ C3)
     → same topic: check mece_plan.md freshness:
         `grep "status:\|^\- \[ \]\|^\- \[/\]" .sessions/mece_plan.md | head -3`
         status:task-complete OR task-mismatch OR no pending [ ]/[/] → NEW TASK (force Phase 1+2 · skip Phase 0 if same chat)
         pending [ ] or [/] found + task matches → resume Phase 3 (→ C3 stay)
[C3] TOPIC SWITCH:
       (a) Emit [topic-switch] Current: `<task>` · New: `<topic>` · Closing first
       (b) session_manager §3 (5-file close + SESSION_TOTAL reset to 0)
       (c) Check provider: `grep "^platform:" .agents/platform/detected.md`
           claude-code → /compact → Phase 1 fresh same chat
           other       → write compact_state.md → emit "Session ปิดแล้ว — เปิด chat ใหม่ได้เลยครับ" → STOP
     SAME: re-read SKILL.md ONLY if skill changes (compare to cached skill_name)
```

**IS switch:** different section/entity/intent/feature/path · **NOT:** additive/"also"/continue/same-task-bug · **Uncertain:** `[topic-unclear]` → wait
> After C3 → Phase 1 mandatory.

---

## Loop Architecture

**Phases 1–2 run ONCE per task. On resume: skip to Phase 3 at pending section.**

| Phase | What happens |
|---|---|
| 1 Info Gather | G1 scan all sections → G2 batch greps+reads → G3 assess · emit [✓ gather] |
| 2 MECE Plan | Plan + Verify-N → user confirms → roadmap → mece_plan.md |
| 3 Execution | REACT LOOP: Select → Execute → Observe → Verify → Decide |

---

### Phase 1 · Info Gather

G0 (clarity gate) → G1 (1-pass scan) → G2 (batch grep+read) → G3 (assess) → [✓ gather] → write gather_complete.md
→ Full G0–G3 detail + limits + refusal contract: **Implement/04_skills.md §Phase 1**

Key rules: G2 = 1 Bash call · user ask = 1 message · max 3 loops · max 5 clarification rounds
[post-read] verdict after every Read: irrelevant→DROP · partial→excerpt · relevant→keep

---

### Phase 2 · MECE Plan

[M1] Read mece/SKILL.md → [M1.5] dependency_map + risk_flags + compact_checkpoint (≥3 sections → insert after ceil(N/2)) → [M2] build plan + Verify-N → [M3] user confirms → [M4] roadmap T-N → [M4.5] optional Skeptical Reviewer → [M5] write mece_plan.md (Phase 0-3 template mandatory) → [M6] emit [✓ MECE]
→ Full M1–M6 detail + compact_checkpoint formula: **Implement/04_skills.md §Phase 2**

MECE runs ONCE. On resume: load existing plan → jump to first pending [ ] section.

---

### Phase 3 · Execution Loop

```
REACT LOOP (per section — repeat until section_complete OR token pause):
  Token check: SESSION_TOTAL > 60k → finish current step → PAUSE

  [L1] SELECT  → next tool (R2 budget · R5 index-first)
  [L2] EXECUTE → run tool (R6 filter · R10 cap)
  [L3] OBSERVE → verify result · unexpected → diagnose → retry once → BLOCKED
  [L4] VERIFY  → (a) grep confirm → emit [✓ written]
                 (b) run section Verify-N from MECE plan
                 FAIL → do NOT mark done → diagnose → retry or BLOCKED
  [L4.5] PURGE → drop tool results from context per state-retention policy:
    | Tool result type        | Policy                                      |
    |-------------------------|---------------------------------------------|
    | Bash verify/grep        | DROP immediately after verdict emitted      |
    | Read · irrelevant       | DROP immediately ([post-read] irrelevant)   |
    | Read · partial/relevant | KEEP excerpt only (≤10L) · drop full output |
    | Edit success            | KEEP [✓ written] verdict + artifact path    |
    | Write success           | KEEP [✓ written] verdict + artifact path    |
    | tool result >50L        | OFFLOAD → write to .sessions/exec_log/<uuid>.txt · inject [result-offloaded] path=<file> lines=<N> · agent reads file if needed |
    keep: [✓ written] verdict + artifact path + Verify-N result · drop: everything else
    exec_log schema: .sessions/exec_log/<uuid>.txt — full tool result · agent reads on-demand via Read tool
  [L5] DECIDE  → section_done = [✓ written] AND Verify-N BOTH pass
                 → mark mece_plan.md: `- [ ] S<N>` → `- [X] S<N>` (file write — not just memory)
                 → steps remain: emit [loop] continue · → done: emit [loop] done
```
After each section → write session_handoff.md: sections_done + sections_pending + last_step + mece_plan_hash=`sha1sum .sessions/mece_plan.md | cut -c1-8` + resume_at=S<N>:step:<desc>

BLOCKED: halt · show error+progress · ask "fix or skip?" · wait
TOKEN PAUSE (>60k): check provider (detected.md): claude-code → ask continue → resume · other → compact_state.md → STOP
LOOP_WEIGHT check (every turn after hook fires): read `.sessions/session_tokens.md` → if LOOP_WEIGHT >30 → [compact-warn] · if >50 → [compact-required]
  [compact-warn/required] emit (mandatory fields — no partial emit):
    `[compact-warn] Skill: <skill_name> · Remaining: <[ ] sections from mece_plan.md> · Resume: .sessions/mece_plan.md → first [ ] · compact_state.md → section/step`
Cache note: Anthropic prompt cache TTL = 5 min · /compact resets cache prefix cleanly · compact before long idle > 5 min preserves cache hits on next turn (10× cheaper reads)
Tool schema serialization: JSON key ordering in tool definitions MUST be stable across turns — unstable serialization invalidates the prompt cache prefix silently (causes cache-collapse spike)
bucket_sys note: amortizes sys_fixed across turns — if tool schema edited this session → cache prefix resets → actual cost ≈ sys_fixed added back once · [spike:cache-collapse] detects this
Stable prefix rule: CLAUDE.md + AGENTS.md = stable prefix (cache_control these blocks — never change mid-session) · User message + tool results = dynamic suffix — never cache_control dynamic blocks.
[schema-gate] Before editing any SKILL.md or tool definition mid-session:
  SESSION_TOTAL > 10k → emit `[schema-gate] Schema change · CHAT_TOTAL will spike +sys_fixed · confirm?` · wait for confirm
  After edit: emit `[schema-changed] Cache prefix reset · CHAT_TOTAL += sys_fixed`
Proactive cache invalidation: at boot → `sha1sum .agents/skills/*/SKILL.md 2>/dev/null | sort > .sessions/tool_schema_hash.txt` · per-turn: diff vs stored hash → mismatch → emit [cache-invalidated] + update `.sessions/tool_schema_hash.txt`

---

### Completion Gate

Reviewer: Verify-N ≤3 + no src/ → inline bash · Verify-N ≥4 OR src/ changes → spawn MODEL_LOW
Done criteria: all [✓ written] · R8 Index Sync · Roadmap [X] · active_thread phase:done · SESSION_TOTAL written · Feedback
Run `python3 scripts/trim_exec_log.py` + write session_summary to token_log.jsonl before /compact
SESSION_TOTAL >50k → compact first · >60k → TOKEN PAUSE · >30k + ≥3 sections remaining → compact after current section

Session Health: <20k ✅ · 20–40k 💡 · 40–60k ⚠️ compact now · >60k 🛑 TOKEN PAUSE · emit `[session-health]` · Thai summary: `งานเสร็จแล้วครับ ✅`
⚠️ CHAT_TOTAL undercount: true API context ≈ CHAT_TOTAL × 1.5–2× (triangular re-send) · use as lower bound · compact before CHAT_TOTAL > 80k to avoid spike

---

## Index Sync Invariant

Every create/modify/delete/rename **must** update indexes before task marked done.
Backlink 3-tier check before editing: references[] · backlinks[] · related[] → **Implement/03_config.md §Backlink Rule**
| Entity | Must update |
|---|---|
| File created/moved/deleted | `index_files.json` (file_manager) |
| Symbol created/renamed/deleted | `index_variables.json` (symbol_indexer.py) |
| Session closed | `index_sessions.json` (session_indexer.py) |
| SKILL.md created/renamed | `skill-manifest.json` + `skill-index.md` |
| Tool script created/renamed | `tool-manifest.json` |
| `knowledge/` file modified | `knowledge_conflict_checker.py --file <path> --no-trigger` · EXCLUDE: index_*.json · error_index.md |

---

## Never-Full-Load (hard — no exceptions, including Phase 1 G2)
→ Full file list + whitelist: **Implement/03_config.md §Never-Full-Load**
Violation → emit `[violation] never-full-load` → discard → re-run as grep.
on_demand_files in manifest = lookup table for G2 only. B3 MUST NOT load them.

---

## Sub-agent Rules (R4)

Probe first: `find <path> -name "<pat>" | wc -l` → <5 files/<300L = main context · ≥5 = spawn sub-agent (≤500 tok summary)
Phase routing: G1/G2/Reviewer → MODEL_LOW · MECE/Execute → MODEL_HIGH (~35% cost saving)
Max depth = 1 · pre-assign T-IDs before spawn · emit `[cycle N]` · HALT if blocked
→ Full routing table + OmO Roles + spawn patterns: **Implement/03_config.md §Sub-agent Rules**

---

## Critical Project Rules
- **Miniflare D1 (local):** No `onConflictDoNothing()` or multi-row INSERT — silent failures. Use SELECT+filter+single-row-insert. (ERR-007)
- **Edge Runtime:** No Node.js APIs. WebCrypto only.
- **CSV parsing:** Always PapaParse — never `split(",")` manually.
<!-- END:agent-orientation -->
