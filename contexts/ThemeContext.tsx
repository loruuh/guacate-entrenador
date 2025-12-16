"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "ocean" | "sunset" | "neon";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeNames: Record<Theme, string> = {
  ocean: "Ozean",
  sunset: "Sunset",
  neon: "Neon",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("ocean");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    let savedTheme = localStorage.getItem("theme") as string | null;

    // Migrate old "blue" to "ocean"
    if (savedTheme === "blue") {
      savedTheme = "ocean";
      localStorage.setItem("theme", "ocean");
    }

    if (savedTheme && (savedTheme === "ocean" || savedTheme === "sunset" || savedTheme === "neon")) {
      setTheme(savedTheme as Theme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
    setMounted(true);
  }, []);

  // Update theme - rotate through ocean → sunset → neon → ocean
  const toggleTheme = () => {
    const themeOrder: Theme[] = ["ocean", "sunset", "neon"];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newTheme = themeOrder[nextIndex];

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeName: themeNames[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
