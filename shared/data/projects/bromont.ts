import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "bromont",
    title: "Bromont Interactive Map",
    client: "Bromont",
    year: 2022,

    contributions: [
        "artist3d",
        "frontenddeveloper",
        "webgldeveloper",
    ],

    tags: [
        "typescript",
        "vue",
        "sketchfab",
    ],

    hero: "/images/projects/bromont/0.webp",

    media: [
        {
            type: "video",
            src: "/images/projects/bromont/showcase.webm",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.bromont.media.0",
            poster: "/images/projects/bromont/0.webp",
        },
        {
            type: "image",
            src: "/images/projects/bromont/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.bromont.media.1",
        },
        {
            type: "image",
            src: "/images/projects/bromont/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.bromont.media.2",
        },
        {
            type: "image",
            src: "/images/projects/bromont/2.webp",
            width: 398,
            height: 854,
            altKey: "pages.project.items.bromont.media.3",
        },
        {
            type: "image",
            src: "/images/projects/bromont/3.webp",
            width: 397,
            height: 854,
            altKey: "pages.project.items.bromont.media.4",
        },
        {
            type: "image",
            src: "/images/projects/bromont/4.webp",
            width: 398,
            height: 853,
            altKey: "pages.project.items.bromont.media.5",
        },
    ],

    links: [
        {
            labelKey: "pages.project.items.bromont.links.0",
            url: "https://www.bromontmontagne.com/cartes-de-la-montagne/",
        },
    ],

    contentKey: "pages.project.items.bromont",
} satisfies ProjectRecord;
