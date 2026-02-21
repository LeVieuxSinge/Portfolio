<script setup lang="ts">
const loadingMessages = computed(() => useLoadingStore().loadingMessages);
let timeoutHandle: number | null = null;

const consoleOutputs = shallowReactive<string[]>([]);
function getRandomLoadingMessage() {
    return loadingMessages.value[Math.floor(Math.random() * loadingMessages.value.length)]!;
}
function addRandomConsoleOutput() {
    let output = getRandomLoadingMessage();
    while (consoleOutputs.includes(output)) {
        output = getRandomLoadingMessage();
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
    return [0.2, 0.5, 1, 0.5, 0.2][index] ?? 0;
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
    <div class="fixed z-loading-page inset-0 flex flex-col items-center justify-center gap-y-1 bg-background">
        <ConsoleOutput
            v-for="(output, index) in consoleOutputs"
            :key="index"
            class="transition-opacity duration-100"
            :style="{
                opacity: getOpacity(index),
            }"
        >
            {{ $t("loading") }} {{ $t(output) }}
        </ConsoleOutput>
    </div>
</template>
