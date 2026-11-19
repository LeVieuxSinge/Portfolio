import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "identity",
    title: "Identity",
    client: "School",
    year: 2020,

    contributions: [
        "artist3d",
    ],

    tags: [
        "blender",
        "houdini",
    ],

    hero: "/images/projects/identity/0.jpg",

    media: [
        {
            type: "video",
            src: "/images/projects/identity/showcase.mp4",
            width: 1280,
            height: 720,
            altKey: "pages.project.items.identity.media.0",
            poster: "/images/projects/identity/0.jpg",
        },
        {
            type: "video",
            src: "/images/projects/identity/video_0.mp4",
            width: 1080,
            height: 1998,
            altKey: "pages.project.items.identity.media.1",
            poster: "/images/projects/identity/0.jpg",
        },
        {
            type: "video",
            src: "/images/projects/identity/video_1.mp4",
            width: 1080,
            height: 1998,
            altKey: "pages.project.items.identity.media.2",
            poster: "/images/projects/identity/0.jpg",
        },
        {
            type: "video",
            src: "/images/projects/identity/video_2.mp4",
            width: 1080,
            height: 1998,
            altKey: "pages.project.items.identity.media.3",
            poster: "/images/projects/identity/0.jpg",
        },
        {
            type: "image",
            src: "/images/projects/identity/0.jpg",
            width: 372,
            height: 474,
            altKey: "pages.project.items.identity.media.4",
        },
        {
            type: "image",
            src: "/images/projects/identity/1.jpg",
            width: 428,
            height: 768,
            altKey: "pages.project.items.identity.media.5",
        },
        {
            type: "image",
            src: "/images/projects/identity/2.jpg",
            width: 763,
            height: 523,
            altKey: "pages.project.items.identity.media.6",
        },
        {
            type: "image",
            src: "/images/projects/identity/3.jpg",
            width: 436,
            height: 711,
            altKey: "pages.project.items.identity.media.7",
        },
        {
            type: "image",
            src: "/images/projects/identity/4.jpg",
            width: 428,
            height: 766,
            altKey: "pages.project.items.identity.media.8",
        },
    ],

    links: [],

    contentKey: "pages.project.items.identity",
} satisfies ProjectRecord;
