<!-- Native button activation wraps muted inline video; playback policy and native events live in useInlineVideo. -->
<script setup lang="ts">
import type { ProjectVideo } from "#shared/types/portfolio";

const props = defineProps<{
    /** Video-only record with required retained poster and intrinsic dimensions. */
    media: ProjectVideo;
    /** Preload only metadata for the leading video; gallery videos defer loading until needed. */
    eager?: boolean;
}>();

const { t } = useI18n();

const video = useTemplateRef<HTMLVideoElement>("video");
const surface = useTemplateRef<HTMLElement>("surface");

const { playing, failed, toggle, retry } = useInlineVideo(video, surface);

const label = computed(() => `${t(playing.value ? "components.media.pause" : "components.media.playVideo")}: ${t(props.media.altKey)}`);
</script>

<template>
    <AppTooltip :text="t('components.media.hint')">
        <button
            ref="surface"
            type="button"
            class="relative block w-full bg-surface"
            :aria-label="label"
            :aria-pressed="playing"
            :disabled="failed"
            @click="toggle"
        >
            <video
                ref="video"
                :src="media.src"
                :poster="media.poster"
                :width="media.width"
                :height="media.height"
                muted
                playsinline
                :preload="eager ? 'metadata' : 'none'"
                disablepictureinpicture
                disableremoteplayback
                tabindex="-1"
                aria-hidden="true"
                class="h-auto w-full object-contain"
            />
            <span
                v-if="!playing && !failed"
                aria-hidden="true"
                class="pointer-events-none absolute top-1/2 left-1/2 flex -translate-1/2 items-center gap-2.5 rounded bg-paper px-[18px] py-3 text-[13px]"
            >
                <Icon
                    name="material-symbols:play-arrow-outline-rounded"
                    class="size-5"
                />{{ t('components.media.play') }}
            </span>
        </button>
    </AppTooltip>
    <div
        v-if="failed"
        role="status"
        class="flex flex-wrap items-center justify-center gap-4 bg-surface p-5 text-sm"
    >
        <p data-reveal>
            {{ t('components.media.unavailable') }}
        </p>
        <button
            type="button"
            class="min-h-11 px-4 underline"
            @click="retry"
        >
            {{ t('components.media.retry') }}
        </button>
    </div>
</template>
