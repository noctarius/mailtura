import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { Permissions } from "../../types/auth.js";

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  permissions?: Permissions[];
  subitems?: Omit<NavigationItem, "icon">[];
}

interface SidebarEntryProps {
  navigationItem: NavigationItem;
  activeView: string;
  setActiveView: (view: string) => void;
}

const SidebarEntry: React.FC<SidebarEntryProps> = ({ navigationItem: item, setActiveView, activeView }) => {
  const { hasAllPermissions } = useAuth();

  const [expanded, setExpanded] = React.useState(false);

  const Icon = item.icon;
  const hasSubitems = (item.subitems && item.subitems.length > 0) ?? false;
  const isActive = item.id === activeView;
  const isSectionActive = (hasSubitems && item.subitems?.some(subitem => subitem.id === activeView)) ?? false;

  useEffect(() => {
    if (hasSubitems && !isActive && !isSectionActive) {
      setExpanded(false);
    }
  }, [activeView, hasSubitems, isActive, isSectionActive]);

  const handleClick = () => {
    if (hasSubitems) {
      setExpanded(!expanded);
    } else {
      setActiveView(item.id);
    }
  };

  if (item.permissions && !hasAllPermissions(item.permissions)) {
    return null;
  }

  return (
    <li key={item.id}>
      <button
        onClick={() => handleClick()}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeView === item.id || isSectionActive ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
        {!hasSubitems ? null : expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      {hasSubitems && expanded && (
        <ul className="mt-2 ml-4 space-y-1">
          {item.subitems?.map(subItem => (
            <li key={subItem.id}>
              <button
                onClick={() => setActiveView(subItem.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${activeView === subItem.id ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
              >
                {subItem.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarEntry;
