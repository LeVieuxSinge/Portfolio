<script setup lang="ts">
import { animate, onScroll } from "animejs";

definePageMeta({ name: "projects" });
const { t } = useI18n();
const { resolvedProjects } = useProjectsData();
const { summary } = useProjectPresentation();
const route = useRoute();
const router = useRouter();
const root = useTemplateRef<HTMLElement>("root");
const selectedList = useTemplateRef<HTMLElement>("selectedList");
const compact = useMediaQuery("(max-width: 900px)");
const { y } = useWindowScroll();
const { height } = useWindowSize();
const deep = computed(() => y.value > height.value * 0.65);
const filters = ["all", "frontend", "design", "artist", "programmer"] as const;
const deckMap: Record<string, string[]> = { frontend: ["frontenddev"], design: ["uiuxdesigner"], artist: ["generalist3d", "gamedev"], programmer: ["programmer"] };
const discipline = computed({
    get: () => filters.find(key => key === route.query.discipline) ?? "all",
    set: (value: string) => {
        const query = { ...route.query };
        delete query.deck;
        delete query.filter;
        if (value === "all")
            delete query.discipline; else
            query.discipline = value;
        void router.replace({ query });
    },
});
const matches = computed(() => resolvedProjects.filter((project) => {
    const decks = deckMap[discipline.value];
    const oldDecks = String(route.query.deck ?? "").split(",").filter(Boolean);
    const tags = String(route.query.filter ?? "").split(",").filter(Boolean);
    return (!decks || project.decks.some(deck => decks.includes(deck.id)))
        && (!oldDecks.length || project.decks.some(deck => oldDecks.includes(deck.id)))
        && (!tags.length || tags.every(tag => project.tools.some(tool => tool.id === tag) || project.roles.some(role => role.id === tag) || project.year === tag));
}));
const curatedOrder = ["feltkutur", "ryker", "schluter", "simona", "portfoliov2"];
const selected = computed(() => curatedOrder.map(slug => matches.value.find(project => project.slug === slug)).filter((project): project is NonNullable<typeof project> => !!project));
const archive = computed(() => matches.value.filter(project => !curatedOrder.includes(project.slug)).toSorted((a, b) => route.query.sort === "name" ? a.name.localeCompare(b.name) : Number(b.year) - Number(a.year)));
let effects: { observer: ReturnType<typeof onScroll>; animation: ReturnType<typeof animate> }[] = [];
let generation = 0;
function clearEffects() {
    effects.forEach(({ observer, animation }) => {
        observer.revert();
        animation.revert();
    });
    effects = [];
}
async function rebuild() {
    const current = ++generation;
    clearEffects();
    await nextTick();
    if (current !== generation || !root.value || compact.value)
        return;
    root.value.querySelectorAll<HTMLElement>(".project-showcase").forEach((card) => {
        const observer = onScroll({ target: card, enter: "bottom top", leave: "center center", sync: true });
        const animation = animate(card, { translateX: [Math.min(window.innerWidth * 0.075, 100), 0], ease: "linear", autoplay: observer });
        effects.push({ observer, animation });
    });
}
function scroll() {
    if (deep.value)
        window.scrollTo({ top: 0, behavior: "smooth" }); else
        selectedList.value?.scrollIntoView({ behavior: "smooth" });
}
watch([compact, selected], rebuild, { flush: "post" });
onMounted(() => {
    void rebuild();
});
onBeforeUnmount(() => {
    generation++;
    clearEffects();
});
useHead({ title: () => t("p.work") });
</script>

