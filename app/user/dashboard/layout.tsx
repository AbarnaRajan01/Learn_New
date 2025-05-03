import Sidebar from "@/app/Components/sidebar";

import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white ">
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
