<script setup lang="ts">
import { animate } from "animejs";

const { progress, ready, isRevealing, finish } = useLoading();
const { t } = useI18n();
const reduced = usePreferredReducedMotion();
const panel = useTemplateRef<HTMLElement>("panel");
const number = useTemplateRef<HTMLElement>("number");
const foreground = useTemplateRef<HTMLElement>("foreground");
const owned = shallowRef(false);
const elapsed = shallowRef(false);
let exiting = false;
const counter = { value: 0 };
let timer: ReturnType<typeof animate> | undefined;
let exit: ReturnType<typeof animate> | undefined;
let logAnimation: ReturnType<typeof animate> | undefined;
let foregroundExit: ReturnType<typeof animate> | undefined;
const log = useTemplateRef<HTMLElement>("log");
const remaining = useState<number[]>("entry-message-order", () => {
    const order = Array.from({ length: 16 }, (_, i) => i + 1);
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j]!, order[i]!];
    }
    return order;
});
const history = shallowRef<number[]>([remaining.value[0]!]);
let cursor = 1;
function insertMessage() {
    if (cursor >= remaining.value.length) return;
    history.value = [remaining.value[cursor++]!, ...history.value].slice(0, 5);
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
    const initialAnimation = number.value?.getAnimations().find(animation => (animation as CSSAnimation).animationName === "entry-progress-start");
    const sincePaint = Math.min(2000, Number(initialAnimation?.currentTime) || 0);
    const visibleProgress = Number.parseInt(number.value ? getComputedStyle(number.value).getPropertyValue("--entry-count") : "0") || 0;
    counter.value = visibleProgress;
    progress.value = visibleProgress;
    owned.value = true;
    while (cursor < Math.min(16, Math.floor(sincePaint / 800) + 1)) insertMessage();
    resume();
    timer = animate(counter, {
        value: [visibleProgress, 100], duration: Math.max(1, 2000 - sincePaint), ease: "linear",
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
    if (foreground.value) foregroundExit = animate(foreground.value, {
        opacity: [1, 0], ...(reduced.value !== "reduce" ? { y: [0, -20] } : {}), duration: 320, ease: "in(3)",
    });
    const background = panel.value.querySelector<HTMLElement>("[data-loading-background]")!;
    background.style.animation = "none";
    exit = animate(background, {
        opacity: [1, 0], duration: 500, ease: "inOut(3)", onComplete: finish,
    });
});
onBeforeUnmount(() => {
    timer?.revert();
    exit?.revert();
    logAnimation?.revert();
    foregroundExit?.revert();
    pause();
});
</script>

<template>
    <div
        ref="panel"
        class="fixed inset-0 z-[60] min-h-svh text-ink"
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
