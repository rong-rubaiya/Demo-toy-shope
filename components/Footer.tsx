"use client";

import React from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import Link from "next/link";
import { ToyBrick, Mail, Phone, MapPin, Award, CheckCircle, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <footer className="bg-dark text-zinc-300 pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg">
                <ToyBrick className="w-5 h-5" />
              </div>
              <span className="font-poppins font-extrabold text-base tracking-tight text-white">
                ENS TOYS
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ens Toys (Huizhou) Co., Ltd. is a premier B2B manufacturer exporting certified high-fidelity collectibles, vinyl art figures, and educational play sets globally since 2006.
            </p>
            {/* Certifications badge row */}
            <div className="space-y-2 pt-2">
              <h4 className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">Compliance & Standards</h4>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1 border border-zinc-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  ICTI / IETP
                </span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1 border border-zinc-700">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  ISO 9001
                </span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1 border border-zinc-700">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  BSCI audited
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3.5">
            <h3 className="font-poppins font-bold text-sm text-white tracking-wide">Product Categories</h3>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/products?category=pvc-toys" className="hover:text-primary transition">PVC Action Figures</Link>
              </li>
              <li>
                <Link href="/products?category=vinyl-toys" className="hover:text-primary transition">Rotocast Designer Vinyl</Link>
              </li>
              <li>
                <Link href="/products?category=plush-toys" className="hover:text-primary transition">Organic Cotton Plush</Link>
              </li>
              <li>
                <Link href="/products?category=educational-toys" className="hover:text-primary transition">STEM Educational Kits</Link>
              </li>
              <li>
                <Link href="/products?category=blind-box-toys" className="hover:text-primary transition">Collectible Blind Boxes</Link>
              </li>
            </ul>
          </div>

          {/* B2B Solutions */}
          <div className="space-y-3.5">
            <h3 className="font-poppins font-bold text-sm text-white tracking-wide">B2B Solutions</h3>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/#giftbox-builder" className="hover:text-primary transition">Custom Gift Box Builder</Link>
              </li>
              <li>
                <Link href="/products?category=oem-odm-toys" className="hover:text-primary transition">OEM/ODM Tooling Details</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition">Client Request Dashboard</Link>
              </li>
              <li>
                <Link href="/#manufacturing-process" className="hover:text-primary transition">Our 9-Step Process Timeline</Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition">MOQ & Export Guidelines</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3.5">
            <h3 className="font-poppins font-bold text-sm text-white tracking-wide">Global Headquarters</h3>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  No. 12, Shengfeng Industrial Park, Huizhou City, Guangdong Province, China
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:sales@enstoys.com" className="hover:text-primary transition">
                  sales@enstoys.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+867523358899" className="hover:text-primary transition">
                  +86 (752) 3358-899
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-zinc-800 my-8" />

        {/* Bottom copyright and compliance logos */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} Ens Toys (Huizhou) Co., Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[10px]">
            <span>ASTM F963 Compliant</span>
            <span>•</span>
            <span>EN71 Certified</span>
            <span>•</span>
            <span>BSCI Audited</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
