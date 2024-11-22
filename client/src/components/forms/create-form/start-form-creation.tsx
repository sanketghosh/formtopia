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
import { StartFormCreationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function StartFormCreation() {
  const form = useForm<z.infer<typeof StartFormCreationSchema>>({
    resolver: zodResolver(StartFormCreationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const mutation = useMutation({});
  const formSubmitHandler = (
    values: z.infer<typeof StartFormCreationSchema>,
  ) => {
    console.log(values);
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
