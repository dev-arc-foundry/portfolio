/*
 * The theme protocol, in one place. Three consumers encode parts of it — the
 * pre-paint script in the root layout, the toggle, and the particle canvas that
 * repaints when the palette changes — and none of them would fail loudly if the
 * storage key or the event name drifted apart.
 */

export type Theme = "system" | "light" | "dark";

export const THEME_KEY = "theme";
export const THEME_EVENT = "devarc-theme-change";

/** "system" is the absence of a stored choice, not a stored value. */
export function readStoredTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

/*
 * Only `data-theme` is written. The matching `color-scheme` lives in globals.css,
 * which is also what resolves every light-dark() token.
 */
export function applyTheme(theme: Theme) {
  if (theme === "system") {
    delete document.documentElement.dataset.theme;
    window.localStorage.removeItem(THEME_KEY);
  } else {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

/** Inlined in <head> so a stored choice lands before first paint. */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
