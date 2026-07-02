"use client";

import { createContext, useContext, useMemo, useReducer, useState, type ReactNode } from "react";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  qty: number;
  addOns: { id: string; name: string; price: number }[];
  notes?: string;
};

type State = { lines: CartLine[] };
type Action =
  | { type: "add"; line: Omit<CartLine, "qty"> & { qty?: number } }
  | { type: "remove"; index: number }
  | { type: "qty"; index: number; qty: number }
  | { type: "clear" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const qty = action.line.qty ?? 1;
      return { lines: [...state.lines, { ...action.line, qty }] };
    }
    case "remove":
      return { lines: state.lines.filter((_, i) => i !== action.index) };
    case "qty": {
      if (action.qty <= 0) return { lines: state.lines.filter((_, i) => i !== action.index) };
      return {
        lines: state.lines.map((l, i) => (i === action.index ? { ...l, qty: action.qty } : l)),
      };
    }
    case "clear":
      return { lines: [] };
  }
}

type Ctx = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "qty"> & { qty?: number }) => void;
  remove: (index: number) => void;
  setQty: (index: number, qty: number) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });
  const [open, setOpen] = useState(false);

  const value = useMemo<Ctx>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce(
      (t, l) => t + l.qty * (l.price + l.addOns.reduce((a, o) => a + o.price, 0)),
      0,
    );
    return {
      lines: state.lines,
      count,
      subtotal,
      open,
      setOpen,
      add: (line) => {
        dispatch({ type: "add", line });
        setOpen(true);
      },
      remove: (index) => dispatch({ type: "remove", index }),
      setQty: (index, qty) => dispatch({ type: "qty", index, qty }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state, open]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
