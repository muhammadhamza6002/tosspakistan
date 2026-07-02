import type { CartLine } from "@/components/cart-provider";
import { SHOP } from "@/data/menu";

export type CheckoutInfo = {
  name: string;
  phone: string;
  orderType: "takeaway" | "dine-in";
  time: string;
  notes: string;
};

export function buildWhatsAppMessage(lines: CartLine[], info: CheckoutInfo, subtotal: number) {
  const lineItems = lines
    .map((l) => {
      const base = `• ${l.qty} × ${l.name} — Rs ${l.price * l.qty}`;
      const addOns = l.addOns.length
        ? "\n   + " + l.addOns.map((a) => `${a.name} (Rs ${a.price})`).join(", ")
        : "";
      const notes = l.notes ? `\n   note: ${l.notes}` : "";
      return base + addOns + notes;
    })
    .join("\n");

  const msg = [
    `🍕 *New TOSS order*`,
    ``,
    `*Name:* ${info.name}`,
    `*Phone:* ${info.phone}`,
    `*Type:* ${info.orderType === "takeaway" ? "Takeaway" : "Dine-in"}`,
    info.time ? `*Time:* ${info.time}` : null,
    info.notes ? `*Notes:* ${info.notes}` : null,
    ``,
    `*Order:*`,
    lineItems,
    ``,
    `*Subtotal:* Rs ${subtotal}`,
    `_(prices exclusive of tax)_`,
    ``,
    `Placed via tosspizzeria.com`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;
}
