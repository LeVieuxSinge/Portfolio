import type { ProjectRecord } from "../../types/portfolio.ts";

/** Authored facts and source-ordered media; derived profiles are added by the catalog aggregator. */
export default {
    slug: "tile-map-generator",
    title: "Tile Map Generator",
    client: "Personal",
    year: 2020,

    contributions: [
        "programmer",
    ],

    tags: [
        "javascript",
        "p5js",
    ],

    hero: "/images/projects/tile-map-generator/0.jpg",

    media: [
        {
            type: "video",
            src: "/images/projects/tile-map-generator/showcase.mp4",
            width: 1280,
            height: 720,
            altKey: "pages.project.items.tile-map-generator.media.0",
            poster: "/images/projects/tile-map-generator/0.jpg",
        },
        {
            type: "video",
            src: "/images/projects/tile-map-generator/video.mp4",
            width: 1920,
            height: 1080,
            altKey: "pages.project.items.tile-map-generator.media.1",
            poster: "/images/projects/tile-map-generator/0.jpg",
        },
        {
            type: "image",
            src: "/images/projects/tile-map-generator/0.jpg",
            width: 1920,
            height: 976,
            altKey: "pages.project.items.tile-map-generator.media.2",
        },
        {
            type: "image",
            src: "/images/projects/tile-map-generator/1.jpg",
            width: 1919,
            height: 976,
            altKey: "pages.project.items.tile-map-generator.media.3",
        },
        {
            type: "image",
            src: "/images/projects/tile-map-generator/2.jpg",
            width: 1920,
            height: 977,
            altKey: "pages.project.items.tile-map-generator.media.4",
        },
        {
            type: "image",
            src: "/images/projects/tile-map-generator/3.jpg",
            width: 1919,
            height: 977,
            altKey: "pages.project.items.tile-map-generator.media.5",
        },
    ],

    links: [
        {
            labelKey: "pages.project.items.tile-map-generator.links.0",
            url: "https://levieuxsinge.github.io/CodingExperiments/TileMapGenerator/",
        },
    ],

    contentKey: "pages.project.items.tile-map-generator",
} satisfies ProjectRecord;
