"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { z } from "zod";

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

type FormSchema = z.infer<typeof schema>;

export const SurveyLinkGenerator = ({
  onFormAction,
}: {
  onFormAction: (
    prevState: {
      status?: number;
      message?: string;
      numLinks?: number;
      data?: z.infer<typeof schema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    status?: number;
    message?: string;
    numLinks?: number;
    data?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}) => {
  const [state, formAction] = useFormState(onFormAction, {});
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      numLinks: 1,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 200) {
      toast(`Generated ${state?.numLinks} Urls`, {
        description: "Url's located in Survey table!",
      });
    } else if (state.status === 400) {
      toast(`${state?.message}`, {
        description: `${state?.issues}`,
      });
    }
  }, [state]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(e) => {
          form.handleSubmit(() => {
            formRef?.current?.submit();
          });
          e.stopPropagation();
        }}
        className="flex flex-row gap-2"
      >
        <FormField
          control={form.control}
          name="numLinks"
          render={({ field }) => (
            <FormItem className="w-24">
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="flex flex-row gap-2 w-32"
          variant="outline"
          type="submit"
          disabled={form.formState.isSubmitted}
        >
          {form.formState.isSubmitted && (
            <Loader2Icon className="h-4 w-4 animate-spin" />
          )}
          {form.formState.isSubmitted ? "Generating" : "Generate"}
        </Button>
      </form>
    </Form>
  );
};
