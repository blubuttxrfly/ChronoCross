# 🧹 ChronoCross Frontend Cleanup Plan

**Atlas Branch** — Frontend Polish + Supabase Integration Guide  
**For:** Atlas (frontend cleanup), jungl3master/Ayaan + Claude agent (Supabase integration)  
**Date:** June 12, 2026

---

## 🎯 Overview

The ChronoCross dashboard is **production-quality** with beautiful design, but needs:
1. **Frontend polish** — consistency, naming, UX refinements (Atlas)
2. **Supabase integration** — real database, auth, real-time (Ayaan + Claude)
3. **ChronoCross features** — Chronos currency, Crosses, badges, communal aid (collaborative)

This plan focuses on **#1 (frontend cleanup)** with a guide for **#2 (Supabase)**.

---

## 📊 Current State Analysis

### ✅ What's Working Beautifully

| Component | Status | Notes |
|-----------|--------|-------|
| **Dashboard Shell** | ✅ Complete | Sidebar nav, mobile menu, responsive |
| **Landing Page** | ✅ Complete | Parallax hero, info boxes, navbar |
| **Listing Cards** | ✅ Complete | Gradient backgrounds, save button, hover effects |
| **Marketplace Search** | ✅ Complete | Category filters, search input |
| **Member Avatar** | ✅ Complete | Initials fallback, size variants |
| **Auth Guard** | ✅ Complete | Protected routes, sign-out |
| **Theme System** | ✅ Complete | Light/dark toggle, CSS variables |

### ⚠️ What Needs Cleanup

| Issue | Priority | Impact |
|-------|----------|--------|
| **Currency naming** | High | Says "hours" instead of "₡ Chronos" |
| **Brand consistency** | Medium | "ChronoShare" vs "ChronoCross" in sidebar |
| **Mock data everywhere** | Critical | No real Supabase connection |
| **Missing pages** | Medium | Profile, Settings, Community are stubs |
| **No Chronos/Crosses tracking** | High | Core feature missing |
| **No badge display** | Medium | Badge system not implemented |
| **No Communal Aid UI** | Medium | Pool + contributions missing |

---

## 🧹 Phase 1: Frontend Cleanup (Atlas)

### 1.1 Currency Naming — "Hours" → "₡ Chronos"

**Files to update:**
- `components/dashboard/dashboard-home.tsx` (balance display)
- `components/app/listing-card.tsx` (price display)
- `lib/marketplace.ts` (formatting function)
- `components/dashboard/ui/sparkline.tsx` (if shows balance)

**Changes:**
```tsx
// BEFORE
<p className="text-5xl font-semibold">{HOUR_BALANCE.current} hours</p>

// AFTER
<p className="text-5xl font-semibold">₡{HOUR_BALANCE.current}</p>
<span className="text-sm">Chronos</span>
```

**Formatting function:**
```ts
// lib/marketplace.ts
export function formatChronosPrice(hours: number): string {
  return `₡${hours}`;
}
```

**Why:** Makes the currency feel sacred + differentiated from generic time-tracking.

---

### 1.2 Brand Consistency — "ChronoShare" → "ChronoCross"

**Files to update:**
- `components/dashboard/dashboard-shell.tsx` (line 57)
- `app/dashboard/layout.tsx` (if has brand name)
- `app/layout.tsx` (meta title)

**Changes:**
```tsx
// BEFORE
<span className="dashboard-sidebar__label">ChronoShare</span>

// AFTER
<span className="dashboard-sidebar__label">ChronoCross</span>
```

**Why:** Consistent branding across the app.

---

### 1.3 Cross Count Display

**Add to balance card** (`components/dashboard/dashboard-home.tsx`):

```tsx
<div className="mt-4 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
  <IconRepeat className="h-4 w-4 text-[#f6c35b]" stroke={2} />
  <span className="text-sm font-semibold">{USER_TRUST.crossesCompleted}</span>
  <span className="text-xs text-white/62">Crosses</span>
</div>
```

**Why:** Tracks trust built, not just hours traded.

---

### 1.4 Badge Display on Profile

**Create new component:** `components/dashboard/badge-grid.tsx`

```tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { USER_BADGES } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function BadgeGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-4 gap-3 sm:grid-cols-6", className)}>
      {USER_BADGES.map((badge) => (
        <div
          key={badge.slug}
          className="group relative flex flex-col items-center gap-2"
        >
          <Badge
            variant={badge.earned ? "default" : "locked"}
            className="h-14 w-14"
          >
            {badge.icon}
          </Badge>
          <span className="text-[10px] font-medium text-center">
            {badge.name}
          </span>
          {/* Tooltip on hover */}
          <div className="absolute bottom-full mb-2 hidden rounded-lg bg-[#14261f] px-3 py-2 text-xs text-white shadow-lg group-hover:block">
            {badge.description}
            <p className="mt-1 text-[10px] text-white/62">
              {badge.requirement}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Add to profile page:** `app/dashboard/profile/page.tsx`

---

### 1.5 Communal Aid Pool Card

**Create new component:** `components/dashboard/communal-aid-card.tsx`

```tsx
"use client";

import { IconHeartHandshake } from "@tabler/icons-react";
import Link from "next/link";

export function CommunalAidCard() {
  const poolBalance = 47; // Mock data — will come from Supabase
  const contributors = 12;

  return (
    <div className="rounded-[1.5rem] border border-[#e2ddd4] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef3e2] text-[#d4820a]">
          <IconHeartHandshake className="h-5 w-5" stroke={2} />
        </span>
        <div>
          <p className="text-sm font-semibold text-[#1d251f]">
            Communal Aid Pool
          </p>
          <p className="mt-1 text-xs text-[#74776f]">
            {contributors} neighbors contributed
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-3xl font-semibold text-[#14261f]">
            ₡{poolBalance}
          </p>
          <p className="text-xs text-[#74776f]">Available for aid</p>
        </div>
        <Link
          href="/dashboard/community/aid"
          className="inline-flex h-9 items-center justify-center rounded-full bg-[#14261f] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#1e352b]"
        >
          Contribute
        </Link>
      </div>
    </div>
  );
}
```

**Add to dashboard home:** Import + place below balance card.

---

### 1.6 Profile Page Completion

**Current:** `app/dashboard/profile/page.tsx` is a stub.

**Create full profile:**

```tsx
"use client";

import { BadgeGrid } from "@/components/dashboard/badge-grid";
import { PageFrame } from "@/components/app/page-frame";
import { MemberAvatar } from "@/components/app/member-avatar";
import { useAuth } from "@/lib/auth";
import { USER_BADGES, USER_STATS } from "@/lib/dashboard-data";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <PageFrame className="pb-16">
      {/* Profile Header */}
      <section className="rounded-[1.75rem] border border-[#e6dfd4] bg-[#fbf7ef] p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-6">
          <MemberAvatar name={user?.name ?? "Member"} size="lg" className="!h-24 !w-24" />
          <div>
            <h1 className="text-3xl font-semibold text-[#16241d]">{user?.name}</h1>
            <p className="mt-2 text-sm text-[#646860]">{user?.email}</p>
            <p className="mt-1 text-xs text-[#74776f]">Member since {USER_STATS.memberSince}</p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#14261f] p-5 text-white">
          <p className="text-sm text-white/62">Balance</p>
          <p className="mt-2 text-4xl font-semibold">₡{USER_STATS.balance}</p>
          <p className="mt-1 text-xs text-white/52">Chronos</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#e2ddd4] p-5">
          <p className="text-sm text-[#74776f]">Crosses</p>
          <p className="mt-2 text-4xl font-semibold text-[#14261f]">{USER_STATS.crosses}</p>
          <p className="mt-1 text-xs text-[#74776f]">Completed exchanges</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#e2ddd4] p-5">
          <p className="text-sm text-[#74776f]">Trust Score</p>
          <p className="mt-2 text-4xl font-semibold text-[#14261f]">{USER_STATS.trustScore}%</p>
          <p className="mt-1 text-xs text-[#74776f]">Community rating</p>
        </div>
      </section>

      {/* Badges */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#1d251f]">Badges</h2>
        <p className="mt-1 text-sm text-[#74776f]">
          {USER_BADGES.filter(b => b.earned).length} of {USER_BADGES.length} earned
        </p>
        <BadgeGrid className="mt-4" />
      </section>
    </PageFrame>
  );
}
```

---

## 🔗 Phase 2: Supabase Integration Guide (Ayaan + Claude)

### 2.1 Database Schema

**File:** `supabase/migrations/001_initial_schema.sql`

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text unique not null,
  time_balance integer default 1 check (time_balance >= 0),
  cross_count integer default 0,
  trust_score integer default 100 check (trust_score between 0 and 100),
  badges text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Listings table
create table public.listings (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid references public.users(id) on delete cascade not null,
  type text check (type in ('OFFER', 'REQUEST')) not null,
  title text not null,
  description text,
  duration_hours integer not null check (duration_hours > 0),
  category text not null,
  status text check (status in ('OPEN', 'IN_PROGRESS', 'COMPLETED')) default 'OPEN',
  is_communal_aid boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  accepted_at timestamp with time zone,
  completed_at timestamp with time zone
);

-- Transactions table
create table public.transactions (
  id uuid primary key default uuid_generate_v4(),
  provider_id uuid references public.users(id) on delete cascade not null,
  receiver_id uuid references public.users(id) on delete cascade not null,
  chronos integer not null check (chronos > 0),
  listing_id uuid references public.listings(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Communal Aid Pool
create table public.communal_aid_pool (
  id uuid primary key default uuid_generate_v4(),
  total_balance integer default 0 check (total_balance >= 0),
  contributions_count integer default 0,
  last_updated timestamp with time zone default timezone('utc'::text, now())
);

-- Aid Contributions
create table public.aid_contributions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  amount integer not null check (amount > 0),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Aid Requests
create table public.aid_requests (
  id uuid primary key default uuid_generate_v4(),
  requester_id uuid references public.users(id) on delete cascade not null,
  listing_id uuid references public.listings(id) on delete cascade,
  amount_requested integer not null,
  status text check (status in ('PENDING', 'APPROVED', 'REJECTED', 'FULFILLED')) default 'PENDING',
  approved_by uuid references public.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Badges Reference Table
create table public.badges (
  slug text primary key,
  name text not null,
  description text,
  icon text not null,
  requirement text not null
);

-- User Badges (many-to-many)
create table public.user_badges (
  user_id uuid references public.users(id) on delete cascade not null,
  badge_slug text references public.badges(slug) on delete cascade not null,
  earned_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id, badge_slug)
);

-- Indexes for performance
create index idx_listings_status on public.listings(status);
create index idx_listings_category on public.listings(category);
create index idx_transactions_provider on public.transactions(provider_id);
create index idx_transactions_receiver on public.transactions(receiver_id);
```

