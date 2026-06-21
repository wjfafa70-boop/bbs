create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
