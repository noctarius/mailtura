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
  const [drawerRef, setDrawerRef] = createSignal<HTMLElement | undefined>(undefined);
  const [drawer, setDrawer] = createSignal<Drawer | undefined>(undefined);
  const [visible, setVisible] = createSignal(false);

  createEffect(() => {
    if (props.show()) {
      setVisible(true);
    }
  })

  createEffect(() => {
    if (drawerRef() === undefined) {
      setDrawer(undefined);
    } else {
      setDrawer(
        new Drawer(drawerRef(), {
          placement: "right",
          backdrop: false,
          onShow: props.onShow || (() => undefined),
          onHide: props.onClose || (() => undefined),
        })
      );
    }
  });

  createEffect(() => {
    const drawerInstance = drawer();
    if (drawerInstance === undefined) return;
    const opened = props.show();
    if (drawerInstance.isVisible() && !opened) {
      closeDrawer(drawerInstance);
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

  const closeDrawer = (drawerInstance: Drawer) => {
    if (drawerRef()) {
      drawerRef()?.classList.add("drawer-closing");
      setTimeout(() => {
        drawerInstance.hide();
        drawerRef()?.classList.remove("drawer-closing");
        setVisible(false);
      }, 300);
    }
  };

  return (
    <>
      {visible() ? (
        <Portal>
          <div class="modal-overlay" onClick={() => closeDrawer(drawer()!)} />
          <div
            ref={setDrawerRef}
            id={props.id}
            class="side-drawer side-drawer-container"
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
              onClick={props.onClose}
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
