"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  getQuantity: (productId: number) => number;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const grouped: { [key: number]: CartItem } = {};
    storedCart.forEach((item) => {
      if (grouped[item.id]) grouped[item.id].quantity += 1;
      else grouped[item.id] = { ...item, quantity: 1 };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(Object.values(grouped));
  }, []);

  useEffect(() => {
    const flatCart: Product[] = [];
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) flatCart.push({ ...item });
    });
    localStorage.setItem("cart", JSON.stringify(flatCart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQuantity = (productId: number) => {
    return cart.find((item) => item.id === productId)?.quantity || 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getQuantity, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};