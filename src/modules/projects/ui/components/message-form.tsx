import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaAutosize from "react-textarea-autosize";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { Form, FormField } from "@/components/ui/form";
import z from "zod";
import { toast } from "sonner";

interface Props {
  projectId: string;
}

const formSchema = z.object({
  value: z
    .string()
    .min(1, {
      message: "Prompt is required",
    })
    .max(10000, {
      message: "Prompt is too long",
    }),
});

const MessageForm = ({ projectId }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const trpc = useTRPC();
  const showUsage = false;

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
    },
  });

  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(
          trpc.messages.getMany.queryOptions({ projectId })
        );
        // ! TODO: invalidate usage status
      },
      onError: (error) => {
        // ! TODO : Redirect to specific page if error
        toast.error(error.message);
      },
    })
  );

  const isPending = createMessage.isPending;
  const isButtonDisabled = isPending || !form.formState.isValid;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createMessage.mutateAsync({
      value: values.value,
      projectId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextAreaAutosize
              {...field}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              minRows={2}
              maxRows={8}
              disabled={isPending}
              className="pt-4 border-none w-full outline-none resize-none bg-transparent"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className="text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="">&#8984;</span>Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            className={cn(
              "size-8 rounded-full",
              isButtonDisabled && "bg-muted-foreground border"
            )}
            disabled={isButtonDisabled}
          >
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <ArrowUpIcon />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MessageForm;
