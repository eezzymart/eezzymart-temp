"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiHome, FiPackage, FiGrid, FiImage, FiShoppingCart,
  FiFileText, FiMail, FiLogOut, FiMenu, FiX, FiChevronRight,
  FiBell, FiUser
} from "react-icons/fi";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: FiHome },
  { href: "/dashboard/products", label: "Products", icon: FiPackage },
  { href: "/dashboard/categories", label: "Categories", icon: FiGrid },
  { href: "/dashboard/orders", label: "Orders", icon: FiShoppingCart },
  { href: "/dashboard/sliders", label: "Sliders", icon: FiImage },
  { href: "/dashboard/blogs", label: "Blog Posts", icon: FiFileText },
  { href: "/dashboard/newsletters", label: "Newsletters", icon: FiMail },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (pathname === "/dashboard/login") {
      setAuthenticated(true);
      return;
    }
    fetch("/api/admin/dashboard", { credentials: "include" })
      .then((r) => {
        if (!r.ok) router.push("/dashboard/login");
        else setAuthenticated(true);
      })
      .catch(() => router.push("/dashboard/login"));
  }, [pathname, router]);

  const handleLogout = async () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/dashboard/login");
  };

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-10 h-10 border-4 border-[#ff165d] border-t-transparent rounded-full" />
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const currentPage = sidebarLinks.find(l => l.href === pathname)?.label || "Dashboard";

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-gradient-to-b from-[#0a0f1c] via-[#0f1629] to-[#0a0f1c] text-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#ff165d] to-[#ff9a00] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#ff165d]/20">
              E
            </div>
            <div>
              <span className="font-bold text-base">EezzyMart</span>
              <p className="text-[10px] text-gray-500 -mt-0.5">Admin Panel</p>
            </div>
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1 mt-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold px-3 mb-3">Main Menu</p>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white shadow-lg shadow-[#ff165d]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon size={18} className={isActive ? "" : "group-hover:text-[#ff165d] transition-colors"} />
                {link.label}
                {isActive && <FiChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition"
          >
            <FiChevronRight size={16} className="rotate-180" />
            Back to Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition w-full"
          >
            <FiLogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3.5 flex items-center gap-4 lg:px-6 sticky top-0 z-30">
          <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
            <FiMenu size={22} />
          </button>

          <div className="flex-1">
            <h1 className="font-bold text-lg text-gray-900">{currentPage}</h1>
            <p className="text-xs text-gray-400 hidden sm:block">Manage your store efficiently</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition relative">
              <FiBell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ff165d] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff165d] to-[#ff9a00] flex items-center justify-center text-white font-bold text-xs shadow-sm">
              <FiUser size={16} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
