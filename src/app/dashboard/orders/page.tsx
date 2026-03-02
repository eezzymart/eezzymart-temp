"use client";

import { useEffect, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";

interface Order {
  _id: string;
  orderNumber: string;
  customer: { name: string; email: string; phone: string; address: string; city: string };
  items: Array<{ name: string; price: number; quantity: number; image?: string }>;
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [updating, setUpdating] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "15" });
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/orders?${params}`, { credentials: "include" });
      const data = await res.json();
      setOrders(data.orders || []);
      setTotal(data.total || 0);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, [page, statusFilter, search]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true);
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      fetchOrders();
      if (selectedOrder?._id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch { alert("Failed to update order status"); }
    setUpdating(false);
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const totalPages = Math.ceil(total / 15);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {/* Filters */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl p-4 shadow-sm mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order #..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 border dark:border-[#2d3148] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#141622] dark:text-gray-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 py-2 border dark:border-[#2d3148] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#141622] dark:text-gray-100"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-[#141622] dark:text-gray-400">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Order #</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Items</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No orders found</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id} className="border-t dark:border-[#2d3148] hover:bg-gray-50 dark:hover:bg-[#252840]/50">
                    <td className="px-4 py-3 font-medium">{o.orderNumber}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p>{o.customer.name}</p>
                        <p className="text-xs text-gray-400">{o.customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{o.items.length} items</td>
                    <td className="px-4 py-3 font-medium">৳{o.total.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        disabled={updating}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusColor(o.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelectedOrder(o)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded">
                        <FiEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t dark:border-[#2d3148] text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total: {total} orders</span>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${page === i + 1 ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-[#252840]"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b dark:border-[#2d3148]">
              <h3 className="text-lg font-semibold dark:text-gray-100">Order #{selectedOrder.orderNumber}</h3>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Date */}
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 dark:bg-[#141622] rounded-lg p-4">
                <h4 className="font-medium mb-2 dark:text-gray-200">Customer Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500 dark:text-gray-400">Name:</span> {selectedOrder.customer.name}</div>
                  <div><span className="text-gray-500 dark:text-gray-400">Email:</span> {selectedOrder.customer.email}</div>
                  <div><span className="text-gray-500 dark:text-gray-400">Phone:</span> {selectedOrder.customer.phone}</div>
                  <div><span className="text-gray-500 dark:text-gray-400">City:</span> {selectedOrder.customer.city}</div>
                  <div className="col-span-2"><span className="text-gray-500 dark:text-gray-400">Address:</span> {selectedOrder.customer.address}</div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-medium mb-2 dark:text-gray-200">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-[#141622] rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        {item.image && <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />}
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium text-sm">৳{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t dark:border-[#2d3148] pt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Subtotal</span><span>৳{selectedOrder.subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Shipping</span><span>৳{selectedOrder.shipping.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-base pt-1 border-t dark:border-[#2d3148]"><span>Total</span><span>৳{selectedOrder.total.toLocaleString()}</span></div>
              </div>

              {/* Payment */}
              <div className="text-sm dark:text-gray-300">
                <span className="text-gray-500 dark:text-gray-400">Payment Method:</span> {selectedOrder.paymentMethod === "cod" ? "Cash on Delivery" : selectedOrder.paymentMethod}
              </div>

              {selectedOrder.notes && (
                <div className="text-sm dark:text-gray-300">
                  <span className="text-gray-500 dark:text-gray-400">Notes:</span> {selectedOrder.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
