export const metadata = { title: "Shipping Policy - EezzyMart" };

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
      <div className="prose max-w-none text-gray-dark leading-relaxed space-y-6">
        <p className="text-sm text-gray-dark">Last updated: January 1, 2026</p>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Shipping Methods</h2>
          <p>EezzyMart offers standard and express shipping options. Standard shipping typically takes 5-7 business days, while express shipping delivers within 2-3 business days. Delivery times may vary based on your location and product availability.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Free Shipping</h2>
          <p>We offer free standard shipping on all orders over $50. Orders under $50 will incur a flat-rate shipping fee of $5. Free shipping applies to standard delivery only; express shipping charges apply regardless of order value.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Order Processing</h2>
          <p>Orders are processed within 1-2 business days after payment confirmation. You will receive a confirmation email with tracking information once your order has been shipped. Orders placed on weekends or holidays will be processed on the next business day.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. International Shipping</h2>
          <p>We ship to select international destinations. International orders may be subject to customs duties, import taxes, and fees, which are the responsibility of the buyer. Delivery times for international orders typically range from 10-21 business days.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">5. Tracking Your Order</h2>
          <p>Once your order is shipped, you will receive a tracking number via email. You can also track your order on our website using the Order Tracking page. Enter your order number to get real-time updates on your delivery status.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">6. Delivery Issues</h2>
          <p>If your package is lost, damaged during transit, or significantly delayed, please contact our customer service team immediately. We will work with the shipping carrier to resolve the issue and ensure you receive your order or a full refund.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">7. Contact Us</h2>
          <p>For shipping inquiries, contact us at support@eezzymart.com or call +1 (234) 567-890.</p>
        </section>
      </div>
    </div>
  );
}
