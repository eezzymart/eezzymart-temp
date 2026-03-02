"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiPercent } from "react-icons/fi";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/sliders")
      .then((r) => r.json())
      .then((d) => setSliders(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const animateContent = useCallback(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === current) return;
    setIsAnimating(true);
    setCurrent(index);
    animateContent();
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, current, animateContent]);

  const nextSlide = useCallback(() => {
    if (sliders.length <= 1) return;
    goToSlide((current + 1) % sliders.length);
  }, [current, sliders.length, goToSlide]);

  const prevSlide = useCallback(() => {
    if (sliders.length <= 1) return;
    goToSlide((current - 1 + sliders.length) % sliders.length);
  }, [current, sliders.length, goToSlide]);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [sliders.length, nextSlide]);

  useEffect(() => {
    if (!progressRef.current || sliders.length <= 1) return;
    const el = progressRef.current;
    el.style.transition = "none";
    el.style.width = "0%";
    requestAnimationFrame(() => {
      el.style.transition = "width 6s linear";
      el.style.width = "100%";
    });
  }, [current, sliders.length]);

  useEffect(() => {
    if (sliders.length > 0) {
      setTimeout(animateContent, 200);
    }
  }, [sliders.length, animateContent]);

  const featureBadges = [
    { icon: FiShoppingBag, text: "50K+ Products" },
    { icon: FiTruck, text: "Free Shipping" },
    { icon: FiPercent, text: "Best Prices" },
  ];

  if (sliders.length === 0) {
    return (
      <div className="relative h-[550px] md:h-[700px] bg-gradient-to-br from-[#0a0f1c] via-[#1a1f3a] to-[#2d1b4e] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#ff165d] rounded-full blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#ff9a00] rounded-full blur-[150px] opacity-20 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
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
    <div className="relative h-[550px] md:h-[700px] overflow-hidden bg-dark">
      {sliders.map((slider, index) => (
        <div
          key={slider._id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-[1.08]"
          }`}
        >
          <div className={`absolute inset-0 ${index === current ? "hero-ken-burns" : ""}`}>
            <Image src={slider.image} alt={slider.title} fill className="object-cover" priority={index === 0} sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff165d]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ff9a00]/10 rounded-full blur-[120px]" />
        </div>
      ))}

      <div className="relative h-full container mx-auto px-4 flex items-center z-10">
        <div ref={contentRef} className="max-w-3xl" style={{ opacity: 0, transform: "translateY(40px)" }}>
          {sliders[current]?.subtitle && (
            <span className="inline-flex items-center gap-2 text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-6 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-[#ff9a00] rounded-full animate-pulse" />
              {sliders[current].subtitle}
            </span>
          )}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {sliders[current]?.title?.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === 0 ? line : <span className="bg-gradient-to-r from-[#ff165d] to-[#ff9a00] bg-clip-text text-transparent">{line}</span>}
              </span>
            ))}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            Discover premium quality products at unbeatable prices. Shop with confidence.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {sliders[current]?.link && (
              <Link href={sliders[current].link!} className="inline-flex items-center gap-3 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-[#ff165d]/30 transition-all duration-300 hover:-translate-y-1 group">
                {sliders[current].buttonText || "Shop Now"}
                <FiChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <Link href="/shop" className="inline-flex items-center gap-2 text-white border-2 border-white/30 px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              Explore All
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6 mt-10">
            {featureBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <badge.icon size={14} className="text-[#ff9a00]" />
                </div>
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {sliders.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300 z-20 group">
            <FiChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-all duration-300 z-20 group">
            <FiChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </>
      )}

      {sliders.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="w-full h-1 bg-white/10">
            <div ref={progressRef} className="h-full bg-gradient-to-r from-[#ff165d] to-[#ff9a00]" style={{ width: "0%" }} />
          </div>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex gap-3">
              {sliders.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index)} className={`transition-all duration-500 rounded-full ${index === current ? "w-10 h-3 bg-gradient-to-r from-[#ff165d] to-[#ff9a00]" : "w-3 h-3 bg-white/30 hover:bg-white/60"}`} />
              ))}
            </div>
            <div className="text-white/60 text-sm font-mono">
              <span className="text-white font-bold text-lg">{String(current + 1).padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              <span>{String(sliders.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .hero-ken-burns { animation: kenBurns 8s ease-out forwards; }
        @keyframes kenBurns { from { transform: scale(1); } to { transform: scale(1.08); } }
      `}</style>
    </div>
  );
}
