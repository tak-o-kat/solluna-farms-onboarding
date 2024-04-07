"use client";

import { useFormState } from "react-dom";
import { useRef } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { schema } from "../../../utils/zod/surveyFormSchema";

type FormSchema = z.infer<typeof schema>;

export const SurveyForm = ({
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
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: undefined,
      address: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  https: return (
    <Form {...form}>
      <div>{state?.message}</div>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Algorand Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
