import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/auth-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "ModelMarket - Виртуальные модели для маркетплейсов",
  description: "Создавайте виртуальные модели для вашего бизнеса на любых маркетплейсах",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-gray-50 antialiased text-gray-900">
        <AuthProvider>
          <Header />
          <main className="flex-grow w-full mx-auto">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
