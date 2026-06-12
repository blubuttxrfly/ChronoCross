"use client";

import { useState, useEffect } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "LEDGER" | "BOARD" | "CREATE";
type Category = "ALL" | "TECH" | "HOME" | "LEARN";
type ListingType = "OFFER" | "REQUEST";

interface Listing {
  id: string;
  title: string;
  description: string;
  hours: number;
  category: Exclude<Category, "ALL">;
  type: ListingType;
  user: string;
  timestamp: string;
}

// ── Brand colors (single source of truth) ────────────────────────────────────

const C = {
  bg: "#0B1120",
  teal: "#0F766E",
  black: "#000000",
  gold: "#FBBF24",
  cyan: "#22D3EE",
  white: "#FFFFFF",
  green: "#A3FFB0",
  dim: "#1a2a1a",
} as const;

// ── Mock data ─────────────────────────────────────────────────────────────────

const SEED_LISTINGS: Listing[] = [
  {
    id: "001",
    title: "SETUP HOME ROUTER",
    description:
      "Configure WPA3 security, set static IPs, enable guest network. Must bring own laptop.",
    hours: 1.0,
    category: "TECH",
    type: "REQUEST",
    user: "NODE_042",
    timestamp: "2026-06-12",
  },
  {
    id: "002",
    title: "GARDEN WEEDING",
    description:
      "Clear weeds from 20sqm vegetable bed. Tools provided on-site. Morning preferred.",
    hours: 2.0,
    category: "HOME",
    type: "REQUEST",
    user: "PILOT_118",
    timestamp: "2026-06-11",
  },
  {
    id: "003",
    title: "PYTHON TUTORING",
    description:
      "Basics → intermediate. Lists, dicts, functions, file I/O. Video call or in-person.",
    hours: 1.0,
    category: "LEARN",
    type: "OFFER",
    user: "SHARD_007",
    timestamp: "2026-06-11",
  },
  {
    id: "004",
    title: "LAPTOP DIAGNOSTICS",
    description:
      "Full malware scan, driver audit, thermal check, SSD health report. Remote or on-site.",
    hours: 1.5,
    category: "TECH",
    type: "OFFER",
    user: "NODE_091",
    timestamp: "2026-06-10",
  },
  {
    id: "005",
    title: "SPANISH CONVERSATION",
    description:
      "Travel-focused vocabulary, present + past tense. Beginner-friendly. Video call.",
    hours: 1.0,
    category: "LEARN",
    type: "OFFER",
    user: "PILOT_033",
    timestamp: "2026-06-10",
  },
  {
    id: "006",
    title: "FURNITURE MOVE",
    description:
      "3 large items: desk, bookshelf, wardrobe. Ground floor only. 2 people needed.",
    hours: 2.0,
    category: "HOME",
    type: "REQUEST",
    user: "SHARD_214",
    timestamp: "2026-06-09",
  },
  {
    id: "007",
    title: "CSV DATA CLEANING",
    description:
      "500 rows. Dedup, normalize dates, fix encoding. Excel or Google Sheets acceptable.",
    hours: 1.5,
    category: "TECH",
    type: "REQUEST",
    user: "NODE_007",
    timestamp: "2026-06-09",
  },
  {
    id: "008",
    title: "SOURDOUGH STARTER",
    description:
      "Teaching starter maintenance, hydration ratios, bake schedule. In-person only.",
    hours: 1.0,
    category: "HOME",
    type: "OFFER",
    user: "PILOT_091",
    timestamp: "2026-06-08",
  },
];

// ── Utility ───────────────────────────────────────────────────────────────────

