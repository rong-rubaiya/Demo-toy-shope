"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { exportCountries } from "@/data/mockData";
import { Globe2, Ship, Box, Percent, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ExportMap: React.FC = () => {
  const { language } = useApp();
  const [hoveredHub, setHoveredHub] = useState<typeof exportCountries[0] | null>(null);
  const [selectedHub, setSelectedHub] = useState<typeof exportCountries[0] | null>(exportCountries[0]);

  return (
    <section id="global-network" className="py-24 bg-dark text-white overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Export Footprint</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-white mb-4">
            {language === "en" ? "Ens Toys Global Distribution Network" : language === "zh" ? "恩斯玩具全球分销网络" : "এনস টয়স গ্লোবাল ডিস্ট্রিবিউশন নেটওয়ার্ক"}
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            {language === "en"
              ? "We manufacture and export high-fidelity toys to over 100 countries. Our logistics pipeline integrates direct container shipping from Shenzhen Port with air and train forwarding."
              : language === "zh"
              ? "我们的玩具制造和出口覆盖全球100多个国家。我们的物流渠道整合了深圳港整柜直航以及航空和铁路货运服务。"
              : "আমরা ১০০টিরও বেশি দেশে উন্নতমানের খেলনা তৈরি ও রপ্তানি করি। শেনঝেন বন্দর থেকে সরাসরি লজিস্টিক পাইপলাইনের মাধ্যমে আমাদের শিপিং ব্যবস্থা পরিচালিত হয়।"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SVG Map (Interactive Panel) */}
          <div className="lg:col-span-8 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden aspect-video flex items-center justify-center">
            {/* World Grid Mock Outline */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-zinc-800 opacity-20 pointer-events-none absolute inset-0 select-none"
            >
              <defs>
                <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              {/* Rough stylized outlines of continents for aesthetic reference */}
              {/* North America */}
              <path d="M 5 20 Q 15 20 20 30 T 35 40 T 25 55 T 15 45 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              {/* South America */}
              <path d="M 25 55 Q 32 65 30 75 T 32 90 T 22 75 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              {/* Eurasia / Africa */}
              <path d="M 42 20 Q 55 15 65 20 T 80 25 T 90 35 T 75 55 T 55 55 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 42 40 Q 52 45 50 65 T 55 80 T 45 75 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              {/* Australia */}
              <path d="M 80 70 Q 88 72 88 80 T 82 82 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>

            {/* Interactive Pulse Nodes */}
            <div className="absolute inset-0">
              {exportCountries.map((hub) => {
                const isActive = selectedHub?.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    className="absolute group focus:outline-hidden"
                    style={{ left: `${hub.coords.x}%`, top: `${hub.coords.y}%` }}
                    onMouseEnter={() => setHoveredHub(hub)}
                    onMouseLeave={() => setHoveredHub(null)}
                    onClick={() => setSelectedHub(hub)}
                  >
                    {/* Ring animation */}
                    <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-primary/30 animate-ping pointer-events-none" />
                    {/* Inner core circle */}
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white transition-all ${
                        isActive ? "bg-primary scale-125" : "bg-zinc-500 group-hover:bg-primary"
                      }`}
                    />

                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {hoveredHub?.id === hub.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700/80 rounded-xl p-3 shadow-2xl z-30 w-52 pointer-events-none"
                        >
                          <h4 className="text-xs font-bold text-white mb-1 flex items-center justify-between">
                            <span>{hub.name}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                            <Percent className="w-3 h-3 text-primary shrink-0" />
                            <span>Export Share: <strong className="text-white">{hub.share}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-1">
                            <Ship className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>Transit: <strong className="text-white">{hub.shipping}</strong></span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Statistics Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-poppins font-extrabold text-xl text-white">
              {language === "en" ? "Market Logistics Stats" : language === "zh" ? "市场物流统计" : "মার্কেট লজিস্টিক পরিসংখ্যান"}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              {language === "en"
                ? "Click on any map hub indicator to view localized annual volume, lead port logistics, and product categories."
                : language === "zh"
                ? "点击地图上的任意枢纽指标以查看本地化的年出货量、主要港口物流和产品类别。"
                : "Click on any map hub indicator to view localized annual volume, lead port logistics, and product categories."}
            </p>

            <AnimatePresence mode="wait">
              {selectedHub ? (
                <motion.div
                  key={selectedHub.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{selectedHub.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold">
                      {selectedHub.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Percent className="w-3.5 h-3.5 text-primary" />
                        <span>Export Share</span>
                      </div>
                      <span className="text-lg font-poppins font-black text-white">{selectedHub.share}</span>
                    </div>

                    <div className="bg-zinc-800/30 p-3 rounded-xl border border-zinc-800">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                        <Box className="w-3.5 h-3.5 text-primary" />
                        <span>Annual Vol.</span>
                      </div>
                      <span className="text-lg font-poppins font-black text-white">{selectedHub.volume.split(" ")[0]}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex flex-col border-b border-zinc-800/50 pb-2">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Primary Shipments</span>
                      <span className="text-zinc-300 font-semibold leading-relaxed">{selectedHub.categories}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Est. Ocean Transit Time</span>
                      <span className="text-zinc-300 font-semibold flex items-center gap-1.5 mt-0.5">
                        <Ship className="w-4 h-4 text-primary shrink-0" />
                        {selectedHub.shipping}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
