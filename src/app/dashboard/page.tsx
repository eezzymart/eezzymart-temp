"use client";

import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiDollarSign, FiUsers, FiTrendingUp, FiClock, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCategories: number;
  pendingOrders: number;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    customer: { name: string; email: string };
    total: number;
    status: string;
    createdAt: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-gray-100 dark:bg-[#252840] rounded w-24 mb-3" />
              <div className="h-8 bg-gray-100 dark:bg-[#252840] rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Products",
      value: stats?.totalProducts || 0,
      icon: FiPackage,
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
      iconColor: "text-blue-500",
      change: "+12",
      up: true,
    },
    {
      label: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: FiShoppingCart,
      gradient: "from-emerald-500 to-teal-500",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      change: "+8",
      up: true,
    },
    {
      label: "Revenue",
      value: `৳${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: FiDollarSign,
      gradient: "from-[#ff165d] to-[#ff4d82]",
      bg: "bg-red-50",
      iconColor: "text-[#ff165d]",
      change: "+23",
      up: true,
    },
    {
      label: "Categories",
      value: stats?.totalCategories || 0,
      icon: FiUsers,
      gradient: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
      iconColor: "text-violet-500",
      change: "+2",
      up: true,
    },
    {
      label: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: FiClock,
      gradient: "from-[#ff9a00] to-amber-500",
      bg: "bg-amber-50",
      iconColor: "text-[#ff9a00]",
      change: "-5",
      up: false,
    },
    {
      label: "Growth Rate",
      value: "+12%",
      icon: FiTrendingUp,
      gradient: "from-teal-500 to-emerald-500",
      bg: "bg-teal-50",
      iconColor: "text-teal-500",
      change: "+3.2",
      up: true,
    },
  ];

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-amber-50 text-amber-600 border-amber-200";
      case "processing": return "bg-blue-50 text-blue-600 border-blue-200";
      case "shipped": return "bg-violet-50 text-violet-600 border-violet-200";
      case "delivered": return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "cancelled": return "bg-red-50 text-red-600 border-red-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a0f1c] via-[#1a1040] to-[#2d1b69] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff165d]/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-[#ff9a00]/10 rounded-full blur-[60px]" />
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
          <p className="text-gray-400 text-sm md:text-base">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#2d3148] hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <card.icon size={22} className={card.iconColor} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                card.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
              }`}>
                {card.up ? <FiArrowUpRight size={12} /> : <FiArrowDownRight size={12} />}
                {card.change}%
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2d3148] overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-[#2d3148]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Orders</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Latest transactions from your store</p>
            </div>
            <a href="/dashboard/orders" className="text-sm text-[#ff165d] font-semibold hover:underline flex items-center gap-1">
              View All <FiArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50/50 dark:bg-[#141622]">
                <th className="px-6 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-t border-gray-50 dark:border-[#2d3148] hover:bg-gray-50/50 dark:hover:bg-[#252840]/50 transition">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">{order.orderNumber}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-100">{order.customer?.name || "N/A"}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{order.customer?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">৳{order.total?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-12 text-center text-gray-400" colSpan={5}>
                    <FiShoppingCart size={32} className="mx-auto mb-2 text-gray-300" />
                    <p>No orders yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
