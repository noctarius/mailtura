import { createEffect, createSignal, JSX, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { Drawer } from "flowbite";
import { LucideProps, X } from "lucide-solid";
import { disableSwipe, enableSwipe } from "../../helpers/swipe-actions.js";

type EditDrawerProps = {
  id: string;
  children?: JSX.Element;
  onShow?: () => void;
  onClose?: () => void;
  title: string;
  titleIcon?: (props: LucideProps) => JSX.Element;
  show: () => boolean;
};

export function UiSideDrawer(props: EditDrawerProps) {
  const [drawerElement, setDrawerElement] = createSignal<HTMLElement | undefined>(undefined);
  const [drawer, setDrawer] = createSignal<Drawer | undefined>(undefined);

  createEffect(() => {
    if (drawerElement() === undefined) {
      setDrawer(undefined);
    } else {
      setDrawer(
        new Drawer(drawerElement(), {
          placement: "right",
          backdrop: true,
          onShow: props.onShow || (() => undefined),
          onHide: props.onClose || (() => undefined),
          backdropClasses: "side-drawer-bg",
        })
      );
    }
  });

  createEffect(() => {
    const drawerInstance = drawer();
    if (drawerInstance === undefined) return;
    const opened = props.show();
    if (drawerInstance.isVisible() && !opened) {
      drawerInstance.hide();
    } else if (!drawerInstance.isVisible() && opened) {
      drawerInstance.show();
    }
  });

  onMount(() => {
    disableSwipe();
    onCleanup(() => {
      enableSwipe();
    });
  });

  return (
    <>
      {props.show() ? (
        <Portal>
          <div
            id={props.id}
            ref={setDrawerElement}
            class="side-drawer-container"
            style={{ width: "600px" }}
            tabIndex="-1"
            aria-labelledby="drawer-label"
          >
            <h5 class="side-drawer-label">
              {props.titleIcon && <props.titleIcon class="w-4 h-4 mr-2" />}
              {props.title}
            </h5>
            <button
              type="button"
              onClick={() => drawer()?.hide()}
              aria-controls="drawer-example"
              class="side-drawer-close-btn"
            >
              <X />
              <span class="sr-only">Close menu</span>
            </button>
            {props.children}
          </div>
        </Portal>
      ) : null}
    </>
  );
}
