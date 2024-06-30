"use client";

import { useState } from "react";
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

import { ChevronUpIcon, ChevronDownIcon, Copy, CopyCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExpandableRow(data: any) {
  const [collapsibleState, setCollapsibleState] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // console.log(data.survey);
  const getAccountData = () => {
    let account;
    if (data.survey.blockchain_course) {
      account = `${data.survey.account.slice(
        0,
        4
      )}...${data.survey.account.slice(-4)}`;
    } else {
      account = "--";
    }
    return account;
  };

  return (
    <Collapsible className="w-full" key={data.survey.id} asChild>
      <>
        <TableRow key={data.survey.id}>
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
          <TableCell className="capitalize hidden lg:table-cell">
            {data.survey.location}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            <Badge className="text-xs" variant="secondary">
              {data.survey.blockchain_course ? "Yes" : "No"}
            </Badge>
          </TableCell>
          <TableCell className="capitalize hidden lg:table-cell">
            {data.survey.fungi_exp}
          </TableCell>
          <TableCell className="capitalize">
            {new Date(data.survey.createdAt).toLocaleString().slice(0, 9)}
          </TableCell>
          <CollapsibleTrigger asChild>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                onClick={() => setCollapsibleState(!collapsibleState)}
              >
                {collapsibleState ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </Button>
            </TableCell>
          </CollapsibleTrigger>
        </TableRow>
        <TableRow>
          <TableCell className="p-0" colSpan={8}>
            <CollapsibleContent className="flex p-5 w-full min-w-full" asChild>
              <div className="flex flex-col w-full gap-2 sm:gap-4">
                <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:hidden">
                  <div className="sm:hidden flex flex-col">
                    <span className="font-semibold">Gender:</span>
                    <span className="capitalize">{data.survey.gender}</span>
                  </div>
                  <div className="sm:hidden flex flex-col">
                    <span className="font-semibold">Age:</span>
                    <span className="capitalize">{data.survey.age}</span>
                  </div>
                  <div className="sm:hidden flex flex-col">
                    <span className="font-semibold">Location:</span>
                    <span className="capitalize">{data.survey.location}</span>
                  </div>
                  <div className="flex flex-col sm:hidden">
                    <span className="font-semibold">Fungi Experience:</span>
                    <span className="capitalize">{data.survey.fungi_exp}</span>
                  </div>
                  <div className="flex flex-col sm:hidden">
                    <span className="font-semibold">Blockchain Course:</span>
                    <span className="capitalize">
                      {data.survey.blockchain_course ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 items-center justify-between sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                  <div className="sm:flex sm:flex-col lg:hidden hidden">
                    <span className="font-semibold">Location:</span>
                    <span className="capitalize">{data.survey.location}</span>
                  </div>
                  <div className="sm:flex sm:flex-col lg:hidden hidden">
                    <span className="font-semibold">Fungi Experience:</span>
                    <span className="capitalize">{data.survey.fungi_exp}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">Account:</span>
                    <span className="capitalize flex flex-row">
                      {`${getAccountData()}`}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(data.survey.account);
                          setIsCopied(true);
                        }}
                        className="ml-3 h-3 w-3"
                      >
                        {isCopied ? (
                          <CopyCheck className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </span>
                  </div>
                  <div
                    className={`${
                      data.survey.hasNFD ? "flex flex-col" : "hidden"
                    }`}
                  >
                    <span className="font-semibold">NFD:</span>
                    <span className="capitalize">
                      {data.survey?.nfd || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">Computer Experience:</span>
                    <span className="capitalize">
                      {data.survey?.comp_exp || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      Blockchain Experience:
                    </span>
                    <span className="capitalize">
                      {data.survey?.blockchain_exp || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">NFT Experience:</span>
                    <span className="capitalize">
                      {data.survey?.nft_exp || "--"}
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </TableCell>
        </TableRow>
      </>
    </Collapsible>
  );
}
