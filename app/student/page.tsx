"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [_userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    } else {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `/api/user/details?email=${session.user?.email}`
          );
          const data = await response.json();
          if (data.success) {
            setUserData(data.user);
            if (data.user.role === "student") {
              router.push("/student/dashboard");
            } else if (data.user.role === "admin") {
              router.push("/admin/dashboard");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      Loading...
    </div>
  );
};

export default DashboardPage;
