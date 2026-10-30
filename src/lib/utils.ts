/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** 1 → "01" */
export function padNumber(n: number, length = 2) {
  return String(n).padStart(length, "0");
}

export function externalLinkProps(external?: boolean) {
  return external ? { target: "_blank", rel: "noreferrer" } : {};
}
