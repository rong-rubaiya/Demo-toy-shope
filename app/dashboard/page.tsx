"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/components/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User as UserIcon,
  LayoutDashboard,
  Heart,
  ShoppingBag,
  Gift,
  Award,
  CalendarCheck,
  Bell,
  Settings,
  LogOut,
  RefreshCw,
  Building,
  Mail,
  Phone,
  Trash2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

export default function UserDashboardPage() {
  const {
    user,
    logoutUser,
    wishlist = [],
    productsList = [],
    toggleWishlist,
    allInquiries = [],
    addToInquiry,
    giftOrders = [],
    subscriptions = [],
    toggleSubscription,
    rewardPoints = 0
  } = useApp();

  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultTab = searchParams ? searchParams.get("tab") : null;

  const [activeTab, setActiveTab] = useState("dashboard");
  const [mounted, setMounted] = useState(false);

  // Set mounted flag and initial tab
  useEffect(() => {
    setMounted(true);
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  // Auth Guard
  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [user, router, mounted]);

  // Prevent SSR hydration mismatches or early renders when user is unauthenticated
  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">
            Verifying client credentials...
          </p>
        </div>
      </div>
    );
  }

  // Sidebar items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "inquiries", label: "My Inquiries", icon: ShoppingBag },
    { id: "gifts", label: "Gift Orders", icon: Gift },
    { id: "rewards", label: "Reward Points", icon: Award },
    { id: "subscriptions", label: "Subscriptions", icon: CalendarCheck },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  // Wishlist items fallback handling
  const wishlistToys = productsList.filter((p) => wishlist.includes(p.id));

  // One-click Reorder function safely mapping arguments
  const handleReorder = (inquiryItems: any[]) => {
    if (!inquiryItems) return;
    inquiryItems.forEach((item) => {
      addToInquiry?.(item.product, item.quantity, item.customLogo, item.logoImage, item.notes);
    });
    alert("All items from this past RFQ have been added back to your active Inquiry Basket!");
  };

  // AI suggestions fallback safe slice
  const aiRecommendations = productsList.filter((p) => !wishlist.includes(p.id)).slice(0, 2);

  // Points target progress logic
  const pointsTarget = 500;
  const progressPercent = Math.min(100, (rewardPoints / pointsTarget) * 100);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900/20 flex flex-col">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Menu (3 Cols) */}
          <div className="lg:col-span-3 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 shadow-xs space-y-6">
            {/* User Meta */}
            <div className="flex items-center gap-3.5 pb-5 border-b border-zinc-100 dark:border-zinc-900">
              <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.split(" ").map((w: string) => w[0]).join("") : "U"}
              </div>
              <div className="text-left leading-tight">
                <h3 className="font-poppins font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">
                  {user?.name}
                </h3>
                <span className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-wide">
                  {user?.company || "Procurement Officer"}
                </span>
              </div>
            </div>

            {/* Menu List */}
            <nav className="space-y-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition ${
                      isActive
                        ? "bg-primary/10 text-primary font-bold border-l-4 border-primary rounded-l-none"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.id === "wishlist" && wishlist.length > 0 && (
                      <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[9px] font-bold">
                        {wishlist.length}
                      </span>
                    )}
                    {item.id === "inquiries" && allInquiries.length > 0 && (
                      <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full text-[9px] font-bold">
                        {allInquiries.length}
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  logoutUser?.();
                  router.push("/");
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 text-left rounded-xl transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* Tab Content Display (9 Cols) */}
          <div className="lg:col-span-9 bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xs min-h-[500px]">
            {/* TAB: DASHBOARD OVERVIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-8 dynamic-fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 mb-4 gap-2">
                  <div>
                    <h2 className="text-xl font-poppins font-black text-zinc-900 dark:text-white leading-none">
                      Welcome Back, {user?.name ? user.name.split(" ")[0] : ""}
                    </h2>
                    <p className="text-[10px] text-zinc-500 mt-1 font-semibold">
                      Account Category: B2B Verified Sourcing Partner
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/20 border border-emerald-200/50 text-emerald-600 dark:text-emerald-400 font-extrabold uppercase px-2.5 py-0.5 rounded-md">
                    Points Balance: {rewardPoints} XP
                  </span>
                </div>

                {/* Dashboard Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850 p-5 rounded-2xl flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Total RFQ Inquiries</span>
                      <span className="block text-xl font-poppins font-black text-zinc-900 dark:text-white mt-1">
                        {allInquiries.length} Submitted
                      </span>
                    </div>
                    <ShoppingBag className="w-9 h-9 text-primary/35 stroke-[1.5]" />
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850 p-5 rounded-2xl flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Active Subscriptions</span>
                      <span className="block text-xl font-poppins font-black text-zinc-900 dark:text-white mt-1">
                        {subscriptions.filter((s: any) => s.status === "Active").length} Box Plans
                      </span>
                    </div>
                    <CalendarCheck className="w-9 h-9 text-sky-400/35 stroke-[1.5]" />
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850 p-5 rounded-2xl flex items-center justify-between shadow-xs">
                    <div>
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Custom Gift Orders</span>
                      <span className="block text-xl font-poppins font-black text-zinc-900 dark:text-white mt-1">
                        {giftOrders.length} Bundles
                      </span>
                    </div>
                    <Gift className="w-9 h-9 text-amber-400/35 stroke-[1.5]" />
                  </div>
                </div>

                {/* Rewards XP Level progress */}
                <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-850 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-zinc-900 dark:text-white flex items-center gap-1">
                      <Award className="w-4 h-4 text-primary" />
                      XP Rewards Level Progress
                    </span>
                    <span className="font-bold text-zinc-400">{rewardPoints} / {pointsTarget} XP</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-850 h-3.5 rounded-full overflow-hidden border border-zinc-100/50">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed font-semibold">
                    Earn 500 XP to redeem a **Free 3D Prototype SLS sample sculpt** for your next custom mold lines! Submitting B2B RFQs awards 50 XP; Gift builds award 30 XP.
                  </p>
                </div>

                {/* AI recommendations */}
                <div className="space-y-4">
                  <h3 className="font-poppins font-black text-sm text-zinc-900 dark:text-white uppercase tracking-wider border-b pb-2">
                    AI Recommended for You
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {aiRecommendations.map((p) => (
                      <div key={p.id} className="flex gap-4 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-zinc-200">
                          {p.images?.[0] && (
                            <Image src={p.images[0]} alt={p.name || "Product"} fill sizes="60px" className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-zinc-950 dark:text-white truncate max-w-[150px]">{p.name}</h4>
                            <span className="text-[9px] text-zinc-400 capitalize">{p.category}</span>
                          </div>
                          <Link href={`/products/${p.slug}`} className="text-[9px] text-primary font-bold uppercase tracking-wider">
                            Configure RFQ &gt;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Client Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-semibold">
                  <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Full Representative Name</span>
                    <span className="text-zinc-900 dark:text-white flex items-center gap-1.5 font-bold">
                      <UserIcon className="w-4 h-4 text-primary" />
                      {user?.name}
                    </span>
                  </div>
                  
                  <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Registered Corporation</span>
                    <span className="text-zinc-900 dark:text-white flex items-center gap-1.5 font-bold">
                      <Building className="w-4 h-4 text-primary" />
                      {user?.company || "N/A"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Business Sourcing Email</span>
                    <span className="text-zinc-900 dark:text-white flex items-center gap-1.5 font-bold">
                      <Mail className="w-4 h-4 text-primary" />
                      {user?.email}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border bg-zinc-50 dark:bg-zinc-900/50 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Direct Phone Line</span>
                    <span className="text-zinc-900 dark:text-white flex items-center gap-1.5 font-bold">
                      <Phone className="w-4 h-4 text-primary" />
                      {user?.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">
                  My Wishlist ({wishlist.length})
                </h2>
                {wishlistToys.length === 0 ? (
                  <div className="py-16 text-center text-zinc-400">
                    <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-2" />
                    <p className="text-xs">Your wishlist is empty. Check product cards to bookmark toys.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {wishlistToys.map((toy) => (
                      <div key={toy.id} className="relative group border border-zinc-100 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900">
                        <button
                          onClick={() => toggleWishlist?.(toy.id)}
                          className="absolute top-4 right-4 p-1.5 rounded-full bg-red-500 text-white z-10 hover:bg-red-600 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <div className="opacity-90">
                          <ProductCard product={toy} onQuickView={() => {}} />
                        </div>
                        <div className="p-3 border-t border-zinc-100 flex justify-center bg-zinc-50 dark:bg-zinc-950">
                          <Link href={`/products/${toy.slug}`} className="text-[10px] font-bold text-primary uppercase tracking-wider">
                            Configure RFQ
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: INQUIRIES HISTORY */}
            {activeTab === "inquiries" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">
                  Sourcing Inquiries RFQ
                </h2>
                {allInquiries.length === 0 ? (
                  <div className="py-16 text-center text-zinc-400">
                    <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-2 animate-pulse" />
                    <p className="text-xs">No inquiries submitted yet. Add toys to inquiry basket and submit RFQ.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allInquiries.map((inq: any) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-poppins font-black text-sm text-zinc-950 dark:text-white">{inq.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide border ${
                              inq.status === "Pending"
                                ? "bg-amber-100 border-amber-200 text-amber-600"
                                : "bg-emerald-100 border-emerald-200 text-emerald-600"
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 font-semibold">Submitted: {inq.date} | {inq.totalQuantity} items requested</p>
                          <div className="flex flex-col gap-1 pt-1.5 text-[10px] text-zinc-600 dark:text-zinc-400">
                            {inq.items?.map((it: any) => (
                              <span key={it.product?.id} className="font-semibold">• {it.product?.name} (x{it.quantity} units)</span>
                            ))}
                          </div>
                        </div>

                        {/* One Click Reorder Action */}
                        <button
                          onClick={() => handleReorder(inq.items)}
                          className="flex items-center gap-1.5 px-3.5 py-2 border border-zinc-200 dark:border-zinc-800 hover:border-primary text-zinc-700 dark:text-zinc-300 hover:text-primary rounded-xl text-[10px] font-bold transition shrink-0 cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>One-Click Reorder</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: GIFT BOX ORDERS */}
            {activeTab === "gifts" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Gift Box Orders</h2>
                {giftOrders.length === 0 ? (
                  <div className="py-16 text-center text-zinc-400">
                    <Gift className="w-12 h-12 text-zinc-300 mx-auto mb-2" />
                    <p className="text-xs">No customized gift box orders. Build custom packages using the Gift Box tool.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {giftOrders.map((gft: any) => (
                      <div
                        key={gft.id}
                        className="p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4"
                      >
                        <div className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-poppins font-black text-sm text-zinc-950 dark:text-white">{gft.id}</span>
                            <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase bg-sky-100 text-sky-600 border border-sky-200">{gft.status}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-bold">Est. Value: ${gft.price?.toFixed(2)}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] text-zinc-500 font-semibold leading-relaxed">
                          <div>
                            <span className="block text-[8px] text-zinc-400 uppercase tracking-wider mb-0.5">Configuration</span>
                            <p className="text-zinc-950 dark:text-white font-bold">Box: {gft.boxDesign}</p>
                            <p className="text-zinc-950 dark:text-white font-bold">Toy: {gft.toyName}</p>
                            <p className="text-zinc-950 dark:text-white font-bold">Extras: {gft.extras?.join(", ")}</p>
                          </div>
                          <div>
                            <span className="block text-[8px] text-zinc-400 uppercase tracking-wider mb-0.5">Delivery Details</span>
                            <p className="text-zinc-950 dark:text-white font-bold">Recipient: {gft.recipientName}</p>
                            <p className="text-zinc-950 dark:text-white font-bold">Date: {gft.deliveryDate}</p>
                            <p className="text-zinc-950 dark:text-white font-bold">Address: {gft.recipientAddress}</p>
                          </div>
                          <div className="bg-zinc-100 dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800">
                            <span className="block text-[8px] text-zinc-400 uppercase tracking-wider mb-1 font-bold">Greeting Message</span>
                            <p className="font-bold text-zinc-950 dark:text-white">{gft.message?.title}</p>
                            <p className="italic text-zinc-500 dark:text-zinc-400 mt-0.5">"{gft.message?.body}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: REWARD POINTS */}
            {activeTab === "rewards" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Loyalty XP & Rewards</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
                    <Award className="w-12 h-12 text-primary mb-3" />
                    <span className="text-2xl font-poppins font-black text-zinc-950 dark:text-white leading-none mb-1">{rewardPoints} XP</span>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Current Account Balance</span>
                  </div>

                  <div className="space-y-4 text-xs font-semibold leading-relaxed text-zinc-500">
                    <h3 className="font-poppins font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px] mb-1">XP Milestones Achievements</h3>
                    <div className="flex gap-2.5 items-center">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px]">✓</div>
                      <div>
                        <p className="text-zinc-850 dark:text-white font-bold leading-none">B2B Account verified</p>
                        <span className="text-[9px] text-zinc-400">Awarded +100 XP upon client initialization.</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2.5 items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        rewardPoints >= 500 ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-400"
                      }`}>{rewardPoints >= 500 ? "✓" : "2"}</div>
                      <div>
                        <p className="text-zinc-850 dark:text-white font-bold leading-none">Free 3D Printed SLS Proof Sample</p>
                        <span className="text-[9px] text-zinc-400">Target 500 XP. Redeems client tooling mock check.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SUBSCRIPTIONS */}
            {activeTab === "subscriptions" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Subscriptions box schedules</h2>
                <div className="space-y-4">
                  {subscriptions.map((sub: any) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/20 transition"
                    >
                      <div className="space-y-1">
                        <h3 className="font-poppins font-bold text-sm text-zinc-900 dark:text-white">{sub.type}</h3>
                        <p className="text-[10px] text-zinc-500 font-semibold">FOB Value: ${sub.price} | Cycle: Monthly recurrent</p>
                        <div className="text-[10px] text-zinc-500 font-semibold space-y-0.5 pt-1">
                          <p>Start Date: <strong className="text-zinc-800 dark:text-zinc-200">{sub.startDate}</strong></p>
                          <p>Next container dispatch: <strong className="text-zinc-800 dark:text-zinc-200">{sub.nextDelivery}</strong></p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSubscription?.(sub.type)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl shadow-xs transition duration-200 cursor-pointer select-none ${
                          sub.status === "Active"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-primary text-white hover:bg-primary/95"
                        }`}
                      >
                        {sub.status === "Active" ? "Cancel Plan" : "Activate Plan"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Client Notifications</h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 dark:bg-blue-950/20 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-start gap-3">
                    <Bell className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-zinc-950 dark:text-white mb-0.5">Welcome Sourcing Bonus Credited!</h4>
                      <p className="text-zinc-500 text-[11px] leading-relaxed">Welcome to Ens Toys. Your B2B procurement account is active, and we've pre-credited +100 Loyalty XP to your account.</p>
                      <span className="block text-[9px] text-zinc-400 mt-1">June 27, 2026</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 dark:bg-amber-950/20 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-start gap-3">
                    <Bell className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-zinc-950 dark:text-white mb-0.5">Tooling mold updates</h4>
                      <p className="text-zinc-500 text-[11px] leading-relaxed">Our CNC machines are running summer servicing schedules. Standard custom steel molds lead times will be adjusted by +3 days.</p>
                      <span className="block text-[9px] text-zinc-400 mt-1">June 25, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white border-b pb-3 uppercase tracking-wider">Settings</h2>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Language preferences</label>
                    <select className="w-full px-3 py-2 border rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800">
                      <option>English (Global Sourcing)</option>
                      <option>Bengali (বাংলা)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Corporate Currency Units</label>
                    <select className="w-full px-3 py-2 border rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800">
                      <option>USD ($) - Default</option>
                      <option>EUR (€)</option>
                      <option>JPY (¥)</option>
                    </select>
                  </div>
                  <button
                    onClick={() => alert("Settings saved locally!")}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Save Options
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}