"use client";

import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PropTypes = {
  totalPages: number;
  currentPage: number;
};
export default function SurveyPagination(props: PropTypes) {
  let startRange = props.currentPage >= 2 ? props.currentPage - 1 : 1;
  startRange =
    props.currentPage === props.totalPages && props.currentPage > 2
      ? props.currentPage - 2
      : startRange;

  const displayPages = props.totalPages <= 3 ? props.totalPages : 3;
  const displayRange = [startRange, startRange + displayPages - 1];
  const endRange = props.totalPages - 1;

  const prevPage = props.currentPage === 1 ? 1 : props.currentPage - 1;
  const nextPage =
    props.currentPage === props.totalPages
      ? props.totalPages
      : props.currentPage + 1;

  return (
    <div className="flex flex-col">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/dashboard?page=${prevPage}`} />
          </PaginationItem>
          {new Array(props.totalPages).fill(0).map(
            (_, index) =>
              index + 1 >= displayRange[0] &&
              index + 1 <= displayRange[1] && (
                <PaginationItem key={index}>
                  <PaginationLink
                    href={`/dashboard?page=${index + 1}`}
                    isActive={props.currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
          )}
          {props.totalPages > displayPages && props.currentPage < endRange && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {props.totalPages > displayPages && props.currentPage < endRange && (
            <PaginationItem>
              <PaginationLink
                href={`/dashboard?page=${props.totalPages}`}
                isActive={props.currentPage === props.totalPages}
              >
                {props.totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext href={`/dashboard?page=${nextPage}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
