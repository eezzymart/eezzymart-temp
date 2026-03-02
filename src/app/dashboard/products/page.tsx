"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  category?: Category;
  stock: number;
  featured: boolean;
  isActive: boolean;
  images: string[];
  createdAt: string;
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  salePrice: "",
  category: "",
  stock: "",
  images: "",
  featured: false,
  isActive: true,
  tags: "",
  sku: "",
  specifications: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/products?page=${page}&limit=10&search=${search}`, { credentials: "include" });
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch { /* ignore */ }
  };

  useEffect(() => { fetchProducts(); }, [page, search]);
  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        salePrice: form.salePrice ? Number(form.salePrice) : undefined,
        category: form.category || undefined,
        stock: Number(form.stock),
        images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
        featured: form.featured,
        isActive: form.isActive,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        sku: form.sku,
        specifications: form.specifications
          ? Object.fromEntries(form.specifications.split("\n").map((l) => l.split(":").map((s) => s.trim())))
          : undefined,
      };

      const url = editing ? `/api/admin/products/${editing}` : "/api/admin/products";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed");
      setShowModal(false);
      setForm(emptyForm);
      setEditing(null);
      fetchProducts();
    } catch { alert("Failed to save product"); }
    setSaving(false);
  };

  const handleEdit = (p: Product) => {
    setEditing(p._id);
    setForm({
      name: p.name,
      description: "",
      price: String(p.price),
      salePrice: p.salePrice ? String(p.salePrice) : "",
      category: (p.category as Category)?._id || "",
      stock: String(p.stock),
      images: p.images.join(", "),
      featured: p.featured,
      isActive: p.isActive,
      tags: "",
      sku: "",
      specifications: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE", credentials: "include" });
    fetchProducts();
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => { setForm(emptyForm); setEditing(null); setShowModal(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <FiPlus size={18} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl p-4 shadow-sm mb-4">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2 border dark:border-[#2d3148] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-[#141622] dark:text-gray-100"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-[#141622] dark:text-gray-400">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No products found</td></tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="border-t dark:border-[#2d3148] hover:bg-gray-50 dark:hover:bg-[#252840]/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images[0] && (
                          <img src={p.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                        )}
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.salePrice ? (
                        <div>
                          <span className="text-primary font-medium">৳{p.salePrice}</span>
                          <span className="text-gray-400 line-through text-xs ml-1">৳{p.price}</span>
                        </div>
                      ) : (
                        <span className="font-medium">৳{p.price}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">{(p.category as Category)?.name || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 dark:bg-[#252840] text-gray-500"}`}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(p)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><FiEdit2 size={16} /></button>
                        <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><FiTrash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t dark:border-[#2d3148] text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total: {total} products</span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b dark:border-[#2d3148]">
              <h3 className="text-lg font-semibold dark:text-gray-100">{editing ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 dark:text-gray-300 dark:[&_input]:bg-[#141622] dark:[&_input]:border-[#2d3148] dark:[&_input]:text-gray-100 dark:[&_textarea]:bg-[#141622] dark:[&_textarea]:border-[#2d3148] dark:[&_textarea]:text-gray-100 dark:[&_select]:bg-[#141622] dark:[&_select]:border-[#2d3148] dark:[&_select]:text-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (৳)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sale Price (৳)</label>
                  <input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select Category</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">SKU</label>
                  <input type="text" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Image URLs (comma-separated)</label>
                  <input type="text" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://example.com/img1.jpg, https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                  <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="tag1, tag2, tag3" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Specifications (key: value per line)</label>
                  <textarea value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={3} placeholder={"Material: Cotton\nSize: Large"} />
                </div>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded text-primary" />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded text-primary" />
                    Active
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t dark:border-[#2d3148]">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border dark:border-[#2d3148] rounded-lg hover:bg-gray-50 dark:hover:bg-[#252840] dark:text-gray-300">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50">
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
