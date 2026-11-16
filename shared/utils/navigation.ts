export function localizedPageKey(path: string) {
    return path.replace(/^\/fr(?=\/|$)/, "").replace(/\/+$/, "") || "/";
}

export function isLocaleNavigation(to: string, from: string) {
    return to !== from && localizedPageKey(to) === localizedPageKey(from);
}

export function scrollDownTarget(viewportHeight: number, documentHeight: number) {
    return Math.max(0, Math.min(viewportHeight * 0.8, documentHeight - viewportHeight));
}

export function isProjectNavigation(to: string, from: string) {
    const destination = localizedPageKey(to);
    const source = localizedPageKey(from);
    return destination.startsWith("/project/") && source.startsWith("/project/") && destination !== source;
}
