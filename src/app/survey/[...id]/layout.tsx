"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";
import NavBar from "@/components/NavBar";

export default function SurveyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <NavBar />
      <div className="relative h-[calc(100vh-5rem)] flex flex-col items-center justify-center w-full overflow-hidden dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <Toaster
          theme={theme as "light" | "dark" | "system"}
          expand={false}
          position="top-right"
          closeButton
        />

        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)] sm:[mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        <div className="flex flex-col items-center min-h-screen w-full overflow-hidden mt-[5rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
