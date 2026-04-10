enum EDeck {
    FRONTEND_DEV = "frontenddev",
    GENERALIST_3D = "generalist3d",
    UI_UX_DESIGNER = "uiuxdesigner",
    GAME_DEV = "gamedev",
    PROGRAMMER = "programmer",
}

enum ETool {
    NUXT = "nuxt",
    TAILWIND_CSS = "tailwindcss",
    THREE_JS = "threejs",
    BLENDER = "blender",
    SUBSTANCE_PAINTER = "substancepainter",
    HOUDINI = "houdini",
    FIGMA = "figma",
    // ADOBE_XD = "adobexd",
    UNREAL_ENGINE = "unrealengine",
    UNITY = "unity",
    P5_JS = "p5js",
    GDEVELOP = "gdevelop",
    VUE = "vue",
    SKETCHFAB = "sketchfab",
    ANIME_JS = "animejs",

    TYPESCRIPT = "typescript",
    // TYPESCRIPT_NODE = "typescriptnode",
    JAVASCRIPT = "javascript",
    // JAVASCRIPT_NODE = "javascriptnode",
    CPP = "cpp",
    CPP_UNREAL = "cppunreal",
    CSHARP = "csharp",
    // PYTHON = "python",
    // PYTHON_BLENDER = "pythonblender",
}

enum ERole {
    ARTIST_3D = "artist3d",
    UI_UX_DESIGNER = "uiuxdesigner",
    FRONTEND_DEVELOPER = "frontenddeveloper",
    WEBGL_DEVELOPER = "webgldeveloper",
    GAME_DEVELOPER = "gamedeveloper",
    PROGRAMMER = "programmer",
}

interface ToolDefinition {
    id: ETool;
    name: string;
}

interface RoleDefinition {
    id: ERole;
    name: string;
}

interface DeckDefinition {
    id: EDeck;
    image: string;
    label: string;
    description: string;
    tools: ETool[];
}

interface ProjectDefinition {
    /** The path to the project page. */
    path: string;
    /** The slug of the project, used for routing and as a unique identifier. */
    slug: string;
    /** The decks associated with the project. */
    decks: EDeck[];
    /** Whether the project is featured or not. Featured projects are highlighted in the UI and can be used to showcase specific projects. */
    featured: boolean;
    /** The name of the project. */
    name: string;
    /** The year the project was completed. */
    year: string;
    /** The tools used in the project. */
    tools: ETool[];
    /** The roles played in the project. */
    roles: ERole[];
    /** A detailed description of the project. */
    about: string;
    /** The cover image used for card. */
    cover: string;
    /** The assets associated with the project, can be images or videos. */
    assets: { type: "video" | "image"; src: string }[];
    /** An optional link to the project, can be a live demo or a repository. */
    link?: { label: string; url: string }[];
}

export type ResolvedDeck = Omit<DeckDefinition, "tools"> & {
    tools: ToolDefinition[];
    projects: ProjectDefinition[];
};

export type ResolvedProject = Omit<ProjectDefinition, "decks" | "tools" | "roles"> & {
    /** The decks associated with the project. */
    decks: DeckDefinition[];
    /** The tools used in the project. */
    tools: ToolDefinition[];
    /** The roles played in the project. */
    roles: RoleDefinition[];
};

