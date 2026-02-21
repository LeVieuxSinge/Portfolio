<script setup lang="ts">
import { animate, random } from "animejs";

const locale = computed(() => useI18n().locale.value);

function onEnter(el: Element, done: () => void) {
    console.log("enter", el);
    animate(el, {
        translateY: ["-100%", "0%"],
        ease: "linear",
        duration: 1500,
        delay: random(0, 100),
        onComplete: () => {
            console.log("enter complete");
            done();
        },
    });
}

function onLeave(el: Element, done: () => void) {
    console.log("leave", el);
    animate(el, {
        translateY: "100%",
        ease: "linear",
        duration: 1500,
        delay: random(0, 100),
        onComplete: () => {
            console.log("leave complete");
            done();
        },
    });
}
</script>

<template>
    <div class="flex flex-col gap-y-3">
        <h5 class="font-body-md text-subtext">
            {{ $t("home.hero.hint") }}
        </h5>
        <h1 class="font-display-lg">
            Curious
        </h1>
        <div class="flex font-display-lg">
            <div
                v-for="(v, index) in $t('projects').split('')"
                :key="locale + index"
                class="relative overflow-hidden"
            >
                <!-- Placeholder -->
                <span class="opacity-0">
                    {{ v }}
                </span>

                <Transition
                    :css="false"
                    mode="out-in"
                    @enter="onEnter"
                    @leave="onLeave"
                >
                    <!-- Visible character -->
                    <span
                        :key="locale"
                        class="absolute inset-0"
                    >
                        a
                    </span>
                </Transition>
            </div>
        </div>
        <ConsoleOutput color="accent-1">
            Good call!
        </ConsoleOutput>
    </div>
</template>
