import { For, JSX, onCleanup } from "solid-js";
import { LucideProps } from "lucide-solid";
import { Portal } from "solid-js/web";

const MENU_WIDTH = 224;
const SPACING = 4;

export interface ContextMenuAction {
  label: string;
  action: string;
  icon?: (props: LucideProps) => JSX.Element;
  disabled?: () => boolean;
}

interface ContextMenuProps<Item> {
  target: () => HTMLButtonElement | undefined;
  item: Item;
  actions: () => ContextMenuAction[];
  onAction: (item: Item, action: string) => void;
  onClose: () => void;
  header?: (item: Item) => JSX.Element;
}

export default function ContextMenu<Item>(props: ContextMenuProps<Item>) {
  const position = () => {
    const target = props.target();
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const left = rect.left - MENU_WIDTH / 2 - SPACING;
    return {
      top: rect.top + rect.height,
      left: left - MENU_WIDTH / 2 - SPACING < 0 ? rect.right + SPACING : left,
    };
  };

  onCleanup(props.onClose);

  return (
    <Portal>
      <div
        class="fixed z-[9999] right-0 top-4 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
        style={{
          top: `${position()?.top}px`,
          left: `${position()?.left}px`,
        }}
      >
        {props.header && (
          <>
            <div class="px-4 py-2 text-sm text-gray-700">{props.header(props.item)}</div>
            <div class="border-t border-gray-100 my-1"></div>
          </>
        )}
        <For each={props.actions()}>
          {item => {
            const Icon = item.icon;
            return (
              <button
                disabled={item.disabled ? item.disabled() : false}
                onClick={() => props.onAction(props.item, item.action)}
                class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                {Icon && <Icon class="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            );
          }}
        </For>
      </div>
    </Portal>
  );
}
