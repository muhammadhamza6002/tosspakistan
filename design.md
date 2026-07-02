# TOSS Pizzeria — Website Design Doc

> "No fluff, no fancy. Just real pizzas done right."
> That tagline IS the design brief. The site should feel the same way — confident, stripped-back, a little raw, not corporate.

---

## 1. Positioning

**What Toss is:** Islamabad's best authentic Neapolitan pizza. Small shop in F-11/1, 4.6★ on Google (208 reviews), reviewers consistently call it the most authentic Neapolitan in the city. Owner-run, ~7 pizzas, cash-and-takeaway operation.

**What Toss is NOT:** Broadway/California/14th Street/New York Pizza. No family-meal-deal energy. No "buy 1 get 1." No stock photos of stretched cheese under studio lights.

**Who visits the site:**
- People who saw the Instagram reel and want the address + menu + WhatsApp
- Foodies deciding between Toss and one other place
- First-time customers checking hours before driving to F-11

They are NOT here to browse for 10 minutes. They are here to decide + order.

---

## 2. Design Direction — the "Gen-Z" translation

"Gen-Z" here does NOT mean bright gradients, bubbly emoji-everywhere, or TikTok-style chaos. For a pizzeria with this brand voice it means:

- **Editorial / zine layout** — asymmetric grids, oversized type, handwritten annotations, arrows that point across the page, "sticker" elements. Think print magazine, not restaurant chain.
- **Raw, tactile textures** — paper grain, the "TOSS TOSS TOSS" logo-printed wax paper the pizzas sit on, hand-drawn arrows, scan-line noise on images.
- **Bold typography as the hero** — the wordmark IS the design system. Big chunky groovy display type (matching the logo), tight kerning, mixed with clean mono/sans for body.
- **Photography > illustration** — real shots of the pizzas, the oven, the market, the owner. Nothing generic.
- **Motion with attitude** — pizzas that spin on hover, menu items that "toss" in, a cursor that leaves a flour trail, scroll-triggered stickers. Restrained, not everywhere.
- **Dark or off-white, not corporate white** — cream/paper background with jet black type (matches logo). Optional dark mode that flips to charcoal.

### Reference vibes (not to copy, to steer)
- **Poster/zine sites:** Reservoir Studios, Dawn Records, Pentagram case studies
- **Restaurants doing it right:** Pizza Pilgrims (UK), Emmy Squared, Lupa (NY), Franco Manca — study their type + layout, not their content
- **Gen-Z-native brands with restraint:** Aime Leon Dore, Awake NY, Palace, Recess drinks

---

## 3. Color System — from the logo

The TOSS logo is pure black on off-white. Lean into that. Then a single accent for the "hot" moments (pizza sauce red / pepperoni).

```
--paper       #F4EFE6   /* off-white cream — main background */
--paper-warm  #ECE4D2   /* card / section shift */
--ink         #0A0A0A   /* jet black — logo, type, borders */
--ink-soft    #2A2A2A   /* secondary text */
--sauce       #C8341C   /* marinara red — used sparingly for CTAs, price tags, "hot" labels */
--basil       #4A6B3E   /* deep basil green — reserved for tags like "veg" / "chef's special" */
--char        #1A1614   /* dark mode background */
```

Rule: 90% paper + ink. 8% sauce red. 2% basil. Never more.

---

## 4. Typography

- **Display (Wordmark echo):** something groovy/chunky like **Chubbo**, **Migra**, **PP Neue Machina Bold**, or **Bagel Fat One** — for section titles + hero. Should feel related to the TOSS logo's rounded, weighty forms.
- **Body:** **Inter** or **Söhne** — clean, readable, modern.
- **Accent / handwritten:** **Caveat** or **Reenie Beanie** — for the "notes" and annotations (e.g. scrawled "← chef's fav" next to a menu item).
- **Mono (for prices, hours, order details):** **JetBrains Mono** or **IBM Plex Mono**.

Type is loud on purpose. `h1` is 96–160px on desktop. Menu item names are 32–48px.

---

## 5. Pages / Sections

Single-page, long scroll. Sections snap-navigate from a fixed top-left wordmark + top-right menu.

### 5.1 Hero
- Full-viewport off-white with the TOSS wordmark massive, centered
- Behind it: a slow-motion looping video of a pizza being tossed (or the oven flame flickering)
- Subhead: "No fluff, no fancy. Just real pizzas done right."
- One CTA: **[ Order on WhatsApp ]** — sticks to bottom-right as a floating button after scroll
- Small ticker at bottom: `TUE–SUN · 5PM–1AM · F-11/1, ISLAMABAD · 0326-TOSSTOS`

