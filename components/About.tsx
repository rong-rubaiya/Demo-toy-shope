"use client";

import React from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import CountUp from "react-countup";
import { ShieldCheck, Award, Factory, Users, Globe, ShoppingBag, Landmark } from "lucide-react";
import Image from "next/image";

export const About: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const stats = [
    {
      id: "s1",
      icon: Landmark,
      end: 20,
      suffix: "+",
      label: t.about.statYears
    },
    {
      id: "s2",
      icon: Users,
      end: 500,
      suffix: "+",
      label: t.about.statEmployees
    },
    {
      id: "s3",
      icon: Factory,
      end: 30000,
      suffix: " ㎡",
      label: t.about.statFactory
    },
    {
      id: "s4",
      icon: Globe,
      end: 100,
      suffix: "+",
      label: t.about.statCountries
    },
    {
      id: "s5",
      icon: ShoppingBag,
      end: 1000,
      suffix: "+",
      label: t.about.statProducts
    }
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Presentation (Left Side) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-5/4 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800&auto=format&fit=crop"
                alt="Ens Toys Advanced Injection Molding Facility"
                fill
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary text-[10px] font-bold tracking-wider uppercase">
                  Huizhou Industrial Zone
                </span>
                <p className="text-sm font-semibold leading-relaxed">
                  Our facility houses 45 high-precision injection moulding units and automated painting bays.
                </p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -right-6 -bottom-6 bg-primary text-white p-5 rounded-2xl shadow-xl flex items-center gap-3 border border-orange-400/20 max-w-xs">
              <Award className="w-10 h-10 text-white animate-bounce" />
              <div className="flex flex-col">
                <span className="text-base font-extrabold leading-none">100% Audited</span>
                <span className="text-[10px] text-orange-100 font-medium mt-1 leading-normal">BSCI, IETP Ethical Toy, & Disney FAMA Compliant.</span>
              </div>
            </div>
          </div>

          {/* Description Text (Right Side) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>B2B OEM/ODM Facility</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white leading-tight">
              {t.about.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
              {t.about.desc1}
            </p>

            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-450 leading-relaxed font-medium">
              {t.about.desc2}
            </p>

            {/* Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.id}
                    className="p-3 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs"
                  >
                    <Icon className="w-5 h-5 text-primary mb-2" />
                    <span className="text-lg md:text-xl font-poppins font-extrabold text-zinc-900 dark:text-white tracking-tight leading-none mb-1">
                      <CountUp end={stat.end} duration={3} enableScrollSpy scrollSpyOnce suffix={stat.suffix} />
                    </span>
                    <span className="text-[10px] text-zinc-455 dark:text-zinc-400 font-bold leading-tight">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
