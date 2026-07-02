"use client";

import { motion } from "framer-motion";
import { reviews } from "@/data/reviews";
import { SHOP } from "@/data/menu";

const ROTATIONS = [-3, 2, -1, 3, -2, 1, -3, 2];

export function ReviewsWall() {
  return (
    <section id="reviews" className="py-24 md:py-32 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">
              ✦ real people, real reviews ✦
            </p>
            <h2 className="font-display text-6xl md:text-8xl leading-[0.9]">
              {SHOP.rating}<span className="text-sauce">★</span>
              <span className="font-hand text-3xl md:text-4xl ml-4 text-ink-soft">
                across {SHOP.reviewCount} Google reviews
              </span>
            </h2>
          </div>
          <a
            href={SHOP.googleMaps}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-sauce"
          >
            read all on Google →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="bg-paper border-2 border-ink p-6 shadow-[6px_6px_0_0_var(--ink)] hover:rotate-0 transition-transform"
            >
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-mono text-sauce">{"★".repeat(r.rating)}</span>
                <span className="font-mono text-[10px] uppercase text-ink-soft">{r.date}</span>
              </div>
              <p className="text-sm leading-relaxed">"{r.text}"</p>
              <p className="font-hand text-xl mt-4">— {r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
