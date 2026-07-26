-- NitYoga — one-time Supabase setup for login / signup.
-- Run this whole file once in your project's SQL Editor
-- (Supabase dashboard → SQL Editor → New query → paste → Run).
--
-- What it does:
--   1. profiles table: one row per user (name, email, phone),
--     readable/updatable only by that user (RLS).
--   2. Trigger: every new signup automatically gets a profiles row,
--     copying the name + phone from the signup form.
--   3. bookings table: class-booking requests from the "Book a
--     Class" page. Users can create and see only their own; your
--     team updates `status` from the Supabase dashboard
--     (Table Editor) as requests are handled.
-- Login is email + password, so no lookup functions are needed.
-- Safe to re-run over an existing setup.

-- 1 ▸ profiles ------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  email      text,
  phone      text,          -- digits only, e.g. 919876543210
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
  on public.profiles for update using (auth.uid() = id);

-- 2 ▸ copy each new signup into profiles ---------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    regexp_replace(coalesce(new.raw_user_meta_data ->> 'phone', ''), '\D', '', 'g')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3 ▸ bookings ------------------------------------------------------
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  class_type     text not null,   -- Individual / Group / Corporate
  program        text not null,   -- chosen focus / asana program
  preferred_time text not null,   -- slot, e.g. "6–7 AM"
  plan           text not null,   -- "Single class" / "30-day subscription"
  start_date     date,            -- class date, or subscription start
  notes          text,
  status         text not null default 'new',  -- new → contacted → active → closed
  created_at     timestamptz not null default now()
);

-- for tables created by an earlier version of this script
alter table public.bookings add column if not exists start_date date;

alter table public.bookings enable row level security;

drop policy if exists "insert own booking" on public.bookings;
create policy "insert own booking"
  on public.bookings for insert with check (auth.uid() = user_id);

drop policy if exists "read own bookings" on public.bookings;
create policy "read own bookings"
  on public.bookings for select using (auth.uid() = user_id);

-- 4 ▸ admin role ----------------------------------------------------
-- Admins see every booking (with member details) on the site's
-- Admin page and can update booking status from there.
-- To promote a user, run (with the right email):
--   update public.profiles set is_admin = true
--   where email = 'nityogaofficial@gmail.com';

alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- security definer so RLS policies can call it without recursion
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

grant execute on function public.is_admin() to authenticated;

drop policy if exists "admin reads all profiles" on public.profiles;
create policy "admin reads all profiles"
  on public.profiles for select using (public.is_admin());

drop policy if exists "admin reads all bookings" on public.bookings;
create policy "admin reads all bookings"
  on public.bookings for select using (public.is_admin());

drop policy if exists "admin updates bookings" on public.bookings;
create policy "admin updates bookings"
  on public.bookings for update
  using (public.is_admin()) with check (public.is_admin());

-- FK bookings → profiles so the API can join member details
do $$ begin
  alter table public.bookings
    add constraint bookings_user_profile_fk
    foreign key (user_id) references public.profiles (id) on delete cascade;
exception when duplicate_object then null; end $$;

-- 5 ▸ clean up lookup functions from earlier versions --------------
drop function if exists public.email_for_phone(text);
drop function if exists public.email_for_username(text);
