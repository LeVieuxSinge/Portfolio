import type { ProjectRecord } from "../../types/portfolio.ts";

export default {
    slug: "living-typo",
    title: "Living Typo",
    client: "School",
    year: 2020,
    contributions: [
        "programmer",
    ],
    tags: [
        "javascript",
        "p5js",
    ],
    hero: "/images/projects/living-typo/2.webp",
    media: [
        {
            type: "video",
            src: "/images/projects/living-typo/showcase.webm",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.living-typo.media.0",
            poster: "/images/projects/living-typo/2.webp",
        },
        {
            type: "image",
            src: "/images/projects/living-typo/0.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.living-typo.media.1",
        },
        {
            type: "image",
            src: "/images/projects/living-typo/1.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.living-typo.media.2",
        },
        {
            type: "image",
            src: "/images/projects/living-typo/2.webp",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.living-typo.media.3",
        },
        {
            type: "image",
            src: "/images/projects/living-typo/3.webp",
            width: 1864,
            height: 986,
            altKey: "pages.project.items.living-typo.media.4",
        },
    ],
    links: [
        {
            labelKey: "pages.project.items.living-typo.links.0",
            url: "https://levieuxsinge.github.io/CodingExperiments/LivingTypo/",
        },
        {
            labelKey: "pages.project.items.living-typo.links.1",
            url: "https://github.com/LeVieuxSinge/CodingExperiments/tree/master/LivingTypo",
        },
    ],
    contentKey: "pages.project.items.living-typo",
} satisfies ProjectRecord;
