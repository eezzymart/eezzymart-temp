"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      {!isDashboard && <CartDrawer />}
      <main className="min-h-screen">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
