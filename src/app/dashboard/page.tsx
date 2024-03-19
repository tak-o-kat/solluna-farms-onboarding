import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return (
    <div className="flex flex-col w-full justify-center items-center text-xl">
      <h1 className="flex flex-col h-full p-5">Dashboard</h1>
    </div>
  );
}
