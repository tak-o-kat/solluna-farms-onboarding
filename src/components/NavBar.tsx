import { ThemeToggle } from "./ThemeToggle";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="flex flex-row justify-start ps-6 items-center h-[4rem] w-full z-0 border-b">
      Solluna Farms
      <nav className="absolute right-0 p-4">
        <div className="flex flex-row justify-end items-center w-full gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
