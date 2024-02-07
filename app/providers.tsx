"use client";
import { ThemeProvider } from "./components/ThemeProvider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}