import { useState, useEffect } from "react";
import { products, valueBundles, type Product } from "./site";

export type BasketItem = {
  id: string;
  name: string;
  unit: string;
  price?: string;
  image: string;
  qty: number;
  category?: string;
};

type BasketListener = () => void;

class BasketManager {
  private items: BasketItem[] = [];
  private isDrawerOpen: boolean = false;
  private listeners: Set<BasketListener> = new Set();

  constructor() {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      try {
        const stored = window.localStorage.getItem("sasaeniyan_basket");
        if (stored) {
          this.items = JSON.parse(stored);
        }
      } catch {
        // Ignore localStorage error
      }
    }
  }

  private notify() {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      try {
        window.localStorage.setItem("sasaeniyan_basket", JSON.stringify(this.items));
      } catch {
        // Ignore localStorage write error
      }
    }
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: BasketListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getItems(): BasketItem[] {
    return [...this.items];
  }

  isOpen(): boolean {
    return this.isDrawerOpen;
  }

  setOpen(open: boolean) {
    this.isDrawerOpen = open;
    this.notify();
  }

  addItem(item: { name: string; unit: string; price?: string; image?: string; category?: string; qty?: number }) {
    const existing = this.items.find((i) => i.name === item.name);
    const toAdd = item.qty ?? 1;

    if (existing) {
      existing.qty += toAdd;
    } else {
      // Find fallback image from catalog
      const matched = products.find((p) => p.name === item.name);
      this.items.push({
        id: item.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        name: item.name,
        unit: item.unit || matched?.unit || "Unit",
        price: item.price || matched?.approxFarmPrice,
        image: item.image || matched?.image || "",
        category: item.category || matched?.category,
        qty: toAdd,
      });
    }

    this.isDrawerOpen = true; // Auto open drawer to give instant visual feedback
    this.notify();
  }

  decrementItem(name: string) {
    const existing = this.items.find((i) => i.name === name);
    if (!existing) return;

    if (existing.qty <= 1) {
      this.items = this.items.filter((i) => i.name !== name);
    } else {
      existing.qty -= 1;
    }
    this.notify();
  }

  removeItem(name: string) {
    this.items = this.items.filter((i) => i.name !== name);
    this.notify();
  }

  clear() {
    this.items = [];
    this.notify();
  }

  getCount(): number {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }
}

export const basketManager = new BasketManager();

export function useBasket() {
  const [items, setItems] = useState<BasketItem[]>(basketManager.getItems());
  const [isOpen, setIsOpen] = useState<boolean>(basketManager.isOpen());

  useEffect(() => {
    return basketManager.subscribe(() => {
      setItems(basketManager.getItems());
      setIsOpen(basketManager.isOpen());
    });
  }, []);

  return {
    items,
    isOpen,
    count: items.reduce((sum, i) => sum + i.qty, 0),
    openBasket: () => basketManager.setOpen(true),
    closeBasket: () => basketManager.setOpen(false),
    addItem: (item: Parameters<typeof basketManager.addItem>[0]) => basketManager.addItem(item),
    decrementItem: (name: string) => basketManager.decrementItem(name),
    removeItem: (name: string) => basketManager.removeItem(name),
    clearBasket: () => basketManager.clear(),
  };
}
