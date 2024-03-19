import NavBar from "@/components/NavBar";
import SideMenu from "@/components/SideMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row min-h-screen overflow-hidden">
      <SideMenu />
      <div className="relative flex flex-col flex-1">
        <NavBar />
        <div className="relative flex flex-row h-full w-full">{children}</div>
      </div>
    </div>
  );
}
