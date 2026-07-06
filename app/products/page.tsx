"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useApp } from "@/components/AppContext";
import { Product } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { Search, SlidersHorizontal, Grid, X, HelpCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const { productsList, language } = useApp();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Quick view Modal state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Prepopulate default category if present in query parameters
  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategory(defaultCategory);
    }
  }, [defaultCategory]);

  // Derived filter arrays
  const uniqueCategories = Array.from(new Set(productsList.map((p) => p.category)));
  const uniqueMaterials = ["ABS", "PVC", "Vinyl", "Cotton", "Beechwood", "Alloy"];

  // Filter logic
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.material.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

    const matchesMaterial =
      selectedMaterial === "all" ||
      product.material.toLowerCase().includes(selectedMaterial.toLowerCase());

    const matchesAge =
      selectedAge === "all" ||
      product.ageGroup.toLowerCase().includes(selectedAge.toLowerCase());

    return matchesSearch && matchesCategory && matchesMaterial && matchesAge;
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 py-12 bg-zinc-50 dark:bg-dark/20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white leading-none">
                {language === "en" ? "B2B Toy Manufacturing Catalog" : language === "zh" ? "B2B 玩具制造目录" : "বিটুবি খেলনা ক্যাটালগ"}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
                {language === "en"
                  ? "Sourcing list synced with live catalog. Select products to request sample pricing and custom molds."
                  : language === "zh"
                  ? "采购清单与实时目录同步。选择产品以申请样品报价和定制模具。"
                  : "Sourcing list synced with live catalog. Select products to request sample pricing and custom molds."}
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search materials, names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs bg-white dark:bg-dark focus:outline-hidden focus:ring-1 focus:ring-primary text-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Filters (Desktop - 3 Cols) */}
            <div className="hidden lg:block lg:col-span-3 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-3">
                <h3 className="font-poppins font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>Sourcing Filters</span>
                </h3>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedMaterial("all");
                    setSelectedAge("all");
                    setSearchQuery("");
                  }}
                  className="text-[10px] text-zinc-400 hover:text-primary font-bold transition"
                >
                  Reset
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-2.5">Category</label>
                <div className="space-y-1.5 text-xs font-semibold">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition ${
                      selectedCategory === "all" ? "bg-primary/10 text-primary" : "text-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    All Categories
                  </button>
                  {uniqueCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition capitalize ${
                        selectedCategory === cat ? "bg-primary/10 text-primary" : "text-zinc-650 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      }`}
                    >
                      {cat.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-2.5">Base Material</label>
                <div className="space-y-1.5 text-xs font-semibold">
                  <button
                    onClick={() => setSelectedMaterial("all")}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition ${
                      selectedMaterial === "all" ? "bg-primary/10 text-primary" : "text-zinc-655 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    All Materials
                  </button>
                  {uniqueMaterials.map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition ${
                        selectedMaterial === mat ? "bg-primary/10 text-primary" : "text-zinc-655 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Bracket */}
              <div>
                <label className="block text-[10px] text-zinc-455 dark:text-zinc-400 font-bold uppercase tracking-wider mb-2.5">Target Age Bracket</label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary"
                >
                  <option value="all">All Ages</option>
                  <option value="0+">0+ Months</option>
                  <option value="3+">3+ Years</option>
                  <option value="6+">6+ Years</option>
                  <option value="8+">8+ Years</option>
                  <option value="14+">14+ Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters Toggle Button */}
            <div className="lg:hidden flex justify-between items-center bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-850 rounded-2xl w-full">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">Active Products ({filteredProducts.length})</span>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                <SlidersHorizontal className="w-4.5 h-4.5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Products Grid (Right Panel - 9 Cols) */}
            <div className="lg:col-span-9 space-y-6">
              {filteredProducts.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6">
                  <HelpCircle className="w-12 h-12 text-zinc-300 dark:text-zinc-750 mb-3 animate-pulse" />
                  <h4 className="text-sm font-poppins font-bold text-zinc-900 dark:text-white mb-1">No products found</h4>
                  <p className="text-xs text-zinc-450 dark:text-zinc-500 max-w-sm">
                    No items match your selected filters. Reset search terms or selections above to view items.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMobileFilters(false)} />
          <div className="relative w-80 bg-white dark:bg-zinc-950 h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-poppins font-bold text-sm text-zinc-900 dark:text-white">Mobile Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-450 uppercase mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.replace("-", " ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Materials */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-450 uppercase mb-2">Base Material</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                >
                  <option value="all">All Materials</option>
                  {uniqueMaterials.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Bracket */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-450 uppercase mb-2">Target Age Bracket</label>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                >
                  <option value="all">All Ages</option>
                  <option value="0+">0+ Months</option>
                  <option value="3+">3+ Years</option>
                  <option value="6+">6+ Years</option>
                  <option value="8+">8+ Years</option>
                  <option value="14+">14+ Years</option>
                  <option value="15+">15+ Years</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl mt-6 shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 dark:bg-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
