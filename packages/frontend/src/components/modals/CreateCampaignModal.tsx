import React, { useState } from "react";
import { Calendar, Eye, Mail, Send, Settings, Users, X } from "lucide-react";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCampaign: (campaignData: CampaignData) => void;
}

interface CampaignData {
  name: string;
  type: "one-time" | "automated";
  subject: string;
  preheader: string;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  recipientLists: string[];
  templateId: string;
  schedulingType: "send-now" | "schedule" | "draft";
  scheduledDate?: string;
  scheduledTime?: string;
  timezone: string;
}

const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({ isOpen, onClose, onCreateCampaign }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: "",
    type: "one-time",
    subject: "",
    preheader: "",
    fromName: "Your Company",
    fromEmail: "noreply@yourcompany.com",
    replyTo: "support@yourcompany.com",
    recipientLists: [],
    templateId: "",
    schedulingType: "send-now",
    timezone: "UTC",
  });

  const subscriberLists = [
    { id: "newsletter", name: "Newsletter Subscribers", count: 12456 },
    { id: "customers", name: "Customers", count: 3891 },
    { id: "trial-users", name: "Trial Users", count: 2847 },
    { id: "vip", name: "VIP Members", count: 456 },
  ];

  const templates = [
    { id: "welcome", name: "Welcome Email", preview: "Welcome new users to your platform" },
    { id: "newsletter", name: "Newsletter Template", preview: "Monthly newsletter with updates" },
    { id: "promo", name: "Promotional Email", preview: "Product promotions and offers" },
    { id: "announcement", name: "Announcement", preview: "Important company announcements" },
  ];

  const handleInputChange = (field: keyof CampaignData, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleListToggle = (listId: string) => {
    setCampaignData(prev => ({
      ...prev,
      recipientLists: prev.recipientLists.includes(listId)
        ? prev.recipientLists.filter(id => id !== listId)
        : [...prev.recipientLists, listId],
    }));
  };

  const getTotalRecipients = () => {
    return subscriberLists
      .filter(list => campaignData.recipientLists.includes(list.id))
      .reduce((total, list) => total + list.count, 0);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onCreateCampaign(campaignData);
    onClose();
    // Reset form
    setCampaignData({
      name: "",
      type: "one-time",
      subject: "",
      preheader: "",
      fromName: "Your Company",
      fromEmail: "noreply@yourcompany.com",
      replyTo: "support@yourcompany.com",
      recipientLists: [],
      templateId: "",
      schedulingType: "send-now",
      timezone: "UTC",
    });
    setCurrentStep(1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return campaignData.name.trim() !== "";
      case 2:
        return (
          campaignData.subject.trim() !== "" &&
          campaignData.fromName.trim() !== "" &&
          campaignData.fromEmail.trim() !== ""
        );
      case 3:
        return campaignData.recipientLists.length > 0;
      case 4:
        return campaignData.templateId !== "";
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                  <input
                    type="text"
                    value={campaignData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Black Friday Promotion 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => handleInputChange("type", "one-time")}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        campaignData.type === "one-time"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Send className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">One-time</h4>
                          <p className="text-sm text-gray-600">Send once to your audience</p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleInputChange("type", "automated")}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        campaignData.type === "automated"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Settings className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">Automated</h4>
                          <p className="text-sm text-gray-600">Trigger-based sending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line *</label>
                  <input
                    type="text"
                    value={campaignData.subject}
                    onChange={e => handleInputChange("subject", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 🔥 50% Off Everything - Limited Time!"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preheader Text</label>
                  <input
                    type="text"
                    value={campaignData.preheader}
                    onChange={e => handleInputChange("preheader", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Preview text that appears after the subject line"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Name *</label>
                    <input
                      type="text"
                      value={campaignData.fromName}
                      onChange={e => handleInputChange("fromName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Email *</label>
                    <input
                      type="email"
                      value={campaignData.fromEmail}
                      onChange={e => handleInputChange("fromEmail", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reply-To Email</label>
                  <input
                    type="email"
                    value={campaignData.replyTo}
                    onChange={e => handleInputChange("replyTo", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Subscriber Lists *</label>
                  <div className="space-y-3 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {subscriberLists.map(list => (
                      <div
                        key={list.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`list-${list.id}`}
                            checked={campaignData.recipientLists.includes(list.id)}
                            onChange={() => handleListToggle(list.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label
                            htmlFor={`list-${list.id}`}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{list.name}</span>
                          </label>
                        </div>
                        <span className="text-sm text-gray-600">{list.count.toLocaleString()} contacts</span>
                      </div>
                    ))}
                  </div>
                </div>

                {campaignData.recipientLists.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-900">
                        Total Recipients: {getTotalRecipients().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template & Scheduling</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Template *</label>
                  <div className="grid grid-cols-2 gap-4">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        onClick={() => handleInputChange("templateId", template.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          campaignData.templateId === template.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{template.preview}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Scheduling</label>
                  <div className="space-y-3">
                    <div
                      onClick={() => handleInputChange("schedulingType", "send-now")}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        campaignData.schedulingType === "send-now"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Send className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">Send Now</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleInputChange("schedulingType", "schedule")}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        campaignData.schedulingType === "schedule"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">Schedule for Later</span>
                      </div>
                    </div>

                    <div
                      onClick={() => handleInputChange("schedulingType", "draft")}
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        campaignData.schedulingType === "draft"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">Save as Draft</span>
                      </div>
                    </div>
                  </div>

                  {campaignData.schedulingType === "schedule" && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input
                          type="date"
                          value={campaignData.scheduledDate || ""}
                          onChange={e => handleInputChange("scheduledDate", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                        <input
                          type="time"
                          value={campaignData.scheduledTime || ""}
                          onChange={e => handleInputChange("scheduledTime", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Campaign</h2>
            <p className="text-sm text-gray-600 mt-1">Step {currentStep} of 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map(step => (
              <div
                key={step}
                className="flex items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">{renderStepContent()}</div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {campaignData.schedulingType === "send-now"
                  ? "Create & Send"
                  : campaignData.schedulingType === "schedule"
                    ? "Schedule Campaign"
                    : "Save Draft"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModal;
