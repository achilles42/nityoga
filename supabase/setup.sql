-- NitYoga — one-time Supabase setup for login / signup.
-- Run this whole file once in your project's SQL Editor
-- (Supabase dashboard → SQL Editor → New query → paste → Run).
--
-- What it does:
--   1. profiles table: one row per user (name, email, phone),
--     readable/updatable only by that user (RLS).
--   2. Trigger: every new signup automatically gets a profiles row,
--     copying the phone number from the signup form.
--   3. email_for_phone(): lets the login form accept a phone number
--     by resolving it to the account's email. It only ever returns
--     an email address, nothing else.

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

-- 3 ▸ phone → email lookup (used by "login with phone") ------------
-- Matches on the last 10 digits so "+91 98765…", "098765…" and
-- "98765…" all find the same account.
create or replace function public.email_for_phone(p_phone text)
returns text
language sql stable security definer set search_path = public
as $$
  select email
  from public.profiles
  where phone <> ''
    and right(phone, 10) = right(regexp_replace(p_phone, '\D', '', 'g'), 10)
  order by created_at desc
  limit 1;
$$;

grant execute on function public.email_for_phone(text) to anon, authenticated;
