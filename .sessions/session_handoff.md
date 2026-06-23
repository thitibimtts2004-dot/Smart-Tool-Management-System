skill_name: harness_editor
CFP_COUNT: 39
task: T-224 — out_of_scope design-decision rejection memory — COMPLETE · 2026-06-22

objective: add ONE file knowledge/out_of_scope.md (a design-DECISION rejection log: problem/rationale/refs/keywords per rejected idea) so settled "we decided NOT to build X" debates are not reopened. Complements CFP (bugs). Mirror T-229 glossary discipline. NO new dir/skill/script/hook (roadmap 814 fold-to-one-file).

outcome: DONE · all 3 sections [X] · all 3 Verify-N PASS (inline) · roadmap [X] T-224 · scope-creep clean · kcc no_action · no new dir/skill/script/hook.

changes:
  - knowledge/out_of_scope.md (NEW) — usage-contract header (grep-first read / append-on-reject / NEVER always-load) + 6 seed entries from roadmap 815 (a-f): heavy-postmortem-artifact · management-talk-skill · design-it-twice-build · ban-file-paths-in-briefs · always-loaded-glossary · adr-decision-records. Each: problem/rationale/refs/keywords/date.
  - .agents/skills/harness/skeptical_reviewer/SKILL.md — Step 2 (Challenge Necessity): grep out_of_scope before verdict, HIT → [already-rejected] + cite rationale → reject unless user overrides. Routing: reject verdict → append entry (only for permanent "don't build", not fixable revise).
  - AGENTS.md §Phase 2 M4.5 — one-line pointer (skeptical_reviewer also greps out_of_scope · appends on permanent reject).
  - knowledge/index_files.json — out_of_scope.md entry (description/topics/references/related via backlink_analyzer) [r8-sync-check].
  - docs/master_roadmap.md — T-224 [X] · knowledge/harness_flow_20260526.md + .sessions/reflections.md — Y-entry / reflection appended.

design: read+write home = skeptical_reviewer (the M4.5 pre-execution necessity gate), NOT scrutinize. Reason (scrutinize caught this): scrutinize reviews FINISHED artifacts (post-build + on-demand) → the "don't reopen a rejected idea" check would fire too late / might not fire at all. skeptical_reviewer runs BEFORE execution and its whole job is "is this necessary?" = correct timing.

scrutinize: Outsider+Simpler-Way → caught the scrutinize→skeptical_reviewer relocation (timing) + added keywords: per entry as a reliable grep anchor (glossary pattern). Verdict: revised plan strictly better, same diff size.

validation: S1 `grep -E '^### ' | grep -vc '<slug>'`=6 real entries · S2 `grep -ci out_of_scope skeptical_reviewer/SKILL.md`=2 (read+write) + AGENTS=2 · S3 `grep -c out_of_scope.md index_files.json`=1 · scope-creep clean (only new file out_of_scope.md, declared S1) · kcc flagged mattpocock-comparison (source doc) → no_action (reference not dup).

friction/lesson (for the spawned chip task_84980f29): backlink_analyzer.py has NO --file flag (Close-Checklist hint is stale) · backfill_knowledge_index.py only enriches EXISTING entries (won't register a new file) → registered via a safe json load/dump + backlink_analyzer (no-arg). Doc hint should be corrected.

next: pick Group-2 (T-227 git-guardrails hook) OR commit the uncommitted batch (skill bucketing · T-249/250/251 · T-230b · T-229 · T-228 · T-224). Recommend /compact first — CHAT high. NEW task → fresh Phase 1+2.
