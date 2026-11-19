import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "grownshrink",
    title: "Grow N' Shrink",
    client: "School",
    year: 2020,

    contributions: [
        "gamedeveloper",
        "programmer",
    ],

    tags: [
        "unity",
        "csharp",
    ],

    hero: "/images/projects/grownshrink/2.webp",

    media: [
        {
            type: "video",
            src: "/images/projects/grownshrink/showcase.webm",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.grownshrink.media.0",
            poster: "/images/projects/grownshrink/2.webp",
        },
        {
            type: "image",
            src: "/images/projects/grownshrink/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.grownshrink.media.1",
        },
        {
            type: "image",
            src: "/images/projects/grownshrink/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.grownshrink.media.2",
        },
        {
            type: "image",
            src: "/images/projects/grownshrink/2.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.grownshrink.media.3",
        },
    ],

    links: [],

    contentKey: "pages.project.items.grownshrink",
} satisfies ProjectRecord;
