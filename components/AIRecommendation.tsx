"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Cpu, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface AIRecommendationProps {
  onQuickView: (product: Product) => void;
}

export const AIRecommendation: React.FC<AIRecommendationProps> = ({ onQuickView }) => {
  const { productsList, language } = useApp();

  const [ageGroup, setAgeGroup] = useState("all");
  const [budgetRange, setBudgetRange] = useState("all");
  const [category, setCategory] = useState("all");
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const ageGroups = [
    { id: "all", label: "All Ages" },
    { id: "0+", label: "0-3 Years" },
    { id: "6+", label: "6-8 Years" },
    { id: "8+", label: "8-12 Years" },
    { id: "14+", label: "14+ Collectors" }
  ];

  const budgets = [
    { id: "all", label: "Any Budget" },
    { id: "low", label: "Under $2.00" },
    { id: "mid", label: "$2.00 - $5.00" },
    { id: "high", label: "Above $5.00" }
  ];

  const categoriesList = [
    { id: "all", label: "All Types" },
    { id: "pvc-toys", label: "PVC/Diecast" },
    { id: "vinyl-toys", label: "Vinyl Designer" },
    { id: "action-figures", label: "Action Figures" },
    { id: "plush-toys", label: "Plush Toys" },
    { id: "educational-toys", label: "STEM / Educational" }
  ];

  const handleRecommend = () => {
    setIsSearching(true);
    setHasSearched(false);

    setTimeout(() => {
      let filtered = [...productsList];

      // Age group filter
      if (ageGroup !== "all") {
        if (ageGroup === "0+") {
          filtered = filtered.filter(p => p.ageGroup.includes("0+") || p.ageGroup.includes("3+"));
        } else if (ageGroup === "6+") {
          filtered = filtered.filter(p => p.ageGroup.includes("6+") || p.ageGroup.includes("3+"));
        } else if (ageGroup === "8+") {
          filtered = filtered.filter(p => p.ageGroup.includes("8") || p.ageGroup.includes("6"));
        } else if (ageGroup === "14+") {
          filtered = filtered.filter(p => p.ageGroup.includes("14") || p.ageGroup.includes("15"));
        }
      }

      // Budget filter parsing
      if (budgetRange !== "all") {
        filtered = filtered.filter(p => {
          // Parse price range e.g. "$1.50 - $3.00"
          const cleanPrice = p.priceRange.replace(/\$/g, "");
          const prices = cleanPrice.split("-").map(p => parseFloat(p.trim()));
          const avgPrice = prices.length > 1 ? (prices[0] + prices[1]) / 2 : prices[0];

          if (budgetRange === "low") return avgPrice < 2.0;
          if (budgetRange === "mid") return avgPrice >= 2.0 && avgPrice <= 5.0;
          if (budgetRange === "high") return avgPrice > 5.0;
          return true;
        });
      }

      // Category filter
      if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
      }

      // Take top 3 or fallback to trending products if no direct match
      if (filtered.length === 0) {
        // Fallback to general best sellers
        setRecommendations(productsList.filter(p => p.isTrending || p.isBestSeller).slice(0, 3));
      } else {
        setRecommendations(filtered.slice(0, 3));
      }

      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  return (
    <section id="ai-recommender" className="py-24 bg-white dark:bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Procurement Insights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {language === "en" ? "AI Recommended Toy Suggestions" : "এআই টয় রিকমেন্ডেশন সিস্টেম"}
          </h2>
          <p className="text-sm text-zinc-555 dark:text-zinc-400 font-medium leading-relaxed">
            Specify target audience parameters, per-unit FOB cost budgets, and toy categories to instantly query our production line matches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* AI Controls (Left Panel - 4 Cols) */}
          <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 shadow-xs space-y-6">
            <h3 className="font-poppins font-extrabold text-sm text-zinc-950 dark:text-white flex items-center gap-2 border-b border-zinc-200/50 dark:border-zinc-800 pb-3">
              <Sparkles className="w-4.5 h-4.5 text-primary" />
              <span>Target Sourcing Criteria</span>
            </h3>

            {/* Age selector */}
            <div>
              <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-2">Age Bracket</label>
              <div className="flex flex-wrap gap-1.5">
                {ageGroups.map(age => (
                  <button
                    key={age.id}
                    onClick={() => setAgeGroup(age.id)}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition select-none ${
                      ageGroup === age.id
                        ? "bg-primary border-primary text-white font-bold"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:border-primary/50"
                    }`}
                  >
                    {age.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget selector */}
            <div>
              <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-2">Unit Target FOB Budget</label>
              <div className="flex flex-wrap gap-1.5">
                {budgets.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setBudgetRange(b.id)}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition select-none ${
                      budgetRange === b.id
                        ? "bg-primary border-primary text-white font-bold"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:border-primary/50"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category selector */}
            <div>
              <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-2">Primary Toy Segment</label>
              <div className="flex flex-wrap gap-1.5">
                {categoriesList.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-semibold cursor-pointer transition select-none ${
                      category === cat.id
                        ? "bg-primary border-primary text-white font-bold"
                        : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:border-primary/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleRecommend}
              disabled={isSearching}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition transform hover:-y-0.5"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Production Matches...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Query AI Recommendations</span>
                </>
              )}
            </button>
          </div>

          {/* AI Output Panel (Right Panel - 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {!hasSearched && !isSearching ? (
              <div className="h-full py-16 flex flex-col items-center justify-center text-center bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6">
                <Cpu className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-3 animate-pulse" />
                <h4 className="text-sm font-poppins font-bold text-zinc-900 dark:text-white mb-1">AI Recommendation Engine Idle</h4>
                <p className="text-xs text-zinc-450 dark:text-zinc-500 max-w-sm">
                  Select your age bracket, unit budget, and categories on the left, then click "Query AI Recommendations" to load factory suggestions.
                </p>
              </div>
            ) : isSearching ? (
              <div className="h-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
                <h4 className="text-sm font-poppins font-bold text-zinc-950 dark:text-white">Analyzing custom specifications</h4>
                <p className="text-xs text-zinc-400 mt-1">Cross-referencing MOQ values, pricing brackets, and certifications...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">AI Sourced Matches ({recommendations.length})</h4>
                  <span className="text-[10px] text-zinc-400 font-medium">Matching data synced from LocalStorage</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {recommendations.map(product => (
                    <div key={product.id} className="h-full">
                      <ProductCard product={product} onQuickView={onQuickView} />
                    </div>
                  ))}
                </div>

                {recommendations.length > 0 && (
                  <div className="flex gap-2 p-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150/60 dark:border-zinc-850 rounded-2xl text-[10px] text-zinc-500 font-medium mt-4">
                    <AlertCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span>Based on your criteria, these products offer the best combination of pricing, compliance testing, and delivery cycles. Click 'Details' to customize.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
