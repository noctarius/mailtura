import { createSignal, lazy } from "solid-js";
import { RouteDefinition, Router } from "@solidjs/router";
import Sidebar from "./components/interfaces/Sidebar";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import { ApiProvider } from "./hooks/useApi.js";

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [activeView, setActiveView] = createSignal("dashboard");
  const [authView, setAuthView] = createSignal<"signin" | "signup">("signin");

  if (loading) {
    return (
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authView() === "signin") {
      return <SignIn onSwitchToSignUp={() => setAuthView("signup")} />;
    } else {
      return <SignUp onSwitchToSignIn={() => setAuthView("signin")} />;
    }
  }

  const routes: RouteDefinition[] = [
    {
      path: "/dashboard",
      component: () => <Dashboard setActiveView={activeView} />,
    },
    {
      path: "/campaigns",
      component: lazy(() => import("./pages/Campaigns.js")),
    },
    {
      path: "/templates",
      component: lazy(() => import("./pages/TemplateEditor.js")),
    },
    {
      path: "/settings",
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
      path: "/global-unsubscribes",
      component: lazy(() => import("./pages/GlobalUnsubscribes.js")),
    },
    {
      path: "/list-unsubscribes",
      component: lazy(() => import("./pages/ListUnsubscribes.js")),
    },
    {
      path: "/bounces",
      component: lazy(() => import("./pages/Bounces.js")),
    },
    {
      path: "/api-keys",
      component: lazy(() => import("./pages/ApiKeyManagement.js")),
    },
    {
      path: "/tenants",
      component: lazy(() => import("./pages/TenantManagement.js")),
    },
    {
      path: "*",
      component: () => <Dashboard setActiveView={activeView} />,
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div class="flex h-screen bg-gray-50">
        <Sidebar
          activeView={activeView()}
          setActiveView={setActiveView}
        />
        <main class="flex-1 overflow-auto">
          <Router>{routes}</Router>
        </main>
      </div>
    </QueryClientProvider>
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
