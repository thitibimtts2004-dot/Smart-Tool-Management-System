# MECE Plan — T-072 Cross-Platform Hooks + Dynamic Project Root
date: 2026-06-02
task: Fix hooks — dynamic ROOT + cross-platform commands + PreToolUse block all Edit/Write
skill: harness_editor

## Phase 0 — Boot
- [X] B1: compact_state checked · SESSION_TOTAL=0 · CHAT_TOTAL=27641 · CFP_COUNT=26
- [X] B2-B3: skill=harness_editor · hashes checked
- [X] C0-C0.5-C1-C3: routing confirmed
→ TOKEN CHECK: ~27k

---

## Phase 1 — Info Gather
- [X] G1: scoped — settings.json (3 hooks) · Implement/03_config.md (template line 419) · roadmap
- [X] G2: grep — all 3 hooks hardcode `/Volumes/...` · sed -i'' at 03_config:419 · no sha1sum in scripts
- [X] G3: critical — ROOT dynamic + sed→python3 + PreToolUse add (block all except .sessions/)
→ [✓ gather]

## Phase 2 — MECE Plan
- [X] Dependency: settings.json (S2) before 03_config template (S3)
- [X] Risk: CLAUDE_PROJECT_DIR unverified → git fallback primary · sed -i'' macOS-only → python3
- [X] User confirmed: PreToolUse blocks ALL Edit/Write except .sessions/
→ [✓ MECE]

## Files Read
| File | Why | Lines |
|---|---|---|
| .claude/settings.json | 3 hooks to rewrite | full 40L |
| Implement/03_config.md | hook template line 419 | grep |
| docs/master_roadmap.md | T-ID check | grep |

---

## Phase 3 — Execution

### dependency_map
S1 (ROOT pattern) → feeds S2 + S3 · S2 must finish before S3

### risk_flags
- CLAUDE_PROJECT_DIR: unverified → git rev-parse as primary fallback
- sed -i '': macOS-only → replace all with python3 one-liner
- PreToolUse exception: .sessions/ path must be exact pattern

### compact_checkpoint
3 sections → check after S2

---

- [X] S1 — Define canonical ROOT pattern + verify
  Steps: test git rev-parse · define ROOT line · define python3 LOOP_WEIGHT updater
  Verify-1: `bash -c 'ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd); echo $ROOT'` → project path
  Rollback: none (read-only)
  Token: ~2k

- [X] S2 — Rewrite `.claude/settings.json`
  Steps: UserPromptSubmit ROOT · PostToolUse ROOT+python3 · Stop ROOT · add PreToolUse hook
  Verify-2: `python3 -m json.tool .claude/settings.json >/dev/null` → valid · `grep -c "Volumes\|sed -i ''" .claude/settings.json` → 0 · `python3 -m json.tool .claude/settings.json | grep -c "PreToolUse"` → ≥1
  Rollback: git checkout .claude/settings.json
  Token: ~5k

→ COMPACT CHECKPOINT after S2

- [X] S3 — Update hook template in `Implement/03_config.md`
  Steps: line 419 → ROOT+python3 · add Cross-Platform Notes block · add PreToolUse template
  Verify-3: `grep -c "sed -i ''\|/Volumes" Implement/03_config.md` → 0 · `grep -c "PreToolUse\|gather_complete" Implement/03_config.md` → ≥2
  Rollback: git checkout Implement/03_config.md
  Token: ~4k

---

## Phase 3 Close Checklist
- [ ] All Verify-N pass
- [ ] R8: no new files → index_files.json no change needed
- [ ] Roadmap T-072.1–T-072.3 [X]
- [ ] active_thread phase:done
- [ ] SESSION_TOTAL written
- [ ] Reviewer inline (Verify-N=3, no src/)
- [ ] Feedback to user
