# 🎨 ChronoCross — Current Feature Documentation

**Documented:** June 12, 2026  
**Branch:** `atlas` (latest from `main`)  
**Purpose:** Complete inventory of current features before UIX reimagination

---

## 📁 **Project Structure**

```
chronoshare/
├── app/
│   ├── layout.tsx              # Root layout + providers
│   ├── page.tsx                # Landing page (redirects to dashboard)
│   ├── globals.css             # Global styles + Tailwind
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard shell wrapper
│   │   ├── page.tsx            # Dashboard home
│   │   ├── offers/
│   │   │   └── page.tsx        # Offers feed page
│   │   ├── requests/
│   │   │   └── page.tsx        # Requests feed page
│   │   ├── community/
│   │   │   └── page.tsx        # Community members page
│   │   ├── profile/
│   │   │   └── page.tsx        # User profile page
│   │   └── ledger/
│   │       └── page.tsx        # Transaction history
│   └── auth/
│       └── page.tsx            # Login/signup page
│
├── components/
│   ├── app/                    # Core app components
│   │   ├── listing-card.tsx    # Offer/request cards
│   │   ├── listing-carousel.tsx # Horizontal scroll carousel
│   │   ├── marketplace-search.tsx # Search + category filters
│   │   └── member-avatar.tsx   # User avatar with initials
│   │
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── dashboard-home.tsx  # Main dashboard view
│   │   ├── dashboard-shell.tsx # Sidebar + layout wrapper
│   │   ├── auth-guard.tsx      # Auth protection
│   │   ├── offers-page.tsx     # Full offers list
│   │   ├── requests-page.tsx   # Full requests list
│   │   └── community-page.tsx  # Community directory
│   │
│   ├── landing/                # Landing page components
│   │   ├── landing-page.tsx    # Hero + parallax animation
│   │   └── info-box.tsx        # 4-box feature grid
│   │
│   ├── ui/                     # Reusable UI components
│   │   ├── navbar.tsx          # Landing page nav
│   │   ├── prisma-hero.tsx     # Hero with video background
│   │   └── ... (buttons, cards, etc.)
│   │
│   └── providers.tsx           # Theme + auth providers
│
├── lib/
│   ├── dashboard-data.ts       # Mock data (offers, requests, members)
│   ├── marketplace.ts          # Categories, utilities, gradients
│   ├── utils.ts                # cn() helper
│   └── supabase.ts             # Supabase client (stub)
│
└── public/
    ├── favicon.ico
    └── manifest.json           # PWA manifest
```

---

## 🎯 **Current Features (What Works)**

### **1. Landing Page** (`/`)
- ✅ Parallax mountain landscape with animated cyclists
- ✅ 4 info boxes (What it is, How it works, Equal value, Your ledger)
- ✅ Video background section (cloudfront CDN)
- ✅ Navbar with navigation links
- ✅ "Join the bank" CTA button
- ✅ Theme toggle (light/dark)
- ✅ Mobile responsive menu

**Creative Strengths:**
- Beautiful visual design (mountains, cyclists, gradients)
- Smooth animations
- Clear value proposition

**Issues:**
- Doesn't redirect to dashboard after auth
- Video may not load (external CDN)

---

### **2. Dashboard Shell** (Sidebar Navigation)
- ✅ Dark vertical sidebar (left)
- ✅ Quick action buttons (top): Clock, Plus, Home
- ✅ Navigation icons: Heart (Favorites), Bell (Notifications), People (Community), Gear (Settings)
- ✅ Profile avatars (bottom)
- ✅ Collapsible on mobile

**Current State:**
- Functional but basic
- Icons are Tabler icons (outline style)
- No active state highlighting
- No tooltips

---

### **3. Dashboard Home** (`/dashboard`)
- ✅ Hero section with search bar
- ✅ Category filter pills (All, Repair, Education, Home, etc.)
- ✅ Balance card (₡4 Chronos)
- ✅ Trust stats (Helped, Given, Received)
- ✅ Category tiles (6 categories with icons)
- ✅ Popular offers grid (4 cards)
- ✅ Requests list
- ✅ Active members sidebar
- ✅ "Fresh in your network" section

**Current State:**
- **Layout issues:** Text overflow, cramped spacing
- **Mock data only:** No Supabase connection
- **Visual style:** Cream/beige + forest green + mustard yellow palette
- **Typography:** Inter (sans) + Fraunces (serif)

---

### **4. Search + Filter System**
- ✅ Search input with icon
- ✅ Search button (green pill)
- ✅ Category pills (horizontal scroll)
- ✅ Active state styling
- ✅ Icon + label for each category

