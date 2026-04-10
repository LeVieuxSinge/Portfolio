<script setup lang="ts">
import { createAnimatable, type AnimatableObject } from "animejs";

const props = withDefaults(defineProps<{
    project: ResolvedProject;
    direction?: "left" | "right";
    hoverEffect?: boolean;
    shadows?: boolean;
    clickable?: boolean;
    filteredBadges?: boolean;
}>(), {
    direction: "right",
    hoverEffect: false,
    shadows: true,
    clickable: false,
    filteredBadges: false,
});

const { selectedDeck, selectedTag } = useFilters();

const refRoot = useTemplateRef("refRoot");
let animatableCard: AnimatableObject | null = null;
function useAnimatableCard() {
    if (!animatableCard) {
        throw new Error("Animatable card not initialized yet");
    }
    return animatableCard;
}
let initialRotation = 0;

function onMouseEnter(e: MouseEvent) {
    if (!props.hoverEffect) return;

    if (animatableCard) {
        animatableCard.revert();
        animatableCard = null;
    }

    animatableCard = createAnimatable(e.target as HTMLElement, {
        perspective: { unit: "px", duration: 0 },
        rotateX: 200,
        rotateY: 200,
        rotate: 500,
        scale: 500,
        zIndex: 0,
        ease: "out(3)",
    });
    initialRotation = useAnimatableCard().rotate!() as number;

    useAnimatableCard().perspective!(1000, 0);
    useAnimatableCard().rotate!(0);
    useAnimatableCard().scale!(1.05);
    useAnimatableCard().zIndex!(10);

    const root = unref(refRoot);
    if (root) {
        root.$el.addEventListener("mousemove", onMouseMove);
    }
}

function onMouseLeave() {
    if (!props.hoverEffect) return;

    useAnimatableCard().rotate!(initialRotation);
    useAnimatableCard().rotateX!(0);
    useAnimatableCard().rotateY!(0);
    useAnimatableCard().scale!(1);
    useAnimatableCard().zIndex!(0);

    const root = unref(refRoot);
    if (root) {
        root.$el.removeEventListener("mousemove", onMouseMove);
    }
}

function onMouseMove(e: MouseEvent) {
    if (!props.hoverEffect) return;

    const root = unref(refRoot);
    if (!root) return;

    const rect = root.$el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const normalizedX = deltaX / (rect.width / 2);
    const normalizedY = deltaY / (rect.height / 2);

    // Clamp to [-1, 1]
    const nx = Math.max(-1, Math.min(1, normalizedX));
    const ny = Math.max(-1, Math.min(1, normalizedY));

    const rotateX = ny * 10;
    const rotateY = -nx * 10;

    useAnimatableCard().rotateX!(rotateX);
    useAnimatableCard().rotateY!(rotateY);
}
</script>

<template>
    <DeckCard
        ref="refRoot"
        :class="{
            'hover:shadow-accent-4': (props.shadows && props.hoverEffect) && props.project.featured,
            'hover:shadow-black': (props.shadows && props.hoverEffect) && !props.project.featured,
            'shadow-lg shadow-transparent transition-shadow duration-250': props.shadows,
        }"
        :path="props.project.path"
        :featured="props.project.featured"
        :clickable="props.clickable"
        :label="props.project.name"
        :image="props.project.cover"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <template #tags>
            <CommonBadgeYear size="sm">
                {{ props.project.year }}
            </CommonBadgeYear>
            <CommonBadgeDeck
                v-for="deck in props.project.decks"
                :key="deck.id"
                size="sm"
                :disabled="props.filteredBadges && !selectedDeck.some(option => option.value === deck.id)"
            >
                {{ $t(deck.label) }}
            </CommonBadgeDeck>
            <CommonBadgeTool
                v-for="tool in props.project.tools"
                :key="tool.id"
                size="sm"
                :disabled="props.filteredBadges && !selectedTag.some(option => option.value === tool.id)"
            >
                {{ $t(tool.name) }}
            </CommonBadgeTool>
            <CommonBadgeRole
                v-for="role in props.project.roles"
                :key="role.id"
                size="sm"
                :disabled="props.filteredBadges && !selectedTag.some(option => option.value === role.id)"
            >
                {{ $t(role.name) }}
            </CommonBadgeRole>
        </template>
    </DeckCard>
</template>
