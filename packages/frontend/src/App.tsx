import { createEffect, createSignal, lazy, onCleanup, onMount, ParentComponent } from "solid-js";
import { Navigate, Route, Router } from "@solidjs/router";
import Sidebar from "./components/interfaces/Sidebar";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import { ApiProvider } from "./hooks/useApi.js";
import SignIn from "./pages/SignIn.js";
import { toast, Toaster } from "solid-toast";
import { AuthGuard } from "./components/interfaces/AuthGuard.js";
import { useRegisterSW } from "virtual:pwa-register/solid";
import { API_URL } from "./constants.js";
import InstallationSetup from "./pages/InstallationSetup.js";

const queryClient = new QueryClient();

const AppLayout: ParentComponent = props => {
  const auth = useAuth();

  return (
    <>
      {!auth.isLoading() && auth.isAuthenticated() && <Sidebar />}
      <main class="flex flex-1 flex-col min-h-0 overflow-hidden">{props.children}</main>
    </>
  );
};

function AppContent() {
  const auth = useAuth();
  const [authView, setAuthView] = createSignal<"signin" | "signup">("signin");
  const [isInstallationCheckLoading, setIsInstallationCheckLoading] = createSignal(true);
  const [isInstallationRequired, setIsInstallationRequired] = createSignal(false);

  const Campaigns = lazy(() => import("./pages/Campaigns.js"));
  const TemplateEditor = lazy(() => import("./pages/TemplateEditor.js"));
  const Contacts = lazy(() => import("./pages/Contacts.js"));
  const Activity = lazy(() => import("./pages/Activity.js"));
  const AccountSettings = lazy(() => import("./pages/Settings.js"));
  const ApiKeyManagement = lazy(() => import("./pages/ApiKeyManagement.js"));
  const TenantManagement = lazy(() => import("./pages/TenantManagement.js"));
  const UserManagement = lazy(() => import("./pages/UserManagement.js"));
  const GlobalUnsubscribes = lazy(() => import("./pages/GlobalUnsubscribes.js"));
  const ListUnsubscribes = lazy(() => import("./pages/ListUnsubscribes.js"));
  const Bounces = lazy(() => import("./pages/Bounces.js"));

  const showUpdateNotification = (onUpdate: (reloadPage?: boolean) => Promise<void>) => () => {
    toast.custom(
      t => (
        <div class="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg">
          <span>A new version of Mailtura is available.</span>
          <button
            class="ml-3 bg-blue-500 px-3 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              await onUpdate(true);
            }}
          >
            Reload now
          </button>
        </div>
      ),
      {
        duration: Infinity,
        unmountDelay: 0,
      }
    );
  };

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_, r) {
      if (r) setInterval(() => r.update(), 1000 * 60 * 60);
    },
  });

  createEffect(() => {
    if (needRefresh()) {
      showUpdateNotification(updateServiceWorker)();
    }
  });

  onCleanup(() => {
    setNeedRefresh(false);
  });

  onMount(async () => {
    try {
      const response = await fetch(new URL("api/v1/install", API_URL), {
        credentials: "include",
      });

      if (response.status === 404) {
        setIsInstallationRequired(false);
        return;
      }

      if (!response.ok) {
        setIsInstallationRequired(false);
        return;
      }

      const payload = (await response.json()) as { installation?: "required" | "finished" };
      const installationRequired = payload.installation === "required";

      setIsInstallationRequired(installationRequired);
      if (installationRequired) {
        setAuthView("signup");
      }
    } catch {
      setIsInstallationRequired(false);
    } finally {
      setIsInstallationCheckLoading(false);
    }
  });

  return (
    <>
      <Toaster />
      {isInstallationCheckLoading() || auth.isLoading() ? (
        <div class="min-h-screen bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : !auth.isAuthenticated() ? (
        isInstallationRequired() ? (
          <InstallationSetup
            onInstalled={() => {
              setIsInstallationRequired(false);
              setAuthView("signin");
            }}
          />
        ) : authView() === "signin" ? (
          <SignIn onSwitchToSignUp={() => setAuthView("signup")} />
        ) : (
          <SignUp onSwitchToSignIn={() => setAuthView("signin")} />
        )
      ) : (
        <div class="flex flex-1 min-h-0 h-screen bg-gray-50">
          <Router root={AppLayout}>
            <Route path="/">
              <Route
                path="/"
                component={() => <Navigate href="/dashboard" />}
              />
              <Route
                path="/dashboard"
                component={Dashboard}
              />
              <Route
                path="/campaigns"
                component={() => (
                  <AuthGuard permissions={["view::campaigns"]}>
                    <Campaigns />
                  </AuthGuard>
                )}
              />
              <Route
                path="/template-editor"
                component={() => (
                  <AuthGuard permissions={["view::templates"]}>
                    <TemplateEditor />
                  </AuthGuard>
                )}
              />
              <Route
                path="/contacts"
                component={() => (
                  <AuthGuard permissions={["view::contacts"]}>
                    <Contacts />
                  </AuthGuard>
                )}
              />
              <Route
                path="/activity"
                component={() => (
                  <AuthGuard permissions={["view::reports"]}>
                    <Activity />
                  </AuthGuard>
                )}
              />
              <Route path="/settings">
                <Route
                  path="/account"
                  component={() => (
                    <AuthGuard permissions={["view::settings"]}>
                      <AccountSettings />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/api-key-management"
                  component={() => (
                    <AuthGuard permissions={["view::api-keys"]}>
                      <ApiKeyManagement />
                    </AuthGuard>
                  )}
                />
                <Route path="/tenant-management">
                  <Route
                    path="/"
                    component={() => (
                      <AuthGuard permissions={["view::tenants"]}>
                        <TenantManagement />
                      </AuthGuard>
                    )}
                  />
                  <Route path="/:tenantId">
                    <Route
                      path="/user-management"
                      component={() => (
                        <AuthGuard permissions={["view::tenants"]}>
                          <UserManagement />
                        </AuthGuard>
                      )}
                    />
                  </Route>
                </Route>
                <Route
                  path="/user-management"
                  component={() => (
                    <AuthGuard permissions={["view::users"]}>
                      <UserManagement />
                    </AuthGuard>
                  )}
                />
              </Route>
              <Route path="/suppression">
                <Route
                  path="/global-unsubscribes"
                  component={() => (
                    <AuthGuard permissions={["view::suppressions"]}>
                      <GlobalUnsubscribes />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/list-unsubscribes"
                  component={() => (
                    <AuthGuard permissions={["view::suppressions"]}>
                      <ListUnsubscribes />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/bounces"
                  component={() => (
                    <AuthGuard permissions={["view::suppressions"]}>
                      <Bounces />
                    </AuthGuard>
                  )}
                />
              </Route>
            </Route>
            <Route
              path="*"
              component={() => <Navigate href="/dashboard" />}
            />
          </Router>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ApiProvider>
    </QueryClientProvider>
  );
}
export default App;