**Categories:**
1. All (default)
2. Repair (wrench icon)
3. Education (book icon)
4. Home (house icon)
5. Errands (shopping bag)
6. Outdoors (plant)
7. Career (briefcase)
8. Wellness
9. Creative
10. Tech
11. Care
12. Events

**Issues:**
- Pills overflow on small screens
- Text extends outside buttons
- Horizontal scroll hides categories

---

### **5. Listing Cards** (Offer/Request Cards)
- ✅ Gradient backgrounds (color-coded by category)
- ✅ "Available" / "Needed" status badge
- ✅ Save/favorite button (heart icon)
- ✅ Category label (bottom left)
- ✅ Title (truncated)
- ✅ Chronos price (₡4)
- ✅ Location + posted time
- ✅ Member avatar + name

**Visual Style:**
- Aspect ratio: 4/3
- Rounded corners (2xl)
- Gradient overlays
- Shadow on hover

**Issues:**
- Gradients may not match brand palette
- Text truncation inconsistent
- No actual image support (gradient only)

---

### **6. Member Avatar Component**
- ✅ Circular avatar with initials
- ✅ Color-coded by name (hash function)
- ✅ Size variants (sm, md, lg)
- ✅ Fallback to initials if no image

**Current State:**
- Functional
- No image upload support yet
- No online status indicator

---

### **7. Auth System** (`/auth`)
- ✅ Login form (email + password)
- ✅ Signup form
- ✅ Auth guard wrapper
- ✅ Supabase auth hooks (prepared but not connected)

**Current State:**
- UI complete
- Backend not connected
- Mock authentication only

---

### **8. Profile Page** (`/dashboard/profile`)
- ✅ Basic layout exists
- ⚠️ **Mostly blank** — needs content

**Missing:**
- Profile photo upload
- Bio/description
- Skills list
- Availability calendar
- Reviews/testimonials
- Badge display
- Chronos balance history

---

### **9. Community Page** (`/dashboard/community`)
- ✅ Member directory layout
- ✅ Search/filter by skill
- ✅ Member cards

**Current State:**
- Mock data only
- No filtering logic
- No member detail view

---

### **10. Offers/Requests Pages**
- ✅ Full list views
- ✅ Filter by category
- ✅ Sort by newest/popular

**Current State:**
- Basic grid layout
- No advanced filters
- No map view

---

### **11. Ledger Page** (`/dashboard/ledger`)
- ✅ Page exists
- ⚠️ **Blank** — no content

**What it needs:**
- Transaction history table
- Chronos earned/spent breakdown
- Export to CSV
- Filter by date/type

---

## 🎨 **Current Design System**

### **Color Palette**
```css
/* Primary */
Forest Green: #14261f (dark sidebar, buttons)
Light Green: #1e352b (hover state)
Sage: #24734d (accents)

/* Secondary */
Mustard Yellow: #f6c35b (highlights, icons)
Gold: #b5791b (accents)

/* Neutrals */
Cream: #f6f1e8 (backgrounds)
Beige: #e4ded4 (borders)
Warm Gray: #74776f (text)
Dark Gray: #1d251f (headings)

/* Status */
Emerald: #10b981 (Available badge)
Rose: #f43f5e (Saved heart)
```

### **Typography**
```css
/* Headings */
Fraunces (serif) — display, hero text
- 4xl-5xl for heroes
- 2xl for section headers

/* Body */
Inter (sans) — UI text, labels
- 15px for body
- 13px for captions
- 11px for microcopy
```

### **Spacing System**
```css
/* Current (inconsistent) */
p-3, p-4, p-5, p-6 (mixed)
gap-2, gap-3, gap-4, gap-6, gap-8 (mixed)
m-5, m-6, m-8, m-10 (mixed)

/* Needed */
Consistent 4px grid:
- xs: 4px (1)
- sm: 8px (2)
- md: 16px (4)
- lg: 24px (6)
- xl: 32px (8)
- 2xl: 48px (12)
```

### **Border Radius**
```css
/* Current */
rounded-full (buttons, pills)
rounded-2xl (cards)
rounded-3xl (hero sections)

/* Consistent */
- sm: 8px (small elements)
- md: 12px (inputs)
- lg: 16px (cards)
- xl: 24px (sections)
- full: 9999px (pills, buttons)
```

---

## 🐛 **Known Issues (To Fix in Reimagination)**

### **Layout & Overflow**
- [ ] Search button text overflows
- [ ] Category pills overflow container
- [ ] Text truncation inconsistent on cards
- [ ] Mobile responsiveness breaks on small screens

