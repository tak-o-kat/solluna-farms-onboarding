"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function DynamicBreadCrumb({ pathname }: { pathname: string }) {
  const typeOfPath = pathname.includes("/dashboard/");
  const path = typeOfPath
    ? pathname.replace("/dashboard/", "")
    : pathname.replace("/dashboard", "");
  return (
    <>
      {path === "" ? (
        <></>
      ) : (
        <>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{path}</BreadcrumbPage>
          </BreadcrumbItem>
        </>
      )}
    </>
  );
}
