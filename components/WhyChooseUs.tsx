"use client";

import React from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { ShieldAlert, Cpu, Shapes, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export const WhyChooseUs: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const cards = [
    {
      id: "w1",
      icon: Cpu,
      title: t.whyUs.card1Title,
      desc: t.whyUs.card1Desc
    },
    {
      id: "w2",
      icon: ShieldCheck,
      title: t.whyUs.card2Title,
      desc: t.whyUs.card2Desc
    },
    {
      id: "w3",
      icon: Shapes,
      title: t.whyUs.card3Title,
      desc: t.whyUs.card3Desc
    },
    {
      id: "w4",
      icon: ShieldAlert,
      title: t.whyUs.card4Title,
      desc: t.whyUs.card4Desc
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-zinc-50 dark:bg-dark/40 relative overflow-hidden border-t border-b border-zinc-100 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 block">Corporate Advantage</span>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {t.whyUs.title}
          </h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-850 shadow-xs hover:border-primary/50 dark:hover:border-primary/50 transition duration-300 group hover:-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-poppins font-bold text-base text-zinc-900 dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
