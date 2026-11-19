export type Locale = "en" | "fr";
export type ProfileId = "frontend" | "uiux" | "art" | "programming";
export type ContributionRoleId = "frontenddeveloper" | "webgldeveloper" | "uiuxdesigner" | "artist3d" | "gamedeveloper" | "programmer";
export type TagId = "nuxt" | "tailwindcss" | "threejs" | "blender" | "substancepainter" | "houdini" | "figma" | "unrealengine" | "unity" | "p5js" | "gdevelop" | "vue" | "sketchfab" | "animejs" | "typescript" | "javascript" | "cpp" | "cppunreal" | "csharp" | "levelcreation" | "blueprint";
interface MediaDimensions {
    src: string;
    width: number;
    height: number;
    altKey: string;
}
export interface ProjectImage extends MediaDimensions { type: "image" }
export interface ProjectVideo extends MediaDimensions { type: "video"; poster: string }
export type ProjectMedia = ProjectImage | ProjectVideo;
export interface Project {
    slug: string;
    title: string;
    client: string;
    year: number;
    contributions: readonly ContributionRoleId[];
    profiles: readonly ProfileId[];
    tags: readonly TagId[];
    tagLabels?: Partial<Record<TagId, string>>;
    preview?: string;
    featuredOrder?: number;
    hero: string;
    media: readonly ProjectMedia[];
    links: readonly { labelKey: string; url: string }[];
    contentKey: string;
}
/** Authored facts exclude the canonical profiles derived from contribution roles. */
export type ProjectRecord = Omit<Project, "profiles">;
export interface CvEntry {
    id: string;
    dates: string;
    organization: string;
    organizationLabels?: Partial<Record<Locale, string>>;
    location?: string;
    titleKey: string;
}
export interface CvGroup {
    id: "experiences" | "education" | "awards" | "teaching" | "publicPresence";
    entries: readonly CvEntry[];
}
export type ArchiveSort = "newest" | "oldest" | "title";
export interface ArchiveState {
    role: ProfileId | "";
    sort: ArchiveSort;
}
export interface SelectOption<T extends string> { value: T; label: string }
