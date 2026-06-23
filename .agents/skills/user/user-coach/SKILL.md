---
name: user-coach
description: Use after completing a substantial task to quiz the user (2-3 plain-Thai questions) on what was just built or explained, record the results to knowledge/user_learning_profile.json, and adapt how heavily technical terms get glossed based on the user's tracked strengths and weaknesses. This is the learn-alongside loop the user explicitly asked for — USE, QUIZ, RECORD, ADAPT.
---

# user-coach — Learn-Alongside Loop

Every important task becomes a learning moment. Results are tracked in a JSON
profile and explanations adapt to the user's real strengths/weaknesses.
The loop: **USE → QUIZ → RECORD → ADAPT** (output feeds back to self-adjust).

## When to Invoke
- A substantial task just finished (files written, feature built, bug fixed, concept explained).
- The user asks to be quizzed, or asks how they are progressing.
- Manually: the user types `/user-coach` or says "ควิซหน่อย" / "ทดสอบหน่อย".

## When NOT to Use
- Trivial / read-only turns (a lookup, a yes/no, a one-line answer) — no quiz.
- Mid-task: never interrupt execution with a quiz. Wait for the task to close.
- The user is rushed or frustrated — offer gently, never force ("อยากลองทำควิซสั้น ๆ ไหมครับ?").

## Operating Stance
- The user is non-technical and still building English (see memory: `user-profile-non-technical`).
  Treat confusion as a failed explanation, not a slow user.
- Goal is comprehension + confidence, not grading. Celebrate progress; never shame a wrong answer.
- The profile serves the user — it is a coaching tool, not a report card.

## Prerequisites
- `scripts/learning_profile.py` exists (the engine).
- `knowledge/user_learning_profile.json` exists (the store).
- A stable kebab-case topic slug for the task just done (e.g. `harness-gates`, `json-schema`).

## Workflow — USE → QUIZ → RECORD → ADAPT

### 1. USE (every turn — automatic)
The UserPromptSubmit hook runs `analyze` and injects `[learning-state] glossing: <depth> · weak: [...]`.
Read it and adapt this turn:
- glossing **high** → gloss every technical term with Thai meaning + an everyday analogy.
- glossing **medium** → gloss only new or weak terms.
- glossing **low** → gloss sparingly.
- Any topic in `weak: [...]` → explain that area extra carefully this turn.

**Glossary reuse (T-229 · on-demand · grep-only):** before glossing a technical term, grep the store FIRST so the wording stays consistent and is never re-derived blind:
- `grep -i "^<term> " knowledge/glossary.md` → **HIT**: reuse that stored gloss verbatim (do not re-invent it).
- **MISS**: gloss it fresh this turn, then append ONE line — term lowercase · no literal `|` inside the text · analogy OPTIONAL ("-" when none helps · a forced metaphor confuses more than it helps):
  `printf '%s | %s | %s\n' "<term>" "<plain-Thai gloss>" "<analogy or ->" >> knowledge/glossary.md`
- A term currently in `weak: [...]` = re-teach candidate — gloss it extra carefully and consider a quiz item on it (ties learning_record / T-225).
- NEVER always-load this file — ONE grep per recurring term only (always-loaded context was rejected, T-226e).

### 2. QUIZ (at task close)
First calibrate difficulty from history — run `python3 scripts/learning_profile.py analyze --topic "<slug>"` and read the topic's mastery (the engine already tracks it across sessions):
- weak (mastery < 0.5) **or** never-quizzed → ask EASIER questions: recall/recognition, more multiple-choice, smaller steps, more hints.
- strong (mastery ≥ 0.8) → ask HARDER questions: apply-it / explain-why, fewer hints, fewer multiple-choice.
- in between → keep the mixed default below.
Then offer a short quiz:
- 2-3 questions on the concepts just used, in plain Thai.
- Mixed format: one multiple-choice, one true/false or fill-in-blank, one "explain in your own words".
- Anchor each question to something concrete from the task — and, when natural, ladder it toward the user's stated learning goal in the profile (memory: `user-profile-non-technical` — grow alongside Claude) so practice builds toward what they want to become, never abstract trivia.
- Wait for answers. Grade gently and explain every item, right or wrong.

### 3. RECORD (right after the quiz)
Run the engine — this is what makes the data USED, not just stored:
```
python3 scripts/learning_profile.py record --topic "<slug>" --correct <N> --total <M> --note "<what clicked / what tripped them>"
```
It recomputes mastery, status, weak/strong areas, and the next glossing depth.

### 4. ADAPT (carries to the next turn)
`record` updated the profile; the hook runs `analyze` every turn — so the next
turn's `[learning-state]` already reflects the new data. Glossing depth and focus
topics adjust automatically. No manual step.

## Output Spec
Quiz block in Thai, for example:
```
📝 ควิซสั้น ๆ (3 ข้อ) — เรื่อง <topic>
1. (เลือกตอบ) ...?   ก) ...   ข) ...   ค) ...
2. (ถูก/ผิด) ...?
3. (อธิบายสั้น ๆ ด้วยคำของคุณ) ...?
```
After the user answers: show `เฉลย + คะแนน N/M`, a one-line plain explanation per
item, then a short encouragement line — then silently run `record`.

## Refuse without required inputs (P1)
If a required input below is missing → emit `[coach-refused] reason:<X>` + name what is missing → halt (do not quiz/record against a missing store).
- Engine `scripts/learning_profile.py` missing → `[coach-refused] reason:no-engine`
- Store `knowledge/user_learning_profile.json` missing → `[coach-refused] reason:no-store`
- No stable topic slug for the task → `[coach-refused] reason:no-topic-slug` · ask for/derive one first

## Hard Rules
- NEVER skip RECORD after a quiz — storage-without-use is exactly what the user rejected.
- NEVER skip appending a newly-glossed term to `knowledge/glossary.md` (grep-first → append-on-miss) — a term explained once must be reusable verbatim next time, not re-derived (T-229).
- NEVER quiz mid-task or on a trivial turn.
- ALWAYS quiz in Thai, plain language; gloss any technical term inside the quiz itself.
- ALWAYS reuse a stable kebab-case topic slug so history accumulates per topic over time.
- Keep it short (max 3 questions) — this is reinforcement, not an exam.