const tools: readonly ToolDefinition[] = [
    { id: ETool.NUXT, name: "tool.nuxt" },
    { id: ETool.TAILWIND_CSS, name: "tool.tailwindcss" },
    { id: ETool.THREE_JS, name: "tool.threejs" },
    { id: ETool.BLENDER, name: "tool.blender" },
    { id: ETool.SUBSTANCE_PAINTER, name: "tool.substancepainter" },
    { id: ETool.HOUDINI, name: "tool.houdini" },
    { id: ETool.FIGMA, name: "tool.figma" },
    // { id: ETool.ADOBE_XD, name: "tool.adobexd" },
    { id: ETool.UNREAL_ENGINE, name: "tool.unrealengine" },
    { id: ETool.UNITY, name: "tool.unity" },
    { id: ETool.P5_JS, name: "tool.p5js" },
    { id: ETool.GDEVELOP, name: "tool.gdevelop" },
    { id: ETool.VUE, name: "tool.vue" },
    { id: ETool.SKETCHFAB, name: "tool.sketchfab" },
    { id: ETool.TYPESCRIPT, name: "tool.typescript" },
    // { id: ETool.TYPESCRIPT_NODE, name: "tool.typescriptnode" },
    { id: ETool.JAVASCRIPT, name: "tool.javascript" },
    // { id: ETool.JAVASCRIPT_NODE, name: "tool.javascriptnode" },
    { id: ETool.CPP, name: "tool.cpp" },
    { id: ETool.CPP_UNREAL, name: "tool.cppunreal" },
    { id: ETool.CSHARP, name: "tool.csharp" },
    // { id: ETool.PYTHON, name: "tool.python" },
    // { id: ETool.PYTHON_BLENDER, name: "tool.pythonblender" },
    { id: ETool.ANIME_JS, name: "tool.animejs" },
];

const roles: readonly RoleDefinition[] = [
    { id: ERole.ARTIST_3D, name: "role.artist3d" },
    { id: ERole.UI_UX_DESIGNER, name: "role.uiuxdesigner" },
    { id: ERole.FRONTEND_DEVELOPER, name: "role.frontenddeveloper" },
    { id: ERole.WEBGL_DEVELOPER, name: "role.webgldeveloper" },
    { id: ERole.GAME_DEVELOPER, name: "role.gamedeveloper" },
    { id: ERole.PROGRAMMER, name: "role.programmer" },
];

const decks: readonly DeckDefinition[] = [
    {
        id: EDeck.FRONTEND_DEV,
        image: "/images/decks/deck_frontend.webp",
        label: "deck.frontenddev.label",
        description: "deck.frontenddev.description",
        tools: [ETool.NUXT, ETool.TAILWIND_CSS, ETool.THREE_JS],
    },
    {
        id: EDeck.GENERALIST_3D,
        image: "/images/decks/deck_generalist_3d.webp",
        label: "deck.generalist3d.label",
        description: "deck.generalist3d.description",
        tools: [ETool.BLENDER, ETool.SUBSTANCE_PAINTER, ETool.HOUDINI],
    },
    {
        id: EDeck.UI_UX_DESIGNER,
        image: "/images/decks/deck_designer.webp",
        label: "deck.uiuxdesigner.label",
        description: "deck.uiuxdesigner.description",
        tools: [ETool.FIGMA],
    },
    {
        id: EDeck.GAME_DEV,
        image: "/images/decks/deck_gamedev.webp",
        label: "deck.gamedev.label",
        description: "deck.gamedev.description",
        tools: [ETool.UNREAL_ENGINE],
    },
    {
        id: EDeck.PROGRAMMER,
        image: "/images/decks/deck_prog.webp",
        label: "deck.programmer.label",
        description: "deck.programmer.description",
        tools: [ETool.TYPESCRIPT, ETool.CPP],
    },
];

