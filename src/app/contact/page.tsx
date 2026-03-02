"use client";

import { useState } from "react";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] py-20 md:py-28 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#ff165d] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-[#ff9a00] rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <span className="inline-block text-[#ff9a00] text-sm font-semibold tracking-widest uppercase mb-4">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="bg-gradient-to-r from-[#ff165d] to-[#ff9a00] bg-clip-text text-transparent">Us</span>
          </h1>
          <p className="text-white/70 max-w-lg mx-auto">We&apos;d love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff165d]/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: FiMapPin, title: "Address", info: "3/A 3/B, House - Prantik, Road-29, Mohakhali DOHS, Dhaka", gradient: "from-[#ff165d] to-[#ff4d82]" },
                { icon: FiPhone, title: "Phone", info: "+880 1234-567890", gradient: "from-[#ff9a00] to-amber-400" },
                { icon: FiMail, title: "Email", info: "support@eezzymart.com", gradient: "from-emerald-500 to-teal-400" },
                { icon: FiClock, title: "Business Hours", info: "Mon - Fri: 9AM - 6PM\nSat - Sun: 10AM - 4PM", gradient: "from-violet-500 to-purple-500" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
                    <p className="text-sm text-gray-500 whitespace-pre-line">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">Send us a Message</h2>
                <p className="text-sm text-gray-500 mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                {submitted && (
                  <div className="bg-emerald-50 text-emerald-700 px-5 py-4 rounded-xl mb-6 text-sm flex items-center gap-3 border border-emerald-100">
                    <FiCheckCircle size={20} />
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff165d] focus:shadow-[0_0_0_3px_rgba(255,22,93,0.1)] transition-all text-sm bg-gray-50 focus:bg-white" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff165d] focus:shadow-[0_0_0_3px_rgba(255,22,93,0.1)] transition-all text-sm bg-gray-50 focus:bg-white" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff165d] focus:shadow-[0_0_0_3px_rgba(255,22,93,0.1)] transition-all text-sm bg-gray-50 focus:bg-white" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#ff165d] focus:shadow-[0_0_0_3px_rgba(255,22,93,0.1)] transition-all text-sm bg-gray-50 focus:bg-white resize-none" placeholder="Tell us more about your inquiry..." />
                  </div>
                  <button type="submit" className="bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white font-bold px-8 py-3.5 rounded-xl hover:shadow-xl hover:shadow-[#ff165d]/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 active:scale-95">
                    <FiSend size={16} /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
