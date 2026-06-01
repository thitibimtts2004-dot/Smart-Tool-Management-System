# MECE Plan — T-069 Implement/ Docs Upgrade (T-067+T-068 Sync)
date: 2026-06-01
task: Update all Implement/ docs to reflect LOOP_WEIGHT tracking, PostToolUse hook, C0.5 Behavior Contract gate, compact_checkpoint rule
skill: harness_editor

## Phase 0 — Boot (once per session · keep [X] on resume · reset on topic switch only)
- [X] B1: compact_state.md checked · SESSION_TOTAL=0 · CHAT_TOTAL=21459 · CFP_COUNT=22
- [X] B2-B3: skill=harness_editor · SKILL.md loaded · hashes checked
- [X] C0-C3: routing confirmed · no unresolved topic switch
→ TOKEN CHECK: SESSION_TOTAL ~10k

---

## Phase 1 — Info Gather
- [X] G1: ALL sections scanned in 1 pass (Explore agent)
- [X] G2: gap report generated — 8/10 files need update
- [X] G3: every section has file + Verify-N · [✓ gather] emitted
- [X] gather_complete.md written today

### Files Read — Phase 1
| File | Why | Lines read |
|---|---|---|
| All Implement/*.md | gap audit via Explore agent | grep only |

→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

## Phase 2 — Plan
- [X] M1.5: dependency_map + risk_flags + compact_checkpoint determined
- [X] M2: plan 1:1 with sections · Verify-N per section
- [ ] M3: plan sent to user → awaiting confirm
- [ ] M4: roadmap [ ] T-069 per section added
- [ ] M5: [✓ MECE] emitted

### M1.5 Reasoning
dependency_map:
  - S1 (03_config.md) → must precede S2+S3 (ground truth)
  - S2 (04_skills.md) + S3 (06_orchestrator.md) → parallel (different files)
  - S4 (08_checklist.md) + S5 (09_migration.md) → after S1-S3 (reference them)
  - S6 (00+01+02 reference docs) → last (lightest, reference only)

risk_flags:
  - 03_config.md: largest file · exact old_string required for every Edit
  - 04_skills.md: MECE template referenced by agents — BC format critical

compact_checkpoint:
  sections=6 → insert after S3 (ceil(6/2)=3)

---

## Phase 3 — Execute

### Sequential
[S1] → [S2 + S3 parallel] → [/compact checkpoint] → [S4] → [S5] → [S6]

---

### S1 · T-069.1 · 03_config.md — ground truth update
Skill: harness_editor
File: `Implement/03_config.md`
Tool: Edit
Rollback: `git checkout Implement/03_config.md`
Data_Sent: old_string=existing R3 table + C0.5 prose → new_string=R3+LOOP_WEIGHT rows + C0.5 full BC (Pre/Contract/Post/Enforce) + PostToolUse hook spec + compact_checkpoint rule
Token: ~300 output
Constraints:
  - grep exact old_string before every Edit
  - Behavior Contract (Pre/Contract/Post/Enforce) required for C0.5 gate
  - Never full-read >80L — grep first
Verify-1: `grep -n "LOOP_WEIGHT\|Pre:\|Contract:\|Post:\|Enforce:\|compact_checkpoint\|PostToolUse" Implement/03_config.md | head -20`
- [X] S1
→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

### S2 · T-069.2 · 04_skills.md — M1.5 compact_checkpoint + footer
Skill: harness_editor
File: `Implement/04_skills.md`
Tool: Edit
Rollback: `git checkout Implement/04_skills.md`
Data_Sent: old_string=existing M1.5 block → new_string=M1.5 + compact_checkpoint rule (formula: `sections ≥ 3 OR sections×6 > 30 → insert [/compact checkpoint] after ceil(N/2)`); old footer → new footer with Loop_W field
Token: ~150 output
Constraints:
  - compact_checkpoint rule must match AGENTS.md M1.5 exactly
  - footer format: `*(Turn: N · Loop_W: N | Session: ~NNNk | Chat: ~NNNk tokens)*`
Verify-2: `grep -n "compact_checkpoint\|Loop_W\|TURN_COUNT\|LOOP_WEIGHT" Implement/04_skills.md`
- [X] S2

### S3 · T-069.3 · 06_orchestrator.md — C0.5 gate + LOOP_WEIGHT in cycle routing
Skill: harness_editor
File: `Implement/06_orchestrator.md`
Tool: Edit
Rollback: `git checkout Implement/06_orchestrator.md`
Data_Sent: old_string=existing C0 routing block → new_string=C0→C0.5→C1 with full BC; add LOOP_WEIGHT threshold rows; add compact_checkpoint formula reference (`sections ≥ 3 OR sections×6 > 30 → ceil(N/2)`) to cycle planning notes
Token: ~200 output
Constraints:
  - C0.5 must use full Behavior Contract (Pre/Contract/Post/Enforce)
  - LOOP_WEIGHT >30/50 thresholds must match AGENTS.md exactly
Verify-3: `grep -n "C0\.5\|LOOP_WEIGHT\|compact-warn\|Pre:\|Contract:" Implement/06_orchestrator.md`
- [X] S3

→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

### /compact checkpoint
- [ ] /compact checkpoint
  Pre: `python3 -c "import re; t=open('.sessions/session_tokens.md').read(); c=int(re.search(r'CHAT_TOTAL:\s*(\d+)',t).group(1)); print(int(c*0.52))"`
  Pre: write compact_state.md (section=S3 · step=06_orchestrator-done · skill=harness_editor · compact_size=<value>)
  How: user runs `/compact` in terminal
  Post: SESSION_TOTAL=0 · LOOP_WEIGHT=0 · CHAT_TOTAL ≈ compact_size + sys_fixed
  Verify: `cat .sessions/session_tokens.md` → SESSION_TOTAL: 0 · LOOP_WEIGHT: 0
  Resume: open new chat → type: **"Resume T-069 · Skill: harness_editor · ต่อจาก S4"**

---

### S4 · T-069.4 · 08_checklist.md — T-067+T-068 verification items
Skill: harness_editor
File: `Implement/08_checklist.md`
Tool: Edit
Rollback: `git checkout Implement/08_checklist.md`
Data_Sent: append after existing token tracking checklist items → new items: LOOP_WEIGHT field · PostToolUse hook JSON · C0.5 BC format · footer Loop_W field
Token: ~150 output
Constraints:
  - Add checklist items: LOOP_WEIGHT field · PostToolUse hook JSON valid · C0.5 BC present · footer format
  - Each item must have runnable Verify command
Verify-4: `grep -n "LOOP_WEIGHT\|PostToolUse\|C0\.5\|Loop_W" Implement/08_checklist.md`
- [X] S4
→ TOKEN CHECK: `cat .sessions/session_tokens.md`

---

### S5 · T-069.5 · 09_migration.md — migration steps for T-067+T-068
Skill: harness_editor
File: `Implement/09_migration.md`
Tool: Edit
Rollback: `git checkout Implement/09_migration.md`
Data_Sent: append new migration section → steps: add LOOP_WEIGHT+TURN_COUNT to session_tokens.md · add PostToolUse hook to settings.json · compact_checkpoint awareness for existing mece_plans
Token: ~200 output
Constraints:
  - Migration steps must be runnable commands (not prose)
  - Cover: session_tokens.md new fields · PostToolUse hook · compact_checkpoint awareness
Verify-5: `grep -n "LOOP_WEIGHT\|PostToolUse\|compact_checkpoint" Implement/09_migration.md`
- [X] S5

---

### S6 · T-069.6 · Reference docs (00+01+02)
Skill: harness_editor
File: `Implement/00_index.md` · `Implement/01_overview.md` · `Implement/02_setup.md`
Tool: Edit
Rollback: `git checkout Implement/00_index.md Implement/01_overview.md Implement/02_setup.md`
Data_Sent: update session_tokens.md description lines to list all 6 fields (SESSION_TOTAL · CHAT_TOTAL · CACHE_READ · CACHE_WRITE · TURN_COUNT · LOOP_WEIGHT)
Token: ~100 output
Constraints:
  - Light touch — description/reference updates only
  - session_tokens.md schema description must list all 6 fields
Verify-6: `grep -n "LOOP_WEIGHT\|TURN_COUNT" Implement/00_index.md Implement/01_overview.md Implement/02_setup.md`
- [X] S6

---

## Phase 3 — Close Checklist
- [ ] R8 index sync
- [ ] Roadmap [X]: T-069.1–T-069.6 annotated
- [ ] Reviewer (model_low): Verify-1 → Verify-6 all PASS
- [ ] [mece-audit] emitted
- [ ] User feedback
- [ ] [session-health] emitted
- [ ] harness_editor Step 5: harness_flow Y-entry + Implement/ updates + [harness-edit-done]
- [ ] session_handoff.md written
- [ ] self_improve: CFP count check
