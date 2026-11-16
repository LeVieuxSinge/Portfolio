<script setup lang="ts">
import { animate } from "animejs";

const { progress, ready, isRevealing, finish } = useLoading();
const { t } = useI18n();
const reduced = usePreferredReducedMotion();
const panel = useTemplateRef<HTMLElement>("panel");
const elapsed = shallowRef(false);
let exiting = false;
const counter = { value: 0 };
let timer: ReturnType<typeof animate> | undefined;
let exit: ReturnType<typeof animate> | undefined;
let logAnimation: ReturnType<typeof animate> | undefined;
const log = useTemplateRef<HTMLElement>("log");
const history = shallowRef<number[]>([]);
const remaining = Array.from({ length: 16 }, (_, i) => i + 1);
for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j]!, remaining[i]!];
}
let cursor = 0;
function insertMessage() {
    if (cursor >= remaining.length) return;
    history.value = [remaining[cursor++]!, ...history.value].slice(0, 5);
    if (reduced.value !== "reduce") void nextTick(() => {
        logAnimation?.revert();
        if (log.value) logAnimation = animate(log.value, { y: [-5, 0], duration: 240, ease: "out(3)" });
    });
}
const { pause, resume } = useIntervalFn(() => {
    insertMessage();
    if (cursor === 16) pause();
}, 800, { immediate: false });
onMounted(() => {
    insertMessage();
    resume();
    timer = animate(counter, {
        value: [0, 100], duration: 2000, ease: "linear",
        onUpdate: () => { progress.value = Math.min(ready.value ? 100 : 99, Math.floor(counter.value)); },
        onComplete: () => { elapsed.value = true; },
    });
});
watch([ready, elapsed], async ([isReady, minimumElapsed]) => {
    if (!isReady || !minimumElapsed || exiting) return;
    exiting = true;
    progress.value = 100;
    isRevealing.value = true;
    pause();
    await nextTick();
    if (!panel.value) return finish();
    exit = animate(panel.value, {
        ...(reduced.value === "reduce" ? { opacity: [1, 0] } : { clipPath: ["inset(0 0 0% 0)", "inset(0 0 100% 0)"] }),
        duration: 500, ease: "inOut(4)", onComplete: finish,
    });
});
onBeforeUnmount(() => {
    timer?.revert();
    exit?.revert();
    logAnimation?.revert();
    pause();
});
</script>

<template>
    <div
        ref="panel"
        class="fixed inset-0 z-[60] min-h-svh bg-paper text-ink"
        data-entry-loader
    >
        <ol
            ref="log"
            aria-hidden="true"
            class="absolute top-[35px] right-5 left-5 flex max-w-[650px] flex-col gap-1 font-mono text-[10px] leading-[1.55] uppercase md:top-(--gutter) md:right-(--gutter) md:left-(--gutter) md:text-xs"
        >
            <li
                v-for="(message, index) in history"
                :key="message"
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
            {{ String(progress).padStart(3, '0') }}<span class="ml-2 font-mono text-[10px] md:text-sm">%</span>
        </div>
    </div>
</template>
