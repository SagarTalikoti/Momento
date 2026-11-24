"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  quantity: number;
}

export interface Product {
  title: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  rating?: string;
  reviews?: string;
  href?: string;
}

interface AppContextType {
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (title: string) => void;
  updateQuantity: (title: string, delta: number) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("momento_cart");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch (e) {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prev,
          {
            title: product.title,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            quantity: 1,
          },
        ];
      }
      try {
        localStorage.setItem("momento_cart", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast(`Added "${product.title}" to cart`);
  };

  const removeFromCart = (title: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.title !== title);
      try {
        localStorage.setItem("momento_cart", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast(`Item removed from cart`);
  };

  const updateQuantity = (title: string, delta: number) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) => {
          if (item.title === title) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      try {
        localStorage.setItem("momento_cart", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Keyboard shortcut Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
        setIsCartOpen(false);
        setIsMobileMenuOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isSearchModalOpen,
        setIsSearchModalOpen,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        quickViewProduct,
        setQuickViewProduct,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
