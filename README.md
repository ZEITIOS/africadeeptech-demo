# Wokkah · Talent Intelligence

A demo of a deep tech talent mapping and skill discovery system, built to show Africa Deep Tech Foundation how Wokkah's pool could be queried against their 2026 challenge problem statements.

## Run it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## What's in here

Five surfaces, simulated data, no backend.

### `/` · Overview
Stats (pool size, available, Operator+ tier, vertical count), a coverage breakdown across deep tech verticals, the current live cohort with progress bars, and a "recently advanced" pipeline table.

### `/discover` · The hero flow
Paste a problem statement — or pick one of five presets — and Wokkah returns ranked matches with explicit "why this match" reasoning. Filterable by tier, availability, and vertical.

**Best presets to demo live:**
- "Border surveillance drone" → surfaces Kwame Asante (Principal, Defense/Robotics)
- "Mini-grid optimization" → surfaces Adaeze Okonkwo + Tendai Mabhena
- "Sickle-cell screening" → surfaces Njeri Wambui + Rukia Hassan
- "Chip design partner" → surfaces Thulani Mokoena

### `/talent` · Full pool
Grid of all 16 profiles, filterable by tier and vertical, searchable across name/city/skill/project.

### `/talent/[id]` · Individual profile
Metrics stack, bio, assessed skills (with radar chart), wokkahthon history, shipped projects, and engagement CTA.

### `/wokkahthons` · Pipeline
Live cohort tracker with daily agent-build histogram, attrition curve, past cohorts table, and the 4-step wokkahthon process.

### `/taxonomy` · Skill graph
What Discover queries against — skills indexed per vertical with operator counts, average scores, tier composition, and representative operators per vertical.

## Design intent

Editorial-technical aesthetic — warm paper surface, ink text, rust accent, restrained type (Fraunces display + Manrope body + JetBrains mono for data). The document-like feel is deliberate: this should look like a serious operations platform, not another SaaS chatbot wrapper.

## Simulated data

- **16 talents** across 12 deep tech verticals, spread across Africa (Lagos, Accra, Nairobi, Jo'burg, Cairo, Harare, Abuja, Dakar, Dar es Salaam, Kigali, Addis Ababa, Casablanca, Enugu, Bamako, Cape Town)
- **4 cohorts** — one live (WKT-2026-Q1 · Climate & Energy), three closed
- **Matcher** — `lib/data.ts` exposes `matchTalents()` which keyword-maps query text to skills/verticals/projects and returns scored matches with reasoning. Deterministic, no LLM call needed for the demo.

Swap this to real data by replacing `lib/data.ts`.

## Stack

Next.js 14 · App Router · TypeScript · Tailwind · zero external UI deps.
