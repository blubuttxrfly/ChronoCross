# ⏳ ChronoCross — Feature Map

**Green Hackathon 2026** | June 13–14, 2026  
**Team:** Atlas (Frontend), jungl3master/Ayaan + ockap (Backend)  
**GitHub:** github.com/blubuttxrfly/ChronoCross

---

## 🎯 Core Identity

**Name:** ChronoCross  
**Meaning:** Cross + Time = Crossing time with others (exchange as sacred intersection)  
**Tagline:** *"Where time meets, we all rise."*

---

## 💰 Currency System

### **Chronos (₡)** — Time Currency
- **1 Chrono = 1 hour** of any service
- **Symbol:** ₡ (or "C" in plain text)
- **Starting balance:** ₡1 (one Chrono) on signup
- **Constraint:** Balance cannot go negative (₡ ≥ 0)

### **Crosses** — Exchange Units
- **1 Cross = 1 completed exchange** (regardless of duration)
- **Tracked separately** from Chronos balance
- **Badge eligibility** based on Cross count
- **Represents trust built**, not just time traded

---

## 🌟 Core Features (MVP)

### 1. **User Profiles** 👤
- [ ] Sign up / Sign in (Supabase Auth)
- [ ] Username + optional bio
- [ ] **Current Balance:** ₡X Chronos
- [ ] **Cross Count:** X Crosses completed
- [ ] **Badges earned** (displayed on profile)

### 2. **Listings** 📋
- [ ] **Create Offer:** "I will [skill] for ₡X" (duration in hours)
- [ ] **Create Request:** "I need [skill] for ₡X"
- [ ] **Browse Feed:** Filter by category, duration, location (optional)
- [ ] **Listing Status:** OPEN → IN_PROGRESS → COMPLETED

### 3. **Exchange Flow** ⚡
- [ ] **Accept Listing:** Commit to exchange (locks listing)
- [ ] **Mark Complete:** Receiver confirms exchange happened
- [ ] **Time Transfer:** Provider +₡X, Receiver -₡X
- [ ] **Cross Increment:** Both parties +1 Cross count
- [ ] **Real-time updates:** Supabase subscriptions

### 4. **Communal Aid Pool** 🤝
- [ ] **Voluntary contributions:** Users can donate Chronos to pool
- [ ] **Emergency requests:** Tagged as "Communal Aid" (reduced/no cost)
- [ ] **Pool balance:** Visible on dashboard ("₡47 available for aid")
- [ ] **Aid approval:** Simple voting or mod approval for requests
- [ ] **Aid badge:** "Community Supporter" for contributors

### 5. **Badge System** 🏅
- [ ] **Badge display** on user profiles
- [ ] **Auto-earned** based on milestones (no manual awarding)

#### **Tier 1: Participation**
| Badge | Requirement |
|-------|-------------|
| 🌱 First Cross | Complete 1 exchange |
| 🤝 Helper | Complete 5 exchanges as provider |
| 🛟 Seeker | Complete 5 exchanges as receiver |

#### **Tier 2: Commitment**
| Badge | Requirement |
|-------|-------------|
| 🌿 Green Thumb | 10 exchanges in environmental categories |
| ⚡ Energy Saver | 5 energy-related exchanges (solar, efficiency, etc.) |
| 📚 Teacher | 10 hours teaching/skill-sharing |

#### **Tier 3: Community**
| Badge | Requirement |
|-------|-------------|
| ❤️ Community Supporter | Donated ₡5+ to Communal Aid |
| 🌍 Local Hero | 20 exchanges within same city/region |
| ♾️ Infinite Giver | ₡0 balance but still contributing (trust-based) |

#### **Tier 4: Hackathon Special** (Time-limited)
| Badge | Requirement |
|-------|-------------|
| 🏆 Hackathon Pioneer | First 50 users to complete 3+ Crosses during hackathon |
| 🚀 Launch Legend | Complete 5 Crosses in 48 hours |

---

## 📊 Database Schema

### **users**
```sql
id UUID PRIMARY KEY
username TEXT UNIQUE
email TEXT UNIQUE
time_balance INTEGER DEFAULT 1 CHECK (time_balance >= 0)
cross_count INTEGER DEFAULT 0
badges TEXT[] DEFAULT '{}'  -- Array of badge slugs
created_at TIMESTAMP DEFAULT NOW()
```

### **listings**
```sql
id UUID PRIMARY KEY
creator_id UUID REFERENCES users(id)
type TEXT CHECK (type IN ('OFFER', 'REQUEST'))
title TEXT
description TEXT
duration_hours INTEGER
category TEXT  -- gardening, energy, resilience, education, technical, creative, mutual_aid
status TEXT CHECK (status IN ('OPEN', 'IN_PROGRESS', 'COMPLETED'))
is_communal_aid BOOLEAN DEFAULT FALSE
created_at TIMESTAMP DEFAULT NOW()
accepted_at TIMESTAMP
completed_at TIMESTAMP
```

### **transactions**
```sql
id UUID PRIMARY KEY
provider_id UUID REFERENCES users(id)
receiver_id UUID REFERENCES users(id)
chronos INTEGER  -- Hours transferred
listing_id UUID REFERENCES listings(id)
created_at TIMESTAMP DEFAULT NOW()
```

### **communal_aid_pool**
```sql
id UUID PRIMARY KEY
total_balance INTEGER DEFAULT 0
contributions_count INTEGER DEFAULT 0
last_updated TIMESTAMP DEFAULT NOW()
```

