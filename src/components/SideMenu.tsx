"use client";

import Link from "next/link";
import Logo from "@/components/icons/Logo";
import {
  ChevronLeft,
  ChevronRight,
  LucideLayoutDashboard,
  Wallet2Icon,
  Settings2Icon,
  LucideLogOut,
} from "lucide-react";
import { Component, useState } from "react";

export default function SideMenu() {
  const [open, setOpen] = useState(true);

  const sideBarToggle = () => {
    setOpen(() => !open);
  };

  const toggleLinkTitle = (title: string): any => {
    if (open) {
      setTimeout(() => {
        return <span className="">{title}</span>;
      }, 300);
    } else {
    }
  };

  return (
    <aside
      className={`${
        open
          ? "relative left-0 sm:left-0 sm:w-64 "
          : "relative -left-[91px] sm:left-0 w-[90px]"
      } duration-300 z-10 bg-background border-r text-lg sm:min-h-screen`}
    >
      <div
        className={`${open ? "w-64" : "w-0 sm:w-[90px]"} flex flex-col h-full`}
      >
        <div className="h-20 px-5 flex flex-row items-center">
          <div className="flex flex-row justify-start items-center gap-4">
            <div className="h-10 w-10 flex justify-center items-center border border-cyan-500 rounded-lg">
              <div className="h-7 w-7 text-cyan-500">
                <Logo />
              </div>
            </div>
            <span
              className={`${
                !open
                  ? "transition ease-in duration-100 hidden"
                  : "transition ease-in duration-300 visible"
              } `}
            >
              Solluna
            </span>
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
                <Settings2Icon className="h-5 w-5" />
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
          </ul>
          <ul className="p-3 mb-0 flex flex-col gap-1">
            <li
              className={`${
                open ? "justify-start" : "w-16"
              } h-16 flex items-center p-[23px] hover:text-zinc-800 hover:bg-[hsl(186,61%,94%)] dark:hover:text-zinc-200 dark:hover:bg-[hsl(186,27%,35%)]`}
            >
              <Link className="flex items-center space-x-4" href="#">
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
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
