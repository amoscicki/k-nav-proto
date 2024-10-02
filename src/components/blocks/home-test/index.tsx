"use client";
import { useTranslations } from "@/contexts/language-context";

export function HomeTest() {
  const { t } = useTranslations();

  return (
    <div className="container mt-32 m-auto max-w-screen-md prose dark:prose-invert flex flex-col gap-8">
      <div>
        <h2>
          Wywołanie funkcji t z użyciem składni <pre>t``</pre>
        </h2>
        <blockquote>{t`test`}</blockquote>
      </div>
      <div>
        <h2>
          Wywołanie funkcji t z użyciem składni <pre>t("")</pre>
        </h2>
        <blockquote>{t("test")}</blockquote>
      </div>
    </div>
  );
}
