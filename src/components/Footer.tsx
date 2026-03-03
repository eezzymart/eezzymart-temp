"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiArrowUp, FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Featured Products", href: "/shop?featured=true" },
  { label: "Best Sellers", href: "/shop" },
  { label: "Brands", href: "/shop" },
];

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/about" },
  { label: "Track Order", href: "/order-tracking" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Return & Refund Policy", href: "/return-policy" },
  { label: "Buyer Policy", href: "/buyer-policy" },
  { label: "Seller Policy", href: "/seller-policy" },
  { label: "Third-Party Policy", href: "/third-party-policy" },
  { label: "Virtual Shop Policy", href: "/virtual-shop-policy" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0f1c] text-gray-300 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff165d]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ff9a00]/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[120px]" />

      {/* Trust Banner */}
      <div className="bg-[#0d1326] border-b border-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: FiTruck, title: "Fast Delivery", desc: "Free on orders over ৳5,000", gradient: "from-[#ff165d] to-[#ff4d82]" },
              { icon: FiShield, title: "Secure Shopping", desc: "100% safe payment methods", gradient: "from-[#ff9a00] to-amber-400" },
              { icon: FiRefreshCw, title: "Easy Returns", desc: "7-day hassle-free returns", gradient: "from-emerald-500 to-teal-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Accent Line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#ff165d] to-transparent opacity-50" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-14 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image src="/Vector-white.png" alt="EezzyMart" width={180} height={50} className="h-12 w-auto" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Your one-stop online shop for electronics, fashion, home essentials, beauty products, and more. Shop with confidence and enjoy fast delivery across Bangladesh.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:+8801234567890" className="flex items-center gap-3 text-sm hover:text-[#ff165d] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#ff165d]/10 transition">
                  <FiPhone size={16} className="text-[#ff165d]" />
                </div>
                01711034971
              </a>
              <a href="mailto:support@eezzymart.com" className="flex items-center gap-3 text-sm hover:text-[#ff165d] transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#ff165d]/10 transition">
                  <FiMail size={16} className="text-[#ff9a00]" />
                </div>
                support@eezzymart.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <FiMapPin size={16} className="text-emerald-400" />
                </div>
                Prantik, Floor: 3A & 3B, House No: 412, Road No: 29, Mohakhali DOHS, Dhaka
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <FiClock size={16} className="text-violet-400" />
                </div>
                24/7 Customer Support
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Shop
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#ff165d] to-transparent rounded mt-2" />
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#ff165d]/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Information
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#ff9a00] to-transparent rounded mt-2" />
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#ff9a00]/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              Policies
              <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded mt-2" />
            </h4>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} <span className="text-white font-medium">EezzyMart</span>. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xs mr-2">We accept:</span>
              {["Visa", "Mastercard", "bKash", "Nagad", "COD"].map((method) => (
                <span key={method} className="bg-white/5 border border-white/10 text-[10px] text-gray-400 font-medium px-2.5 py-1 rounded-md hover:bg-white/10 transition-colors">
                  {method}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: FiFacebook, href: "#", hoverBg: "hover:bg-blue-600 hover:shadow-blue-600/30" },
                { icon: FiInstagram, href: "#", hoverBg: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:shadow-pink-500/30" },
                { icon: FiTwitter, href: "#", hoverBg: "hover:bg-sky-500 hover:shadow-sky-500/30" },
                { icon: FiYoutube, href: "#", hoverBg: "hover:bg-red-600 hover:shadow-red-600/30" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-white hover:border-transparent hover:shadow-lg ${social.hoverBg} transition-all duration-300 hover:-translate-y-0.5`}
                >
                  <social.icon size={16} />
                </a>
              ))}

              {/* Scroll to top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#ff165d]/25 transition-all hover:-translate-y-1 ml-2"
              >
                <FiArrowUp size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
