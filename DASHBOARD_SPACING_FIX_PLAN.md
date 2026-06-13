# 🎨 ChronoCross Dashboard Spacing Fix — Game Plan

**Branch:** `atlas`  
**Goal:** Fix spacing/crowding issues in dashboard UIX for mobile + desktop  
**Reference Screenshot:** Mobile dashboard showing edge crowding, tight element gaps  
**Approach:** Incremental wave-by-wave builds with type-check gates ✅

---

## 📊 Current State (from screenshot + code audit)

### Visible Issues in Mobile View

| Issue | Location | Current | Target |
|-------|----------|---------|--------|
| **Container side padding** | Main wrapper | `px-6` (24px) | `px-8` (32px) mobile, `px-12` (48px) desktop |
| **Hero card internal padding** | Gradient hero box | `p-8` (32px) | `p-10` (40px) mobile, `p-14` (56px) desktop |
| **Hero h1 to subtitle gap** | Text flow | `mt-5` (20px) | `mt-6` (24px) |
| **Subtitle to search bar** | Vertical spacing | `mt-8` (32px) | `mt-12` (48px) |
| **Search bar to category pills** | Section gap | `mt-4` (16px) | `mt-6` (24px) |
| **Category pill gaps** | Between pills | `gap-2` (8px) | `gap-2.5` (10px) |
| **Section header margins** | Before each section | `mb-8` (32px) | `mb-10` (40px) mobile, `mb-12` (48px) desktop |
| **Category tile gaps** | Grid spacing | `gap-4` (16px) | `gap-5` (20px) |
| **Balance card padding** | Dark green card | `p-8` (32px) | Keep ✅ (already good) |
| **Trust card padding** | White card below balance | `p-8` (32px) | Keep ✅ (already good) |
| **Sidebar icon gaps** | Nav spacing | `gap-2` (8px) | `gap-3` (12px) |

---

## 🛠️ Implementation Waves

### **Wave 1: Container + Hero Section** (Highest Impact)

**Files:**
- `components/dashboard/dashboard-shell.tsx`
- `components/dashboard/dashboard-home.tsx`

**Changes:**

#### 1A. Dashboard Container Padding (`dashboard-shell.tsx` line 177)
```tsx
// BEFORE
<div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">

// AFTER
<div className="px-8 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-16">
```
**Why:** Mobile gets more side room (24px → 32px), desktop stays generous.

#### 1B. Hero Card Internal Padding (`dashboard-home.tsx` line 124)
```tsx
// BEFORE
<div className="relative rounded-3xl border border-[#e6dfd4] bg-gradient-to-br from-[#fbf7ef] to-[#f5f0e8] p-8 sm:p-10 lg:p-12 pb-8 sm:pb-10 shadow-sm">

// AFTER
<div className="relative rounded-3xl border border-[#e6dfd4] bg-gradient-to-br from-[#fbf7ef] to-[#f5f0e8] p-10 sm:p-12 lg:p-14 pb-10 sm:pb-12 shadow-sm">
```
**Why:** Text won't touch edges on mobile, more breathing room overall.

#### 1C. Hero Content Margins (`dashboard-home.tsx` lines 130-141)
```tsx
// BEFORE
<h1 className="mt-6 text-3xl sm:text-4xl ...">
<p className="mt-5 text-sm sm:text-base ...">
<div className="relative z-10 mt-10 sm:mt-12">

// AFTER
<h1 className="mt-7 text-3xl sm:text-4xl ...">
<p className="mt-6 text-sm sm:text-base ...">
<div className="relative z-10 mt-12 sm:mt-14">
```
**Why:** Better vertical rhythm, no crowding between badge → title → subtitle → search.

**✅ Type-check gate:** `npx tsc --noEmit`

---

### **Wave 2: Search + Category Pills**

**Files:**
- `components/app/marketplace-search.tsx`
- `components/dashboard/dashboard-home.tsx`

**Changes:**

#### 2A. Search Bar Internal Padding (`marketplace-search.tsx` lines 29-56)
```tsx
// BEFORE
<div className="flex h-[60px] items-center overflow-hidden rounded-full border border-[#d4cfc4] bg-white shadow-sm ...">
  <div className="flex h-full items-center pl-5 pr-3">
  <input ... className="... text-base ..." />
  <div className="pr-2">
    <button className="h-[44px] ... px-6 ...">

// AFTER
<div className="flex h-[60px] items-center overflow-hidden rounded-full border border-[#d4cfc4] bg-white shadow-sm ...">
  <div className="flex h-full items-center pl-6 pr-4">
  <input ... className="... text-base ..." />
  <div className="pr-3">
    <button className="h-[44px] ... px-7 ...">
```
**Why:** Search icon and button have more room, feels less cramped.

#### 2B. Category Pills Spacing (`marketplace-search.tsx` line 60)
```tsx
// BEFORE
<div className="mt-4 flex flex-wrap gap-2">

// AFTER
<div className="mt-6 flex flex-wrap gap-2.5">
```
**Why:** More separation from search bar (16px → 24px), better gap between pills (8px → 10px).

**✅ Type-check gate:** `npx tsc --noEmit`

---

### **Wave 3: Section Headers + Grid Spacing**

**Files:**
- `components/dashboard/dashboard-home.tsx`

