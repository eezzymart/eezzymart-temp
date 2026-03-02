"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [setupMsg, setSetupMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async () => {
    setSetupMsg("");
    try {
      const res = await fetch("/api/admin/setup", { method: "POST" });
      const data = await res.json();
      setSetupMsg(data.message || data.error || "Done");
    } catch {
      setSetupMsg("Setup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff165d]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff9a00]/10 rounded-full blur-[150px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff165d]/30 to-transparent" />
      </div>
      {/* Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff165d] to-[#ff9a00] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-[#ff165d]/30 rotate-3 hover:rotate-0 transition-transform">
            <span className="text-2xl font-black text-white">E</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your admin dashboard</p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff165d]/40 focus:border-[#ff165d]/50 transition text-sm"
                  placeholder="admin@eezzymart.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#ff165d]/40 focus:border-[#ff165d]/50 transition text-sm"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-[#ff165d]/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </div>

          {/* Setup */}
          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <p className="text-xs text-gray-600 mb-2">First time? Initialize admin account:</p>
            <button
              type="button"
              onClick={handleSetup}
              className="text-sm text-[#ff9a00] hover:text-[#ff165d] transition font-medium"
            >
              Setup Admin Account
            </button>
            {setupMsg && <p className="text-xs text-gray-500 mt-2 bg-white/5 rounded-lg px-3 py-1.5 inline-block">{setupMsg}</p>}
          </div>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          &copy; {new Date().getFullYear()} EezzyMart. All rights reserved.
        </p>
      </div>
    </div>
  );
}
