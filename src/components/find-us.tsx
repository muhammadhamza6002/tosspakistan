"use client";

import { SHOP } from "@/data/menu";

const HOURS = [
  { d: "Mon", h: "Closed", off: true },
  { d: "Tue", h: "5pm – 1am" },
  { d: "Wed", h: "5pm – 1am" },
  { d: "Thu", h: "5pm – 1am" },
  { d: "Fri", h: "5pm – 1am" },
  { d: "Sat", h: "5pm – 1am" },
  { d: "Sun", h: "5pm – 1am" },
];

export function FindUs() {
  return (
    <section id="find-us" className="py-24 md:py-32 px-5 bg-ink text-paper">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-paper/60 mb-4">
            ✦ come by ✦
          </p>
          <h2 className="font-display text-6xl md:text-8xl leading-[0.9]">
            F-11/1,<br />
            <span className="text-sauce">Islamabad.</span>
          </h2>

          <div className="mt-8 space-y-2 max-w-md">
            <p className="text-lg leading-snug">{SHOP.address}</p>
            <p className="font-mono text-sm">
              Takeaway:{" "}
              <a href={`tel:+${SHOP.whatsapp}`} className="underline underline-offset-4">
                {SHOP.phoneFormatted}
              </a>
            </p>
          </div>

          <div className="mt-8 border-2 border-paper/30 p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-paper/60 mb-3">
              hours
            </p>
            <table className="w-full font-mono text-sm">
              <tbody>
                {HOURS.map((r) => (
                  <tr key={r.d} className={r.off ? "text-sauce" : ""}>
                    <td className="py-1 pr-6">{r.d}</td>
                    <td className="py-1">{r.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font-mono text-[10px] uppercase text-paper/60 mt-3">
              dine-in closes 11pm
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SHOP.googleMaps}
              target="_blank"
              rel="noreferrer"
              className="bg-paper text-ink font-display text-xl px-6 py-3 hover:bg-sauce hover:text-paper transition"
            >
              Get directions →
            </a>
            <a
              href={`https://wa.me/${SHOP.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="border-2 border-paper font-display text-xl px-6 py-3 hover:bg-paper hover:text-ink transition"
            >
              WhatsApp
            </a>
          </div>

          <p className="font-hand text-2xl text-paper/70 mt-8">
            free parking · outdoor seating for ~12 · chill vibe
          </p>
        </div>

        {/* Map iframe */}
        <div className="aspect-square md:aspect-auto md:min-h-[500px] border-2 border-paper overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Ali+Market+F-11/1+Islamabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full grayscale contrast-125"
            title="Toss Pizzeria location"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
