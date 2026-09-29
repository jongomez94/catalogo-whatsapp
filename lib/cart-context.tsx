"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/types/database";
import type { CartItem } from "@/types";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(siteSlug: string) {
  return `catalog-cart:${siteSlug}`;
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Record<string, unknown>;
  return typeof product.id === "string" && product.id.length > 0;
}

function parseStoredItems(raw: string): CartItem[] {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];

  return parsed.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const item = entry as Record<string, unknown>;
    if (!isProduct(item.product)) return [];
    const quantity = Number(item.quantity);
    if (!Number.isFinite(quantity) || quantity < 1) return [];
    return [{ product: item.product, quantity: Math.floor(quantity) }];
  });
}

function readCart(siteSlug: string): CartItem[] {
  try {
    const raw = window.localStorage.getItem(storageKey(siteSlug));
    if (!raw) return [];
    return parseStoredItems(raw);
  } catch {
    return [];
  }
}

function writeCart(siteSlug: string, items: CartItem[]) {
  try {
    window.localStorage.setItem(storageKey(siteSlug), JSON.stringify(items));
  } catch {
    // Quota, private mode, or blocked storage — keep cart in memory only.
  }
}

type CartProviderProps = {
  siteSlug: string;
  children: ReactNode;
};

export function CartProvider({ siteSlug, children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readCart(siteSlug));
    setHydrated(true);
  }, [siteSlug]);

  useEffect(() => {
    if (!hydrated) return;
    writeCart(siteSlug, items);
  }, [hydrated, items, siteSlug]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    const amount = Math.max(1, Math.floor(quantity));
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) {
        return [...current, { product, quantity: amount }];
      }
      return current.map((item) =>
        item.product.id === product.id
          ? { ...item, product, quantity: item.quantity + amount }
          : item
      );
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId)
    );
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const next = Math.floor(quantity);
    if (next < 1) {
      setItems((current) =>
        current.filter((item) => item.product.id !== productId)
      );
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity: next } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return {
      items,
      itemCount,
      total,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    };
  }, [
    items,
    isOpen,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
