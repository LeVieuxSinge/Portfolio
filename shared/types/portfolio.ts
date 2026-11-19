/** URL locale codes; English is unprefixed and French uses `/fr`. */
export type Locale = "en" | "fr";

/** Canonical display/filter profiles, distinct from original contribution roles. */
export type ProfileId = "frontend" | "uiux" | "art" | "programming";

/** Retained source responsibilities; do not infer new roles from narrative copy. */
export type ContributionRoleId = "frontenddeveloper" | "webgldeveloper" | "uiuxdesigner" | "artist3d" | "gamedeveloper" | "programmer";

/** Tool/technique IDs; displayed labels normally resolve through `tool.<id>`. */
export type TagId = "nuxt" | "tailwindcss" | "threejs" | "blender" | "substancepainter" | "houdini" | "figma" | "unrealengine" | "unity" | "p5js" | "gdevelop" | "vue" | "sketchfab" | "animejs" | "typescript" | "javascript" | "cpp" | "cppunreal" | "csharp" | "levelcreation" | "blueprint";

/** Intrinsic media geometry reserves space and preserves landscape/portrait ratios. */
interface MediaDimensions {
    /** Root-relative file path under `public`; never a generated route. */
    src: string;
    /** Original file width in pixels, not a rendered CSS width. */
    width: number;
    /** Original file height in pixels, not a rendered CSS height. */
    height: number;
    /** Bilingual description key used for image alt text and video controls. */
    altKey: string;
}

/** A gallery image; recovery state is owned by its rendered component. */
export interface ProjectImage extends MediaDimensions {
    /** Discriminator used by the shared media template. */
    type: "image";
}

/** A muted inline video with a required retained-image fallback. */
export interface ProjectVideo extends MediaDimensions {
    /** Discriminator used by the shared media template. */
    type: "video";
    /** Root-relative poster path; this is not another gallery item. */
    poster: string;
}

/** Narrow on `type` before accessing video-only properties. */
export type ProjectMedia = ProjectImage | ProjectVideo;

/** Runtime catalog record: authored facts plus deterministic derived profiles. */
export interface Project {
    /** Stable, untranslated URL identifier; also names the record file. */
    slug: string;
    /** Authored display name shared by both languages. */
    title: string;
    /** Authored client or personal/school attribution, independent of the title. */
    client: string;
    /** Calendar year used for display and chronological Archive ordering. */
    year: number;

    /** Original roles, preserved separately from the broader public profiles. */
    contributions: readonly ContributionRoleId[];
    /** Deduplicated profiles in the shared canonical order. */
    profiles: readonly ProfileId[];
    /** Ordered tool/technique badges; each normally has a `tool` translation. */
    tags: readonly TagId[];
    /** Proper-name/version overrides, such as Unreal Engine 4, keyed by tag ID. */
    tagLabels?: Partial<Record<TagId, string>>;
    /** Optional list-preview image override; otherwise the preview uses `hero`. */
    preview?: string;
    /** Zero-based Work order; absence places the project in Archive. */
    featuredOrder?: number;

    /** Retained image for social metadata and the default list preview. */
    hero: string;
    /** Editorial source order: first item leads the detail page; never sort this array. */
    media: readonly ProjectMedia[];
    /** Retained external destinations in authored display order; narrative credits remain separate. */
    links: readonly {
        /** Bilingual action label under the project's locale namespace. */
        labelKey: string;
        /** Retained absolute destination; factual/link review belongs to the owner. */
        url: string;
    }[];
    /** Base key for summary, context, contribution, credits, and link/media copy. */
    contentKey: string;
}

/** Authored facts exclude the canonical profiles derived from contribution roles. */
export type ProjectRecord = Omit<Project, "profiles">;

/** Authored CV facts; translated titles are referenced rather than duplicated. */
export interface CvEntry {
    /** Stable identifier within its CV category. */
    id: string;
    /** Authored display range; kept as text rather than parsed or inferred. */
    dates: string;
    /** Canonical proper name of the institution/company/event. */
    organization: string;
    /** Explicit localized proper names where the existing content supplies them. */
    organizationLabels?: Partial<Record<Locale, string>>;
    /** Optional display location, with original spelling retained. */
    location?: string;
    /** Bilingual role/qualification/participation label. */
    titleKey: string;
}

/** One of the five ordered CV categories rendered by About. */
export interface CvGroup {
    /** Category key also used under `pages.about.cvSections`. */
    id: "experiences" | "education" | "awards" | "teaching" | "publicPresence";
    /** Authored display order; entries are not automatically date-sorted. */
    entries: readonly CvEntry[];
}

/** Canonical Archive sort query values. Ties always use stable slug order. */
export type ArchiveSort = "newest" | "oldest" | "title";

/** Normalized browsing context shared by Archive, project links, and neighbors. */
export interface ArchiveState {
    /** Empty string means all profiles; contribution-role aliases normalize here. */
    role: ProfileId | "";
    /** Missing/invalid query input resolves to `newest`. */
    sort: ArchiveSort;
}

/** A typed controlled-dropdown choice; only supplied values may be emitted. */
export interface SelectOption<T extends string> {
    /** Canonical URL/control value, independent of the translated label. */
    value: T;
    /** Current-language text displayed by both trigger and menu item. */
    label: string;
}