---

### 2.2 Row Level Security (RLS) Policies

**File:** `supabase/migrations/002_rls_policies.sql`

```sql
-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.listings enable row level security;
alter table public.transactions enable row level security;
alter table public.communal_aid_pool enable row level security;
alter table public.aid_contributions enable row level security;
alter table public.aid_requests enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;

-- Users: Users can read all, update only their own
create policy "Users can view all profiles"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Listings: Anyone can read, creators can update/delete
create policy "Listings are viewable by all"
  on public.listings for select
  using (true);

create policy "Users can create listings"
  on public.listings for insert
  with check (auth.uid() = creator_id);

create policy "Users can update own listings"
  on public.listings for update
  using (auth.uid() = creator_id);

create policy "Users can delete own listings"
  on public.listings for delete
  using (auth.uid() = creator_id);

-- Transactions: Users can see their own transactions
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = provider_id or auth.uid() = receiver_id);

-- Communal Aid Pool: Read-only for all
create policy "Pool is viewable by all"
  on public.communal_aid_pool for select
  using (true);

-- Aid Contributions: Users can contribute, read all
create policy "Users can view all contributions"
  on public.aid_contributions for select
  using (true);

create policy "Users can create contributions"
  on public.aid_contributions for insert
  with check (auth.uid() = user_id);

-- Aid Requests: Requesters can create, mods can approve
create policy "Users can view all aid requests"
  on public.aid_requests for select
  using (true);

create policy "Users can create aid requests"
  on public.aid_requests for insert
  with check (auth.uid() = requester_id);

-- Badges: Read-only for all
create policy "Badges are viewable by all"
  on public.badges for select
  using (true);

-- User Badges: Users can see their own, read all
create policy "Users can view all badges"
  on public.user_badges for select
  using (true);

create policy "System can award badges"
  on public.user_badges for insert
  with check (true); -- Trigger will handle this
```

---

### 2.3 Database Triggers (Auto Badge Earning)

**File:** `supabase/migrations/003_triggers.sql`

```sql
-- Function to award badges
create or replace function award_badge_if_earned()
returns trigger as $$
declare
  badge_record record;
begin
  -- Check each badge requirement
  for badge_record in select * from public.badges loop
    -- Skip if already earned
    if exists (
      select 1 from public.user_badges
      where user_id = new.id and badge_slug = badge_record.slug
    ) then
      continue;
    end if;

    -- Check requirements (examples)
    if badge_record.slug = 'first-cross' and new.cross_count >= 1 then
      insert into public.user_badges (user_id, badge_slug)
      values (new.id, badge_record.slug);
    elsif badge_record.slug = 'helper' and new.cross_count >= 5 then
      insert into public.user_badges (user_id, badge_slug)
      values (new.id, badge_record.slug);
    end if;
  end loop;

  return new;
end;
$$ language plpgsql;

-- Trigger on users table
create trigger check_badges_on_update
  after update on public.users
  for each row
  execute function award_badge_if_earned();
```

