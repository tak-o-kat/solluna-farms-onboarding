"use client";

import NavBar from "@/components/NavBar";

export default function SurveyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen h-full flex flex-col items-center min-w-screen dark:bg-background dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
      <NavBar />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>
      <div className="flex flex-col items-center h-full w-full px-4">
        {children}
      </div>
    </div>
  );
}
