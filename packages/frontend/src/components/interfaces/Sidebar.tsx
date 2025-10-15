import { Activity, ChartColumn, FileText, LogOut, Send, Settings, Shield, TrendingUp, Users, Zap } from "lucide-solid";
import SidebarEntry, { NavigationItem } from "./SidebarEntry.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar = (props: SidebarProps) => {
  const { user, signOut } = useAuth();

  const navItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: ChartColumn },
    { id: "campaigns", label: "Campaigns", icon: Send },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "contacts", label: "Contacts", icon: Users },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      subitems: [
        { id: "account", label: "Account" },
        { id: "api-keys", label: "API Key Management" },
        { id: "integrations", label: "Integrations" },
        { id: "tenant-management", label: "Tenant Management", permissions: ["manage::tenants"] },
      ],
    },
    {
      id: "suppression",
      label: "Suppressions",
      icon: Shield,
      subitems: [
        { id: "global-unsubscribes", label: "Global Unsubscribes" },
        { id: "list-unsubscribes", label: "List Unsubscribes" },
        { id: "bounces", label: "Bounces" },
      ],
    },
  ];

  return (
    <div class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="p-6 border-b border-slate-800">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap class="w-5 h-5 text-white" />
          </div>
          <h1 class="text-xl font-bold">Mailtura</h1>
        </div>
      </div>

      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          {navItems.map(item => {
            return (
              <SidebarEntry
                navigationItem={item}
                activeView={props.activeView}
                setActiveView={props.setActiveView}
              />
            );
          })}
        </ul>
      </nav>

      <div class="p-4 border-t border-slate-800">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">{user?.firstName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p class="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p class="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
