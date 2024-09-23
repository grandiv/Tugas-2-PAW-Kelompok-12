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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("authToken");
      if (!token) {
        router.push("/login");
      } else {
        try {
          const response = await fetch("http://localhost:5000/api/user/verify-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            Cookies.remove("authToken");
            router.push("/login");
          }
        } catch (error) {
          console.error("Error during token validation", error);
          router.push("/login");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
