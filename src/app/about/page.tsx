import Image from "next/image";
import { FiAward, FiUsers, FiGlobe, FiHeart, FiCheckCircle, FiShield, FiZap } from "react-icons/fi";

export const metadata = { title: "About Us - EezzyMart" };

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] py-24 md:py-32 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff165d] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff9a00] rounded-full blur-[150px]" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <span className="inline-block text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-4">About Us</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5">
            About <span className="bg-gradient-to-r from-[#ff165d] to-[#ff9a00] bg-clip-text text-transparent">EezzyMart</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">We are passionate about bringing you the best products at the best prices, with a seamless shopping experience.</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff165d]/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-[#ff165d] text-sm font-semibold tracking-widest uppercase mb-3">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] rounded-full mb-6" />
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                EezzyMart was founded with a simple mission: to make online shopping easy, affordable, and enjoyable for everyone. What started as a small idea has grown into a thriving e-commerce platform serving thousands of happy customers.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                We carefully curate our product catalog to ensure every item meets our quality standards. From electronics and fashion to home essentials and more, we offer an extensive range of products to suit every need and budget.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Our team works tirelessly to provide exceptional customer service, fast shipping, and hassle-free returns. We believe that shopping should be stress-free, and we are committed to making that a reality for every customer.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Quality Products", "Fast Delivery", "24/7 Support"].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1d2e] px-4 py-2 rounded-full">
                    <FiCheckCircle className="text-[#ff165d]" size={16} /> {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a1d2e] dark:to-[#141622] border border-gray-200 dark:border-[#2d3148] shadow-xl">
              <Image src="/logo-color-trimmed.png" alt="EezzyMart" fill className="object-contain p-12" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#ff165d]/10 rounded-full blur-[40px]" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#ff9a00]/10 rounded-full blur-[40px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#ff165d]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ff9a00]/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-3">Our Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Numbers Speak for Themselves</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: FiUsers, value: "10K+", label: "Happy Customers", gradient: "from-[#ff165d] to-[#ff4d82]" },
              { icon: FiGlobe, value: "50+", label: "Countries Served", gradient: "from-[#ff9a00] to-amber-400" },
              { icon: FiAward, value: "5K+", label: "Products", gradient: "from-emerald-500 to-teal-400" },
              { icon: FiHeart, value: "99%", label: "Satisfaction Rate", gradient: "from-violet-500 to-purple-500" },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 group">
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#ff9a00]/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block text-[#ff165d] text-sm font-semibold tracking-widest uppercase mb-3">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: FiCheckCircle, title: "Quality First", desc: "We never compromise on quality. Every product is carefully vetted before being listed on our platform.", gradient: "from-[#ff165d] to-[#ff4d82]" },
              { icon: FiShield, title: "Customer Centric", desc: "Our customers are at the heart of everything we do. We listen, adapt, and continuously improve.", gradient: "from-[#ff9a00] to-amber-400" },
              { icon: FiZap, title: "Innovation", desc: "We embrace technology and innovation to provide a modern, seamless shopping experience.", gradient: "from-emerald-500 to-teal-400" },
            ].map((v, i) => (
              <div key={i} className="text-center p-8 bg-white dark:bg-[#1a1d2e] border border-gray-100 dark:border-[#2d3148] rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${v.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <v.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
