"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useApp } from "@/components/AppContext";
import { X, ShoppingCart, CheckCircle2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToInquiry } = useApp();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1000);
  const [customLogo, setCustomLogo] = useState(false);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const isBelowMOQ = quantity < product.moq;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addToInquiry(product, quantity, customLogo, undefined, notes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative bg-white dark:bg-zinc-950 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-850 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:text-primary z-20 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left Panel: Gallery preview */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-150 dark:border-zinc-900">
              <Image
                src={product.images[activeImageIdx]}
                alt={product.name}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border shrink-0 ${
                      activeImageIdx === idx ? "border-primary ring-1 ring-primary" : "border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="60px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Content Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wide">
                  {product.category.replace("-", " ")}
                </span>
                <h3 className="text-lg font-poppins font-black text-zinc-900 dark:text-white leading-tight mt-1">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-b border-zinc-100 dark:border-zinc-900 text-xs">
                <span className="text-lg font-poppins font-black text-primary">{product.priceRange}</span>
                <span className="text-zinc-500 font-semibold">MOQ: <strong className="text-zinc-850 dark:text-zinc-150">{product.moq} units</strong></span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                {product.description}
              </p>

              {/* Specs parameters table */}
              <div className="bg-zinc-50 dark:bg-zinc-900/60 p-4.5 rounded-2xl border border-zinc-150/60 dark:border-zinc-850 text-[10px] font-medium text-zinc-500 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Material:</span>
                  <span className="text-zinc-900 dark:text-zinc-200 font-bold">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Safety Standards:</span>
                  <span className="text-zinc-900 dark:text-zinc-200 font-bold">{product.specs.certifications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Export Port:</span>
                  <span className="text-zinc-900 dark:text-zinc-200 font-bold">{product.specs.port}</span>
                </div>
              </div>
            </div>

            {/* Quick Add Inquiry Form */}
            <form onSubmit={handleAdd} className="mt-6 border-t border-zinc-100 dark:border-zinc-900 pt-5 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                    Order Quantity (Minimum: {product.moq})
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className={`w-full px-3 py-2 border bg-zinc-50/50 dark:bg-zinc-900 text-xs rounded-xl focus:outline-hidden text-zinc-900 dark:text-zinc-50 ${
                      isBelowMOQ ? "border-amber-500 focus:ring-1 focus:ring-amber-500" : "border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {isBelowMOQ && (
                    <p className="text-[10px] text-amber-600 font-medium mt-1">
                      * Quantity is below target factory tool MOQ.
                    </p>
                  )}
                </div>
                
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customLogo}
                      onChange={() => setCustomLogo(!customLogo)}
                      className="rounded border-zinc-300 text-primary w-4 h-4"
                    />
                    <span>Custom Logo</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={added}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs shadow-md transition ${
                    added
                      ? "bg-emerald-500 text-white"
                      : "bg-primary hover:bg-primary/95 text-white transform hover:-y-0.5"
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Inquiry</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Inquiry Basket</span>
                    </>
                  )}
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-primary text-zinc-650 hover:text-primary dark:text-zinc-400 dark:hover:text-primary text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Full Details</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
