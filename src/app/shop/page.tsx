"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { FiFilter, FiX, FiGrid, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number;
  images: string[];
  stock: number;
  ratings?: number;
  numReviews?: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("-createdAt");
  const [filterOpen, setFilterOpen] = useState(false);
  const search = searchParams.get("search") || "";

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => {
        const cats = Array.isArray(d) ? d : d.categories || [];
        setCategories(cats.filter((c: Category & { parent?: string }) => !c.parent));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", "12");
    params.set("sort", sort);
    if (selectedCategory) params.set("category", selectedCategory);
    if (search) params.set("search", search);
    if (searchParams.get("featured")) params.set("featured", "true");

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setTotalPages(d.pages || 1);
        setTotal(d.total || 0);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [page, sort, selectedCategory, search, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#ff165d] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#ff9a00] rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <FiChevronRight size={14} />
            <span className="text-white">Shop</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {search ? (
              <>Search: <span className="text-[#ff9a00]">&quot;{search}&quot;</span></>
            ) : (
              <>Our <span className="bg-gradient-to-r from-[#ff165d] to-[#ff9a00] bg-clip-text text-transparent">Products</span></>
            )}
          </h1>
          {total > 0 && (
            <p className="text-gray-400 mt-2">{total} products found</p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FiGrid size={18} className="text-[#ff165d]" />
                  Categories
                </h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => { setSelectedCategory(""); setPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        !selectedCategory
                          ? "bg-gradient-to-r from-[#ff165d]/10 to-transparent text-[#ff165d] font-semibold border-l-3 border-[#ff165d]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat._id}>
                      <button
                        onClick={() => { setSelectedCategory(cat._id); setPage(1); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedCategory === cat._id
                            ? "bg-gradient-to-r from-[#ff165d]/10 to-transparent text-[#ff165d] font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Sort By</h3>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setPage(1); }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff165d]/20 focus:border-[#ff165d] bg-gray-50"
                >
                  <option value="-createdAt">Newest First</option>
                  <option value="createdAt">Oldest First</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            className="md:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white w-14 h-14 rounded-full shadow-xl shadow-[#ff165d]/25 flex items-center justify-center"
            onClick={() => setFilterOpen(true)}
          >
            <FiFilter size={22} />
          </button>

          {/* Mobile Filter Drawer */}
          {filterOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
                <div className="sticky top-0 bg-white flex items-center justify-between p-5 border-b z-10">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <FiX size={18} />
                  </button>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold mb-3 text-sm text-gray-900">Categories</h4>
                  <ul className="space-y-1 mb-6">
                    <li>
                      <button
                        onClick={() => { setSelectedCategory(""); setPage(1); setFilterOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${!selectedCategory ? "bg-[#ff165d]/10 text-[#ff165d] font-semibold" : "text-gray-600"}`}
                      >
                        All Categories
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat._id}>
                        <button
                          onClick={() => { setSelectedCategory(cat._id); setPage(1); setFilterOpen(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedCategory === cat._id ? "bg-[#ff165d]/10 text-[#ff165d] font-semibold" : "text-gray-600"}`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <h4 className="font-semibold mb-3 text-sm text-gray-900">Sort By</h4>
                  <select
                    value={sort}
                    onChange={(e) => { setSort(e.target.value); setPage(1); }}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm bg-gray-50"
                  >
                    <option value="-createdAt">Newest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-square bg-gray-100 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-3 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                      <div className="h-4 bg-gray-100 rounded-full w-1/2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiGrid size={32} className="text-gray-300" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No products found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {page > 1 && (
                      <button
                        onClick={() => setPage(page - 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition text-sm font-medium"
                      >
                        ‹
                      </button>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                          p === page
                            ? "bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white shadow-lg shadow-[#ff165d]/20"
                            : "bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    {page < totalPages && (
                      <button
                        onClick={() => setPage(page + 1)}
                        className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition text-sm font-medium"
                      >
                        ›
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <div className="bg-gradient-to-r from-[#0a0f1c] to-[#1a1040] py-14">
            <div className="container mx-auto px-4">
              <div className="h-8 w-48 bg-white/10 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
