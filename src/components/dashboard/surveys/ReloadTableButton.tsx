"use client";
import { Button } from "@/components/ui/button";
import { ListRestart } from "lucide-react";
import { customRevalidate } from "@/app/actions/surveyTableActions";

const ReloadTableButton = () => {
  return (
    <Button
      variant="outline"
      onClick={() => customRevalidate("/dashboard/surveys")}
    >
      <ListRestart />
    </Button>
  );
};

export default ReloadTableButton;
