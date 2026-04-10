<script setup lang="ts">
import type { AnimatableObject } from "animejs";
import { createAnimatable } from "animejs";

let bMouseMoved = false;
let animatableIcon: AnimatableObject | null = null;
function useAnimatableIcon() {
    if (!animatableIcon) {
        throw new Error("Animatable icon not initialized yet");
    }
    return animatableIcon;
}

function onMousemove(event: MouseEvent) {
    // Show cursor on first mouse move
    // this is to prevent the cursor from showing up on page load if the user doesn't move their mouse
    if (!bMouseMoved) {
        bMouseMoved = true;
        useAnimatableIcon().opacity!(0.6);
    }

    const posX = event.clientX;
    const posY = event.clientY;

    useAnimatableIcon().x!(posX);
    useAnimatableIcon().y!(posY);

    if (event.target instanceof HTMLElement) {
        const isHoveringButton = event.target.closest("button, a") !== null;
        if (isHoveringButton) {
            onButtonMouseEnter();
        }
        else {
            onButtonMouseLeave();
        }
    }
}

function onMousedown() {
    // useAnimatableIcon().scale!(0);
}

function onMouseup() {
    // useAnimatableIcon().scale!(1);
}

function onButtonMouseEnter() {
    useAnimatableIcon().scale!(1.5);
    useAnimatableIcon().opacity!(1);
}

function onButtonMouseLeave() {
    useAnimatableIcon().scale!(1);
    useAnimatableIcon().opacity!(0.6);
}

onMounted(() => {
    animatableIcon = createAnimatable("#custom-cursor-icon", {
        x: 200,
        y: 200,
        scale: 200,
        opacity: 200,
        ease: "out(3)",
    });
    useAnimatableIcon().scale!(1);
    useAnimatableIcon().opacity!(0);

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mousedown", onMousedown);
    window.addEventListener("mouseup", onMouseup);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", onMousemove);
    window.removeEventListener("mousedown", onMousedown);
    window.removeEventListener("mouseup", onMouseup);
});
</script>

<template>
    <div
        ref="refRoot"
        class="fixed top-0 left-0 w-dvw h-dvh z-custom-cursor pointer-events-none"
    >
        <span
            id="custom-cursor-icon"
            class="absolute w-12 h-12 border border-text -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
    </div>
</template>
