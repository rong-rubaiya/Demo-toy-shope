"use client";

import React from "react";
import { useApp } from "@/components/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Trash2, ShoppingCart, HelpCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ComparePage() {
  const { compareList, productsList, toggleCompare, addToInquiry } = useApp();

  // Find products matching compare list IDs
  const compareProducts = productsList.filter((p) => compareList.includes(p.id));

  return (
    <>
      <Navbar />

      <main className="flex-1 py-12 bg-zinc-50 dark:bg-dark/20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-primary transition mb-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Toy Catalog</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white leading-none">
              Product Specifications Comparison
            </h1>
            <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 font-semibold">
              Inspect toy sizes, certifications, price estimates, and timelines side-by-side.
            </p>
          </div>

          {compareProducts.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6">
              <HelpCircle className="w-12 h-12 text-zinc-300 dark:text-zinc-750 mb-3 animate-pulse" />
              <h4 className="text-sm font-poppins font-bold text-zinc-900 dark:text-white mb-1">No products selected</h4>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 max-w-sm mb-6">
                Browse our toys and check the "Compare" checkbox on product cards to add them to this table.
              </p>
              <Link
                href="/products"
                className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md"
              >
                Browse Toys Catalog
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150/60 dark:border-zinc-850 text-[10px] font-bold text-zinc-450 uppercase tracking-wider">
                      <th className="px-6 py-4 min-w-[200px]">Parameter</th>
                      {compareProducts.map((p) => (
                        <th key={p.id} className="px-6 py-4 min-w-[240px] relative">
                          <button
                            onClick={() => toggleCompare(p.id)}
                            className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                            title="Remove from comparison"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-3">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border shrink-0 bg-zinc-50">
                              <Image src={p.images[0]} alt={p.name} fill sizes="60px" className="object-cover" />
                            </div>
                            <div className="text-left font-poppins font-bold text-zinc-900 dark:text-white text-xs leading-snug">
                              <Link href={`/products/${p.slug}`} className="hover:text-primary transition line-clamp-2">
                                {p.name}
                              </Link>
                              <span className="block text-[9px] text-zinc-400 font-extrabold uppercase mt-0.5 leading-none">{p.category.replace("-", " ")}</span>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-zinc-150/60 dark:divide-zinc-850 text-xs text-zinc-650 dark:text-zinc-300 font-semibold">
                    {/* Price Range */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Est. FOB Unit Cost</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4 font-black text-primary text-sm">{p.priceRange}</td>
                      ))}
                    </tr>

                    {/* MOQ */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Minimum Order Qty</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4 text-zinc-900 dark:text-white font-bold">{p.moq} units</td>
                      ))}
                    </tr>

                    {/* Material */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Main Raw Materials</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">{p.material}</td>
                      ))}
                    </tr>

                    {/* Age Group */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Target Age Range</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">{p.ageGroup}</td>
                      ))}
                    </tr>

                    {/* Size */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Dimensions</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">{p.specs.size}</td>
                      ))}
                    </tr>

                    {/* Weight */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Unit Net Weight</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">{p.specs.weight}</td>
                      ))}
                    </tr>

                    {/* Certifications */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Safety Testing</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">
                          <span className="inline-block bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded text-[10px] font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                            {p.specs.certifications}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Port */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Logistics Port</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">{p.specs.port}</td>
                      ))}
                    </tr>

                    {/* Production Time */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Tooling & Lead Time</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">{p.productionTime}</td>
                      ))}
                    </tr>

                    {/* Actions Row */}
                    <tr>
                      <td className="px-6 py-4 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Quick Actions</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="px-6 py-4">
                          <button
                            onClick={() => {
                              addToInquiry(p, p.moq, false);
                              alert(`${p.name} added to RFQ!`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-[10px] font-bold transition shadow-xs cursor-pointer"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add Inquiry</span>
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
