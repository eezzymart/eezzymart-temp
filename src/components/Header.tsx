"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FiShoppingCart, FiSearch, FiMenu, FiX, FiChevronDown,
  FiUser, FiPhone, FiMapPin, FiChevronRight, FiSun, FiMoon
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  parent: string | null;
}

interface SearchResult {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
}

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Ajax search with debounce
  const doSearch = useCallback((term: string) => {
    if (term.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    setSearchLoading(true);
    fetch(`/api/products?search=${encodeURIComponent(term.trim())}&limit=6`)
      .then((r) => r.json())
      .then((d) => {
        setSearchResults(d.products || []);
        setShowResults(true);
      })
      .catch(() => setSearchResults([]))
      .finally(() => setSearchLoading(false));
  }, []);

  const handleSearchInput = (value: string) => {
    setSearchTerm(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => doSearch(value), 300);
  };

  const parentCategories = categories.filter((c) => !c.parent);
  const getChildren = (parentId: string) => categories.filter((c) => c.parent === parentId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(false);
      window.location.href = `/shop?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0a0f1c] via-[#1a1040] to-[#0a0f1c] text-white/80 text-xs overflow-hidden">
        <div className="container mx-auto px-4 flex justify-between items-center h-9">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FiPhone size={12} className="text-[#ff165d]" />
              +880 1234-567890
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FiMapPin size={12} className="text-[#ff9a00]" />
              Mohakhali DOHS, Dhaka
            </span>
          </div>
          <div className="flex items-center gap-1 mx-auto sm:mx-0 whitespace-nowrap">
            <span className="text-[#ff9a00] font-medium">🔥</span>
            <span>Free shipping on orders over <strong className="text-white">৳5,000</strong></span>
            <span className="mx-3 text-white/20">|</span>
            <span>✨ New arrivals every week</span>
            <span className="mx-3 text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline">🎁 Exclusive deals for members</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/order-tracking" className="hover:text-white transition-colors flex items-center gap-1">
              <FiMapPin size={11} /> Track Order
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">Help</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white dark:bg-[#1a1d2e] border-b border-gray dark:border-[#2d3148] transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-6">
          <button
            className="lg:hidden text-2xl text-foreground hover:text-primary transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link href="/" className="flex-shrink-0">
            <Image
              src={isDark ? "/Vector-white.png" : "/logo-color-trimmed.png"}
              alt="EezzyMart"
              width={200}
              height={56}
              className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-14"}`}
              priority
            />
          </Link>

          {/* Search Bar with Ajax Results */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
                  className="w-full border-2 border-gray hover:border-[#ff165d]/30 rounded-full py-2.5 px-6 pr-14 focus:outline-none focus:border-[#ff165d] focus:shadow-[0_0_0_3px_rgba(255,22,93,0.1)] bg-gray-light/50 focus:bg-white transition-all text-sm placeholder:text-gray-dark/60"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] hover:from-[#e01050] hover:to-[#ff165d] text-white w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm hover:shadow-md hover:shadow-[#ff165d]/20"
                >
                  <FiSearch size={16} />
                </button>
              </div>
            </form>

            {/* Ajax Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2d3148] overflow-hidden z-50 animate-fade-in">
                {searchLoading ? (
                  <div className="p-6 text-center">
                    <div className="w-6 h-6 border-2 border-[#ff165d] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-gray-400 mt-2">Searching...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <Link
                        key={product._id}
                        href={`/product/${product.slug}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-[#252840] transition border-b border-gray-50 dark:border-[#2d3148] last:border-0"
                        onClick={() => setShowResults(false)}
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.images?.[0] && (
                            <Image src={product.images[0]} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{product.name}</p>
                          <p className="text-sm font-bold text-[#ff165d]">৳{product.price.toLocaleString()}</p>
                        </div>
                        <FiChevronRight size={14} className="text-gray-400 flex-shrink-0" />
                      </Link>
                    ))}
                    <Link
                      href={`/shop?search=${encodeURIComponent(searchTerm)}`}
                      className="block text-center py-3 text-sm font-semibold text-[#ff165d] hover:bg-[#ff165d]/5 transition"
                      onClick={() => setShowResults(false)}
                    >
                      View all results →
                    </Link>
                  </>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-sm text-gray-400">No products found for &quot;{searchTerm}&quot;</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-light dark:hover:bg-[#252840] transition"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={18} className="text-[#ff9a00]" /> : <FiMoon size={18} className="text-gray-dark" />}
            </button>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-light transition"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </button>
            <Link href="/dashboard/login" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-light dark:hover:bg-[#252840] transition text-sm text-gray-dark">
              <FiUser size={18} />
              <span className="hidden lg:inline">Account</span>
            </Link>
            <button onClick={openDrawer} className="relative flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-light dark:hover:bg-[#252840] transition group">
              <div className="relative">
                <FiShoppingCart size={20} className="text-foreground group-hover:text-[#ff165d] transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 shadow-lg shadow-[#ff165d]/30 animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm text-gray-dark group-hover:text-[#ff165d] transition-colors">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a1d2e] border-b border-gray dark:border-[#2d3148] px-4 py-3 animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => handleSearchInput(e.target.value)}
              className="w-full border-2 border-gray rounded-full py-2.5 px-5 pr-12 focus:outline-none focus:border-primary text-sm" autoFocus />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">
              <FiSearch size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-[#ff165d] to-[#ff9a00] text-white hidden lg:block">
        <div className="container mx-auto px-4 flex items-center">
          <div className="relative" ref={megaMenuRef}>
            <button
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3.5 font-semibold text-sm hover:bg-white/30 transition-all"
            >
              <FiMenu size={16} />
              All Categories
              <FiChevronDown size={14} className={`transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {megaMenuOpen && (
              <div className="absolute top-full left-0 bg-white dark:bg-[#1a1d2e] text-foreground rounded-b-xl shadow-2xl min-w-[300px] z-50 border border-gray/50 dark:border-[#2d3148] animate-fade-in overflow-hidden">
                {parentCategories.length > 0 ? (
                  parentCategories.map((cat) => {
                    const children = getChildren(cat._id);
                    return (
                      <div key={cat._id} className="group/cat relative">
                        <Link
                          href={`/shop?category=${cat.slug}`}
                          className="flex items-center gap-3 px-5 py-3.5 hover:bg-primary/5 hover:text-primary transition border-b border-gray/30 dark:border-[#2d3148] last:border-0"
                          onClick={() => setMegaMenuOpen(false)}
                        >
                          {cat.image ? (
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-light flex-shrink-0">
                              <Image src={cat.image} alt={cat.name} width={36} height={36} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0" />
                          )}
                          <span className="flex-1 text-sm font-medium">{cat.name}</span>
                          {children.length > 0 && <FiChevronRight size={14} className="text-gray-dark group-hover/cat:text-primary" />}
                        </Link>
                        {children.length > 0 && (
                          <div className="hidden group-hover/cat:block absolute left-full top-0 bg-white dark:bg-[#1a1d2e] shadow-2xl rounded-r-xl min-w-[240px] border border-gray/50 dark:border-[#2d3148] overflow-hidden">
                            <div className="px-5 py-3 bg-gray-light/80 dark:bg-[#252840] border-b border-gray/30 dark:border-[#2d3148]">
                              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{cat.name}</span>
                            </div>
                            {children.map((child) => (
                              <Link key={child._id} href={`/shop?category=${child.slug}`} className="block px-5 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition border-b border-gray/20 dark:border-[#2d3148] last:border-0" onClick={() => setMegaMenuOpen(false)}>
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="px-5 py-8 text-center text-gray-dark text-sm">No categories yet</div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 ml-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`relative px-4 py-3.5 text-sm transition-all duration-300 hover:bg-white/10 rounded-t-lg ${
                  pathname === link.href ? "text-white font-bold bg-white/10" : "text-white/90 font-semibold hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-4 text-sm">
            <Link href="/order-tracking" className="text-white/90 hover:text-white transition flex items-center gap-1.5" style={{ fontWeight: 600 }}>
              <FiMapPin size={14} /> Track Order
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 z-[60] animate-fade-in">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-[#1a1d2e] shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-gray dark:border-[#2d3148] bg-gray-light dark:bg-[#141622]">
              <Image src={isDark ? "/Vector-white.png" : "/logo-color-trimmed.png"} alt="EezzyMart" width={140} height={36} className="h-8 w-auto" />
              <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray transition"><FiX size={20} /></button>
            </div>
            <div className="p-4 bg-gradient-to-r from-primary to-primary-dark text-white">
              <Link href="/dashboard/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FiUser size={18} /></div>
                <div>
                  <p className="font-medium text-sm">Welcome!</p>
                  <p className="text-xs text-white/70">Login to your account</p>
                </div>
              </Link>
            </div>
            <div className="py-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`flex items-center justify-between px-5 py-3 text-sm font-medium border-b border-gray/30 dark:border-[#2d3148] transition ${
                    pathname === link.href ? "text-primary bg-primary/5" : "hover:text-primary hover:bg-gray-light dark:hover:bg-[#252840]"
                  }`} onClick={() => setMenuOpen(false)}>
                  {link.label}
                  <FiChevronRight size={14} className="text-gray-dark" />
                </Link>
              ))}
              <Link href="/order-tracking" className="flex items-center justify-between px-5 py-3 text-sm font-medium border-b border-gray/30 dark:border-[#2d3148] hover:text-primary hover:bg-gray-light dark:hover:bg-[#252840] transition" onClick={() => setMenuOpen(false)}>
                Track Order <FiChevronRight size={14} className="text-gray-dark" />
              </Link>
            </div>
            {/* Theme Toggle in Mobile Menu */}
            <div className="px-5 py-4 border-b border-gray/30 dark:border-[#2d3148]">
              <button onClick={toggleTheme} className="flex items-center gap-3 w-full text-sm font-medium">
                {isDark ? <FiSun size={18} className="text-[#ff9a00]" /> : <FiMoon size={18} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
            {parentCategories.length > 0 && (
              <div className="px-5 py-4">
                <p className="text-xs font-bold text-gray-dark uppercase tracking-wider mb-3">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {parentCategories.map((cat) => (
                    <Link key={cat._id} href={`/shop?category=${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-light dark:bg-[#252840] hover:bg-primary/10 hover:text-primary transition text-sm"
                      onClick={() => setMenuOpen(false)}>
                      {cat.image && <Image src={cat.image} alt={cat.name} width={24} height={24} className="w-6 h-6 rounded object-cover" />}
                      <span className="truncate">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
