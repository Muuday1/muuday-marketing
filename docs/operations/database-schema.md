# Database Schema — Marketing Machine

> All tables use `marketing_` prefix to avoid collisions with the main app.
> Same Supabase instance, separate namespace.

---

## Tables

### marketing_content_pieces

Core content inventory. Every piece of content lives here.

```sql
create table marketing_content_pieces (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('carousel', 'reel', 'story', 'blog', 'podcast', 'newsletter')),
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'scheduled', 'published', 'archived')),
  title text not null,
  content text not null default '',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  author_id text not null default 'system',
  reviewer_id text,
  brand_voice_score numeric(3,1) check (brand_voice_score >= 0 and brand_voice_score <= 10),
  cultural_check_passed boolean default false,
  ai_cost_usd numeric(10,4) default 0,
  ai_provider text,
  ai_model text
);

create index idx_content_status on marketing_content_pieces(status);
create index idx_content_type on marketing_content_pieces(type);
create index idx_content_created on marketing_content_pieces(created_at desc);
```

### marketing_content_metadata (inline JSONB structure)

Stored in `metadata` column of `marketing_content_pieces`:

```json
{
  "platform": "instagram",
  "pillar": "culture",
  "hashtags": ["#BrasilGlobal", "#VidaNoExterior"],
  "mentions": [],
  "scheduledFor": "2026-06-10T14:00:00Z",
  "mediaUrls": ["https://cdn.../image1.png"],
  "caption": "...",
  "altText": "...",
  "seoTitle": "...",
  "seoDescription": "...",
  "canonicalUrl": "https://brasilglobal.com/blog/..."
}
```

### marketing_social_posts

Published or scheduled social media posts.

```sql
create table marketing_social_posts (
  id uuid primary key default gen_random_uuid(),
  content_piece_id uuid references marketing_content_pieces(id) on delete set null,
  platform text not null check (platform in ('instagram', 'tiktok', 'linkedin', 'twitter', 'youtube')),
  external_post_id text,
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'publishing', 'published', 'failed')),
  scheduled_for timestamptz,
  published_at timestamptz,
  engagement jsonb default '{}',
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_social_platform on marketing_social_posts(platform);
create index idx_social_status on marketing_social_posts(status);
create index idx_social_scheduled on marketing_social_posts(scheduled_for);
```

### marketing_meta_campaigns

Meta Ads campaign tracking.

```sql
create table marketing_meta_campaigns (
  id text primary key,
  name text not null,
  objective text not null check (objective in ('AWARENESS', 'TRAFFIC', 'ENGAGEMENT', 'LEADS', 'SALES')),
  status text not null check (status in ('ACTIVE', 'PAUSED', 'ARCHIVED')),
  daily_budget numeric(10,2) default 0,
  spend numeric(10,2) default 0,
  impressions bigint default 0,
  clicks bigint default 0,
  conversions bigint default 0,
  ctr numeric(5,4) default 0,
  cpc numeric(10,4) default 0,
  cpm numeric(10,4) default 0,
  roas numeric(5,2) default 0,
  start_date date not null,
  end_date date,
  synced_at timestamptz not null default now()
);

create index idx_meta_status on marketing_meta_campaigns(status);
```

### marketing_community_members

Community and ambassador program.

```sql
create table marketing_community_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  country text not null,
  city text not null,
  join_date date not null default current_date,
  interests text[] default '{}',
  engagement_score numeric(5,2) default 0,
  is_ambassador boolean default false,
  referral_count integer default 0,
  social_handles jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_member_ambassador on marketing_community_members(is_ambassador);
create index idx_member_country on marketing_community_members(country);
```

### marketing_analytics_events

Event tracking for custom analytics (supplements Mixpanel).

```sql
create table marketing_analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  event_properties jsonb not null default '{}',
  user_id text,
  session_id text,
  platform text,
  timestamp timestamptz not null default now()
);

create index idx_event_name on marketing_analytics_events(event_name);
create index idx_event_timestamp on marketing_analytics_events(timestamp desc);
create index idx_event_user on marketing_analytics_events(user_id);
```

### marketing_cost_log

Track every AI/API call cost for budget monitoring.

```sql
create table marketing_cost_log (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  model text not null,
  operation text not null,
  cost_usd numeric(10,6) not null,
  tokens_input integer,
  tokens_output integer,
  content_piece_id uuid references marketing_content_pieces(id) on delete set null,
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

create index idx_cost_provider on marketing_cost_log(provider);
create index idx_cost_created on marketing_cost_log(created_at desc);
```

### marketing_templates

Programmatic template registry (Satori/React → SVG → PNG).

```sql
create table marketing_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null check (category in ('carousel', 'reel_cover', 'story', 'blog_header', 'podcast_cover', 'newsletter_header')),
  component_path text not null,
  config_schema jsonb not null default '{}',
  preview_url text,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### marketing_leads

Lead capture from landing pages, forms, campaigns.

```sql
create table marketing_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  country text,
  city text,
  source text not null default 'organic',
  campaign_id text,
  tags text[] default '{}',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'archived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_lead_status on marketing_leads(status);
create index idx_lead_source on marketing_leads(source);
create index idx_lead_email on marketing_leads(email);
```

---

## Row Level Security (RLS)

Enable RLS on all tables. Policies:

```sql
-- marketing_content_pieces: public can read published, authenticated can read all, service role can write
alter table marketing_content_pieces enable row level security;

create policy "Public can read published content"
  on marketing_content_pieces for select
  using (status = 'published');

create policy "Authenticated users can read all content"
  on marketing_content_pieces for select
  to authenticated
  using (true);

create policy "Service role can manage content"
  on marketing_content_pieces for all
  to service_role
  using (true);
```

---

## Migrations

Use Supabase CLI for migrations:

```bash
supabase migration new create_marketing_tables
# Edit supabase/migrations/YYYYMMDDHHMMSS_create_marketing_tables.sql
supabase db push
```

Or apply manually via Supabase SQL Editor.
