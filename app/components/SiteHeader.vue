<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from "reka-ui";
import { animate, stagger } from "animejs";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { isOpen } = useMenu();
const header = useTemplateRef<HTMLElement>("header");
const { progress } = useDocumentScroll();
const currentPage = computed(() => {
    const key = route.path.replace(/^\/fr(?=\/|$)/, "").split("/")[1];
    return key === "work" || key === "archive" || key === "about" ? t(`pages.${key}.title`) : "";
});
const showPage = computed(() => !!currentPage.value && progress.value >= 25 && !isOpen.value);
useResizeObserver(header, ([entry]) => {
    if (entry) document.documentElement.style.setProperty("--header-height", `${entry.target.getBoundingClientRect().height}px`);
});
onBeforeUnmount(() => document.documentElement.style.removeProperty("--header-height"));
const reduced = usePreferredReducedMotion();
let navigating = false;
let closingForNavigation = false;
const items = ["home", "work", "archive", "about"] as const;
const paths = { home: "/", work: "/work", archive: "/archive", about: "/about" };
let menuAnimations: ReturnType<typeof animate>[] = [];
function stopAnimations() {
    menuAnimations.forEach(animation => animation.revert());
    menuAnimations = [];
}
function enterMenu(element: Element, done: () => void) {
    stopAnimations();
    if (reduced.value === "reduce") return done();
    menuAnimations.push(animate(element, {
        clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
        duration: 550, ease: "inOut(4)", onComplete: done,
    }));
    menuAnimations.push(animate(element.querySelectorAll("[data-menu-row]"), {
        y: [48, 0], opacity: [0, 1], delay: stagger(65, { start: 160 }), duration: 600, ease: "out(4)",
    }));
    menuAnimations.push(animate(element.querySelectorAll(".menu-toggle-lines > span"), {
        translateX: (_, index) => [index ? 3 : -3, 0], translateY: (_, index) => [index ? 3 : -3, 0],
        rotate: (_, index) => [0, index ? -45 : 45], duration: 400, ease: "out(3)",
    }));
}
function leaveMenu(element: Element, done: () => void) {
    stopAnimations();
    if (reduced.value === "reduce" || closingForNavigation) {
        closingForNavigation = false;
        return done();
    }
    menuAnimations.push(animate(element, {
        clipPath: ["inset(0 0 0% 0)", "inset(0 0 100% 0)"], duration: 400, ease: "inOut(4)", onComplete: done,
    }));
    menuAnimations.push(animate(element.querySelectorAll(".menu-toggle-lines > span"), {
        rotate: (_, index) => [index ? -45 : 45, 0],
        translateX: (_, index) => [0, index ? 3 : -3],
        translateY: (_, index) => [0, index ? 3 : -3], duration: 300, ease: "out(3)",
    }));
}
onBeforeUnmount(stopAnimations);
function focusClose(event: Event) {
    event.preventDefault();
    if (event.target instanceof HTMLElement) event.target.querySelector<HTMLButtonElement>("[data-menu-toggle]")?.focus();
}
function restoreFocus(event: Event) {
    if (navigating) event.preventDefault();
    navigating = false;
}
function followLink(target: string) {
    navigating = target !== route.path;
    closingForNavigation = navigating;
    isOpen.value = false;
}
watch(() => route.fullPath, () => {
    if (isOpen.value) {
        navigating = true;
        closingForNavigation = true;
        isOpen.value = false;
    }
});
</script>

<template>
    <DialogRoot v-model:open="isOpen">
        <header
            ref="header"
            class="site-header page-gutter fixed inset-x-0 top-0 z-40 flex min-h-(--header-min-height) items-center justify-between gap-3 bg-transparent py-3 md:gap-6"
            :class="{ invisible: isOpen }"
        >
            <SiteIdentity />
            <Transition name="header-page">
                <span
                    v-if="showPage"
                    class="pointer-events-none absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-center font-sans text-xs font-semibold tracking-[0.06em] uppercase md:text-sm"
                    aria-hidden="true"
                >{{ currentPage }}</span>
            </Transition>
            <nav
                :aria-label="t('layouts.headerControls')"
                class="flex shrink-0 items-center gap-1 md:gap-5"
            >
                <LocaleSwitch />
                <DialogTrigger as-child>
                    <MenuToggle
                        :open="false"
                        :label="t('layouts.menu')"
                        :accessible-label="t('layouts.openMenu')"
                    />
                </DialogTrigger>
            </nav>
        </header>
        <DialogPortal>
            <Transition
                :css="false"
                @enter="enterMenu"
                @leave="leaveMenu"
            >
                <DialogContent
                    v-if="isOpen"
                    force-mount
                    class="no-scrollbar fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-paper text-ink"
                    data-lenis-prevent
                    @open-auto-focus="focusClose"
                    @close-auto-focus="restoreFocus"
                >
                    <DialogTitle class="sr-only">
                        {{ t('layouts.mainNavigation') }}
                    </DialogTitle>
                    <DialogDescription class="sr-only">
                        {{ t('layouts.menuDescription') }}
                    </DialogDescription>
                    <div class="page-gutter flex min-h-(--header-height) items-center justify-between gap-3 py-3 md:gap-6">
                        <SiteIdentity @click="followLink(localePath('/'))" />
                        <div class="flex shrink-0 items-center gap-1 md:gap-5">
                            <LocaleSwitch />
                            <DialogClose as-child>
                                <MenuToggle
                                    :open="true"
                                    :label="t('layouts.close')"
                                    :accessible-label="t('layouts.closeMenu')"
                                />
                            </DialogClose>
                        </div>
                    </div>
                    <nav
                        class="page-gutter pt-[30px] pb-10 md:pt-[60px]"
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
                </DialogContent>
            </Transition>
        </DialogPortal>
    </DialogRoot>
</template>
