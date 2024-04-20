"use client";
import { useEffect, useState } from "react";
import { setStatusColumnInCookie } from "@/app/actions/surveyTableActions";

import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Home() {
  useEffect(() => {
    async function fetchData() {
      await setStatusColumnInCookie("home");
    }
    if (true) {
      fetchData();
    }
  }, []);

  return (
    <main className="w-screen flex flex-col justify-center items-center text-md sm:text-xl p-24">
      <div className="flex flex-col justify-center items-center">
        <div className="">Solluna Farms</div>
        <div className="">Onboarding!</div>
        <div className="p-3">
          <ThemeToggle />
        </div>
        <LoginLink>
          <Button>Login</Button>
        </LoginLink>
      </div>
    </main>
  );
}
