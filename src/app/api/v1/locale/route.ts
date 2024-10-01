import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";

function getLocales() {
  if (typeof window === "undefined") {
    const localesDir = join(process.cwd(), "src/locales");
    const files = readdirSync(localesDir);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
  }
  return [];
}

function getLocaleContent(lng: string) {
  if (typeof window === "undefined") {
    const filePath = join(process.cwd(), `src/locales/${lng}.json`);
    try {
      const fileContent = readFileSync(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading file for language ${lng}:`, error);
      return null;
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const lng = searchParams.get("lng");

  if (lng) {
    const localeContent = getLocaleContent(lng);
    if (localeContent) return NextResponse.json(localeContent);
    return NextResponse.json(
      { error: "Error fetching locale content" },
      { status: 404 }
    );
  }

  const locales = getLocales();
  return NextResponse.json(locales);
}
