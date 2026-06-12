"use client";

import { ArrowDown } from "lucide-react";
import MountainVistaParallax from "@/components/ui/mountain-vista-bg";
import { Navbar } from "@/components/ui/navbar";
import { PrismaHero } from "@/components/ui/prisma-hero";

export function LandingPage() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing">
      <Navbar />
      <section className="landing-hero" aria-label="ChronoCross hero">
        <MountainVistaParallax title="ChronoCross" />
        <button
          type="button"
          onClick={scrollToAbout}
          className="scroll-hint"
          aria-label="Scroll to learn more"
        >
          <span>Discover how it works</span>
          <ArrowDown className="scroll-hint__icon" aria-hidden />
        </button>
      </section>

      <PrismaHero />
    </div>
  );
}
