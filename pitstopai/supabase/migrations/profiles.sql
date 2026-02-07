-- 1. Create table public.profiles
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade primary key,
  username text not null unique check (char_length(username) >= 3 and char_length(username) <= 30),
  email text unique,
  full_name text,
  avatar_url text,
  phone_number text,
  preferred_language text default 'en',
  role text default 'user' check (role in ('user', 'moderator', 'admin')),
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. Create RLS Policies
-- Policy: Users can only SELECT their own row
create policy "Users can view own profile" 
on public.profiles for select 
using (auth.uid() = id);

-- Policy: Users can only INSERT their own row
create policy "Users can insert own profile" 
on public.profiles for insert 
with check (auth.uid() = id);

-- Policy: Users can only UPDATE their own row
create policy "Users can update own profile" 
on public.profiles for update 
using (auth.uid() = id);

-- 4. Create Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, username)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'username'
  );
  return new;
end;
$$ language plpgsql security definer;

-- 5. Create Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. Create Function to auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 7. Create Trigger for updated_at
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
