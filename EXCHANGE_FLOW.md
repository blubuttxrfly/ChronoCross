# 🕰️ ChronoShare — Exchange Flow

## The Complete Lifecycle

### State Machine

```
OFFER/REQUEST (OPEN) → ACCEPTED (IN_PROGRESS) → COMPLETED → Time Transfer
```

---

## Database States

### 1. Listing Created (OPEN)
```sql
INSERT INTO listings (creator_id, type, title, duration_hours, status)
VALUES ('user-a-uuid', 'OFFER', 'Teach composting', 1, 'OPEN');

-- User A's balance: 1 hour (unchanged)
-- Nothing transferred yet
```

### 2. Listing Accepted (IN_PROGRESS)
```sql
UPDATE listings 
SET status = 'IN_PROGRESS'
WHERE id = 'listing-uuid';

-- Still no balance change
-- This is a "soft commit" — both parties agree to exchange
```

### 3. Listing Completed (COMPLETED) + Time Transfer
```sql
-- Mark listing complete
UPDATE listings 
SET status = 'COMPLETED'
WHERE id = 'listing-uuid';

-- Record the transaction
INSERT INTO transactions (provider_id, receiver_id, hours, listing_id)
VALUES ('user-a-uuid', 'user-b-uuid', 1, 'listing-uuid');

-- Transfer time credits (ATOMIC — both or neither)
UPDATE users 
SET time_balance = time_balance + 1 
WHERE id = 'user-a-uuid';  -- Provider earns

UPDATE users 
SET time_balance = time_balance - 1 
WHERE id = 'user-b-uuid';  -- Receiver spends

-- CONSTRAINT: time_balance >= 0
-- If User B has 0 hours, this fails — can't complete
```

---

## The Critical Question: When Does Transfer Happen?

### Option A: Automatic on Completion (Recommended)
**Who triggers:** The person who REQUESTED help (receiver)  
**When:** They click "Mark as Complete"  
**Why:** Receiver is the one who "spent" time, so they confirm receipt

**Flow:**
1. User A posts offer: "Teach composting (1 hour)"
2. User B accepts request
3. They meet + exchange happens
4. **User B clicks "Mark as Complete"** → triggers transfer
5. User A gets +1, User B gets -1

