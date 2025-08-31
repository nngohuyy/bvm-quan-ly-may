"use client"

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_ROUTES = ["/dang-nhap", "/dang-ky"];

export default function ProtectedRoutes({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!loading && !profile && !isPublicRoute) {
      router.push("/dang-nhap");
    }
  }, [loading, profile, pathname, isPublicRoute, router]);

  return <>{children}</>;
}