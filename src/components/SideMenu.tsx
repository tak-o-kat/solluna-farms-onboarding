"use client";

import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Logo from "@/components/icons/Logo";
import {
  ChevronLeft,
  ChevronRight,
  LucideLayoutDashboard,
  Wallet2Icon,
  Activity,
  LucideLogOut,
} from "lucide-react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  //const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  const sideBarToggle = () => {
    setOpen(() => !open);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, []);

  return (
    <aside
      className={`${
        open
          ? "relative left-0 sm:left-0 sm:w-72 "
          : "relative -left-[90px] sm:left-0 w-0 sm:w-[90px]"
      } duration-200 z-10 bg-background border-r text-lg`}
    >
      <div
        className={`${open ? "w-64" : "w-0 sm:w-[90px]"} flex flex-col h-full`}
      >
        <div className="h-20 px-5 flex flex-row items-center border-b">
          <div className="flex flex-row justify-center items-center gap-4 ps-1">
            <div className="h-10 w-10 flex justify-center items-center border border-cyan-500 rounded-lg">
              <div className="h-7 w-7 text-cyan-500">
                <Logo />
              </div>
            </div>
            <span className={`${!open && "hidden"}`}>Solluna</span>
          </div>
          <button
            className={`${
              open ? "ml-20 sm:ml-36" : "ml-14"
            } duration-300 h-5 w-5 text-2xl font-semibold`}
            onClick={() => sideBarToggle()}
          >
            {open ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="flex flex-col h-full">
          <ul className="p-3 flex flex-col flex-1 gap-1 mt-3">
            <li
              className={`${
                open ? "justify-start" : "w-16"
              } h-16 flex items-center p-[23px] font-normal hover:text-zinc-800 hover:bg-[hsl(186,61%,94%)] dark:hover:text-zinc-200 dark:hover:bg-[hsl(186,27%,35%)]`}
            >
              <Link className="flex items-center space-x-4" href="#">
                <LucideLayoutDashboard className="h-5 w-5" />
                <span
                  className={`${
                    !open
                      ? "transition-opacity ease-in duration-100 opacity-0"
                      : "transition-opacity ease-in duration-300 opacity-100"
                  } `}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li
              className={`${
                open ? "justify-start" : "w-16"
              } h-16 flex items-center p-[23px] font-normal hover:text-zinc-800 hover:bg-[hsl(186,61%,94%)] dark:hover:text-zinc-200 dark:hover:bg-[hsl(186,27%,35%)]`}
            >
              <Link className="flex items-center space-x-4" href="#">
                <Wallet2Icon className="h-5 w-5 " />
                <span
                  className={`${
                    !open
                      ? "transition-opacity ease-in duration-100 opacity-0"
                      : "transition-opacity ease-in duration-300 opacity-100"
                  } `}
                >
                  Accounts
                </span>
              </Link>
            </li>
            <li
              className={`${
                open ? "justify-start" : "w-16"
              } h-16 flex items-center p-[23px] font-normal hover:text-zinc-800 hover:bg-[hsl(186,61%,94%)] dark:hover:text-zinc-200 dark:hover:bg-[hsl(186,27%,35%)]`}
            >
              <Link className="flex items-center space-x-4" href="#">
                <Activity className="h-5 w-5" />
                <span
                  className={`${
                    !open
                      ? "transition-opacity ease-in duration-100 opacity-0"
                      : "transition-opacity ease-in duration-300 opacity-100"
                  } `}
                >
                  Analytics
                </span>
              </Link>
            </li>
          </ul>
          <ul className="p-3 mb-0 flex flex-col gap-1">
            <li
              className={`${
                open ? "justify-start" : "w-16"
              } h-16 flex items-center p-[23px] hover:text-zinc-800 hover:bg-[hsl(186,61%,94%)] dark:hover:text-zinc-200 dark:hover:bg-[hsl(186,27%,35%)]`}
            >
              <LogoutLink className="flex items-center space-x-4">
                <LucideLogOut className="h-5 w-5" />
                <span
                  className={`${
                    !open
                      ? "transition-opacity ease-in duration-100 opacity-0"
                      : "transition-opacity ease-in duration-300 opacity-100"
                  } `}
                >
                  Logout
                </span>
              </LogoutLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