### 5.2 The Story ("About")
- Two-column: left is a hand-set paragraph about Neapolitan technique, the owner, why F-11
- Right is a stack of polaroid-style photos (oven, dough, market) with slight rotation
- Callout quotes from real Google reviews as "stickers" pinned to the section: *"Best neapolitan pizzas in Islamabad, period."* — Asad, ⭐⭐⭐⭐⭐

### 5.3 The Menu — the centerpiece
- NOT a boring list. Each pizza is its own "card" that flips or expands.
- Layout: large photo of the pizza on the left, name in display type on the right, ingredients in mono below, price in a red sauce-stain circle.
- Tags along the edge (matching the physical menu): 🌶 spicy · 🐄 strong beef · 🌱 no meat · ⭐ chef's special
- Hover: card lifts, pizza rotates slightly
- Click / tap: expands to a full "order this" flow with quantity, add-ons (extra cheese, jalapeños, dips), and adds to the cart drawer

Sub-sections in menu:
- **Starters** (Garlic Bread)
- **Pizzas** (all 9)
- **Add-ons** (mozzarella, ricotta, parmesan, burrata, beef, chicken, olives, mushrooms, jalapeños, onions, marinara, dips)
- **Drinks** (Cola Next, Fizup Next)

### 5.4 The Order Flow (WhatsApp checkout)
- Cart lives in a right-side drawer. Persistent, shows count.
- Fields: name, phone, order type (takeaway / dine-in reservation), pickup time, notes
- On submit → builds a pre-formatted WhatsApp message with the full order + total + customer info and opens `wa.me/923268677867?text=...`
- No payment on site. No user accounts. No login. Zero friction.
- Confirmation screen: "Your order is ready to send. Toss will confirm on WhatsApp. Cash on pickup."

### 5.5 Reviews Wall
- Marquee-style horizontal scroll of real Google reviews as index cards, pinned to a corkboard texture
- Each card: quote, name, star rating, review date
- Small link: "Read all 208 reviews on Google →"

### 5.6 Find Us
- Embedded map (dark-styled) with a pinned marker
- Address, hours (clearly showing MON = CLOSED), takeaway number
- Directions button
- Small note: "Free parking. Outdoor seating for ~12. Dine-in closes at 11pm."

### 5.7 Footer
- Wordmark repeated big
- Instagram + Facebook links (icon buttons, hover flips to logo)
- Credit line
- "© Toss Pizzeria 2026. Made in Islamabad."

---

## 6. Interaction / Motion principles

- Cursor leaves a subtle flour-dust trail on desktop (disabled on touch)
- Scroll triggers stickers/annotations to peel in
- Every pizza image has a slow idle rotation on hover
- WhatsApp CTA has a soft pulse when the cart has items
- Page transitions: none needed (single page), but section reveals use a slight upward slide + fade
- Respect `prefers-reduced-motion`

---

## 7. Tech Stack (proposed)

- **Next.js 15 (App Router) + TypeScript** — fast, SEO-friendly, easy Vercel deploy
- **Tailwind CSS** — for the design tokens above
- **Framer Motion** — for the interaction/motion layer
- **shadcn/ui** — only for the cart drawer, dialog, form primitives (styled to match, not stock)
- **next/image** — for the pizza photography (needs optimization badly)
- **Vercel** — hosting, free tier is fine
- **Domain:** tosspizzeria.com or tosspakistan.com (need to check availability)

No backend needed for v1 — order submission is a `wa.me` link. If we later want to track orders, we can add a lightweight Supabase table.

---

## 8. Content we still need from you (the shop)

- High-res photos of each of the 9 pizzas (top-down on the branded wax paper)
- Photo of the oven, the shop exterior, the F-11 market
- Photo of the owner (for the About section) — optional but adds soul
- A 5–10 second video clip of a pizza being tossed or coming out of the oven
- The actual owner's story: how it started, why Neapolitan, what makes the dough
- Confirm the WhatsApp number for orders (0326-8677867 — is this the right one?)
- Any dine-in reservation policy
- Delivery — is it takeaway only, or is Foodpanda/Cheetay also in play?

---

## 9. Out of scope for v1

- Online payment
- User accounts / login
- Loyalty program
- Native mobile app
- Multi-language (English only for now)
- Blog / recipe content

These can come in phase 2 if traffic and repeat-order data justify it.
