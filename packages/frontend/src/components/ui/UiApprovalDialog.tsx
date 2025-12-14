import { UiDialog } from "./UiDialog.js";
import { createSignal, JSX } from "solid-js";

interface UiApprovalDialogProps {
  title: () => string;
  message: () => JSX.Element;
  submitText: () => string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  isPending: () => boolean;
  requiresApproval?: () => boolean;
  approvalText?: () => string;
}

export function UiApprovalDialog(props: UiApprovalDialogProps) {
  const [approval, setApproval] = createSignal("");
  const [error, setError] = createSignal<boolean>(false);

  const requiresApproval = () => (props.requiresApproval ? props.requiresApproval() : true);
  const approvalText = () => (props.approvalText ? props.approvalText() : "yes");

  const handleSubmit = async () => {
    if (requiresApproval()) {
      if (approval() !== approvalText()) {
        setError(true);
        return;
      }
    }
    setApproval("");
    setError(false);
    props.onConfirm();
  };

  const actions = () => {
    return (
      <>
        <button
          onClick={props.onCancel}
          disabled={props.isPending()}
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={props.isPending()}
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {props.submitText()}
        </button>
      </>
    );
  };

  return (
    <UiDialog
      title={props.title}
      actions={actions()}
      onClose={props.onClose}
    >
      <div class="space-y-4">
        <div>{props.message()}</div>
      </div>

      {requiresApproval() && (
        <div class="mt-3 space-y-4">
          <div>
            <label class={`block text-sm font-medium text-gray-700 mb-2 ${error() ? "form-element-has-error" : ""}`}>
              Approval
            </label>
            <input
              type="text"
              value={approval() || ""}
              required
              onChange={e => setApproval(e.target.value)}
              class={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${error() ? "form-element-has-error" : ""}`}
              placeholder="yes"
            />
          </div>
        </div>
      )}
    </UiDialog>
  );
}
