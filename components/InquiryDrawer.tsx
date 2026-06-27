"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { translations } from "@/data/translations";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({ isOpen, onClose }) => {
  const {
    inquiryBasket,
    removeFromInquiry,
    updateInquiryQty,
    submitInquiry,
    user,
    language
  } = useApp();

  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = translations[language];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry(notes);
    setIsSubmitted(true);
    setNotes("");
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  const totalItems = inquiryBasket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md transform transition-transform duration-300 ease-out translate-x-0">
          <div className="h-full flex flex-col bg-white dark:bg-dark shadow-2xl overflow-y-scroll">
            {/* Header */}
            <div className="px-6 py-5 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-poppins font-semibold text-zinc-900 dark:text-zinc-50">
                  {t.nav.inquiry} ({inquiryBasket.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 py-6 px-6 overflow-y-auto">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                  <h3 className="text-xl font-poppins font-bold text-zinc-950 dark:text-zinc-50 mb-2">
                    Inquiry Submitted!
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-xs">
                    Thank you for choosing Ens Toys. Our B2B sales engineer will compile your quotation and follow up within 24 hours.
                  </p>
                </div>
              ) : inquiryBasket.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                    Your inquiry basket is empty
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mb-6">
                    Browse our toy catalog and add items you want pricing, customization, and factory tooling estimates for.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white font-medium text-sm transition shadow-md"
                  >
                    Browse Toy Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {inquiryBasket.map((item) => {
                    const isBelowMOQ = item.quantity < item.product.moq;
                    return (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-200 dark:hover:border-zinc-700 transition"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 bg-white">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                              Est. FOB: {item.product.priceRange}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex flex-col">
                              <label className="text-[10px] text-zinc-400 dark:text-zinc-500">Qty (MOQ: {item.product.moq})</label>
                              <input
                                type="number"
                                value={item.quantity}
                                min={1}
                                onChange={(e) => updateInquiryQty(item.product.id, parseInt(e.target.value) || 0)}
                                className={`w-24 px-2 py-1 rounded border text-xs bg-white dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden ${
                                  isBelowMOQ ? "border-amber-500 focus:ring-1 focus:ring-amber-500" : "border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-primary"
                                }`}
                              />
                            </div>
                            <button
                              onClick={() => removeFromInquiry(item.product.id)}
                              className="p-1 text-zinc-400 hover:text-red-500 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          {isBelowMOQ && (
                            <p className="text-[10px] text-amber-600 font-medium mt-1">
                              * Below target factory MOQ
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Submission Form */}
                  <form onSubmit={handleSubmit} className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Inquiry Notes & Customization (Logo/Packaging)
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Specify customized print colors, material changes, cert requirements, or special B2B delivery schedules..."
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs bg-white dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary placeholder-zinc-400"
                      />
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-900/60 p-3 rounded-lg text-xs space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span>Total Items:</span>
                        <span>{totalItems} units</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        * All figures are processed as custom B2B inquiry items. No commercial transaction takes place now.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary hover:bg-primary/95 text-white font-medium text-sm transition shadow-md"
                    >
                      <span>Submit B2B RFQ</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
