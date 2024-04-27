"use client";

import { useFormState } from "react-dom";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { onFormSurveyAction } from "@/app/actions/surveySubmitActions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { schema } from "@/utils/zod/surveyFormSchema";
import SurveyTitle from "./SurveyTitle";
import SuccessfullySubmittedSurvey from "./SuccessfullySubmitted";

type FormSchema = z.infer<typeof schema>;

export const SurveyForm = ({ id }: { id: string }) => {
  const [isCollapsed, setIsCollaped] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(onFormSurveyAction, {
    message: "",
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: id,
      age: 18,
      gender: "male",
      fungi_exp: "none",
      location: "oregon",
      blockchain_course: undefined,
      address: "",
      comp_exp: "none",
      blockchain_exp: "none",
      nft_exp: "none",
    },
  });

  // Ref used to submit to server action
  const formRef = useRef<HTMLFormElement>(null);

  // The following is only used when server side validation has rcvd an error!
  const getServerErrors = () => {
    return (
      <div className="text-destructive mt-2">
        <div>{state.message}</div>
        {state?.issues?.map((val, i) => (
          <li key={val.path[0]}>{`${val?.path[0]}: ${val?.message}`}</li>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // needed in order to bypass the course conditional in defaultValutes
    form.setValue("blockchain_course", "false");

    if (state.status !== undefined) {
      setIsSubmitting(false);
    }
  }, [form, state.status]);

  return (
    <div className="relative min-h-full pb-8">
      <SurveyTitle />
      <Form {...form}>
        {state.status === 403 && (
          <div className="text-destructive mt-2">{state.message}</div>
        )}
        {state.status === 400 && getServerErrors()}
        <form
          ref={formRef}
          action={formAction}
          onSubmit={(e) => {
            e.stopPropagation();
            form.handleSubmit(() => {
              setIsSubmitting(true);
              formRef?.current?.submit();
            });
          }}
          className="space-y-8"
        >
          <div>{form.formState.isSubmitted}</div>
          <div
            className={`${!isSubmitting && "invisible"} ${
              isCollapsed ? "h-[26rem]" : "h-[52rem]"
            } absolute inset-x-auto z-10 flex justify-center items-center  max-w-3xl w-full opacity-0 bg-black`}
          ></div>
          <div className="flex flex-row w-full gap-2">
            <div className="w-full">
              <input type="hidden" value={id} name="id" />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your age</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="number"
                        placeholder="Enter age..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <input type="hidden" {...field} />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col w-full gap-2 sm:space-y-0 space-y-5">
            <div className="sm:w-full">
              <FormField
                control={form.control}
                name="fungi_exp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your experience with fungi</FormLabel>
                    <input type="hidden" {...field} />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your level..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:w-full">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course location</FormLabel>
                    <input type="hidden" {...field} />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your course location..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oregon">Oregon</SelectItem>
                        <SelectItem value="florida">Florida</SelectItem>
                        <SelectItem value="california">California</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="blockchain_course"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Will you be taking our Algorand course?</FormLabel>
                <FormControl>
                  <RadioGroup
                    {...field}
                    disabled={false}
                    onValueChange={() => {
                      setIsCollaped(!isCollapsed);
                      field.onChange(isCollapsed ? "true" : "false");
                    }}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isCollapsed && (
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Algorand Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex sm:flex-row flex-col w-full gap-2 sm:space-y-0 space-y-5">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="comp_exp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What is your experience with computers?
                        </FormLabel>
                        <input type="hidden" {...field} />
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="blockchain_exp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What is your experience with blockchains?
                        </FormLabel>
                        <input type="hidden" {...field} />
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your level..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="nft_exp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your experience with NFTs?</FormLabel>
                    <input type="hidden" {...field} />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your level..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button
            disabled={isSubmitting}
            className="flex flex-row gap-2 w-full sm:w-36"
          >
            {isSubmitting && <Loader2Icon className="h-5 w-5 animate-spin" />}
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
