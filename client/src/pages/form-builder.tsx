// packages
import { CircleCheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Confetti from "react-confetti";

// local modules
import { fetchSingleFormAction } from "@/actions/form.actions";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { useSingleFormData } from "@/hooks/use-single-form-data";
import { useFormBuilderContext } from "@/hooks/use-form-builder-context";

// components
import { Skeleton } from "@/components/ui/skeleton";
import FormBuilderNav from "@/components/form-builder-elements/form-builder-nav";
import FormBuilderSidebar from "@/components/form-builder-elements/form-builder-sidebar";
import DragOverlayWrapper from "@/components/form-builder-elements/drag-overlay-wrapper";
import FormBuilderPad from "@/components/form-builder-elements/form-builder-pad";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";

export default function FormBuilder() {
  const { setFormId, setFormData, formData } = useSingleFormData();
  const { setElements } = useFormBuilderContext();

  const { id } = useParams<{ id?: string }>();
  // console.log(id);

  useEffect(() => {
    try {
      const elements = JSON.parse(formData?.content!);
      setElements(elements);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  }, [formData, setElements]);

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["fetch-single-form"],
    queryFn: () => fetchSingleFormAction(id!),
    staleTime: 5000,
  });

  // console.log("fetch single form data", data.data);

  useEffect(() => {
    if (data && id) {
      console.log("Fetched Data:", data); // Log fetched data
      setFormData(data.data);
      setFormId(id);
    }
  }, [data, id, setFormData, setFormId]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  if (formData?.published) {
    return <IsFormPublished shareURL={formData?.shareURL} />;
  }

  return (
    <DndContext sensors={sensors}>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col">
          {isError ? (
            <p className="text-sm font-medium text-destructive">
              {error.message}
            </p>
          ) : (
            <>
              {isLoading ? (
                <div className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar p-4">
                  <Skeleton className="h-full w-40" />
                  <Skeleton className="h-full w-40" />
                </div>
              ) : (
                <>
                  <FormBuilderNav />
                  {/* main builder */}
                  <div className="bg-chequered-size flex h-full justify-center bg-chequered p-4 md:p-6 lg:p-8">
                    <FormBuilderPad />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <FormBuilderSidebar />
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}

function IsFormPublished({ shareURL }: { shareURL?: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const { confetti, confettiOff, confettiOn } = useConfetti();

  const fullUrlToShare = `http://${window.location.host}/submit/${shareURL}`;
  const urlCopyHandler = async () => {
    await copyToClipboard(fullUrlToShare);
    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    // confettiOn();
    setInterval(() => {
      confettiOff();
    }, 6000);
  }, [confettiOff]);

  /*   const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Form Link",
          text: "Check out this form!",
          url: fullUrlToShare,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  }; */

  return (
    <div className="flex h-full w-full items-center justify-center bg-sidebar p-4">
      {confetti && <Confetti className="h-full w-full" />}
      <Card className="lg:w-[500px]">
        <CardHeader>
          <CardTitle className="text-xl">Form Published</CardTitle>
          <CardDescription>
            Your form has been published, you cannot edit the form anymore.{" "}
            <br /> Users can access the form through the link given below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Input
            value={fullUrlToShare}
            readOnly
            className="text-[13px] font-medium"
          />
          <Button size={"icon"} variant={"default"} onClick={urlCopyHandler}>
            {isCopied ? <CircleCheckIcon /> : <CopyIcon />}
          </Button>
        </CardContent>
        <CardFooter className="text-sm font-medium leading-tight">
          {/*  <Button className="w-full" onClick={handleNativeShare}>
            Share Form
          </Button> */}
          Share this link with user so that they can fill and submit the form.
        </CardFooter>
      </Card>
    </div>
  );
}
