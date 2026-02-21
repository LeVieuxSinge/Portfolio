<script setup lang="ts">
import { createAnimatable, type AnimatableObject } from "animejs";

const props = withDefaults(defineProps<{
    project: Project;
    direction?: "left" | "right";
    clickable?: boolean;
}>(), {
    direction: "right",
    clickable: false,
});

let animatableCard: AnimatableObject | null = null;
function useAnimatableCard() {
    if (!animatableCard) {
        throw new Error("Animatable card not initialized yet");
    }
    return animatableCard;
}
let initialRotation = 0;

function onMouseEnter(e: MouseEvent) {
    if (animatableCard) {
        animatableCard.revert();
        animatableCard = null;
    }

    animatableCard = createAnimatable(e.target as HTMLElement, {
        rotateX: 200,
        rotateY: 200,
        rotate: 500,
        scale: 500,
        zIndex: 0,
        ease: "out(3)",
    });
    initialRotation = useAnimatableCard().rotate!();

    useAnimatableCard().rotate!(0);
    useAnimatableCard().scale!(1.05);
    useAnimatableCard().zIndex!(10);

    window.addEventListener("mousemove", onMouseMove);
}

function onMouseLeave() {
    useAnimatableCard().rotate!(initialRotation);
    useAnimatableCard().rotateX!(0);
    useAnimatableCard().rotateY!(0);
    useAnimatableCard().scale!(1);
    useAnimatableCard().zIndex!(0);

    window.removeEventListener("mousemove", onMouseMove);
}

function onMouseMove(e: MouseEvent) {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const rotateX = ((offsetY / rect.height) - 0.5) * 20;
    const rotateY = ((offsetX / rect.width) - 0.5) * 20;

    useAnimatableCard().rotateX!(rotateX);
    useAnimatableCard().rotateY!(rotateY);
}
</script>

<template>
    <DeckCardBase
        ref="refRoot"
        class="group relative overflow-hidden"
        :path="props.project.path"
        :featured="props.project.featured"
        :clickable="props.clickable"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <NuxtImg
            :src="props.project.cover"
            alt="Portfolio screenshot"
            class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div class="z-1 absolute inset-0 flex flex-col justify-between gap-y-4 p-4 ">
            <!-- Header -->
            <div class="flex justify-between items-start gap-x-4">
                <h2 class="font-title-lg">
                    {{ props.project.name }}
                </h2>

                <CommonBadge
                    v-if="props.project.featured"
                    text="Featured"
                    icon="material-symbols:star"
                    color="accent-4"
                />
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-end gap-x-4">
                <div class="flex flex-wrap gap-2">
                    <CommonBadge
                        text="Nuxt"
                        color="accent-3"
                    />
                    <CommonBadge
                        text="Tailwindcss"
                        color="accent-3"
                    />
                    <CommonBadge
                        text="Typescript"
                        color="accent-3"
                    />
                </div>

                <h5
                    class="font-label-sm text-subtext whitespace-nowrap opacity-0 transition-opacity duration-300"
                    :class="{
                        'group-hover:opacity-100': props.clickable,
                    }"
                >
                    Click me
                </h5>
            </div>
        </div>
    </DeckCardBase>
</template>
