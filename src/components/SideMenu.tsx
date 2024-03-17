import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

export default function SideMenu() {
  return (
    <div className="fixed inset-y-0 left-0 z-50 flex flex-col w-80 min-h-[calc(100vh-64px)] bg-background border-r">
      <button className="self-start p-3">
        <ChevronLeftIcon className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </button>
      <nav className="flex-1 flex flex-col items-start justify-between p-4 text-sm">
        <div className="flex flex-col gap-2 w-full">
          <Link
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
            href="#"
          >
            <DashboardIcon className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
            href="#"
          >
            <BookOpenIcon className="h-5 w-5" />
            Docs
          </Link>
          <Link
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
            href="#"
          >
            <TerminalIcon className="h-5 w-5" />
            Console
          </Link>
        </div>
        <div className="flex flex-col gap-2 w-full mt-2">
          <Link
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
            href="#"
          >
            <UserCircleIcon className="h-5 w-5" />
            Profile
          </Link>
          <Link
            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
            href="#"
          >
            <CogIcon className="h-5 w-5" />
            Settings
          </Link>
        </div>
      </nav>
      <div className="border-t w-full p-4">
        <Button className="w-full justify-start" variant="outline">
          <LogOutIcon className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CogIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function TerminalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

function UserCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}
