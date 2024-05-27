"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { z, type ZodIssue } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { schema } from "../../../utils/zod/urlGeneratorSchema";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { insertUrlAction } from "@/app/actions/surveyTableActions";

type FormSchema = z.infer<typeof schema>;

export const SurveyLinkGenerator = () => {
  const { user } = useKindeBrowserClient();
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState({
    statusCode: 0,
    message: "",
    issues: [] as ZodIssue[],
    prevData: {} as any,
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      numLinks: 1,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: FormSchema) => {
    if (user) {
      const kindeUser = {
        id: user?.id,
        name: `${user?.given_name} ${user?.family_name}`,
        email: user?.email as string,
      };
      startTransition(async () => {
        const resp = await insertUrlAction(data, kindeUser);
        if (resp.statusCode === 200) {
          toast(`Generated ${state?.prevData.numLinks} Urls`, {
            description: "Url's located in Survey table!",
          });
        } else if (state.statusCode === 400) {
          toast(`${state?.message}`, {
            description: `${state?.issues}`,
          });
        }
      });
    } else {
      router.push("/api/auth/signin");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-2 w-full"
      >
        <FormField
          control={form.control}
          name="numLinks"
          render={({ field }) => (
            <FormItem className="w-20">
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="flex flex-row gap-2 w-full sm:w-36"
          disabled={isPending}
        >
          {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
          {isPending ? "Generating" : "Generate"}
        </Button>
      </form>
    </Form>
  );
};
