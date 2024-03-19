import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-screen flex flex-col justify-center items-center text-lg sm:text-xl p-24">
      <div className="flex flex-col justify-center items-center">
        <div className="">Solluna Farms Onboarding</div>
        <div className="p-2">Coming Soon!</div>
        <div className="p-2">
          <ThemeToggle />
        </div>

        <LoginLink>
          <Button>Login</Button>
        </LoginLink>
      </div>
    </main>
  );
}
