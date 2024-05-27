import Link from "next/link";
import CustomCard from "@/components/dashboard/home/CustomCards";
import CompletedSurveysTable from "@/components/dashboard/home/CompletedSurveysTable";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
  LinkIcon,
  FilePen,
  WalletMinimal,
  ArrowUpRightIcon,
} from "lucide-react";

export default async function DashboardPage() {
  async function getTotals() {
    const data = await prisma.totals.findMany({});
    const totals = data.map((d) => {
      return [d.type, d.total];
    });
    return Object.fromEntries(totals || []);
  }

  const totals = await getTotals();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CustomCard
          chunk="0"
          title="Urls Generated"
          icon={LinkIcon}
          amount={totals?.urls_created || 0}
          percentage={100}
          unit="month"
        />
        <CustomCard
          chunk="0"
          title="Urls Sent"
          icon={LinkIcon}
          amount={totals?.urls_sent || 0}
          percentage={100}
          unit="month"
        />
        <CustomCard
          chunk="1"
          title="Surveys Completed"
          icon={FilePen}
          amount={totals?.surveys_completed || 0}
          percentage={100}
          unit="month"
        />
        <CustomCard
          chunk="2"
          title="Total Accounts Tracked"
          icon={WalletMinimal}
          amount={totals?.accounts_tracked || 0}
          percentage={100}
          unit="month"
        />
      </div>
      <div>
        <CompletedSurveysTable
          surveyTotals={totals?.surveys_completed as number}
        />
      </div>
    </main>
  );
}
