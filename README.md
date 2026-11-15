# JobShield AI

Vite + JavaScript frontend, Supabase Auth/Postgres/RLS, Supabase Edge Function and Gemini API.

## Setup
1. Install Node.js LTS and Git.
2. Run `npm install`.
3. Create a new Supabase project.
4. Run `supabase/migrations/202611150001_create_scan_reports.sql` in Supabase SQL Editor.
5. Copy `.env.example` to `.env`; fill in Supabase project URL and public anon/publishable key.
6. Run `npm run dev`.
7. Add `GEMINI_API_KEY` as an Edge Function secret in Supabase. Optional: set `GEMINI_MODEL` to a model enabled for your API project.
8. Install Supabase CLI, run `supabase login`, `supabase link --project-ref YOUR_PROJECT_REF`, then `supabase functions deploy analyze-offer`.
9. Run `npm run build` to check production build.

Never put Gemini API keys, Supabase secret keys or service-role keys in frontend files or GitHub. The browser Supabase key is public and must be protected by RLS. AI assessments are not proof of fraud or legitimacy. The app does not independently verify URLs or companies.
