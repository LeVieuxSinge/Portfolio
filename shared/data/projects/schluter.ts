import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "schluter",
    title: "Schluter Interactive Bathroom",
    client: "Schluter",
    tagLabels: { unrealengine: "Unreal Engine 4" },
    year: 2021,

    contributions: [
        "artist3d",
        "gamedeveloper",
        "programmer",
        "uiuxdesigner",
    ],

    tags: [
        "unrealengine",
        "cppunreal",
        "levelcreation",
        "blueprint",
    ],

    featuredOrder: 2,

    hero: "/images/projects/schluter/7.webp",

    media: [
        {
            type: "video",
            src: "/images/projects/schluter/showcase.webm",
            width: 1280,
            height: 720,
            altKey: "pages.project.items.schluter.media.0",
            poster: "/images/projects/schluter/7.webp",
        },
        {
            type: "image",
            src: "/images/projects/schluter/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.1",
        },
        {
            type: "image",
            src: "/images/projects/schluter/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.2",
        },
        {
            type: "image",
            src: "/images/projects/schluter/2.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.3",
        },
        {
            type: "image",
            src: "/images/projects/schluter/3.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.4",
        },
        {
            type: "image",
            src: "/images/projects/schluter/4.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.5",
        },
        {
            type: "image",
            src: "/images/projects/schluter/5.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.6",
        },
        {
            type: "image",
            src: "/images/projects/schluter/6.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.7",
        },
        {
            type: "image",
            src: "/images/projects/schluter/7.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.8",
        },
        {
            type: "image",
            src: "/images/projects/schluter/8.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.schluter.media.9",
        },
    ],

    links: [],

    contentKey: "pages.project.items.schluter",
} satisfies ProjectRecord;
