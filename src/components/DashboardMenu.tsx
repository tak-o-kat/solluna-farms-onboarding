import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Link2,
  Package2,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardMenu() {
  return (
    <div className="hidden border-r bg-muted/40 md:block w-80">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Solluna Farms</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Accounts
            </Link>
            <Link
              href="#"
              className={`${"bg-muted text-primary"} flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary`}
            >
              <Link2 className="h-4 w-4" />
              Surveys{" "}
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                4
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Analytics
            </Link>
          </nav>
        </div>
        <div className="mt-auto mb-5">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
