import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { i18n, type Locale } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): Locale {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return matchLocale(languages, i18n.locales, i18n.defaultLocale) as Locale;
}

export function i18nMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow direct access to sitemap.xml and robots.txt
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    return NextResponse.next();
  }

  // Skip locale handling for API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const newRequest = request.clone();
  // Check if the pathname already includes a locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    // pathname already includes a locale
    const explicitLocale = i18n.locales.find(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    )!;
    newRequest.headers.set("x-detected-locale", explicitLocale);
    newRequest.headers.set("x-locale-source", "url");
  } else {
    // no locale in the pathname, detect the user's preferred locale
    const detectedLocale = getLocale(request);
    newRequest.headers.set("x-detected-locale", detectedLocale);
    newRequest.headers.set("x-locale-source", "detection");
  }

  return NextResponse.next({
    request: newRequest,
  });
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (isDashboardRoute(request)) auth().protect();
  return i18nMiddleware(request);
});
