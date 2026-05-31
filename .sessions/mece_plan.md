# MECE Plan — T-043 CHAT_TOTAL Formula Fix
date: 2026-05-31
task: compact_size field + B1 reads it + triangular note in R1
skill: harness_editor

## Phase 0 — Boot
- [X] B1-B3 done · SESSION_TOTAL~49k · CFP_COUNT=19
→ TOKEN CHECK: SESSION_TOTAL ~49k

---

## Phase 1–3 — inline (simple 3-file fix, spec fully known)

### S1 · AGENTS.md — B1 command + PATH B compact_size
- [ ] S1 · Verify: grep "compact_size" AGENTS.md → ≥2

### S2 · CLAUDE.md R1 — triangular formula note
- [ ] S2 · Verify: grep "triangular\|compact_size" CLAUDE.md → ≥2

### S3 · mece_plan_schema.md PATH B — add compact_size field
- [ ] S3 · Verify: grep "compact_size" docs/session_templates/mece_plan_schema.md → ≥1

### S4 · Step 5 Close
- [ ] S4 · Verify: grep "Y24" knowledge/harness_flow_20260526.md → 1
