import { createSignal, lazy, ParentComponent } from "solid-js";
import { Navigate, Route, Router } from "@solidjs/router";
import Sidebar from "./components/interfaces/Sidebar";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import { ApiProvider } from "./hooks/useApi.js";
import SignIn from "./pages/SignIn.js";
import { Toaster } from "solid-toast";
import { AuthGuard } from "./components/interfaces/AuthGuard.js";

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

  return (
    <>
      <Toaster />
      {auth.isLoading() ? (
        <div class="min-h-screen bg-gray-50 flex items-center justify-center">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Loading...</p>
          </div>
        </div>
      ) : !auth.isAuthenticated() ? (
        authView() === "signin" ? (
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
                  <AuthGuard>
                    <Campaigns />
                  </AuthGuard>
                )}
              />
              <Route
                path="/template-editor"
                component={() => (
                  <AuthGuard>
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
                  <AuthGuard>
                    <Activity />
                  </AuthGuard>
                )}
              />
              <Route path="/settings">
                <Route
                  path="/account"
                  component={() => (
                    <AuthGuard>
                      <AccountSettings />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/api-key-management"
                  component={() => (
                    <AuthGuard>
                      <ApiKeyManagement />
                    </AuthGuard>
                  )}
                />
                <Route path="/tenant-management">
                  <Route
                    path="/"
                    component={() => (
                      <AuthGuard>
                        <TenantManagement />
                      </AuthGuard>
                    )}
                  />
                  <Route path="/:tenantId">
                    <Route
                      path="/user-management"
                      component={() => (
                        <AuthGuard>
                          <UserManagement />
                        </AuthGuard>
                      )}
                    />
                  </Route>
                </Route>
                <Route
                  path="/user-management"
                  component={() => (
                    <AuthGuard>
                      <UserManagement />
                    </AuthGuard>
                  )}
                />
              </Route>
              <Route path="/suppression">
                <Route
                  path="/global-unsubscribes"
                  component={() => (
                    <AuthGuard>
                      <GlobalUnsubscribes />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/list-unsubscribes"
                  component={() => (
                    <AuthGuard>
                      <ListUnsubscribes />
                    </AuthGuard>
                  )}
                />
                <Route
                  path="/bounces"
                  component={() => (
                    <AuthGuard>
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
