"use client";
import { LanguageProvider } from "@/contexts/language-context";
import { bindConfig } from "@/ioc/core";
import { clientConfig } from "@/ioc/impl/config";
import React, { createContext, useContext } from "react";

type AppContextType = {
  getService: ReturnType<typeof bindConfig>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AppContext.Provider value={{ getService: bindConfig(clientConfig) }}>
      <LanguageProvider>{children}</LanguageProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
