"use client";

import { useState } from "react";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Verified Buyer",
    avatar: "S",
    rating: 5,
    text: "Amazing shopping experience! The products are high quality and delivery was super fast. I've already recommended EezzyMart to all my friends.",
    color: "from-[#ff165d] to-[#ff4d82]",
  },
  {
    name: "Rahim Khan",
    role: "Regular Customer",
    avatar: "R",
    rating: 5,
    text: "Best online store in Bangladesh! Great prices, genuine products, and their customer support is incredibly helpful. Will definitely shop again.",
    color: "from-[#ff9a00] to-amber-400",
  },
  {
    name: "Fatima Begum",
    role: "Verified Buyer",
    avatar: "F",
    rating: 4,
    text: "Love the variety of products available. The website is easy to navigate and checkout was smooth. Very happy with my purchases!",
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Kamal Hossain",
    role: "Premium Member",
    avatar: "K",
    rating: 5,
    text: "Outstanding service and quality! Free shipping on orders over ৳5,000 is a great deal. This is my go-to online store for everything.",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff165d]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff9a00]/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] mx-auto rounded-full" />
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group hover:-translate-y-1"
            >
              {/* Quote Mark */}
              <div className="text-4xl text-[#ff165d]/30 font-serif mb-3">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className={i < t.rating ? "text-[#ff9a00] fill-[#ff9a00]" : "text-gray-600"}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-4xl text-[#ff165d]/30 font-serif mb-3">&ldquo;</div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  className={i < testimonials[current].rating ? "text-[#ff9a00] fill-[#ff9a00]" : "text-gray-600"}
                />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {testimonials[current].text}
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-bold text-sm`}>
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{testimonials[current].name}</p>
                <p className="text-gray-500 text-xs">{testimonials[current].role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
              <FiChevronLeft size={18} />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition">
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
