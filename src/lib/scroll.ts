/** Smooth scroll to the top of the page. */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/** Lock / unlock page scrolling (e.g. while the mobile menu or a lightbox is open). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
