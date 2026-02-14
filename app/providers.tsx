"use client";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { ModuleProvider } from "@/lib/ModuleContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ModuleProvider>{children}</ModuleProvider>
    </ThemeProvider>
  );
}
