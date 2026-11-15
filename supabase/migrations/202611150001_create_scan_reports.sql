-- Run once in Supabase SQL Editor for your new project.
create table if not exists public.scan_reports (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 company_name text,
 offer_type text not null check (offer_type in ('Job offer','Internship','Recruiter message','Other opportunity')),
 submitted_text text not null check (char_length(submitted_text) between 30 and 10000),
 risk_score integer not null check (risk_score between 0 and 100),
 risk_level text not null check (risk_level in ('Low','Medium','High')),
 explanation text not null,
 warning_signs jsonb not null default '[]'::jsonb,
 positive_signs jsonb not null default '[]'::jsonb,
 safety_recommendations jsonb not null default '[]'::jsonb,
 verification_steps jsonb not null default '[]'::jsonb,
 uncertainty_notes jsonb not null default '[]'::jsonb,
 created_at timestamptz not null default now()
);
create index if not exists scan_reports_user_created_idx on public.scan_reports(user_id,created_at desc);
alter table public.scan_reports enable row level security;
drop policy if exists "read own reports" on public.scan_reports;
create policy "read own reports" on public.scan_reports for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists "insert own reports" on public.scan_reports;
create policy "insert own reports" on public.scan_reports for insert to authenticated with check ((select auth.uid())=user_id);
grant select,insert on public.scan_reports to authenticated;
revoke all on public.scan_reports from anon;