const projects: readonly ProjectDefinition[] = [
    {
        path: "/project/amb/",
        slug: "amb",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER],
        featured: false,
        name: "American Biltrite",
        year: "2024",
        tools: [ETool.VUE, ETool.TYPESCRIPT],
        roles: [ERole.FRONTEND_DEVELOPER, ERole.UI_UX_DESIGNER],
        about: "[PIXISTUDIO] I co-developed an interactive web experience for American Biltrite, a company specializing in commercial flooring solutions. The project features a 2D tile configurator with user authentication, enabling users to create, customize, and save their own floor designs.\nI was responsible for the UI/UX design and frontend development, including building the interface with Vue, implementing localization and support for mobile devices.",
        cover: "/images/projects/amb/0.webp",
        assets: [
            { type: "video", src: "/images/projects/amb/showcase.webm" },
            { type: "image", src: "/images/projects/amb/0.webp" },
            { type: "image", src: "/images/projects/amb/1.webp" },
            { type: "image", src: "/images/projects/amb/2.webp" },
            { type: "image", src: "/images/projects/amb/3.webp" },
            { type: "image", src: "/images/projects/amb/4.webp" },
            { type: "image", src: "/images/projects/amb/5.webp" },
        ],
        link: [
            { label: "Live (Français)", url: "https://mytexasgranite.american-biltrite.com/?lang=fr-CA" },
            { label: "Live (English)", url: "https://mytexasgranite.american-biltrite.com/?lang=en-CA" },
        ],
    },
    {
        path: "/project/amie/",
        slug: "amie",
        decks: [EDeck.GAME_DEV, EDeck.PROGRAMMER],
        featured: false,
        name: "Amie",
        year: "2018",
        tools: [ETool.UNREAL_ENGINE, ETool.CPP],
        roles: [ERole.ARTIST_3D, ERole.PROGRAMMER],
        about: "Amie is a real time interactive artwork entirely done inside Unreal Engine that generates abstract 3D environments based on the user’s visual appearance. Each person is offered a unique render by using a custom C++ video software that detects their outfit’s colors and differentiate the most prominent ones from the less prominent ones. My work was granted the “Most Outstanding” title for my Cegep’s final exhibition.",
        cover: "/images/projects/amie/0.jpg",
        assets: [
            { type: "video", src: "/images/projects/amie/showcase.mp4" },
            { type: "image", src: "/images/projects/amie/0.jpg" },
            { type: "image", src: "/images/projects/amie/1.jpg" },
            { type: "image", src: "/images/projects/amie/2.jpg" },
            { type: "image", src: "/images/projects/amie/3.jpg" },
            { type: "image", src: "/images/projects/amie/4.jpg" },
            { type: "image", src: "/images/projects/amie/5.jpg" },
            { type: "image", src: "/images/projects/amie/6.jpg" },
            { type: "image", src: "/images/projects/amie/7.jpg" },
            { type: "image", src: "/images/projects/amie/8.jpg" },
            { type: "image", src: "/images/projects/amie/9.jpg" },
            { type: "image", src: "/images/projects/amie/10.jpg" },
        ],
    },
    {
        path: "/project/bromont/",
        slug: "bromont",
        decks: [EDeck.FRONTEND_DEV],
        featured: false,
        name: "Bromont",
        year: "2022",
        tools: [ETool.TYPESCRIPT, ETool.VUE, ETool.SKETCHFAB],
        roles: [ERole.ARTIST_3D, ERole.FRONTEND_DEVELOPER, ERole.WEBGL_DEVELOPER],
        about: "[PIXISTUDIO] I co-developed an interactive web experience for Bromont Ski Resort, designed to visualize their ski slopes in a 3D environment and get information about the different areas. The project features a 3D map of the ski resort that can be manipulated in real-time.\nI was responsible for the 3D integration, frontend development, and UI/UX design, including building the interactive map in Sketchfab, and implementing a responsive Vue interface for both desktop and mobile users.",
        cover: "/images/projects/bromont/0.webp",
        assets: [
            { type: "video", src: "/images/projects/bromont/showcase.webm" },
            { type: "image", src: "/images/projects/bromont/0.webp" },
            { type: "image", src: "/images/projects/bromont/1.webp" },
            { type: "image", src: "/images/projects/bromont/2.webp" },
            { type: "image", src: "/images/projects/bromont/3.webp" },
            { type: "image", src: "/images/projects/bromont/4.webp" },
        ],
        link: [
            { label: "Live", url: "https://www.bromontmontagne.com/cartes-de-la-montagne/" },
        ],
    },
    {
        path: "/project/cloner/",
        slug: "cloner",
        decks: [EDeck.GENERALIST_3D],
        featured: false,
        name: "Cloner",
        year: "2020",
        tools: [ETool.BLENDER],
        roles: [ERole.ARTIST_3D],
        about: "Cloner is a personal spaceship design that I worked on during the pandemic era. I created this model entirely inside Blender as a way to explore new styles and refine my 3D abilities. The final result showcases some complex modelling techniques such as hard surface and subdivision modelling as well as some of my composition and rendering knowledge.",
        cover: "/images/projects/cloner/0.jpg",
        assets: [
            { type: "video", src: "/images/projects/cloner/showcase.mp4" },
            { type: "image", src: "/images/projects/cloner/0.jpg" },
            { type: "image", src: "/images/projects/cloner/1.jpg" },
            { type: "image", src: "/images/projects/cloner/2.jpg" },
            { type: "image", src: "/images/projects/cloner/3.jpg" },
            { type: "image", src: "/images/projects/cloner/4.jpg" },
        ],
    },
    {
        path: "/project/cyberblade/",
        slug: "cyberblade",
        decks: [EDeck.GENERALIST_3D, EDeck.GAME_DEV],
        featured: false,
        name: "Cyberblade",
        year: "2020",
        tools: [ETool.BLENDER, ETool.SUBSTANCE_PAINTER],
        roles: [ERole.ARTIST_3D],
        about: "Cyberblade is an experimenation I did for game assets. Conceptually, the sword is divided into three tiers to create a hierarchy of power that can easily be characterised by their visual complexity. Based on my design, I modelled, retopologized and rendered the swords in Blender and used Substance Painter for the textures. The final result is an Unreal Engine asset ready for deployment.",
        cover: "/images/projects/cyberblade/0.jpg",
        assets: [
            { type: "video", src: "/images/projects/cyberblade/showcase.mp4" },
            { type: "image", src: "/images/projects/cyberblade/0.jpg" },
            { type: "image", src: "/images/projects/cyberblade/1.jpg" },
            { type: "image", src: "/images/projects/cyberblade/2.jpg" },
            { type: "image", src: "/images/projects/cyberblade/3.jpg" },
            { type: "image", src: "/images/projects/cyberblade/4.jpg" },
            { type: "image", src: "/images/projects/cyberblade/5.jpg" },
            { type: "image", src: "/images/projects/cyberblade/6.jpg" },
            { type: "image", src: "/images/projects/cyberblade/7.jpg" },
        ],
    },
    {
        path: "/project/ecd/",
        slug: "ecd",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER],
        featured: false,
        name: "ECD",
        year: "2023",
        tools: [ETool.VUE, ETool.SKETCHFAB, ETool.TYPESCRIPT],
        roles: [ERole.FRONTEND_DEVELOPER, ERole.UI_UX_DESIGNER, ERole.ARTIST_3D],
        about: "[PIXISTUDIO] I co-developed an interactive 3D configurator made for ECD, a company that specializes in restauration of classic cars. The project allows users to customize their own car with different colors and materials and to visualize it in a 3D environment. It features URL caching and quote generation via a summary. The 3D models were created by ECD's team and I was responsible for the UI/UX design and frontend development, including building the interface with Vue and support for mobile devices.",
        cover: "/images/projects/ecd/3.webp",
        assets: [
            { type: "video", src: "/images/projects/ecd/showcase.webm" },
            { type: "image", src: "/images/projects/ecd/0.webp" },
            { type: "image", src: "/images/projects/ecd/1.webp" },
            { type: "image", src: "/images/projects/ecd/2.webp" },
            { type: "image", src: "/images/projects/ecd/3.webp" },
            { type: "image", src: "/images/projects/ecd/4.webp" },
            { type: "image", src: "/images/projects/ecd/5.webp" },
        ],
        link: [
            { label: "Live", url: "https://configurator.ecdautodesign.com/?v=D90&o=" },
        ],
    },
    {
        path: "/project/feltkutur/",
        slug: "feltkutur",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER],
        featured: true,
        name: "FeltKutur",
        year: "2022",
        tools: [ETool.NUXT, ETool.THREE_JS, ETool.TYPESCRIPT],
        roles: [ERole.FRONTEND_DEVELOPER, ERole.UI_UX_DESIGNER, ERole.WEBGL_DEVELOPER],
        about: "[PIXISTUDIO] I co-developed an interactive 3D configurator made for FeltKutur, a company that creates custom felt products. The configurator allows users to customize their own environment with diverse felt products and/or complementary elements. It features multiselection, adaptive properties panel, a tile editor, pdf generation and more. I was responsible for the UI/UX design and frontend development, including building the interface with Nuxt, implementing the 3D rendering with Three.js, support for mobile devices and localization.",
        cover: "/images/projects/feltkutur/1.webp",
        assets: [
            { type: "video", src: "/images/projects/feltkutur/showcase.webm" },
            { type: "image", src: "/images/projects/feltkutur/0.webp" },
            { type: "image", src: "/images/projects/feltkutur/1.webp" },
            { type: "image", src: "/images/projects/feltkutur/2.webp" },
            { type: "image", src: "/images/projects/feltkutur/3.webp" },
            { type: "image", src: "/images/projects/feltkutur/4.webp" },
            { type: "image", src: "/images/projects/feltkutur/5.webp" },
            { type: "image", src: "/images/projects/feltkutur/6.webp" },
            { type: "image", src: "/images/projects/feltkutur/7.webp" },
            { type: "image", src: "/images/projects/feltkutur/8.webp" },
        ],
        link: [
            { label: "Live", url: "https://feltkutur.com/fr/configurateur-3d/" },
        ],
    },
    {
        path: "/project/grownshrink/",
        slug: "grownshrink",
        decks: [EDeck.GAME_DEV, EDeck.PROGRAMMER],
        featured: false,
        name: "GrowNShrink",
        year: "2020",
        tools: [ETool.UNITY, ETool.CSHARP],
        roles: [ERole.GAME_DEVELOPER, ERole.PROGRAMMER],
        about: "GrowNShrink is a small game prototype I made using Unity. The gameplay is based on a growing and shrinking mechanic that can be used to solve puzzles. This project was a playground for me to learn Unity and C# and to experiment with different gameplay ideas.",
        cover: "/images/projects/grownshrink/2.webp",
        assets: [
            { type: "video", src: "/images/projects/grownshrink/showcase.webm" },
            { type: "image", src: "/images/projects/grownshrink/0.webp" },
            { type: "image", src: "/images/projects/grownshrink/1.webp" },
            { type: "image", src: "/images/projects/grownshrink/2.webp" },
        ],
    },
    {
        path: "/project/identity/",
        slug: "identity",
        decks: [EDeck.GENERALIST_3D],
        featured: false,
        name: "Identity",
        year: "2020",
        tools: [ETool.BLENDER, ETool.HOUDINI],
        roles: [ERole.ARTIST_3D],
        about: "Identity is a research paper that criticises and interrogates the modern identity of visual effects by answering the question : “What defines a compelling digital visual effect for storytelling cinema ?” As someone who likes criticising movies and games for the quality of their visual effects, I had an enriching time constraining my result to only three major points : Subtlety, Immersion and Cognitive Dissonance. To better illustrate the outcome of the research, I elaborated three short animations using Blender and Houdini to encapsulate each aspect more precisely.",
        cover: "/images/projects/identity/0.jpg",
        assets: [
            { type: "video", src: "/images/projects/identity/showcase.mp4" },
            { type: "video", src: "/images/projects/identity/video_0.mp4" },
            { type: "video", src: "/images/projects/identity/video_1.mp4" },
            { type: "video", src: "/images/projects/identity/video_2.mp4" },
            { type: "image", src: "/images/projects/identity/0.jpg" },
            { type: "image", src: "/images/projects/identity/1.jpg" },
            { type: "image", src: "/images/projects/identity/2.jpg" },
            { type: "image", src: "/images/projects/identity/3.jpg" },
            { type: "image", src: "/images/projects/identity/4.jpg" },
        ],
    },
    {
        path: "/project/living-typo/",
        slug: "living-typo",
        decks: [EDeck.PROGRAMMER],
        featured: false,
        name: "Living Typo",
        year: "2020",
        tools: [ETool.JAVASCRIPT, ETool.P5_JS],
        roles: [ERole.PROGRAMMER],
        about: "Living Typo is project that aims to explore the relationship between language and generative art. The project consists of recreating an organic language development process by using simple behaviors and logics, giving a high level glimpse of how language could evolved when left to A.I. To learn more about the thought process behind the project, you can check out the github repository.",
        cover: "/images/projects/living-typo/2.webp",
        assets: [
            { type: "video", src: "/images/projects/living-typo/showcase.webm" },
            { type: "image", src: "/images/projects/living-typo/0.webp" },
            { type: "image", src: "/images/projects/living-typo/1.webp" },
            { type: "image", src: "/images/projects/living-typo/2.webp" },
            { type: "image", src: "/images/projects/living-typo/3.webp" },
        ],
        link: [
            { label: "Demo", url: "https://levieuxsinge.github.io/CodingExperiments/LivingTypo/" },
            { label: "Github", url: "https://github.com/LeVieuxSinge/CodingExperiments/tree/master/LivingTypo" },
        ],
    },
    {
        path: "/project/monologue/",
        slug: "monologue",
        decks: [EDeck.GENERALIST_3D],
        featured: false,
        name: "Monologue",
        year: "2020",
        tools: [ETool.BLENDER],
        roles: [ERole.ARTIST_3D],
        about: "Monologue is an animated version of Rutger Hauer's Tears in the rain monologue he performed for the movie Blade Runner (1984). The original design of the head comes from Roman Semenenko's collection (ArtStation - Roman Semenenko). Everything was executed inside Blender, from the initial sculpt and retopology to the final animated and textured render.",
        cover: "/images/projects/monologue/0.jpg",
        assets: [
            { type: "video", src: "/images/projects/monologue/showcase.mp4" },
            { type: "video", src: "/images/projects/monologue/video.mp4" },
            { type: "image", src: "/images/projects/monologue/0.jpg" },
            { type: "image", src: "/images/projects/monologue/1.jpg" },
            { type: "image", src: "/images/projects/monologue/2.jpg" },
        ],
    },
    {
        path: "/project/portfoliov1/",
        slug: "portfoliov1",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER, EDeck.GENERALIST_3D],
        featured: false,
        name: "Portfolio V1",
        year: "2021",
        tools: [ETool.BLENDER, ETool.NUXT, ETool.THREE_JS, ETool.JAVASCRIPT],
        roles: [ERole.ARTIST_3D, ERole.UI_UX_DESIGNER, ERole.FRONTEND_DEVELOPER, ERole.WEBGL_DEVELOPER],
        about: "Portfolio V1 is the first version of my portfolio website. It showcases my early web skills and was used as a playgound for Nuxt and Animejs. The 3D assets were created in Blender and the UI/UX design was done in Adobe XD.",
        cover: "/images/projects/portfoliov1/0.webp",
        assets: [
            { type: "video", src: "/images/projects/portfoliov1/showcase.webm" },
            { type: "image", src: "/images/projects/portfoliov1/0.webp" },
            { type: "image", src: "/images/projects/portfoliov1/1.webp" },
            { type: "image", src: "/images/projects/portfoliov1/2.webp" },
            { type: "image", src: "/images/projects/portfoliov1/3.webp" },
            { type: "image", src: "/images/projects/portfoliov1/4.webp" },
            { type: "image", src: "/images/projects/portfoliov1/5.webp" },
            { type: "image", src: "/images/projects/portfoliov1/6.webp" },
            { type: "image", src: "/images/projects/portfoliov1/7.webp" },
            { type: "image", src: "/images/projects/portfoliov1/8.webp" },
            { type: "image", src: "/images/projects/portfoliov1/9.webp" },
            { type: "image", src: "/images/projects/portfoliov1/10.webp" },
            { type: "image", src: "/images/projects/portfoliov1/11.webp" },
            { type: "image", src: "/images/projects/portfoliov1/12.webp" },
            { type: "image", src: "/images/projects/portfoliov1/13.webp" },
        ],
    },
    {
        path: "/project/portfoliov2/",
        slug: "portfoliov2",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER, EDeck.GENERALIST_3D],
        featured: true,
        name: "Portfolio V2",
        year: "2026",
        tools: [ETool.BLENDER, ETool.NUXT, ETool.THREE_JS, ETool.TYPESCRIPT, ETool.FIGMA, ETool.TAILWIND_CSS, ETool.ANIME_JS],
        roles: [ERole.ARTIST_3D, ERole.UI_UX_DESIGNER, ERole.FRONTEND_DEVELOPER, ERole.WEBGL_DEVELOPER],
        about: "Portfolio V2 is the current version of my portfolio website. It showcases my improved web skills and was used as a playground for Nuxt, Animejs, and other modern web technologies. The 3D assets were created in Blender and the UI/UX design was done in Figma.",
        cover: "/images/projects/portfoliov2/0.webp",
        assets: [
            { type: "image", src: "/images/projects/portfoliov2/1.webp" },
        ],
        link: [
            { label: "Code", url: "https://github.com/LeVieuxSinge/Portfolio" },
        ],
    },
    {
        path: "/project/ryker/",
        slug: "ryker",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER],
        featured: false,
        name: "Ryker",
        year: "2023",
        tools: [ETool.VUE, ETool.SKETCHFAB, ETool.JAVASCRIPT],
        roles: [ERole.UI_UX_DESIGNER, ERole.FRONTEND_DEVELOPER],
        about: "[PIXISTUDIO] I co-developed this proof of concept at Pixistudio in order to showcase a more dynamic and fresh approach to interactive 3D configurator. This project features a dynamic pricing, an animated entry and loading page and a complex configuration logic. I was responsible for the UI/UX design and frontend development, including building the interface with Vue, implementing the 3D model and adding support for mobile devices.",
        cover: "/images/projects/ryker/0.webp",
        assets: [
            { type: "video", src: "/images/projects/ryker/showcase.webm" },
            { type: "image", src: "/images/projects/ryker/0.webp" },
            { type: "image", src: "/images/projects/ryker/1.webp" },
            { type: "image", src: "/images/projects/ryker/2.webp" },
            { type: "image", src: "/images/projects/ryker/3.webp" },
            { type: "image", src: "/images/projects/ryker/4.webp" },
            { type: "image", src: "/images/projects/ryker/5.webp" },
            { type: "image", src: "/images/projects/ryker/6.webp" },
            { type: "image", src: "/images/projects/ryker/7.webp" },
        ],
    },
    {
        path: "/project/schluter/",
        slug: "schluter",
        decks: [EDeck.GAME_DEV, EDeck.PROGRAMMER],
        featured: true,
        name: "Schluter",
        year: "2021",
        tools: [ETool.UNREAL_ENGINE, ETool.CPP_UNREAL],
        roles: [ERole.ARTIST_3D, ERole.GAME_DEVELOPER, ERole.PROGRAMMER, ERole.UI_UX_DESIGNER],
        about: "[PIXISTUDIO] I co-developed this custom experience for showing the results of Schluter's prioritary products compared to traditional methods. The experience is designed to be used in Schluter's showrooms and allows real time visualization of the installed product in a bathroom. It features high quality rendering, x-ray visualization, and high-res captures. I was responsible of integrating the 3D models and shaders as well as create the logic and UI/UX.",
        cover: "/images/projects/schluter/7.webp",
        assets: [
            { type: "video", src: "/images/projects/schluter/showcase.webm" },
            { type: "image", src: "/images/projects/schluter/0.webp" },
            { type: "image", src: "/images/projects/schluter/1.webp" },
            { type: "image", src: "/images/projects/schluter/2.webp" },
            { type: "image", src: "/images/projects/schluter/3.webp" },
            { type: "image", src: "/images/projects/schluter/4.webp" },
            { type: "image", src: "/images/projects/schluter/5.webp" },
            { type: "image", src: "/images/projects/schluter/6.webp" },
            { type: "image", src: "/images/projects/schluter/7.webp" },
            { type: "image", src: "/images/projects/schluter/8.webp" },
        ],
    },
    {
        path: "/project/simona/",
        slug: "simona",
        decks: [EDeck.FRONTEND_DEV, EDeck.UI_UX_DESIGNER],
        featured: true,
        name: "Simona",
        year: "2022",
        tools: [ETool.SKETCHFAB, ETool.TYPESCRIPT, ETool.NUXT],
        roles: [ERole.FRONTEND_DEVELOPER, ERole.UI_UX_DESIGNER],
        about: "[PIXISTUDIO] I co-developed this series of 3D web configurators made for Simona to showcase their products in a more interactive way. The configurators allow users to customize the products with different colors and materials and to visualize them in a 3D environment. I was responsible for the UI/UX design and frontend development, including building the interface with Nuxt, implementing the 3D rendering with Sketchfab and adding support for mobile devices.",
        cover: "/images/projects/simona/4.webp",
        assets: [
            { type: "video", src: "/images/projects/simona/showcase.webm" },
            { type: "image", src: "/images/projects/simona/0.webp" },
            { type: "image", src: "/images/projects/simona/1.webp" },
            { type: "image", src: "/images/projects/simona/2.webp" },
            { type: "image", src: "/images/projects/simona/3.webp" },
            { type: "image", src: "/images/projects/simona/4.webp" },
            { type: "image", src: "/images/projects/simona/5.webp" },
            { type: "image", src: "/images/projects/simona/6.webp" },
        ],
        link: [
            { label: "Live (Holster)", url: "https://boltaron.com/configurators/simona/holster/index.html/" },
            { label: "Live (Seat)", url: "https://boltaron.com/configurators/simona/aircraft_seat/index.html/" },
        ],
    },
    {
        path: "/project/tile-map-generator/",
        slug: "tile-map-generator",
        decks: [EDeck.PROGRAMMER, EDeck.GAME_DEV],
        featured: false,
        name: "Tile Map Generator",
        year: "2020",
        tools: [ETool.JAVASCRIPT, ETool.P5_JS],
        roles: [ERole.PROGRAMMER],
        about: "Tile Map Generator is a personal project that is designed to generate procedural tile-based video game map. The original code is written using Javascript however, it is purposely made to be easily re-coded in C++ or C#. Either it is for a dungeon crawling game or simply for designing environment layout, Tile Map Generator is compact, quick and endless. The algorithm works by creating a path between a start and an end position while keeping the maximum amount of tiles under a specific range.",
        cover: "/images/projects/tile-map-generator/0.jpg",
        assets: [
            { type: "video", src: "/images/projects/tile-map-generator/showcase.mp4" },
            { type: "video", src: "/images/projects/tile-map-generator/video.mp4" },
            { type: "image", src: "/images/projects/tile-map-generator/0.jpg" },
            { type: "image", src: "/images/projects/tile-map-generator/1.jpg" },
            { type: "image", src: "/images/projects/tile-map-generator/2.jpg" },
            { type: "image", src: "/images/projects/tile-map-generator/3.jpg" },
        ],
        link: [
            { label: "Demo", url: "https://levieuxsinge.github.io/CodingExperiments/TileMapGenerator/" },
        ],
    },
    {
        path: "/project/unstable/",
        slug: "unstable",
        decks: [EDeck.PROGRAMMER, EDeck.GAME_DEV],
        featured: false,
        name: "Unstable",
        year: "2020",
        tools: [ETool.JAVASCRIPT, ETool.GDEVELOP],
        roles: [ERole.GAME_DEVELOPER, ERole.PROGRAMMER],
        about: "Unstable is small 1v1 fighting game I did during school. It features procedural levels, sounds, multiplayer inputs and a high mobility gameplay inspired by games such as Super Smash Bros.",
        cover: "/images/projects/unstable/cover.webp",
        assets: [
            { type: "video", src: "/images/projects/unstable/showcase.webm" },
            { type: "image", src: "/images/projects/unstable/0.webp" },
            { type: "image", src: "/images/projects/unstable/1.webp" },
            { type: "image", src: "/images/projects/unstable/2.webp" },
            { type: "image", src: "/images/projects/unstable/3.webp" },
        ],
    },
];

const resolvedProjects: readonly ResolvedProject[] = projects.map((project) => {
    const projectDecks = decks.filter(deck => project.decks.includes(deck.id)).sort((a, b) => project.decks.indexOf(a.id) - project.decks.indexOf(b.id));
    const projectTools = tools.filter(tool => project.tools.includes(tool.id)).sort((a, b) => project.tools.indexOf(a.id) - project.tools.indexOf(b.id));
    const projectRoles = roles.filter(role => project.roles.includes(role.id)).sort((a, b) => project.roles.indexOf(a.id) - project.roles.indexOf(b.id));
    return { ...project, decks: projectDecks, tools: projectTools, roles: projectRoles };
});

const resolvedDecks: readonly ResolvedDeck[] = decks.map((deck) => {
    const deckTools = tools.filter(tool => deck.tools.includes(tool.id));
    const deckProjects = projects.filter(project => project.decks.includes(deck.id));
    return { ...deck, tools: deckTools, projects: deckProjects };
});

export function useProjectsData() {
    return { tools, roles, resolvedProjects, resolvedDecks };
}
