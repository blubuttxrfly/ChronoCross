"use client";

import { motion } from "framer-motion";
import {
  Clock,
  Globe,
  Repeat,
  Wallet,
} from "lucide-react";

const INFO_BOXES = [
  {
    step: "01",
    title: "What it is",
    text: "A global community time bank where neighbors trade skills instead of cash.",
    icon: Globe,
  },
  {
    step: "02",
    title: "How it works",
    text: "Offer an hour of your time, earn a credit, and spend it when you need help.",
    icon: Repeat,
  },
  {
    step: "03",
    title: "Equal value",
    text: "One hour always equals one hour — every skill carries the same weight.",
    icon: Clock,
  },
  {
    step: "04",
    title: "Your ledger",
    text: "Track offers, requests, and balances as trust grows across the network.",
    icon: Wallet,
  },
];

function InfoBox({
  step,
  title,
  text,
  icon: Icon,
  index,
}: {
  step: string;
  title: string;
  text: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  index: number;
}) {
  return (
    <motion.article
      initial={{ y: 24, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.7,
        delay: 0.1 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="info-box"
    >
      <div className="info-box__header">
        <span className="info-box__icon">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <span className="info-box__step">{step}</span>
      </div>
      <h3 className="info-box__title">{title}</h3>
      <p className="info-box__text">{text}</p>
    </motion.article>
  );
}

const PrismaHero = () => {
  return (
    <section id="about" className="w-full px-2 pb-2 pt-2 sm:px-3 sm:pb-3">
      <div className="relative h-[100dvh] max-h-[920px] min-h-[640px] w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/85" />

        <div className="hero-bottom-panel">
          <div id="how-it-works" className="info-box-grid">
            {INFO_BOXES.map((box, i) => (
              <InfoBox key={box.title} {...box} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
