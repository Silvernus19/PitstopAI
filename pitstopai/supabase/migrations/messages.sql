-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now() not null,
  metadata jsonb null
);

-- Indexes
create index idx_messages_chat_id on public.messages(chat_id);
create index idx_messages_chat_id_created_at on public.messages(chat_id, created_at asc);

-- RLS for messages
alter table public.messages enable row level security;

create policy "Users can view messages from their own chats"
on public.messages for select
using (
  exists (
    select 1 from public.chats
    where chats.id = messages.chat_id
    and chats.user_id = auth.uid()
  )
);

create policy "Users can insert messages into their own chats"
on public.messages for insert
with check (
  exists (
    select 1 from public.chats
    where chats.id = messages.chat_id
    and chats.user_id = auth.uid()
  )
);

-- Trigger to update chats.updated_at
create or replace function public.update_chat_timestamp()
returns trigger as $$
begin
  update public.chats
  set updated_at = now()
  where id = new.chat_id;
  return new;
end;
$$ language plpgsql;

create trigger update_chat_timestamp_after_message
after insert on public.messages
for each row execute procedure public.update_chat_timestamp();
