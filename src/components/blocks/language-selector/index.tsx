"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTranslations } from "@/contexts/language-context";
import { FloatingNav } from "@/components/ui/floating-navbar";

export function LanguageSelector() {
  const { setLocale, availableLanguages, currentLanguage } = useTranslations();
  const [open, setOpen] = useState(false);

  if (availableLanguages.length <= 1) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <span className={"flex items-center gap-2"}>
          <Globe size={16} />
          {currentLanguage?.toUpperCase()}
        </span>
      </PopoverTrigger>
      <PopoverContent className="p-0 grid w-16 overflow-clip">
        {availableLanguages?.map((locale) => (
          <Button
            key={locale}
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              setOpen(false);
              setLocale(locale);
            }}
            className={"border-0 rounded-none"}
          >
            {locale.toUpperCase()}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
