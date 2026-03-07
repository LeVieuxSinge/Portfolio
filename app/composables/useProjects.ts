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
    ADOBE_XD = "adobexd",
    UNREAL_ENGINE = "unrealengine",
    P5_JS = "p5js",

    TYPESCRIPT = "typescript",
    TYPESCRIPT_NODE = "typescriptnode",
    JAVASCRIPT = "javascript",
    JAVASCRIPT_NODE = "javascriptnode",
    CPP = "cpp",
    CPP_UNREAL = "cppunreal",
    PYTHON = "python",
    PYTHON_BLENDER = "pythonblender",
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
    link?: string;
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
    { id: ETool.ADOBE_XD, name: "tool.adobexd" },
    { id: ETool.UNREAL_ENGINE, name: "tool.unrealengine" },
    { id: ETool.P5_JS, name: "tool.p5js" },
    { id: ETool.TYPESCRIPT, name: "tool.typescript" },
    { id: ETool.TYPESCRIPT_NODE, name: "tool.typescriptnode" },
    { id: ETool.JAVASCRIPT, name: "tool.javascript" },
    { id: ETool.JAVASCRIPT_NODE, name: "tool.javascriptnode" },
    { id: ETool.CPP, name: "tool.cpp" },
    { id: ETool.CPP_UNREAL, name: "tool.cppunreal" },
    { id: ETool.PYTHON, name: "tool.python" },
    { id: ETool.PYTHON_BLENDER, name: "tool.pythonblender" },
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
        image: "/images/decks/frontenddev.jpg",
        label: "deck.frontenddev.label",
        description: "deck.frontenddev.description",
        tools: [ETool.NUXT, ETool.TAILWIND_CSS, ETool.THREE_JS],
    },
    {
        id: EDeck.GENERALIST_3D,
        image: "/images/decks/generalist3d.jpg",
        label: "deck.generalist3d.label",
        description: "deck.generalist3d.description",
        tools: [ETool.BLENDER, ETool.SUBSTANCE_PAINTER, ETool.HOUDINI],
    },
    {
        id: EDeck.UI_UX_DESIGNER,
        image: "/images/decks/uiuxdesigner.jpg",
        label: "deck.uiuxdesigner.label",
        description: "deck.uiuxdesigner.description",
        tools: [ETool.FIGMA, ETool.ADOBE_XD],
    },
    {
        id: EDeck.GAME_DEV,
        image: "/images/decks/gamedev.jpg",
        label: "deck.gamedev.label",
        description: "deck.gamedev.description",
        tools: [ETool.UNREAL_ENGINE],
    },
    {
        id: EDeck.PROGRAMMER,
        image: "/images/decks/programmer.jpg",
        label: "deck.programmer.label",
        description: "deck.programmer.description",
        tools: [ETool.TYPESCRIPT, ETool.CPP, ETool.PYTHON],
    },
];

