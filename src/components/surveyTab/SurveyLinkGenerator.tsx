"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { schema } from "./urlSchema";
import { stat } from "fs";
import { Loader2Icon } from "lucide-react";

type FormSchema = z.infer<typeof schema>;

export const SurveyLinkGenerator = ({
  onFormAction,
}: {
  onFormAction: (
    prevState: {
      message: string;
      data?: z.infer<typeof schema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    data?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      numLinks: 1,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const submitFormRef = () => {
    setIsLoading(!isLoading);
    formRef?.current?.submit();
    setIsLoading(!isLoading);
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => submitFormRef())}
        className="flex flex-row gap-2"
      >
        <FormField
          control={form.control}
          name="numLinks"
          render={({ field }) => (
            <FormItem className="w-24">
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="flex flex-row gap-2"
          variant="outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
          Generate
        </Button>
      </form>
    </Form>
  );
};
