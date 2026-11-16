<script setup lang="ts">
import { DialogContent, DialogDescription, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from "reka-ui";
import { projects } from "#shared/data/projects";

const props = defineProps<{ blocked?: boolean }>();
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
const app = useNuxtApp();
const { isOpen, isPageRevealing } = useMenu();
const { isNavigating } = usePageTransition();
const header = useTemplateRef<HTMLElement>("header");
const panel = useTemplateRef<HTMLElement>("panel");
const menuHeaderHost = useTemplateRef<HTMLElement>("menuHeaderHost");
const returningHeader = shallowRef(false);
const phase = shallowRef<"closed" | "opening" | "open" | "closing">("closed");
const teleported = computed(() => !!menuHeaderHost.value && isOpen.value && !returningHeader.value);
const iconOpen = computed(() => isOpen.value && phase.value !== "closing");
const motion = useMenuMotion(panel);
const { y, introEnd } = useDocumentScroll();
const currentPage = computed(() => {
    const key = route.path.replace(/^\/fr(?=\/|$)/, "").split("/")[1];
    if (key === "project") {
        const project = projects.find(item => item.slug === route.params.slug);
        return project ? `${t("pages.project.project")} / ${project.title}` : "";
    }
    return key === "work" || key === "archive" || key === "about" ? t(`pages.${key}.title`) : "";
});
const displayedPage = shallowRef(currentPage.value);
watch([currentPage, isNavigating, isOpen], ([text, navigating, menuOpen]) => {
    if (!navigating && !menuOpen) displayedPage.value = text;
});
const showPage = computed(() => !!displayedPage.value && introEnd.value > 0 && y.value >= introEnd.value - 2 && !isOpen.value && !isNavigating.value);
useResizeObserver(header, ([entry]) => {
    if (entry) document.documentElement.style.setProperty("--header-height", `${entry.target.getBoundingClientRect().height}px`);
});
onBeforeUnmount(() => document.documentElement.style.removeProperty("--header-height"));
const items = ["home", "work", "archive", "about"] as const;
const paths = { home: "/", work: "/work", archive: "/archive", about: "/about" };
let navigating = false;
let cancelPendingNavigation = () => {};
onBeforeUnmount(() => {
    cancelPendingNavigation();
    isOpen.value = false;
    isPageRevealing.value = false;
    isNavigating.value = false;
});

async function opened(event: Event) {
    event.preventDefault();
    await nextTick();
    // Reka hid this node before Teleport moved it into the dialog's focus region.
    if (header.value?.closest("[role=\"dialog\"]")) {
        header.value.removeAttribute("aria-hidden");
        header.value.removeAttribute("data-aria-hidden");
    }
    header.value?.querySelector<HTMLButtonElement>("[data-menu-toggle]")?.focus();
    await motion.enter();
    if (phase.value === "opening") phase.value = "open";
}
async function removeMenu() {
    returningHeader.value = true;
    await nextTick();
    isOpen.value = false;
    isPageRevealing.value = false;
    isNavigating.value = false;
    await nextTick();
    returningHeader.value = false;
    phase.value = "closed";
    motion.restore();
    if (navigating) document.querySelector<HTMLElement>("main#main")?.focus({ preventScroll: true });
    navigating = false;
}
async function close() {
    if (phase.value === "closing" || !isOpen.value) return;
    phase.value = "closing";
    await motion.exit(true);
    await removeMenu();
}
function requestState(open: boolean) {
    if (!open) void close();
    else if (!isOpen.value) {
        phase.value = "opening";
        isOpen.value = true;
    }
}
function restoreFocus(event: Event) {
    if (navigating) event.preventDefault();
}
async function followLink(target: string) {
    if (phase.value === "closing") return;
    if (target === route.path) return close();
    navigating = true;
    phase.value = "closing";
    await motion.exit(false);
    let stopReady: () => void = () => {};
    let stopError: () => void = () => {};
    const ready = new Promise<void>((resolve) => {
        const finish = () => {
            stopReady();
            stopError();
            resolve();
        };
        cancelPendingNavigation = finish;
        stopReady = app.hook("page:finish", finish);
        stopError = app.hook("app:error", finish);
    });
    try {
        const failure = await router.push(target);
        if (!failure) await ready;
        stopReady();
        await nextTick();
        isPageRevealing.value = !failure;
        if (!failure) await app.$motion.preparePage();
        await motion.revealPage();
    }
    finally {
        cancelPendingNavigation();
        cancelPendingNavigation = () => {};
        await removeMenu();
    }
}
function identityClick(event: MouseEvent) {
    if (!isOpen.value || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void followLink(localePath("/"));
}
</script>

<template>
    <DialogRoot
        :open="isOpen"
        @update:open="requestState"
    >
        <Teleport
            :to="menuHeaderHost || 'body'"
            :disabled="!teleported"
        >
            <header
                ref="header"
                :inert="props.blocked || undefined"
                class="site-header page-gutter fixed inset-x-0 top-0 z-[55] isolate flex min-h-(--header-min-height) items-center justify-between gap-3 py-3 md:gap-6"
            >
                <SiteIdentity @click.capture="identityClick" />
                <Transition name="header-page">
                    <span
                        v-if="showPage"
                        class="pointer-events-none absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-center font-sans text-xs font-normal tracking-[0.06em] uppercase md:text-sm"
                        aria-hidden="true"
                        data-header-page
                    >{{ displayedPage }}</span>
                </Transition>
                <nav
                    :aria-label="t('layouts.headerControls')"
                    class="flex shrink-0 items-center gap-1 md:gap-5"
                >
                    <LocaleSwitch @before-switch="motion.settle" />
                    <DialogTrigger as-child>
                        <MenuToggle
                            :open="iconOpen"
                            :label="t(iconOpen ? 'layouts.close' : 'layouts.menu')"
                            :accessible-label="t(iconOpen ? 'layouts.closeMenu' : 'layouts.openMenu')"
                        />
                    </DialogTrigger>
                </nav>
            </header>
        </Teleport>
        <DialogPortal>
            <DialogContent
                v-if="isOpen"
                force-mount
                class="fixed inset-0 z-50 isolate h-dvh overflow-hidden overscroll-contain text-ink"
                data-lenis-prevent
                @open-auto-focus="opened"
                @close-auto-focus="restoreFocus"
            >
                <div
                    ref="panel"
                    class="flex h-full min-h-0 flex-col pt-(--header-height)"
                >
                    <div
                        class="pointer-events-none fixed inset-0 -z-10 bg-paper"
                        style="opacity: 0"
                        data-menu-background
                    />
                    <div ref="menuHeaderHost" />
                    <DialogTitle class="sr-only">
                        {{ t('layouts.mainNavigation') }}
                    </DialogTitle>
                    <DialogDescription class="sr-only">
                        {{ t('layouts.menuDescription') }}
                    </DialogDescription>
                    <nav
                        class="page-gutter flex min-h-0 flex-1 flex-col overflow-hidden pb-5 md:pb-8"
                        :aria-label="t('layouts.mainNavigation')"
                    >
                        <MenuLink
                            v-for="(item, index) in items"
                            :key="item"
                            :to="localePath(paths[item])"
                            :index="index + 1"
                            :title="t(`layouts.navigation.${item}`)"
                            :current="route.path === localePath(paths[item])"
                            @navigate="followLink(localePath(paths[item]))"
                        />
                    </nav>
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
