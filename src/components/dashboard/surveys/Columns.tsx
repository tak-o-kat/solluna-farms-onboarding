"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import RowActions from "./RowActions";
import CopiedColumn from "./CopiedColumn";

import { type TableData } from "@/components/dashboard/surveys/Surveys";

export const columns: ColumnDef<TableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center">
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => <div className="">{row.getValue("url")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => {
      const createAt = new Date(row.getValue("createdAt"));
      const [date, time, des] = createAt.toLocaleString().split(" ");

      return (
        <div className="text-right font-medium">{`${
          date.split(",")[0]
        } ${time} ${des}`}</div>
      );
    },
  },
  {
    accessorKey: "isCopied",
    header: () => <div className="flex justify-center ">Clipboard</div>,
    cell: ({ row }) => {
      const tableRow = row.original;
      return (
        <div className="flex justify-center">
          <CopiedColumn data={tableRow} />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const tableRow = row.original;

      return <RowActions data={tableRow} />;
    },
  },
];
