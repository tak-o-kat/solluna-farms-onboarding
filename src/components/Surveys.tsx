import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SurveyLinkTable } from "@/components/surveyTab/SurveyLinkTable";

export default function Surveys() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex sm:text-lg pb-3">Survey</div>
      <Tabs
        defaultValue="table"
        className="flex flex-col flex-1 justify-center items-center h-full w-full space-y-4"
      >
        <TabsList className="grid grid-cols-2 w-full sm:w-[400px]">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="generator">Generator</TabsTrigger>
        </TabsList>
        <div className="flex flex-col flex-1 w-full items-center rounded-lg border shadow-sm">
          <TabsContent value="table" className="flex w-full p-3 sm:p-10">
            <SurveyLinkTable />
          </TabsContent>
          <TabsContent value="generator">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no survey links
              </h3>
              <p className="text-sm text-muted-foreground">
                You can begin sending out links as soon as you generate.
              </p>
              <Button className="mt-4">Generate Link</Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      {/* <h1 className="text-lg font-semibold md:text-2xl">Survey Generator</h1> */}
    </div>
  );
}
