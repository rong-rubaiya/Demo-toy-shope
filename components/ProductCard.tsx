"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useApp } from "@/components/AppContext";
import { Heart, ShoppingCart, Scaling, Eye, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { wishlist, toggleWishlist, compareList, toggleCompare, addToInquiry, language } = useApp();
  const [isInquiryAdded, setIsInquiryAdded] = useState(false);

  const isFavorited = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);

  const handleAddToInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToInquiry(product, product.moq, false); // Add MOQ as the default initial quantity
    setIsInquiryAdded(true);
    setTimeout(() => setIsInquiryAdded(false), 2000);
  };

  return (
    <div className="group relative bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
      {/* Product Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50 border-b border-zinc-100 dark:border-zinc-900 shrink-0">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-w-768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-white text-[9px] font-extrabold uppercase tracking-wide shadow-xs">
              Best Seller
            </span>
          )}
          {product.isTrending && (
            <span className="px-2.5 py-0.5 rounded-md bg-sky-400 text-white text-[9px] font-extrabold uppercase tracking-wide shadow-xs">
              Trending
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 rounded-md bg-primary text-white text-[9px] font-extrabold uppercase tracking-wide shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Favorite Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-xs border z-10 transition cursor-pointer ${
            isFavorited
              ? "bg-red-500 border-red-500 text-white scale-105"
              : "bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:text-red-500"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        {/* Quick actions hover overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 rounded-full bg-white text-zinc-900 hover:bg-primary hover:text-white transition shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleAddToInquiry}
            className={`p-3 rounded-full transition shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 ${
              isInquiryAdded ? "bg-emerald-500 text-white" : "bg-white text-zinc-900 hover:bg-primary hover:text-white"
            }`}
            title="Add to Inquiry"
          >
            {isInquiryAdded ? <CheckCircle2 className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wide">
            {product.category.replace("-", " ")}
          </span>

          <Link href={`/products/${product.slug}`} className="block mt-1">
            <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-50 line-clamp-1 group-hover:text-primary transition leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Pricing & MOQ Row */}
          <div className="flex items-baseline justify-between mt-3 mb-4">
            <span className="text-xs sm:text-sm font-poppins font-black text-primary leading-none">
              {product.priceRange}
            </span>
            <span className="text-[10px] text-zinc-500 font-semibold">
              MOQ: <strong className="text-zinc-800 dark:text-zinc-200">{product.moq}</strong>
            </span>
          </div>

          {/* Specs List */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 border-t border-zinc-100 dark:border-zinc-900 pt-3 text-[10px] text-zinc-500 font-medium">
            <div className="flex justify-between">
              <span className="text-zinc-400">Material:</span>
              <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[60px] font-semibold">{product.material.split(" ")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Age:</span>
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{product.ageGroup}</span>
            </div>
          </div>
        </div>

        {/* Compare Checkbox */}
        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 pt-3">
          <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold select-none cursor-pointer">
            <input
              type="checkbox"
              checked={isCompared}
              onChange={() => toggleCompare(product.id)}
              className="rounded border-zinc-300 dark:border-zinc-800 text-primary focus:ring-primary w-3.5 h-3.5 bg-zinc-50"
            />
            <span>Compare</span>
          </label>
          
          <Link
            href={`/products/${product.slug}`}
            className="text-[10px] text-zinc-400 hover:text-primary font-bold uppercase tracking-wider flex items-center gap-0.5"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