<template>
    <div>
        <main
            id="main"
            ref="root"
            tabindex="-1"
            class="work-page page-gutter page-content overflow-clip pl-[10vw] pr-[10vw] pt-[62px] pb-25 [@media(max-width:700px)]:pl-[8vw] [@media(max-width:700px)]:pr-[8vw] [@media(max-width:700px)]:pt-[34px] [@media(max-width:700px)]:pb-[70px]"
        >
            <header class="work-opening max-w-175 mb-[75px] [&_h1]:text-[clamp(35px,4.65vw,80px)] [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:tracking-[-.055em] [&_h1]:[white-space:pre-line] [&_h1]:mt-[25px] [@media(max-width:700px)]:mb-[38px] [@media(max-width:700px)]:[&_h1]:text-[34px] [@media(max-width:700px)]:[&_h1]:mt-[18px]">
                <p class="eyebrow [.work-opening>&]:text-muted [.work-filters>&]:ml-auto [.work-filters>&]:text-[8px] [.work-filters>&]:text-muted [@media(max-width:700px)]:[.work-filters>&]:hidden [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">
                    01 / {{ t('p.selected') }}
                </p><h1>{{ t('p.workIntro') }}</h1><p class="work-description text-[13px] leading-[1.9] max-w-100 text-muted [margin:30px_0_0_auto] [@media(max-width:700px)]:text-[12px] [@media(max-width:700px)]:mt-[22px] [@media(max-width:700px)]:max-w-[270px]">
                    {{ t('p.workDescription') }}
                </p>
            </header>
            <nav
                class="work-filters flex items-center gap-[22px] flex-wrap mb-[50px] pb-[15px] [border-bottom:1px_solid_var(--line)] [&_button]:[font:9px_var(--font-mono)] [&_button]:text-muted [&_button]:relative [&_button]:min-h-[38px] [&_button[aria-pressed=true]]:text-ink [&_button[aria-pressed=true]::after]:[content:''] [&_button[aria-pressed=true]::after]:absolute [&_button[aria-pressed=true]::after]:bottom-[-16px] [&_button[aria-pressed=true]::after]:left-0 [&_button[aria-pressed=true]::after]:w-full [&_button[aria-pressed=true]::after]:h-[2px] [&_button[aria-pressed=true]::after]:[background:var(--profile-color)] [@media(max-width:700px)]:gap-[8px_16px] [@media(max-width:700px)]:mb-[30px] [@media(max-width:700px)]:[&_button]:text-[8px]"
                :aria-label="t('p.filterLabel')"
            >
                <button
                    v-for="filter in filters"
                    :key="filter"
                    type="button"
                    :aria-pressed="discipline === filter"
                    @click="discipline = filter"
                >
                    {{ t(`p.${filter}`) }}
                </button><span class="eyebrow [.work-opening>&]:text-muted [.work-filters>&]:ml-auto [.work-filters>&]:text-[8px] [.work-filters>&]:text-muted [@media(max-width:700px)]:[.work-filters>&]:hidden [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">{{ matches.length }} {{ t('p.projectCount') }}</span>
            </nav>
            <div
                v-if="selected.length"
                ref="selectedList"
                class="selected-list flex flex-col gap-[110px] pb-30 [@media(max-width:700px)]:gap-[55px] [@media(max-width:700px)]:pb-[65px]"
            >
                <ProjectsProjectShowcase
                    v-for="(project, i) in selected"
                    :key="project.slug"
                    :project="project"
                    :index="i"
                />
            </div>
            <p
                v-if="!matches.length"
                class="empty-projects [padding:70px_0] text-muted"
            >
                {{ t('pages.projects.noResults') }}
            </p>
            <section
                v-if="archive.length"
                class="project-archive pt-5"
            >
                <div class="archive-heading flex justify-between items-baseline gap-6 mb-[35px] [&_h2]:text-[24px] [&_h2]:font-[550] [&_h2]:tracking-[-.035em] [&_p]:text-[11px] [&_p]:text-muted [@media(max-width:700px)]:block [@media(max-width:700px)]:[&_h2]:text-[23px] [@media(max-width:700px)]:[&_p]:mt-[10px]">
                    <h2>{{ t('p.archive') }}</h2><p>{{ t('p.archiveDescription') }}</p>
                </div><NuxtLinkLocale
                    v-for="project in archive"
                    :key="project.slug"
                    :to="project.path"
                    class="archive-project flex gap-[25px] items-center [border-top:1px_solid_var(--line)] [padding:22px_0] no-underline [&_img]:w-22 [&_img]:h-16 [&_img]:rounded-[4px] [&_img]:[object-fit:cover] [&_img]:[filter:saturate(.5)] [&_img]:[transition:filter_.3s] [&:hover_img]:[filter:saturate(1)] [&>span:nth-child(2)]:flex-1 [&>span:nth-child(2)]:min-w-0 [&_strong]:text-[19px] [&_strong]:font-[550] [&_strong]:tracking-[-.025em] [&_small]:block [&_small]:mt-[6px] [&_small]:text-[11px] [&_small]:leading-[1.8] [&_small]:text-muted [&_small]:max-w-125 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:flex-none [&>svg]:ml-5 [&>svg]:[transition:transform_.3s] [&:hover>svg]:[transform:translate(3px,-3px)] [@media(max-width:700px)]:gap-[14px] [@media(max-width:700px)]:[padding:18px_0] [@media(max-width:700px)]:[&_img]:w-14 [@media(max-width:700px)]:[&_img]:h-[55px] [@media(max-width:700px)]:[&_strong]:text-[16px] [@media(max-width:700px)]:[&_small]:hidden [@media(max-width:700px)]:[&>svg]:w-4 [@media(max-width:700px)]:[&>svg]:ml-0"
                >
                    <img
                        :src="project.cover"
                        alt=""
                        loading="lazy"
                        width="120"
                        height="90"
                    ><span><strong>{{ project.name }}</strong><small>{{ summary(project) }}</small></span><span class="archive-year eyebrow [.work-opening>&]:text-muted [.work-filters>&]:ml-auto [.work-filters>&]:text-[8px] [.work-filters>&]:text-muted text-muted [@media(max-width:700px)]:[.work-filters>&]:hidden [@media(max-width:700px)]:text-[8px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase">{{ project.year }}</span><SiteIcon name="arrow" />
                </NuxtLinkLocale>
            </section>
        </main>
        <button
            type="button"
            class="scroll-indicator eyebrow [.work-opening>&]:text-muted [.work-filters>&]:ml-auto [.work-filters>&]:text-[8px] [.work-filters>&]:text-muted fixed bottom-6 right-[3.2vw] z-[10] flex items-center gap-3 [padding:10px_14px] bg-paper text-[8px] [border:1px_solid_var(--line)] rounded-[30px] [&>span:last-child]:text-[15px] [&>span:last-child]:text-profile [@media(max-width:700px)]:[.work-filters>&]:hidden [@media(max-width:700px)]:right-[6vw] [@media(max-width:700px)]:bottom-[18px] [@media(max-width:700px)]:text-[7px] [font:10px/1.6_var(--font-mono)] tracking-[.08em] uppercase"
            @click="scroll"
        >
            <span>{{ t(deep ? 'p.scrollTop' : 'p.scroll') }}</span><span aria-hidden="true">{{ deep ? '↑' : '↓' }}</span>
        </button>
        <SiteFooter />
    </div>
</template>
