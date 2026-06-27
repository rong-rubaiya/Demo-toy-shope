"use client";

import React from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { motion } from "framer-motion";
import {
  Compass,
  Layers,
  Flame,
  Hammer,
  Palette,
  Wrench,
  CheckSquare,
  PackageCheck,
  Ship
} from "lucide-react";

export const FactoryTimeline: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const steps = [
    {
      id: 1,
      icon: Compass,
      title: t.timeline.step1,
      desc: t.timeline.step1Desc
    },
    {
      id: 2,
      icon: Layers,
      title: t.timeline.step2,
      desc: t.timeline.step2Desc
    },
    {
      id: 3,
      icon: Hammer,
      title: t.timeline.step3,
      desc: t.timeline.step3Desc
    },
    {
      id: 4,
      icon: Flame,
      title: t.timeline.step4,
      desc: t.timeline.step4Desc
    },
    {
      id: 5,
      icon: Palette,
      title: t.timeline.step5,
      desc: t.timeline.step5Desc
    },
    {
      id: 6,
      icon: Wrench,
      title: t.timeline.step6,
      desc: t.timeline.step6Desc
    },
    {
      id: 7,
      icon: CheckSquare,
      title: t.timeline.step7,
      desc: t.timeline.step7Desc
    },
    {
      id: 8,
      icon: PackageCheck,
      title: t.timeline.step8,
      desc: t.timeline.step8Desc
    },
    {
      id: 9,
      icon: Ship,
      title: t.timeline.step9,
      desc: t.timeline.step9Desc
    }
  ];

  return (
    <section id="manufacturing-process" className="py-24 bg-white dark:bg-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block font-inter">Precision Pipeline</span>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {t.timeline.title}
          </h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
            {t.timeline.subtitle}
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical central bar */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-800" />

          {/* Steps List */}
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Empty spacer for alignment */}
                  <div className="hidden md:block w-1/2 px-8" />

                  {/* Icon Marker node */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 top-0 z-10 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white border-4 border-white dark:border-dark shadow-md">
                    <span className="text-[10px] font-extrabold">{step.id}</span>
                  </div>

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 90 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div className="p-6 bg-zinc-50/70 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850 rounded-2xl shadow-xs hover:shadow-md transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-poppins font-bold text-base text-zinc-900 dark:text-white leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
