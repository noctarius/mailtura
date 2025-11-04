import { Zap } from "lucide-solid";

const Unauthorized = () => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        {/* Logo and Header */}
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Zap class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Unauthorized</h1>
          <p class="text-gray-600">
            You've tried to access a page that you don't have permission to access.
          </p>
        </div>

        {/* Footer */}
        <div class="text-center mt-8">
          <p class="text-sm text-gray-500">© 2025 Mailtura. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
