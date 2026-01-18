"use client";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "@/redux/providers";
import { ThemeProvider } from "@/site_components/ThemeProvider";

export default function ClientProviders({ children }) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <ThemeProvider defaultTheme="light" storageKey="cat-adoption-theme">
          {children}
        </ThemeProvider>
      </SessionProvider>
    </ReduxProvider>
  );
}
