"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Slider {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
}

export default function HeroSlider() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    fetch("/api/sliders")
      .then((r) => r.json())
      .then((d) => setSliders(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const nextSlide = useCallback(() => {
    setDirection("right");
    setCurrent((prev) => (prev + 1) % sliders.length);
  }, [sliders.length]);

  const prevSlide = useCallback(() => {
    setDirection("left");
    setCurrent((prev) => (prev - 1 + sliders.length) % sliders.length);
  }, [sliders.length]);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [sliders.length, nextSlide]);

  if (sliders.length === 0) {
    return (
      <div className="relative h-[500px] md:h-[650px] bg-gradient-to-br from-[#0a0f1c] via-[#1a1f3a] to-[#2d1b4e] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#ff165d] rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#ff9a00] rounded-full blur-[150px]" />
        </div>
        <div className="text-center relative z-10 px-4">
          <span className="inline-block text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-4 bg-[#ff9a00]/10 px-4 py-1.5 rounded-full">Welcome to EezzyMart</span>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Shop <span className="bg-gradient-to-r from-[#ff165d] to-[#ff9a00] bg-clip-text text-transparent">Smarter</span>,<br />
            Live Better
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover amazing deals on thousands of products with free shipping
          </p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#ff165d]/30 transition-all duration-300 hover:-translate-y-1">
            Start Shopping
            <FiChevronRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] md:h-[650px] overflow-hidden bg-dark">
      {/* Slides */}
      {sliders.map((slider, index) => (
        <div
          key={slider._id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slider.image}
              alt={slider.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className={`max-w-2xl transition-all duration-700 delay-200 ${
              index === current ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}>
              {slider.subtitle && (
                <span className="inline-block text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-4 bg-[#ff9a00]/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#ff9a00]/20">
                  {slider.subtitle}
                </span>
              )}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {slider.title}
              </h2>
              {slider.link && (
                <Link
                  href={slider.link}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#ff165d]/30 transition-all duration-300 hover:-translate-y-1"
                >
                  {slider.buttonText || "Shop Now"}
                  <FiChevronRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {sliders.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300 z-10 group"
          >
            <FiChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300 z-10 group"
          >
            <FiChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {sliders.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {sliders.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-500 rounded-full ${
                index === current
                  ? "w-10 h-3 bg-gradient-to-r from-[#ff165d] to-[#ff9a00]"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
