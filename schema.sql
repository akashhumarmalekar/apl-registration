-- Anand Premier League — Supabase schema
-- Run this in Supabase Dashboard → SQL Editor → New query → Run.
--
-- Security model: this app has no backend server — the public form writes
-- directly to this table, and the admin dashboard reads/deletes directly
-- too, gated only by the client-side VITE_ADMIN_PASSWORD prompt in the app.
-- That password check happens in the browser, not in these policies, so
-- anyone with your Supabase URL + anon key technically has read/delete
-- access at the database level. This is an accepted trade-off for a simple
-- single-event tool. If you need stronger guarantees, add Supabase Auth and
-- replace the `using (true)` policies below with `using (auth.role() = 'authenticated')`.

create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(trim(first_name)) > 0),
  last_name text not null check (char_length(trim(last_name)) > 0),
  attribute text not null check (attribute in ('Bhagat', 'Bowler', 'Batsman', 'All Rounder')),
  contact_number text not null unique check (contact_number ~ '^[0-9]{10}$'),
  registered_at timestamptz not null default now()
);

create index if not exists registrations_registered_at_idx
  on public.registrations (registered_at desc);

-- Row Level Security
alter table public.registrations enable row level security;

create policy "Public can register" on public.registrations
  for insert
  to anon
  with check (true);

create policy "Public can read registrations" on public.registrations
  for select
  to anon
  using (true);

create policy "Public can delete registrations" on public.registrations
  for delete
  to anon
  using (true);

-- Enable Realtime so the admin dashboard updates live as players register.
alter publication supabase_realtime add table public.registrations;
