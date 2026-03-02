"use client";

import { useEffect, useState, use, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2, FiStar, FiChevronRight, FiTruck, FiShield, FiRefreshCw, FiCheck, FiZoomIn } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice: number;
  sku: string;
  stock: number;
  images: string[];
  category: { name: string; slug: string };
  tags: string[];
  ratings: number;
  numReviews: number;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [addedToCart, setAddedToCart] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }, []);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((d) => setProduct(d.error ? null : d))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117]">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-white dark:bg-[#1a1d2e] rounded-2xl animate-pulse" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-white dark:bg-[#1a1d2e] rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-5 bg-white dark:bg-[#1a1d2e] rounded-full w-24 animate-pulse" />
              <div className="h-8 bg-white dark:bg-[#1a1d2e] rounded-lg w-3/4 animate-pulse" />
              <div className="h-10 bg-white dark:bg-[#1a1d2e] rounded-lg w-1/3 animate-pulse" />
              <div className="h-24 bg-white dark:bg-[#1a1d2e] rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingCart size={36} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold mb-3 text-gray-900">Product Not Found</h1>
          <p className="text-gray-500 mb-6">The product you are looking for does not exist.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#ff165d]/20 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const rating = product.ratings || 4.5;

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      quantity,
      stock: product.stock,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f1117]">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#1a1d2e] border-b border-gray-100 dark:border-[#2d3148]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#ff165d] transition-colors">Home</Link>
            <FiChevronRight size={14} />
            <Link href="/shop" className="hover:text-[#ff165d] transition-colors">Shop</Link>
            {product.category && (
              <>
                <FiChevronRight size={14} />
                <Link href={`/shop?category=${product.category.slug}`} className="hover:text-[#ff165d] transition-colors">{product.category.name}</Link>
              </>
            )}
            <FiChevronRight size={14} />
            <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div
              ref={imageContainerRef}
              className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-[#1a1d2e] shadow-sm border border-gray-100 dark:border-[#2d3148] cursor-crosshair group/zoom"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              {product.images?.[selectedImage] ? (
                <>
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Zoom overlay */}
                  {isZooming && (
                    <div
                      className="absolute inset-0 z-10"
                      style={{
                        backgroundImage: `url(${product.images[selectedImage]})`,
                        backgroundSize: "250%",
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  )}
                  {/* Magnifying glass icon hint */}
                  <div className={`absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg transition-opacity duration-300 ${isZooming ? "opacity-0" : "opacity-100"}`}>
                    <FiZoomIn size={20} className="text-gray-600" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <FiShoppingCart size={48} />
                </div>
              )}
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Save {discount}%
                </span>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                      i === selectedImage
                        ? "ring-2 ring-[#ff165d] ring-offset-2 shadow-lg"
                        : "border border-gray-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {product.category && (
              <Link href={`/shop?category=${product.category.slug}`} className="inline-block text-xs text-[#ff165d] font-semibold tracking-wider uppercase bg-[#ff165d]/10 px-3 py-1 rounded-full mb-3 hover:bg-[#ff165d]/20 transition">
                {product.category.name}
              </Link>
            )}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={16}
                    className={i < Math.floor(rating) ? "text-[#ff9a00] fill-[#ff9a00]" : "text-gray-200"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.numReviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-[#2d3148]">
              <span className="text-4xl font-bold bg-gradient-to-r from-[#ff165d] to-[#ff4d82] bg-clip-text text-transparent">
                ৳{product.price.toLocaleString()}
              </span>
              {product.comparePrice > product.price && (
                <span className="text-xl text-gray-400 line-through mb-1">
                  ৳{product.comparePrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#ff9a00]/10 text-[#ff9a00] text-sm font-bold px-3 py-1 rounded-full mb-1">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {product.shortDescription && (
              <p className="text-gray-600 mb-6 leading-relaxed">{product.shortDescription}</p>
            )}

            {/* Stock & SKU */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <span className={`flex items-center gap-1.5 font-semibold ${product.stock > 0 ? "text-emerald-600" : "text-red-500"}`}>
                {product.stock > 0 ? (
                  <><FiCheck size={16} className="bg-emerald-100 rounded-full p-0.5" /> In Stock ({product.stock})</>
                ) : (
                  "Out of Stock"
                )}
              </span>
              {product.sku && (
                <span className="text-gray-400 border-l border-gray-200 pl-4">SKU: {product.sku}</span>
              )}
            </div>

            {/* Add to Cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-gray-100 dark:bg-[#252840] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-gray-200 transition"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-5 py-3 font-bold text-lg min-w-[50px] text-center bg-white dark:bg-[#1a1d2e] dark:text-gray-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 hover:bg-gray-200 transition"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                    addedToCart
                      ? "bg-emerald-500 text-white"
                      : "bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white hover:shadow-xl hover:shadow-[#ff165d]/25 hover:-translate-y-0.5 active:scale-95"
                  }`}
                >
                  {addedToCart ? (
                    <><FiCheck size={20} /> Added!</>
                  ) : (
                    <><FiShoppingCart size={20} /> Add to Cart</>
                  )}
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#ff165d] transition border border-gray-200 dark:border-[#2d3148] px-4 py-2.5 rounded-xl hover:border-[#ff165d]/30">
                <FiHeart size={16} /> Wishlist
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[#ff165d] transition border border-gray-200 dark:border-[#2d3148] px-4 py-2.5 rounded-xl hover:border-[#ff165d]/30">
                <FiShare2 size={16} /> Share
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FiTruck, label: "Free Shipping", desc: "Over ৳5,000", color: "text-blue-500", bg: "bg-gradient-to-br from-blue-50 to-cyan-50", border: "border-blue-100" },
                { icon: FiShield, label: "Secure", desc: "100% Safe", color: "text-emerald-500", bg: "bg-gradient-to-br from-emerald-50 to-teal-50", border: "border-emerald-100" },
                { icon: FiRefreshCw, label: "Returns", desc: "7-Day Easy", color: "text-violet-500", bg: "bg-gradient-to-br from-violet-50 to-purple-50", border: "border-violet-100" },
              ].map((f, i) => (
                <div key={i} className={`${f.bg} rounded-xl p-3 text-center border ${f.border} hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}>
                  <f.icon size={20} className={`${f.color} mx-auto mb-1.5`} />
                  <p className="text-xs font-semibold text-gray-800">{f.label}</p>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 md:mt-16">
          <div className="flex gap-1 border-b border-gray-200 dark:border-[#2d3148] mb-8 overflow-x-auto">
            {[
              { id: "description", label: "Description" },
              { id: "info", label: "Additional Info" },
              { id: "reviews", label: `Reviews (${product.numReviews || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3.5 text-sm font-semibold transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[#ff165d]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ff165d] to-[#ff9a00] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1a1d2e] rounded-2xl p-6 md:p-8 shadow-soft border border-gray-100 dark:border-[#2d3148]">
            {activeTab === "description" && product.description && (
              <div className="text-gray-600 leading-relaxed whitespace-pre-line max-w-4xl">
                {product.description}
              </div>
            )}
            {activeTab === "info" && (
              <div className="space-y-3 max-w-lg">
                {product.sku && (
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-gray-500 font-medium text-sm">SKU</span>
                    <span className="text-gray-800 text-sm">{product.sku}</span>
                  </div>
                )}
                {product.category && (
                  <div className="flex justify-between py-2.5 border-b border-gray-100">
                    <span className="text-gray-500 font-medium text-sm">Category</span>
                    <span className="text-gray-800 text-sm">{product.category.name}</span>
                  </div>
                )}
                <div className="flex justify-between py-2.5 border-b border-gray-100">
                  <span className="text-gray-500 font-medium text-sm">Stock</span>
                  <span className="text-gray-800 text-sm">{product.stock} items</span>
                </div>
                {product.tags?.length > 0 && (
                  <div className="flex justify-between py-2.5 items-start">
                    <span className="text-gray-500 font-medium text-sm">Tags</span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2.5 py-1 rounded-full text-gray-600">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg font-medium mb-2">No reviews yet</p>
                <p className="text-sm">Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
