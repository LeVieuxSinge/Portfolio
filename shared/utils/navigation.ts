import type { Locale } from "../types/portfolio.ts";

export function localizedPageKey(path: string) {
    return path.replace(/^\/fr(?=\/|$)/, "").replace(/\/+$/, "") || "/";
}

/** Translate a pathname only; the caller keeps its existing query and fragment. */
export function localizedPath(path: string, locale: Locale = "en") {
    const page = localizedPageKey(path);
    return locale === "fr" ? "/fr" + (page === "/" ? "" : page) : page;
}

export function localeLocation<T extends { path: string }>(location: T, locale: Locale) {
    return { ...location, path: localizedPath(location.path, locale) };
}

export function isLocaleNavigation(to: string, from: string) {
    return to !== from && localizedPageKey(to) === localizedPageKey(from);
}

export function scrollDownTarget(viewportHeight: number, documentHeight: number) {
    return Math.max(0, Math.min(viewportHeight * 0.8, documentHeight - viewportHeight));
}

export function needsCoveredNavigation(to: string, from: string) {
    return localizedPageKey(to) !== localizedPageKey(from);
}
