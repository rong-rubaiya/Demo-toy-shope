"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, X, Settings, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Hero: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 }
    }
  };

  const floatingToys = [
    {
      id: "f_toy_1",
      image: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?q=80&w=400&auto=format&fit=crop",
      title: "Mech Pro",
      badge: "Articulated Joint Spec",
      x: "10%",
      y: "15%",
      rotate: -12,
      floatDelay: 0
    },
    {
      id: "f_toy_2",
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=400&auto=format&fit=crop",
      title: "Vinyl Bear",
      badge: "Art Toy Finish",
      x: "55%",
      y: "35%",
      rotate: 8,
      floatDelay: 1.5
    },
    {
      id: "f_toy_3",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400&auto=format&fit=crop",
      title: "Cute Cat",
      badge: "Blind Box Edition",
      x: "20%",
      y: "60%",
      rotate: -6,
      floatDelay: 0.8
    }
  ];

  return (
    <>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-50 dark:bg-dark overflow-hidden py-16">
        {/* Subtle background mesh and glowing gradient blur */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-bl from-primary/10 via-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.hero.tagline}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white leading-tight"
            >
              {t.hero.headline.split(" ").map((word, idx) => (
                <span key={idx} className={word === "Premium" || word === "Quality" || word === "Life" || word === "বাস্তবায়ন" ? "text-primary" : ""}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {t.hero.subheadline}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary hover:bg-primary/95 text-white font-bold text-sm shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition transform hover:-y-0.5"
              >
                <span>{t.hero.ctaExplore}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => {
                  const target = document.getElementById("contact");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-primary text-zinc-800 dark:text-zinc-200 font-bold text-sm hover:text-primary transition"
              >
                {t.hero.ctaContact}
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-primary dark:text-zinc-400 dark:hover:text-primary transition py-2"
              >
                <div className="w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 flex items-center justify-center text-primary shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-primary" />
                </div>
                <span>{t.hero.ctaWatch}</span>
              </button>
            </motion.div>

            {/* Micro B2B trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-500 font-medium pt-8 border-t border-zinc-200/50 dark:border-zinc-850/50"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ISO 9001:2015 Audited
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                BSCI & Disney FAMA Facility
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                EN71 / ASTM Safe
              </span>
            </motion.div>
          </motion.div>

          {/* Floating Toys (Visually Stunning Graphics) */}
          <div className="lg:col-span-5 relative h-[500px] hidden sm:block">
            {floatingToys.map((toy) => (
              <motion.div
                key={toy.id}
                initial={{ opacity: 0, scale: 0.8, rotate: toy.rotate - 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: toy.rotate,
                  y: [0, -15, 0]
                }}
                transition={{
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  rotate: { duration: 0.6 },
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: toy.floatDelay
                  }
                }}
                style={{ left: toy.x, top: toy.y }}
                className="absolute w-44 rounded-2xl bg-white dark:bg-zinc-950 p-3 shadow-xl border border-zinc-200/60 dark:border-zinc-850 cursor-pointer hover:scale-105 transition-all duration-300 group z-20"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 dark:border-zinc-900 mb-2">
                  <Image
                    src={toy.image}
                    alt={toy.title}
                    fill
                    sizes="160px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{toy.title}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400">
                    B2B OEM
                  </span>
                </div>
                <span className="block text-[8px] text-zinc-400 mt-0.5 font-medium">{toy.badge}</span>
              </motion.div>
            ))}

            {/* Industrial Gear Icon floating background */}
            <div className="absolute top-[40%] left-[30%] text-zinc-250 dark:text-zinc-850 z-10 pointer-events-none animate-spin duration-10000">
              <Settings className="w-24 h-24 stroke-[0.3]" />
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal (B2B Factory Watch) */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10"
          >
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-zinc-700 bg-black"
            >
              {/* Load a royalty-free manufacturing clean loop or beautiful visual placeholder */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" // Placeholder video link
                title="Ens Toys Factory Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
