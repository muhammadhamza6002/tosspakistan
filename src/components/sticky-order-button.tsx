"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";

export function StickyOrderButton() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);
      // Hide when within ~180px of the bottom of the page (footer zone)
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setNearFooter(scrollBottom > docHeight - 180);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const visible = (scrolled || count > 0) && !nearFooter;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 220 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 group"
        >
          <div className="relative bg-sauce text-paper border-2 border-ink px-5 py-4 font-display text-lg flex items-center gap-3 shadow-[6px_6px_0_0_var(--ink)] hover:shadow-[3px_3px_0_0_var(--ink)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all">
            <span>{count > 0 ? "Cart" : "Order"}</span>
            {count > 0 && (
              <span className="bg-paper text-ink font-mono text-sm px-2 py-0.5 border-2 border-ink">
                {count}
              </span>
            )}
            <span aria-hidden>→</span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
