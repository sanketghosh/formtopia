import { useState } from "react";
import { Button } from "../ui/button";

type Step = {
  label: string;
};
const steps: Step[] = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
];

export default function PublishFormStepper() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handlePrev = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <div>{steps[activeStep].label}</div>
      <div>
        {activeStep > 0 && (
          <Button variant="outline" onClick={handlePrev}>
            Previous
          </Button>
        )}
        {activeStep === 0 && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
  );
}
