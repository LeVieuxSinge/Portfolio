<script setup lang="ts">
import { DialogContent, DialogDescription, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from "reka-ui";
import { navigationItems } from "#shared/data/site";

const props = defineProps<{ blocked?: boolean }>();
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const header = useTemplateRef<HTMLElement>("header");
const panel = useTemplateRef<HTMLElement>("panel");
const menuHeaderHost = useTemplateRef<HTMLElement>("menuHeaderHost");
const { isOpen, teleported, iconOpen, opened, requestState, restoreFocus, followLink, identityClick, settle } = useModalNavigation(header, panel, menuHeaderHost);

useResizeObserver(header, ([entry]) => {
    if (entry) document.documentElement.style.setProperty("--header-height", `${entry.target.getBoundingClientRect().height}px`);
});
onBeforeUnmount(() => document.documentElement.style.removeProperty("--header-height"));
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
                class="site-header page-gutter fixed inset-x-0 top-0 z-site-header isolate flex min-h-(--header-min-height) items-center justify-between gap-3 py-3 md:gap-6"
            >
                <SiteIdentity @click.capture="identityClick" />
                <HeaderPageLabel />
                <nav
                    :aria-label="t('layouts.headerControls')"
                    class="flex shrink-0 items-center gap-1 md:gap-5"
                >
                    <LocaleSwitch @before-switch="settle" />
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
                class="fixed inset-0 z-overlay-ui isolate h-dvh overflow-hidden overscroll-contain text-ink"
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
                            v-for="(item, index) in navigationItems"
                            :key="item.id"
                            :to="localePath(item.path)"
                            :index="index + 1"
                            :title="t(`layouts.navigation.${item.id}`)"
                            :current="route.path === localePath(item.path)"
                            @navigate="followLink(localePath(item.path))"
                        />
                    </nav>
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
