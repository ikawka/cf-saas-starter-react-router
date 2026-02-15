import { RemixI18Next } from "remix-i18next/server";
import { createCookie } from "react-router";
import {
  supportedLngs,
  fallbackLng,
  defaultNS,
  localeCookieName,
} from "./i18n";
import resourcesToBackend from "i18next-resources-to-backend";

const localeCookie = createCookie(localeCookieName, {
  path: "/",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 365, // 1 year
});

export const i18nServer = new RemixI18Next({
  detection: {
    supportedLanguages: [...supportedLngs],
    fallbackLanguage: fallbackLng,
    cookie: localeCookie,
  },
  i18next: {
    defaultNS,
    supportedLngs: [...supportedLngs],
    fallbackLng,
  },
  plugins: [
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../locales/${language}/${namespace}.json`)
    ),
  ],
});

export async function getLocale(request: Request): Promise<string> {
  return i18nServer.getLocale(request);
}
