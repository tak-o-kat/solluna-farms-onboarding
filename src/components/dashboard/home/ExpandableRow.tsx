"use client";

import { Badge } from "@/components/ui/badge";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function ExpandableRow(data: any) {
  console.log(data.survey);
  return (
    <Collapsible className="w-full" key={data.survey.id} asChild>
      <>
        <TableRow key={data.survey.id}>
          <>
            <TableCell>
              <div className="font-medium">{data.survey.url.creatorName}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {data.survey.url.creatorEmail}
              </div>
            </TableCell>
            <TableCell className="capitalize hidden sm:table-cell">
              {data.survey.gender}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {data.survey.age}
            </TableCell>
            <TableCell className="capitalize hidden md:table-cell">
              {data.survey.location}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge className="text-xs" variant="secondary">
                {data.survey.blockchain_course ? "Yes" : "No"}
              </Badge>
            </TableCell>
            <TableCell className="capitalize hidden md:table-cell">
              {data.survey.createdAt.toString().slice(0, 15)}
            </TableCell>
            <CollapsibleTrigger asChild>
              <TableCell className="text-right">
                <Button variant="ghost">Expand</Button>
              </TableCell>
            </CollapsibleTrigger>
          </>
        </TableRow>
        <CollapsibleContent asChild>
          <div className="p-5">Data goes here</div>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
}
