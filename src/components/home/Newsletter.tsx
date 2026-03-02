"use client";

import { useState } from "react";
import { FiSend, FiCheckCircle, FiMail } from "react-icons/fi";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff165d] via-[#ff3d6e] to-[#ff9a00]" />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[60px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ff165d]/30 rounded-full blur-[60px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform">
            <FiMail size={28} className="text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Subscribe to get exclusive deals, new arrivals & discount coupons delivered to your inbox.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm rounded-2xl py-5 px-6 text-white font-semibold animate-fade-in">
              <FiCheckCircle size={24} />
              <span>You&apos;re subscribed! Check your inbox for a welcome gift.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 text-sm md:text-base shadow-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#0a0f1c] hover:bg-[#1a1f3a] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 disabled:opacity-70 active:scale-95 whitespace-nowrap"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe <FiSend size={16} />
                    </>
                  )}
                </button>
              </div>
              {status === "error" && (
                <p className="text-white/90 text-sm mt-3 bg-black/20 rounded-lg px-4 py-2 inline-block">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}

          <p className="text-white/50 text-xs mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
