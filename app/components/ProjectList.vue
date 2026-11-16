<script setup lang="ts">
import { createLayout } from "animejs";
import type { Project } from "#shared/types/portfolio";

const props = defineProps<{ projects: readonly Project[]; variant: "work" | "archive"; query?: Record<string, string>; label: string }>();
const { t } = useI18n();
const localePath = useLocalePath();
const app = useNuxtApp();
const list = useTemplateRef<HTMLOListElement>("list");
const reduced = usePreferredReducedMotion();
let layout: ReturnType<typeof createLayout> | undefined;
let layoutVersion = 0;
const { project, image, position, enter, move, focus, leave, clear } = useProjectPreview(() => props.projects);
watch(() => props.projects, async () => {
    clear();
    if (import.meta.server || props.variant !== "archive" || !list.value) return;
    const token = ++layoutVersion;
    // Hand initial entrance/scroll effects over to the list's layout animation.
    app.$motion.releaseList(list.value);
    if (reduced.value === "reduce") {
        layout?.revert();
        return;
    }
    layout ??= createLayout(list.value, {
        children: "[data-layout-row]", duration: 450, ease: "out(3)",
        enterFrom: { opacity: 0 }, leaveTo: { opacity: 0 },
    });
    layout.record();
    await nextTick();
    if (token === layoutVersion) layout.animate();
}, { flush: "pre" });
onBeforeUnmount(() => {
    layoutVersion++;
    layout?.revert();
});
</script>

<template>
    <section :aria-label="label">
        <div class="project-row project-row--heading px-[3px] font-mono text-[10px] text-muted md:px-3">
            <span>#</span><span>{{ t('pages.project.project') }}</span>
            <span class="hidden md:block">{{ t('pages.project.role') }}</span>
            <span class="hidden md:block">{{ t('pages.project.tags') }}</span>
            <span class="text-right">{{ t('pages.project.year') }}</span>
        </div>
        <ol ref="list">
            <li
                v-for="(item, index) in projects"
                :key="item.slug"
                :data-layout-id="`project-${item.slug}`"
                data-layout-row
            >
                <NuxtLink
                    :to="{ path: localePath(`/project/${item.slug}`), query }"
                    class="project-row border-t border-line px-[3px] py-6 hover:bg-surface focus-visible:bg-surface md:px-3"
                    :class="variant === 'work' ? 'project-row--work' : 'project-row--archive'"
                    :data-project-slug="item.slug"
                    @pointerenter="enter(item, $event)"
                    @pointermove="move(item, $event)"
                    @pointerleave="leave"
                    @focus="focus(item, $event)"
                    @blur="clear"
                >
                    <span class="font-mono text-[10px] text-muted">{{ String(index + 1).padStart(2, '0') }}</span>
                    <h2 class="project-name min-w-0">{{ item.title }}</h2>
                    <span class="hidden flex-wrap items-start gap-[7px] md:flex">
                        <ProfileBadge
                            v-for="profile in item.profiles"
                            :key="profile"
                            :profile="profile"
                        />
                    </span>
                    <span class="hidden flex-wrap items-start gap-[7px] md:flex">
                        <TagBadge
                            v-for="tag in item.tags"
                            :key="tag"
                            :tag="tag"
                            :project-slug="item.slug"
                        />
                    </span>
                    <span class="text-right font-mono text-[10px] text-muted md:text-xs">{{ item.year }}</span>
                </NuxtLink>
            </li>
        </ol>
    </section>
    <ClientOnly>
        <Teleport to="body">
            <div
                v-if="project"
                aria-hidden="true"
                class="pointer-events-none fixed inset-0 z-30 overflow-hidden"
            >
                <div
                    class="absolute top-0 left-0 origin-left will-change-transform"
                    data-project-preview
                    :style="{ width: `${position.width}px`, transform: `translate3d(${position.x}px,${position.y}px,0) rotate(${position.rotation}deg)` }"
                >
                    <img
                        :src="image"
                        alt=""
                        class="w-full object-contain"
                        :style="{ maxHeight: `${position.maxHeight}px` }"
                        decoding="async"
                        @error="clear"
                    >
                </div>
            </div>
        </Teleport>
    </ClientOnly>
</template>
