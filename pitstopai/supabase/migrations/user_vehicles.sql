-- Create user_vehicles table
create table public.user_vehicles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nickname text null,
  make text not null,
  model text not null,
  model_year integer not null check (model_year >= 1980 and model_year <= extract(year from now()) + 1),
  engine_type text null,
  mileage_km integer null default 0,
  notes text null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS for user_vehicles
alter table public.user_vehicles enable row level security;

create policy "Users can view their own vehicles"
on public.user_vehicles for select
using (auth.uid() = user_id);

create policy "Users can insert their own vehicles"
on public.user_vehicles for insert
with check (auth.uid() = user_id);

create policy "Users can update their own vehicles"
on public.user_vehicles for update
using (auth.uid() = user_id);

create policy "Users can delete their own vehicles"
on public.user_vehicles for delete
using (auth.uid() = user_id);

-- Create chats table
create table public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  vehicle_id uuid references public.user_vehicles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS for chats
alter table public.chats enable row level security;

create policy "Users can view their own chats"
on public.chats for select
using (auth.uid() = user_id);

create policy "Users can insert their own chats"
on public.chats for insert
with check (auth.uid() = user_id);

create policy "Users can update their own chats"
on public.chats for update
using (auth.uid() = user_id);

create policy "Users can delete their own chats"
on public.chats for delete
using (auth.uid() = user_id);

-- Simple trigger function for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger set_updated_at_user_vehicles
before update on public.user_vehicles
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_chats
before update on public.chats
for each row execute procedure public.handle_updated_at();
