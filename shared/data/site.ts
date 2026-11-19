import type { ContributionRoleId, Locale, ProfileId } from "../types/portfolio.ts";

export const site = {
    name: "Xavier Champoux",
    origin: "https://xavierchampoux.com",
    email: "xavierchampoux@hotmail.com",
    copyrightYear: 2026,
    portrait: { src: "/portrait.webp", width: 819, height: 1024 },
} as const;

export const siteLocales = [
    { code: "en", language: "en-CA", name: "English", file: "en.json" },
    { code: "fr", language: "fr-CA", name: "Français", file: "fr.json" },
] as const satisfies readonly { code: Locale; language: string; name: string; file: string }[];

export const navigationItems = [
    { id: "home", path: "/" },
    { id: "work", path: "/work" },
    { id: "archive", path: "/archive" },
    { id: "about", path: "/about" },
] as const;

export const profiles = [
    { id: "frontend", swatch: "bg-frontend" },
    { id: "uiux", swatch: "bg-uiux" },
    { id: "art", swatch: "bg-art" },
    { id: "programming", swatch: "bg-programming" },
] as const satisfies readonly { id: ProfileId; swatch: string }[];

export const profileOrder: readonly ProfileId[] = profiles.map(profile => profile.id);
export const contributionProfiles: Record<ContributionRoleId, ProfileId> = {
    frontenddeveloper: "frontend",
    webgldeveloper: "frontend",
    uiuxdesigner: "uiux",
    artist3d: "art",
    gamedeveloper: "programming",
    programmer: "programming",
};

export const contactLinks = [
    { label: "GitHub", url: "https://github.com/LeVieuxSinge" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/doldmnk/" },
    { label: "Instagram", url: "https://www.instagram.com/doldmnk/" },
    { label: "YouTube", url: "https://www.youtube.com/@levieuxsinge1168" },
] as const;
