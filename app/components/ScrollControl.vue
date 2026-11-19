<!-- Supplementary desktop/mobile progress control sharing its intro destination with the centered header label. -->
<script setup lang="ts">
const { t } = useI18n();
const { y, progress, introEnd, moveTo } = useDocumentScroll();
const { isOpen } = useMenu();
const { isLoading } = useLoading();

const label = computed(() => t(y.value > 8 ? "components.scroll.up" : "components.scroll.down"));

/**
 * Use the shared intro threshold at page start and return to top after scrolling; the service keeps movement interruptible.
 */
function activate() {
    moveTo(y.value > 8 ? 0 : introEnd.value);
}
</script>

<template>
    <aside
        v-if="!isOpen && !isLoading"
        class="fixed right-5 bottom-[calc(20px+env(safe-area-inset-bottom,0px))] z-30 md:right-[6px] md:bottom-[18px]"
    >
        <AppTooltip :text="label">
            <button
                type="button"
                :aria-label="label"
                class="relative flex size-14 flex-col items-center justify-center gap-[3px] rounded-full bg-paper md:min-h-[60px] md:w-11 md:gap-[6px] md:rounded-none md:bg-transparent"
                @click="activate"
            >
                <svg
                    aria-hidden="true"
                    viewBox="0 0 56 56"
                    class="absolute inset-0 size-14 md:hidden"
                >
                    <circle
                        cx="28"
                        cy="28"
                        r="26"
                        fill="none"
                        class="stroke-line"
                        stroke-width="1.5"
                    />
                    <circle
                        cx="28"
                        cy="28"
                        r="26"
                        fill="none"
                        class="origin-center -rotate-90 stroke-ink"
                        stroke-width="1.5"
                        pathLength="100"
                        stroke-dasharray="100"
                        :stroke-dashoffset="100 - progress"
                    />
                </svg>
                <Icon
                    v-if="y > 8"
                    name="material-symbols:arrow-upward-rounded"
                    class="size-5"
                    aria-hidden="true"
                />
                <Icon
                    v-else
                    name="material-symbols:arrow-downward-rounded"
                    class="size-5"
                    aria-hidden="true"
                />
                <span
                    class="font-mono text-[9px] leading-tight"
                    aria-hidden="true"
                >{{ String(Math.round(progress)).padStart(2, '0') }}%</span>
            </button>
        </AppTooltip>
    </aside>
</template>
