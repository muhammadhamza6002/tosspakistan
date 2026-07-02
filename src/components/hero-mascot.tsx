"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Renders the Toss mascot from /mascot.png if the file exists in public/.
 * If it doesn't exist, renders nothing — so the hero stays clean until
 * the real profile picture is dropped in.
 */
export function HeroMascot() {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/mascot.png", { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setExists(r.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!exists) return null;

  return (
    <>
      {/* Desktop — right side, next to the wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="hidden md:block absolute right-3 lg:right-8 top-28 lg:top-32 w-36 lg:w-48 z-20 pointer-events-none"
      >
        <img
          src="/mascot.png"
          alt=""
          aria-hidden
          className="w-full h-auto select-none"
          draggable={false}
        />
      </motion.div>

      {/* Mobile — smaller, bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="md:hidden absolute bottom-28 left-3 w-24 z-20 pointer-events-none"
      >
        <img
          src="/mascot.png"
          alt=""
          aria-hidden
          className="w-full h-auto select-none"
          draggable={false}
        />
      </motion.div>
    </>
  );
}
