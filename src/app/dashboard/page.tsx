import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  return (
    <div className="flex flex-col min-h-screen justify-between items-center text-xl p-24">
      <h1 className="">Dashboard</h1>
    </div>
  );
}
