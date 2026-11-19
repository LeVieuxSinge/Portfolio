import type { ContributionRoleId, Locale, ProfileId } from "../types/portfolio.ts";

/** Shared authored identity/publication facts; translation copy stays in locale JSON. */
export const site = {
    /** Proper name reused in identity, page metadata, and portrait alternative text. */
    name: "Xavier Champoux",
    /** Canonical HTTPS origin; keep CNAME/robots/deployment settings consistent with it. */
    origin: "https://xavierchampoux.com",
    /** Public contact address used to build the mailto action. */
    email: "xavierchampoux@hotmail.com",

    /** Authored footer year, intentionally independent of server/client clocks. */
    copyrightYear: 2026,
    /** One canonical public portrait reference; retain its bundled duplicate until asset review. */
    portrait: {
        /** Root-relative path shared by About and social metadata. */
        src: "/portrait.webp",
        /** Intrinsic file width in pixels, used to reserve the image ratio. */
        width: 819,
        /** Intrinsic file height in pixels, used to reserve the image ratio. */
        height: 1024,
    },
} as const;

/** Locale identity/file metadata used by Nuxt configuration and route generation. */
export const siteLocales = [
    { code: "en", language: "en-CA", name: "English", file: "en.json" },
    { code: "fr", language: "fr-CA", name: "Français", file: "fr.json" },
] as const satisfies readonly {
    /** URL/i18n code; English remains unprefixed. */
    code: Locale;
    /** BCP 47 language tag for alternates and i18n locale metadata. */
    language: string;
    /** Language's own display name, independent of the current UI language. */
    name: string;
    /** Existing JSON filename relative to app/locales. */
    file: string;
}[];

/** Unprefixed paths in menu order; add locale prefixes only through the shared helper. */
export const navigationItems = [
    { id: "home", path: "/" },
    { id: "work", path: "/work" },
    { id: "archive", path: "/archive" },
    { id: "about", path: "/about" },
] as const;

/** Ordered canonical profiles and literal Tailwind swatches, scanned during CSS generation. */
export const profiles = [
    { id: "frontend", swatch: "bg-frontend" },
    { id: "uiux", swatch: "bg-uiux" },
    { id: "art", swatch: "bg-art" },
    { id: "programming", swatch: "bg-programming" },
] as const satisfies readonly {
    /** Canonical badge/filter/translation identity. */
    id: ProfileId;
    /** Literal Tailwind class; keep it statically discoverable by the scanner. */
    swatch: string;
}[];

/** Shared derivation/filter order: frontend → UI/UX → art → programming. */
export const profileOrder: readonly ProfileId[] = profiles.map(profile => profile.id);

/** Original contribution IDs remain factual data even when several map to one profile. */
export const contributionProfiles: Record<ContributionRoleId, ProfileId> = {
    frontenddeveloper: "frontend",
    webgldeveloper: "frontend",
    uiuxdesigner: "uiux",
    artist3d: "art",
    gamedeveloper: "programming",
    programmer: "programming",
};

/** Authored public destinations; availability/wording review remains with the owner. */
export const contactLinks = [
    { label: "GitHub", url: "https://github.com/LeVieuxSinge" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/doldmnk/" },
    { label: "Instagram", url: "https://www.instagram.com/doldmnk/" },
    { label: "YouTube", url: "https://www.youtube.com/@levieuxsinge1168" },
] as const;
