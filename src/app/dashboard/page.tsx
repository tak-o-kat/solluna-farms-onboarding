import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import TotalsPage from "./@totals/page";
import CompletedSurveysPage from "./@surveys/page";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  async function getTotals() {
    const data = await prisma.totals.findMany({});
    const totalData = data.map((d) => {
      return [d.type, d.total];
    });
    return Object.fromEntries(totalData || []);
  }

  const { isAuthenticated } = getKindeServerSession();
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    redirect("/api/auth/login");
  }

  const page = Number(searchParams?.page) || 1;
  const totals = await getTotals();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 max-h-[calc(100vh-60px)] overflow-y-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <TotalsPage totals={totals} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CompletedSurveysPage
          surveyTotals={totals.surveys_completed}
          page={page}
        />
      </Suspense>
    </main>
  );
}
