import type { ProjectRecord } from "../../types/portfolio.ts";

export default {
    slug: "unstable",
    title: "Unstable",
    client: "School",
    year: 2020,
    contributions: [
        "gamedeveloper",
        "programmer",
    ],
    tags: [
        "javascript",
        "gdevelop",
    ],
    hero: "/images/projects/unstable/cover.webp",
    media: [
        {
            type: "video",
            src: "/images/projects/unstable/showcase.webm",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.unstable.media.0",
            poster: "/images/projects/unstable/cover.webp",
        },
        {
            type: "image",
            src: "/images/projects/unstable/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.unstable.media.1",
        },
        {
            type: "image",
            src: "/images/projects/unstable/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.unstable.media.2",
        },
        {
            type: "image",
            src: "/images/projects/unstable/2.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.unstable.media.3",
        },
        {
            type: "image",
            src: "/images/projects/unstable/3.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.unstable.media.4",
        },
    ],
    links: [],
    contentKey: "pages.project.items.unstable",
} satisfies ProjectRecord;
