import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "monologue",
    title: "Monologue",
    client: "School",
    year: 2020,

    contributions: [
        "artist3d",
    ],

    tags: [
        "blender",
    ],

    hero: "/images/projects/monologue/0.jpg",

    media: [
        {
            type: "video",
            src: "/images/projects/monologue/showcase.mp4",
            width: 1280,
            height: 720,
            altKey: "pages.project.items.monologue.media.0",
            poster: "/images/projects/monologue/0.jpg",
        },
        {
            type: "video",
            src: "/images/projects/monologue/video.mp4",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.monologue.media.1",
            poster: "/images/projects/monologue/0.jpg",
        },
        {
            type: "image",
            src: "/images/projects/monologue/0.jpg",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.monologue.media.2",
        },
        {
            type: "image",
            src: "/images/projects/monologue/1.jpg",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.monologue.media.3",
        },
        {
            type: "image",
            src: "/images/projects/monologue/2.jpg",
            width: 649,
            height: 786,
            altKey: "pages.project.items.monologue.media.4",
        },
    ],

    links: [],

    contentKey: "pages.project.items.monologue",
} satisfies ProjectRecord;
