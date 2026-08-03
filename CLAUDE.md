# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

BrandFlow AI is an MVP SaaS platform that turns product info into ready-to-publish marketing content (Instagram, Facebook, WhatsApp, email, SEO, hashtags, AI image/video prompts) using the Claude AI API. Pilot client is a generic use case: leather footwear SMB; built for the SmartRanks AI Challenge 2026. Shopify integration is planned but not yet implemented.

The repo is a monorepo with three independent npm packages: `backend/` (Express API), `frontend/` (React + Vite, currently a placeholder shell), and `shared/` (empty stub dirs for `constants`, `types`, `utils` — no code yet).

There are no automated tests and no linter/formatter configured in either package.

## Commands

Run each package's commands from within its own directory (`backend/` or `frontend/`) — there is no root-level package.json or workspace tooling.

**Backend** (`backend/`):
```bash
npm install
npm run dev     # node --watch server.js — auto-restarts on change, port 4000
npm start       # node server.js
```

**Frontend** (`frontend/`):
```bash
npm install
npm run dev       # vite dev server, port 5173
npm run build     # vite build
npm run preview   # preview production build
```

Environment setup: copy `.env.example` to `.env` in the repo root, `backend/`, and `frontend/`. Key backend vars: `PORT`, `DATABASE_PATH`, `CLAUDE_API_KEY`, `CLAUDE_MODEL`, `CORS_ORIGIN`. Frontend needs `VITE_API_URL` (defaults to `http://localhost:4000`). The AI endpoints work without `CLAUDE_API_KEY` set but return a 503.

## Architecture

**Backend** (`backend/`, ESM/`type: module`, Node + Express):
- `server.js` — entrypoint. Loads env, runs DB migrations, then starts the Express app from `src/app.js`.
- `src/app.js` — wires middleware (cors, json) and mounts routers under `/api/companies` and `/api/ai`; also exposes `GET /health`.
- `src/config/db.js` — single sqlite3 connection plus `dbAll`/`dbGet`/`dbRun` promise wrappers used everywhere instead of raw sqlite3 callbacks. DB file path comes from `DATABASE_PATH` env var, defaulting to `backend/database/brandflow.db`.
- `src/database/migrate.js` + `src/database/migrations/*.sql` — a minimal homemade migration runner (no external migration library). It tracks applied migrations in a `migrations` table and applies any `.sql` file in the migrations dir (sorted by filename) not yet recorded. New migrations: add a new numbered `.sql` file, don't edit past ones.
- Routes → Controllers → Models layering: `src/routes/*Routes.js` define endpoints and delegate to `src/controllers/*Controller.js`, which validate input/shape HTTP responses and call `src/models/*Model.js` for DB access via the `db.js` helpers directly (no ORM).
- `src/services/claudeService.js` — thin wrapper around the raw Anthropic Messages API (`https://api.anthropic.com/v1/messages`) using `fetch` directly (no Anthropic SDK dependency). Throws errors tagged with `.code` (`MISSING_API_KEY`, `CLAUDE_API_ERROR`) that `aiController.js` maps to HTTP status codes (503 / upstream status). Default model is read from `CLAUDE_MODEL` env var.
- Note: the README's documented company endpoints (`/api/company`, singular) don't match the actual mounted path (`/api/companies`, plural, in `src/app.js`) — trust the code, not the README, for the route prefix.

**Frontend** (`frontend/`, React 18 + Vite): currently just a placeholder `App.jsx`. `src/services/api.js` provides a bare `apiRequest(path, options)` fetch helper pointed at `VITE_API_URL` for future use — no routing, state management, or component library is set up yet.

**Database**: SQLite file at `backend/database/brandflow.db` (gitignored data, tracked via `.gitkeep`). Only table so far is `companies` (see the migration SQL for the schema) — created via CRUD in `companyModel.js`/`companyController.js`/`companyRoutes.js`.
