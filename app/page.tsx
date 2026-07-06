"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { categories } from "@/data/mockData";
import { Product } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { FactoryTimeline } from "@/components/FactoryTimeline";
import { FactoryGallery } from "@/components/FactoryGallery";
import { ExportMap } from "@/components/ExportMap";

import { AIRecommendation } from "@/components/AIRecommendation";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import Link from "next/link";
import {
  Boxes,
  ArrowRight,
  Settings2,
  CalendarCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Layers
} from "lucide-react";

export default function Home() {
  const { language, productsList, subscriptions, toggleSubscription } = useApp();
  const t = translations[language];

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Active showcase tab
  const [activeTab, setActiveTab] = useState<"best" | "new" | "trending">("best");

  // Filter products based on homepage tabs
  const showcaseProducts = productsList.filter((p) => {
    if (activeTab === "best") return p.isBestSeller;
    if (activeTab === "new") return p.isNewArrival;
    if (activeTab === "trending") return p.isTrending;
    return true;
  });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Product Categories Section */}
      <section className="py-24 bg-white dark:bg-dark relative overflow-hidden border-b border-zinc-100 dark:border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block">Toy Taxonomy</span>
            <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
              {language === "en" ? "Diverse Product Categories" : language === "zh" ? "丰富的玩具品类" : "বিচিত্র খেলনা ক্যাটাগরি সমূহ"}
            </h2>
            <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
              We operate advanced injection, extrusion, rotocasting, and clean sewing lines. Explore our core custom capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="p-6 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl hover:border-primary/50 dark:hover:border-primary/50 transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition duration-300">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <h3 className="font-poppins font-bold text-base text-zinc-950 dark:text-white mb-2 leading-none">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    {cat.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-primary uppercase tracking-wider mt-6 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OEM / ODM Custom Capabilities */}
      <section className="py-24 bg-zinc-50 dark:bg-dark/40 relative overflow-hidden border-b border-zinc-100 dark:border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">Tailored Manufacturing</span>
              <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white leading-tight">
                {language === "en" ? "Custom Toy Manufacturing (OEM & ODM)" : language === "zh" ? "定制玩具制造 (OEM & ODM)" : "কাস্টম খেলনা ম্যানুফ্যাকচারিং (OEM এবং ODM)"}
              </h2>
              <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-350 leading-relaxed font-medium">
                Whether you possess fully modeled 3D assets or simple napkin concepts, our team provides full end-to-end support: 3D character sculpting, structural stress tests, injection tooling engineering, painting masks drafting, and regulatory laboratory safety submissions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-1">OEM Blueprinting</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">Send CAD drawings, and we'll calculate draft angles, wall thicknesses, and tool lines.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider mb-1">ODM Concepting</h4>
                    <p className="text-[11px] text-zinc-500 leading-relaxed">Our designers draw turnarounds, orthographic sheets, and sculpt 3D models.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden aspect-square border border-zinc-200 dark:border-zinc-800 shadow-2xl relative bg-zinc-900">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1" // Placeholder video
                  title="OEM ODM Toy Factory Details"
                  className="w-full h-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Tab Section */}
      <section className="py-24 bg-white dark:bg-dark relative overflow-hidden border-b border-zinc-100 dark:border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Curated Showroom</span>
              <h2 className="text-3xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white leading-tight">
                {language === "en" ? "Explore Our B2B Showroom" : language === "zh" ? "参观我们的 B2B 展厅" : "আমাদের প্রোডাক্ট শোরুম দেখুন"}
              </h2>
            </div>
            
            {/* Tabs selector */}
            <div className="flex gap-2 p-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-150/60 dark:border-zinc-800 shrink-0">
              <button
                onClick={() => setActiveTab("best")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none transition ${
                  activeTab === "best"
                    ? "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-primary shadow-xs font-bold"
                    : "text-zinc-550 hover:text-primary"
                }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none transition ${
                  activeTab === "new"
                    ? "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-primary shadow-xs font-bold"
                    : "text-zinc-550 hover:text-primary"
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab("trending")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer select-none transition ${
                  activeTab === "trending"
                    ? "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-primary shadow-xs font-bold"
                    : "text-zinc-550 hover:text-primary"
                }`}
              >
                Trending Now
              </button>
            </div>
          </div>

          {/* Grid display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          <div className="text-center pt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold text-xs shadow-md transition"
            >
              <span>View All 1,000+ Sourcing Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Build Your Gift Box Component */}
      

      {/* Subscription Box Section */}
      <section className="py-24 bg-white dark:bg-dark relative overflow-hidden border-b border-zinc-100 dark:border-zinc-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block">Recurring Shipments</span>
            <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
              {language === "en" ? "Interactive Subscription Box" : language === "zh" ? "互动订阅盒" : "ইন্টারেক্টিভ সাবস্ক্রিপশন বক্স"}
            </h2>
            <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
              We construct custom recurring blind boxes, action figures collections, or educational box bundles for direct drop-shipments or retailer bulk fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptions.map((sub) => {
              const isActive = sub.status === "Active";
              return (
                <div
                  key={sub.id}
                  className={`p-8 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 border shadow-xs flex flex-col justify-between h-full relative ${
                    isActive ? "border-primary ring-1 ring-primary" : "border-zinc-150/60 dark:border-zinc-850"
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-primary text-white text-[9px] font-extrabold uppercase tracking-wide">
                      Active
                    </span>
                  )}
                  
                  <div>
                    <h3 className="font-poppins font-bold text-base text-zinc-900 dark:text-white mb-2">{sub.type}</h3>
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-2xl font-poppins font-black text-zinc-900 dark:text-white">${sub.price}</span>
                      <span className="text-[10px] text-zinc-400">/ shipment</span>
                    </div>
                    
                    <ul className="space-y-2.5 text-[11px] text-zinc-500 font-medium pt-4 border-t border-zinc-100 dark:border-zinc-900 mb-8">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        <span>Curated by design experts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        <span>Includes collector certificate cards</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                        <span>Standard drop-shipping logs enabled</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => toggleSubscription(sub.type)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition duration-200 transform hover:-y-0.5 shadow-xs cursor-pointer select-none ${
                      isActive
                        ? "bg-red-500 text-white"
                        : "bg-primary hover:bg-primary/95 text-white"
                    }`}
                  >
                    {isActive ? "Cancel Subscription" : "Select Subscription"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Recommendation Widget */}
      <AIRecommendation onQuickView={(p) => setQuickViewProduct(p)} />

      {/* Global Export Map */}
      <ExportMap />

      {/* Factory Gallery (Masonry lightbox) */}
      <FactoryGallery />

      {/* Customer Reviews */}
      <Testimonials />

      {/* Manufacturing Process Timeline */}
      <FactoryTimeline />

      {/* FAQs */}
      <FAQ />

      {/* Contact Sales Form */}
      <ContactForm />

      {/* Footer */}
      <Footer />

      {/* Live Chat Assistant chatbot */}
      <Chatbot />

      {/* Quick View Modal Manager */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
