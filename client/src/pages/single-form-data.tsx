import { useSingleFormData } from "@/hooks/use-single-form-data";
import { useEffect } from "react";

export default function SingleFormData() {
  const { formData, formId } = useSingleFormData();

  useEffect(() => {
    console.log("Form Data:", formData); // Log to confirm store data
    console.log("Form ID:", formId);
  }, [formData, formId]);

  const visits = formData?.visitsCount || 0;
  const submissions = formData?.submissionsCount || 0;
  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return (
    <div>
      <h2>{visits}</h2>
      <h2>{submissions}</h2>
      <h2>{submissionRate}</h2>
      <h2>{bounceRate}</h2>
      <h2>{formData?.id || formId}</h2>
      <h2>{formData?.title}</h2>
    </div>
  );
}
