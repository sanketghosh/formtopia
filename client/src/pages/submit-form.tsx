import { fetchFormByShareUrlAction } from "@/actions/form.actions";
import { FormElements } from "@/components/form-builder-elements/form-builder-elements";
import SingleElementBaseStyle from "@/components/form-builder-elements/single-element-base-style";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FormElementInstance } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function SubmitForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-single-form-content", id],
    queryFn: () => fetchFormByShareUrlAction(id!),
    staleTime: 5000,
  });

  if (data?.data.published === false) {
    return (
      <main className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Oops! Form is not published yet.</CardTitle>
            <CardDescription>
              You need to publish your form after saving to view it here and
              submit.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Link
              to={"/dashboard"}
              className={cn(
                "w-full",
                buttonVariants({
                  variant: "secondary",
                  size: "sm",
                }),
              )}
            >
              <ArrowLeftIcon />
              Go Back To Dashboard
            </Link>
            <Link
              to={`/create-form/${data?.data.formId}`}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: "sm",
                }),
                "w-full",
              )}
            >
              Go To Editor
              <ArrowRightIcon />
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-1">
          <Loader2Icon />
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center overflow-y-auto bg-sidebar/30 p-4 md:p-6 lg:p-8">
      <div className="max-h-[650px] min-h-full w-full space-y-6 overflow-y-auto rounded-lg bg-sidebar px-4 py-6 shadow-lg sm:w-[550px] md:w-[600px]">
        <FormSubmitComponent
          content={data?.data.content}
          shareUrl={data?.data.shareURL}
          description={data?.data.description}
          title={data?.data.title}
        />
      </div>
    </main>
  );
}

type FormSubmitComponentProps = {
  shareUrl: string;
  content: string;
  description: string;
  title: string;
};

function FormSubmitComponent({
  content,
  shareUrl,
  description,
  title,
}: FormSubmitComponentProps) {
  let parsedContent: FormElementInstance[] = [];

  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    console.error("Failed to parse content:", error);
    toast.error("ERROR! Failed to parse, check console for details");
  }

  const formValues = useRef<{ [key: string]: string }>({});

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const mutation = useMutation({});

  function formSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    console.log(formValues.current);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold md:text-xl">{title}</h2>
        <p className="text-sm font-medium text-muted-foreground">
          {description}
        </p>
      </div>
      <form onSubmit={formSubmitHandler}>
        <div className="space-y-3">
          {parsedContent.map((element) => {
            const FormElement = FormElements[element.type]?.formComponent;

            if (!FormElement) {
              console.warn(`No form component found for type: ${element.type}`);
              toast.error(`No form component found for type: ${element.type}`);
              return null;
            }

            return (
              <SingleElementBaseStyle key={element.id}>
                <FormElement
                  elementInstance={element}
                  submitValue={submitValue}
                />
              </SingleElementBaseStyle>
            );
          })}
        </div>
        <Button className="mt-4 w-full">Submit</Button>
      </form>
    </div>
  );
}
