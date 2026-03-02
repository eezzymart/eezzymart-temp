"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from "react-icons/fi";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  author: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
}

const emptyForm = {
  title: "", content: "", excerpt: "", image: "",
  author: "Admin", category: "General", tags: "", isPublished: true,
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?search=${search}`, { credentials: "include" });
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt || undefined,
        image: form.image || undefined,
        author: form.author,
        category: form.category,
        tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
        isPublished: form.isPublished,
      };
      const url = editing ? `/api/admin/blogs/${editing}` : "/api/admin/blogs";
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
      fetchBlogs();
    } catch { alert("Failed to save blog post"); }
    setSaving(false);
  };

  const handleEdit = (b: Blog) => {
    setEditing(b._id);
    setForm({
      title: b.title,
      content: "",
      excerpt: b.excerpt || "",
      image: b.image || "",
      author: b.author,
      category: b.category,
      tags: "",
      isPublished: b.isPublished,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blogs/${id}`, { method: "DELETE", credentials: "include" });
    fetchBlogs();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <button
          onClick={() => { setForm(emptyForm); setEditing(null); setShowModal(true); }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <FiPlus size={18} /> Add Post
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="relative max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
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
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Author</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : blogs.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No blog posts found</td></tr>
              ) : (
                blogs.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {b.image && <img src={b.image} alt="" className="w-10 h-10 rounded object-cover" />}
                        <div>
                          <p className="font-medium">{b.title}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{b.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{b.author}</td>
                    <td className="px-4 py-3">{b.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {b.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(b)} className="text-blue-500 hover:bg-blue-50 p-1.5 rounded"><FiEdit2 size={16} /></button>
                        <button onClick={() => handleDelete(b._id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded"><FiTrash2 size={16} /></button>
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
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">{editing ? "Edit Blog Post" : "Add Blog Post"}</h3>
              <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Excerpt</label>
                <input type="text" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={8} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Featured Image URL</label>
                <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Author</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 rounded text-primary" />
                Publish immediately
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
