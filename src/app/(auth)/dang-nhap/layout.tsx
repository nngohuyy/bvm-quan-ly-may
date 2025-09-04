import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý máy | Đăng nhập",
  description: "Đăng nhập vào hệ thống quản lý máy",
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-[family-name:var(--font-plus-jakarta-sans)] min-h-dvh">
      {children}
    </div>
  );
}