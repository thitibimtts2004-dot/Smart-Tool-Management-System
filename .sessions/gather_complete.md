# Gather Complete — Install + adapt Harness into Money_Assistance
dt: 2026-06-15
task: Install the full Harness Agent framework into /Volumes/BriteBrain/Projects/Money_Assistance (currently EMPTY · 0 files · not a git repo) and ADAPT it to that project (per user: "ปรับให้เข้ากับโปรเจกต์นั้น"). Follow the harness's own documented install (Implement.md Track A + Implement/02_setup.md §7) but COPY the LIVE framework files (current evolved version) rather than regenerating stale templates.
skill: file_manager (copy/scaffold) · mece (plan) · session_manager (bootstrap state)

## key findings (grounded by probe + Explore agent, 2026-06-15)
- Money_Assistance = 0 files, NOT a git repo → pure Track A (fresh project)
- Harness has a documented self-install: Implement.md (Track A/B/C, Phase 0-5) + Implement/02_setup.md §7 (8-step onboarding) + §11 (.gitignore pattern)
- LIVE harness > doc baseline: ~22 skills on disk (doc says 10) · all helper scripts exist (bootstrap_sessions.py, session_compactor.py, symbol_indexer.py verified present) → copy live files, do NOT regenerate from Implement templates
- detected.md (provider/model tiers) + domain pack are the two INTERACTIVE config points (Step 4b + 4d) — need user input

## file classification (what to copy vs reset vs skip)
- COPY AS-IS (framework engine): CLAUDE.md · AGENTS.md · CLAUDE.th.md · INVARIANTS.md · README.md · VERSION · Implement.md · Implement/ (20 files) · .agents/skills/ (22) · .agents/platform/ · scripts/ (58) · docs/session_templates/ (11) · CODING_FAILURE_PATTERNS.md (harness-behavior lessons = reusable)
- RESET to blank template (project-specific state): .sessions/ (via bootstrap_sessions.py) · knowledge/index_files.json={"files":{}} · index_variables.json={"variables":{}} · error_index.md=empty · index_cfp_fix.json=keyed from CFP IDs · docs/master_roadmap.md=blank · REPO_MAP.md=blank/regen
- SKIP ENTIRELY (Harness-Agent-project-specific content): knowledge/*.md research/audit/flow docs · knowledge/recipes/ · knowledge/research/ · .sessions/session_*.json · .sessions/cycle_*/audit logs
- CREATE NEW (adapt to MA): domain/<name>.md from _TEMPLATE.md (project type TBD from user)

## constraints
- TARGET = Money_Assistance only. Do NOT modify Harness Agent src/ or push either repo.
- Batch copy >5 files → R14 destructive [gate] + explicit user confirm BEFORE bulk copy.
- detected.md model tiers + domain pack MUST be filled WITH the user (never silent default) — Step 4b/4d.
- Phase 4 verify is mandatory: session_compactor.py --verbose → STATUS: OK + 08_checklist.md 22 checks.

## affected_files (all under /Volumes/BriteBrain/Projects/Money_Assistance/)
- new: CLAUDE.md, AGENTS.md, INVARIANTS.md, README.md, VERSION, Implement.md, Implement/*, .agents/**, scripts/*, docs/**, knowledge/* (reset), .sessions/* (bootstrap), domain/<name>.md, .claude/settings.json, .gitignore, .git/

## acceptance_criteria
- All framework files present in MA (08_checklist.md: target ~22/22 checks pass)
- .sessions/ bootstrapped · knowledge indexes blank-initialized · roadmap/REPO_MAP blank
- detected.md filled (provider + 3 model tiers, user-confirmed)
- exactly ONE domain pack active:true, adapted to MA project type (user-confirmed)
- .claude/settings.json hooks wired (SessionStart/UserPromptSubmit/PreToolUse/PostToolUse/Stop)
- git initialized + harness .gitignore written
- python3 scripts/session_compactor.py --verbose → STATUS: OK

[✓ gather]
