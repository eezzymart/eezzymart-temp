"use client";

import { useEffect, useState } from "react";
import { FiDownload, FiTrash2, FiSearch } from "react-icons/fi";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export default function NewslettersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/newsletters", { credentials: "include" });
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const csv = "Email,Date,Status\n" +
      filtered.map((s) =>
        `${s.email},${new Date(s.createdAt).toLocaleDateString()},${s.isActive ? "Active" : "Inactive"}`
      ).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
        <button
          onClick={exportCSV}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <FiDownload size={18} /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Subscribers</p>
          <p className="text-2xl font-bold">{subscribers.length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{subscribers.filter((s) => s.isActive).length}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-primary">
            {subscribers.filter((s) => {
              const d = new Date(s.createdAt);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Subscribed On</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">No subscribers found</td></tr>
              ) : (
                filtered.map((s, i) => (
                  <tr key={s._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {s.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(s.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
