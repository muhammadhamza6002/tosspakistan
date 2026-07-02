"use client";

import { useEffect, useRef } from "react";

type StarData = { x: number; y: number; size: number; rot: number };

const STARS: StarData[] = [
  { x: 5, y: 10, size: 14, rot: 15 },
  { x: 14, y: 4, size: 10, rot: -20 },
  { x: 40, y: 6, size: 8, rot: 40 },
  { x: 62, y: 3, size: 12, rot: -15 },
  { x: 88, y: 8, size: 12, rot: 30 },
  { x: 94, y: 22, size: 16, rot: 45 },
  { x: 3, y: 32, size: 18, rot: -10 },
  { x: 96, y: 40, size: 10, rot: 20 },
  { x: 12, y: 46, size: 8, rot: 45 },
  { x: 84, y: 52, size: 12, rot: 15 },
  { x: 8, y: 62, size: 14, rot: 25 },
  { x: 92, y: 66, size: 12, rot: -30 },
  { x: 4, y: 82, size: 10, rot: 10 },
  { x: 94, y: 84, size: 16, rot: -20 },
  { x: 22, y: 92, size: 12, rot: 30 },
  { x: 55, y: 88, size: 10, rot: 20 },
  { x: 76, y: 94, size: 14, rot: -10 },
];

export function StarsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars = Array.from(
      container.querySelectorAll<HTMLDivElement>("[data-star]"),
    );

    let mx = -99999;
    let my = -99999;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    // Track per-star eased proximity so twinkle enters + exits smoothly.
    const state = stars.map(() => ({ p: 0 }));

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => {
      mx = -99999;
      my = -99999;
    };
    const onResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    let rafId = 0;
    const tick = () => {
      for (let i = 0; i < stars.length; i++) {
        const s = STARS[i];
        const cx = (s.x / 100) * vw;
        const cy = (s.y / 100) * vh;
        const d = Math.hypot(mx - cx, my - cy);
        const target = Math.max(0, 1 - d / 220);
        // Ease toward target — smooths entry AND exit.
        state[i].p += (target - state[i].p) * 0.12;
        const p = state[i].p;
        const eased = p * p * (3 - 2 * p);
        const scale = 1 + eased * 1.2;
        const opacity = 0.35 + eased * 0.65;
        const extraRot = eased * 25;
        const el = stars[i];
        el.style.transform = `translate(-50%, -50%) rotate(${s.rot + extraRot}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
    >
      {STARS.map((s, i) => (
        <div
          key={i}
          data-star
          className="absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
            opacity: 0.35,
            willChange: "transform, opacity",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-ink">
            <path
              d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
