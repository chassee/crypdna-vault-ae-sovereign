import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";
type Effective = "light" | "dark";

type Ctx = {
  theme: Theme;                     // user’s selection
  setTheme: (t: Theme) => void;
  actualTheme: Effective;           // what’s actually applied right now
};

const STORAGE_KEY = "vault-ui-theme";
const ThemeCtx = createContext<Ctx | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  defaultTheme?: Theme;
}> = ({ children, defaultTheme = "dark" }) => {
  // read once from localStorage or fall back to default
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored ?? defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<Effective>("dark");

  // apply to <html> and persist whenever theme changes
  useEffect(() => {
    const root = document.documentElement; // <html>
    const systemPrefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resolved: Effective =
      theme === "system" ? (systemPrefersDark ? "dark" : "light") : (theme as Effective);

    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    localStorage.setItem(STORAGE_KEY, theme);
    setActualTheme(resolved);
  }, [theme]);

  // react to system theme changes when user picked "system"
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme("system"); // triggers effect above to recalc/resync
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [theme]);

  const value = useMemo<Ctx>(() => ({ theme, setTheme, actualTheme }), [theme, actualTheme]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
};
