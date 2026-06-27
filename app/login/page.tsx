"use client";

import React, { useState } from "react";
import { useApp } from "@/components/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Lock, Mail, User as UserIcon, Building, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const { loginUser, registerUser, language } = useApp();
  const router = useRouter();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm({
    defaultValues: {
      email: "customer@enstoys.com",
      password: "customer123"
    }
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors }
  } = useForm();

  const onLoginSubmit = (data: any) => {
    setErrorMsg("");
    // Standard Demo Check
    if (data.email === "customer@enstoys.com" && data.password === "customer123") {
      loginUser(data.email, "Global Toy Buyer", "ProcureGroup USA", "+1 (555) 019-2834");
      router.push("/dashboard");
    } else {
      // Fallback for demo log for custom logins
      loginUser(data.email, data.email.split("@")[0].toUpperCase(), "Retailer Inc.", "+86 189 0000 0000");
      router.push("/dashboard");
    }
  };

  const onSignUpSubmit = (data: any) => {
    setErrorMsg("");
    registerUser(data.email, data.name, data.company, data.phone);
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 py-16 bg-zinc-50 dark:bg-dark/20 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 bg-white dark:bg-zinc-950 border border-zinc-150/60 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Tab Selection */}
          <div className="flex gap-2 p-1 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-150/60 dark:border-zinc-800 mb-8 w-full">
            <button
              onClick={() => {
                setIsLoginTab(true);
                setErrorMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer select-none ${
                isLoginTab ? "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-primary shadow-xs" : "text-zinc-500 hover:text-primary"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLoginTab(false);
                setErrorMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer select-none ${
                !isLoginTab ? "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-primary shadow-xs" : "text-zinc-500 hover:text-primary"
              }`}
            >
              Register
            </button>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-xl font-poppins font-black text-zinc-950 dark:text-white leading-none mb-2">
              {isLoginTab ? "Client Portal Sign In" : "Register B2B Account"}
            </h2>
            <p className="text-[11px] text-zinc-500 font-semibold leading-normal">
              {isLoginTab ? "Access your inquiry logs, reward points, and subscription schedules." : "Earn 200 reward points on signup. Free access to catalog specification PDFs."}
            </p>
          </div>

          {isLoginTab ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    {...registerLogin("email", { required: true })}
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-455 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    {...registerLogin("password", { required: true })}
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Demo Credentials Info block */}
              <div className="bg-zinc-50 dark:bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-150/60 dark:border-zinc-850 text-[10px] font-medium text-zinc-500 space-y-1">
                <span className="font-bold flex items-center gap-1 text-primary mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  Demo Accounts Enabled:
                </span>
                <p>Email: <strong className="text-zinc-850 dark:text-zinc-200">customer@enstoys.com</strong></p>
                <p>Password: <strong className="text-zinc-850 dark:text-zinc-200">customer123</strong></p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition transform hover:-y-0.5"
              >
                <span>Access Client Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleSignUpSubmit(onSignUpSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      {...registerSignUp("name", { required: true })}
                      className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 dark:border-zinc-850 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      {...registerSignUp("company", { required: true })}
                      className="w-full pl-9 pr-3 py-2.5 border border-zinc-200 dark:border-zinc-850 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Business Email</label>
                <input
                  type="email"
                  required
                  {...registerSignUp("email", { required: true })}
                  className="w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-450 dark:text-zinc-400 font-bold uppercase tracking-wider mb-1.5">Phone Line</label>
                <input
                  type="text"
                  required
                  {...registerSignUp("phone", { required: true })}
                  placeholder="+1 (555) 012-3456"
                  className="w-full px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50/50 dark:bg-dark text-zinc-900 dark:text-zinc-50 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md transition transform hover:-y-0.5 mt-2"
              >
                <span>Register & Claim Reward</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
