"use client";
import { useTranslations } from "@/contexts/language-context";

export function HomeTest() {
  const { t } = useTranslations("Home");

  return (
    <div>
      {t`test`}
      <br />
      {t("test")}
    </div>
  );
}
