'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State untuk loading
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // Ambil token di dalam useEffect
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false); // Set loading ke false setelah pemeriksaan selesai
  }, [router]);

  if (loading) {
    return null; // Menampilkan loading atau tidak merender apapun
  }

  if (!isAuthenticated) {
    return null; // Jika tidak terautentikasi, jangan merender anak
  }

  return <>{children}</>; // Merender konten halaman jika terautentikasi
}
