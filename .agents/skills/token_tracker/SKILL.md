---
name: Token Tracker
description: In-memory token estimation per R1. SESSION_TOTAL read once at Boot, estimated in memory per turn, written to file only at checkpoints.
---

## Sections
```
- id: 1
  name: "Track"
  steps: ["load SESSION_TOTAL at Boot (once)", "estimate in memory each turn", "write at checkpoints only"]
```

---

# Token Tracker

## Trigger
Always-on passive skill. Activated at Boot B1 (load SESSION_TOTAL) and every turn thereafter (estimate + footer). Never explicitly called — runs as part of every response cycle per R1.

## Workflow
Always-on per-turn loop: Boot B1 load counters → each turn estimate input+output → SESSION_TOTAL += turn_tokens · CHAT_TOTAL += 1,300 + turn_tokens → checkpoint write at pause/blocked/gate → R3 threshold check → emit footer.
Full formula and threshold detail: `## Core Model (R1)` and `## Threshold Triggers (R3)` below.

## Output Contract
Every response MUST emit:
- Footer: `*(Session: ~NNNk | Chat: ~NNNk tokens)*`
- Checkpoint write to `.sessions/session_tokens.md`: `SESSION_TOTAL: <N>k`
  - Checkpoint fires at: token pause · blocked halt · completion gate
- R3 threshold check after every write

## Core Model (R1)

Two counters — both in working memory. File I/O only at checkpoints.

**Read at Boot B1 (once):** load SESSION_TOTAL from `.sessions/session_tokens.md`; load CHAT_TOTAL from `.sessions/chat_tokens.md`.

**Estimate each turn (in memory):**
```
# Step 1 — turn cost
output_tokens    = (thai_chars × 1.7) + (en_chars × 0.3)
turn_tokens      = (user_msg_chars × 0.3) + tool_result_tokens + output_tokens

# Step 2 — SESSION_TOTAL (incremental per-task cost)
SESSION_TOTAL   += turn_tokens

# Step 3 — CHAT_TOTAL (cumulative context window — never shrinks until /compact)
CHAT_TOTAL_n     = CHAT_TOTAL_{n-1} + hooks_per_turn + turn_tokens
# Boot fresh session: CHAT_TOTAL starts at system_fixed (7,300) — loaded from file
```

**Constants (measured):**
| Constant | Value | Source |
|---|---|---|
| system_fixed | 7,300 (once) | CLAUDE.md 2.6k + AGENTS.md 3.4k + skills 1.3k — loaded at session start |
| hooks_per_turn | 1,300 /turn | deferred-tools list + HARNESS REMINDER injected every turn |
| **total (turn 1)** | **8,600** | system_fixed + hooks_per_turn_1 (first turn only) |

**Char multipliers:**
| Content | Multiplier |
|---|---|
| Thai chars | × 1.7 (UTF-8 multi-byte) |
| English chars | × 0.3 (~4 chars/token) |
| Tool results | × 0.3 (same as English) |

Never use UTF-8 bytes ÷ 3 — undercounts Thai by up to 1.7×.

**Write checkpoints:**
- SESSION_TOTAL → `.sessions/session_tokens.md` at: TOKEN PAUSE · BLOCKED halt · Completion Gate
- CHAT_TOTAL → `.sessions/chat_tokens.md` at: /compact (reset→0) · session close (accumulate)

**Footer every response:** `*(Session: ~NNNk | Chat: ~NNNk tokens)*`

---

## Threshold Triggers (R3)

| SESSION_TOTAL | Action |
|---|---|
| > 60k | TOKEN PAUSE → finish current loop step → save state → ask user |
| > 90k | HALT immediately → save state → report to user |

## Refusal Contract
Skip file write (emit `[token-skip]`) if:
- Phase is not in_progress at checkpoint (phase: done → already reset by session close)
- SESSION_TOTAL = 0 and no turns have elapsed (nothing to write)

## Routing
→ Passive skill — returns to caller immediately after footer append or checkpoint write.
Never initiates tool calls outside of checkpoint writes. Does not block execution.

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task
