"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { faqs } from "@/data/mockData";
import { FAQItem } from "@/types";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQ: React.FC = () => {
  const { language } = useApp();
  const [activeCategory, setActiveCategory] = useState<FAQItem["category"]>("MOQ");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories: FAQItem["category"][] = [
    "MOQ",
    "OEM & ODM",
    "Shipping",
    "Quality & Customization"
  ];

  const filteredFAQs = faqs.filter((faq) => faq.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-zinc-50 dark:bg-dark/20 relative overflow-hidden border-t border-b border-zinc-150 dark:border-zinc-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Sourcing Knowledge Base</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {language === "en" ? "Frequently Answered Questions" : "সচরাচর জিজ্ঞাসিত প্রশ্নাবলী"}
          </h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
            {language === "en"
              ? "Important sourcing and logistical details to know when starting a custom toy manufacturing sample project with Ens."
              : "এনস টয়স-এর সাথে কাস্টম খেলনা প্রজেক্ট শুরু করার পূর্বে প্রয়োজনীয় অর্ডার এবং লজিস্টিক সংক্রান্ত তথ্যাবলী।"}
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedFAQ(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition duration-200 ${
                activeCategory === cat
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850 text-zinc-650 dark:text-zinc-350 hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isOpen = expandedFAQ === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-xs hover:border-zinc-200 dark:hover:border-zinc-850 transition"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white focus:outline-hidden cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-[11px] sm:text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-medium border-t border-zinc-50 dark:border-zinc-900">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
