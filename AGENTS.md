# Agent Orientation — Asset Plan · ALL agents
> Next.js: read `node_modules/next/dist/docs/` first — conventions may differ from training data.
> Constraints → `CLAUDE.md` · Gates → `INVARIANTS.md` · Structure → `REPO_MAP.md`

---

## Boot Sequence (3 tool calls max)

```
[B1] Bash: (cs_dt=$(grep "^dt=" .sessions/compact_state.md 2>/dev/null | cut -d= -f2 | cut -d' ' -f1); today=$(date +%Y-%m-%d); [ "$cs_dt" = "$today" ] && echo "[compact-restore]" && cat .sessions/compact_state.md && echo "---"; phase=$(grep "^phase:" .sessions/active_thread.md 2>/dev/null | awk '{print $2}'); [ "$phase" != "in_progress" ] && printf "SESSION_TOTAL: 0\n" > .sessions/session_tokens.md; cat .sessions/active_thread.md 2>/dev/null | tail -4; echo "---"; cat .sessions/session_tokens.md 2>/dev/null; echo "---"; grep -n "\[/\]" docs/master_roadmap.md 2>/dev/null | head -3; echo "---"; echo "CFP_COUNT: $(grep -c '^## CFP-' CODING_FAILURE_PATTERNS.md 2>/dev/null || echo 0)")
[B2] IF [compact-restore]: parse sk= → skill_name · SKIP manifest read
     IF prompt has `skill: <name>`: use directly · SKIP manifest
     ELSE: grep -B1 -A6 '"keywords"' .agents/skills/skill-manifest.json | head -80 → match → skill_name
[B3] IF [compact-restore]: sha1sum <skill>/SKILL.md → compare sk_h · sha1sum mece/SKILL.md → compare mece_h
       match → SKIP read (~2.9k tokens saved) | mismatch → Read offset=1 limit=80
     ELSE: Read .agents/skills/<skill_name>/SKILL.md offset=1 limit=80
           Read .agents/skills/mece/SKILL.md offset=31 limit=110
```
- B1 resets SESSION_TOTAL=0 when phase≠in_progress · CFP_COUNT → cfp_boot_count in working memory
- on_demand_files = lookup table for G2 only — NEVER auto-load at B3
- mece_plan.md has pending sections? Skip Phase 1+2 → resume Phase 3:
  `grep -n "^\- \[ \]\|^\- \[/\]" .sessions/mece_plan.md | head -3` → first pending item
  Resume staleness gate (V3): compare mece_plan_hash in handoff vs sha1sum · git status src/ → [plan-stale] if changed

[B4] Platform Probe: `detected.md` platform: unknown → list tools → update detected.md · else skip

Reply line 1: `**[Boot]** Thread: <done|in_progress> · Tasks: <N> · Skill: <name> · Sections: <N> · Tokens: ~<N>k · CFP: <N>`

> Boot ending ≠ ready to work. Run C0–C3 → Phase 1 next. SKILL.md load ≠ Phase 1.

---

## Per-Turn Routing (every message)

**Run C0→C1→C2→C3 before any work. No exceptions.**

```
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

```
[G0] Task clarity gate — run ONCE before G1:
     Skip G0 if task has ≥3 of: specific feature name · file/path · error message · "fix/add/update X in Y"
     Otherwise → use AskUserQuestion (MUST include options per question — never open-ended only):
       - Goal: ask what outcome they want · options = [add feature / fix bug / refactor / other]
       - Affected area: ask which part of the system · options = sections listed in REPO_MAP.md (read at G0)
       - Constraints: ask limits (perf/scope/compat) · options = [none / list specific]
       - Definition of done: ask acceptance test · options = [passes tests / UI works / data correct / other]
     Stop when spec has: goal + constraints + affected files + acceptance criteria
     G0 runs once only — if user still unclear → [gather-stalled]

[G1] Scan ALL sections at once (1 pass — never section-by-section):
     For each section: □ file/symbol needed? □ via index or needs user input?
     missing_user_input? → ask user ONCE (all items in 1 message) → wait → restart G1
     missing_files only? → G2

[G2] Batch retrieve — all greps in ONE Bash call → line numbers → targeted Reads (offset+limit):
     After each Read → emit [post-read] verdict immediately (no exceptions)
       irrelevant → DROP from context · partial → keep excerpt only · relevant → keep

[G3] Assess — context_sufficient when ALL:
     □ Every section has ≥1 resolved file/symbol
     □ Every section has draft Verify-N criterion
     □ No unresolved "?" placeholders
     □ Spec complete (new feature): goal · constraints · affected files · acceptance criteria · verification plan
     → emit [✓ gather] → write gather_complete.md (date: YYYY-MM-DD) → Phase 2
