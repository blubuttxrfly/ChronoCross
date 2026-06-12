# 📢 Discord Update Draft — ChronoCross Features

**Send to:** #chrono-share-team (or your team's Discord channel)

---

## Option 1: Full Update (Recommended)

Hey team! 👋 I've been mapping out the features for **ChronoCross** and I'm really excited about what we're building.

### 🎯 What We're Creating

**ChronoCross** = Where time meets, we all rise.

The name shift from ChronoShare to ChronoCross feels right — we're not just sharing time, we're **crossing paths** with each other. Sacred intersections.

---

### 💰 Currency System

**Chronos (₡)** — Our time currency
- 1 Chrono = 1 hour of any service
- Everyone starts with ₡1 on signup
- Balance can't go negative (₡ ≥ 0)

**Crosses** — Exchange count
- 1 Cross = 1 completed exchange
- Tracked separately from Chronos
- Used for badge eligibility
- Represents **trust built**, not just time traded

---

### 🌟 Core Features

**1. User Profiles** 👤
- Balance display (₡X Chronos)
- Cross count (X Crosses completed)
- Badges earned

**2. Listings** 📋
- Create Offers ("I will [skill] for ₡X")
- Create Requests ("I need [skill] for ₡X")
- Browse feed with filters
- Status: OPEN → IN_PROGRESS → COMPLETED

**3. Exchange Flow** ⚡
- Accept listing → Mark complete → Time transfer
- Provider +₡X, Receiver -₡X
- Both parties +1 Cross count
- Real-time balance updates

**4. Communal Aid Pool** 🤝 *(NEW)*
- Voluntary Chronos contributions
- Emergency/reduced-cost requests
- Pool balance visible on dashboard
- "Community Supporter" badge for contributors

**5. Badge System** 🏅 *(NEW)*
- Earned automatically based on milestones
- Examples:
  - 🌱 First Cross (1 exchange)
  - 🤝 Helper (5 as provider)
  - ❤️ Community Supporter (donated ₡5+ to aid)
  - 🌿 Green Thumb (10 environmental exchanges)
  - 🏆 Hackathon Pioneer (first 50 users, 3+ Crosses)

---

### 📊 Database Plan

**Tables:**
- `users` (id, username, time_balance, cross_count, badges[])
- `listings` (id, creator, type, duration, status, is_communal_aid)
- `transactions` (provider, receiver, chronos, listing_id)
- `communal_aid_pool` (total_balance, contributions_count)
- `aid_contributions` (user, amount)
- `aid_requests` (requester, listing, amount, status)
- `badges` (slug, name, description, icon, requirement)
- `user_badges` (user_id, badge_slug, earned_at)

---

### 🚀 Build Priority

**Saturday AM:** Core exchange (listings, accept, complete, time transfer)  
**Saturday PM:** Currency + Crosses tracking  
**Sunday AM:** Communal Aid pool  
**Sunday PM:** Badges + polish  
**Sunday 6pm EST:** SUBMIT 🎉

---

### 💬 Questions for the Team

1. **Communal Aid approval:** Who approves? (Mod-only? Community vote? Auto-approve under ₡3?)
2. **Badge visibility:** Show locked badges with requirements, or hide until earned?
3. **Chronos symbol:** Use ₡ (Unicode) or just "C" / "Chr" for simplicity?

---

### 📄 Full Doc

I've created a complete feature map: `CHRONOCROSS_FEATURE_MAP.md` in the repo.

Curious how this lands with you all! The communal aid + badges feel like they add real depth without bloating the MVP. What do you think? 🕰️✨

---

## Option 2: Short Update (Quick Check-In)

Hey team! 👋 Quick update on **ChronoCross** features:

**Core additions:**
- **Chronos (₡)** — Named currency (1 Chrono = 1 hour)
- **Crosses** — Exchange count (separate from balance, used for badges)
- **Communal Aid Pool** — Voluntary contributions for emergency/reduced-cost requests
- **Badge System** — Auto-earned milestones (🌱 First Cross, ❤️ Community Supporter, 🌿 Green Thumb, etc.)

**Database:** 8 tables total (users, listings, transactions, aid pool + contributions + requests, badges + user_badges)

**Build order:** Core exchange → Currency tracking → Communal Aid → Badges → Polish

Full doc: `CHRONOCROSS_FEATURE_MAP.md`

**Questions:**
1. Aid approval: mod-only, community vote, or auto-approve small amounts?
2. Badges: show locked with requirements, or hide until earned?
3. Currency symbol: ₡ or just "C"?

Curious how this lands! 🕰️✨

---

## Option 3: Voice Message Script (2-3 min)

*"Hey team, Atlas here. I've been sitting with the ChronoCross features and wanted to share what I'm seeing.*

*So the big shifts: we're calling the currency **Chronos** — one Chrono equals one hour. And we're tracking something called **Crosses**, which is the number of exchanges you've completed. That's separate from your balance and is used for earning badges.*

*Speaking of badges — we have a badge system now. Things like 'First Cross' for your first exchange, 'Helper' for completing 5 as a provider, 'Community Supporter' if you donate to the communal aid pool. These are auto-earned, no manual awarding needed.*

*The **Communal Aid Pool** is new — users can voluntarily contribute Chronos, and then people can make emergency or reduced-cost requests tagged as communal aid. The pool balance is visible on the dashboard.*

*I've mapped out all 8 database tables, the badge tiers, the whole flow. It's in `CHRONOCROSS_FEATURE_MAP.md` in the repo.*

*Build order I'm thinking: Saturday morning we do core exchange — listings, accept, complete, time transfer. Saturday afternoon, currency and Crosses tracking. Sunday morning, communal aid. Sunday afternoon, badges and polish. Submit by 6pm.*

*Three questions for you all: Who approves aid requests? Do we show locked badges or hide them? And should we use the ₡ symbol or just 'C' for simplicity?*

*Curious how this lands. I think the communal aid and badges add real depth without bloating the MVP. Let me know what you think!"*

---

## Recommendation

**Send Option 1 (Full Update)** if:
- Team is actively reading Discord
- You want thorough feedback before building
- It's not too late at night for them

**Send Option 2 (Short Update)** if:
- Team is in build flow and skimming messages
- You want quick reactions, not deep discussion
- You'll discuss details in voice sync

**Send Option 3 (Voice Message)** if:
- Your team prefers voice over text
- You're in a voice channel together
- You want to convey energy + vision, not just features

---

**My sense:** Option 1, sent now. The features are solid, the communal aid + badges differentiate ChronoCross from generic time-banking apps, and it gives your team clarity on what you're building together.

What feels right to you, Atlas? ✦
