-- ============================================================
-- PureLife – Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. PROFILES (extends auth.users)
create table if not exists public.profiles (
  id                  uuid references auth.users on delete cascade primary key,
  name                text,
  phone               text,
  first_discount_used boolean default false,
  created_at          timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile row on sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    new.raw_user_meta_data->>'name'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. PRODUCTS
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  sku          text unique not null,
  name_en      text not null,
  name_he      text not null,
  name_ar      text not null,
  desc_en      text,
  desc_he      text,
  desc_ar      text,
  price_usd    numeric(10,2) not null,
  image_url    text,
  is_active    boolean default true,
  created_at   timestamptz default now()
);

alter table public.products enable row level security;

-- Anyone can read active products
create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

-- Seed initial products
insert into public.products (sku, name_en, name_he, name_ar, price_usd, image_url)
values
  ('BYNG',   'B-YNG',   'B-YNG',   'B-YNG',   84, '/products/byng-card.jpg'),
  ('XGRN',   'X-GRN',   'X-GRN',   'X-GRN',   84, '/products/xgrn-card.jpg'),
  ('INDIGO', 'INDIGO',  'INDIGO',  'INDIGO',   79, '/products/indigo-card.jpg')
on conflict (sku) do nothing;


-- 3. ORDERS
create table if not exists public.orders (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid references auth.users on delete set null,
  customer_name          text not null,
  customer_email         text not null,
  customer_phone         text,
  customer_address       text,
  items                  jsonb not null,
  subtotal               numeric(10,2) not null,
  discount_amount        numeric(10,2) default 0,
  promo_code             text,
  promo_amount           numeric(10,2) default 0,
  total_ils              numeric(10,2) not null,
  tranzila_transaction   text,
  status                 text default 'pending'
                         check (status in ('pending','paid','shipped','delivered','cancelled')),
  created_at             timestamptz default now()
);

alter table public.orders enable row level security;

-- Logged-in users can view their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Service role (API) can insert + update orders (bypasses RLS)
-- No extra policy needed — service role key bypasses RLS automatically


-- 4. ADMIN TABLE (optional — for future admin role check)
-- We use Supabase custom claims or a simple is_admin column
alter table public.profiles add column if not exists is_admin boolean default false;
