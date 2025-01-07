// packages
import { SquareCheckBigIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// local modules
import { cn } from "@/lib/utils";
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
import { Checkbox } from "@/components/ui/checkbox";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Checkbox Field",
  helperText: "helper text",
  required: true,
};

const PropertiesSchema = z.object({
  label: z.string().min(2).max(100),
  helperText: z.string().max(250),
  required: z.boolean().default(false),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const CheckboxFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: SquareCheckBigIcon,
    label: "Checkbox Item",
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
      return currentValue === "true";
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
  const { required, helperText, label } = element.extraAttributes;

  const id = `checkbox-${element.id}`;

  return (
    <div className="flex w-full items-center gap-3">
      <Checkbox className="size-5 accent-foreground" id={id} />
      <div>
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <p className="text-sm capitalize text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
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
  const [value, setValue] = useState<boolean>(
    defaultValue === "true" ? true : false,
  );
  const [error, setError] = useState(false);
  const element = elementInstance as CustomInstance;
  const { required, helperText, label } = element.extraAttributes;

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  /* function onChangeValueHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  } */

  const id = `checkbox-${element.id}`;

  return (
    <div className="flex w-full items-center gap-3">
      <Checkbox
        id={id}
        checked={value}
        className={cn(
          "size-5 accent-foreground",
          error && "border-destructive",
        )}
        onCheckedChange={(checked) => {
          let value = false;
          if (checked === true) value = true;
          setValue(value);
          if (!submitValue) return;
          const stringValue = value ? "true" : "false";
          const valid = CheckboxFieldFormElement.validate(element, stringValue);
          setError(!valid);
          submitValue(element.id, stringValue);
        }}
      />
      <div>
        <Label htmlFor={id} className={cn(error && "text-destructive")}>
          {label}
          {required && "*"}
        </Label>
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
    </div>
  );
}

//************* */
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
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, required } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
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
