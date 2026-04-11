<script setup lang="ts">
const { randomMessage } = useLoading();
let timeoutHandle: number | null = null;

const consoleOutputs = shallowReactive<string[]>([]);
function addRandomConsoleOutput() {
    let output = randomMessage();
    while (consoleOutputs.includes(output)) {
        output = randomMessage();
    }

    addConsoleOutput(output);
}
function addConsoleOutput(message: string) {
    // Limit to 5 console outputs
    if (consoleOutputs.length >= 5) {
        consoleOutputs.pop();
    }

    consoleOutputs.unshift(message);
}
function tick() {
    addRandomConsoleOutput();

    timeoutHandle = window.setTimeout(() => {
        tick();
    }, Math.random() * 500 + 300);
}

function getOpacity(index: number): number {
    return [1, 0.75, 0.5, 0.25, 0.1][index] ?? 0;
}

onMounted(() => {
    for (let i = 0; i < 5; i++) {
        addRandomConsoleOutput();
    }

    tick();
});

onUnmounted(() => {
    if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
    }
});
</script>

<template>
    <div class="fixed top-0 left-0 w-dvw h-dvh z-loading-page pt-[25dvh] bg-background">
        <LayoutContainer class="flex flex-col gap-y-2 justify-center">
            <ConsoleOutput
                v-for="(output, index) in consoleOutputs"
                :key="index"
                class="transition-opacity duration-100"
                :style="{
                    opacity: getOpacity(index),
                }"
            >
                {{ $t(output) }}
            </ConsoleOutput>
        </LayoutContainer>
    </div>
</template>
