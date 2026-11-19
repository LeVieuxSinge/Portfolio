import type { CvGroup, ProfileId } from "../types/portfolio";

export const capabilityStacks: readonly { profile: ProfileId; tools: readonly string[] }[] = [
    { profile: "frontend", tools: ["Nuxt", "Vue", "Tailwind CSS", "TypeScript", "Three.js", "Node.js"] },
    { profile: "uiux", tools: ["Figma", "Adobe XD", "Miro", "Adobe Photoshop", "Adobe Illustrator"] },
    { profile: "art", tools: ["Blender", "Unreal Engine", "Substance Painter", "Houdini"] },
    { profile: "programming", tools: ["TypeScript", "C++", "Python", "PowerShell"] },
];

export const cvGroups: readonly CvGroup[] = [
    { id: "experiences", entries: [
        { id: "pixistudio", dates: "2021 — 2026", organization: "Pixistudio", location: "Montréal", titleKey: "pages.about.cv.experiences.pixistudio.title" },
        { id: "retiredAssociation", dates: "2019 — 2021", organization: "Association des Retraité.es du Cégep de Saint-Hyacinthe", titleKey: "pages.about.cv.experiences.retiredAssociation.title" },
    ] },
    { id: "education", entries: [
        { id: "computationArts", dates: "2018 — 2021", organization: "Concordia University", organizationLabels: { fr: "Université Concordia" }, location: "Montréal", titleKey: "pages.about.cv.education.computationArts.title" },
        { id: "arts", dates: "2016 — 2018", organization: "Cégep de Saint-Hyacinthe", titleKey: "pages.about.cv.education.arts.title" },
    ] },
    { id: "awards", entries: [
        { id: "fofa", dates: "2018", organization: "Concordia University", organizationLabels: { fr: "Université Concordia" }, location: "Montréal", titleKey: "pages.about.cv.awards.fofa.title" },
        { id: "arts", dates: "2018", organization: "Cégep de Saint-Hyacinthe", titleKey: "pages.about.cv.awards.arts.title" },
    ] },
    { id: "teaching", entries: [
        { id: "pixistudio", dates: "2025", organization: "Pixistudio", location: "Montréal", titleKey: "pages.about.cv.teaching.pixistudio.title" },
    ] },
    { id: "publicPresence", entries: [
        { id: "forumLaval", dates: "2025", organization: "Forum in! de Laval Innov", titleKey: "pages.about.cv.publicPresence.forumLaval.title" },
        { id: "siggraph", dates: "2022", organization: "SIGGRAPH", location: "Vancouver", titleKey: "pages.about.cv.publicPresence.siggraph.title" },
        { id: "chinaCanadaVR", dates: "2020", organization: "China Canada VR Technology Summit", titleKey: "pages.about.cv.publicPresence.chinaCanadaVR.title" },
        { id: "nousTv", dates: "2018", organization: "NousTV Saint-Hyacinthe", titleKey: "pages.about.cv.publicPresence.nousTv.title" },
    ] },
];

export { contactLinks } from "./site.ts";
