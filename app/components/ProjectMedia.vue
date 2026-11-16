<script setup lang="ts">
import type { ProjectMedia } from "#shared/types/portfolio";

const props = defineProps<{ media: ProjectMedia; eager?: boolean }>();
const { t } = useI18n();
const video = useTemplateRef<HTMLVideoElement>("video");
const surface = useTemplateRef<HTMLElement>("surface");
const imageFailed = shallowRef(false);
const imageAttempt = shallowRef(0);
const { playing, failed, play, toggle, retry, ended, error } = useInlineVideo(video, surface);
const portrait = computed(() => props.media.height > props.media.width * 1.15);
const label = computed(() => `${t(playing.value ? "components.media.pause" : "components.media.playVideo")}: ${t(props.media.altKey)}`);
</script>

<template>
    <figure
        ref="surface"
        class="mx-auto w-full"
        :class="portrait ? 'max-w-[280px] md:max-w-[480px]' : ''"
        :data-media-src="media.src"
    >
        <template v-if="media.type === 'image'">
            <img
                v-show="!imageFailed"
                :key="imageAttempt"
                :src="media.src"
                :alt="t(media.altKey)"
                :width="media.width"
                :height="media.height"
                :loading="eager ? 'eager' : 'lazy'"
                decoding="async"
                class="mx-auto h-auto w-full object-contain"
                @error="imageFailed = true"
            >
            <div
                v-if="imageFailed"
                role="status"
                :style="{ aspectRatio: `${media.width}/${media.height}` }"
                class="flex w-full flex-col items-center justify-center gap-2 bg-surface p-3 text-center text-xs"
            >
                <p>{{ t(media.altKey) }}</p>
                <p class="text-muted">
                    {{ t('components.media.unavailable') }}
                </p>
                <button
                    type="button"
                    class="min-h-11 px-4 underline"
                    @click="imageFailed = false; imageAttempt++"
                >
                    {{ t('components.media.retry') }}
                </button>
            </div>
        </template>
        <template v-else>
            <AppTooltip :text="t('components.media.hint')">
                <button
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
                        @canplay="play()"
                        @play="playing = true"
                        @pause="playing = false"
                        @ended="ended"
                        @error="error"
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
                <p>{{ t('components.media.unavailable') }}</p>
                <button
                    type="button"
                    class="min-h-11 px-4 underline"
                    @click="retry"
                >
                    {{ t('components.media.retry') }}
                </button>
            </div>
        </template>
    </figure>
</template>
