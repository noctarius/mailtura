import { createSignal, lazy, ParentComponent } from "solid-js";
import { Navigate, RouteDefinition, Router } from "@solidjs/router";
import Sidebar from "./components/interfaces/Sidebar";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import { ApiProvider } from "./hooks/useApi.js";
import SignIn from "./pages/SignIn.js";

const queryClient = new QueryClient();

const AppLayout: ParentComponent = props => {
  return (
    <>
      <Sidebar />
      <main class="flex-1 overflow-auto">{props.children}</main>
    </>
  );
};

function AppContent() {
  const auth = useAuth();
  const [authView, setAuthView] = createSignal<"signin" | "signup">("signin");

  const routes: RouteDefinition[] = [
    {
      path: "/",
      component: () => <Navigate href="/dashboard" />,
    },
    {
      path: "/dashboard",
      component: () => <Dashboard />,
    },
    {
      path: "/campaigns",
      component: lazy(() => import("./pages/Campaigns.js")),
    },
    {
      path: "/template-editor",
      component: lazy(() => import("./pages/TemplateEditor.js")),
    },
    {
      path: "/settings/account",
      component: lazy(() => import("./pages/Settings.js")),
    },
    {
      path: "/contacts",
      component: lazy(() => import("./pages/Contacts.js")),
    },
    {
      path: "/activity",
      component: lazy(() => import("./pages/Activity.js")),
    },
    {
      path: "/suppression/global-unsubscribes",
      component: lazy(() => import("./pages/GlobalUnsubscribes.js")),
    },
    {
      path: "/suppression/list-unsubscribes",
      component: lazy(() => import("./pages/ListUnsubscribes.js")),
    },
    {
      path: "/suppression/bounces",
      component: lazy(() => import("./pages/Bounces.js")),
    },
    {
      path: "/settings/api-key-management",
      component: lazy(() => import("./pages/ApiKeyManagement.js")),
    },
    {
      path: "/settings/tenant-management",
      component: lazy(() => import("./pages/TenantManagement.js")),
    },
    {
      path: "*",
      component: () => <Dashboard />,
    },
  ];

  return (
    <>
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
        <QueryClientProvider client={queryClient}>
          <div class="flex h-screen bg-gray-50">
            <Router root={AppLayout}>{routes}</Router>
          </div>
        </QueryClientProvider>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <AppContent />
      </ApiProvider>
    </AuthProvider>
  );
}
export default App;
