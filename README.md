# Agent Harness Template

A portable AI agent system for Claude Code projects. Drop these files into any project to get structured multi-skill agent coordination.

## What's included

| File / Dir | Purpose |
|---|---|
| `CLAUDE.md` | Hard constraints R1–R13 (token budget, boot sequence, output rules) |
| `AGENTS.md` | Agent orientation — quick-reference for all AI vendors |
| `CLAUDE.th.md` | Thai-language user guide (aligned with CLAUDE.md) |
| `INVARIANTS.md` | Formal gates I1–I5 (destructive, DB, index sync, symbol check, roadmap) |
| `CODING_FAILURE_PATTERNS.md` | CFP-001–CFP-006 failure patterns to avoid |
| `.agents/skills/` | 10 skill SKILL.md files (agent, coder, editor, file_manager, identity, mece, session_manager, token_auditor, token_tracker, variable_manager) |
| `.agents/skills/registry.md` | Skill routing index |
| `.agents/skills/skill-manifest.json` | Machine-readable skill routing (v2.0) |
| `.agents/skill-patches/` | Patch workflow for incremental skill updates |

## How to use

1. Copy this branch into your project root (or use as a git subtree/submodule)
2. Customize `CLAUDE.md` thresholds for your project's token budget
3. Update `skill-manifest.json` to match your project's skill paths
4. Add project-specific rules to `INVARIANTS.md`

## Key constraints (from CLAUDE.md)

- Max 5 tool calls per turn
- Token footer required on every response
- Session limit: >60k warn, >90k HALT
- Boot sequence reads `active_thread.md` to resume in-progress work
- All AI-facing content must be English (R7)
