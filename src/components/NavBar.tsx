import Image from "next/image";

import { ThemeToggle } from "./ThemeToggle";

export default function NavBar() {
  return (
    <div className="flex flex-row justify-center h-[5rem] w-full border-b">
      <nav className="flex flex-row items-center max-w-5xl w-full px-3">
        <div className="flex flex-row gap-3 justify-start items-center w-full">
          <Image
            src={"/favicon.svg"}
            alt={"Solluna Farms Logo"}
            width="10"
            height="10"
            className="h-10 w-10"
          />
          <span className="text-lg">Solluna Farms</span>
        </div>

        <div className="flex justify-end w-full">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