**Changes:**

#### 3A. Section Header Margins (`dashboard-home.tsx` lines 59, 204, 217, 243, 257, 283)
```tsx
// BEFORE (SectionHeader component line 59)
<div className="mb-8 sm:mb-10 flex items-center justify-between gap-4">

// AFTER
<div className="mb-10 sm:mb-12 flex items-center justify-between gap-4">
```
**Why:** Each section breathes more before its content (32px → 40px mobile, 40px → 48px desktop).

#### 3B. Category Tile Grid Gap (`dashboard-home.tsx` line 209)
```tsx
// BEFORE
<div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6">

// AFTER
<div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6">
```
**Why:** Already good! ✅ No change needed.

#### 3C. Listing Cards Grid Gap (`dashboard-home.tsx` lines 223, 287)
```tsx
// BEFORE
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

// AFTER
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
```
**Why:** Already good! ✅ No change needed.

**✅ Type-check gate:** `npx tsc --noEmit`

---

### **Wave 4: Requests + Community Grid**

**Files:**
- `components/dashboard/dashboard-home.tsx`

**Changes:**

#### 4A. Two-Column Layout Gap (`dashboard-home.tsx` line 240)
```tsx
// BEFORE
<section className="mb-10 sm:mb-12 grid gap-10 lg:grid-cols-[1fr_360px]">

// AFTER
<section className="mb-10 sm:mb-12 grid gap-12 lg:grid-cols-[1fr_360px]">
```
**Why:** More separation between requests column and community column (40px → 48px).

#### 4B. Small Opportunity Card Gaps (`dashboard-home.tsx` lines 97, 248)
```tsx
// BEFORE (line 97 - SmallOpportunity component)
<Link className="flex items-center gap-4 rounded-2xl border ... p-5 ...">

// AFTER
<Link className="flex items-center gap-5 rounded-2xl border ... p-5 ...">
```
**Why:** Avatar and text have more horizontal room.

#### 4C. Community Member Row Gaps (`dashboard-home.tsx` line 263)
```tsx
// BEFORE
<Link className="flex items-center gap-3 rounded-2xl bg-white p-4 ...">

// AFTER
<Link className="flex items-center gap-4 rounded-2xl bg-white p-4 ...">
```
**Why:** Consistent with opportunity rows.

**✅ Type-check gate:** `npx tsc --noEmit`

---

### **Wave 5: Sidebar + Final Polish**

**Files:**
- `components/dashboard/dashboard-shell.tsx`

**Changes:**

#### 5A. Sidebar Nav Gap (`dashboard-shell.tsx` line 71)
```tsx
// BEFORE
<nav className="mt-8 flex flex-1 flex-col gap-2">

// AFTER
<nav className="mt-8 flex flex-1 flex-col gap-3">
```
**Why:** Nav items have more breathing room (8px → 12px).

#### 5B. Sidebar Icon Button Padding (`dashboard-shell.tsx` lines 76-92)
```tsx
// BEFORE
<Link className="dashboard-sidebar__item flex h-11 items-center gap-3 rounded-lg px-3 ...">

// AFTER
<Link className="dashboard-sidebar__item flex h-12 items-center gap-3 rounded-lg px-3 ...">
```
**Why:** Taller touch targets (44px → 48px), easier to tap on mobile.

**✅ Type-check gate:** `npx tsc --noEmit`

---

## 📋 Verification Checklist

After each wave, verify:

- [ ] **Type check passes:** `npx tsc --noEmit` returns no errors
- [ ] **Build succeeds:** `npm run build` completes without errors
- [ ] **Mobile view (375px):** Side padding visible, no text touches edges
- [ ] **Desktop view (1440px):** Generous whitespace, balanced layout
- [ ] **Touch targets:** All buttons 44px+ height
- [ ] **Visual flow:** Elements have clear visual hierarchy

---

## 🎯 Success Criteria

**After all waves complete:**

1. ✅ No text touches any container edge (minimum 32px padding mobile, 48px desktop)
2. ✅ Section headers have 40-48px margins before content
3. ✅ Related elements have 16-24px gaps
4. ✅ Unrelated sections have 40-48px separation
5. ✅ Sidebar icons have 48px+ touch targets with 12px gaps
6. ✅ Search bar feels spacious with 24px+ internal padding
7. ✅ Hero card has 40-56px internal padding
8. ✅ Mobile and desktop both feel ergonomic + balanced

---

## 🚀 Execution Order

1. **Start Wave 1** → Type check → Review screenshot → Continue
2. **Start Wave 2** → Type check → Review screenshot → Continue
3. **Start Wave 3** → Type check → Review screenshot → Continue
4. **Start Wave 4** → Type check → Review screenshot → Continue
5. **Start Wave 5** → Type check → Final review → Done!

**Estimated time:** 15-20 minutes total (3-4 min per wave + review)

---

## 📝 Notes

- **Incremental approach:** Each wave is independent, can stop/review between waves
- **No copy changes:** This plan only touches spacing/padding, no text rewording
- **Mobile-first:** All changes prioritize mobile ergonomics, desktop scales up
- **Warm organic feel:** Maintains the cream/green/mustard palette, just adds breathing room

---

**Ready to begin Wave 1, Atlas!** 🎨✨
