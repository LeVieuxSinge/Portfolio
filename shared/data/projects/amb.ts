import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "amb",
    title: "American Biltrite - MTG",
    client: "American Biltrite",
    year: 2024,

    contributions: [
        "frontenddeveloper",
        "uiuxdesigner",
    ],

    tags: [
        "vue",
        "typescript",
    ],

    hero: "/images/projects/amb/0.webp",

    media: [
        {
            type: "video",
            src: "/images/projects/amb/showcase.webm",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.amb.media.0",
            poster: "/images/projects/amb/0.webp",
        },
        {
            type: "image",
            src: "/images/projects/amb/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.amb.media.1",
        },
        {
            type: "image",
            src: "/images/projects/amb/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.amb.media.2",
        },
        {
            type: "image",
            src: "/images/projects/amb/2.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.amb.media.3",
        },
        {
            type: "image",
            src: "/images/projects/amb/3.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.amb.media.4",
        },
        {
            type: "image",
            src: "/images/projects/amb/4.webp",
            width: 828,
            height: 1792,
            altKey: "pages.project.items.amb.media.5",
        },
        {
            type: "image",
            src: "/images/projects/amb/5.webp",
            width: 828,
            height: 1792,
            altKey: "pages.project.items.amb.media.6",
        },
    ],

    links: [
        {
            labelKey: "pages.project.items.amb.links.0",
            url: "https://mytexasgranite.american-biltrite.com/?lang=fr-CA",
        },
        {
            labelKey: "pages.project.items.amb.links.1",
            url: "https://mytexasgranite.american-biltrite.com/?lang=en-CA",
        },
    ],

    contentKey: "pages.project.items.amb",
} satisfies ProjectRecord;
