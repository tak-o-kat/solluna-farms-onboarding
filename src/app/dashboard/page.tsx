import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return (
    <div className="relative top-[5rem] -left-[90px] sm:left-0 flex flex-col h-full w-full text-xl">
      <h1 className="">Dashboard</h1>
    </div>
  );
}
