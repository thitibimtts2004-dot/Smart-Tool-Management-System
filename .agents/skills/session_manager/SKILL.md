---
name: Session Manager
description: Handles session lifecycle — topic-switch close, TOKEN PAUSE, BLOCKED halt, manual close, and resume flows.
---

## Sections
```
- id: 1
  name: "Session State"
  steps: ["check active_thread.md phase", "rotate or continue session JSON", "continuous History logging"]
- id: 2
  name: "Pause / Blocked Handling"
  steps: ["save state to session_handoff.md", "summarize progress", "ask user to continue or fix"]
- id: 3
  name: "Manual Close"
  steps:
    - "Step 0: CFP review (self_improve §1–3)"
    - "Step 1–5: write 5 mandatory files"
    - "Step 6: confirm to user — list every file written"
```

---

# Session Manager

## Trigger
- **Topic switch** — C3 detects different topic → routes here → close current session → Phase 1 fresh
- **Manual close** — user says "ปิด session / close / จบงาน / done"
- **TOKEN PAUSE** — SESSION_TOTAL >60k → Phase 3 REACT loop fires this
- **BLOCKED halt** — verify or observe fails 2× → Phase 3 fires this
- **Session rotation** — new task after phase: done → create new session JSON
- **Task complete** — Completion Gate Reviewer PASS → emit `[session-health]` · check SESSION_TOTAL vs thresholds (20k/40k/60k)

## Refusal Contract
Halt and emit `[session-refused]` if:
- Section 3 requested but no active `session_*.json` found → warn user, create placeholder before proceeding
- Close requested mid-BLOCKED state without T-ID logged in roadmap → require T-ID first
- `session_handoff.md` write attempted without all 5 contract fields (objective · outcome · changes · validation · follow_ups) → halt · fill missing fields first

## Workflow

**Section 1 — Session State:**
- Check `active_thread.md` phase → rotate JSON if phase≠in_progress
- On topic switch: set current session `status: completed` → create new session JSON
- Continuous History logging after every interaction round (≤5 items — rolling compact)

**Section 2 — Pause / Blocked:**
- TOKEN PAUSE (>60k): finish current step → write `session_handoff.md` → emit `[pre-compact-state]` block → ask user continue?
  ```
  [pre-compact-state]
  task: <T-N · description>
  pending_sections: <S-N names from mece_plan.md [ ] items>
  resume_at: S<N>:step:<last step description>
  key_files: <comma-separated changed files this session>
  ```
- BLOCKED (2× fail): halt → write state → report cause → ask "fix or skip?"
- On resume: reload skill if different, reuse MECE plan if unchanged

**Section 3 — Manual Close:**
- Step 0: CFP review via `self_improve` §1–3 before file writes
- Steps 1–5: write 5 mandatory files (see Output Contract)
- Step 6: confirm to user listing all files written

**Never report "session closed" before all 5 files are written.**

→ Full History format, Rolling Summary, compact detail, TOKEN PAUSE steps, BLOCKED steps,
Manual Close steps 0–6 with exact file content:
`@.agents/skills/session_manager/SKILL_detail.md`

## Output Contract

**Required emits:**
| Trigger | Emit |
|---|---|
| Topic switch | `[topic-switch] Current: <task> · New: <topic> · Closing first` |
| TOKEN PAUSE | `[pre-compact-state]` block (task+pending+resume_at+key_files) · then `"ทำเสร็จแล้ว <X>/<N> sections · ค้างที่: · ดำเนินการต่อไหม?"` |
| BLOCKED | `[blocked] Task: <T-ID> · Attempts: 2 · Cause: <root> · Need: <missing>` |
| Session close | `✅ Session ปิดแล้วครับ` + list of all 5 files written |
| CFP skip | `[cfp-skip]` or `[cfp-tally] New: N · Total: N` |
| Task complete | `[session-health] Session: ~NNk · Chat: ~NNk · <recommendation>` (thresholds: <20k=✅ 20-40k=💡 40-60k=⚠️) |

**5 mandatory files at close (all required — no exceptions):**
| Step | File | Content |
|---|---|---|
| 1 | `session_<NNN>.json` | `status: completed` + `summary_context` |
| 2 | `session_tokens.md` | `SESSION_TOTAL: 0` (reset for next session) |
| 3 | `active_thread.md` | `phase: done` + task + next |
| 4 | `session_handoff.md` | Full closeout contract (objective · outcome · changes · validation · root_cause · follow_ups) |
| 5 | `index_sessions.json` | `python scripts/session_indexer.py` |

## Routing
| After | Go to |
|---|---|
| Topic switch close | Phase 1 fresh (same chat: claude-code · other platform: ask user to open new chat) |
| Manual close done | Session ends · user notified · `phase: done` |
| TOKEN PAUSE | Wait for user confirm → resume Phase 3 at `resume_at` section |
| BLOCKED | Wait for user "fix or skip" → fix: retry once · skip: mark section blocked → next section |
| Section 3 §0 (CFP §4 done) | Continue to Step 1 (5 file writes) |

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