const projects: readonly ProjectDefinition[] = [
    {
        path: "/project/amie/",
        slug: "amie",
        decks: [EDeck.GAME_DEV, EDeck.PROGRAMMER],
        featured: true, // ! For demo purposes
        name: "Amie",
        year: "2018",
        tools: [ETool.UNREAL_ENGINE, ETool.CPP],
        roles: [ERole.ARTIST_3D, ERole.PROGRAMMER],
        about: "Amie is a real time interactive artwork entirely done inside Unreal Engine that generates abstract 3D environments based on the user’s visual appearance. Each person is offered a unique render by using a custom C++ video software that detects their outfit’s colors and differentiate the most prominent ones from the less prominent ones. My work was granted the “Most Outstanding” title for my Cegep’s final exhibition.",
        cover: "/images/amie/0.jpg",
        assets: [
            { type: "video", src: "/images/amie/showcase.mp4" },
            { type: "image", src: "/images/amie/0.jpg" },
            { type: "image", src: "/images/amie/1.jpg" },
            { type: "image", src: "/images/amie/2.jpg" },
            { type: "image", src: "/images/amie/3.jpg" },
            { type: "image", src: "/images/amie/4.jpg" },
            { type: "image", src: "/images/amie/5.jpg" },
            { type: "image", src: "/images/amie/6.jpg" },
            { type: "image", src: "/images/amie/7.jpg" },
            { type: "image", src: "/images/amie/8.jpg" },
            { type: "image", src: "/images/amie/9.jpg" },
            { type: "image", src: "/images/amie/10.jpg" },
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
        cover: "/images/cloner/0.jpg",
        assets: [
            { type: "video", src: "/images/cloner/showcase.mp4" },
            { type: "image", src: "/images/cloner/0.jpg" },
            { type: "image", src: "/images/cloner/1.jpg" },
            { type: "image", src: "/images/cloner/2.jpg" },
            { type: "image", src: "/images/cloner/3.jpg" },
            { type: "image", src: "/images/cloner/4.jpg" },
        ],
    },
    {
        path: "/project/cyberblade/",
        slug: "cyberblade",
        decks: [EDeck.GENERALIST_3D, EDeck.GAME_DEV],
        featured: false,
        name: "Cyberblade",
        year: "2020",
        tools: [ETool.BLENDER],
        roles: [ERole.ARTIST_3D],
        about: "Cyberblade is part of a series of game assets I'm working on for my own indie game. Conceptually, the sword is divided into three tiers to create a hierarchy of power that can easily be characterised by their visual complexity. Based on my design, I modelled, retopologized and rendered the swords in Blender and used Substance Painter for the textures. The final result is an Unreal Engine asset ready for deployment.",
        cover: "/images/cyberblade/0.jpg",
        assets: [
            { type: "video", src: "/images/cyberblade/showcase.mp4" },
            { type: "image", src: "/images/cyberblade/0.jpg" },
            { type: "image", src: "/images/cyberblade/1.jpg" },
            { type: "image", src: "/images/cyberblade/2.jpg" },
            { type: "image", src: "/images/cyberblade/3.jpg" },
            { type: "image", src: "/images/cyberblade/4.jpg" },
            { type: "image", src: "/images/cyberblade/5.jpg" },
            { type: "image", src: "/images/cyberblade/6.jpg" },
            { type: "image", src: "/images/cyberblade/7.jpg" },
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
        cover: "/images/identity/0.jpg",
        assets: [
            { type: "video", src: "/images/identity/showcase.mp4" },
            { type: "video", src: "/images/identity/video_0.mp4" },
            { type: "video", src: "/images/identity/video_1.mp4" },
            { type: "video", src: "/images/identity/video_2.mp4" },
            { type: "image", src: "/images/identity/0.jpg" },
            { type: "image", src: "/images/identity/1.jpg" },
            { type: "image", src: "/images/identity/2.jpg" },
            { type: "image", src: "/images/identity/3.jpg" },
            { type: "image", src: "/images/identity/4.jpg" },
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
        cover: "/images/monologue/0.jpg",
        assets: [
            { type: "video", src: "/images/monologue/showcase.mp4" },
            { type: "video", src: "/images/monologue/video.mp4" },
            { type: "image", src: "/images/monologue/0.jpg" },
            { type: "image", src: "/images/monologue/1.jpg" },
            { type: "image", src: "/images/monologue/2.jpg" },
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
        cover: "/images/tile-map-generator/0.jpg",
        assets: [
            { type: "video", src: "/images/tile-map-generator/showcase.mp4" },
            { type: "video", src: "/images/tile-map-generator/video.mp4" },
            { type: "image", src: "/images/tile-map-generator/0.jpg" },
            { type: "image", src: "/images/tile-map-generator/1.jpg" },
            { type: "image", src: "/images/tile-map-generator/2.jpg" },
            { type: "image", src: "/images/tile-map-generator/3.jpg" },
        ],
        link: "https://levieuxsinge.github.io/CodingExperiments/TileMapGenerator/",
    },
];

const resolvedProjects: readonly ResolvedProject[] = projects.map((project) => {
    const projectDecks = decks.filter(deck => project.decks.includes(deck.id));
    const projectTools = tools.filter(tool => project.tools.includes(tool.id));
    const projectRoles = roles.filter(role => project.roles.includes(role.id));
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