function fmtHrs(h: number) {
  return `${h.toFixed(1)} HR`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PressButton({
  children,
  onClick,
  disabled,
  style,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "inherit",
        cursor: disabled ? "not-allowed" : "pointer",
        filter: pressed && !disabled ? "invert(1)" : "none",
        border: "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function RecordRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        fontSize: 11,
        lineHeight: "1.5",
        fontFamily: "inherit",
      }}
    >
      <span
        style={{
          color: C.gold,
          letterSpacing: "0.06em",
          minWidth: 52,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span style={{ color: C.cyan, flexShrink: 0 }}>:</span>
      <span
        style={{
          color: valueColor ?? C.green,
          letterSpacing: "0.03em",
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Top Header ────────────────────────────────────────────────────────────────

function TopHeader({ tab }: { tab: Tab }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toISOString().slice(0, 19).replace("T", " "));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const subline: Record<Tab, string> = {
    LEDGER: "GLOBAL TIME EXCHANGE",
    BOARD: "COMMUNITY LISTINGS",
    CREATE: "NEW_LISTING_FORM",
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: C.teal,
        borderBottom: `3px solid ${C.gold}`,
      }}
    >
      {/* Main header row */}
      <div
        style={{
          padding: "8px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: C.white,
              letterSpacing: "0.07em",
            }}
          >
            CHRONOSHARE_OS
          </div>
          <div
            style={{
              fontSize: 9,
              color: C.green,
              letterSpacing: "0.14em",
              marginTop: 2,
            }}
          >
            {subline[tab]}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 8, color: C.green, letterSpacing: "0.1em" }}>
            SYS_TIME
          </div>
          <div
            style={{ fontSize: 10, color: C.cyan, fontWeight: 700, marginTop: 1 }}
          >
            {time || "-------- --:--:--"}
          </div>
        </div>
      </div>
      {/* Status bar */}
      <div
        style={{
          background: C.black,
          borderTop: `1px solid ${C.gold}`,
          padding: "3px 12px",
          fontSize: 9,
          color: C.gold,
          letterSpacing: "0.07em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>◈ {tab}_SCREEN</span>
        <span>NET:ONLINE ── NODES:1,247</span>
      </div>
    </div>
  );
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────

function BottomNav({
  active,
  onSelect,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
}) {
  const tabs: Tab[] = ["LEDGER", "BOARD", "CREATE"];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 480,
        borderTop: `3px solid ${C.gold}`,
        display: "flex",
        zIndex: 100,
      }}
    >
      {tabs.map((tab, i) => (
        <PressButton
          key={tab}
          onClick={() => onSelect(tab)}
          style={{
            flex: 1,
            padding: "14px 4px",
            background: active === tab ? C.cyan : C.black,
            color: active === tab ? C.black : C.cyan,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            borderRight:
              i < tabs.length - 1 ? `2px solid ${C.gold}` : "none",
            borderTop: "none",
            borderBottom: "none",
            borderLeft: "none",
          }}
        >
          {tab}
        </PressButton>
      ))}
    </div>
  );
}

// ── SCREEN 01 — LEDGER ────────────────────────────────────────────────────────

