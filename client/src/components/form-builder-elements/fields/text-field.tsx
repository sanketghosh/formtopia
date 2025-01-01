// packages
import { LetterText } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// local modules
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";
import { ElementsType, FormElement, FormElementInstance } from "@/types";

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
import { Switch } from "@/components/ui/switch";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "helper text",
  required: true,
  placeHolder: "Placeholder here.",
};

const PropertiesSchema = z.object({
  label: z.string().min(2).max(100),
  helperText: z.string().max(250),
  required: z.boolean().default(false),
  placeHolder: z.string().max(120),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const TextFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: LetterText,
    label: "Text Item",
  },

  formElementComponent: FormElementComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

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
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, placeHolder, required } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
        placeHolder: placeHolder,
        required: required,
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
          name="label"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label of the field <br /> It will be displayed above the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The placeholder of the field <br /> It will be displayed as the
                placeholder value of input field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The helper of the field <br /> It will be displayed below the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Required</FormLabel>

              <FormControl>
                <div className="flex items-center gap-2">
                  <Switch
                    id="airplane-mode"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="airplane-mode">Toggle to change</Label>
                </div>
              </FormControl>
              <FormDescription>
                The requirement of the field <br /> On enabling this, the field
                will be unavoidable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

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
  const { required, helperText, label, placeHolder } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input placeholder={placeHolder} readOnly />
      {helperText && (
        <p className="text-sm capitalize text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}

/***************************** */

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { required, helperText, label, placeHolder } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input placeholder={placeHolder} />
      {helperText && (
        <p className="text-sm capitalize text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
