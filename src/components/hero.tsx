"use client";

import { motion } from "framer-motion";
import { SHOP } from "@/data/menu";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-24 md:pb-32">
      {/* Corner marks */}
      <div className="absolute top-20 left-5 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
        ✦ est. 2024 · F-11/1
      </div>
      <div className="absolute top-20 right-5 font-mono text-[10px] uppercase tracking-widest text-ink-soft text-right">
        {SHOP.rating}★ · {SHOP.reviewCount} reviews
      </div>

      {/* Massive wordmark */}
      <div className="flex-1 flex flex-col items-center justify-center relative pb-20 md:pb-24">
        {/* Sticker note */}
        <motion.div
          initial={{ rotate: -8, opacity: 0, y: -20 }}
          animate={{ rotate: -6, opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="hidden sm:block absolute top-6 right-8 md:right-24 bg-paper border-2 border-ink px-4 py-2 shadow-[4px_4px_0_0_var(--ink)]"
        >
          <p className="font-hand text-2xl leading-none">the real deal ↙</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-[22vw] md:text-[18rem] leading-[0.85] text-center"
        >
          TOSS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center max-w-2xl px-5 text-lg md:text-xl leading-snug"
        >
          No fluff, no fancy. <span className="font-hand text-2xl md:text-3xl text-sauce">Just real pizzas done right.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap gap-3 justify-center px-5"
        >
          <a
            href="#menu"
            className="bg-ink text-paper font-display text-xl px-6 py-3 hover:bg-sauce transition"
          >
            See the menu →
          </a>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="border-t-2 border-b-2 border-ink bg-ink text-paper overflow-hidden">
        <div className="flex whitespace-nowrap marquee py-3 font-display text-2xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span>TUE–SUN</span>
              <span className="text-sauce">✦</span>
              <span>5PM – 1AM</span>
              <span className="text-sauce">✦</span>
              <span>F-11/1 ISLAMABAD</span>
              <span className="text-sauce">✦</span>
              <span>0326-8677867</span>
              <span className="text-sauce">✦</span>
              <span>NEAPOLITAN</span>
              <span className="text-sauce">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
