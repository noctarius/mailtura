import { CircleAlert, Download, FileText, Users } from "lucide-solid";
import { createSignal } from "solid-js";
import { UiDialog } from "../ui/UiDialog.js";
import { useSubscriberLists } from "../../hooks/useSubscriberLists.js";
import { useCsvParser } from "../../hooks/useCsvParser.js";
import { mapHeaders, MatchResult } from "../../helpers/match-headers.js";
import { useTenantId } from "../../hooks/useTenantId.js";
import { useImportContactsMutation } from "../../services/contacts/use-import-contact-mutation.js";
import { FileUpload } from "../interfaces/FileUpload.js";
import { CsvPreview } from "../interfaces/CsvPreview.jsx";
import { WizardStep } from "../interfaces/WizardStepper.js";

interface ImportContactsDialogProps {
  onClose: () => void;
}

interface CsvPreview {
  headers: string[];
  rows: string[][];
}

// Available target fields for mapping
const targetFields = [
  { key: "email", label: "Email Address", required: true },
  { key: "first_name", label: "First Name", required: false },
  { key: "last_name", label: "Last Name", required: false },
];

const steps: WizardStep[] = [
  {
    label: "Select File",
    id: "select-file",
  },
  {
    label: "Map Columns",
    id: "map-columns",
  },
  {
    label: "Select Lists",
    id: "select-lists",
  },
  {
    label: "Confirm Import",
    id: "confirm-import",
  },
];

