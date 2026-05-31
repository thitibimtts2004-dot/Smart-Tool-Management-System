# Token Optimization Benchmark — T-042
date: 2026-05-31
tool: scripts/safe_run.py (THRESHOLD=40 · CHUNK_SIZE=25)

## Test Results

### Test A — Long sequential output (seq 1 100)
| | Lines | Est. tokens (×0.3 chars/line ×20ch) |
|---|---|---|
| Before (raw) | 100 | ~600 |
| After (safe_run) | 27 | ~162 |
| **Saved** | **73 lines** | **~438 tokens (73%)** |

Behaviour: no signal lines → chunk 25 non-signal + "[+75 more]"

---

### Test B — Git non-monotonic error storm (simulated T-041)
| | Lines | Est. tokens |
|---|---|---|
| Before (raw) | 82 | ~1,640 |
| After (safe_run) | 2 | ~40 |
| **Saved** | **80 lines** | **~1,600 tokens (97.5%)** |

Behaviour: 80 "non-monotonic" lines removed by NOISE_RE · only real output preserved:
```
To https://github.com/user/repo.git
   32bd588..c65d035  main -> main
```

---

### Test C — backlink_analyzer (7 lines)
| | Lines |
|---|---|
| Before (raw) | 7 |
| After (safe_run) | 7 |
| **Saved** | **0 (pass-through — ≤THRESHOLD)** |

Behaviour: short output → pass-through unchanged ✅ (no false truncation)

---

## Real-world Projection (T-041-equivalent task)

T-041 had 2 git operations (commit + push) with ~200 total non-monotonic lines:

| Source | Before | After safe_run | Saved |
|---|---|---|---|
| git commit (100 lines) | ~2,000 tok | ~40 tok | ~1,960 |
| git push (100 lines) | ~2,000 tok | ~40 tok | ~1,960 |
| long script outputs (~50 lines avg × 3) | ~900 tok | ~450 tok | ~450 |
| **Total** | **~4,900 tok** | **~530 tok** | **~4,370 tok** |

Combined with other optimizations:
| Optimization | Est. saving/session |
|---|---|
| safe_run.py (bash filter) | ~4-5k tokens |
| Reviewer inline (≤3 Verify-N) | ~8-11k tokens |
| Compact at 30k (multi-section) | ~10-15k tokens |
| **Total** | **~22-31k tokens** |

**T-041 equivalent: 48k → ~17-26k ≈ 45-65% reduction**

---

## Notes
- NOISE_RE removes known-noisy patterns unconditionally (non-monotonic, Cloning into, etc.)
- SIGNAL_RE preserves all error/warn/fail/exception lines — never truncated
- Test B demonstrates the primary use case: git operations with macOS pack index warnings
- safe_run.py exit code = original command exit code (callers can check $?)
