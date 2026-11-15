# JobShield AI

A multi-page Vite website for assessing possible job and internship scam warning signs.

## Pages
- `index.html` — Home
- `scan.html` — Job offer scanner
- `results.html` — Risk assessment report
- `verify.html` — Company verification checklist (not a live registry lookup)
- `history.html` — Private scan history
- `safety.html` — Safety guide
- `about.html` — About JobShield
- `account.html` — Sign in / create account

## Run locally
1. Install Node.js (LTS).
2. In Git Bash, open this project folder.
3. Run `npm install`.
4. Create `.env` from `.env.example`.
5. Put only your Supabase project URL and public anon/publishable key in `.env`.
6. Run `npm run dev` and open the local URL shown by Vite.

## Supabase and Gemini
- Keep the existing Supabase project, `scan_reports` table, RLS policies and `analyze-offer` Edge Function.
- The browser uses only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Keep `GEMINI_API_KEY` and `GEMINI_MODEL` only in Supabase Edge Function secrets.
- Do not commit `.env` or any secret key to GitHub.

## Important product limitations
- The upload control accepts PDF/JPG/PNG files and shows a local file preview. This starter version does not extract text from files yet; paste the readable offer text into the text box before scanning.
- Company review is a guided checklist. It does not query company registries, check website ownership, or confirm recruiter identity.
- A risk score is an AI estimate based only on supplied details. It is not proof that an offer is genuine or fraudulent.
- A supplied job URL is included as context only; the app does not crawl or verify the URL.

## Build
Run `npm run build`.
