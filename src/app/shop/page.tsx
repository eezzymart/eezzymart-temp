"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { FiFilter, FiX, FiGrid, FiChevronRight, FiList, FiStar, FiSliders } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
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

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", "15");
    params.set("sort", sort);
    if (selectedCategory) params.set("category", selectedCategory);
    if (search) params.set("search", search);
    if (searchParams.get("featured")) params.set("featured", "true");
    if (priceRange[0] > 0) params.set("minPrice", priceRange[0].toString());
    if (priceRange[1] < 100000) params.set("maxPrice", priceRange[1].toString());
    if (minRating > 0) params.set("rating", minRating.toString());
    if (inStock) params.set("inStock", "true");

    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setTotalPages(d.pages || 1);
        setTotal(d.total || 0);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [page, sort, selectedCategory, search, searchParams, priceRange, minRating, inStock]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 100000]);
    setMinRating(0);
    setInStock(false);
    setSort("-createdAt");
    setPage(1);
  };

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 100000 || minRating > 0 || inStock;

  /* Sidebar filter content (reused for mobile drawer) */
  const filterContent = (mobile = false) => (
    <div className="space-y-6">
      {/* Active filters / Clear */}
      {hasActiveFilters && (
        <button
          onClick={() => {
            clearFilters();
            if (mobile) setFilterOpen(false);
          }}
          className="w-full text-sm text-[#ff165d] font-semibold hover:underline flex items-center gap-1"
        >
          <FiX size={14} /> Clear All Filters
        </button>
      )}

      {/* Categories */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiGrid size={18} className="text-[#ff165d]" />
          Categories
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => { setSelectedCategory(""); setPage(1); if (mobile) setFilterOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                !selectedCategory
                  ? "bg-gradient-to-r from-[#ff165d]/10 to-transparent text-[#ff165d] font-semibold"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat._id}>
              <button
                onClick={() => { setSelectedCategory(cat._id); setPage(1); if (mobile) setFilterOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === cat._id
                    ? "bg-gradient-to-r from-[#ff165d]/10 to-transparent text-[#ff165d] font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiSliders size={18} className="text-[#ff9a00]" />
          Price Range
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-gray-50 dark:bg-[#141622] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff165d]/20"
                placeholder="0"
              />
            </div>
            <span className="text-gray-400 mt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Max</label>
              <input
                type="number"
                value={priceRange[1] === 100000 ? "" : priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-gray-50 dark:bg-[#141622] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff165d]/20"
                placeholder="Max"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[[0, 500], [500, 1000], [1000, 5000], [5000, 100000]].map(([min, max]) => (
              <button
                key={`${min}-${max}`}
                onClick={() => { setPriceRange([min, max]); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  priceRange[0] === min && priceRange[1] === max
                    ? "bg-[#ff165d] text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                ৳{min} - {max >= 100000 ? "∞" : `৳${max.toLocaleString()}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiStar size={18} className="text-yellow-500" />
          Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => { setMinRating(minRating === r ? 0 : r); setPage(1); }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                minRating === r
                  ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                  : "hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FiStar
                    key={s}
                    size={14}
                    className={s <= r ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
                    style={s <= r ? { fill: "#facc15" } : {}}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stock filter */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => { setInStock(e.target.checked); setPage(1); }}
            className="w-4 h-4 rounded border-gray-300 text-[#ff165d] focus:ring-[#ff165d] accent-[#ff165d]"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Stock Only</span>
        </label>
      </div>

      {/* Sort */}
      <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1); }}
          className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff165d]/20 focus:border-[#ff165d] bg-gray-50 dark:bg-[#141622] dark:text-white"
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="-ratings">Highest Rated</option>
          <option value="-numReviews">Most Reviewed</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117]">
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
        {/* Top bar with view toggle and active filters */}
        <div className="flex items-center justify-between mb-6 bg-white dark:bg-[#1a1d2e] rounded-2xl px-5 py-3 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> products
          </div>
          <div className="flex items-center gap-2">
            {/* Sort - desktop inline */}
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="hidden md:block border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm bg-gray-50 dark:bg-[#141622] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ff165d]/20"
            >
              <option value="-createdAt">Newest</option>
              <option value="price">Price ↑</option>
              <option value="-price">Price ↓</option>
              <option value="-ratings">Top Rated</option>
              <option value="name">A-Z</option>
            </select>
            {/* View mode toggle */}
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-all ${viewMode === "grid" ? "bg-[#ff165d] text-white" : "bg-white dark:bg-[#141622] text-gray-500 dark:text-gray-400 hover:bg-gray-50"}`}
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-all ${viewMode === "list" ? "bg-[#ff165d] text-white" : "bg-white dark:bg-[#141622] text-gray-500 dark:text-gray-400 hover:bg-gray-50"}`}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              {filterContent()}
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            className="md:hidden fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white w-14 h-14 rounded-full shadow-xl shadow-[#ff165d]/25 flex items-center justify-center"
            onClick={() => setFilterOpen(true)}
          >
            <FiFilter size={22} />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff9a00] rounded-full text-xs flex items-center justify-center font-bold">!</span>
            )}
          </button>

          {/* Mobile Filter Drawer */}
          {filterOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-50 dark:bg-[#0f1117] shadow-2xl overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-[#1a1d2e] flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 z-10">
                  <h3 className="font-bold text-lg dark:text-white">Filters</h3>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <FiX size={18} className="dark:text-white" />
                  </button>
                </div>
                <div className="p-5">
                  {filterContent(true)}
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1">
            {loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5" : "space-y-4"}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-[#1a1d2e] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className={`${viewMode === "list" ? "flex" : ""}`}>
                      <div className={`${viewMode === "list" ? "w-40 h-40" : "aspect-square"} bg-gray-100 dark:bg-gray-800 animate-pulse`} />
                      <div className="p-4 space-y-3 flex-1">
                        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-1/2 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiGrid size={32} className="text-gray-300 dark:text-gray-600" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No products found</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-4 text-[#ff165d] font-semibold text-sm hover:underline">
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {products.map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((p) => (
                      <Link
                        key={p._id}
                        href={`/product/${p.slug}`}
                        className="flex bg-white dark:bg-[#1a1d2e] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-[#ff165d]/30 transition-all duration-300 group"
                      >
                        <div className="relative w-40 h-40 flex-shrink-0 bg-gray-50 dark:bg-[#141622]">
                          {p.images?.[0] && (
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                        </div>
                        <div className="p-5 flex flex-col justify-center flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#ff165d] transition-colors line-clamp-1">
                            {p.name}
                          </h3>
                          {p.ratings !== undefined && (
                            <div className="flex items-center gap-1 mt-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <FiStar
                                  key={s}
                                  size={12}
                                  className={s <= (p.ratings || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                                  style={s <= (p.ratings || 0) ? { fill: "#facc15" } : {}}
                                />
                              ))}
                              <span className="text-xs text-gray-400 ml-1">({p.numReviews || 0})</span>
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-lg font-bold text-[#ff165d]">৳{p.price.toLocaleString()}</span>
                            {p.comparePrice > p.price && (
                              <span className="text-sm text-gray-400 line-through">৳{p.comparePrice.toLocaleString()}</span>
                            )}
                          </div>
                          <span className={`text-xs mt-2 ${p.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                            {p.stock > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {page > 1 && (
                      <button
                        onClick={() => setPage(page - 1)}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-[#1a1d2e] shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-medium dark:text-white"
                      >
                        ‹
                      </button>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                      .map((p, i, arr) => (
                        <span key={p} className="flex items-center gap-2">
                          {i > 0 && arr[i - 1] !== p - 1 && (
                            <span className="text-gray-400 dark:text-gray-600">…</span>
                          )}
                          <button
                            onClick={() => setPage(p)}
                            className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                              p === page
                                ? "bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white shadow-lg shadow-[#ff165d]/20"
                                : "bg-white dark:bg-[#1a1d2e] shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 dark:text-white"
                            }`}
                          >
                            {p}
                          </button>
                        </span>
                      ))}
                    {page < totalPages && (
                      <button
                        onClick={() => setPage(page + 1)}
                        className="w-10 h-10 rounded-xl bg-white dark:bg-[#1a1d2e] shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition text-sm font-medium dark:text-white"
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
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117]">
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
