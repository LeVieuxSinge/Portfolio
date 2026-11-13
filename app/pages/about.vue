<script setup lang="ts">
definePageMeta({ name: "about" });
const { t } = useI18n();
const tasks = computed(() => Array.from({ length: 5 }, (_, i) => t(`p.aboutPage.doList.${i}`)));
const interests = computed(() => Array.from({ length: 6 }, (_, i) => t(`p.aboutPage.motivationList.${i}`)));
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
    <div>
        <main
            id="main"
            tabindex="-1"
            class="about-page page-gutter page-content pl-[10vw] pr-[10vw] pt-[62px] pb-25 [@media(max-width:700px)]:pl-[8vw] [@media(max-width:700px)]:pr-[8vw] [@media(max-width:700px)]:pt-[34px] [@media(max-width:700px)]:pb-[70px]"
        >
            <header class="about-opening pb-[110px] [&_h1]:mt-10 [&_h1]:text-transparent [&_h1]:[-webkit-text-stroke:1px_var(--ink)] [&_h1]:text-[clamp(25px,4.5vw,76px)] [&_h1]:leading-[1.5] [&_h1]:[overflow-wrap:anywhere] [&_h1>span]:block [&_h1>span:last-child]:text-[.72em] [&_b]:text-profile [&_b]:[-webkit-text-stroke:0] [&_b]:font-normal [@media(max-width:700px)]:pb-15 [@media(max-width:700px)]:[&_h1]:text-[clamp(23px,6vw,38px)] [@media(max-width:700px)]:[&_h1]:mt-[25px] [@media(max-width:700px)]:[&_h1]:leading-[1.6] [@media(max-width:700px)]:[&_h1>span:last-child]:text-[.7em]">
                <p class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                    {{ t('p.aboutPage.eyebrow') }}
                </p><h1 class="display font-display font-normal tracking-[.015em] leading-[1.15]">
                    <span>3D <b>+</b> Code <b>+</b> UI/UX <b>+</b></span><span>{{ t('p.aboutPage.headline') }}</span>
                </h1><p class="opening-note text-[14px] text-muted mt-7 max-w-100 ml-auto [@media(max-width:700px)]:text-[12px] [@media(max-width:700px)]:mt-[22px] [@media(max-width:700px)]:max-w-[235px]">
                    {{ t('p.aboutPage.opening') }}
                </p>
            </header>
            <section class="about-statement grid [grid-template-columns:1fr_2.05fr] gap-[7vw] [padding:55px_0_80px] [border-top:1px_solid_var(--line)] [&_aside_ul]:mt-[22px] [&_aside_ul]:text-[11px] [&_aside_ul]:leading-[2] [&>p]:text-[clamp(24px,2.5vw,43px)] [&>p]:leading-[1.5] [&>p]:tracking-[-.04em] [&>p]:font-[450] [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-[25px] [@media(max-width:700px)]:[padding:30px_0_50px] [@media(max-width:700px)]:[&_aside_ul]:flex [@media(max-width:700px)]:[&_aside_ul]:flex-wrap [@media(max-width:700px)]:[&_aside_ul]:gap-[3px_16px] [@media(max-width:700px)]:[&_aside_ul]:text-[10px] [@media(max-width:700px)]:[&_aside_ul]:leading-[1.9] [@media(max-width:700px)]:[&_aside_ul]:mt-[14px] [@media(max-width:700px)]:[&>p]:text-[25px] [@media(max-width:700px)]:[&>p]:leading-[1.6]">
                <aside>
                    <h2 class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.aboutPage.do') }}
                    </h2><ul>
                        <li
                            v-for="task in tasks"
                            :key="task"
                        >
                            {{ task }}
                        </li>
                    </ul>
                </aside><p>{{ t('p.aboutPage.statement') }}</p>
            </section>
            <section class="about-statement grid [grid-template-columns:1fr_2.05fr] gap-[7vw] [padding:55px_0_80px] [border-top:1px_solid_var(--line)] [&_aside_ul]:mt-[22px] [&_aside_ul]:text-[11px] [&_aside_ul]:leading-[2] [&>p]:text-[clamp(24px,2.5vw,43px)] [&>p]:leading-[1.5] [&>p]:tracking-[-.04em] [&>p]:font-[450] [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-[25px] [@media(max-width:700px)]:[padding:30px_0_50px] [@media(max-width:700px)]:[&_aside_ul]:flex [@media(max-width:700px)]:[&_aside_ul]:flex-wrap [@media(max-width:700px)]:[&_aside_ul]:gap-[3px_16px] [@media(max-width:700px)]:[&_aside_ul]:text-[10px] [@media(max-width:700px)]:[&_aside_ul]:leading-[1.9] [@media(max-width:700px)]:[&_aside_ul]:mt-[14px] [@media(max-width:700px)]:[&>p]:text-[25px] [@media(max-width:700px)]:[&>p]:leading-[1.6]">
                <aside>
                    <h2 class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.aboutPage.motivates') }}
                    </h2><ul>
                        <li
                            v-for="interest in interests"
                            :key="interest"
                        >
                            {{ interest }}
                        </li>
                    </ul>
                </aside><p>{{ t('p.aboutPage.problem') }}</p>
            </section>
            <section class="about-statement grid [grid-template-columns:1fr_2.05fr] gap-[7vw] [padding:55px_0_80px] [border-top:1px_solid_var(--line)] [&_aside_ul]:mt-[22px] [&_aside_ul]:text-[11px] [&_aside_ul]:leading-[2] [&>p]:text-[clamp(24px,2.5vw,43px)] [&>p]:leading-[1.5] [&>p]:tracking-[-.04em] [&>p]:font-[450] [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-[25px] [@media(max-width:700px)]:[padding:30px_0_50px] [@media(max-width:700px)]:[&_aside_ul]:flex [@media(max-width:700px)]:[&_aside_ul]:flex-wrap [@media(max-width:700px)]:[&_aside_ul]:gap-[3px_16px] [@media(max-width:700px)]:[&_aside_ul]:text-[10px] [@media(max-width:700px)]:[&_aside_ul]:leading-[1.9] [@media(max-width:700px)]:[&_aside_ul]:mt-[14px] [@media(max-width:700px)]:[&>p]:text-[25px] [@media(max-width:700px)]:[&>p]:leading-[1.6]">
                <aside>
                    <h2 class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.aboutPage.outside') }}
                    </h2><p class="aside-note text-[11px]! leading-[1.8]! text-muted mt-5 max-w-45 [@media(max-width:700px)]:mt-3 [@media(max-width:700px)]:max-w-[none]">
                        {{ t('p.aboutPage.outsideNote') }}
                    </p>
                </aside><p>{{ t('p.aboutPage.outsideText') }}</p>
            </section>
            <section
                class="about-stacks grid [grid-template-columns:repeat(4,1fr)] gap-[35px] [border-top:1px_solid_var(--line)] [padding:55px_0_85px] [&_h2]:text-[9px] [&_h2]:text-muted [&_h2]:mb-[22px] [&_li]:text-[13px] [&_li]:leading-[2.1] [@media(max-width:700px)]:[grid-template-columns:1fr_1fr] [@media(max-width:700px)]:gap-8 [@media(max-width:700px)]:[padding:35px_0_50px] [@media(max-width:700px)]:[&_h2]:text-[8px] [@media(max-width:700px)]:[&_h2]:mb-[14px] [@media(max-width:700px)]:[&_li]:text-[12px]"
                :aria-label="t('p.aboutPage.stack')"
            >
                <div
                    v-for="stack in stacks"
                    :key="stack.key"
                >
                    <h2 class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t(`p.profiles.${stack.key}.short`) }}
                    </h2><ul>
                        <li
                            v-for="tool in stack.tools"
                            :key="tool"
                        >
                            {{ tool }}
                        </li>
                    </ul>
                </div>
            </section>
            <section class="about-statement about-future grid [grid-template-columns:1fr_2.05fr] gap-[7vw] [padding:55px_0_80px] [border-top:1px_solid_var(--line)] [&_aside_ul]:mt-[22px] [&_aside_ul]:text-[11px] [&_aside_ul]:leading-[2] [&>p]:text-[clamp(24px,2.5vw,43px)] [&>p]:leading-[1.5] [&>p]:tracking-[-.04em] [&>p]:font-[450] pb-25 [&>div_h2]:text-[clamp(28px,3vw,48px)] [&>div_h2]:font-[550] [&>div_h2]:leading-[1.2] [&>div_h2]:tracking-[-.05em] [&>div_h2]:mb-7 [&>div_p]:text-[15px] [&>div_p]:leading-[1.95] [&>div_p]:text-muted [&>div_p]:max-w-140 [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-[25px] [@media(max-width:700px)]:[padding:30px_0_50px] [@media(max-width:700px)]:[&_aside_ul]:flex [@media(max-width:700px)]:[&_aside_ul]:flex-wrap [@media(max-width:700px)]:[&_aside_ul]:gap-[3px_16px] [@media(max-width:700px)]:[&_aside_ul]:text-[10px] [@media(max-width:700px)]:[&_aside_ul]:leading-[1.9] [@media(max-width:700px)]:[&_aside_ul]:mt-[14px] [@media(max-width:700px)]:[&>p]:text-[25px] [@media(max-width:700px)]:[&>p]:leading-[1.6] [@media(max-width:700px)]:[&>div_h2]:text-[30px] [@media(max-width:700px)]:[&>div_h2]:mb-5 [@media(max-width:700px)]:[&>div_p]:text-[13px]">
                <aside>
                    <h2 class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                        {{ t('p.aboutPage.future') }}
                    </h2><p class="aside-note text-[11px]! leading-[1.8]! text-muted mt-5 max-w-45 [@media(max-width:700px)]:mt-3 [@media(max-width:700px)]:max-w-[none]">
                        {{ t('p.aboutPage.futureNote') }}
                    </p>
                </aside><div><h2>{{ t('p.aboutPage.futureTitle') }}</h2><p>{{ t('p.aboutPage.futureText') }}</p></div>
            </section>
            <details class="about-background [border-top:1px_solid_var(--line)] [border-bottom:1px_solid_var(--line)] [&_summary]:flex [&_summary]:items-center [&_summary]:justify-between [&_summary]:[padding:25px_0] [&_summary]:cursor-pointer [&_summary]:text-[16px] [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                <summary>
                    <span>{{ t('p.aboutPage.experience') }}</span><span
                        class="details-plus [font:24px_var(--font-mono)] text-profile [transition:transform_.3s] [.about-background[open]_&]:[transform:rotate(45deg)]"
                        aria-hidden="true"
                    >+</span>
                </summary><div class="cv-groups grid [grid-template-columns:1fr_1fr] gap-[50px_70px] [padding:25px_0_55px] [&_h2]:text-[10px] [&_h2]:text-muted [&_h2]:mb-[25px] [@media(max-width:700px)]:[grid-template-columns:1fr] [@media(max-width:700px)]:gap-[35px]">
                    <section
                        v-for="group in cv"
                        :key="group.key"
                    >
                        <h2 class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                            {{ t(`p.aboutPage.${group.key}`) }}
                        </h2><div
                            v-for="entry in group.entries"
                            :key="entry.date + entry.title"
                            class="cv-entry mt-[22px] [&_h3]:text-[14px] [&_h3]:font-medium [&_h3]:mt-[6px] [&_h3]:[text-transform:capitalize] [&_p]:text-[11px] [&_p]:text-muted [&_p]:mt-[5px]"
                        >
                            <span class="eyebrow [.about-opening>&]:text-muted [.about-statement_aside>&]:text-muted [.about-statement_aside>&]:text-[9px] [.cv-entry>&]:text-[8px] [.cv-entry>&]:text-muted [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">{{ entry.date }}</span><h3>{{ entry.title }}</h3><p>{{ entry.details }}</p>
                        </div>
                    </section>
                </div>
            </details>
            <section class="about-end pt-[95px] flex items-start flex-col gap-8 [&_h2]:text-[14px] [&_h2]:font-normal [&_h2]:text-muted [@media(max-width:700px)]:pt-[55px] [@media(max-width:700px)]:gap-6 [@media(max-width:700px)]:[&&_.portfolio-link-large]:text-[25px]">
                <h2>{{ t('p.aboutPage.more') }}</h2><PortfolioLink
                    to="/projects"
                    large
                >
                    {{ t('p.aboutPage.explore') }}
                </PortfolioLink><a
                    class="about-email text-[12px] no-underline mt-[5px]"
                    href="mailto:xavierchampoux@hotmail.com"
                >xavierchampoux@hotmail.com ↗</a>
            </section>
        </main>
        <SiteFooter />
    </div>
</template>
