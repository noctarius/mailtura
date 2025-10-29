import { ChevronDown, ChevronRight, LucideProps } from "lucide-solid";
import { useAuth } from "../../hooks/useAuth.js";
import { Permissions } from "../../types/auth.js";
import { createEffect, createSignal, JSX } from "solid-js";

export interface NavigationItem {
  id: string;
  label: string;
  icon: (props: LucideProps) => JSX.Element;
  permissions?: Permissions[];
  subitems?: Omit<NavigationItem, "icon">[];
}

interface SidebarEntryProps {
  navigationItem: NavigationItem;
  activeView: () => string | undefined;
}

const SidebarEntry = (props: SidebarEntryProps) => {
  const { hasAllPermissions } = useAuth();

  const [expanded, setExpanded] = createSignal(false);

  const Icon = props.navigationItem.icon;
  const hasSubitems = (props.navigationItem.subitems && props.navigationItem.subitems.length > 0) ?? false;
  const isActive = () => props.navigationItem.id === props.activeView();
  const isSectionActive = () =>
    (hasSubitems && props.navigationItem.subitems?.some(subitem => subitem.id === props.activeView())) ?? false;

  createEffect(() => {
    if (hasSubitems && !isActive() && !isSectionActive()) {
      setExpanded(false);
    }
  });

  const handleClick = () => {
    if (hasSubitems) {
      setExpanded(!expanded());
    }
  };

  if (props.navigationItem.permissions && !hasAllPermissions(props.navigationItem.permissions)) {
    return null;
  }

  return (
    <li>
      <a
        onClick={() => handleClick()}
        href={hasSubitems ? undefined : `/${props.navigationItem.id}`}
        class={`button w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${props.activeView() === props.navigationItem.id ? "bg-blue-600 text-white" : isSectionActive() ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
      >
        <Icon class="w-5 h-5" />
        <span>{props.navigationItem.label}</span>
        {!hasSubitems ? null : expanded() ? <ChevronDown class="w-4 h-4" /> : <ChevronRight class="w-4 h-4" />}
      </a>
      {hasSubitems && expanded() && (
        <ul class="mt-2 ml-4 space-y-1">
          {props.navigationItem.subitems?.map(subItem => (
            <li>
              <a
                href={`/${props.navigationItem.id}/${subItem.id}`}
                class={`button w-full flex text-left px-4 py-2 my-2 rounded-lg transition-colors text-sm ${props.activeView() === subItem.id ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"}`}
              >
                {subItem.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarEntry;
