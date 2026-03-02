"use client";

import Link from "next/link";
import { FiArrowRight, FiPercent, FiZap } from "react-icons/fi";

export default function PromoBanner() {
  return (
    <section className="py-14 md:py-20 bg-[#C6D7E2] dark:bg-[#141622] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Banner 1 - Big Sale */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#2d1b69] p-8 md:p-12 min-h-[280px] group hover:shadow-2xl hover:shadow-[#ff165d]/10 transition-shadow duration-500">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff165d]/20 rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ff9a00]/15 rounded-full blur-[60px]" />
            <div className="absolute top-4 right-4 w-20 h-20 border border-white/10 rounded-full flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <FiPercent size={28} className="text-[#ff9a00]" />
            </div>
            {/* Extra floating dots */}
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-[#ff165d]/40 rounded-full animate-float" />
            <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-[#ff9a00]/30 rounded-full animate-float-slow" />

            <div className="relative z-10 flex flex-col justify-center h-full">
              <span className="inline-block text-[#ff9a00] text-xs font-bold tracking-widest uppercase mb-3 bg-[#ff9a00]/10 px-3 py-1 rounded-full w-fit">
                Limited Time Offer
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Big Sale
              </h3>
              <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#ff165d] to-[#ff9a00] bg-clip-text text-transparent mb-4">
                UP TO 50% OFF
              </p>
              <p className="text-gray-400 mb-6 text-sm max-w-sm">
                Don&apos;t miss out on our biggest sale of the season. Top brands at unbeatable prices.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-6 py-3 rounded-full font-semibold w-fit hover:shadow-xl hover:shadow-[#ff165d]/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Shop Now <FiArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Banner 2 - Flash Deals */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#ff165d] via-[#ff3d6e] to-[#ff9a00] p-8 md:p-12 min-h-[280px] group hover:shadow-2xl hover:shadow-[#ff9a00]/15 transition-shadow duration-500">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-6 right-6 w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
              <FiZap size={32} className="text-white" />
            </div>
            {/* Extra floating dots */}
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float" />
            <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-float-slow" />

            <div className="relative z-10 flex flex-col justify-center h-full">
              <span className="inline-block text-white text-xs font-bold tracking-widest uppercase mb-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit">
                Flash Deals
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                New Arrivals
              </h3>
              <p className="text-white/80 mb-6 text-sm max-w-sm">
                Fresh products just dropped! Be the first to explore our latest collection with exclusive launch offers.
              </p>
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 bg-white text-[#ff165d] px-6 py-3 rounded-full font-bold w-fit hover:shadow-xl hover:shadow-black/15 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Now <FiArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
