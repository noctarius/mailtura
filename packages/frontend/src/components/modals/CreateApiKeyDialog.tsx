import { createSignal } from "solid-js";
import { Permission, PERMISSIONS } from "@mailtura/rpcmodel/auth/index.js";

export type CreateApiKeyPayload = {
  name: string;
  permissions: string[];
  expiresAt?: string;
};

interface CreateApiKeyDialogProps {
  onClose: () => void;
  onCreate: (payload: CreateApiKeyPayload) => Promise<void>;
  isPending: () => boolean;
}

const formatPermission = (permission: string) => {
  return permission
    .replace(/::/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
};

const normalizeDateTimeLocal = (value: string): string | undefined => {
  if (!value) return undefined;
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return undefined;
  return dt.toISOString();
};

const errorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  return fallback;
};

const CreateApiKeyDialog = (props: CreateApiKeyDialogProps) => {
  const [keyData, setKeyData] = createSignal({
    name: "",
    permissions: [] as Permission[],
    expiresAt: "",
  });

  const [formError, setFormError] = createSignal<string | undefined>(undefined);

  const handlePermissionToggle = (permission: Permission) => {
    setKeyData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async () => {
    setFormError(undefined);

    if (!keyData().name.trim()) {
      setFormError("Name is required.");
      return;
    }

    if (keyData().permissions.length === 0) {
      setFormError("Select at least one permission.");
      return;
    }

    const expiresAt = normalizeDateTimeLocal(keyData().expiresAt);
    if (keyData().expiresAt && !expiresAt) {
      setFormError("Expiration date is invalid.");
      return;
    }

    try {
      await props.onCreate({
        name: keyData().name.trim(),
        permissions: keyData().permissions,
        ...(expiresAt ? { expiresAt } : {}),
      });
      setKeyData({ name: "", permissions: [], expiresAt: "" });
      props.onClose();
    } catch (err) {
      setFormError(errorMessage(err, "Failed to create API key."));
    }
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Create API Key</h3>
            <p class="text-sm text-gray-600 mt-1">Generate a new API key with specific permissions</p>
          </div>
          <button
            onClick={props.onClose}
            class="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-96">
          <div class="space-y-6">
            {formError() && <div class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{formError()}</div>}

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">API Key Name *</label>
              <input
                type="text"
                value={keyData().name}
                onInput={e => setKeyData(prev => ({ ...prev, name: e.currentTarget.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Production API Key"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Permissions *</label>
              <div class="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                {PERMISSIONS.map(permission => (
                  <div class="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id={`perm-${permission}`}
                      checked={keyData().permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div class="flex-1">
                      <label
                        for={`perm-${permission}`}
                        class="text-sm font-medium text-gray-900 cursor-pointer"
                      >
                        {formatPermission(permission)}
                      </label>
                      <p class="text-xs text-gray-600 mt-1">{permission}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Expiration Date (Optional)</label>
              <input
                type="datetime-local"
                value={keyData().expiresAt}
                onInput={e => setKeyData(prev => ({ ...prev, expiresAt: e.currentTarget.value }))}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p class="text-xs text-gray-500 mt-1">Leave empty for no expiration</p>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={props.onClose}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
            disabled={props.isPending()}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={props.isPending() || !keyData().name || keyData().permissions.length === 0}
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {props.isPending() ? "Creating..." : "Create API Key"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateApiKeyDialog;