**Pros:**
- Receiver has skin in the game (they're spending)
- Prevents providers from unilaterally claiming hours
- Matches the "recipient confirms satisfaction" pattern

**Cons:**
- What if receiver forgets to click complete?
- Provider has done the work but hasn't been credited yet

---

### Option B: Either Party Can Complete
**Who triggers:** Either provider OR receiver  
**When:** Either clicks "Mark as Complete"  
**Why:** Flexibility, prevents stalemate

**Flow:** Same as above, but either user can trigger completion

**Pros:**
- No stalemate if one person disappears
- Faster resolution

**Cons:**
- Provider could mark complete without receiver's confirmation
- Potential for disputes ("I never received the help!")

---

### Option C: Mutual Confirmation (Most Sacred, Most Complex)
**Who triggers:** BOTH parties must confirm  
**When:** Provider clicks "I Provided" + Receiver clicks "I Received"  
**Why:** Full consent, both parties agree the exchange happened

**Flow:**
1. Exchange happens
2. Provider clicks "I Provided This"
3. Receiver clicks "I Received This"
4. **When both confirm** → transfer triggers automatically

**Pros:**
- Maximum trust + consent
- No disputes ("we both agreed this happened")
- Feels most sacred/reciprocal

**Cons:**
- More complex UI/state management
- What if one person never confirms? (need timeout/dispute flow)

---

## My Recommendation for 48-Hour Build

**Start with Option A (Receiver Completes)** — simplest, clearest ownership.

**Add a fallback:** If listing is IN_PROGRESS for >7 days, either party can complete.

**Database addition:**
```sql
ALTER TABLE listings ADD COLUMN accepted_at TIMESTAMP;
ALTER TABLE listings ADD COLUMN completed_at TIMESTAMP;

-- Add a view/query for stale exchanges:
SELECT * FROM listings 
WHERE status = 'IN_PROGRESS' 
  AND accepted_at < NOW() - INTERVAL '7 days';
```

---

## UI Flow (What the User Sees)

### For Provider (User A — Offering Help)

**Dashboard shows:**
```
Offers You've Posted:
- 🌱 Teach composting (1 hour) — OPEN
- ⚡ Solar panel help (2 hours) — IN_PROGRESS (waiting for Alex to confirm)
- 📚 Climate workshop (3 hours) — COMPLETED ✓ (+3 hours earned)

Your Balance: 4 hours
```

**Actions:**
- Can edit/delete OPEN offers
- Can message receiver on IN_PROGRESS exchanges
- Can't manually complete — must wait for receiver

---

### For Receiver (User B — Requesting Help)

**Dashboard shows:**
```
Requests You've Posted:
- 🛡️ Emergency prep help (2 hours) — OPEN

Offers You've Accepted:
- 🌱 Learn composting with Alex (1 hour) — IN_PROGRESS
  [Mark as Complete] ← Click this after exchange happens

Your Balance: 0 hours
```

**Actions:**
- Can browse + accept OPEN offers
- Can delete OPEN requests
- **Can complete IN_PROGRESS exchanges** (triggers transfer)
- Must have sufficient balance to accept (can't go negative)

---

## Balance Validation Logic

### Before Accepting an Offer:
```sql
-- Can User B accept a 1-hour offer?
SELECT time_balance FROM users WHERE id = 'user-b-uuid';

-- If balance >= 1 → allow accept
-- If balance < 1 → show error: "You need at least 1 hour to accept this offer"
```

### Edge Case: What If Balance Is 0?
- User can still POST OFFERS (earning potential)
- User can't ACCEPT OFFERS (can't spend)
- User gets 1 hour on signup, so this only happens after spending their initial hour

**Solution:** 
- Either require minimum 1 hour to participate
- Or allow "negative balance up to -2" as a trust buffer (more complex)

**For hackathon:** Keep it simple — can't accept if balance < duration.

---

## Dispute Resolution (Post-Hackathon Feature)

For now: **No disputes in MVP.** If an exchange goes wrong, users message each other and manually resolve.

**Future features:**
- Rating/review system (1–5 stars after completion)
- Dispute flag ("This exchange didn't happen")
- Admin/moderator intervention
- Timeout auto-complete (if IN_PROGRESS > 30 days, auto-cancel)

---

## The Sacred Energy (Kairos, Not Kronos)

Even though we're not saying this out loud, the exchange flow can carry the energy:

**Instead of:**
- "Transaction completed"
- "Balance updated"
- "You earned 1 hour"

**Use:**
- "Exchange complete. Gratitude shared."
- "Your community time: 4 hours"
- "You contributed 1 hour to Alex"

**The language shapes the energy.** Technical backend, sacred frontend.

---

## Questions for Your Team (8pm EST)

1. **Who should trigger completion?** (Receiver only, either party, or mutual?)
2. **What's the timeout for IN_PROGRESS exchanges?** (7 days? 30 days? Never?)
3. **Do we require minimum balance to accept?** (Yes = simpler, No = more complex validation)
4. **Do we want ratings/reviews in MVP?** (No = focus on core loop)

---

## What to Build First

**Saturday priority:**
1. Database trigger for time transfer (Ayaan + ockap)
2. "Mark as Complete" button (Atlas)
3. Balance display updates in real-time (Atlas + Supabase subscriptions)

**Test case:**
- User A posts offer (1 hour)
- User B accepts
- User B clicks complete
- User A: 1 → 2 hours
- User B: 1 → 0 hours
- Both see updated balances immediately

---

**This is the heart of ChronoShare.** Not the tracking, but the trust. The system encodes: "We believe you when you say the exchange happened."

What feels right to you, Atlas?