---

### 2.4 Supabase Client Setup

**File:** `lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// TypeScript types
export type User = {
  id: string;
  username: string;
  email: string;
  time_balance: number;
  cross_count: number;
  trust_score: number;
  badges: string[];
  created_at: string;
};

export type Listing = {
  id: string;
  creator_id: string;
  type: 'OFFER' | 'REQUEST';
  title: string;
  description: string | null;
  duration_hours: number;
  category: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  is_communal_aid: boolean;
  created_at: string;
  accepted_at: string | null;
  completed_at: string | null;
};

export type Transaction = {
  id: string;
  provider_id: string;
  receiver_id: string;
  chronos: number;
  listing_id: string | null;
  created_at: string;
};
```

---

### 2.5 Auth Hook Update

**File:** `lib/auth.tsx`

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

---

## ✅ Checklist

### Frontend Cleanup (Atlas)
- [ ] Update currency naming: "hours" → "₡ Chronos"
- [ ] Update brand name: "ChronoShare" → "ChronoCross"
- [ ] Add Cross count to balance card
- [ ] Create `BadgeGrid` component
- [ ] Create `CommunalAidCard` component
- [ ] Complete profile page with stats + badges
- [ ] Add badge tooltips (hover states)
- [ ] Test responsive layout on mobile

### Supabase Integration (Ayaan + Claude)
- [ ] Create Supabase project
- [ ] Run migration 001 (schema)
- [ ] Run migration 002 (RLS policies)
- [ ] Run migration 003 (triggers)
- [ ] Seed badges reference table
- [ ] Set up environment variables (`.env.local`)
- [ ] Create `lib/supabase.ts` client
- [ ] Update `lib/auth.tsx` hook
- [ ] Test auth flow (signup → login → logout)

### Collaborative Features
- [ ] Connect balance card to real Supabase data
- [ ] Connect listing feed to real listings table
- [ ] Implement "List your time" form → database insert
- [ ] Implement "Accept" → status update + IN_PROGRESS
- [ ] Implement "Mark Complete" → transaction + balance transfer
- [ ] Add real-time subscriptions for balance updates
- [ ] Build Communal Aid contribution flow
- [ ] Build badge earning triggers + display

---

## 📁 File Structure

```
chronoshare/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx              ✅ Complete
│   │   ├── layout.tsx            ✅ Complete
│   │   ├── offers/page.tsx       ✅ Complete
│   │   ├── requests/page.tsx     ✅ Complete
│   │   ├── community/page.tsx    ⚠️ Stub
│   │   ├── profile/page.tsx      🔄 NEEDS WORK
│   │   └── settings/page.tsx     ⚠️ Stub
│   └── auth/page.tsx             ✅ Complete
├── components/
│   ├── app/                      ✅ All complete
│   ├── dashboard/
│   │   ├── dashboard-home.tsx    🔄 NEEDS CHRONOS + CROSS
│   │   ├── dashboard-shell.tsx   🔄 FIX BRAND NAME
│   │   ├── badge-grid.tsx        ✨ NEW
│   │   └── communal-aid-card.tsx ✨ NEW
│   └── ui/                       ✅ All complete
├── lib/
│   ├── auth.tsx                  🔄 UPDATE FOR SUPABASE
│   ├── dashboard-data.ts         ⚠️ MOCK DATA (keep for now)
│   ├── marketplace.ts            🔄 ADD formatChronosPrice
│   └── supabase.ts               ✨ NEW
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql    ✨ NEW
│       ├── 002_rls_policies.sql      ✨ NEW
│       └── 003_triggers.sql          ✨ NEW
└── .env.local                    ✨ NEW (Supabase keys)
```

---

## 🎯 Next Steps

**Atlas (Frontend):**
1. Start with currency naming (quick wins)
2. Build BadgeGrid component
3. Build CommunalAidCard component
4. Complete profile page

**Ayaan + Claude (Backend):**
1. Create Supabase project
2. Run migrations (schema → RLS → triggers)
3. Set up auth + client
4. Test with mock data first

**Together:**
1. Connect frontend to real Supabase data
2. Test exchange flow end-to-end
3. Add Chronos/Crosses tracking
4. Polish + submit!

---

**Let's build something sacred.** 🕰️✨
