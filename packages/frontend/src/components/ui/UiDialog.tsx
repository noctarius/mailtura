import { JSX, onCleanup, onMount } from "solid-js";
import { LucideProps, X } from "lucide-solid";
import { WizardStep, WizardStepper } from "../interfaces/WizardStepper.js";
import { disableSwipe, enableSwipe } from "../../helpers/swipe-actions.js";

interface UiDialogProps {
  title: () => string;
  titleIcon?: (props: LucideProps) => JSX.Element;
  subTitle?: () => string;
  children: JSX.Element;
  onClose?: () => void;
  actions: JSX.Element;
  widthClass?: string;
  steps?: WizardStep[];
  currentStep?: () => number;
}

export function UiDialog(props: UiDialogProps) {
  const widthClass = () => props.widthClass || "max-w-md";

  onMount(() => {
    disableSwipe();
    onCleanup(() => {
      enableSwipe();
    });
  });

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class={`bg-white rounded-xl w-full max-h-[90vh] flex flex-col overflow-hidden ${widthClass()}`}>
        <div class="flex flex-col items-center p-6 border-b border-gray-200">
          <div class="flex items-center justify-between w-full">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              {props.titleIcon && <props.titleIcon class="w-4 h-4 mr-2" />}
              {props.title()}
            </h2>
            <button
              type="button"
              onClick={props.onClose}
              aria-controls="close-dialog"
              class="dialog-close-btn"
            >
              <X />
              <span class="sr-only">Close menu</span>
            </button>
          </div>
          {props.subTitle && (
            <div class="w-full">
              <p class="text-sm text-gray-600 mt-1">{props.subTitle()}</p>
            </div>
          )}
        </div>

        {props.steps && (
          <WizardStepper
            steps={props.steps}
            currentStep={() => props.currentStep?.() || 0}
          />
        )}

        <div class="flex-1 overflow-auto p-6">{props.children}</div>

        <div class="flex items-center justify-between space-x-3 p-6 border-t border-gray-200 shrink-0">
          {props.actions}
        </div>
      </div>
    </div>
  );
}
