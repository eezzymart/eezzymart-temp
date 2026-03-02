"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <FiCheckCircle className="mx-auto text-green-500 mb-4" size={70} />
      <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
      <p className="text-gray-dark mb-2">Thank you for your purchase</p>
      {orderNumber && (
        <p className="text-lg mb-6">
          Your order number: <span className="font-bold text-primary">{orderNumber}</span>
        </p>
      )}
      <div className="flex gap-4 justify-center">
        <Link href="/shop" className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition">
          Continue Shopping
        </Link>
        <Link href={`/order-tracking?orderNumber=${orderNumber || ""}`} className="border border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition">
          Track Order
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center"><div className="animate-pulse h-40 bg-gray-light rounded-lg max-w-md mx-auto" /></div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
