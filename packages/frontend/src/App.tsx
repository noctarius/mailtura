import { useState } from "react";
import Sidebar from "./components/interfaces/Sidebar";
import Activity from "./pages/Activity";
import Bounces from "./pages/Bounces";
import Campaigns from "./pages/Campaigns";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import GlobalUnsubscribes from "./pages/GlobalUnsubscribes";
import ListUnsubscribes from "./pages/ListUnsubscribes";
import Settings from "./pages/Settings";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Templates from "./pages/TemplateEditor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./hooks/useAuth.js";
import { ApiProvider } from "./hooks/useApi.js";

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [authView, setAuthView] = useState<"signin" | "signup">("signin");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (authView === "signin") {
      return <SignIn onSwitchToSignUp={() => setAuthView("signup")} />;
    } else {
      return <SignUp onSwitchToSignIn={() => setAuthView("signin")} />;
    }
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard setActiveView={setActiveView} />;
      case "campaigns":
        return <Campaigns />;
      case "templates":
        return <Templates />;
      case "settings":
        return <Settings />;
      case "contacts":
        return <Contacts />;
      case "activity":
        return <Activity />;
      case "global-unsubscribes":
        return <GlobalUnsubscribes />;
      case "list-unsubscribes":
        return <ListUnsubscribes />;
      case "bounces":
        return <Bounces />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <main className="flex-1 overflow-auto">{renderContent()}</main>
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
