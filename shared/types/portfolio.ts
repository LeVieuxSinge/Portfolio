export type Locale = "en" | "fr";
export type ProfileId = "frontend" | "uiux" | "art" | "programming";
export type ContributionRoleId = "frontenddeveloper" | "webgldeveloper" | "uiuxdesigner" | "artist3d" | "gamedeveloper" | "programmer";
export type TagId = "nuxt" | "tailwindcss" | "threejs" | "blender" | "substancepainter" | "houdini" | "figma" | "unrealengine" | "unity" | "p5js" | "gdevelop" | "vue" | "sketchfab" | "animejs" | "typescript" | "javascript" | "cpp" | "cppunreal" | "csharp" | "levelcreation" | "blueprint";
export interface ProjectMedia {
    type: "image" | "video";
    src: string;
    width: number;
    height: number;
    altKey: string;
    poster?: string;
}
export interface Project {
    slug: string;
    title: string;
    client: string;
    year: number;
    contributions: readonly ContributionRoleId[];
    profiles: readonly ProfileId[];
    tags: readonly TagId[];
    featuredOrder?: number;
    hero: string;
    media: readonly ProjectMedia[];
    links: readonly { labelKey: string; url: string }[];
    contentKey: string;
}
export interface CvEntry {
    id: string;
    dates: string;
    organization: string;
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
