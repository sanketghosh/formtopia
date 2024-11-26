// packages
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// local modules
import { StartFormCreationSchema } from "@/schemas";
import { createFormAction } from "@/actions/form.actions";

// components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StartFormCreation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof StartFormCreationSchema>>({
    resolver: zodResolver(StartFormCreationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: createFormAction,
    onSuccess: async (data) => {
      toast.success(data.message);
      await queryClient.invalidateQueries({
        queryKey: ["fetch-forms"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["fetch-forms-nav-projects"],
      });
      navigate(`/create-form/${data?.data.formId}`);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  const formSubmitHandler = (
    values: z.infer<typeof StartFormCreationSchema>,
  ) => {
    // console.log(values);
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmitHandler)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="This is the title of the form you are gonna create."
                    type="text"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="This is just a short little description we need"
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-4 w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Start Creation"
          )}
        </Button>
      </form>
    </Form>
  );
}
