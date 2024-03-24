import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Surveys() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <Tabs
        defaultValue="table"
        className="flex flex-col flex-1 justify-center items-center h-full w-full space-y-4"
      >
        <TabsList className="grid grid-cols-2 w-full sm:w-[400px]">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="generator">Generator</TabsTrigger>
        </TabsList>
        <div className="flex flex-col flex-1 w-full items-center justify-center rounded-lg border shadow-sm">
          <TabsContent value="table">My table here</TabsContent>
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
