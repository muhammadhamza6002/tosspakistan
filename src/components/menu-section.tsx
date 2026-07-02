"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { addOns, drinks, pizzas, starters, TAG_META, type MenuItem, type Tag } from "@/data/menu";
import { useCart } from "./cart-provider";

function Tags({ tags }: { tags?: Tag[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 ${TAG_META[t].color}`}
        >
          {TAG_META[t].label}
        </span>
      ))}
    </div>
  );
}

function PizzaCard({ item, index }: { item: MenuItem; index: number }) {
  const { add } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");

  const chosenAddOns = addOns.filter((a) => selectedAddOns.has(a.id));
  const totalPer = item.price + chosenAddOns.reduce((s, a) => s + a.price, 0);

  function handleAdd() {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      qty,
      addOns: chosenAddOns.map(({ id, name, price }) => ({ id, name, price })),
      notes: notes.trim() || undefined,
    });
    setExpanded(false);
    setQty(1);
    setSelectedAddOns(new Set());
    setNotes("");
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.08 }}
      className="border-2 border-ink bg-paper hover:bg-paper-warm transition-colors group"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-display text-4xl md:text-5xl leading-none">{item.name}</h3>
              <Tags tags={item.tags} />
            </div>
            <p className="mt-3 text-ink-soft leading-relaxed max-w-2xl">{item.desc}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-sauce rounded-full blur-md opacity-40 group-hover:opacity-60 transition" />
              <div className="relative bg-sauce text-paper font-display text-xl w-20 h-20 rounded-full flex items-center justify-center border-2 border-ink -rotate-6">
                {item.price}
              </div>
            </div>
            <p className="font-mono text-[10px] uppercase mt-1 text-ink-soft">Rs</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-5 font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-sauce"
        >
          {expanded ? "− close" : "+ add to order"}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 border-t-2 border-ink pt-6 space-y-4"
          >
            <div>
              <p className="font-mono text-xs uppercase mb-2">Add-ons</p>
              <div className="flex flex-wrap gap-2">
                {addOns.map((a) => {
                  const on = selectedAddOns.has(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => {
                        const next = new Set(selectedAddOns);
                        if (on) next.delete(a.id);
                        else next.add(a.id);
                        setSelectedAddOns(next);
                      }}
                      className={`font-mono text-xs px-3 py-1.5 border-2 border-ink transition ${
                        on ? "bg-ink text-paper" : "bg-paper hover:bg-paper-warm"
                      }`}
                    >
                      {a.name} <span className="text-ink-soft">+{a.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="notes (e.g. well done, no basil)"
              rows={2}
              className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm resize-none placeholder:text-ink-soft/60"
            />
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 border-2 border-ink font-mono hover:bg-ink hover:text-paper"
                >
                  −
                </button>
                <span className="font-mono w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 border-2 border-ink font-mono hover:bg-ink hover:text-paper"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 min-w-[200px] bg-sauce text-paper font-display text-xl px-6 py-3 border-2 border-ink hover:bg-ink transition"
              >
                Add {qty} · Rs {qty * totalPer}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function SimpleItem({ item }: { item: MenuItem }) {
  const { add } = useCart();
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink/40 pb-3">
      <div className="flex-1">
        <p className="font-display text-2xl leading-tight">{item.name}</p>
        <p className="text-sm text-ink-soft">{item.desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm">Rs {item.price}</span>
        <button
          onClick={() =>
            add({ id: item.id, name: item.name, price: item.price, addOns: [] })
          }
          className="font-mono text-xs uppercase underline underline-offset-4 hover:text-sauce"
        >
          add
        </button>
      </div>
    </div>
  );
}

export function MenuSection() {
  return (
    <section id="menu" className="py-24 md:py-32 px-5 bg-paper-warm border-y-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft mb-4">
            ✦ the menu ✦
          </p>
          <h2 className="font-display text-7xl md:text-9xl leading-none">
            eat<br />
            <span className="text-sauce">this.</span>
          </h2>
          <p className="font-hand text-2xl mt-4">↓ hover, tap, add — it's not complicated</p>
        </div>

        {/* Starters */}
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-widest mb-4">✦ starters</p>
          {starters.map((s) => (
            <SimpleItem key={s.id} item={s} />
          ))}
        </div>

        {/* Pizzas */}
        <p className="font-mono text-xs uppercase tracking-widest mb-4">✦ pizzas</p>
        <div className="grid gap-4">
          {pizzas.map((p, i) => (
            <PizzaCard key={p.id} item={p} index={i} />
          ))}
        </div>

        {/* Drinks */}
        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-widest mb-4">✦ drinks</p>
          <div className="space-y-3">
            {drinks.map((d) => (
              <SimpleItem key={d.id} item={d} />
            ))}
          </div>
        </div>

        <p className="mt-12 text-center font-mono text-xs uppercase tracking-widest text-ink-soft">
          prices exclusive of tax
        </p>
      </div>
    </section>
  );
}