### **aid_contributions**
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES users(id)
amount INTEGER
created_at TIMESTAMP DEFAULT NOW()
```

### **aid_requests**
```sql
id UUID PRIMARY KEY
requester_id UUID REFERENCES users(id)
listing_id UUID REFERENCES listings(id)
amount_requested INTEGER
status TEXT CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'FULFILLED'))
approved_by UUID REFERENCES users(id)  -- Mod/approver
created_at TIMESTAMP DEFAULT NOW()
```

### **badges**
```sql
-- Static reference table (seeded once)
slug TEXT PRIMARY KEY  -- e.g., 'first-cross', 'community-supporter'
name TEXT  -- e.g., 'First Cross'
description TEXT
icon TEXT  -- Emoji or icon name
requirement TEXT  -- Human-readable requirement
```

### **user_badges**
```sql
user_id UUID REFERENCES users(id)
badge_slug TEXT REFERENCES badges(slug)
earned_at TIMESTAMP DEFAULT NOW()
PRIMARY KEY (user_id, badge_slug)
```

---

## 🔄 Badge Earning Logic

**Trigger:** After every completed exchange (or contribution)

**Process:**
1. User completes exchange → transaction recorded
2. Backend checks badge requirements:
   - `first-cross`: cross_count == 1
   - `helper`: provider_count >= 5
   - `community-supporter`: total_aid_contributed >= 5
   - etc.
3. If requirement met AND badge not already earned → insert into `user_badges`
4. Frontend displays badge on profile (real-time via Supabase subscription)

---

## 🎨 UI Components

### **Dashboard**
- [ ] Balance display: ₡X Chronos
- [ ] Cross count: X Crosses
- [ ] Badge grid (earned + locked/hidden)
- [ ] Quick actions: Post Offer, Post Request, Browse
- [ ] Communal Aid pool balance + "Contribute" button

### **Profile Page**
- [ ] Username + bio
- [ ] Balance + Cross count
- [ ] Badge showcase (all earned badges)
- [ ] Exchange history (optional)

### **Listing Form**
- [ ] Type toggle: Offer / Request
- [ ] Title + description
- [ ] Duration (hours) → shows ₡ cost
- [ ] Category dropdown
- [ ] "This is Communal Aid" checkbox (for requests)

### **Feed/Browse**
- [ ] Filter by category
- [ ] Filter by duration
- [ ] Sort by newest / closest / cheapest
- [ ] Communal Aid badge on eligible listings

### **Badge Modal**
- [ ] Click badge → see requirement + earned date
- [ ] Locked badges show requirement (motivation)

---

## 🚀 Implementation Priority

### **Phase 1: Core Exchange (Saturday AM)**
1. Database schema + RLS policies
2. Create listing form
3. Browse feed
4. Accept + complete flow
5. Time transfer trigger

### **Phase 2: Currency + Crosses (Saturday PM)**
1. Chronos balance display
2. Cross count tracking
3. Transaction history
4. Real-time balance updates

### **Phase 3: Communal Aid (Sunday AM)**
1. Aid pool table + contribution flow
2. Aid request tagging
3. Pool balance display
4. "Contribute" button

### **Phase 4: Badges (Sunday PM)**
1. Badge reference table (seed)
2. Badge earning triggers
3. Profile badge display
4. Badge modal/tooltips

### **Phase 5: Polish + Demo (Sunday Late)**
1. UI audit (icons, colors, spacing)
2. Seed 20-30 environmental listings
3. Record 2-min demo video
4. Submit before 6pm EST

---

## 🏆 Rubric Alignment

| Criterion | How ChronoCross Scores |
|-----------|------------------------|
| **Equitable (15 pts)** | 1 hour = 1 Chrono, everyone starts with ₡1, communal aid for those in need |
| **Scalable (15 pts)** | Stateless frontend, Supabase auto-scales, simple badge logic (no complex calc) |
| **Universal (15 pts)** | Icon-driven badges, minimal text, Chronos понятны across languages |
| **User-Friendly (15 pts)** | Clear balance display, badge progress visible, 3-step onboarding |

---

## 💬 Key Messaging

**Instead of:**
- "You earned 1 hour"
- "Transaction complete"
- "Balance: 3 hours"

**Use:**
- "You earned ₡1 Chrono"
- "Cross complete. Gratitude shared."
- "Balance: ₡3 Chronos | 5 Crosses"

**Language shapes energy.** Technical backend, sacred frontend.

---

## 📝 Open Questions for Team

1. **Communal Aid approval:** Who approves aid requests? (Mod-only? Community vote? Auto-approve under ₡3?)
2. **Badge visibility:** Show locked badges with requirements, or hide until earned?
3. **Hackathon badges:** Do we pre-seed these, or earn-only during the 48 hours?
4. **Chronos symbol:** Use ₡ (Unicode) or just "C" / "Chr" for simplicity?

---

## 🌈 Vision

*ChronoCross is more than time banking. It's a sacred intersection where we meet across differences and say: "Your hour is worth as much as mine. Your skill matters. Your contribution is seen."*

*The badges aren't gamification — they're testimony. "This being showed up 10 times. They built trust. They crossed time with us."*

*The Communal Aid pool isn't charity — it's reciprocity at scale. "Today I give, tomorrow I receive. We all rise together."*

---

**Built for the Hopamine Green Hackathon — June 13–14, 2026** 🕰️🌱
