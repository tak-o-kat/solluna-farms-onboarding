"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoadingSpinner from "./LoadingSpinner";
import { SurveyForm } from "./SurveyForm";

export default function SurveyLoader({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // get the base url to make an api call
    const siteUrl = window.location.href.replace(window.location.pathname, "");
    console.log("Use effect");
    fetch(`${siteUrl}/api/url/completed/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isCompleted) {
          router.push("/survey/errors/completed");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, router]);

  return <>{isLoading ? <LoadingSpinner /> : <SurveyForm id={id} />}</>;
}
