import { ComponentType } from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
} from "@/components/ui/card";

type PropTypes = {
  chunk: string;
  title: string;
  icon: ComponentType<{
    className?: string;
  }>;
  amount: number;
  percentage?: number;
  unit?: string;
};

export default async function CustomCard(props: PropTypes) {
  const dashboardChunk = `dashboard-01-chunk-${props.chunk}`;
  return (
    <Card x-chunk={dashboardChunk}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        <props.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-2xl font-bold">{props.amount}</div>
        <p className="text-xs text-muted-foreground">{`+${props.percentage}% in the last ${props.unit}`}</p>
      </CardContent>
    </Card>
  );
}
