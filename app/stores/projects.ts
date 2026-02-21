enum EDeck {
    FRONTEND_DEV = "deck.frontenddev",
    GENERALIST_3D = "deck.generalist3d",
    UI_UX_DESIGNER = "deck.uiuxdesigner",
    GAME_DEV = "deck.gamedev",
    PROGRAMMER = "deck.programmer",
}

interface Deck {
    name: string;
    description: string;
    tools: string[];
}

export interface ResolvedDeck {
    name: string;
    description: string;
    tools: string[];
    projects: Project[];
}

export interface Project {
    /** The path to the project page. */
    path: string;
    /** The decks associated with the project. */
    deck: EDeck[];
    /** Whether the project is featured or not. Featured projects are highlighted in the UI and can be used to showcase specific projects. */
    featured: boolean;
    /** The name of the project. */
    name: string;
    /** The year the project was completed. */
    year: string;
    /** The tools used in the project. */
    tools: string[];
    /** The roles played in the project. */
    roles: string[];
    /** A detailed description of the project. */
    about: string;
    /** The cover image used for card. */
    cover: string;
    /** The assets associated with the project, can be images or videos. */
    assets: { type: "video" | "image"; src: string }[];
    /** An optional link to the project, can be a live demo or a repository. */
    link?: string;
}

export const useProjectsStore = defineStore("projects", () => {
    const decks: Deck[] = [
        {
            name: EDeck.FRONTEND_DEV,
            description: "deck.frontenddev.description",
            tools: ["Nuxt", "Tailwind CSS", "Three.js"],
        },
        {
            name: EDeck.GENERALIST_3D,
            description: "deck.generalist3d.description",
            tools: ["Blender", "Substance Painter", "Houdini"],
        },
        {
            name: EDeck.UI_UX_DESIGNER,
            description: "deck.uiuxdesigner.description",
            tools: ["Figma", "Adobe XD"],
        },
        {
            name: EDeck.GAME_DEV,
            description: "deck.gamedev.description",
            tools: ["Unreal Engine"],
        },
        {
            name: EDeck.PROGRAMMER,
            description: "deck.programmer.description",
            tools: ["TypeScript (Node.js)", "C++ (Unreal Engine)", "Python (Blender)"],
        },
    ];

    const projects: Project[] = [
        {
            path: "/project/amie/",
            deck: [EDeck.GAME_DEV, EDeck.PROGRAMMER],
            featured: true, // ! For demo purposes
            name: "Amie",
            year: "2018",
            tools: ["Unreal Engine"],
            roles: ["3D Artist", "Programmer"],
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
            deck: [EDeck.GENERALIST_3D],
            featured: false,
            name: "Cloner",
            year: "2020",
            tools: ["Blender"],
            roles: ["3D Artist"],
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
            deck: [EDeck.GENERALIST_3D, EDeck.GAME_DEV],
            featured: false,
            name: "Cyberblade",
            year: "2020",
            tools: ["Blender"],
            roles: ["3D Artist"],
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
            deck: [EDeck.GENERALIST_3D],
            featured: false,
            name: "Identity",
            year: "2020",
            tools: ["Blender", "Houdini"],
            roles: ["3D Artist"],
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
            deck: [EDeck.GENERALIST_3D],
            featured: false,
            name: "Monologue",
            year: "2020",
            tools: ["Blender"],
            roles: ["3D Artist"],
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
            deck: [EDeck.PROGRAMMER, EDeck.GAME_DEV],
            featured: false,
            name: "Tile Map Generator",
            year: "2020",
            tools: ["Javascript", "p5.js"],
            roles: ["Programmer"],
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

    function getProject(path: string): Project | undefined {
        return projects.find(project => project.path === path);
    }

    function getProjects(): Project[] {
        return projects;
    }

    function getDecks(): ResolvedDeck[] {
        return decks.map((deck) => {
            const deckProjects = projects.filter(project => project.deck.includes(deck.name as EDeck));
            return { ...deck, projects: deckProjects };
        });
    }

    return { getProject, getProjects, getDecks };
});
