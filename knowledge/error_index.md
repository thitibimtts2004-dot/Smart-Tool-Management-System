# Error Index

## Schema
Each entry follows: ERR-XXX → Topic → Problem → Occurrences → Fix
Fields:
  topic:       <topic id from error_topics.md>
  severity:    critical | moderate | trivial
               critical = silent data loss / runtime crash / silent fail with no error thrown
               moderate = build error / type error / visible failure with traceable root cause
               trivial  = formatting / typo / cosmetic — qualifies for lightweight fix path
  problem:     <one-line description of the bug>
  trigger:     <what code pattern causes it>
  fix:         <what to do instead>
  it_work:     true|false  (confirmed fix works in production)
  occurrences: list of T-ID attempts where this error appeared
  failed_approaches: list of approaches that did NOT work

## Decision Table — when to write an ERR-N entry

| Situation | Action |
|---|---|
| Runtime crash / silent data loss / confirmed recurring bug | Write full ERR-N entry (all fields) |
| Build error / type error fixed after ≥2 attempts | Write full ERR-N entry |
| Build error fixed on first attempt, unlikely to recur | Lightweight annotation: one-line inline comment in file only |
| Formatting / typo / syntax fix meeting all 4 lightweight criteria | Skip — no entry needed |
| Bug seen before (same trigger pattern) | grep error_index.md first → add to existing `occurrences:` list |

Agent decides which row applies — this is a judgment table, not a gate.

## Lightweight Annotation Format (use instead of full ERR-N when decision table says so)
Inline comment in the changed file only:
  # fix: <short description> · <date> · no ERR-N (first-attempt, low-recurrence risk)

---

## ERR-007
topic: database-d1
severity: critical
problem: Multi-row INSERT or onConflictDoNothing() silently fails in Miniflare D1 (local)
trigger: Drizzle `db.insert(table).values([...multiple rows...])` or `.onConflictDoNothing()`
fix: Use SELECT first → filter existing → single-row INSERT per new record. Never batch INSERT in D1 local.
it_work: true
occurrences:
  - T-ID: unknown (pre-index) · context: Miniflare local dev · confirmed silent fail
failed_approaches:
  - Multi-row INSERT with onConflictDoNothing() — silently drops all rows without error
