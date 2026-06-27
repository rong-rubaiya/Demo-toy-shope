"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "admin@enstoys.com",
      password: "admin123"
    }
  });

  const onSubmit = (data: any) => {
    setErrorMsg("");
    if (data.email === "admin@enstoys.com" && data.password === "admin123") {
      // Store simple admin flag in session/local storage
      localStorage.setItem("ens_admin_logged", "true");
      router.push("/admin/dashboard");
    } else {
      setErrorMsg("Invalid administrative email or password.");
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 py-16 bg-zinc-50 dark:bg-dark/20 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/20 text-primary flex items-center justify-center mx-auto mb-4 border border-orange-200">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white leading-none mb-2">
              Admin Sourcing Portal
            </h2>
            <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
              Sign in with administrative credentials to access products CRUD inventory, pending B2B RFQs, custom box builds, and analytics charts.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-955/20 border border-red-200 text-[10px] font-bold text-red-650 rounded-xl text-center mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  {...register("email", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-zinc-455 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Admin Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  required
                  {...register("password", { required: true })}
                  className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-150/60 dark:border-zinc-850 text-[10px] font-medium text-zinc-500 space-y-1">
              <span className="font-bold flex items-center gap-1 text-primary mb-1">
                <ShieldCheck className="w-4 h-4" />
                Admin Credentials:
              </span>
              <p>Email: <strong className="text-zinc-850 dark:text-zinc-200">admin@enstoys.com</strong></p>
              <p>Password: <strong className="text-zinc-850 dark:text-zinc-200">admin123</strong></p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition transform hover:-y-0.5"
            >
              <span>Access Admin Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}
