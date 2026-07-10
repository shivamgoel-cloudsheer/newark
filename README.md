# Newark Fire Sprinkler — Website Concepts

Redesign concepts for [newarkfiresprinkler.com](https://www.newarkfiresprinkler.com/), built as one React app that serves a **concept gallery**: open the root URL, pick a template card, and you're inside that full working website.

## The three concepts

| Route | Concept | Personality |
|---|---|---|
| `/ember` | **A — Ember** | Bold & industrial: charcoal + flame red, condensed type, hard shadows |
| `/aegis` | **B — Aegis** | Corporate trust: navy/white, license number in the header, compliance-first |
| `/pulse` | **C — Pulse** | Dark & modern: glassmorphism, orange glow, motion |

Every concept includes: Home, Services, Case Studies, Blog (+ article pages), About & Team, Contact, a floating **chat assistant**, and the **Fire Drill** interactive simulator. A concept-switcher pill (bottom-left) jumps between templates on any page.

## Features

- **Chat assistant** — 100% rule-based and client-side (no API key, nothing leaves the browser). Answers NFPA 25 / licensing / service questions and captures quote leads. Swap its `answer` logic for an API later without touching the UI.
- **Fire Drill game** (`/​<concept>/game`) — canvas fire-spread simulation. Place sprinkler heads on a budget, fire ignites and spreads (faster through furniture/stock), heads activate on heat, occupants evacuate. At the end the exact same fire is re-run with zero sprinklers for comparison. Three levels: Office, Warehouse, Restaurant.
- All company facts (permit #P01570, phone, address, services, team) come from `RESEARCH.md` and live in `src/data/content.js` — one file to edit.

## Stack

Vite · React 18 · React Router 6 · Tailwind CSS v4 (`@tailwindcss/vite`)

```bash
npm install
npm run dev      # local dev
npm run build    # production build to dist/
```

Deploys as a static SPA — `vercel.json` contains the history-fallback rewrite.

## Before launch (whichever concept wins)

- Case studies other than 301 West Side Ave are **illustrative samples** (`sample: true` in `content.js`) — replace with real projects.
- The contact form and chatbot lead capture are demo-only (no backend). Wire to email/CRM.
- Confirm the "30 years" experience framing and the canonical company address with the client (see `RESEARCH.md` §8).
