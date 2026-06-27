"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, InquiryItem, GiftBoxOrder, Subscription, User, Inquiry, Review } from "@/types";
import { products as initialProducts, subscriptionPlans as initialSubscriptions } from "@/data/mockData";

interface AppContextType {
  language: "en" | "bn";
  setLanguage: (lang: "en" | "bn") => void;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  inquiryBasket: InquiryItem[];
  addToInquiry: (product: Product, qty: number, logo: boolean, logoImg?: string, notes?: string) => void;
  removeFromInquiry: (id: string) => void;
  updateInquiryQty: (id: string, qty: number) => void;
  clearInquiryBasket: () => void;
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
  compareList: string[];
  toggleCompare: (id: string) => void;
  user: User | null;
  loginUser: (email: string, name: string, company?: string, phone?: string) => boolean;
  registerUser: (email: string, name: string, company?: string, phone?: string) => boolean;
  logoutUser: () => void;
  submitInquiry: (notes?: string) => void;
  giftOrders: GiftBoxOrder[];
  addGiftOrder: (order: Omit<GiftBoxOrder, "id" | "date" | "status" | "price"> & { price: number }) => void;
  subscriptions: Subscription[];
  toggleSubscription: (subType: Subscription["type"]) => void;
  rewardPoints: number;
  addRewardPoints: (pts: number) => void;
  productsList: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  allInquiries: Inquiry[];
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  allMessages: { id: string; name: string; email: string; message: string; date: string }[];
  addMessage: (name: string, email: string, message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<"en" | "bn">("en");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [inquiryBasket, setInquiryBasket] = useState<InquiryItem[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [giftOrders, setGiftOrders] = useState<GiftBoxOrder[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [rewardPoints, setRewardPoints] = useState<number>(0);
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [allInquiries, setAllInquiries] = useState<Inquiry[]>([]);
  const [allMessages, setAllMessages] = useState<any[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("ens_language") as "en" | "bn";
      if (storedLang) setLanguageState(storedLang);

      const storedWishlist = localStorage.getItem("ens_wishlist");
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedInquiry = localStorage.getItem("ens_inquiry_basket");
      if (storedInquiry) setInquiryBasket(JSON.parse(storedInquiry));

      const storedRecent = localStorage.getItem("ens_recently_viewed");
      if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));

      const storedCompare = localStorage.getItem("ens_compare_list");
      if (storedCompare) setCompareList(JSON.parse(storedCompare));

      const storedUser = localStorage.getItem("ens_user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        setUser(u);
        setRewardPoints(u.rewardPoints || 0);
      }

      const storedGifts = localStorage.getItem("ens_gift_orders");
      if (storedGifts) setGiftOrders(JSON.parse(storedGifts));

      const storedSubs = localStorage.getItem("ens_subscriptions");
      if (storedSubs) setSubscriptions(JSON.parse(storedSubs));

      const storedProducts = localStorage.getItem("ens_products");
      if (storedProducts) {
        setProductsList(JSON.parse(storedProducts));
      } else {
        localStorage.setItem("ens_products", JSON.stringify(initialProducts));
      }

      const storedInquiries = localStorage.getItem("ens_all_inquiries");
      if (storedInquiries) setAllInquiries(JSON.parse(storedInquiries));

      const storedMessages = localStorage.getItem("ens_all_messages");
      if (storedMessages) setAllMessages(JSON.parse(storedMessages));
    }
  }, []);

  const setLanguage = (lang: "en" | "bn") => {
    setLanguageState(lang);
    localStorage.setItem("ens_language", lang);
  };

  const toggleWishlist = (id: string) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("ens_wishlist", JSON.stringify(updated));
  };

  const addToInquiry = (product: Product, qty: number, logo: boolean, logoImg?: string, notes?: string) => {
    setInquiryBasket((prev) => {
      const existsIdx = prev.findIndex((item) => item.product.id === product.id);
      let updated;
      if (existsIdx > -1) {
        updated = [...prev];
        updated[existsIdx] = {
          ...updated[existsIdx],
          quantity: updated[existsIdx].quantity + qty,
          customLogo: logo,
          logoImage: logoImg || updated[existsIdx].logoImage,
          notes: notes || updated[existsIdx].notes
        };
      } else {
        updated = [...prev, { product, quantity: qty, customLogo: logo, logoImage: logoImg, notes }];
      }
      localStorage.setItem("ens_inquiry_basket", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromInquiry = (id: string) => {
    const updated = inquiryBasket.filter((item) => item.product.id !== id);
    setInquiryBasket(updated);
    localStorage.setItem("ens_inquiry_basket", JSON.stringify(updated));
  };

  const updateInquiryQty = (id: string, qty: number) => {
    const updated = inquiryBasket.map((item) =>
      item.product.id === id ? { ...item, quantity: qty } : item
    );
    setInquiryBasket(updated);
    localStorage.setItem("ens_inquiry_basket", JSON.stringify(updated));
  };

  const clearInquiryBasket = () => {
    setInquiryBasket([]);
    localStorage.removeItem("ens_inquiry_basket");
  };

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, 5); // limit to last 5
      localStorage.setItem("ens_recently_viewed", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleCompare = (id: string) => {
    const updated = compareList.includes(id)
      ? compareList.filter((item) => item !== id)
      : compareList.length < 4
      ? [...compareList, id]
      : compareList; // limit to 4 products for comparison
    setCompareList(updated);
    localStorage.setItem("ens_compare_list", JSON.stringify(updated));
  };

  const loginUser = (email: string, name: string, company?: string, phone?: string): boolean => {
    const u: User = { email, name, rewardPoints: rewardPoints || 100, company, phone }; // give 100 points as initial sign-on reward
    setUser(u);
    setRewardPoints(u.rewardPoints);
    localStorage.setItem("ens_user", JSON.stringify(u));
    return true;
  };

  const registerUser = (email: string, name: string, company?: string, phone?: string): boolean => {
    const u: User = { email, name, rewardPoints: 200, company, phone }; // 200 points for registration
    setUser(u);
    setRewardPoints(200);
    localStorage.setItem("ens_user", JSON.stringify(u));
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("ens_user");
  };

  const submitInquiry = (notes?: string) => {
    if (inquiryBasket.length === 0) return;
    
    const newInquiry: Inquiry = {
      id: "INQ-" + Math.floor(100000 + Math.random() * 900000),
      email: user?.email || "guest@enstoys.com",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      items: [...inquiryBasket],
      status: "Pending",
      totalQuantity: inquiryBasket.reduce((sum, item) => sum + item.quantity, 0),
      notes: notes || ""
    };

    const updatedInquiries = [newInquiry, ...allInquiries];
    setAllInquiries(updatedInquiries);
    localStorage.setItem("ens_all_inquiries", JSON.stringify(updatedInquiries));

    // Award reward points for B2B inquiry submissions
    addRewardPoints(50);

    // Clear basket after successful submit
    clearInquiryBasket();
  };

  const addGiftOrder = (order: Omit<GiftBoxOrder, "id" | "date" | "status" | "price"> & { price: number }) => {
    const newGiftOrder: GiftBoxOrder = {
      ...order,
      id: "GFT-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: "Pending"
    };

    const updated = [newGiftOrder, ...giftOrders];
    setGiftOrders(updated);
    localStorage.setItem("ens_gift_orders", JSON.stringify(updated));

    addRewardPoints(30);
  };

  const toggleSubscription = (subType: Subscription["type"]) => {
    const updated = subscriptions.map((sub) => {
      if (sub.type === subType) {
        const isActive = sub.status === "Active";
        return {
          ...sub,
          status: (isActive ? "Inactive" : "Active") as "Active" | "Inactive",
          startDate: isActive ? "N/A" : new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
          nextDelivery: isActive ? "N/A" : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        };
      }
      return sub;
    });
    setSubscriptions(updated);
    localStorage.setItem("ens_subscriptions", JSON.stringify(updated));
  };

  const addRewardPoints = (pts: number) => {
    setRewardPoints((prev) => {
      const nextPts = prev + pts;
      if (user) {
        const updatedUser = { ...user, rewardPoints: nextPts };
        setUser(updatedUser);
        localStorage.setItem("ens_user", JSON.stringify(updatedUser));
      }
      return nextPts;
    });
  };

  // Admin Inventory CRUD Operations
  const addProduct = (p: Product) => {
    const updated = [p, ...productsList];
    setProductsList(updated);
    localStorage.setItem("ens_products", JSON.stringify(updated));
  };

  const updateProduct = (p: Product) => {
    const updated = productsList.map((item) => (item.id === p.id ? p : item));
    setProductsList(updated);
    localStorage.setItem("ens_products", JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = productsList.filter((item) => item.id !== id);
    setProductsList(updated);
    localStorage.setItem("ens_products", JSON.stringify(updated));
  };

  const updateInquiryStatus = (id: string, status: Inquiry["status"]) => {
    const updated = allInquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    setAllInquiries(updated);
    localStorage.setItem("ens_all_inquiries", JSON.stringify(updated));
  };

  const addMessage = (name: string, email: string, message: string) => {
    const newMsg = {
      id: "MSG-" + Math.floor(100000 + Math.random() * 900000),
      name,
      email,
      message,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    };
    const updated = [newMsg, ...allMessages];
    setAllMessages(updated);
    localStorage.setItem("ens_all_messages", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        wishlist,
        toggleWishlist,
        inquiryBasket,
        addToInquiry,
        removeFromInquiry,
        updateInquiryQty,
        clearInquiryBasket,
        recentlyViewed,
        addRecentlyViewed,
        compareList,
        toggleCompare,
        user,
        loginUser,
        registerUser,
        logoutUser,
        submitInquiry,
        giftOrders,
        addGiftOrder,
        subscriptions,
        toggleSubscription,
        rewardPoints,
        addRewardPoints,
        productsList,
        addProduct,
        updateProduct,
        deleteProduct,
        allInquiries,
        updateInquiryStatus,
        allMessages,
        addMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
