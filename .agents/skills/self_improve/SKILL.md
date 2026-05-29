# Self-Improvement Skill

## Trigger
- **Automatic:** session_manager §3 Step 0 calls this at every session close
- **Manual:** user says "review CFP" / "improve harness" / "ดู pattern" / "พัฒนา harness" / "ปัญหาซ้ำ"
- **Condition:** full analysis only if ≥1 new CFP logged this session OR user explicitly requests

## Refusal Contract
Halt and emit:
- `[cfp-skip]` — no new CFPs this session AND user did not explicitly request → STOP after §1
- `[blocked-self-edit]` — proposal targets `self_improve/SKILL.md` → present change as code block to user, ask to apply manually (V20 — circular dependency)
- `[blocked-invariant]` — proposed change conflicts with INVARIANTS.md → halt · ask user confirm/revise

## Workflow
Sequential (4 steps — each gates the next):
1. **CFP Tally** — count new CFPs this session vs cfp_boot_count → [cfp-skip] if 0 new + not requested
2. **Pattern Analysis** — rank by frequency · identify root cause of top CFP
3. **Proposal** — draft minimal harness change → HALT for user approval · deferred ≥3× → escalate to harness_doctor
4. **Execution** — apply approved change via harness_editor · emit [✓ harness-updated] · log SI-N entry

## Sections
1. CFP Tally — count new entries this session
2. Pattern Analysis — rank by frequency, find root cause
3. Proposal — one concrete harness change to prevent top pattern
4. Execution — apply approved change to harness files

---

## Section 1 — CFP Tally

```
Step 1: grep -c "^## CFP-" CODING_FAILURE_PATTERNS.md → current_count
Step 2: compare with cfp_boot_count (from Boot B1 working memory)
         missing? → grep from session_handoff.md · still missing → use 0 + [cfp-tally] note: "baseline approximate"
         new_cfps = current_count - cfp_boot_count
Step 3: new_cfps = 0 AND not requested → emit [cfp-skip] · STOP
         new_cfps ≥ 1 OR user asked → emit [cfp-tally] New: <N> · Total: <current_count> → §2
```
Archive gate: fires when current_count > 20 → see `@.agents/skills/self_improve/SKILL_detail.md §Archive`

---

## Section 2 — Pattern Analysis

```
Step 1: grep "^## CFP-" CODING_FAILURE_PATTERNS.md → extract titles
Step 2: grep -cE "recurrence of CFP-[0-9]+" per CFP-N → frequency table
Step 3: Priority queue:
         P1 — current session (CFP-N where N > cfp_boot_count) → always first · multiple: lowest N
         P2 — historical (N ≤ cfp_boot_count) by recurrence count · only if P1 empty
         Emit [cfp-analysis] showing BOTH layers
Step 4: [pre-read] top pattern: grep -n "^## CFP-<N>" → Read offset=L limit=30
Step 5: Emit [cfp-analysis] · New this session · Top pattern · Root cause · Other patterns
```
Session context lookup (Step 4.5) + full priority queue rules → `SKILL_detail.md §S2`

---

## Section 3 — Proposal

```
Step 1: map root cause → specific rule/file/section to change
Step 2: propose ONE minimal change (no redesigns)
Step 2.5: dry-run validation — would this have caught the original violation?
          YES → Step 3 · NO → revise × 2 → [proposal-mismatch] → ask user
Step 3: present to user (Thai format)
Step 4: WAIT for explicit confirm before §4
         "ทำเลย" / "proceed" / "yes" → §4
         "skip" / "ไว้ก่อน" → [cfp-deferred] · end skill
         silence → write pending_proposal to session_handoff.md → [cfp-pending]
         On defer: write cfp_deferred: { "CFP-<N>": <count+1> } to session_handoff.md
```
Escalation rule (deferred ≥3) + dry-run examples → `SKILL_detail.md §S3`

---

## Section 4 — Execution

```
Step 0: cooldown gate — last_self_improve_session ≤ 2 sessions ago AND not explicit request
         → [cfp-cooldown] Skip · end skill
         Exception: recurrence ≥ 5 OR user typed "improve harness" → bypass
Step 0.5: INVARIANTS.md conflict check — grep key terms · conflict → [blocked-invariant]
Step 0.6: backup target file: cp <file> <file>.bak_$(date +%Y%m%d_%H%M)
Step 1: apply change · R5 pre-edit gate before every Edit
Step 2: grep verify → emit [✓ harness-updated] · not found → retry once → [blocked]
Step 3: if routing keywords changed → update skill-manifest.json keywords[]
Step 4: confirm to user (✅ Harness อัปเดต · file · change · CFP-N prevention)
```
Step 5 (patch table) + Step 6 (SI audit log) → `SKILL_detail.md §S4`

---

## §4 Invariants

- MUST NOT edit `self_improve/SKILL.md` directly → `[blocked-self-edit]` (V20 — circular dependency)
- MUST NOT edit `INVARIANTS.md` gates without separate R14 `[gate]` confirmation
- MUST NOT remove or reorder existing rules — only append or extend

## Boot Integration

At Boot B1, capture: `cfp_boot_count=$(grep -c "^## CFP-" CODING_FAILURE_PATTERNS.md 2>/dev/null || echo 0)`
Store in working memory — used in §1 Step 2 comparison.

## Output Contract

| Section | Required emit |
|---|---|
| §1 pass | `[cfp-tally] New: <N> · Total: <N>` |
| §1 skip | `[cfp-skip] No new CFPs this session` |
| §2 | `[cfp-analysis] · New · Top · Root cause · Session context · Other` |
| §3 deferred | `[cfp-deferred]` or `[cfp-pending]` (silence case) |
| §4 skip | `[cfp-cooldown] Skip — §4 ran recently` |
| §4 done | `[✓ harness-updated]` + SI-N entry in `.sessions/self_improve_log.md` |
| §4 blocked | `[blocked]` + halt |

## Routing
After §4 (Execution) completes: → return to session_manager §3 Step 1 (continue close flow)
After §4 skipped: emit `[cfp-deferred]` → return to session_manager §3 Step 1
After user rejects proposal: log `[cfp-deferred CFP-N]` → return to session_manager §3 Step 1
After §3 proposal deferred ≥ 3 times for same CFP-N → escalate to `harness_doctor` (structural fix needed — do not loop self_improve again)
Never stay active after returning — session_manager owns the close sequence.

## Invariants

- Never propose changes that contradict INVARIANTS.md
- Never delete existing CFP entries — only add
- Proposals must be minimal and specific — one rule change per session
- If user rejects: log `[cfp-deferred CFP-N]` in session_handoff.md for next session

## Context Gate
If during this task a new hard constraint was discovered → add to INVARIANTS.md §I2 before closing task

## MECE Constraints Block (copy into mece_plan.md for sections using `self_improve`)
- self_improve runs ONCE per session close (§1 tally → §2 pattern → §3 propose → §4 execute)
- `[cfp-skip]` if no new CFPs this session AND no explicit request → STOP at §1
- §4 MUST NOT edit `self_improve/SKILL.md` → `[blocked-self-edit]` (V20 — circular dependency)
- Escalation: §3 deferred_count ≥ 3 for same CFP-N → invoke `harness_doctor` for structural fix
- `[cfp-tally]` at §1 · `[cfp-analysis]` at §2 · `[✓ harness-updated]` at §4 — all required
