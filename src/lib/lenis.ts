import type Lenis from "lenis";

/** Shared handle to the page's Lenis instance so components can scroll / lock without fighting it. */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

/** Smoothly scroll to the top, through Lenis when it's running. */
export function scrollToTop() {
  if (instance) instance.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Lock / unlock page scrolling (e.g. while a full-screen menu is open). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) instance?.stop();
  else instance?.start();
}
