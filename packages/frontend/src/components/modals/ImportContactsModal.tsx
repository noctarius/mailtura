import { CircleAlert, Download, FileText, Upload, Users } from "lucide-solid";
import { createSignal } from "solid-js";
import { createRef } from "../../hooks/createRef.js";
import { UiDialog } from "../ui/UiDialog.js";
import { useSubscriberLists } from "../../hooks/useSubscriberLists.js";
import { useCsvParser } from "../../hooks/useCsvParser.js";
import { mapHeaders, MatchResult } from "../../helpers/match-headers.js";

interface ImportContactsModalProps {
  onClose: () => void;
  onImportContacts: (importData: ImportData) => void;
}

interface ImportData {
  file: File;
  mapping: Record<string, string>;
  selectedLists: string[];
  skipFirstRow: boolean;
}

interface CsvPreview {
  headers: string[];
  rows: string[][];
}

export function ImportContactsModal(props: ImportContactsModalProps) {
  const parser = useCsvParser();

  const [currentStep, setCurrentStep] = createSignal(1);
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
  const [csvPreview, setCsvPreview] = createSignal<CsvPreview | null>(null);
  const [mapping, setMapping] = createSignal<Record<string, string>>({});
  const [selectedLists, setSelectedLists] = createSignal<string[]>([]);
  const [skipFirstRow, setSkipFirstRow] = createSignal(true);
  const [dragActive, setDragActive] = createSignal(false);
  const fileInputRef = createRef<HTMLInputElement>();

  // Available target fields for mapping
  const targetFields = [
    { key: "email", label: "Email Address", required: true },
    { key: "firstName", label: "First Name", required: false },
    { key: "lastName", label: "Last Name", required: false },
    { key: "phone", label: "Phone Number", required: false },
    { key: "company", label: "Company", required: false },
    { key: "jobTitle", label: "Job Title", required: false },
    { key: "tags", label: "Tags", required: false },
  ];

  // Available subscriber lists
  const subscriberLists = useSubscriberLists();

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
          [targetField.bestMatch]: `column_${targetField.index}`,
        };
      }, {})
    );
  };

  const handleFileSelect = async (file: File) => {
    try {
      if (file && file.type === "text/csv") {
        setSelectedFile(file);
        await parseCsvFile(file);
      } else {
        alert("Please select a valid CSV file.");
      }
    } catch (error) {
      console.error("Error parsing CSV file:", error);
      alert("Error parsing CSV file. Please check the file format.");
    }
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFileSelect(e.dataTransfer.files[0]);
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
    if (currentStep() < 3) {
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
      const importData: ImportData = {
        file: file,
        mapping: mapping(),
        selectedLists: selectedLists(),
        skipFirstRow: skipFirstRow(),
      };
      props.onImportContacts(importData);
      props.onClose();
      // Reset form
      setCurrentStep(1);
      setSelectedFile(null);
      setCsvPreview(null);
      setMapping({});
      setSelectedLists([]);
      setSkipFirstRow(true);
    }
  };

  const isStepValid = () => {
    switch (currentStep()) {
      case 1:
        return selectedFile !== null && csvPreview !== null;
      case 2:
        return mapping()["email"] !== undefined && mapping()["email"] !== "";
      case 3:
        return selectedLists.length > 0;
      default:
        return false;
    }
  };

  const getEstimatedContacts = () => {
    if (!selectedFile || !csvPreview) return 0;
    // Estimate based on file size and preview
    const avgRowSize = (selectedFile() ?? { size: 0 }).size / ((csvPreview() ?? { rows: [] }).rows.length + 1);
    const estimatedRows = Math.floor((selectedFile() ?? { size: 0 }).size / avgRowSize);
    return skipFirstRow() ? estimatedRows - 1 : estimatedRows;
  };

  const renderStepContent = () => {
    switch (currentStep()) {
      case 1:
        return (
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Select CSV File</h3>
              <div class="space-y-4">
                {/* File Upload Area */}
                <div
                  class={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive() ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div class="space-y-2">
                    <p class="text-lg font-medium text-gray-900">
                      Drop your CSV file here, or{" "}
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        class="text-blue-600 hover:text-blue-700 underline"
                      >
                        browse
                      </button>
                    </p>
                    <p class="text-sm text-gray-600">Supports CSV files up to 10MB</p>
                  </div>
                  <input
                    ref={fileInputRef.current}
                    type="file"
                    accept=".csv"
                    onChange={async e => e.target.files?.[0] && (await handleFileSelect(e.target.files[0]))}
                    class="hidden"
                  />
                </div>

                {/* Selected File Info */}
                {selectedFile() !== null && (
                  <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div class="flex items-center space-x-3">
                      <FileText class="w-5 h-5 text-green-600" />
                      <div>
                        <p class="font-medium text-green-900">{(selectedFile() ?? { name: "" }).name}</p>
                        <p class="text-sm text-green-700">
                          {((selectedFile() ?? { size: 0 }).size / 1024).toFixed(1)} KB • Estimated{" "}
                          {getEstimatedContacts()} contacts
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CSV Format Requirements */}
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 class="font-medium text-blue-900 mb-2">CSV Format Requirements</h4>
                  <ul class="text-sm text-blue-800 space-y-1">
                    <li>• First row should contain column headers</li>
                    <li>• Email column is required</li>
                    <li>• Use commas to separate values</li>
                    <li>• Enclose values with commas in quotes</li>
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

      case 2:
        return (
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Map CSV Columns</h3>
              <div class="space-y-6">
                {/* Skip First Row Option */}
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <label class="font-medium text-gray-900">Skip first row (headers)</label>
                    <p class="text-sm text-gray-600">First row contains column names</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skipFirstRow()}
                      onChange={e => setSkipFirstRow(e.target.checked)}
                      class="sr-only peer"
                    />
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* CSV Preview */}
                {csvPreview() && (
                  <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <div class="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <h4 class="font-medium text-gray-900">CSV Preview</h4>
                    </div>
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead class="bg-gray-100">
                          <tr>
                            {(csvPreview() ?? { headers: [] }).headers.map((header, index) => (
                              <th
                                id={`header-${index}`}
                                class="px-3 py-2 text-left font-medium text-gray-900"
                              >
                                Column {index + 1}
                                {header && <div class="text-xs text-gray-600 font-normal">{header}</div>}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                          {(csvPreview() ?? { rows: [] }).rows.slice(0, 3).map((row, rowIndex) => (
                            <tr id={`row-${rowIndex}`}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  id={`column-${cellIndex}`}
                                  class="px-3 py-2 text-gray-900"
                                >
                                  {cell || <span class="text-gray-400">—</span>}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
                            id={`optiona-${index}`}
                            value={`column_${index}`}
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

      case 3:
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
                      <span class="ml-2 font-medium text-blue-900">{getEstimatedContacts()}</span>
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

                {/* List Selection */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Add contacts to lists *</label>
                  <div class="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {subscriberLists().map(list => (
                      <div
                        id={list.id}
                        class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
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

                {selectedLists.length === 0 && (
                  <div class="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div class="flex items-center space-x-2">
                      <CircleAlert class="w-4 h-4 text-red-600" />
                      <p class="text-sm text-red-800">Please select at least one list to import contacts.</p>
                    </div>
                  </div>
                )}

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
          {currentStep() < 3 ? (
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
      subTitle={() => `Step ${currentStep()} of 3`}
      actions={actions()}
      onClose={props.onClose}
      widthClass="max-w-4xl"
      currentStep={currentStep}
      steps={[
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
      ]}
    >
      <div class="p-6 overflow-y-auto max-h-96">{renderStepContent()}</div>
    </UiDialog>
  );
}
