<script setup lang="ts">
definePageMeta({ name: "about" });
const { t } = useI18n();
const stacks = [
    { key: "frontend", tools: ["Nuxt", "Vue", "Tailwind CSS", "TypeScript", "Three.js", "Node.js"] },
    { key: "design", tools: ["Figma", "Adobe XD", "Miro", "Adobe Photoshop", "Adobe Illustrator"] },
    { key: "artist", tools: ["Blender", "Unreal Engine", "Substance Painter", "Houdini"] },
    { key: "programmer", tools: ["TypeScript", "C++", "Python", "PowerShell"] },
];
const cv = computed(() => [
    { key: "experiences", entries: [
        { date: "2021 — 2026", title: t("pages.about.cv.experiences.pixistudio.title"), details: "Pixistudio · Montréal" },
        { date: "2019 — 2021", title: t("pages.about.cv.experiences.retiredAssociation.title"), details: "Association des Retraité.es du Cégep de Saint-Hyacinthe" },
    ] },
    { key: "education", entries: [
        { date: "2018 — 2021", title: t("pages.about.cv.education.computationArts.title"), details: t("pages.about.cv.education.computationArts.details") },
        { date: "2016 — 2018", title: t("pages.about.cv.education.arts.title"), details: "Cégep de Saint-Hyacinthe" },
    ] },
    { key: "awards", entries: [
        { date: "2018", title: t("pages.about.cv.awards.fofa.title"), details: t("pages.about.cv.awards.fofa.details") },
        { date: "2018", title: t("pages.about.cv.awards.arts.title"), details: "Cégep de Saint-Hyacinthe" },
    ] },
    { key: "presence", entries: [
        { date: "2025", title: t("pages.about.cv.publicPresence.forumLaval.title"), details: "Forum in! de Laval Innov" },
        { date: "2025", title: t("pages.about.cv.teaching.pixistudio.title"), details: "Pixistudio · Montréal" },
        { date: "2022", title: t("pages.about.cv.publicPresence.siggraph.title"), details: "SIGGRAPH · Vancouver" },
        { date: "2020", title: t("pages.about.cv.publicPresence.chinaCanadaVR.title"), details: "China Canada VR Technology Summit" },
        { date: "2018", title: t("pages.about.cv.publicPresence.nousTv.title"), details: "NousTV Saint-Hyacinthe" },
    ] },
]);
useHead({ title: () => t("p.about") });
</script>

<template>
    <div />
</template>
