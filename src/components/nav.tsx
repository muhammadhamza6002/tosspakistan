"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#menu", label: "Menu" },
  { href: "#reviews", label: "Reviews" },
  { href: "#find-us", label: "Find us" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors ${
        scrolled ? "bg-paper/90 backdrop-blur border-b-2 border-ink" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <a href="#top" className="font-display text-3xl leading-none">
          TOSS
        </a>
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-sauce transition">
              {l.label}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden font-mono text-xs uppercase tracking-widest"
          aria-label="Toggle menu"
        >
          {open ? "close" : "menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t-2 border-ink bg-paper px-5 py-4 flex flex-col gap-3 font-mono text-sm uppercase">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-1"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