function LedgerScreen({
  balance,
  listings,
  onOffer,
  onRequest,
}: {
  balance: number;
  listings: Listing[];
  onOffer: () => void;
  onRequest: () => void;
}) {
  const myListings = listings.filter((l) => l.user === "PILOT_001");

  return (
    <div>
      {/* Balance slot */}
      <div
        style={{
          margin: "12px 12px 0",
          border: `2px solid ${C.gold}`,
        }}
      >
        <div
          style={{
            background: C.teal,
            borderBottom: `2px solid ${C.gold}`,
            padding: "5px 10px",
            fontSize: 9,
            letterSpacing: "0.1em",
            color: C.white,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>TIME_BALANCE ── SLOT_001</span>
          <span style={{ color: C.green }}>▸ ACTIVE</span>
        </div>
        <div
          style={{
            background: C.black,
            padding: "20px 12px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: C.cyan,
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            {balance.toFixed(1)}
          </div>
          <div
            style={{
              fontSize: 13,
              color: C.green,
              letterSpacing: "0.18em",
              marginTop: 6,
            }}
          >
            HRS
          </div>
          <div
            style={{
              fontSize: 9,
              color: C.gold,
              letterSpacing: "0.08em",
              marginTop: 10,
            }}
          >
            ACCOUNT : PILOT_001
          </div>
        </div>
        <div
          style={{
            background: C.teal,
            borderTop: `2px solid ${C.gold}`,
            padding: "4px 10px",
            fontSize: 9,
            color: C.green,
            letterSpacing: "0.08em",
          }}
        >
          LAST_SYNC : 2026-06-12T14:32:00Z
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          margin: "8px 12px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          border: `2px solid ${C.gold}`,
          background: C.black,
        }}
      >
        {[
          { label: "OFFERED", val: "3" },
          { label: "RECEIVED", val: "2" },
          { label: "PENDING", val: myListings.length.toString() },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "10px 6px",
              textAlign: "center",
              borderRight: i < 2 ? `1px solid ${C.gold}` : "none",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: C.cyan }}>
              {s.val}
            </div>
            <div
              style={{
                fontSize: 8,
                color: C.green,
                letterSpacing: "0.1em",
                marginTop: 3,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div
        style={{ margin: "8px 12px 0", display: "flex", flexDirection: "column", gap: 6 }}
      >
        <PressButton
          onClick={onOffer}
          style={{
            width: "100%",
            minHeight: 60,
            padding: "16px 14px",
            background: C.teal,
            color: C.white,
            border: `3px solid ${C.gold}`,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textAlign: "left" as const,
          }}
        >
          ▸ OFFER_TIME
        </PressButton>
        <PressButton
          onClick={onRequest}
          style={{
            width: "100%",
            minHeight: 60,
            padding: "16px 14px",
            background: C.black,
            color: C.cyan,
            border: `3px solid ${C.cyan}`,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textAlign: "left" as const,
          }}
        >
          ▸ REQ_TIME
        </PressButton>
      </div>

      {/* Recent activity */}
      <div
        style={{
          margin: "12px 12px 0",
          background: C.teal,
          border: `2px solid ${C.gold}`,
          padding: "5px 10px",
          fontSize: 9,
          letterSpacing: "0.1em",
          color: C.white,
        }}
      >
        ── RECENT_ACTIVITY ─────────────────────────────
      </div>

      {myListings.length === 0 ? (
        <div
          style={{
            margin: "0 12px",
            border: `2px solid ${C.gold}`,
            borderTop: "none",
            padding: 20,
            textAlign: "center",
            color: C.green,
            fontSize: 10,
            letterSpacing: "0.1em",
          }}
        >
          NO_RECORDS :: POST A LISTING TO BEGIN
        </div>
      ) : (
        myListings.map((l) => (
          <div
            key={l.id}
            style={{
              margin: "0 12px",
              border: `2px solid ${C.gold}`,
              borderTop: "none",
              padding: "8px 10px",
              background: C.black,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: C.white,
                  letterSpacing: "0.04em",
                  fontWeight: 700,
                }}
              >
                {l.title}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: C.green,
                  letterSpacing: "0.07em",
                  marginTop: 3,
                }}
              >
                {l.category} ── {fmtHrs(l.hours)} ──{" "}
                <span
                  style={{
                    color: l.type === "OFFER" ? C.cyan : C.gold,
                  }}
                >
                  {l.type}
                </span>
              </div>
            </div>
            <div
              style={{ fontSize: 9, color: C.gold, letterSpacing: "0.06em", flexShrink: 0, marginLeft: 8 }}
            >
              {l.timestamp}
            </div>
          </div>
        ))
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}

// ── SCREEN 02 — GLOBAL BOARD ──────────────────────────────────────────────────

function BoardScreen({
  listings,
  balance,
  onAccept,
}: {
  listings: Listing[];
  balance: number;
  onAccept: (l: Listing) => void;
}) {
  const [cat, setCat] = useState<Category>("ALL");
  const CATS: Category[] = ["ALL", "TECH", "HOME", "LEARN"];

  const visible =
    cat === "ALL" ? listings : listings.filter((l) => l.category === cat);

  return (
    <div>
      {/* Category strip */}
      <div
        style={{
          display: "flex",
          background: C.black,
          borderBottom: `2px solid ${C.gold}`,
        }}
      >
        {CATS.map((c, i) => (
          <PressButton
            key={c}
            onClick={() => setCat(c)}
            style={{
              flex: 1,
              padding: "10px 4px",
              background: cat === c ? C.cyan : C.black,
              color: cat === c ? C.black : C.cyan,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.07em",
              borderRight: i < CATS.length - 1 ? `1px solid ${C.gold}` : "none",
              borderTop: "none",
              borderBottom: "none",
              borderLeft: "none",
            }}
          >
            {c}
          </PressButton>
        ))}
      </div>

      {/* Record count */}
      <div
        style={{
          background: C.teal,
          borderBottom: `2px solid ${C.gold}`,
          padding: "4px 12px",
          fontSize: 9,
          color: C.green,
          letterSpacing: "0.08em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          RECORDS : {visible.length} ── FILTER : {cat}
        </span>
        <span>SORTED : DATE_DESC</span>
      </div>

      {/* Listings */}
      <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.length === 0 ? (
          <div
            style={{
              border: `2px solid ${C.gold}`,
              padding: 24,
              textAlign: "center",
              color: C.green,
              fontSize: 11,
              letterSpacing: "0.1em",
            }}
          >
            NO_RECORDS :: CAT={cat}
          </div>
        ) : (
          visible.map((l) => {
            const isOwn = l.user === "PILOT_001";
            const canAccept = !isOwn && balance >= l.hours;
            return (
              <div
                key={l.id}
                style={{
                  border: `2px solid ${C.gold}`,
                  background: C.black,
                }}
              >
                {/* Record header bar */}
                <div
                  style={{
                    background: C.teal,
                    borderBottom: `2px solid ${C.gold}`,
                    padding: "4px 8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      color: isOwn ? C.gold : C.green,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {isOwn ? "▸ YOUR_LISTING" : l.user}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: l.type === "OFFER" ? C.cyan : C.gold,
                      letterSpacing: "0.1em",
                    }}
                  >
                    {l.type}
                  </span>
                </div>

                {/* Fields */}
                <div
                  style={{
                    padding: "8px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <RecordRow label="TITLE" value={l.title} valueColor={C.white} />
                  <RecordRow label="REQ  " value={fmtHrs(l.hours)} />
                  <RecordRow label="TYPE " value={l.category} />
                  <RecordRow label="DATE " value={l.timestamp} />
                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 10,
                      color: "#4a6a4a",
                      lineHeight: "1.5",
                      fontStyle: "italic",
                    }}
                  >
                    {l.description}
                  </div>
                </div>

                {/* Accept button */}
                <PressButton
                  onClick={() => onAccept(l)}
                  disabled={!canAccept}
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: isOwn
                      ? "#111"
                      : canAccept
                      ? C.teal
                      : "#111",
                    color: isOwn
                      ? "#333"
                      : canAccept
                      ? C.white
                      : "#444",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    borderTop: `2px solid ${C.gold}`,
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                  }}
                >
                  {isOwn
                    ? "── YOUR_OWN_LISTING"
                    : canAccept
                    ? "▸ ACCEPT"
                    : "── INSUFFICIENT_BALANCE"}
                </PressButton>
              </div>
            );
          })
        )}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

// ── SCREEN 03 — CREATE LISTING ────────────────────────────────────────────────

function CreateScreen({
  initialType,
  onSubmit,
}: {
  initialType: ListingType;
  onSubmit: (data: Omit<Listing, "id" | "user" | "timestamp">) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Exclude<Category, "ALL">>("TECH");
  const [hours, setHours] = useState(1.0);
  const [type, setType] = useState<ListingType>(initialType);
  const [done, setDone] = useState(false);

  const HOUR_STEPS = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0];
  const CATS: Exclude<Category, "ALL">[] = ["TECH", "HOME", "LEARN"];

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      title: title.trim().toUpperCase(),
      description: description.trim(),
      hours,
      category,
      type,
    });
    setTitle("");
    setDescription("");
    setHours(1.0);
    setDone(true);
  };

  if (done) {
    return (
      <div
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div style={{ fontSize: 48, color: C.cyan }}>■</div>
        <div
          style={{
            fontSize: 14,
            color: C.green,
            letterSpacing: "0.12em",
            fontWeight: 700,
          }}
        >
          LISTING_INITIALIZED
        </div>
        <div
          style={{
            fontSize: 9,
            color: C.gold,
            letterSpacing: "0.1em",
          }}
        >
          RECORD COMMITTED TO GLOBAL BOARD
        </div>
      </div>
    );
  }

  const fieldLabel: React.CSSProperties = {
    display: "block",
    fontSize: 9,
    color: C.green,
    letterSpacing: "0.12em",
    marginBottom: 4,
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: `2px solid ${C.gold}`,
    padding: "10px",
    color: C.white,
    fontSize: 13,
    fontFamily: "inherit",
    outline: "none",
  };

  const stepIdx = HOUR_STEPS.indexOf(hours);

  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Listing type selector */}
      <div>
        <span style={fieldLabel}>LISTING_TYPE</span>
        <div style={{ display: "flex" }}>
          {(["OFFER", "REQUEST"] as ListingType[]).map((t, i) => (
            <PressButton
              key={t}
              onClick={() => setType(t)}
              style={{
                flex: 1,
                padding: "12px",
                background: type === t ? C.cyan : "transparent",
                color: type === t ? C.black : C.cyan,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                border: `2px solid ${C.cyan}`,
                borderLeft: i === 1 ? "none" : `2px solid ${C.cyan}`,
                borderRight: `2px solid ${C.cyan}`,
                borderTop: `2px solid ${C.cyan}`,
                borderBottom: `2px solid ${C.cyan}`,
              }}
            >
              {t}
            </PressButton>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <span style={fieldLabel}>TITLE</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="LISTING_TITLE_"
          maxLength={48}
          style={inputBase}
        />
      </div>

      {/* Description */}
      <div>
        <span style={fieldLabel}>DESCRIPTION</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="DETAILS_AND_REQUIREMENTS_"
          rows={3}
          style={{
            ...inputBase,
            resize: "vertical",
            minHeight: 80,
          }}
        />
      </div>

      {/* Category */}
      <div>
        <span style={fieldLabel}>CATEGORY</span>
        <div style={{ display: "flex" }}>
          {CATS.map((c, i) => (
            <PressButton
              key={c}
              onClick={() => setCategory(c)}
              style={{
                flex: 1,
                padding: "11px",
                background: category === c ? C.gold : "transparent",
                color: category === c ? C.black : C.gold,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.09em",
                border: `2px solid ${C.gold}`,
                borderLeft: i > 0 ? "none" : `2px solid ${C.gold}`,
                borderRight: `2px solid ${C.gold}`,
                borderTop: `2px solid ${C.gold}`,
                borderBottom: `2px solid ${C.gold}`,
              }}
            >
              {c}
            </PressButton>
          ))}
        </div>
      </div>

      {/* Duration stepper */}
      <div>
        <span style={fieldLabel}>DURATION</span>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            border: `2px solid ${C.gold}`,
          }}
        >
          <PressButton
            onClick={() => stepIdx > 0 && setHours(HOUR_STEPS[stepIdx - 1])}
            disabled={stepIdx === 0}
            style={{
              padding: "12px 18px",
              background: stepIdx === 0 ? "#111" : C.teal,
              color: stepIdx === 0 ? "#333" : C.white,
              fontSize: 16,
              fontWeight: 700,
              borderTop: "none",
              borderBottom: "none",
              borderLeft: "none",
              borderRight: `2px solid ${C.gold}`,
            }}
          >
            ◀
          </PressButton>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
              color: C.cyan,
              letterSpacing: "0.05em",
              background: C.black,
            }}
          >
            {hours.toFixed(1)} HR
          </div>
          <PressButton
            onClick={() =>
              stepIdx < HOUR_STEPS.length - 1 &&
              setHours(HOUR_STEPS[stepIdx + 1])
            }
            disabled={stepIdx === HOUR_STEPS.length - 1}
            style={{
              padding: "12px 18px",
              background:
                stepIdx === HOUR_STEPS.length - 1 ? "#111" : C.teal,
              color:
                stepIdx === HOUR_STEPS.length - 1 ? "#333" : C.white,
              fontSize: 16,
              fontWeight: 700,
              borderTop: "none",
              borderBottom: "none",
              borderRight: "none",
              borderLeft: `2px solid ${C.gold}`,
            }}
          >
            ▶
          </PressButton>
        </div>
      </div>

      {/* Submit */}
      <PressButton
        onClick={handleSubmit}
        disabled={!title.trim()}
        style={{
          width: "100%",
          padding: "18px",
          background: title.trim() ? C.teal : "transparent",
          color: title.trim() ? C.white : "#333",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "0.14em",
          border: `3px solid ${title.trim() ? C.cyan : "#333"}`,
          marginTop: 4,
        }}
      >
        ▸ INITIALIZE
      </PressButton>

      <div style={{ height: 20 }} />
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<Tab>("LEDGER");
  const [balance, setBalance] = useState(1.0);
  const [listings, setListings] = useState<Listing[]>(SEED_LISTINGS);
  const [createType, setCreateType] = useState<ListingType>("OFFER");

  const goCreate = (t: ListingType) => {
    setCreateType(t);
    setTab("CREATE");
  };

  const handleAccept = (l: Listing) => {
    if (balance < l.hours || l.user === "PILOT_001") return;
    setBalance((b) => parseFloat((b - l.hours).toFixed(1)));
    setListings((prev) => prev.filter((x) => x.id !== l.id));
  };

  const handleCreate = (
    data: Omit<Listing, "id" | "user" | "timestamp">
  ) => {
    const entry: Listing = {
      ...data,
      id: String(Date.now()),
      user: "PILOT_001",
      timestamp: new Date().toISOString().slice(0, 10),
    };
    setListings((prev) => [entry, ...prev]);
    setTimeout(() => setTab("BOARD"), 1400);
  };

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100dvh",
        maxWidth: 480,
        margin: "0 auto",
        fontFamily: "var(--font-space-mono), 'Courier New', monospace",
        position: "relative",
      }}
    >
      <TopHeader tab={tab} />

      <div style={{ paddingBottom: 66 }}>
        {tab === "LEDGER" && (
          <LedgerScreen
            balance={balance}
            listings={listings}
            onOffer={() => goCreate("OFFER")}
            onRequest={() => goCreate("REQUEST")}
          />
        )}
        {tab === "BOARD" && (
          <BoardScreen
            listings={listings}
            balance={balance}
            onAccept={handleAccept}
          />
        )}
        {tab === "CREATE" && (
          <CreateScreen initialType={createType} onSubmit={handleCreate} />
        )}
      </div>

      <BottomNav active={tab} onSelect={setTab} />
    </div>
  );
}
