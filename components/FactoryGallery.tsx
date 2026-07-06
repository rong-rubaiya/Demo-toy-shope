"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const FactoryGallery: React.FC = () => {
  const { language } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const filters = [
    { id: "all", label: language === "en" ? "All Sectors" : language === "zh" ? "全部车间" : "সব বিভাগ" },
    { id: "tooling", label: language === "en" ? "Tooling Lab" : language === "zh" ? "模具实验室" : "ছাঁচ ল্যাব" },
    { id: "molding", label: language === "en" ? "Injection Molding" : language === "zh" ? "注塑成型" : "ইনজেকশন ছাঁচ" },
    { id: "painting", label: language === "en" ? "Painting Bay" : language === "zh" ? "涂装喷漆" : "পেইন্টিং বিভাগ" },
    { id: "assembly", label: language === "en" ? "Cleanroom Assembly" : language === "zh" ? "无尘组装" : "অ্যাসেম্বলি জোন" },
    { id: "qc", label: language === "en" ? "Quality Control" : language === "zh" ? "质量控制" : "মান যাচাই" }
  ];

  const galleryItems = [
    {
      id: "g1",
      category: "tooling",
      title: "High-Precision CNC Tooling Lab",
      desc: "Fabricating steel and copper molds to capture extreme character detailing.",
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g2",
      category: "molding",
      title: "Automatic Injection Moulding Station",
      desc: "Over 45 automated lines processing raw ABS/PVC pellets.",
      url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g3",
      category: "painting",
      title: "Dust-Free Spray Painting Bay",
      desc: "Applying precise shading mask overlays and detailed hand touchups.",
      url: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g4",
      category: "assembly",
      title: "Class 10,000 Assembly Cleanroom",
      desc: "Dust-free micro joint assembly and ultrasonic safety welding.",
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g5",
      category: "qc",
      title: "Rigorous Safety Compliance Audits",
      desc: "Checking dimensions, paint thickness, and performing physical drop tests.",
      url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g6",
      category: "molding",
      title: "Rotocasting Vinyl Art Toy Production",
      desc: "Creating hollow soft designer vinyl toy parts under uniform rotation.",
      url: "https://images.unsplash.com/photo-1581092162384-8987c17902e5?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredItems = activeFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="factory-gallery" className="py-24 bg-zinc-50 dark:bg-dark/20 relative overflow-hidden border-t border-zinc-100 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Factory Tour Visuals</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {language === "en" ? "Inside Our Manufacturing Facilities" : language === "zh" ? "步入我们的制造车间" : "আমাদের উৎপাদন কারখানার অভ্যন্তরীণ দৃশ্য"}
          </h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
            {language === "en"
              ? "Take a look at our state-of-the-art facility in Huizhou. We hold regular client walkthrough audits and keep our zones strictly compliant with ethical standard programs."
              : language === "zh"
              ? "参观我们位于惠州的先进设施。我们定期接待客户实地审核，并严格确保所有区域符合道德标准认证规范。"
              : "হুইঝৌতে অবস্থিত আমাদের অত্যাধুনিক কারখানাটি ঘুরে দেখুন। আমরা নিয়মিত ক্লায়েন্ট অডিটের ব্যবস্থা করি এবং আমাদের সকল কার্যক্রম আন্তর্জাতিক নৈতিক মানদণ্ড অনুযায়ী পরিচালিত হয়।"}
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold cursor-pointer border transition duration-200 ${
                activeFilter === filter.id
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-850 text-zinc-700 dark:text-zinc-300 hover:border-primary/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 shadow-xs hover:shadow-md cursor-pointer aspect-4/3"
                onClick={() => setLightboxImage({ url: item.url, title: item.title })}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-w-768px) 100vw, 30vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                </div>

                {/* Text overlay on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <span className="text-[9px] font-bold tracking-wider bg-primary uppercase px-2 py-0.5 rounded mb-2 inline-block">
                    {filters.find(f => f.id === item.category)?.label}
                  </span>
                  <h4 className="text-sm font-bold flex items-center justify-between gap-2">
                    <span>{item.title}</span>
                    <ZoomIn className="w-4 h-4 text-primary shrink-0" />
                  </h4>
                  <p className="text-[11px] text-zinc-300 mt-1 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 z-50"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/50 p-4 text-white text-center font-poppins font-bold text-sm">
                {lightboxImage.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
