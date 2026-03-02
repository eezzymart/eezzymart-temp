"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface Slider {
  _id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  buttonText?: string;
  order: number;
  isActive: boolean;
}

const emptyForm = { title: "", subtitle: "", image: "", link: "", buttonText: "", order: "0", isActive: true };

export default function SlidersPage() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sliders", { credentials: "include" });
      const data = await res.json();
      setSliders(data.sliders || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchSliders(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: form.title,
        subtitle: form.subtitle || undefined,
        image: form.image,
        link: form.link || undefined,
        buttonText: form.buttonText || undefined,
        order: Number(form.order),
        isActive: form.isActive,
      };
      const url = editing ? `/api/admin/sliders/${editing}` : "/api/admin/sliders";
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
      fetchSliders();
    } catch { alert("Failed to save slider"); }
    setSaving(false);
  };

  const handleEdit = (s: Slider) => {
    setEditing(s._id);
    setForm({
      title: s.title,
      subtitle: s.subtitle || "",
      image: s.image,
      link: s.link || "",
      buttonText: s.buttonText || "",
      order: String(s.order),
      isActive: s.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this slider?")) return;
    await fetch(`/api/admin/sliders/${id}`, { method: "DELETE", credentials: "include" });
    fetchSliders();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Sliders</h2>
        <button
          onClick={() => { setForm(emptyForm); setEditing(null); setShowModal(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <FiPlus size={18} /> Add Slider
        </button>
      </div>

      {/* Slider Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-8 text-gray-400">Loading...</div>
        ) : sliders.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-400 mb-4">No sliders yet</p>
              <button onClick={() => { setForm(emptyForm); setEditing(null); setShowModal(true); }} className="text-primary hover:underline">
                Add your first slider
              </button>
            </div>
          </div>
        ) : (
          sliders.map((s) => (
            <div key={s._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-[16/6] relative bg-gray-100">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                {!s.isActive && (
                  <div className="absolute top-2 right-2 bg-gray-800/70 text-white px-2 py-1 rounded text-xs">
                    Inactive
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs">
                  Order: {s.order}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{s.title}</h3>
                {s.subtitle && <p className="text-sm text-gray-500 mt-1">{s.subtitle}</p>}
                {s.link && <p className="text-xs text-gray-400 mt-1 truncate">Link: {s.link}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEdit(s)} className="flex-1 text-sm text-blue-500 border border-blue-200 rounded-lg py-1.5 hover:bg-blue-50 flex items-center justify-center gap-1">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(s._id)} className="flex-1 text-sm text-red-500 border border-red-200 rounded-lg py-1.5 hover:bg-red-50 flex items-center justify-center gap-1">
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">{editing ? "Edit Slider" : "Add Slider"}</h3>
              <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required placeholder="https://example.com/slider.jpg" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link URL</label>
                <input type="text" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="/shop or https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Button Text</label>
                  <input type="text" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Shop Now" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded text-primary" />
                Active
              </label>
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
