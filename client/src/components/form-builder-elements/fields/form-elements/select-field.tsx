// packages
import { ChevronDownIcon, PlusIcon, XIcon } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const type: ElementsType = "SelectField";

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
    icon: ChevronDownIcon,
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

      <Select>
        <SelectTrigger>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
      </Select>
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
  const { required, helperText, label, placeHolder, options } =
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
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn(error && "border-destructive")}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, idx) => (
            <SelectItem key={option + idx} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
/************************************** */
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
  const { updateElementHandler, setSelectedElement } = useFormBuilderContext();
  const element = elementInstance as CustomInstance;
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(PropertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      options: element.extraAttributes.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, options } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        label: label,
        helperText: helperText,
        placeHolder: placeHolder,
        required: required,
        options: options,
      },
    });

    toast.success("Saved successfully");
    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form
        // onBlur={form.handleSubmit(applyChanges)}
        onSubmit={form.handleSubmit(applyChanges)}
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
        <Separator />
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
        <Separator />
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
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <div className="flex items-center justify-between">
                <FormLabel>Options</FormLabel>
                <Button
                  type="button"
                  className="gap-2"
                  variant={"outline"}
                  size={"sm"}
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("Option"));
                  }}
                >
                  <PlusIcon />
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((optionInput, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder=""
                        value={optionInput}
                        onChange={(e) => {
                          field.value[index] = e.target.value;
                          field.onChange(field.value);
                        }}
                      />
                      <Button
                        type="button"
                        size={"icon"}
                        variant={"secondary"}
                        onClick={(e) => {
                          e.preventDefault();
                          const newOptions = [...field.value];
                          newOptions.splice(index, 1);
                          field.onChange(newOptions);
                        }}
                      >
                        <XIcon />
                      </Button>
                    </div>
                  );
                })}
              </div>

              <FormDescription>
                The helper of the field <br /> It will be displayed below the
                field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
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
        <Separator />
        <div className="space-y-2">
          <Button className="w-full" type="submit">
            Save
          </Button>
          <p className="text-sm font-medium text-muted-foreground">
            *Save to see changes in form preview.
          </p>
        </div>
      </form>
    </Form>
  );
}
