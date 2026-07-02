"use client";

import { motion } from "framer-motion";

export function Story() {
  return (
    <section id="story" className="py-24 md:py-32 px-5 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">
            ✦ the story ✦
          </p>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9]">
            One oven.<br />
            Nine pizzas.<br />
            <span className="text-sauce">Zero shortcuts.</span>
          </h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed max-w-lg">
            <p>
              Toss started in a small shop in F-11/1 with one obsession — make the kind of
              Neapolitan pizza you'd find in a side-street in Naples. Not "inspired by."
              Not "our take on." The real thing.
            </p>
            <p>
              Fermented dough. San Marzano tomatoes cooked down into a marinara that
              reviewers say <span className="font-hand text-2xl text-sauce">screams flavour.</span>{" "}
              Fresh mozzarella. A wood-fired oven that turns each pie in about 90 seconds.
              Ten minutes from order to table.
            </p>
            <p className="font-mono text-sm text-ink-soft">
              Small shop. Small menu. Every pizza is the chef's special.
            </p>
          </div>
        </div>

        <div className="relative min-h-[400px] md:min-h-[520px]">
          {[
            { src: "/photos/pizza-1.jpg", rot: -6, top: "0%", left: "5%", z: 10 },
            { src: "/photos/pizza-2.jpg", rot: 5, top: "20%", left: "40%", z: 20 },
            { src: "/photos/pizza-3.jpg", rot: -3, top: "45%", left: "15%", z: 30 },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rot }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="absolute w-56 md:w-64 bg-paper border-2 border-ink p-3 shadow-[6px_6px_0_0_var(--ink)]"
              style={{ top: p.top, left: p.left, zIndex: p.z }}
            >
              <div className="aspect-square bg-paper-warm border border-ink/20 flex items-center justify-center text-ink-soft">
                <span className="font-hand text-3xl">pizza {i + 1}</span>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                ↳ from the oven, F-11
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
