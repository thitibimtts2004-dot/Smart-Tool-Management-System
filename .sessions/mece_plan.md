# MECE Plan — T-274 backlink-graph click-to-read panel
date: 2026-06-25
task: backlink-graph click-to-read panel — preview (description) + clickable backlink navigation + open-file link
skill: coder

## Phase 0 — Boot (once per session · keep [X] on resume · reset on topic switch only)
- [X] B1: compact_state.md checked · SESSION_TOTAL · CFP_COUNT stored
- [X] B2-B3: skill=coder identified · SKILL.md loaded · hashes checked
- [X] C0-C3: routing confirmed · same artifact, new task (T-273 closed → T-274 fresh Phase 1+2)

---

## Phase 1 — Info Gather
- [X] G0: task clarity gate — clear (preview + clickable backlinks + open-file)
- [X] G1: relevant code scanned (generator build_model + emitted HTML/JS)
- [X] G2: index_files.json probed in ONE call (field coverage)
- [X] G3: sections + Verify-N drafted · [✓ gather] emitted
- [X] gather_complete.md written today

### Files Read — Phase 1
| File | Why | Lines read |
|---|---|---|
| index_files.json | field coverage for panel (python probe) | grep/python only |
| build_backlink_graph.py | self-authored this session — in context | n/a |

→ TOKEN CHECK: SESSION ~25k

---

## Phase 2 — Plan
- [X] M1.5: all sections serial (same file, additive). risk: re-editing generator — Core+cooling must stay intact. irreversible: none (git checkout rollback).
       dependency_map: [S1(embed desc) → S2(panel UI uses desc) → S3(generate+verify)]
       risk_flags: [additive edit to working artifact — Core/cooling regression risk]
- [X] M2: 3 sections, Verify-N each. Tool: Edit (coder primary) · Avoid: Agent (single-file).
- [X] M3: plan + Verify-N sent to user → reviewed (skeptical_reviewer: revise → 2 fixes folded) → user confirmed
- [X] M4: roadmap [ ] T-274 added
- [X] M5: mece_plan.md written using template · [✓ MECE] emitted

→ TOKEN CHECK: SESSION ~25k
→ [mece-complete] → prompt "ลุย" before Phase 3

---

## Phase 3 — Execute

### Cycle grouping
Cycle 1 — all sequential · agents: 1 (same file, each section depends on prior) → S1 → S2 → S3

### Per-Section Invariants (apply to EVERY S<N>)
- mece_plan.md dated today + T-274 roadmap [/] REQUIRED before any file edit
- [pre-edit] before every Edit · [✓ written] grep verify after every change
- ADDITIVE ONLY: Core graph + cooling (T-273) behavior must remain unchanged
- Offline invariant: 0 network refs · idempotent output · ascii-safe embed
- L4.5 PURGE: drop Bash/grep after verdict · keep Read excerpts ≤10L

### S1 · T-274 · Embed per-node description   [Cycle 1 · serial]
Context: Add a `desc` field to each node in build_model so the panel can show "what is this file about" instantly (offline). Only new data needed; neighbors + open-file path are computed in-browser.
Skill: coder
Model: model_high
Input_From: none
File: scripts/build_backlink_graph.py
Tool: Edit
Avoid: Agent
Rollback: git checkout scripts/build_backlink_graph.py
Data_Sent: in build_model, add `"desc": (entry.get("description") or "")[:240]` to each node dict. ascii-safe via existing json.dumps(ensure_ascii=True).
Token: ~150 output
Constraints: → §Per-Section Invariants · PLUS: do not change node id/label/topic/color/wdeg fields
Verify-1: `python3 scripts/build_backlink_graph.py && python3 -c "import json,re;d=json.loads(re.search(r'graph-data\"[^>]*>(.*?)</script>',open('knowledge/diagrams/backlink-graph.html').read(),re.S).group(1));print('all_have_desc',all('desc' in n for n in d['nodes']),'nonempty',sum(1 for n in d['nodes'] if n['desc']))"` → all_have_desc True · nonempty ~94
- [X] S1

