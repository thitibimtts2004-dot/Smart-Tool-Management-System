date: 2026-06-29
objective: Establish the initial file structure and project configuration for a Next.js App Router (TypeScript) application integrated with the Firebase SDK (Firestore) and structured with Vanilla CSS for the Smart Tool Management System.
constraints:
  - Do not modify or overwrite harness files in root or .agents/ or .sessions/.
  - Must use Vanilla CSS for styling (sleek dark mode, custom fonts, glassmorphism) instead of Tailwind CSS.
  - Must write all application files under src/.
  - Do not touch existing harness python scripts or metadata.
affected_files:
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/globals.css
  - src/lib/firebase/config.ts
  - src/lib/firebase/firestore.ts
  - src/components/
  - src/hooks/
  - src/types/
  - package.json
  - tsconfig.json
  - next.config.ts
  - firestore.rules
  - firebase.json
out_of_scope:
  - .agents/* (except detected.md which was already configured)
  - .sessions/* (except standard session tracking files)
  - scripts/*
  - CODING_FAILURE_PATTERNS.md
  - INVARIANTS.md
acceptance_criteria:
  - Next.js App Router project successfully bootstrapped and builds cleanly.
  - Tailwind CSS configuration is omitted or fully removed, with Vanilla CSS setup.
  - Firebase SDK config is initialized with correct environment variable bindings.
  - Firestore database service wrapper is set up for core models: tools, borrow transactions, members, maintenance logs.
  - Directory structure matches clean separation of concerns: App Router, Components (UI/Layout), Hooks, Types, Libs (Firebase).
verification_intent:
  - Run npm run build to verify TypeScript compilation and Next.js build.
  - Run repo_map_check.py --sync and symbol_indexer.py to ensure harness indexes are updated.
