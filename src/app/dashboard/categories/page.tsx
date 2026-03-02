"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: Category | null;
  isActive: boolean;
  order: number;
}

const emptyForm = { name: "", description: "", image: "", parent: "", isActive: true, order: "0" };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories", { credentials: "include" });
      const data = await res.json();
      setCategories(data.categories || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        name: form.name,
        description: form.description,
        image: form.image || undefined,
        parent: form.parent || undefined,
        isActive: form.isActive,
        order: Number(form.order),
      };
      const url = editing ? `/api/admin/categories/${editing}` : "/api/admin/categories";
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
      fetchCategories();
    } catch { alert("Failed to save category"); }
    setSaving(false);
  };

  const handleEdit = (c: Category) => {
    setEditing(c._id);
    setForm({
      name: c.name,
      description: c.description || "",
      image: c.image || "",
      parent: (c.parent as Category)?._id || "",
      isActive: c.isActive,
      order: String(c.order),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE", credentials: "include" });
    fetchCategories();
  };

  const parentCategories = categories.filter((c) => !c.parent);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => { setForm(emptyForm); setEditing(null); setShowModal(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <FiPlus size={18} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Parent</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No categories found</td></tr>
              ) : (
                categories.map((c) => (
                  <tr key={c._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {c.image && <img src={c.image} alt="" className="w-8 h-8 rounded object-cover" />}
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                    <td className="px-4 py-3">{(c.parent as Category)?.name || "—"}</td>
                    <td className="px-4 py-3">{c.order}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {c.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(c)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><FiEdit2 size={16} /></button>
                        <button onClick={() => handleDelete(c._id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><FiTrash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">{editing ? "Edit Category" : "Add Category"}</h3>
              <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Parent Category</label>
                <select value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">None (Top Level)</option>
                  {parentCategories.filter((pc) => pc._id !== editing).map((pc) => (
                    <option key={pc._id} value={pc._id}>{pc.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded text-primary" />
                    Active
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
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
