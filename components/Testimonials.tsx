"use client";

import React from "react";
import { useApp } from "@/components/AppContext";
import { reviews } from "@/data/mockData";
import { Star, Quote, Award } from "lucide-react";
import Image from "next/image";

export const Testimonials: React.FC = () => {
  const { language } = useApp();

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Global Client Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {language === "en" ? "Trusted by Global Sourcing Executives" : "বিশ্বব্যাপী সোর্সিং এক্সিকিউটিভদের বিশ্বস্ত অংশীদার"}
          </h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
            {language === "en"
              ? "See how our dedication to ethical cleanroom assembly, robust quality control, and timely shipping supports global toy brands and indie designer studios."
              : "দেখুন কিভাবে আমাদের মানসম্মত উৎপাদন ব্যবস্থা, গুণগত মান নিয়ন্ত্রণ এবং সময়মতো শিপিং বিশ্বখ্যাত খেলনা ব্র্যান্ড এবং স্বতন্ত্র শিল্পী স্টুডিওগুলিকে সহায়তা করে।"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl bg-zinc-50/70 dark:bg-zinc-900/35 border border-zinc-150/60 dark:border-zinc-850 shadow-xs relative flex flex-col justify-between hover:shadow-md hover:border-primary/30 transition duration-300 group"
            >
              {/* Quote styling */}
              <div className="absolute right-8 top-8 text-zinc-200 dark:text-zinc-800 pointer-events-none transition duration-300 group-hover:text-primary/15">
                <Quote className="w-12 h-12 stroke-[2.5]" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex gap-1.5 mb-5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-500 stroke-[1.5]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed font-medium mb-6 relative z-10 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-200/50 dark:border-zinc-850/50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-250 dark:border-zinc-700 shrink-0 bg-white">
                  <Image
                    src={rev.avatar}
                    alt={rev.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 leading-none">
                    <span>{rev.name}</span>
                    <span title={rev.country} className="text-sm" role="img" aria-label={rev.country}>
                      {rev.countryFlag}
                    </span>
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-bold mt-1">
                    {rev.role} at <span className="text-primary">{rev.company}</span>
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-[8px] font-extrabold uppercase tracking-wider">
                    Verified B2B Account
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