### **Spacing & Alignment**
- [ ] Inconsistent padding throughout
- [ ] Section margins vary (5, 6, 8, 10)
- [ ] Grid gaps not uniform
- [ ] Cards not vertically aligned

### **Visual Hierarchy**
- [ ] Hero section too busy
- [ ] Too many gradient overlays
- [ ] Color palette not consistently applied
- [ ] Typography scale needs refinement

### **Functionality**
- [ ] No Supabase connection
- [ ] All data is mock data
- [ ] No real auth flow
- [ ] No form validation
- [ ] No error states
- [ ] No loading states

---

## ✨ **What to Keep (Creative Strengths)**

1. **Parallax landing page** — Beautiful, unique, memorable
2. **Color palette** — Warm, inviting, nature-inspired
3. **Typography pairing** — Fraunces + Inter is excellent
4. **Gradient cards** — Color-coded by category is intuitive
5. **Sidebar navigation** — Dark sidebar provides good contrast
6. **Avatar system** — Initials + color is smart fallback
7. **Pill filters** — Pattern is standard and usable

---

## 🎯 **What to Reimagine**

### **1. Dashboard Layout**
**Current:** Cramped, overflow issues, inconsistent spacing  
**Direction:** 
- More breathing room (whitespace)
- Consistent 4px grid
- Clearer visual hierarchy
- Better mobile responsiveness

### **2. Search Experience**
**Current:** Overflowing buttons, hidden categories  
**Direction:**
- Stacked layout on mobile (search + filters)
- Larger touch targets
- Visible categories (wrap, don't scroll)
- Better placeholder text

### **3. Listing Cards**
**Current:** Gradient-only, text overflow  
**Direction:**
- Optional image upload support
- Better text truncation
- Consistent aspect ratios
- Clearer call-to-action

### **4. Category System**
**Current:** 12 categories, horizontal scroll  
**Direction:**
- Group by type (Services, Skills, Events)
- Grid layout (not scroll)
- Larger icons
- Better labels

### **5. Profile Page**
**Current:** Blank  
**Direction:**
- Photo upload
- Bio + skills
- Availability calendar
- Badge display
- Reviews section

---

## 🚀 **Next Steps (After Documentation)**

### **Phase 1: Creative Direction**
- [ ] Define visual moodboard
- [ ] Choose: Keep current palette or refine?
- [ ] Decide: Modern minimal vs. warm organic?
- [ ] Select: Component library or custom?

### **Phase 2: Information Architecture**
- [ ] Map user flows (browse → accept → complete)
- [ ] Define page hierarchy
- [ ] Plan navigation structure
- [ ] Design mobile breakpoints

### **Phase 3: Component Rebuild**
- [ ] Rebuild search + filters
- [ ] Redesign listing cards
- [ ] Recreate dashboard grid
- [ ] Refine typography scale

### **Phase 4: Backend Integration**
- [ ] Connect Supabase
- [ ] Replace mock data
- [ ] Add real auth
- [ ] Implement RLS policies

---

## 📊 **Current State Summary**

| Area | Status | Completeness |
|------|--------|--------------|
| Landing Page | ✅ Complete | 95% |
| Dashboard Layout | ⚠️ Functional | 70% |
| Search + Filters | ⚠️ Broken | 60% |
| Listing Cards | ✅ Complete | 80% |
| Auth System | ⚠️ Stub | 40% |
| Profile Page | ❌ Blank | 10% |
| Ledger Page | ❌ Blank | 10% |
| Supabase | ❌ Not connected | 0% |
| Badge System | ❌ Not started | 0% |
| Communal Aid | ❌ Not started | 0% |

---

## 💭 **Questions for Creative Direction**

Before we rebuild, let's clarify:

1. **Visual Style:**
   - Keep warm organic (cream/green/mustard)?
   - Or shift to modern minimal (white/black/accent)?
   - Or something else entirely?

2. **Layout Philosophy:**
   - Dense information (show everything)?
   - Or spacious minimal (breathe, focus)?
   - Card-based or list-based?

3. **Mobile Priority:**
   - Mobile-first rebuild?
   - Or desktop-first (current)?

4. **Component Strategy:**
   - Build from scratch (full control)?
   - Or use library (shadcn/ui, Radix)?

5. **Brand Voice:**
   - Professional + trustworthy?
   - Or warm + community-focused?
   - Or sacred + ceremonial (Heartlight style)?

---

**This document is our foundation.** Once we have clarity on creative direction, we can rebuild with intention rather than patching with desperation.

🕰️✨ What calls to you, Atlas?
