<script setup lang="ts">
import { animate, createScope, cubicBezier, onScroll, splitText, stagger, utils } from "animejs";

const { isMobileOrTablet } = useDevice();

const { resolvedDecks } = useProjectsData();

const refRoot = useTemplateRef<HTMLElement>("refRoot");

useSafeAnimations(() => {
    const root = unref(refRoot);
    if (!root) return;

    const scope = createScope({
        mediaQueries: { isSmall: "(max-width: 1024px)" },
        root: root,
        defaults: {
            ease: cubicBezier(0.7, 0.1, 0.5, 0.9),
        },
    });

    scope.add((self) => {
        if (!self) return;

        // Animate name: slide up and fade out, staggered by word
        splitText("#anim-decks-title", {
            words: { wrap: "clip" },
        }).addEffect(({ words }) => animate(words, {
            translateY: ["100%", 0],
            opacity: [0, 1],
            delay: stagger(200),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom-=20% bottom",
                sync: 0.8,
            }),
        }));

        // Animate name: slide up and fade out, staggered by word
        splitText("#anim-decks-subtitle", {
            words: { wrap: "clip" },
        }).addEffect(({ words }) => animate(words, {
            translateY: ["100%", 0],
            opacity: [0, 1],
            delay: stagger(200),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom-=20% bottom",
                sync: 0.8,
            }),
        }));

        // Animate each deck card with a stagger
        const deckElements = utils.$(".anim-decks-decks");
        for (const el of deckElements) {
            animate(el, {
                translateY: ["50px", 0],
                opacity: [0, 1],
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                    enter: "bottom-=10% top",
                    leave: "bottom-=20% bottom",
                    sync: 0.8,
                }),
            });
        }
    });

    return () => {
        scope.revert();
    };
});
</script>

<template>
    <section
        id="home-decks"
        ref="refRoot"
        class="relative"
    >
        <div
            v-if="isMobileOrTablet"
            class="flex flex-col gap-y-30 py-2 border-t border-border"
        >
            <LayoutContainer class="flex flex-col gap-y-1 pt-15">
                <h1
                    id="anim-decks-title"
                    class="font-display-sm"
                >
                    {{ $t("components.home.decks.title") }}
                </h1>
                <ConsoleOutput
                    id="anim-decks-subtitle"
                    color="muted"
                    size="sm"
                >
                    {{ $t("components.home.decks.hint") }}
                </ConsoleOutput>
            </LayoutContainer>

            <LayoutContainer class="flex flex-wrap justify-center gap-x-10 gap-y-30 pb-20">
                <HomeDeck
                    v-for="deck in resolvedDecks"
                    :key="deck.id"
                    :deck="deck"
                    class="anim-decks-decks w-75 pointer-events-auto aspect-[83.25/131.25]!"
                />
            </LayoutContainer>
        </div>

        <div
            v-else
            class="flex flex-col gap-y-30 py-2 border-t border-border"
        >
            <div class="flex-none w-full flex flex-col gap-y-6 px-12 pt-18">
                <h1
                    id="anim-decks-title"
                    class="font-display-md"
                >
                    {{ $t("components.home.decks.title") }}
                </h1>
                <ConsoleOutput
                    id="anim-decks-subtitle"
                    color="muted"
                >
                    {{ $t("components.home.decks.hint") }}
                </ConsoleOutput>
            </div>

            <div class="flex flex-wrap justify-center gap-x-10 gap-y-30 pb-20 px-20">
                <HomeDeck
                    v-for="deck in resolvedDecks"
                    :key="deck.id"
                    :deck="deck"
                    class="anim-decks-decks w-83.25 pointer-events-auto"
                />
            </div>
        </div>
    </section>
</template>
