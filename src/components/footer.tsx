import { SHOP } from "@/data/menu";

export function Footer() {
  return (
    <footer className="border-t-2 border-ink px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="font-display text-[22vw] md:text-[16rem] leading-[0.85] text-center">
          TOSS
        </p>
        <div className="mt-8 flex flex-wrap justify-between items-center gap-6 border-t-2 border-ink pt-6">
          <p className="font-mono text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Toss Pizzeria · Made in Islamabad
          </p>
          <div className="flex gap-4 font-mono text-xs uppercase tracking-widest">
            <a href={SHOP.instagram} target="_blank" rel="noreferrer" className="hover:text-sauce">
              instagram
            </a>
            <a href={SHOP.facebook} target="_blank" rel="noreferrer" className="hover:text-sauce">
              facebook
            </a>
            <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-sauce">
              whatsapp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
