import { LanguageSelector } from "@/components/blocks/language-selector";
import { AppProvider } from "@/contexts/app-context";
import React, { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <header className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </header>
      <main className="relative container mx-auto max-w-screen-2xl prose dark:prose-invert ">
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </AppProvider>
  );
}