export function ImportContactsDialog(props: ImportContactsDialogProps) {
  const parser = useCsvParser();
  const tenantId = useTenantId();

  const [currentStep, setCurrentStep] = createSignal(1);
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [csvPreview, setCsvPreview] = createSignal<CsvPreview | null>(null);
  const [estimatedRows, setEstimatedRows] = createSignal<number>(0);
  const [mapping, setMapping] = createSignal<Record<string, string>>({});
  const [selectedLists, setSelectedLists] = createSignal<string[]>([]);
  const [dragActive, setDragActive] = createSignal(false);

  const subscriberLists = useSubscriberLists();
  const importContacts = useImportContactsMutation({ tenantId: tenantId()! });

  const parseCsvFile = async (file: File) => {
    const preview = await parser.parseFile<Record<string, any>>(file);

    const headers = preview.meta.fields || [];
    const rows = preview.data.map(row => {
      return headers.map(header => {
        return row[header] || "";
      });
    });
    setCsvPreview({ headers, rows });

    // Try to auto-map common fields in the CSV
    const autoMapping: Record<string, MatchResult> = mapHeaders(headers, targetFields);

    setMapping(
      Object.keys(autoMapping).reduce((mapping, key) => {
        const targetField = autoMapping[key];
        if (!targetField || !targetField.bestMatch) return mapping;

        return {
          ...mapping,
          [targetField.bestMatch]: targetField.header,
        };
      }, {})
    );
  };

  const handleFileSelect = async (file: File) => {
    try {
      if (file && file.type === "text/csv") {
        if (file.size > 10 * 1024 * 1024) {
          alert("Please select a CSV file smaller than 10MB.");
          return;
        }
        setSelectedFile(file);
        await parseCsvFile(file);
        setEstimatedRows(await parser.countRows(file));
      } else {
        alert("Please select a valid CSV file.");
      }
    } catch (error) {
      console.error("Error parsing CSV file:", error);
      alert("Error parsing CSV file. Please check the file format.");
    }
  };

  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
      await handleFileSelect(event.dataTransfer.files[0]);
    }
  };

  const handleMappingChange = (targetField: string, sourceColumn: string) => {
    setMapping(prev => ({
      ...prev,
      [targetField]: sourceColumn === "none" ? "" : sourceColumn,
    }));
  };

  const handleListToggle = (listId: string) => {
    setSelectedLists(prev => (prev.includes(listId) ? prev.filter(id => id !== listId) : [...prev, listId]));
  };

  const handleNext = () => {
    if (currentStep() < 4) {
      setCurrentStep(currentStep() + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep() > 1) {
      setCurrentStep(currentStep() - 1);
    }
  };

  const handleSubmit = () => {
    const file = selectedFile();
    if (file && csvPreview()) {
      importContacts.mutate({
        file: file,
        parameters: {
          mapping: mapping(),
          listIds: selectedLists(),
        },
      });

      props.onClose();
      // Reset form
      setCurrentStep(1);
      setSelectedFile(null);
      setCsvPreview(null);
      setMapping({});
      setSelectedLists([]);
      setEstimatedRows(0);
    }
  };

  const isStepValid = () => {
    switch (currentStep()) {
      case 1:
        return selectedFile() !== null && csvPreview() !== null;
      case 2:
        return mapping()["email"] !== undefined && mapping()["email"] !== "";
      case 3:
        return selectedLists().length >= 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderFileUpload = () => {
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">Select CSV File</h3>
          <div class="space-y-4">
            {/* File Upload Area */}
            <FileUpload
              visible={() => !selectedFile()}
              maxSizeBytes={10 * 1024 * 1024}
              acceptedFileTypes={["text/csv"]}
              onDrop={handleDrop}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              dragActive={dragActive}
              onFileSelect={handleFileSelect}
            />

            {/* Selected File Info */}
            {selectedFile() !== null && (
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <FileText class="w-5 h-5 text-green-600" />
                  <div>
                    <p class="font-medium text-green-900">{(selectedFile() ?? { name: "" }).name}</p>
                    <p class="text-sm text-green-700">
                      {((selectedFile() ?? { size: 0 }).size / 1024).toFixed(1)} KB • Estimated{" "}
                      {estimatedRows() === 50000 ? "more than 50.000" : estimatedRows()} contacts
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CSV Format Requirements */}
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-medium text-blue-900 mb-2">CSV Format Requirements</h4>
              <ul class="text-sm text-blue-800 space-y-1">
                <li>• First row must contain column headers</li>
                <li>• Email column is required</li>
              </ul>
            </div>

            {/* Sample CSV Download */}
            <div class="text-center">
              <button class="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 mx-auto">
                <Download class="w-4 h-4" />
                <span>Download sample CSV template</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHeaderMapping = () => {
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Map CSV Columns</h3>
          <div class="space-y-6">
            {/* CSV Preview */}
            {csvPreview() && (
              <CsvPreview
                headers={() => csvPreview()?.headers ?? []}
                rows={() => csvPreview()?.rows ?? []}
              />
            )}

            {/* Field Mapping */}
            <div class="space-y-4">
              <h4 class="font-medium text-gray-900">Map columns to contact fields</h4>
              {targetFields.map(field => (
                <div
                  id={`field-${field.key}`}
                  class="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div class={`w-2 h-2 rounded-full ${field.required ? "bg-red-500" : "bg-gray-300"}`} />
                    <div>
                      <label class="font-medium text-gray-900">
                        {field.label}
                        {field.required && <span class="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                  </div>
                  <select
                    value={mapping()[field.key] || "none"}
                    onChange={e => handleMappingChange(field.key, e.target.value)}
                    class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="none">Do not map</option>
                    {(csvPreview() ?? { headers: [] }).headers.map((header, index) => (
                      <option
                        id={`optional-${index}`}
                        value={header}
                      >
                        Column {index + 1} {header && `(${header})`}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Validation Messages */}
            {!mapping()["email"] && (
              <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                <div class="flex items-center space-x-2">
                  <CircleAlert class="w-4 h-4 text-red-600" />
                  <p class="text-sm text-red-800">Email field mapping is required to proceed.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSelectLists = () => {
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Select Subscriber Lists</h3>
          <div class="space-y-6">
            {/* List Selection */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Add contacts to lists</label>
              <div class="space-y-3 overflow-y-auto border border-gray-200 rounded-lg p-2">
                {subscriberLists().map(list => (
                  <div
                    id={list.id}
                    onClick={() => handleListToggle(list.id)}
                    class="flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors full-row-checkbox"
                  >
                    <div class="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`import-list-${list.id}`}
                        checked={selectedLists().includes(list.id)}
                        onChange={() => handleListToggle(list.id)}
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        for={`import-list-${list.id}`}
                        class="flex items-center space-x-2 cursor-pointer"
                      >
                        <Users class="w-4 h-4 text-gray-400" />
                        <span class="font-medium text-gray-900">{list.name}</span>
                      </label>
                    </div>
                    <span class="text-sm text-gray-600">{list.contactCount.toLocaleString()} contacts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    return (
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Import</h3>
          <div class="space-y-6">
            {/* Import Summary */}
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 class="font-medium text-blue-900 mb-3">Import Summary</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-blue-700">File:</span>
                  <span class="ml-2 font-medium text-blue-900">{selectedFile?.name}</span>
                </div>
                <div>
                  <span class="text-blue-700">Estimated contacts:</span>
                  <span class="ml-2 font-medium text-blue-900">{estimatedRows()}</span>
                </div>
                <div>
                  <span class="text-blue-700">Email field:</span>
                  <span class="ml-2 font-medium text-blue-900">
                    {(csvPreview() ?? { headers: [] }).headers[
                      parseInt(mapping()["email"]?.replace("column_", "") || "0")
                    ] || "Column 1"}
                  </span>
                </div>
                <div>
                  <span class="text-blue-700">Additional fields:</span>
                  <span class="ml-2 font-medium text-blue-900">
                    {Object.keys(mapping).filter(key => key !== "email" && mapping()[key]).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Import Process Info */}
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-start space-x-2">
                <CircleAlert class="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 class="font-medium text-yellow-900">Import Process</h4>
                  <ul class="text-sm text-yellow-800 mt-2 space-y-1">
                    <li>• Import will run in the background</li>
                    <li>• You'll receive an email notification when complete</li>
                    <li>• Duplicate emails will be automatically handled</li>
                    <li>• Invalid email addresses will be skipped</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep()) {
      case 1:
        return renderFileUpload();

      case 2:
        return renderHeaderMapping();

      case 3:
        return renderSelectLists();

      case 4:
        return renderConfirmation();

      default:
        return null;
    }
  };

  const actions = () => {
    return (
      <>
        <button
          onClick={handlePrevious}
          disabled={currentStep() === 1}
          class="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div class="flex items-center space-x-3">
          <button
            onClick={props.onClose}
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          {currentStep() < 4 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start Import
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <UiDialog
      title={() => "Import Contacts"}
      subTitle={() => `Step ${currentStep()} of ${steps.length}`}
      actions={actions()}
      onClose={props.onClose}
      widthClass="max-w-4xl"
      currentStep={currentStep}
      steps={steps}
    >
      <div class="p-6 overflow-y-auto max-h-96">{renderStepContent()}</div>
    </UiDialog>
  );
}
