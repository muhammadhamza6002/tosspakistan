"use client";

import { useEffect, useRef } from "react";

type StarData = { x: number; y: number; size: number; rot: number };

// ~55 stars spread across the viewport with size + rotation variety.
// Hand-tuned so no cluster is too dense and edges aren't bald.
const STARS: StarData[] = [
  // Top band
  { x: 3,  y: 4,  size: 10, rot: 15 },
  { x: 9,  y: 12, size: 16, rot: -20 },
  { x: 16, y: 3,  size: 8,  rot: 30 },
  { x: 22, y: 10, size: 12, rot: -10 },
  { x: 30, y: 5,  size: 10, rot: 25 },
  { x: 38, y: 14, size: 14, rot: -35 },
  { x: 46, y: 4,  size: 8,  rot: 40 },
  { x: 53, y: 11, size: 18, rot: -5 },
  { x: 61, y: 3,  size: 10, rot: 20 },
  { x: 68, y: 13, size: 12, rot: -25 },
  { x: 76, y: 5,  size: 14, rot: 15 },
  { x: 83, y: 12, size: 8,  rot: -40 },
  { x: 90, y: 4,  size: 16, rot: 30 },
  { x: 97, y: 14, size: 10, rot: -15 },
  // Upper-mid band
  { x: 2,  y: 22, size: 12, rot: 20 },
  { x: 12, y: 27, size: 8,  rot: -30 },
  { x: 25, y: 20, size: 14, rot: 10 },
  { x: 36, y: 25, size: 10, rot: -40 },
  { x: 50, y: 22, size: 6,  rot: 45 },
  { x: 64, y: 27, size: 12, rot: -20 },
  { x: 78, y: 20, size: 10, rot: 35 },
  { x: 89, y: 26, size: 14, rot: -15 },
  { x: 96, y: 32, size: 8,  rot: 25 },
  // Middle band (many sections still light here — story, transitions)
  { x: 4,  y: 38, size: 16, rot: -10 },
  { x: 15, y: 44, size: 8,  rot: 30 },
  { x: 28, y: 40, size: 10, rot: -25 },
  { x: 42, y: 46, size: 12, rot: 15 },
  { x: 58, y: 42, size: 8,  rot: -35 },
  { x: 72, y: 47, size: 14, rot: 20 },
  { x: 86, y: 42, size: 10, rot: -45 },
  { x: 95, y: 48, size: 12, rot: 25 },
  // Lower-mid band
  { x: 3,  y: 56, size: 10, rot: 30 },
  { x: 18, y: 60, size: 14, rot: -20 },
  { x: 33, y: 55, size: 8,  rot: 40 },
  { x: 47, y: 62, size: 12, rot: -10 },
  { x: 62, y: 57, size: 10, rot: 20 },
  { x: 76, y: 63, size: 16, rot: -30 },
  { x: 90, y: 58, size: 8,  rot: 15 },
  // Bottom band
  { x: 5,  y: 72, size: 12, rot: -25 },
  { x: 14, y: 80, size: 10, rot: 35 },
  { x: 26, y: 74, size: 8,  rot: -15 },
  { x: 38, y: 82, size: 14, rot: 20 },
  { x: 50, y: 76, size: 10, rot: -40 },
  { x: 62, y: 84, size: 12, rot: 10 },
  { x: 74, y: 78, size: 8,  rot: -30 },
  { x: 84, y: 86, size: 16, rot: 25 },
  { x: 94, y: 76, size: 10, rot: -20 },
  // Very bottom
  { x: 3,  y: 92, size: 14, rot: 15 },
  { x: 12, y: 96, size: 8,  rot: -35 },
  { x: 24, y: 93, size: 10, rot: 30 },
  { x: 40, y: 97, size: 12, rot: -10 },
  { x: 55, y: 92, size: 8,  rot: 40 },
  { x: 70, y: 96, size: 14, rot: -25 },
  { x: 82, y: 93, size: 10, rot: 20 },
  { x: 93, y: 97, size: 12, rot: -15 },
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
