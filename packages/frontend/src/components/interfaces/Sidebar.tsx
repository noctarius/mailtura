import { Activity, BarChart3, FileText, LogOut, Send, Settings, Shield, TrendingUp, Users, Zap } from "lucide-react";
import React from "react";
import SidebarEntry, { NavigationItem } from "./SidebarEntry.tsx";
import { useAuth } from "../../hooks/useAuth.tsx";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const { user, signOut } = useAuth();

  const navItems: NavigationItem[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
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
        { id: "integrations", label: "Integrations" },
        { id: "billing", label: "Billing" },
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
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">EmailFlow</h1>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map(item => {
            return (
              <SidebarEntry
                key={item.id}
                navigationItem={item}
                activeView={activeView}
                setActiveView={setActiveView}
              />
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user?.firstName.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
