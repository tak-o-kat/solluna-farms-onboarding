"use client";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { HamburgerMenuIcon, ShadowIcon } from "@radix-ui/react-icons";
import {} from "@radix-ui/react-icons";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="h-14">
      <nav className="h-full border-b flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <HamburgerMenuIcon />
          <div className="flex flex-row items-center">
            <ShadowIcon />
            <Link href={"/"} className="ps-1">
              Solluna Farms Onboarding
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <Link href={"/dashboard"}>Dashboard</Link> */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated && <LoginLink>Sign in</LoginLink>}
            {isAuthenticated && <LogoutLink className="">Sign out</LogoutLink>}
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
