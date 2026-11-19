import type { ArchiveState, ContributionRoleId, ProfileId, Project } from "../types/portfolio.ts";
import { contributionProfiles, profileOrder } from "../data/site.ts";
import { localizedPath } from "./navigation.ts";

export { contributionProfiles, profileOrder };

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

export function nextSelectedProject(projects: readonly Project[], slug: string) {
    const sequence = projects.filter(project => project.featuredOrder !== undefined).sort((a, b) => a.featuredOrder! - b.featuredOrder!);
    const index = sequence.findIndex(project => project.slug === slug);
    return index >= 0 && sequence.length > 1 ? sequence[(index + 1) % sequence.length] : undefined;
}

export function projectPath(slug: string, locale: "en" | "fr" = "en") {
    return localizedPath(`/project/${slug}`, locale);
}
