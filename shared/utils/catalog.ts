import type { ArchiveState, ContributionRoleId, ProfileId, Project } from "../types/portfolio.ts";

export const profileOrder: readonly ProfileId[] = ["frontend", "uiux", "art", "programming"];
export const contributionProfiles: Record<ContributionRoleId, ProfileId> = {
    frontenddeveloper: "frontend",
    webgldeveloper: "frontend",
    uiuxdesigner: "uiux",
    artist3d: "art",
    gamedeveloper: "programming",
    programmer: "programming",
};

export function deriveProfiles(roles: readonly ContributionRoleId[]): ProfileId[] {
    return profileOrder.filter(profile => roles.some(role => contributionProfiles[role] === profile));
}

export function normalizeArchiveQuery(query: Record<string, unknown>): ArchiveState {
    const rawRole = typeof query.role === "string" ? query.role : "";
    const role = profileOrder.includes(rawRole as ProfileId)
        ? rawRole as ProfileId
        : Object.hasOwn(contributionProfiles, rawRole)
            ? contributionProfiles[rawRole as ContributionRoleId]
            : "";
    const sort = query.sort === "oldest" || query.sort === "title" ? query.sort : "newest";
    return { role, sort };
}

export function archiveQuery(state: ArchiveState): Record<string, string> {
    return { ...(state.role ? { role: state.role } : {}), sort: state.sort };
}

export function browseArchive(projects: readonly Project[], state: ArchiveState): Project[] {
    return projects
        .filter(project => project.featuredOrder === undefined && (!state.role || project.profiles.includes(state.role)))
        .sort((a, b) => {
            if (state.sort === "title") return a.title.localeCompare(b.title, "en") || a.slug.localeCompare(b.slug, "en");
            return (state.sort === "oldest" ? a.year - b.year : b.year - a.year) || a.slug.localeCompare(b.slug, "en");
        });
}

export function archiveNeighbors(projects: readonly Project[], slug: string, state: ArchiveState) {
    const sequence = browseArchive(projects, state);
    const index = sequence.findIndex(project => project.slug === slug);
    if (index < 0 || sequence.length < 2) return { previous: undefined, next: undefined };
    return { previous: sequence[(index - 1 + sequence.length) % sequence.length], next: sequence[(index + 1) % sequence.length] };
}

export function projectPath(slug: string, locale: "en" | "fr" = "en") {
    return `${locale === "fr" ? "/fr" : ""}/project/${slug}`;
}
