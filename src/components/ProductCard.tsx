"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiEye, FiStar } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

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

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount =
    product.comparePrice > product.price
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100
        )
      : 0;

  const rating = product.ratings || 4.5;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 relative">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Link href={`/product/${product.slug}`}>
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <FiShoppingCart size={40} />
            </div>
          )}
        </Link>

        {/* Badges */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{discount}%
            </span>
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="bg-white text-dark font-bold px-4 py-2 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-10">
          <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#ff165d] hover:text-white transition-colors duration-200 shadow-md">
            <FiHeart size={16} />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#ff165d] hover:text-white transition-colors duration-200 shadow-md"
          >
            <FiEye size={16} />
          </Link>
        </div>

        {/* Add to Cart Button */}
        {product.stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              onClick={() =>
                addToCart({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0] || "",
                  quantity: 1,
                  stock: product.stock,
                })
              }
              className="w-full bg-gradient-to-r from-[#ff165d] to-[#ff4d82] text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ff165d]/30 transition-shadow active:scale-95"
            >
              <FiShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={12}
              className={
                i < Math.floor(rating)
                  ? "text-[#ff9a00] fill-[#ff9a00]"
                  : "text-gray-200"
              }
            />
          ))}
          <span className="text-xs text-gray-400 ml-1">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-2 group-hover:text-[#ff165d] transition-colors leading-snug min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-[#ff165d]">
            ৳{product.price.toLocaleString()}
          </span>
          {product.comparePrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ৳{product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
