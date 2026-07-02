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
    // Keep the cart in case WhatsApp fails to open; user can retry.
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
            <header className="flex items-center justify-between p-6 border-b-2 border-ink">
              <div>
                <h2 className="font-display text-3xl leading-none">Your order</h2>
                <p className="font-mono text-xs uppercase mt-1 text-ink-soft">
                  {lines.length === 0 ? "Empty — pick a pizza" : `${lines.length} item${lines.length > 1 ? "s" : ""}`}
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

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {lines.length === 0 ? (
                <p className="font-hand text-2xl text-ink-soft text-center mt-16">
                  nothing here yet<br />← go add a pizza
                </p>
              ) : (
                lines.map((l, i) => {
                  const lineTotal = l.qty * (l.price + l.addOns.reduce((a, o) => a + o.price, 0));
                  return (
                    <div key={i} className="border-2 border-ink bg-paper-warm p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <p className="font-display text-xl leading-tight">{l.name}</p>
                          {l.addOns.length > 0 && (
                            <p className="font-mono text-xs mt-1 text-ink-soft">
                              + {l.addOns.map((a) => a.name).join(", ")}
                            </p>
                          )}
                          {l.notes && <p className="font-hand text-lg mt-1">"{l.notes}"</p>}
                        </div>
                        <p className="font-mono text-sm">Rs {lineTotal}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setQty(i, l.qty - 1)}
                            className="w-8 h-8 border-2 border-ink font-mono hover:bg-ink hover:text-paper"
                          >
                            −
                          </button>
                          <span className="font-mono w-6 text-center">{l.qty}</span>
                          <button
                            onClick={() => setQty(i, l.qty + 1)}
                            className="w-8 h-8 border-2 border-ink font-mono hover:bg-ink hover:text-paper"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(i)}
                          className="font-mono text-xs uppercase underline underline-offset-4 hover:text-sauce"
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t-2 border-ink p-6 space-y-4 bg-paper">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="your name"
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="col-span-2 border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60"
                  />
                  <input
                    placeholder="phone number"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                    className="col-span-2 border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60"
                  />
                  <select
                    value={info.orderType}
                    onChange={(e) =>
                      setInfo({ ...info, orderType: e.target.value as "takeaway" | "dine-in" })
                    }
                    className="border-2 border-ink bg-paper px-3 py-2 font-mono text-sm"
                  >
                    <option value="takeaway">Takeaway</option>
                    <option value="dine-in">Dine-in</option>
                  </select>
                  <input
                    placeholder="pickup time (e.g. 8pm)"
                    value={info.time}
                    onChange={(e) => setInfo({ ...info, time: e.target.value })}
                    className="border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60"
                  />
                  <textarea
                    placeholder="notes for the kitchen (optional)"
                    value={info.notes}
                    onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                    rows={2}
                    className="col-span-2 border-2 border-ink bg-paper px-3 py-2 font-mono text-sm placeholder:text-ink-soft/60 resize-none"
                  />
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs uppercase text-ink-soft">Subtotal</span>
                  <span className="font-display text-2xl">Rs {subtotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout}
                  className="w-full bg-sauce text-paper font-display text-2xl py-4 border-2 border-ink hover:bg-ink hover:text-paper transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send order on WhatsApp →
                </button>
                <div className="flex justify-between">
                  <button
                    onClick={clear}
                    className="font-mono text-xs uppercase underline underline-offset-4 hover:text-sauce"
                  >
                    clear cart
                  </button>
                  <p className="font-mono text-xs text-ink-soft">
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
