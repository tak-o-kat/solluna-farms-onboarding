"use client";

import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Settings } from "./Settings";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="flex flex-row h-20 w-full z-0 border-b">
      <nav className="fixed right-0 p-4">
        <div className="flex flex-row justify-end items-center w-full gap-2">
          <ThemeToggle />
          <Settings />
        </div>
      </nav>
    </div>
  );
}
