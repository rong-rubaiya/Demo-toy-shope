"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { InquiryDrawer } from "./InquiryDrawer";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ToyBrick,
  ShoppingCart,
  Heart,
  User,
  Globe,
  Menu,
  X,
  ChevronDown,
  Scaling,
  LogOut,
  LayoutDashboard
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    inquiryBasket,
    wishlist,
    compareList,
    user,
    logoutUser
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [inquiryDrawerOpen, setInquiryDrawerOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

 

  const navItems = [
    { name: t.nav.products, path: "/products" },
    { name: t.nav.giftBox, path: "/#giftbox-builder" },
    { name: t.nav.process, path: "/#manufacturing-process" },
    { name: t.nav.exportMap, path: "/#global-network" },
    { name: t.nav.gallery, path: "/#factory-gallery" },
    { name: t.nav.faq, path: "/#faq" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "glass py-3 shadow-md bg-white/80 dark:bg-dark/80"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <ToyBrick className="w-6 h-6 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-extrabold text-base tracking-tight text-zinc-900 dark:text-white leading-none">
                  ENS TOYS
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
                  HUIZHOU CO., LTD.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              

              {/* Compare List */}
              <Link
                href="/compare"
                title={t.nav.compare}
                className="relative p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-primary dark:hover:border-primary hover:text-primary transition duration-200"
              >
                <Scaling className="w-4 h-4" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {compareList.length}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link
                href="/dashboard?tab=wishlist"
                title={t.nav.wishlist}
                className="relative p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-primary dark:hover:border-primary hover:text-primary transition duration-200"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Inquiry Basket */}
              <button
                onClick={() => setInquiryDrawerOpen(true)}
                title={t.nav.inquiry}
                className="relative p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-primary dark:hover:border-primary hover:text-primary transition duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                {inquiryBasket.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                    {inquiryBasket.length}
                  </span>
                )}
              </button>

              {/* Authentication / Profile Dropdown */}
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition font-semibold text-xs border border-zinc-200/50 dark:border-zinc-700/50 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{user.name.split(" ")[0]}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl py-1 z-50">
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
                        >
                          <LayoutDashboard className="w-4 h-4 text-primary" />
                          <span>{t.nav.dashboard}</span>
                        </Link>
                        <button
                          onClick={() => {
                            logoutUser();
                            setProfileDropdownOpen(false);
                            router.push("/");
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary/95 text-white shadow-md text-xs font-bold transition duration-200"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{t.nav.login}</span>
                  </Link>
                )}
              </div>

              {/* Admin Portal shortcut */}
              <Link
                href="/admin/login"
                className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium hover:text-primary transition"
              >
                {t.nav.admin}
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Inquiry Basket for Mobile */}
              <button
                onClick={() => setInquiryDrawerOpen(true)}
                className="relative p-2 rounded-full text-zinc-600 dark:text-zinc-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {inquiryBasket.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {inquiryBasket.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass bg-white/95 dark:bg-dark/95 border-b border-zinc-200 dark:border-zinc-800 py-4 px-4 space-y-4">
            <div className="flex flex-col gap-3.5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="text-base font-bold text-zinc-800 dark:text-zinc-200 py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            <div className="flex items-center justify-between gap-4">
             
             

              <Link
                href="/compare"
                className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 font-semibold"
              >
                <Scaling className="w-4 h-4" />
                <span>Compare ({compareList.length})</span>
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 text-sm font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t.nav.dashboard} ({user.name})</span>
                  </Link>
                  <button
                    onClick={() => {
                      logoutUser();
                      router.push("/");
                    }}
                    className="w-full py-2.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 text-center text-sm font-semibold"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>{t.nav.login}</span>
                </Link>
              )}
              <Link
                href="/admin/login"
                className="text-center text-xs text-zinc-400 dark:text-zinc-500 font-medium pt-2"
              >
                Admin Dashboard Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacing to compensate sticky header in details page */}
      <div className="h-16 w-full" />

      {/* Inquiry Basket drawer */}
      <InquiryDrawer isOpen={inquiryDrawerOpen} onClose={() => setInquiryDrawerOpen(false)} />
    </>
  );
};
