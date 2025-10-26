import { CircleCheckBig } from "lucide-solid";

export interface WizardStep {
  label: string;
  id: string;
}

interface WizardStepperProps {
  steps: WizardStep[];
  currentStep: () => number;
}

export function WizardStepper(props: WizardStepperProps) {
  return (
    <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
      <div class="flex justify-between space-x-4 w-full">
        {props.steps.map((step, index) => (
          <div
            id={step.id}
            class="flex flex-col columns-1 items-center"
          >
            <div
              class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                props.currentStep() === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {props.currentStep() > index + 1 ? <CircleCheckBig class="w-4 h-4" /> : index + 1}
            </div>
            <div>{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
