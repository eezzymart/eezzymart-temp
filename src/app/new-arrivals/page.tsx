"use client";

import { useEffect, useState, Suspense } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice: number;
  images: string[];
  stock: number;
}

function NewArrivalsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?newArrival=true&limit=20")
      .then((r) => r.json())
      .then((d) => setProducts(d.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">New Arrivals</h1>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <div key={i} className="aspect-[3/4] bg-gray-light rounded-lg animate-pulse" />)}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-dark py-20">No new arrivals yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}

export default function NewArrivalsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8"><div className="animate-pulse h-96 bg-gray-light rounded-lg" /></div>}>
      <NewArrivalsContent />
    </Suspense>
  );
}
