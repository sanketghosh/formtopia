// packages
import { HeadingIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// local modules
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "@/types";

// components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const type: ElementsType = "TitleField";

const extraAttributes = {
  title: "Title Field",
};

const PropertiesSchema = z.object({
  title: z.string().max(200),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const TitleFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: HeadingIcon,
    label: "Title Field",
  },

  formElementComponent: FormElementComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

/*************************** */
/**
 *
 */

function FormElementComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <Label className="text-muted-foreground">{title}</Label>
      <p className="font-semibold md:text-lg xl:text-xl">{title}</p>
    </div>
  );
}

/***************************** */

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
}) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return <p className="font-semibold md:text-lg xl:text-xl">{title}</p>;
}

/***
 *
 *
 *
 *
 */

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const { updateElementHandler } = useFormBuilderContext();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(PropertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { title } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        title: title,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The title field <br /> You can enter any important text as title
                in form if needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
