"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Exchange", href: "#exchange" },
  { label: "Community", href: "#community" },
  { label: "Ledger", href: "#ledger" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={`navbar${isScrolled ? " navbar--scrolled" : ""}`}
      role="banner"
    >
      <div className="navbar__inner">
        <a href="/" className="navbar__brand" aria-label="ChronoCross home">
          <span className="navbar__logo" aria-hidden>
            <Clock size={18} strokeWidth={2} />
          </span>
          <span className="navbar__wordmark">ChronoCross</span>
        </a>

        <nav className="navbar__links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="navbar__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href="/auth" className="navbar__cta">
            Join the bank
          </a>

          <button
            type="button"
            className="navbar__menu-btn"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            className="navbar__mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav
              className="navbar__mobile-nav"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="navbar__mobile-link"
                  onClick={closeMobile}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="/auth"
                className="navbar__mobile-cta"
                onClick={closeMobile}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.24 }}
              >
                Join the bank
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
