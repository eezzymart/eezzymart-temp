"use client";

import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Free Shipping",
    description: "On orders over ৳5,000",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50",
  },
  {
    icon: FiShield,
    title: "Secure Payment",
    description: "100% secure checkout",
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50",
  },
  {
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "7-day return policy",
    gradient: "from-[#ff165d] to-[#ff4d82]",
    bg: "bg-red-50",
  },
  {
    icon: FiHeadphones,
    title: "24/7 Support",
    description: "Dedicated support team",
    gradient: "from-[#ff9a00] to-amber-400",
    bg: "bg-amber-50",
  },
];

export default function FeatureBanner() {
  return (
    <section className="py-10 md:py-14 bg-[#ECF4FF] dark:bg-[#0f1117] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 md:p-6 border border-gray-100 dark:border-gray-800 hover:border-transparent hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/30 transition-all duration-500 text-center hover:-translate-y-1"
            >
              {/* Gradient border on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />

              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-500 bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                <feature.icon size={28} className="text-white" />
              </div>

              <h3 className="font-bold text-sm md:text-base text-gray-800 dark:text-gray-200 mb-1 group-hover:text-gray-900 dark:group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
