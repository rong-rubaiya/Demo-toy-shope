"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const { language, addMessage } = useApp();
  const t = translations[language];

  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    addMessage(data.name, data.email, data.message);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Connect with Sourcing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black tracking-tight text-zinc-950 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-sm text-zinc-555 dark:text-zinc-400 font-medium leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details (Left Side) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-poppins font-extrabold text-xl text-zinc-900 dark:text-white mb-2">
              {t.contact.infoTitle}
            </h3>
            
            <div className="space-y-5">
              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
                    {t.contact.address}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                    {t.contact.addressVal}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
                    Sales Email
                  </h4>
                  <a
                    href="mailto:sales@enstoys.com"
                    className="text-xs text-primary hover:underline font-bold"
                  >
                    sales@enstoys.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
                    {t.contact.phone}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-bold leading-normal">
                    +86 (752) 3358-899 <span className="text-[10px] text-zinc-400">(International Sales)</span>
                  </p>
                  <p className="text-xs text-zinc-650 dark:text-zinc-400 font-bold mt-0.5">
                    +86 189 2235 4488 <span className="text-[10px] text-zinc-400">(WeChat / WhatsApp support)</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-1">
                    {t.contact.hours}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold leading-normal">
                    {t.contact.hoursVal}
                  </p>
                </div>
              </div>
            </div>

            {/* Static Google Map Placeholder using premium custom graphic */}
            <div className="rounded-2xl overflow-hidden aspect-video border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-100 relative">
              <iframe
                title="Ens Toys Huizhou Factory Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.4230193181816!2d114.41662991535706!3d23.08801968491566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3402cfbb2234032d%3A0xe565c404cf92c90c!2sHuizhou%2C%20Guangdong%2C%20China!5e0!3m2!1sen!2sus!4v1656000000000!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form (Right Side) */}
          <div className="lg:col-span-7 bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-10 shadow-xs">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
                <h3 className="text-xl font-poppins font-black text-zinc-950 dark:text-white mb-2">
                  Message Transmitted!
                </h3>
                <p className="text-xs text-zinc-555 dark:text-zinc-400 max-w-sm">
                  {t.contact.success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-350 uppercase tracking-wider mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="E.g. Jane Doe"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark text-xs text-zinc-900 dark:text-zinc-50 focus:outline-hidden ${
                      errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-750 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1.5">* Name is required</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-350 uppercase tracking-wider mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="E.g. sourcing@yourcompany.com"
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark text-xs text-zinc-900 dark:text-zinc-50 focus:outline-hidden ${
                      errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-750 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1.5">* Valid email is required</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-350 uppercase tracking-wider mb-2">
                    {t.contact.msg}
                  </label>
                  <textarea
                    rows={6}
                    {...register("message", { required: true })}
                    placeholder="Specify target toy quantities, prototype deadlines, material requirements, or shipping location details..."
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark text-xs text-zinc-900 dark:text-zinc-50 focus:outline-hidden ${
                      errors.message ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-750 focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-bold mt-1.5">* Project details are required</p>}
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-sm shadow-md transition duration-200 transform hover:-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submit}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
