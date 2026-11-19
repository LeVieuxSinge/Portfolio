import type { Locale } from "../types/portfolio.ts";

/**
 * Remove only the French pathname prefix and trailing slashes.
 * @param path Pathname, not a URL containing a query or fragment.
 * @returns A locale-independent page key; root is always /.
 */
export function localizedPageKey(path: string) {
    return path.replace(/^\/fr(?=\/|$)/, "").replace(/\/+$/, "") || "/";
}

/**
 * Apply the requested locale to a pathname without duplicating /fr.
 * @param path English or French pathname.
 * @param locale Destination locale; English is the default.
 * @returns A pathname only; callers preserve query and fragment separately.
 */
export function localizedPath(path: string, locale: Locale = "en") {
    const page = localizedPageKey(path);

    return locale === "fr" ? "/fr" + (page === "/" ? "" : page) : page;
}

/**
 * Change only a location's pathname, preserving its query, hash, and other supplied fields.
 * @returns A new location object; the caller's object is not mutated.
 */
export function localeLocation<T extends { path: string }>(location: T, locale: Locale) {
    return { ...location, path: localizedPath(location.path, locale) };
}

/**
 * Identify a language swap between equivalent page paths, excluding identical paths.
 * @returns True when content can swap without replaying a page entrance.
 */
export function isLocaleNavigation(to: string, from: string) {
    return to !== from && localizedPageKey(to) === localizedPageKey(from);
}

/**
 * Use one threshold for Scroll down and the centered header label.
 * @param viewportHeight Viewport height in CSS pixels.
 * @param documentHeight Full document height in CSS pixels.
 * @returns 80% of the viewport, clamped between zero and the actual content end.
 */
export function scrollDownTarget(viewportHeight: number, documentHeight: number) {
    return Math.max(0, Math.min(viewportHeight * 0.8, documentHeight - viewportHeight));
}

/**
 * Compare locale-independent page identities for the opaque page handoff.
 * @returns False for same-page query/hash changes and equivalent locale paths.
 */
export function needsCoveredNavigation(to: string, from: string) {
    return localizedPageKey(to) !== localizedPageKey(from);
}
