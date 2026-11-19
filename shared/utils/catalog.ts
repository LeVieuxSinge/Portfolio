import type { ArchiveState, ContributionRoleId, ProfileId, Project } from "../types/portfolio.ts";
import { contributionProfiles, profileOrder } from "../data/site.ts";
import { localizedPath } from "./navigation.ts";

export { contributionProfiles, profileOrder };

/**
 * Map original roles to unique public profiles in canonical order.
 * @param roles Retained contribution IDs; input order does not set badge order.
 * @returns A new array; neither the input roles nor shared definitions are mutated.
 */
export function deriveProfiles(roles: readonly ContributionRoleId[]): ProfileId[] {
    return profileOrder.filter(profile => roles.some(role => contributionProfiles[role] === profile));
}

/**
 * Interpret untrusted URL values without writing history. Arrays/invalid values use defaults; legacy roles map to profiles.
 * @param query Router query values, including missing, repeated, or null values.
 * @returns Canonical role/sort values for controls and adjacent-project links.
 */
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

/**
 * Serialize canonical browsing context, omitting the empty all-profiles role.
 * @returns String query values; sort is always explicit in project/neighbor links.
 */
export function archiveQuery(state: ArchiveState): Record<string, string> {
    return { ...(state.role ? { role: state.role } : {}), sort: state.sort };
}

/**
 * Select non-featured projects and return a freshly sorted collection. Year ties and equal titles use English slug ordering.
 * @param projects Complete catalog; its editorial order is never mutated.
 * @param state Normalized filter/sort context.
 * @returns A new filtered array in the requested browsing order.
 */
export function browseArchive(projects: readonly Project[], state: ArchiveState): Project[] {
    return projects
        .filter(project => project.featuredOrder === undefined && (!state.role || project.profiles.includes(state.role)))
        .sort((a, b) => {
            if (state.sort === "title") return a.title.localeCompare(b.title, "en") || a.slug.localeCompare(b.slug, "en");

            return (state.sort === "oldest" ? a.year - b.year : b.year - a.year) || a.slug.localeCompare(b.slug, "en");
        });
}

/**
 * Find looping neighbors within the current filtered/sorted Archive sequence.
 * @returns Undefined neighbors when the project is absent or the sequence has fewer than two entries.
 */
export function archiveNeighbors(projects: readonly Project[], slug: string, state: ArchiveState) {
    const sequence = browseArchive(projects, state);
    const index = sequence.findIndex(project => project.slug === slug);

    if (index < 0 || sequence.length < 2) return { previous: undefined, next: undefined };

    return { previous: sequence[(index - 1 + sequence.length) % sequence.length], next: sequence[(index + 1) % sequence.length] };
}

/**
 * Advance through featuredOrder and wrap the last Work project to the first.
 * @returns Undefined for an unknown slug or a collection with fewer than two entries.
 */
export function nextSelectedProject(projects: readonly Project[], slug: string) {
    const sequence = projects.filter(project => project.featuredOrder !== undefined).sort((a, b) => a.featuredOrder! - b.featuredOrder!);
    const index = sequence.findIndex(project => project.slug === slug);

    return index >= 0 && sequence.length > 1 ? sequence[(index + 1) % sequence.length] : undefined;
}

/**
 * Build the detail pathname from a stable slug; query and fragment stay with the caller.
 * @returns English /project paths or their /fr equivalents.
 */
export function projectPath(slug: string, locale: "en" | "fr" = "en") {
    return localizedPath(`/project/${slug}`, locale);
}
