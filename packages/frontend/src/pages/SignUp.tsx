import { Eye, EyeOff, Lock, Mail, User, Zap } from "lucide-solid";
import { useAuth } from "../hooks/useAuth";
import { createSignal } from "solid-js";

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

const SignUp = (props: SignUpProps) => {
  const { signUp } = useAuth();
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [showConfirmPassword, setShowConfirmPassword] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal("");
  const [acceptTerms, setAcceptTerms] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the terms and conditions.");
      return;
    }

    setIsLoading(true);

    try {
      await signUp(firstName(), lastName(), email(), password());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="max-w-md w-full">
        {/* Logo and Header */}
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Zap class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Create account</h1>
          <p class="text-gray-600">Start your EmailFlow journey today</p>
        </div>

        {/* Sign Up Form */}
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form
            onSubmit={handleSubmit}
            class="space-y-6"
          >
            {error && (
              <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-600 text-sm">{error()}</p>
              </div>
            )}

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="firstName"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  First name
                </label>
                <div class="relative">
                  <User class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="firstName"
                    type="text"
                    value={firstName()}
                    onChange={e => setFirstName(e.target.value)}
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  for="lastName"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last name
                </label>
                <div class="relative">
                  <User class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="lastName"
                    type="text"
                    value={lastName()}
                    onChange={e => setLastName(e.target.value)}
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div class="relative">
                <Mail class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email()}
                  onChange={e => setEmail(e.target.value)}
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div class="relative">
                <Lock class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword() ? "text" : "password"}
                  value={password()}
                  onChange={e => setPassword(e.target.value)}
                  class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword())}
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword() ? <EyeOff class="w-5 h-5" /> : <Eye class="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label
                for="confirmPassword"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm password
              </label>
              <div class="relative">
                <Lock class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword() ? "text" : "password"}
                  value={confirmPassword()}
                  onChange={e => setConfirmPassword(e.target.value)}
                  class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword())}
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword() ? <EyeOff class="w-5 h-5" /> : <Eye class="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div class="flex items-start">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={acceptTerms()}
                onChange={e => setAcceptTerms(e.target.checked)}
                class="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                for="acceptTerms"
                class="ml-2 text-sm text-gray-600"
              >
                I agree to the{" "}
                <button
                  type="button"
                  class="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  class="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading()}
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading() ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={props.onSwitchToSignIn}
                class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div class="text-center mt-8">
          <p class="text-sm text-gray-500">© 2024 EmailFlow. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
