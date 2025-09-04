import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý máy | Đăng ký",
  description: "Đăng ký vào hệ thống quản lý máy",
};

export default function SignUpLayout({
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