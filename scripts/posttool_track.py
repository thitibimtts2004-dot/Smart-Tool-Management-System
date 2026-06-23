#!/usr/bin/env python3
"""PostToolUse tracker (CFP-028 fix · T-177).

Fires after every tool call. Does two things atomically in session_tokens.md:
  1. LOOP_WEIGHT += tool weight   (unchanged from the prior inline hook)
  2. SESSION_TOTAL / CHAT_TOTAL += a char-based ESTIMATE of this tool call's
     token cost, so the counters stop being frozen at boot values.

Why an estimate: no hook can see the model's real API token counts. We only
see the tool's input + output text on stdin, so the number is a LOWER BOUND
(captures tool I/O, misses most of the model's own prose). Better than 0.

Fail-safe contract: on ANY bad/empty input the script exits 0 and leaves
session_tokens.md byte-for-byte unchanged. A tracker must never break a tool
call. Mirrors the atomic mkstemp+os.replace write of the prior hook.
"""
import os
import sys
import json
import subprocess
import tempfile

# --- read PostToolUse stdin JSON (tool_name / tool_input / tool_response) ---
try:
    data = json.load(sys.stdin)
except Exception:
    data = {}

root = os.environ.get('CLAUDE_PROJECT_DIR')
if not root:
    try:
        root = subprocess.check_output(
            ['git', 'rev-parse', '--show-toplevel'],
            stderr=subprocess.DEVNULL, cwd=os.getcwd()).decode().strip()
    except Exception:
        root = os.getcwd()

# tool name: prefer stdin (reliable), fall back to legacy env var
tool = data.get('tool_name') or os.environ.get('TOOL_NAME', '')

# --- subagent-context guard (CFP-041 ROOT fix · T-235) ---
# A subagent's internal tool calls ALSO fire this hook, with the SAME session_id
# and identical env as the main context (env can NOT distinguish them). But the
# PostToolUse stdin carries `agent_id`/`agent_type` ONLY for subagent calls. Their
# I/O lives in the subagent's own context window, not the main one, so accumulating
# it into the main session_tokens.md is the false-ceiling bug. Skip it entirely.
# The Agent *wrapper* call runs in the main context (no agent_id) and is still
# counted — that is correct, since its summarized result does enter main context.
if data.get('agent_id'):
    raise SystemExit(0)

# --- T-230b: auto-capture scope baseline when Phase 1 closes ---
# When gather_complete.md is (re)written, snapshot the working tree so the
# Close-time [scope-creep] gate has a task-start baseline to diff against.
# Phase 1 is read-only, so this snapshot == the true task-start tree; it
# overwrites each task (Phase 1 runs once per task) so it is never stale and
# needs no separate clear step. Fail-safe: must never break the tool call.
try:
    _fp = ((data.get('tool_input') or {}).get('file_path') or '').replace(os.sep, '/')
    if tool in ('Write', 'Edit') and _fp.endswith('.sessions/gather_complete.md'):
        _porc = subprocess.check_output(
            ['git', 'status', '--porcelain'],
            stderr=subprocess.DEVNULL, cwd=root).decode()
        with open(os.path.join(root, '.sessions', '.scope_baseline'), 'w') as _f:
            _f.write('\n'.join(sorted(_porc.splitlines())) + '\n')
except Exception:
    pass

# --- LOOP_WEIGHT increment (same weights as the prior inline hook) ---
weights = {'Agent': 3, 'Workflow': 3, 'WebFetch': 3, 'WebSearch': 3,
           'Write': 2, 'NotebookEdit': 2}
w = next((v for k, v in weights.items() if k in tool), 1)
if 'mcp__' in tool:
    w = 2

# --- token estimate from tool I/O char count (lower bound) ---
try:
    ti = data.get('tool_input')
    tr = data.get('tool_response')
    chars = 0
    resp_chars = 0
    if ti is not None:
        chars += len(ti if isinstance(ti, str) else json.dumps(ti))
    if tr is not None:
        resp_chars = len(tr if isinstance(tr, str) else json.dumps(tr))
        chars += resp_chars
except Exception:
    chars = 0
    resp_chars = 0
# provider-aware tool multiplier (reuse token_estimator — single source of truth · T-178).
# import failure or unknown provider -> generic safety floor (0.35); never breaks the hook.
tool_mult = 0.35
try:
    sys.path.insert(0, os.path.join(root, 'scripts'))
    import token_estimator as _te
    _prov = _te._load_provider_formula()  # reads detected.md token_formula
    tool_mult = _te.PROVIDER_MULTS.get(_prov, _te.PROVIDER_MULTS['generic'])['tool']
except Exception:
    tool_mult = 0.35
session_delta = round(chars * tool_mult)   # provider tool-mult · lower bound (tool I/O only)
chat_delta = session_delta                 # x1.5 dropped (T-178); true API context ~1.5-2x -> see docs note

# --- counter deltas: FILES_READ (per Read tool) · LONG_OUTPUTS (output >8000 chars) (T-221 S1) ---
files_read_delta = 1 if tool == 'Read' else 0
long_outputs_delta = 1 if resp_chars > 8000 else 0

path = os.path.join(root, '.sessions', 'session_tokens.md')
if not os.path.exists(path):
    raise SystemExit(0)
try:
    content = open(path).read()
except Exception:
    raise SystemExit(0)
lines = content.splitlines()
if not content.strip() or not any(l.startswith('LOOP_WEIGHT:') for l in lines):
    raise SystemExit(0)


def _bump(line, prefix, delta):
    try:
        cur = int(line.split(':', 1)[1].strip() or 0)
    except ValueError:
        return None
    return prefix + ' ' + str(cur + delta)


seen_files_read = False
seen_long_outputs = False
out = []
for line in lines:
    if line.startswith('LOOP_WEIGHT:'):
        nl = _bump(line, 'LOOP_WEIGHT:', w)
        if nl is None:
            raise SystemExit(0)
        out.append(nl)
    elif line.startswith('SESSION_TOTAL:'):
        nl = _bump(line, 'SESSION_TOTAL:', session_delta)
        out.append(nl if nl is not None else line)
    elif line.startswith('CHAT_TOTAL:'):
        nl = _bump(line, 'CHAT_TOTAL:', chat_delta)
        out.append(nl if nl is not None else line)
    elif line.startswith('FILES_READ:'):
        seen_files_read = True
        nl = _bump(line, 'FILES_READ:', files_read_delta)
        out.append(nl if nl is not None else line)
    elif line.startswith('LONG_OUTPUTS:'):
        seen_long_outputs = True
        nl = _bump(line, 'LONG_OUTPUTS:', long_outputs_delta)
        out.append(nl if nl is not None else line)
    else:
        out.append(line)
# never silently drop the counters (CFP-031): append if the block predates T-221
if not seen_files_read:
    out.append('FILES_READ: ' + str(files_read_delta))
if not seen_long_outputs:
    out.append('LONG_OUTPUTS: ' + str(long_outputs_delta))

data_out = chr(10).join(out) + chr(10)
folder = os.path.dirname(path)
fd, tmp = tempfile.mkstemp(dir=folder, prefix='.st_', suffix='.tmp')
try:
    f = os.fdopen(fd, 'w')
    f.write(data_out)
    f.close()
    os.replace(tmp, path)
except Exception:
    try:
        os.unlink(tmp)
    except Exception:
        pass
    raise SystemExit(0)
