"use server";

import { prisma } from "@/lib/prisma";
import React from "react";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import SurveyPagination from "@/components/dashboard/home/SurveyPagination";
import ExpandableRow from "@/components/dashboard/home/ExpandableRow";

type PropTypes = {
  surveyTotals: number;
  page: number;
};

export default async function CompletedSurveysPage(props: PropTypes) {
  async function getSurveys(skip: number | undefined) {
    return await prisma.survey.findMany({
      skip: skip || 0,
      take: 10,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        url: {
          include: {
            urlStatus: true,
          },
        },
      },
    });
  }
  const currentPage = props.page;
  const multiplier = currentPage - 1;
  const surveys = await getSurveys(multiplier * 10);
  const totalPages = Math.ceil(props.surveyTotals / 10);
  const showing = `${1 + (currentPage - 1) * 10}-${
    10 + (currentPage - 1) * 10
  }`;

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Completed Surveys</CardTitle>
        <CardDescription>
          All surveys that have been completed by our clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Creator</TableHead>
              <TableHead className="hidden sm:table-cell">Gender</TableHead>
              <TableHead className="hidden sm:table-cell">Age</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Blockchain</TableHead>
              <TableHead className="hidden lg:table-cell">Fungi Exp</TableHead>
              <TableHead className="">
                Date <span className="sm:inline hidden">Submitted</span>
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveys.map((survey) => (
              <ExpandableRow key={survey.id} survey={survey} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">
          Showing <strong>{`${showing}`}</strong> of{" "}
          <strong>{props.surveyTotals}</strong> surveys
          {"\n              "}
        </div>
        <SurveyPagination totalPages={totalPages} currentPage={currentPage} />
      </CardFooter>
    </Card>
  );
}
