const preventNavigationWheelGesture = (e: WheelEvent) => {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
  }
};

const preventTouchMove = (e: TouchEvent) => {
  e.preventDefault();
}

export function disableSwipe() {
  document.body.style.touchAction = "none";
  window.addEventListener("wheel", preventNavigationWheelGesture, { passive: false });
  window.addEventListener("touchmove", preventTouchMove, { passive: false });
}

export function enableSwipe() {
  document.body.style.touchAction = "auto";
  window.removeEventListener("wheel", preventNavigationWheelGesture);
  window.removeEventListener("touchmove", preventTouchMove);
}
