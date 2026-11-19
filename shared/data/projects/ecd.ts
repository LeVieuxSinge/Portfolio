import type { ProjectRecord } from "../../types/portfolio.ts";

export default {
    slug: "ecd",
    title: "ECD Car Configurator",
    client: "ECD",
    year: 2023,
    contributions: [
        "frontenddeveloper",
        "uiuxdesigner",
        "artist3d",
    ],
    tags: [
        "vue",
        "sketchfab",
        "typescript",
    ],
    hero: "/images/projects/ecd/0.webp",
    media: [
        {
            type: "video",
            src: "/images/projects/ecd/showcase.webm",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.ecd.media.0",
            poster: "/images/projects/ecd/0.webp",
        },
        {
            type: "image",
            src: "/images/projects/ecd/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.ecd.media.1",
        },
        {
            type: "image",
            src: "/images/projects/ecd/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.ecd.media.2",
        },
        {
            type: "image",
            src: "/images/projects/ecd/2.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.ecd.media.3",
        },
        {
            type: "image",
            src: "/images/projects/ecd/3.webp",
            width: 828,
            height: 1792,
            altKey: "pages.project.items.ecd.media.4",
        },
        {
            type: "image",
            src: "/images/projects/ecd/4.webp",
            width: 828,
            height: 1792,
            altKey: "pages.project.items.ecd.media.5",
        },
        {
            type: "image",
            src: "/images/projects/ecd/5.webp",
            width: 828,
            height: 1792,
            altKey: "pages.project.items.ecd.media.6",
        },
    ],
    links: [
        {
            labelKey: "pages.project.items.ecd.links.0",
            url: "https://configurator.ecdautodesign.com/?v=D90&o=",
        },
    ],
    contentKey: "pages.project.items.ecd",
} satisfies ProjectRecord;
