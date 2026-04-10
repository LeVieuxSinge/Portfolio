<script setup lang="ts">
import { onScroll, splitText, stagger, createScope, cubicBezier, animate } from "animejs";

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

        // const { isSmall } = self.matches;

        // Animate subtitle: slide right and fade in, staggered by words
        splitText("#anim-context-subtitle", {
            words: { wrap: "clip" },
        }).addEffect(({ words }) => animate(words, {
            translateY: ["50px", 0],
            opacity: [0, 1],
            delay: stagger(250),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom-=20% bottom",
                sync: 0.8,
            }),
        }));

        // Animate title: slide right and fade in, staggered by words
        splitText("#anim-context-title", {
            words: { wrap: "clip" },
        }).addEffect(({ words }) => animate(words, {
            translateY: ["50px", 0],
            opacity: [0, 1],
            delay: stagger(500),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom-=20% bottom",
                sync: 0.8,
            }),
        }));

        // Animate body: slide up and fade in, staggered by lines
        animate("#anim-context-body", {
            translateY: ["50px", 0],
            opacity: [0, 1],
            delay: stagger(50),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom-=20% bottom",
                sync: 0.8,
            }),
        });
    });

    return () => {
        scope.revert();
    };
});
</script>

<template>
    <section
        id="home-context"
        ref="refRoot"
        class="relative h-[75dvh] lg:h-[50dvh] border-y border-border"
    >
        <LayoutContainer class="w-full h-full flex items-center">
            <div class="px-4 py-2 flex flex-col gap-y-4">
                <span
                    id="anim-context-subtitle"
                    class="font-label-md text-accent-3"
                >
                    {{ $t("components.home.context.subtitle") }}
                </span>
                <h1
                    id="anim-context-title"
                    class="font-display-md"
                >
                    {{ $t("components.home.context.title") }}
                </h1>
                <p
                    id="anim-context-body"
                    class="font-body-md text-muted"
                >
                    {{ $t("components.home.context.description") }}
                </p>
            </div>
        </LayoutContainer>
    </section>
</template>
