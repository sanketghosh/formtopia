// packages
import { LetterText, ListFilterIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "helper text",
  required: true,
  placeHolder: "Placeholder here.",
  options: [],
};

const PropertiesSchema = z.object({
  label: z.string().min(2).max(100),
  helperText: z.string().max(250),
  required: z.boolean().default(false),
  placeHolder: z.string().max(120),
  options: z.array(z.string()).default([]),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const SelectFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: ListFilterIcon,
    label: "Select Field",
  },

  formElementComponent: FormElementComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string,
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
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
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue || "");
  const element = elementInstance as CustomInstance;
  const { required, helperText, label, placeHolder } = element.extraAttributes;
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  /* function onChangeValueHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  } */

  return (
    <div className="flex w-full flex-col gap-3">
      <Label className={cn(error && "text-destructive")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onBlur={(e) => {
          if (!submitValue) return;

          const valid = SelectFieldFormElement.validate(
            element,
            e.target.value,
          );
          setError(!valid);
          if (!valid) return;

          submitValue(element.id, e.target.value);
        }}
        className={cn(error && "ring-destructive")}
      />
      {helperText && (
        <p
          className={cn(
            "text-sm capitalize text-muted-foreground",
            error && "text-destructive",
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

/****
 *
 *
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
