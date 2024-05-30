"use client";

import DashboardMenu from "@/components/dashboard/DashboardMenu";
import DashboardNavBar from "@/components/dashboard/DashboardNavBar";
import { Toaster } from "sonner";
import { useTheme } from "next-themes";

// "grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-row min-h-screen w-full overflow-hidden fixed top-0">
      <Toaster
        theme={theme as "light" | "dark" | "system"}
        expand={false}
        position="top-right"
        closeButton
      />
      <DashboardMenu />
      <div className="flex flex-col w-full">
        <DashboardNavBar />
        {children}
      </div>
    </div>
  );
}