```
Limits: G2 = 1 Bash call · user ask = 1 message max · max 3 loops total · max_clarification_rounds: 5
After 3 loops OR 5 clarification rounds: emit [gather-stalled] · ask user once · wait before Phase 2

---

### Phase 2 · MECE Plan

```
[M1]   Read mece/SKILL.md offset=1 limit=100
[M1.5] Reason (memory ≤600 tok): dependencies→Sequential · parallel→Parallel · irreversible→flag · risk · done-sketch per section
[M2]   Build plan 1:1 with Skill sections · [M2.5] Verify-N: runnable command per section
[M3]   Send plan+Verify-N → user confirms BOTH · [M4] R-Roadmap: add [ ] T-<N> per section
[M5]   Write mece_plan.md (mece/SKILL.md §Phase-Checklist Template · include Constraints: field per section)
[M6]   Emit [✓ MECE]
```
MECE runs ONCE. On resume: load existing plan → jump to pending section.

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
  [L4.5] PURGE → drop tool results from context
                 keep only: [✓ written] verdict + artifact path + Verify-N result
  [L5] DECIDE  → section_done = [✓ written] AND Verify-N BOTH pass
                 → steps remain: emit [loop] continue · → done: emit [loop] done
```
After each section → write session_handoff.md: sections_done + sections_pending + last_step + mece_plan_hash=`sha1sum .sessions/mece_plan.md | cut -c1-8` + resume_at=S<N>:step:<desc>

BLOCKED: halt · show error+progress · ask "fix or skip?" · wait
TOKEN PAUSE (>60k): check provider (detected.md): claude-code → ask continue → resume · other → compact_state.md → STOP

---

### Completion Gate

Before reporting done → spawn Reviewer (haiku · read-only): prompt = Verify-N list + grep commands · PASS → proceed · FAIL → fix → retry 1× → R13
Agent may NOT report done until: all sections executed (tool calls) · [✓ written] on every edit · R8 Index Sync · Roadmap [X] · active_thread phase:done · SESSION_TOTAL written · Feedback delivered · I6–I8 checked (if parallel agents used)
SESSION_TOTAL > 50k → compact first · > 60k → TOKEN PAUSE before gate.

---

## Backlink Rule
Before editing any file:
`grep -A 6 '"src/path/to/file.tsx"' knowledge/index_files.json` → check backlinks[] → update all importers.
After Write to new `src/` file → verify `knowledge/index_files.json` has entry before closing section (R8 · INVARIANTS.md I3).

---

## Never-Full-Load (hard — no exceptions, including Phase 1 G2)
→ Full file list + whitelist: **Implement/03_config.md §Never-Full-Load**
Violation → emit `[violation] never-full-load` → discard → re-run as grep.
on_demand_files in manifest = lookup table for G2 only. B3 MUST NOT load them.

---

## Sub-agent Rules (R4)

| Pattern | When |
|---|---|
| Explore | ≥5 files / ≥300 lines → summary ≤500 tokens |
| Execution | section >8 steps + isolated output |
| Parallel fan-out | ≥2 independent sections → spawn simultaneously |
| Cycle transition | Cycle N done → TOKEN CHECK → inject → spawn N+1 |

- Max depth = 1 · pre-assign ALL T-IDs before spawn · emit `[cycle N]` · HALT if any section blocked

**Execution/Coder agents constraints (missing = CFP violation):** Roadmap T-N [/] before edit · no src/ edit without gather_complete+mece_plan · no new file without index_files.json backlinks · no symbol rename without symbol_indexer.py · DB edits → [db-gate] halt

**OmO Roles (sections > 2 OR any [gate]/DB action):**
| Role | Maps to | Model | Responsibility |
|---|---|---|---|
| Architect | Phase 2 main agent | sonnet | MECE plan + dependency_map + Verify-N |
| Executor | Phase 3 REACT loop | sonnet | Run sections + [✓ written] per step |
| Reviewer | Completion Gate | haiku | Verify all □ pass · read-only · PASS or FAIL list |

Reviewer: spawn after all sections done · prompt = Verify-N list + grep commands · on FAIL → retry 1× → R13

---

## Critical Project Rules
- **Miniflare D1 (local):** No `onConflictDoNothing()` or multi-row INSERT — silent failures. Use SELECT+filter+single-row-insert. (ERR-007)
- **Edge Runtime:** No Node.js APIs. WebCrypto only.
- **CSV parsing:** Always PapaParse — never `split(",")` manually.
<!-- END:agent-orientation -->
