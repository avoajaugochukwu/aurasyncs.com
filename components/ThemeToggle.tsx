"use client";

import { useEffect, useState } from "react";

type Theme = "sand" | "dusk";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Read the theme the no-flash script already applied to <html>.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dusk" ? "dusk" : "sand");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dusk" ? "sand" : "dusk";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("aura-theme", next);
    } catch {
      /* ignore */
    }
  };

  const isDusk = theme === "dusk";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDusk ? "Switch to Sand (light) theme" : "Switch to Dusk (dark) theme"}
      title={isDusk ? "Sand" : "Dusk"}
    >
      {/* Render nothing theme-specific until mounted to avoid hydration mismatch */}
      {theme === null ? (
        <span style={{ width: 16, height: 16 }} aria-hidden="true" />
      ) : isDusk ? (
        // sun — tap to go light
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // moon — tap to go dark
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
