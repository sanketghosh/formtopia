// packages
import { Text } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
  paragraph: "Paragraph Field",
};

const PropertiesSchema = z.object({
  paragraph: z.string().max(300),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const ParagraphFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: Text,
    label: "Paragraph Field",
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
  const { paragraph } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <Label className="text-muted-foreground">{paragraph}</Label>
      <p className="">{paragraph}</p>
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
  const { paragraph } = element.extraAttributes;

  return <p className="">{paragraph}</p>;
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
      paragraph: element.extraAttributes.paragraph,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { paragraph } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        paragraph: paragraph,
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
          name="paragraph"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Paragraph</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-transparent"
                  rows={5}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The paragraph field <br /> You can enter any important paragraph
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
