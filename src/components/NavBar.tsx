"use client";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="h-20 z-0 w-full fixed top-0 left-0 overflow-hidden">
      <nav className="h-full border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* <div className="flex flex-row items-center">
            <Link href={"/"} className="ps-1">
              Solluna Farms Onboarding
            </Link>
          </div> */}
        </div>
        <div className="flex items-center space-x-4">
          {/* <Link href={"/dashboard"}>Dashboard</Link> */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated && <LoginLink>Sign in</LoginLink>}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
