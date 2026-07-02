"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { buildWhatsAppMessage, type CheckoutInfo } from "@/lib/whatsapp";
import { SHOP } from "@/data/menu";

export function CartDrawer() {
  const { lines, open, setOpen, subtotal, setQty, remove, clear } = useCart();
  const [info, setInfo] = useState<CheckoutInfo>({
    name: "",
    phone: "",
    orderType: "takeaway",
    time: "",
    notes: "",
  });

  const canCheckout = lines.length > 0 && info.name.trim() && info.phone.trim();

  function handleCheckout() {
    if (!canCheckout) return;
    const url = buildWhatsAppMessage(lines, info, subtotal);
    window.open(url, "_blank");
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-paper border-l-2 border-ink flex flex-col"
          >
            {/* Sticky header */}
            <header className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b-2 border-ink bg-paper">
              <div>
                <h2 className="font-display text-2xl leading-none">Your order</h2>
                <p className="font-mono text-[10px] uppercase mt-1 text-ink-soft tracking-widest">
                  {lines.length === 0
                    ? "Empty — pick a pizza"
                    : `${lines.length} item${lines.length > 1 ? "s" : ""} · Rs ${subtotal}`}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-3xl leading-none hover:rotate-90 transition-transform"
                aria-label="Close"
              >
                ×
              </button>
            </header>

            {/* One scrollable region — items + form together */}
            <div className="flex-1 overflow-y-auto">
              {lines.length === 0 ? (
                <p className="font-hand text-2xl text-ink-soft text-center mt-24 px-6">
                  nothing here yet<br />← go add a pizza
                </p>
              ) : (
                <>
                  <div className="px-5 py-4 space-y-3">
                    {lines.map((l, i) => {
                      const lineTotal =
                        l.qty * (l.price + l.addOns.reduce((a, o) => a + o.price, 0));
                      return (
                        <div
                          key={i}
                          className="border-2 border-ink bg-paper-warm p-3"
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-display text-lg leading-tight truncate">
                                {l.name}
                              </p>
                              {l.addOns.length > 0 && (
                                <p className="font-mono text-[10px] mt-1 text-ink-soft leading-snug">
                                  + {l.addOns.map((a) => a.name).join(", ")}
                                </p>
                              )}
                              {l.notes && (
                                <p className="font-hand text-base mt-1 leading-snug">
                                  &ldquo;{l.notes}&rdquo;
                                </p>
                              )}
                            </div>
                            <p className="font-mono text-sm flex-shrink-0">Rs {lineTotal}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setQty(i, l.qty - 1)}
                                className="w-7 h-7 border-2 border-ink font-mono text-sm hover:bg-ink hover:text-paper"
                              >
                                −
                              </button>
                              <span className="font-mono w-6 text-center text-sm">{l.qty}</span>
                              <button
                                onClick={() => setQty(i, l.qty + 1)}
                                className="w-7 h-7 border-2 border-ink font-mono text-sm hover:bg-ink hover:text-paper"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => remove(i)}
                              className="font-mono text-[10px] uppercase underline underline-offset-4 hover:text-sauce tracking-widest"
                            >
                              remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Form — inline in the scroll, tight spacing */}
                  <div className="border-t-2 border-ink px-5 py-4 space-y-3 bg-paper">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                      ✦ your details
                    </p>
                    <input
                      placeholder="your name"
                      value={info.name}
                      onChange={(e) => setInfo({ ...info, name: e.target.value })}
                      className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60"
                    />
                    <input
                      placeholder="phone number"
                      value={info.phone}
                      onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                      className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={info.orderType}
                        onChange={(e) =>
                          setInfo({
                            ...info,
                            orderType: e.target.value as "takeaway" | "dine-in",
                          })
                        }
                        className="border-2 border-ink bg-paper px-3 py-2 font-mono text-sm"
                      >
                        <option value="takeaway">Takeaway</option>
                        <option value="dine-in">Dine-in</option>
                      </select>
                      <input
                        placeholder="time (e.g. 8pm)"
                        value={info.time}
                        onChange={(e) => setInfo({ ...info, time: e.target.value })}
                        className="border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60"
                      />
                    </div>
                    <textarea
                      placeholder="notes for the kitchen (optional)"
                      value={info.notes}
                      onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                      rows={2}
                      className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60 resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Sticky footer with CTA */}
            {lines.length > 0 && (
              <div className="flex-shrink-0 border-t-2 border-ink px-5 py-4 space-y-3 bg-paper">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl">Rs {subtotal}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout}
                  className="w-full bg-sauce text-paper font-display text-xl py-3 border-2 border-ink hover:bg-ink hover:text-paper transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send order on WhatsApp →
                </button>
                <div className="flex justify-between items-center">
                  <button
                    onClick={clear}
                    className="font-mono text-[10px] uppercase underline underline-offset-4 hover:text-sauce tracking-widest"
                  >
                    clear cart
                  </button>
                  <p className="font-mono text-[10px] text-ink-soft tracking-widest">
                    Cash on pickup · {SHOP.rating}★
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
