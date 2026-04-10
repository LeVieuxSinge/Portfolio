<script setup lang="ts">
import type { JSAnimation } from "animejs";
import { animate } from "animejs";

const { isLoading, randomMessage } = useLoading();
const minimumDuration = 3000; // Minimum duration of the loading screen in milliseconds
let startTime = 0;
let elapsedTime = 0;
let timeoutHandle: number | null = null;
const isLoadingSuccessful = ref(false);
let interactionAnimationHandle: JSAnimation | null = null;
const interactionTimeoutProgress = ref(0);
const interactionDelay = 3000; // Delay for the user interaction after loading is successful in milliseconds

interface ConsoleOutput {
    message: string;
    status: "normal" | "successful";
}

const consoleOutputs = shallowReactive<ConsoleOutput[]>([]);
function addRandomConsoleOutput() {
    let output = randomMessage();
    while (consoleOutputs.some(o => o.message === output)) {
        output = randomMessage();
    }

    addConsoleOutput(output, "normal");
}
function addConsoleOutput(message: string, status: "normal" | "successful" = "normal") {
    // Limit to 5 console outputs
    if (consoleOutputs.length >= 5) {
        consoleOutputs.pop();
    }

    consoleOutputs.unshift({ message, status });
}
function getEstimatedProgressRatio() {
    return (2 / Math.PI * 100) * Math.atan(elapsedTime / minimumDuration * 100 / 50) / 100;
}
function tick() {
    elapsedTime = Date.now() - startTime;

    if (elapsedTime >= minimumDuration) {
        if (timeoutHandle !== null) {
            clearTimeout(timeoutHandle);
            timeoutHandle = null;
        }

        addConsoleOutput("loading.successful", "successful");
        isLoadingSuccessful.value = true;

        const target = { v: 0 };
        interactionAnimationHandle = animate(target, {
            v: 100,
            ease: "linear",
            delay: 500,
            duration: interactionDelay,
            onUpdate() {
                interactionTimeoutProgress.value = target.v;
            },
            onComplete() {
                isLoading.value = false;
            },
        });

        return;
    }

    addRandomConsoleOutput();

    // Schedule the next tick based on the estimated progress ratio
    const estimatedProgressRatio = getEstimatedProgressRatio();
    const nextTickDelay = Math.max(100, (1 - estimatedProgressRatio) * 1000); // Adjust the delay as needed
    timeoutHandle = window.setTimeout(() => {
        tick();
    }, nextTickDelay);
}

const { pressed } = useMousePressed();
watch(pressed, (newPressed) => {
    if (newPressed && isLoadingSuccessful.value) {
        isLoading.value = false;
    }
});

onMounted(() => {
    startTime = Date.now();
    tick();
});

onUnmounted(() => {
    if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle);
    }
    if (interactionAnimationHandle) {
        interactionAnimationHandle.cancel();
    }
});
</script>

<template>
    <div class="fixed top-0 left-0 w-dvw h-dvh z-loading-splash flex items-center bg-background">
        <LayoutContainer class="h-full max-h-3/4 flex flex-col justify-between px-10">
            <div class="flex flex-col items-start gap-y-3">
                <OSVersion />
                <div class="flex flex-col gap-y-2">
                    <ConsoleOutput
                        v-for="(output, index) in consoleOutputs"
                        :key="index"
                        :color="output.status === 'successful' ? 'accent-1' : 'text'"
                        class="font-label-md transition-opacity duration-100"
                        :style="{
                            opacity: (consoleOutputs.length - index) ** 2 / (consoleOutputs.length ** 2), // Fade out older messages more quickly
                        }"
                    >
                        {{ $t(output.message) }}
                    </ConsoleOutput>
                </div>
            </div>

            <div class="flex flex-col items-end">
                <Transition
                    appear
                    enter-active-class="transition-opacity duration-500"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                >
                    <div
                        v-if="isLoadingSuccessful"
                        class="flex flex-col gap-y-1"
                    >
                        <div class="font-label-md text-right">
                            {{ $t("loading.continue") }}
                        </div>
                        <figure
                            ref="refInteractionTimeout"
                            class="w-0 h-px bg-text"
                            :style="{
                                width: `${interactionTimeoutProgress}%`,
                            }"
                        />
                    </div>
                </Transition>
            </div>
        </LayoutContainer>
    </div>
</template>
