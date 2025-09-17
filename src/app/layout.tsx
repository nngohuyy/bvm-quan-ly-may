import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import ProtectedRoutes from "@/context/ProtectedRoutes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hệ thống Quản lý máy",
  description: "Hệ thống Quản lý máy - Khoa Chẩn đoán hình ảnh và Thăm dò chức năng nhãn khoa - Bệnh viện Mắt TP.HCM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable}
          antialiased font-[family-name:var(--font-plus-jakarta-sans)]`
        }
      >
        <AuthProvider>
          <ProtectedRoutes>
            {children}
            <Toaster />
          </ProtectedRoutes>
        </AuthProvider>
      </body>
    </html>
  );
}
