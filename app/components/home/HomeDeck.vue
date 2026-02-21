<script setup lang="ts">
import { animate, onScroll, stagger, cubicBezier, random } from "animejs";

const props = defineProps<{
    deck: ResolvedDeck;
}>();

const refCover = useTemplateRef("refCover");
const refCards = useTemplateRef("refCards");

onMounted(() => {
    const container = document.querySelectorAll("body");

    const cover = unref(refCover);
    const cards = unref(refCards);
    if (!cover || !cards) return;

    animate(cover, {
        translateX: ["-100px", "0%"],
        translateY: ["20%", "0%"],
        rotate: ["-10deg", "0deg"],
        ease: cubicBezier(0.1, 0.7, 0.5, 1),
        autoplay: onScroll({
            container,
            enter: "bottom top-=20%",
            leave: "bottom-=30% bottom",
            sync: 0.6,
            debug: true,
        }),
    });

    animate(cards, {
        translateX: {
            from: (el, i, length) => {
                return `-${(100 / length) * (i + 1) + 25}%`;
            },
            to: "0%",
        },
        translateY: ["20%", "0%"],
        rotate: {
            from: "0deg",
            to: (el, i) => {
                return `${random(-2, 2) * i}deg`;
            },
        },
        ease: cubicBezier(0.1, 0.7, 0.5, 1),
        delay: stagger(25),
        autoplay: onScroll({
            container,
            enter: "bottom top-=20%",
            leave: "top+=30% bottom",
            sync: 0.4,
            // debug: true,
        }),
    });
});
</script>

<template>
    <LayoutGrid
        as="div"
        class="relative h-175 col-span-full mt-28"
    >
        <div
            ref="refCover"
            class="z-4 absolute col-span-2"
        >
            <HomeDeckCover
                :title="deck.name"
                :description="deck.description"
                :image="deck.image"
                :link="deck.link"
            />
        </div>
        <div
            v-for="(value, index) in 4"
            :key="index"
            ref="refCards"
            class="absolute col-span-2"
            :style="{
                zIndex: 3 - index,
                gridColumnStart: 2 + index,
            }"
        >
            <DeckCard />
        </div>
    </LayoutGrid>
</template>
