-- Run this in Supabase SQL editor to create tables for Daily Tracker

-- Ensure uuid generation function is available
create extension if not exists pgcrypto;

create table if not exists public.updates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null, -- for future auth
  title text not null,
  notes text null,
  created_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid null, -- for future auth
  title text not null,
  description text null,
  remind_at timestamptz null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists idx_updates_created_at on public.updates (created_at desc);
create index if not exists idx_reminders_remind_at on public.reminders (remind_at asc);

-- Enable Row Level Security
alter table public.updates enable row level security;
alter table public.reminders enable row level security;

-- Policies:
-- 1) Authenticated users can CRUD only their own rows (user_id = auth.uid()).
-- 2) Unauthenticated users can CRUD rows where user_id is null (simple personal mode).

do $$ begin
  create policy if not exists updates_auth_crud on public.updates
    for all using (
      (auth.uid() is not null and user_id = auth.uid()) or (auth.uid() is null and user_id is null)
    ) with check (
      (auth.uid() is not null and user_id = auth.uid()) or (auth.uid() is null and user_id is null)
    );
exception when duplicate_object then null; end $$;

do $$ begin
  create policy if not exists reminders_auth_crud on public.reminders
    for all using (
      (auth.uid() is not null and user_id = auth.uid()) or (auth.uid() is null and user_id is null)
    ) with check (
      (auth.uid() is not null and user_id = auth.uid()) or (auth.uid() is null and user_id is null)
    );
exception when duplicate_object then null; end $$;

