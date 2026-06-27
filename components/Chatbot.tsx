"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, ToyBrick } from "lucide-react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { chatBotKeywords } from "@/data/mockData";
import { ChatMessage } from "@/types";

export const Chatbot: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "m_welcome",
        sender: "bot",
        text: t.chatbot.welcome,
        timestamp: new Date()
      }
    ]);
  }, [language, t.chatbot.welcome]);

  // Scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerBotResponse = (query: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      const normalizedQuery = query.toLowerCase();

      // Find keywords
      let matched = false;
      for (const key in chatBotKeywords) {
        if (normalizedQuery.includes(key)) {
          replyText = chatBotKeywords[key];
          matched = true;
          break;
        }
      }

      // Special checks for Bangla phrases (approximate translation responses)
      if (!matched && language === "bn") {
        if (normalizedQuery.includes("অর্ডার") || normalizedQuery.includes("পরিমাণ") || normalizedQuery.includes("moq")) {
          replyText = chatBotKeywords.moq;
          matched = true;
        } else if (normalizedQuery.includes("শিপিং") || normalizedQuery.includes("জাহাজ")) {
          replyText = chatBotKeywords.shipping;
          matched = true;
        } else if (normalizedQuery.includes("কাস্টম") || normalizedQuery.includes("তৈরি")) {
          replyText = chatBotKeywords.oem;
          matched = true;
        }
      }

      if (!matched) {
        replyText = language === "en"
          ? "Thank you for your inquiry. Our B2B sales office is closed outside hours, but you can request samples by filling our inquiry basket or email sales@enstoys.com. What toy category are you planning to produce?"
          : "আপনার বার্তার জন্য ধন্যবাদ। আমাদের বিটুবি সেলস ম্যানেজার বর্তমানে অফলাইনে আছেন। আপনি যেকোনো কাস্টম খেলনার মূল্য জানতে ইনকোয়ারি বাস্কেটে প্রোডাক্ট যুক্ত করে রিকোয়েস্ট পাঠাতে পারেন অথবা sales@enstoys.com ইমেইল করতে পারেন।";
      }

      const newMsg: ChatMessage = {
        id: "m_" + Math.random().toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, newMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "m_" + Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    triggerBotResponse(textToSend);
  };

  const handleChipClick = (chipText: string) => {
    // Translate chips to English keyword search
    let searchKeyword = chipText;
    if (chipText.includes("MOQ") || chipText.includes("অর্ডার")) searchKeyword = "moq";
    if (chipText.includes("Shipping") || chipText.includes("শিপিং")) searchKeyword = "shipping";
    if (chipText.includes("OEM") || chipText.includes("কাস্টমাইজেশন")) searchKeyword = "oem";
    if (chipText.includes("Certifications") || chipText.includes("সার্টিফিকেট")) searchKeyword = "certificates";
    if (chipText.includes("Lead") || chipText.includes("উৎপাদন")) searchKeyword = "delivery";
    if (chipText.includes("Price") || chipText.includes("মূল্য")) searchKeyword = "pricing";

    const userMsg: ChatMessage = {
      id: "m_" + Math.random().toString(),
      sender: "user",
      text: chipText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    triggerBotResponse(searchKeyword);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/95 text-white flex items-center justify-center shadow-xl shadow-primary/30 transition transform hover:scale-105"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white">
                <ToyBrick className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-poppins font-bold leading-none">
                  {t.chatbot.title}
                </h3>
                <span className="text-[10px] text-orange-200 font-medium">Online B2B Sales Assistant</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50/50 dark:bg-zinc-900/10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-800 rounded-tl-none shadow-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-zinc-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce duration-300"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce duration-300 delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce duration-300 delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Chips (Only show if last message was from bot to guide B2B clients) */}
          {messages.length > 0 && messages[messages.length - 1].sender === "bot" && !isTyping && (
            <div className="px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-150 dark:border-zinc-800/80 flex flex-wrap gap-1.5 overflow-x-auto shrink-0">
              {t.chatbot.chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className="px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-primary text-[10px] font-semibold text-zinc-600 dark:text-zinc-300 bg-white dark:bg-dark hover:text-primary transition shrink-0 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputText);
            }}
            className="p-3 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.chatbot.placeholder}
              className="flex-1 px-3.5 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-primary text-zinc-900 dark:text-zinc-50"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-primary hover:bg-primary/95 text-white shadow-md transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
