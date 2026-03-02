export const metadata = { title: "FAQ - EezzyMart" };

const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply browse our products, add items to your cart, and proceed to checkout. Fill in your shipping details and choose your payment method. You'll receive an order confirmation email once your order is placed.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We currently accept Cash on Delivery (COD). We are working on adding more payment options including credit/debit cards and mobile banking.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 5-7 business days. Express shipping delivers within 2-3 business days. Delivery times may vary based on your location.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! We offer free standard shipping on all orders over $50. Orders under $50 incur a flat-rate shipping fee of $5.",
  },
  {
    q: "How do I track my order?",
    a: "You can track your order using the Order Tracking page on our website. Enter your order number to get real-time updates on your delivery status.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be in original condition and packaging. Contact our support team to initiate a return.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can reach us via email at support@eezzymart.com, call us at +1 (234) 567-890, or use the contact form on our website. Our team is available Monday to Friday, 9AM to 6PM.",
  },
  {
    q: "Can I cancel my order?",
    a: "You can cancel your order before it has been shipped. Please contact our support team as soon as possible with your order number to request cancellation.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to select international destinations. International orders may be subject to customs duties and additional fees.",
  },
  {
    q: "Are the products genuine?",
    a: "Absolutely! We source all our products from authorized distributors and manufacturers. Every product on EezzyMart is 100% authentic and comes with the manufacturer's warranty where applicable.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2 text-center">Frequently Asked Questions</h1>
      <p className="text-gray-dark text-center mb-10">Find answers to the most common questions</p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group border border-gray rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold hover:bg-gray-light transition">
              <span>{faq.q}</span>
              <span className="text-primary text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-5 pb-5 text-gray-dark text-sm leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
