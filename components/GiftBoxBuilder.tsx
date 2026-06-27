"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { boxDesigns, giftExtras } from "@/data/mockData";
import { Gift, Package, Check, HelpCircle, AlertCircle, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const GiftBoxBuilder: React.FC = () => {
  const { productsList, addGiftOrder, language } = useApp();

  const [selectedBox, setSelectedBox] = useState(boxDesigns[0]);
  const [selectedToy, setSelectedToy] = useState(productsList[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [cardTitle, setCardTitle] = useState("Best Wishes");
  const [cardBody, setCardBody] = useState("Hope you enjoy this premium hand-crafted toy gift package!");
  const [giftWrap, setGiftWrap] = useState("Eco Twine Ribbon");
  
  // Recipient address fields for local storage order log
  const [recipientName, setRecipientName] = useState("Global Sourcing Director");
  const [recipientAddress, setRecipientAddress] = useState("100 Corporate Plaza, Sector A, New York, NY 10001");
  const [deliveryDate, setDeliveryDate] = useState("2026-07-20");
  const [isSurprise, setIsSurprise] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Filter toys suitable for gifts (first 5)
  const toyOptions = productsList.filter(p => p.category !== "oem-odm").slice(0, 5);

  // Extras toggle
  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraName) ? prev.filter(e => e !== extraName) : [...prev, extraName]
    );
  };

  // Compute box pricing (mocking custom gift order retail calculation)
  const boxCost = selectedBox.price;
  const toyCost = 4.50; // flat mock base rate
  const extrasCost = selectedExtras.reduce((sum, extraName) => {
    const item = giftExtras.find(e => e.name === extraName);
    return sum + (item?.price || 0);
  }, 0);
  const totalCost = boxCost + toyCost + extrasCost;

  const handleAddToInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    addGiftOrder({
      boxDesign: selectedBox.name,
      toyId: selectedToy.id,
      toyName: selectedToy.name,
      extras: selectedExtras,
      message: { title: cardTitle, body: cardBody },
      giftWrap,
      recipientName,
      recipientAddress,
      deliveryDate,
      isSurprise,
      price: totalCost
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="giftbox-builder" className="py-24 bg-zinc-50 dark:bg-dark/40 relative overflow-hidden border-t border-b border-zinc-100 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Interactive Gift Configurator</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {language === "en" ? "Build Your Custom Gift Box" : "আপনার কাস্টম গিফট বক্স তৈরি করুন"}
          </h2>
          <p className="text-sm text-zinc-550 dark:text-zinc-400 font-medium leading-relaxed">
            Configure premium gift boxes combining our custom toys with chocolates, cards, keychains, and luxury wrap designs. Watch the live assembly layout update instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Customizer Panel (Left Side - 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Step 1: Choose Box Design */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">1</span>
                  <span>Select Packaging Design</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {boxDesigns.map((box) => (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between text-[11px] font-semibold transition cursor-pointer select-none ${
                        selectedBox.id === box.id
                          ? "border-primary ring-1 ring-primary bg-zinc-50/50 dark:bg-zinc-900/20"
                          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-primary/50"
                      }`}
                    >
                      <div className={`w-full h-8 rounded-lg mb-2 ${box.color}`} />
                      <span className="text-zinc-850 dark:text-zinc-200 line-clamp-1 leading-snug">{box.name}</span>
                      <span className="text-[10px] text-primary font-bold mt-1">+${box.price.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose Toy Product */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">2</span>
                  <span>Select Center Toy</span>
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 shrink-0">
                  {toyOptions.map((toy) => (
                    <button
                      key={toy.id}
                      onClick={() => setSelectedToy(toy)}
                      className={`p-2.5 rounded-2xl border text-center shrink-0 w-28 transition cursor-pointer select-none ${
                        selectedToy.id === toy.id
                          ? "border-primary ring-1 ring-primary bg-zinc-50/50 dark:bg-zinc-900/20"
                          : "border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 hover:border-primary/50"
                      }`}
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-50 mb-2 border border-zinc-100 dark:border-zinc-900">
                        <Image src={toy.images[0]} alt={toy.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-850 dark:text-zinc-200 line-clamp-1 leading-snug">{toy.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Select Extras */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">3</span>
                  <span>Add Treats & Memorabilia</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {giftExtras.map((extra) => {
                    const isSelected = selectedExtras.includes(extra.name);
                    return (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.name)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between text-xs transition cursor-pointer select-none ${
                          isSelected
                            ? "border-primary ring-1 ring-primary bg-zinc-50/50 dark:bg-zinc-900/20"
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isSelected ? "bg-primary text-white" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <span className="block font-bold text-zinc-850 dark:text-zinc-200">{extra.name}</span>
                            <span className="text-[9px] text-zinc-400">{extra.type}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-primary font-bold">+${extra.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Personalize Greeting Card */}
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black">4</span>
                  <span>Personalize greeting card</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Card Header</label>
                    <input
                      type="text"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      className="w-full px-3.5 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Message Body</label>
                    <input
                      type="text"
                      value={cardBody}
                      onChange={(e) => setCardBody(e.target.value)}
                      className="w-full px-3.5 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Customizer Submission Form */}
            <form onSubmit={handleAddToInquiry} className="mt-8 border-t border-zinc-100 dark:border-zinc-900 pt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Recipient Name</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:ring-1 focus:ring-primary focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1">Shipping Address</label>
                  <input
                    type="text"
                    required
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs bg-zinc-50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:ring-1 focus:ring-primary focus:outline-hidden"
                  />
                </div>
                <div className="flex gap-2 items-center pt-5">
                  <input
                    id="is-surprise"
                    type="checkbox"
                    checked={isSurprise}
                    onChange={() => setIsSurprise(!isSurprise)}
                    className="rounded text-primary w-4 h-4 border-zinc-300 dark:border-zinc-800 bg-zinc-50"
                  />
                  <label htmlFor="is-surprise" className="text-xs font-bold text-zinc-650 dark:text-zinc-400 cursor-pointer select-none">
                    Surprise Notification
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAdded}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm shadow-md transition duration-200 transform hover:-y-0.5 ${
                  isAdded
                    ? "bg-emerald-500 text-white"
                    : "bg-primary hover:bg-primary/95 text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Gift Box Registered!" : "Add Custom Gift Box to RFQ"}</span>
              </button>
            </form>
          </div>

          {/* Visual Live Preview Panel (Right Side - 5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden aspect-square lg:aspect-auto">
            {/* Background lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-6">
                <h3 className="font-poppins font-black text-sm uppercase tracking-wider text-primary">Live Visual Preview</h3>
                <span className="text-[10px] text-zinc-400 font-bold">Real-time Layout</span>
              </div>

              {/* Visual Box Assembly display */}
              <div className="relative aspect-square max-w-[280px] mx-auto rounded-3xl bg-zinc-800 border-4 border-dashed border-zinc-700/80 p-6 flex flex-col items-center justify-center shadow-inner mb-6">
                {/* Simulated Box Structure */}
                <div className={`absolute inset-4 rounded-2xl opacity-15 border-2 ${
                  selectedBox.id === "b3" ? "bg-zinc-50 border-white" : "bg-primary border-primary"
                }`} />

                <div className="space-y-4 relative z-10 w-full flex flex-col items-center text-center">
                  <Package className="w-10 h-10 text-primary animate-pulse mb-1" />
                  
                  {/* Toy Icon details */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] text-zinc-400 font-extrabold uppercase tracking-wide">Included Toy</span>
                    <span className="text-xs font-bold text-white max-w-[180px] truncate">{selectedToy.name}</span>
                  </div>

                  {/* Extras bubble tags */}
                  {selectedExtras.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 pt-1.5 max-w-[200px]">
                      {selectedExtras.map(exName => (
                        <span key={exName} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[8px] font-bold text-zinc-350">
                          {exName.split(" ").slice(-1)[0]}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Miniature message card mockup */}
                  <div className="bg-amber-50 border border-amber-200/50 rounded-lg p-2.5 max-w-[220px] text-[8px] text-zinc-700 font-medium shadow-sm flex flex-col text-left">
                    <span className="font-bold border-b border-amber-200 pb-1 mb-1 text-zinc-900 tracking-wide font-poppins">{cardTitle}</span>
                    <span className="line-clamp-2 text-zinc-650 leading-relaxed italic">"{cardBody}"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price list and details */}
            <div className="border-t border-zinc-800 pt-4 mt-4 text-xs space-y-2 font-medium">
              <div className="flex justify-between text-zinc-400">
                <span>Box Style ({selectedBox.name}):</span>
                <span>${boxCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Core Toy Base Quote:</span>
                <span>${toyCost.toFixed(2)}</span>
              </div>
              {selectedExtras.length > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Treats & Extras:</span>
                  <span>${extrasCost.toFixed(2)}</span>
                </div>
              )}
              <hr className="border-zinc-800 my-2" />
              <div className="flex justify-between font-black text-sm text-white">
                <span>Est. Custom RFQ Value:</span>
                <span className="text-primary">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 mt-2 bg-zinc-950 p-2.5 rounded-lg">
                <AlertCircle className="w-4 h-4 text-primary shrink-0" />
                <span>Custom boxes are processed under sample custom quote inquiries. Standard MOQ applies to final assembly lines.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
