// packages
import { HeadingIcon, MinusIcon, SpaceIcon } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20,
};

const PropertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

type PropertiesFormSchemaType = z.infer<typeof PropertiesSchema>;

export const SpacerFieldFormElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),

  designerButton: {
    icon: MinusIcon,
    label: "Spacer Field",
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
  const { height } = element.extraAttributes;

  return (
    <div className="flex w-full flex-col items-center">
      <Label className="text-muted-foreground">Field Spacing: {height}px</Label>
      <SpaceIcon className="size-12" />
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
  const { height } = element.extraAttributes;

  return (
    <div
      style={{
        height: height,
        width: "100%",
      }}
    ></div>
  );
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
      height: element.extraAttributes.height,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { height } = values;

    updateElementHandler(element.id, {
      ...element,
      extraAttributes: {
        height: height,
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
          name="height"
          render={({ field }) => (
            <FormItem className="rounded-md border p-3 shadow-md">
              <FormLabel>Height in pixel: {form.watch("height")}px</FormLabel>
              <FormControl>
                <Slider
                  defaultValue={[field.value]}
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                  }}
                />
              </FormControl>
              <FormDescription>
                The height field <br /> Drag the slider and set the space you
                want between field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
