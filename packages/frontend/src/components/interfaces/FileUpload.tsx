import { Upload } from "lucide-solid";
import { createRef } from "../../hooks/createRef.js";
import { createSignal } from "solid-js";

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024;

type FileEvent = Event & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
};

interface FileUploadProps {
  onFileSelect: (file: File) => Promise<void>;
  dragActive: () => boolean;
  onDragEnter: (event: DragEvent) => void;
  onDragLeave: (event: DragEvent) => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  acceptedFileTypes?: string[];
  maxSizeBytes?: number;
  visible?: () => boolean;
}

export function FileUpload(props: FileUploadProps) {
  const fileInputRef = createRef<HTMLInputElement>();
  const [error, setError] = createSignal<string | undefined>(undefined);

  const validateFileSize = (file: File) => {
    if (file.size > (props.maxSizeBytes || DEFAULT_MAX_FILE_SIZE)) {
      setError("File size exceeds the maximum allowed size.");
      return false;
    }
    return true;
  };

  const handleFileSelect = async (event: FileEvent) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file || !validateFileSize(file)) return;
    await props.onFileSelect(file);
    setError(undefined);
  };

  const visible = () => props.visible ? props.visible() : true;

  return (
    <div
      class={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        props.dragActive() ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      } ${visible() ? "" : "hidden"}`}
      onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
      onDragOver={props.onDragOver}
      onDrop={props.onDrop}
    >
      <Upload class="w-8 h-8 text-gray-400 mx-auto mb-4" />
      <div class="space-y-2">
        <p class="text-sm font-medium text-gray-900">
          Drop your file here, or{" "}
          <button
            onClick={() => fileInputRef.current?.click()}
            class="text-blue-600 hover:text-blue-700 underline"
          >
            browse
          </button>
        </p>
        <p class="text-xs text-gray-600">Supports files up to 10MB</p>
      </div>
      <input
        ref={fileInputRef.current}
        type="file"
        multiple={false}
        accept={props.acceptedFileTypes?.join(",")}
        onChange={handleFileSelect}
        class="hidden"
      />
      {error() && <p class="mt-2 text-sm text-red-600">{error()}</p>}
      {props.dragActive() && (
        <p class="mt-2 text-sm text-gray-600">
          <strong>Note:</strong> Files will be uploaded once you drop them here.
        </p>
      )}
      {props.dragActive() && <p class="mt-2 text-sm text-gray-600"></p>}
    </div>
  );
}
