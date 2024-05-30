import CustomCard from "@/components/dashboard/home/CustomCards";
import { LinkIcon, FilePen, WalletMinimal } from "lucide-react";

type PropTypes = {
  totals: {
    urls_created: number;
    urls_sent: number;
    surveys_completed: number;
    accounts_tracked: number;
  };
};

export default async function TotalsPage(props: PropTypes) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <CustomCard
        chunk="0"
        title="Urls Generated"
        icon={LinkIcon}
        amount={props.totals?.urls_created || 0}
        percentage={100}
        unit="month"
      />
      <CustomCard
        chunk="0"
        title="Urls Sent"
        icon={LinkIcon}
        amount={props.totals?.urls_sent || 0}
        percentage={100}
        unit="month"
      />
      <CustomCard
        chunk="1"
        title="Surveys Completed"
        icon={FilePen}
        amount={props.totals?.surveys_completed || 0}
        percentage={100}
        unit="month"
      />
      <CustomCard
        chunk="2"
        title="Total Accounts Tracked"
        icon={WalletMinimal}
        amount={props.totals?.accounts_tracked || 0}
        percentage={100}
        unit="month"
      />
    </div>
  );
}
