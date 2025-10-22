import { createEffect, createSignal, JSX, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { Drawer } from "flowbite";
import { Info, X } from "lucide-solid";

type EditDrawerProps = {
  id: string;
  children?: JSX.Element;
  onShow?: () => void;
  onClose?: () => void;
  opened: () => boolean;
  title: string;
};

export function UiSideDrawer(props: EditDrawerProps) {
  const [drawerElement, setDrawerElement] = createSignal<HTMLElement | undefined>(undefined);
  const [drawer, setDrawer] = createSignal<Drawer | undefined>(undefined);

  onMount(() => {
    setDrawer(
      new Drawer(drawerElement(), {
        placement: "right",
        backdrop: true,
        onShow: props.onShow || (() => undefined),
        onHide: props.onClose || (() => undefined),
        backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
      })
    );
  });

  createEffect(() => {
    const drawerInstance = drawer();
    if (drawerInstance === undefined) return;
    console.log("drawerInstance", drawerInstance);
    const opened = props.opened();
    if (drawerInstance.isVisible() && !opened) {
      drawerInstance.hide();
    } else if (!drawerInstance.isVisible() && opened) {
      drawerInstance.show();
    }
  });

  return (
    <Portal>
      <div
        id={props.id}
        ref={setDrawerElement}
        class="fixed z-50 h-screen overflow-y-auto bg-white p-8"
        style={{ width: "600px" }}
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-4 text-base font-semibold text-gray-500"
        >
          <Info class="w-4 h-4 mr-2" />
          {props.title}
        </h5>
        <button
          type="button"
          onClick={() => drawer()?.hide()}
          aria-controls="drawer-example"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center pb-10"
        >
          <X />
          <span class="sr-only">Close menu</span>
        </button>
        {props.children}
      </div>
    </Portal>
  );
}
