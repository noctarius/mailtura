import { JSX } from "solid-js";
import { LucideProps, X } from "lucide-solid";

interface UiDialogProps {
  title: () => string;
  titleIcon?: (props: LucideProps) => JSX.Element;
  children: JSX.Element;
  onClose?: () => void;
  actions: JSX.Element;
}

export function UiDialog(props: UiDialogProps) {
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200 shrink-0">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            {props.titleIcon && <props.titleIcon class="w-4 h-4 mr-2" />}
            {props.title()}
          </h3>
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

        <div class="flex-1 overflow-auto p-6">{props.children}</div>

        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 shrink-0">{props.actions}</div>
      </div>
    </div>
  );
}
