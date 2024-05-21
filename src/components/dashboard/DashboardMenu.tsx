import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Home, LineChart, FileCog, Wallet, LogOut } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import Logo from "@/components/icons/Logo";

export default function DashboardMenu() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block w-80">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6">
              <Logo />
            </div>
            <span className="ml-2">Solluna Farms</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-md font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`${
                pathname === "/dashboard" && "bg-muted text-primary"
              } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/accounts"
              className={`${
                pathname === "/dashboard/accounts" && "bg-muted text-primary"
              } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              <Wallet className="h-4 w-4" />
              Accounts
            </Link>
            <Link
              href="/dashboard/surveys"
              className={`${
                pathname === "/dashboard/surveys" &&
                "bg-muted text-primary hover:text-primary"
              } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              <FileCog className="h-4 w-4" />
              Surveys{" "}
              {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                4
              </Badge> */}
            </Link>
            <Link
              href="/dashboard/analytics"
              className={`${
                pathname === "/dashboard/analytics" && "bg-muted text-primary"
              } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        <div className="mt-auto mb-5">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <LogOut className="h-4 w-4" />
              <LogoutLink>Logout</LogoutLink>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
