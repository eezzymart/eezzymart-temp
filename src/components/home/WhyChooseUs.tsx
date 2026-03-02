"use client";

import { FiTruck, FiShield, FiCreditCard, FiHeadphones, FiRefreshCw, FiAward } from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "Free delivery on all orders above ৳999. Quick and reliable shipping across Bangladesh.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    icon: FiShield,
    title: "Secure Payments",
    description: "100% secure payment processing with SSL encryption. Your data is always safe.",
    color: "from-green-500 to-green-600",
    bg: "bg-green-500/10",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy. Not satisfied? Get your money back, no questions asked.",
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-500/10",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Our customer support team is available around the clock to assist you with anything.",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    icon: FiCreditCard,
    title: "Flexible Payments",
    description: "Pay with bKash, Nagad, credit/debit cards, or cash on delivery — your choice.",
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-500/10",
  },
  {
    icon: FiAward,
    title: "Best Quality",
    description: "We guarantee 100% authentic products sourced directly from brands and authorized sellers.",
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-500/10",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-14 md:py-20 bg-[#DEE7ED] dark:bg-[#0f1117]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-gradient-to-r from-[#ff165d] to-[#ff9a00] text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full mb-4">
            Why Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose EezzyMart?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            We&apos;re committed to providing the best shopping experience with unmatched quality and service
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a1d2e] hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent group-hover:from-[#ff165d]/5 group-hover:to-[#ff9a00]/5 rounded-2xl transition-all duration-300" />
                <div className="relative">
                  <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" style={{ color: feature.color.includes("blue") ? "#3b82f6" : feature.color.includes("green") ? "#22c55e" : feature.color.includes("amber") ? "#f59e0b" : feature.color.includes("purple") ? "#a855f7" : feature.color.includes("pink") ? "#ec4899" : "#14b8a6" }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
