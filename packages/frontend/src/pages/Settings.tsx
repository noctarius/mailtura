import { Bell, Copy, Eye, EyeOff, Globe, Key, Shield } from "lucide-solid";
import TableCellChip from "../components/interfaces/TableCellChip.js";
import { createSignal } from "solid-js";

const Settings = () => {
  const [showApiKey, setShowApiKey] = createSignal(false);
  const apiKey = "sk-live-1234567890abcdef1234567890abcdef12345678";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    // You could add a toast notification here
  };

  return (
    <div class="overflow-y-auto">
      <div class="p-8 max-w-4xl">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p class="text-gray-600">Manage your account and API configuration</p>
        </div>

        <div class="space-y-8">
          {/* API Keys Section */}
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Key class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">API Keys</h2>
                <p class="text-sm text-gray-600">Manage your API keys for sending emails</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <h3 class="font-medium text-gray-900">Production API Key</h3>
                    <p class="text-sm text-gray-600">Use this key for live email sending</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showApiKey() ? <EyeOff class="w-4 h-4" /> : <Eye class="w-4 h-4" />}
                    </button>
                    <button
                      onClick={copyApiKey}
                      class="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                  {showApiKey() ? apiKey : "••••••••••••••••••••••••••••••••••••••••"}
                </div>
              </div>

              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Generate New API Key
              </button>
            </div>
          </div>

          {/* Domain Settings */}
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Domain Configuration</h2>
                <p class="text-sm text-gray-600">Configure your sending domains and authentication</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Default From Domain</label>
                  <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>mail.yourcompany.com</option>
                    <option>noreply.yourcompany.com</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Default From Name</label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <h3 class="font-medium text-gray-900">mail.yourcompany.com</h3>
                    <p class="text-sm text-gray-600">DKIM authenticated</p>
                  </div>
                  <TableCellChip
                    value="Verified"
                    bgColor="bg-green-100"
                    textColor="text-green-800"
                  />
                </div>
              </div>

              <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Domain
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell class="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Notifications</h2>
                <p class="text-sm text-gray-600">Configure when and how you receive alerts</p>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 class="font-medium text-gray-900">Delivery Failures</h3>
                  <p class="text-sm text-gray-600">Get notified when emails fail to deliver</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked={true}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 class="font-medium text-gray-900">High Bounce Rate</h3>
                  <p class="text-sm text-gray-600">Alert when bounce rate exceeds 5%</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    checked={true}
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between py-3">
                <div>
                  <h3 class="font-medium text-gray-900">Weekly Reports</h3>
                  <p class="text-sm text-gray-600">Receive weekly email performance summaries</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield class="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900">Security</h2>
                <p class="text-sm text-gray-600">Manage your account security settings</p>
              </div>
            </div>

            <div class="space-y-4">
              <button class="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Change Password
              </button>
              <button class="w-full md:w-auto bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors ml-0 md:ml-3">
                Enable Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