### S2 · T-274 · Click-to-read panel + navigation + open-file   [Cycle 1 · serial]
Context: Add the read panel to the emitted HTML — the core of the feature. Click node → panel; click neighbor → navigate; open-file link reads the real file. Degrades gracefully when summary missing / node is orphan.
Skill: coder
Model: model_high
Input_From: S1 (desc field)
File: scripts/build_backlink_graph.py
Tool: Edit
Avoid: Agent
Rollback: git checkout scripts/build_backlink_graph.py
Data_Sent: (a) HTML: a hidden right-side panel `<div id="detail" class="panel">` with title/path/topic/summary/neighbor-list/open-file-link/close-button. (b) CSS for #detail. (c) JS: showDetail(node) populates it — summary or "no summary — open file" fallback; neighbor list from adj.get(node) each as clickable → selectNode+recenter; open-file `<a href="../../"+id target="_blank">`. Wire into existing click handler (set selected → showDetail); × button clears. Recenter helper pans view to a node.
PRIMARY reader = the embedded `desc` panel (always works, in-app). The open-file link is a BONUS — label it honestly "open raw file ↗" with a one-line note that it opens the raw file and MAY download instead of display depending on the browser / file:// policy (sr-finding #2). Do NOT oversell it as in-page reading.
Token: ~550 output
Constraints: → §Per-Section Invariants · PLUS: panel must not block the canvas controls (pointer-events on #detail only); clicking empty space or × closes it; Core click-to-focus (dim neighbours) still works
Verify-2 (structural gate): `grep -c 'id="detail"' knowledge/diagrams/backlink-graph.html` ≥1 AND `grep -c 'href="../../' ...` present AND extract JS → `node --check` exit 0  (NOTE: structural only — real behavior is verified in S3 Verify-3f) [DONE: detail div=1, node --check exit 0, ../../ open-file prefix present=1 (href set via JS setAttribute, not static — grep `\.\./\.\.` not `href="../../`)]
- [X] S2

### S3 · T-274 · Generate, verify, index note   [Cycle 1 · serial]
Context: Regenerate + run all Verify-N + confirm no regression of T-273 invariants + light index touch.
Skill: coder
Model: model_low
Input_From: S2
File: knowledge/diagrams/backlink-graph.html (regen) + index_files.json (desc touch)
Tool: Bash
Avoid: Agent
Rollback: rm knowledge/diagrams/backlink-graph.html (regenerate from script)
Data_Sent: regenerate + all checks + emit [r8-sync-check] (no new files → regen only; update script index description to mention preview)
Token: ~250 output
Constraints: → §Per-Section Invariants
Verify-3a: `grep -cE 'https?://|src="//' knowledge/diagrams/backlink-graph.html` → 0 (offline; note ../../ relative links are NOT network refs)
Verify-3b: re-run generator twice → `diff` of outputs == empty (idempotent)
Verify-3c: embedded node count == 212 AND all nodes have desc
Verify-3d: panel present (id="detail") + open-file links use ../../ prefix (grep count >0)
Verify-3e: extracted inline JS passes `node --check`
Verify-3f (REAL behavior test — closes sr-finding #1 weak-verify): open the generated HTML in the Claude Preview browser tool → click a node with a known description → read the DOM/screenshot → confirm (1) panel #detail becomes visible, (2) it shows that node's summary, (3) the neighbor list is populated + a neighbor click re-targets the panel. If the browser tool is unavailable at run-time → FALL BACK to explicit manual check: tell the user the exact click to make + what they should see, and mark behavior as user-verified (never silently claim it works on structural grep alone).
- [X] S3

### Surgical Scope
Files this task may touch: scripts/build_backlink_graph.py · knowledge/diagrams/backlink-graph.html (regen) · knowledge/index_files.json (script desc touch). Any other changed file at close = [scope-creep].

### /compact checkpoint (optional — small task, same chat)
[S1] → [S2] → (optional /compact) → [S3]. Token budget small (~1k output); skip unless SESSION climbs.

---

## Phase 3 — Close Checklist
- [X] all S1–S3 [X] · all Verify-N pass (3a-f incl real browser test)
- [X] R8 index sync ([r8-sync-check]) · roadmap T-274 [X] · active_thread phase:done
- [X] SESSION_TOTAL hook-tracked · reflection appended
- [X] [scope-creep] clean · session_handoff written · PATH A deferred to post-compact
