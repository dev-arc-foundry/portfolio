"use client";

import { useSyncExternalStore } from "react";
import type { LucideIcon } from "lucide-react";
import { Sun, Moon, Monitor } from "lucide-react";
import { applyTheme, readStoredTheme, THEME_EVENT, type Theme } from "@/lib/theme";

const ORDER: Theme[] = ["system", "light", "dark"];
const ICONS: Record<Theme, LucideIcon> = { system: Monitor, light: Sun, dark: Moon };
const LABELS: Record<Theme, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function getServerSnapshot(): Theme {
  return "system";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, getServerSnapshot);

  function cycle() {
    applyTheme(ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]);
  }

  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABELS[theme]}. Click to change.`}
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:text-text"
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  );
}
