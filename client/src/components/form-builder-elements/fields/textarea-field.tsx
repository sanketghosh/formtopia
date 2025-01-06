// packages
import { LetterText, ScanIcon } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "TextareaField";

const extraAttributes = {
  label: "Textarea Field",
  helperText: "helper text",
  required: true,
  placeHolder: "Placeholder here.",
  rows: 3,
};

const PropertiesSchema = z.object({
  label: z.string().min(2).max(100),
  helperText: z.string().max(250),
  required: z.boolean().default(false),
  placeHolder: z.string().max(120),
  rows: z.number().min(3).max(10),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const TextareaFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: ScanIcon,
    label: "Textarea Item",
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
  const { required, helperText, label, placeHolder, rows } =
    element.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-3">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Textarea
        placeholder={placeHolder}
        readOnly
        rows={rows}
        className="bg-transparent"
      />
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
  const { required, helperText, label, placeHolder, rows } =
    element.extraAttributes;
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
      <Textarea
        placeholder={placeHolder}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onBlur={(e) => {
          if (!submitValue) return;

          const valid = TextareaFieldFormElement.validate(
            element,
            e.target.value,
          );
          setError(!valid);
          if (!valid) return;

          submitValue(element.id, e.target.value);
        }}
        rows={rows}
        className={cn(error && "bg-transparent ring-destructive")}
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
      rows: element.extraAttributes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, rows } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
        placeHolder: placeHolder,
        required: required,
        rows: rows,
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
          name="rows"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Number of rows: {form.watch("rows")}</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={3}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                The requirement of the field <br /> On enabling this, the field
                will be unavoidable.
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
