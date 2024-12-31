import Footer from "@/components/base/Footer";
import Header from "@/components/base/Header";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
