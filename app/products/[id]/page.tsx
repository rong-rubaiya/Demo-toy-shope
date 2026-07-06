"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/components/AppContext";
import { Product } from "@/types";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import {
  Heart,
  ShoppingCart,
  Download,
  Calendar,
  Layers,
  Award,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Scaling
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const slug = params.id;

  const {
    productsList,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    addToInquiry,
    addRecentlyViewed
  } = useApp();

  const router = useRouter();

  // Find product by slug
  const product = productsList.find((p) => p.slug === slug);

  // States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1000);
  const [customLogo, setCustomLogo] = useState(false);
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Log in recently viewed on mount
  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      // Set default quantity to MOQ
      setQuantity(product.moq);
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex-1 py-20 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Product Not Found</h2>
          <p className="text-sm text-zinc-500 mb-6">The toy configuration you requested does not exist in our catalog.</p>
          <Link href="/products" className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-md">
            Return to Toy Catalog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const isFavorited = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const isBelowMOQ = quantity < product.moq;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToInquiry(product, quantity, customLogo, undefined, notes);
    setAdded(true);
    setNotes("");
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDownloadCatalog = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Specification Catalog PDF generated! Your download will start shortly.");
    }, 1500);
  };

  // Find related products in same category
  const relatedProducts = productsList
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="flex-1 py-12 bg-zinc-50 dark:bg-dark/20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 font-semibold mb-8">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-900 dark:text-white truncate capitalize max-w-[200px]">{product.name}</span>
          </nav>

          {/* Product Presentation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Gallery Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-150/65 dark:border-zinc-850 shadow-xs">
                <Image
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-w-768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 shrink-0">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden border shrink-0 transition ${
                        activeImageIdx === idx ? "border-primary ring-1 ring-primary" : "border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Panel (7 Cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-900 pb-5">
                <div>
                  <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-wider">
                    {product.category.replace("-", " ")}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-poppins font-black text-zinc-950 dark:text-white leading-tight mt-1">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  {/* Compare Toggle */}
                  <button
                    onClick={() => toggleCompare(product.id)}
                    className={`p-2.5 rounded-full border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isCompared
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-650"
                    }`}
                  >
                    <Scaling className="w-4 h-4" />
                    <span>Compare</span>
                  </button>

                  {/* Favorite Toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-2.5 rounded-full border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      isFavorited
                        ? "bg-red-50 border-red-500 text-white"
                        : "bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-650"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Price range & MOQ */}
              <div className="grid grid-cols-2 gap-4 py-4 border-b border-zinc-100 dark:border-zinc-900">
                <div>
                  <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Est. FOB Price Range</span>
                  <span className="text-xl sm:text-2xl font-poppins font-black text-primary leading-none">{product.priceRange}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">Target Production MOQ</span>
                  <span className="text-xl font-poppins font-black text-zinc-900 dark:text-white leading-none">{product.moq} units</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-zinc-650 dark:text-zinc-300 font-medium">
                <p>{product.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 text-[10px]">
                  <span className="px-2.5 py-1 rounded bg-zinc-50 border border-zinc-150 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                    Material: <strong>{product.material}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded bg-zinc-50 border border-zinc-150 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400">
                    Age Group: <strong>{product.ageGroup}</strong>
                  </span>
                </div>
              </div>

              {/* Technical Specifications details table */}
              <div>
                <h3 className="font-poppins font-extrabold text-sm text-zinc-950 dark:text-white mb-3 uppercase tracking-wider">
                  Technical Specifications
                </h3>
                <div className="overflow-x-auto border border-zinc-150/60 dark:border-zinc-850 rounded-2xl text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-900 text-[10px] font-bold text-zinc-450 uppercase border-b border-zinc-150/60 dark:border-zinc-850">
                        <th className="px-4 py-2.5">Parameter</th>
                        <th className="px-4 py-2.5">Specifications Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-150/60 dark:divide-zinc-850 text-zinc-650 dark:text-zinc-300 font-semibold">
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Product Dimensions</td>
                        <td className="px-4 py-2.5">{product.specs.size}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Average Weight</td>
                        <td className="px-4 py-2.5">{product.specs.weight}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Certifications</td>
                        <td className="px-4 py-2.5">{product.specs.certifications}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Customization (OEM/ODM)</td>
                        <td className="px-4 py-2.5">{product.specs.oem_odm}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Default Export Port</td>
                        <td className="px-4 py-2.5">{product.specs.port}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Packaging Details</td>
                        <td className="px-4 py-2.5">{product.packaging}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Mass Assembly Lead Time</td>
                        <td className="px-4 py-2.5">{product.productionTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inquiry and Catalog Request Form */}
              <div className="bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-poppins font-extrabold text-sm text-zinc-950 dark:text-white uppercase tracking-wider leading-none">
                    Submit RFQ & Samples Request
                  </h3>
                  <p className="text-[10px] text-zinc-450 mt-1 font-semibold leading-normal">
                    Submit custom print layouts, Pantone specifications, or packaging requirements to get an engineering response.
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                        Target Order Volume (MOQ: {product.moq})
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                        className={`w-full px-3 py-2 border text-xs bg-white dark:bg-dark text-zinc-900 dark:text-zinc-50 rounded-xl focus:outline-hidden ${
                          isBelowMOQ ? "border-amber-500 focus:ring-1 focus:ring-amber-500" : "border-zinc-200 dark:border-zinc-800 focus:ring-1 focus:ring-primary"
                        }`}
                      />
                      {isBelowMOQ && (
                        <p className="text-[10px] text-amber-600 font-medium mt-1">
                          * Target volume falls below catalog mold tooling MOQ.
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
                        <span>Require Custom Pantone Printing</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">
                      Design Notes / Accessories Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="E.g. Matte finish, custom blister packaging, specific safety lab certificates required..."
                      className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-white dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary placeholder-zinc-400"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
                          <span>Added to Inquiry Basket</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Inquiry Basket</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadCatalog}
                      disabled={downloading}
                      className="px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-primary text-zinc-650 hover:text-primary dark:text-zinc-400 dark:hover:text-primary text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>{downloading ? "Compiling PDF..." : "Download Specification sheet"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 space-y-6">
              <h3 className="font-poppins font-black text-xl text-zinc-900 dark:text-white">
                Related Sourcing Products
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

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
