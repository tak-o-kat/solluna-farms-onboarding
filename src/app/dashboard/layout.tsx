import DashboardMenu from "@/components/DashboardMenu";
import DashboardNavBar from "@/components/DashboardNavBar";

// "grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen overflow-hidden">
      <DashboardMenu />
      <div className="flex flex-col w-full">
        <DashboardNavBar />
        {children}
      </div>
    </div>
  );
}
