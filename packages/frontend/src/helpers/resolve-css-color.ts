export function resolveCssColor(color: string) {
  return getComputedStyle(document.documentElement) //
    .getPropertyValue(`--${color}`)
    .trim();
}
