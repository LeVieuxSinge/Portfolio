<!-- SSR-readable document-entry surface; composables own readiness, percentage timing, messages, and exit cleanup. -->
<script setup lang="ts">
const { t } = useI18n();

const panel = useTemplateRef<HTMLElement>("panel");
const number = useTemplateRef<HTMLElement>("number");
const foreground = useTemplateRef<HTMLElement>("foreground");
const log = useTemplateRef<HTMLElement>("log");

const { progress, owned, history } = useLoadingPresentation({ panel, number, foreground, log });
</script>

<template>
    <div
        ref="panel"
        class="fixed inset-0 z-entry-loader min-h-svh text-ink"
        data-entry-loader
    >
        <div
            class="loading-background absolute inset-0 bg-paper"
            data-loading-background
        />
        <div
            ref="foreground"
            class="absolute inset-0"
        >
            <ol
                ref="log"
                aria-hidden="true"
                class="absolute top-[35px] right-5 left-5 flex max-w-[650px] flex-col gap-1 font-mono text-[10px] leading-[1.55] uppercase md:top-(--gutter) md:right-(--gutter) md:left-(--gutter) md:text-xs"
            >
                <li
                    v-for="(message, index) in history"
                    :key="message"
                    data-reveal
                    class="flex items-start gap-2"
                    :style="{ opacity: 1 - index * 0.2 }"
                >
                    <Icon
                        name="console:chevron-right"
                        class="mt-0.5 size-3 shrink-0 md:size-3.5"
                    />
                    <span>{{ t(`loading.messages.${message}`) }}</span>
                </li>
            </ol>
            <span
                class="sr-only"
                role="status"
            >{{ t('loading.preparing') }}</span>
            <div
                role="progressbar"
                :aria-label="t('loading.readiness')"
                :aria-valuenow="progress"
                :aria-valuemin="0"
                :aria-valuemax="100"
                class="display-type absolute right-5 bottom-[35px] text-5xl md:right-(--gutter) md:bottom-10 md:text-[clamp(65px,7vw,120px)]"
            >
                <span
                    ref="number"
                    class="entry-counter"
                    :data-owned="owned || undefined"
                    :style="{ '--entry-count': progress }"
                    aria-hidden="true"
                /><span class="ml-2 font-mono text-[10px] md:text-sm">%</span>
            </div>
        </div>
    </div>
</template>
