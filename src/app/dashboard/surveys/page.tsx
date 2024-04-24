import Surveys from "@/components/dashboard/surveys/Surveys";

export default async function SurveysPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Surveys />
    </main>
  );
}
