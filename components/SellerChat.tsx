"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/AppContext";
import { translations } from "@/data/translations";
import { ChatMessage } from "@/types";
import { Send, MessageSquare } from "lucide-react";

export const SellerChat: React.FC = () => {
  const { language, user, allMessages, addMessage } = useApp();
  const t = translations[language];

  const currentEmail = user?.email || "guest@enstoys.com";
  const currentName = user?.name || "Guest";

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = allMessages
      .filter((msg) => msg.userEmail === currentEmail)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    if (thread.length > 0) {
      setMessages(thread);
    } else {
      setMessages([
        {
          id: "seller-welcome",
          sender: "admin",
          userEmail: currentEmail,
          name: "Admin",
          text: t.chat.welcome,
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [allMessages, currentEmail, language, t.chat.welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setIsTyping(true);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      userEmail: currentEmail,
      name: currentName,
      text,
      timestamp: new Date().toISOString()
    };

    addMessage(currentName, currentEmail, text, "user");
    setInputText("");
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 bg-primary text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight">{t.chat.title}</h1>
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">{t.chat.subtitle}</p>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4">
            <div className="rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 min-h-[420px] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm leading-relaxed ${msg.sender === "user" ? "bg-primary text-white rounded-br-none" : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-bl-none border border-zinc-200 dark:border-zinc-800"}`}>
                    <div className="mb-2 text-[10px] uppercase tracking-[0.18em] font-bold text-zinc-500 dark:text-zinc-400">
                      {msg.sender === "user" ? "You" : t.chat.sellerLabel}
                    </div>
                    <p>{msg.text}</p>
                    <div className="mt-2 text-[10px] text-zinc-400 dark:text-zinc-500 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-bounce" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-bounce delay-100" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-bounce delay-200" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputText);
              }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t.chat.placeholder}
                className="flex-1 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-3xl bg-primary px-5 py-3 text-white font-bold transition hover:bg-primary/95"
              >
                <Send className="w-4 h-4" />
                {t.chat.sendButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
