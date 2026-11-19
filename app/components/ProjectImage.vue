<script setup lang="ts">
import type { ProjectImage } from "#shared/types/portfolio";

const props = defineProps<{ media: ProjectImage; eager?: boolean }>();
const { t } = useI18n();
const { failed, attempt, fail, retry } = useImageRecovery(() => props.media.src);
</script>

<template>
    <img
        v-show="!failed"
        :key="attempt"
        :src="media.src"
        :alt="t(media.altKey)"
        :width="media.width"
        :height="media.height"
        :loading="eager ? 'eager' : 'lazy'"
        decoding="async"
        class="mx-auto h-auto w-full object-contain"
        @error="fail"
    >
    <div
        v-if="failed"
        role="status"
        :style="{ aspectRatio: `${media.width}/${media.height}` }"
        class="flex w-full flex-col items-center justify-center gap-2 bg-surface p-3 text-center text-xs"
    >
        <p data-reveal>
            {{ t(media.altKey) }}
        </p>
        <p
            data-reveal
            class="text-muted"
        >
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
