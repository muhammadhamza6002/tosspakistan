export type Tag = "spicy" | "beef" | "veg" | "chef" | "new";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
  tags?: Tag[];
  image?: string;
};

export type AddOn = {
  id: string;
  name: string;
  price: number;
};

export const starters: MenuItem[] = [
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    desc: "Freshly baked flat-bread topped with garlic butter, mozzarella and parmesan.",
    price: 750,
    tags: ["veg"],
  },
];

export const pizzas: MenuItem[] = [
  {
    id: "margherita",
    name: "Margherita",
    desc: "Marinara sauce, fresh mozzarella, house-made pesto, basil leaves (seasonal), olive oil and parmesan cheese.",
    price: 1450,
    tags: ["veg"],
  },
  {
    id: "funghi",
    name: "Funghi",
    desc: "Marinara sauce, fresh mozzarella, button mushrooms, onions, olive oil and parmesan cheese.",
    price: 1450,
    tags: ["veg"],
  },
  {
    id: "quattro-formaggi",
    name: "Quattro Formaggi",
    desc: "Marinara sauce, fresh mozzarella, house-made ricotta, cream cheese, olive oil and parmesan cheese.",
    price: 1600,
    tags: ["veg"],
  },
  {
    id: "herb-chicken",
    name: "Herb Chicken",
    desc: "Marinara sauce, fresh mozzarella, herb marinated chicken, olives, olive oil and parmesan cheese.",
    price: 1550,
  },
  {
    id: "chicky-g",
    name: "Chicky G",
    desc: "Marinara sauce, fresh mozzarella, smoked chicken, roasted garlic cream, jalapeños, olive oil and parmesan cheese.",
    price: 1650,
    tags: ["spicy"],
  },
  {
    id: "boscaiola",
    name: "Boscaiola",
    desc: "Marinara sauce, fresh mozzarella, chicken sausage, fresh button mushrooms, onions, chilli flakes, olive oil and parmesan cheese.",
    price: 1650,
    tags: ["spicy", "chef"],
  },
  {
    id: "pancetta",
    name: "Pancetta",
    desc: "Marinara sauce, fresh mozzarella, beef pancetta (bacon), fresh button mushrooms, olive oil and parmesan cheese.",
    price: 1600,
    tags: ["beef"],
  },
  {
    id: "diavola",
    name: "Diavola",
    desc: "Marinara sauce, fresh mozzarella, beef pepperoni, jalapeños, chilli flakes, olive oil and parmesan cheese.",
    price: 1600,
    tags: ["spicy", "beef"],
  },
  {
    id: "peppo",
    name: "Peppo",
    desc: "Marinara sauce, fresh mozzarella, beef pepperoni, olive oil and parmesan cheese.",
    price: 1600,
    tags: ["beef"],
  },
];

export const drinks: MenuItem[] = [
  {
    id: "cola-next",
    name: "Cola Next",
    desc: "300 ml — sweet, carbonated, refreshing fizz.",
    price: 90,
  },
  {
    id: "fizup-next",
    name: "Fizup Next",
    desc: "300 ml — a refreshing citrus lift.",
    price: 90,
  },
];

export const addOns: AddOn[] = [
  { id: "mozzarella", name: "Extra Mozzarella", price: 200 },
  { id: "ricotta", name: "Ricotta", price: 200 },
  { id: "parmesan", name: "Parmesan", price: 200 },
  { id: "burrata", name: "Burrata", price: 400 },
  { id: "beef", name: "Beef", price: 400 },
  { id: "chicken", name: "Chicken", price: 250 },
  { id: "olives", name: "Olives", price: 150 },
  { id: "mushrooms", name: "Mushrooms", price: 150 },
  { id: "jalapenos", name: "Jalapeños", price: 100 },
  { id: "onions", name: "Onions", price: 50 },
  { id: "marinara", name: "Extra Marinara", price: 50 },
  { id: "dips", name: "Dips (garlic cream / cream cheese)", price: 150 },
];

export const TAG_META: Record<Tag, { label: string; color: string }> = {
  spicy: { label: "spicy", color: "bg-sauce text-paper" },
  beef: { label: "strong beef", color: "bg-ink text-paper" },
  veg: { label: "no meat", color: "bg-basil text-paper" },
  chef: { label: "chef's special", color: "bg-ink text-paper" },
  new: { label: "new", color: "bg-paper text-ink border border-ink" },
};

export const SHOP = {
  name: "TOSS Pizzeria",
  tagline: "No fluff, no fancy. Just real pizzas done right.",
  address: "Shop # 1, Ali Market, Plot 2A Street 73, F-11/1, Islamabad, 46000",
  phone: "03268677867",
  phoneFormatted: "0326-8677867",
  whatsapp: "923268677867", // international format, no + or leading 0
  hours: "Tue–Sun · 5pm – 1am (dine-in closes 11pm) · Mon closed",
  instagram: "https://www.instagram.com/tosspakistan/",
  facebook: "https://www.facebook.com/p/Toss-Pizzeria-61571174369071/",
  googleMaps: "https://maps.google.com/?q=Toss+Pizzeria+F-11+Islamabad",
  rating: 4.6,
  reviewCount: 208,
};
