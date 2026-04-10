<script setup lang="ts">
import { animate, createScope, cubicBezier, onScroll, splitText, stagger } from "animejs";

const { isMobileOrTablet } = useDevice();

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

        // const { isSmall } = self.matches || {};

        // Animate name: slide up and fade out, staggered by word
        splitText("#anim-home-about-title", {
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
        splitText("#anim-home-about-body", {
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

        // Animate dev: typewriter effect
        splitText("#anim-home-about-dev", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            opacity: [0, 1],
            duration: 0,
            delay: stagger(250),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom-=30% bottom",
                sync: 0.8,
            }),
        }));

        // Animate anomaly: typewriter effect
        splitText("#anim-home-about-anomaly", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            opacity: [0, 1],
            duration: 0,
            delay: stagger(50, { start: 2000 }),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=20% top",
            }),
        }));

        // Animate contact: slide up and fade in, staggered by lines
        animate("#anim-home-about-contact", {
            translateY: ["50px", 0],
            opacity: [0, 1],
            delay: stagger(200),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=10% top",
                leave: "bottom bottom",
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
        id="home-about"
        ref="refRoot"
        class="h-dvh pb-4 md:pb-6"
    >
        <LayoutContainer
            v-if="isMobileOrTablet"
            class="size-full flex flex-col justify-between py-21"
        >
            <div class="flex flex-col gap-y-2">
                <h1
                    id="anim-home-about-title"
                    class="font-display-sm"
                >
                    {{ $t("components.home.about.title") }}
                </h1>
                <p
                    id="anim-home-about-body"
                    class="font-body-md text-muted"
                >
                    {{ $t("components.home.about.body") }}
                </p>
            </div>

            <div>
                <p
                    id="anim-home-about-dev"
                    class="font-body-md text-toned"
                >
                    {{ $t("components.home.about.thanks") }} <NuxtLinkLocale
                        id="anim-home-about-dev"
                        to="/about"
                    >
                        <span class="underline flashing-color font-bold">dev</span>
                    </NuxtLinkLocale>.
                </p>
                <ConsoleOutput
                    id="anim-home-about-anomaly"
                    color="accent-2"
                    size="sm"
                >
                    {{ $t("components.home.about.anomaly") }}
                </ConsoleOutput>
            </div>

            <div
                id="anim-home-about-contact"
                class="flex flex-col gap-y-3"
            >
                <h4 class="font-title-lg">
                    contact
                </h4>
                <a
                    href="mailto:xavierchampoux@hotmail.com"
                    class="h-12 flex items-center font-label-sm underline"
                >
                    xavierchampoux@hotmail.com
                </a>
                <div class="flex gap-x-10 text-muted">
                    <a
                        href="https://www.instagram.com/xavier-champoux/"
                        target="_blank"
                        class="w-12 h-12 flex justify-center items-center hover:text-accent-4 transition-colors duration-300"
                    >
                        <Icon
                            name="i-lucide-instagram"
                            size="20"
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/xavier-champoux/"
                        target="_blank"
                        class="w-12 h-12 flex justify-center items-center hover:text-accent-2 transition-colors duration-300"
                    >
                        <Icon
                            name="i-lucide-youtube"
                            size="20"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/xavier-champoux/"
                        target="_blank"
                        class="w-12 h-12 flex justify-center items-center hover:text-accent-3 transition-colors duration-300"
                    >
                        <Icon
                            name="i-lucide-linkedin"
                            size="20"
                        />
                    </a>
                    <a
                        href="https://github.com/xavier-champoux"
                        target="_blank"
                        class="w-12 h-12 flex justify-center items-center hover:text-accent-1 transition-colors duration-300"
                    >
                        <Icon
                            name="i-lucide-github"
                            size="20"
                        />
                    </a>
                </div>
            </div>
        </LayoutContainer>

        <div
            v-else
            class="h-full flex justify-between"
        >
            <div class="flex-none w-125 max-w-full flex flex-col justify-between pl-12 pr-6 pt-24 pb-12">
                <div class="flex flex-col gap-y-6">
                    <h1
                        id="anim-home-about-title"
                        class="font-display-md"
                    >
                        {{ $t("components.home.about.title") }}
                    </h1>
                    <p
                        id="anim-home-about-body"
                        class="font-body-md text-muted"
                    >
                        {{ $t("components.home.about.body") }}
                    </p>
                </div>

                <div>
                    <p
                        id="anim-home-about-dev"
                        class="font-body-md text-toned"
                    >
                        {{ $t("components.home.about.thanks") }} <NuxtLinkLocale
                            id="anim-home-about-dev"
                            to="/about"
                        >
                            <span class="underline flashing-color font-bold">dev</span>
                        </NuxtLinkLocale>.
                    </p>
                    <ConsoleOutput
                        id="anim-home-about-anomaly"
                        color="accent-2"
                        size="sm"
                    >
                        {{ $t("components.home.about.anomaly") }}
                    </ConsoleOutput>
                </div>

                <div
                    id="anim-home-about-contact"
                    class="flex flex-col gap-y-3"
                >
                    <h4 class="font-title-lg">
                        contact
                    </h4>
                    <a
                        href="mailto:xavierchampoux@hotmail.com"
                        class="h-12 flex items-center font-label-sm underline"
                    >
                        xavierchampoux@hotmail.com
                    </a>
                    <div class="flex gap-x-10 text-muted">
                        <a
                            href="https://www.instagram.com/xavier-champoux/"
                            target="_blank"
                            class="w-6 h-6 flex justify-center items-center hover:text-accent-4 transition-colors duration-300"
                        >
                            <Icon
                                name="i-lucide-instagram"
                                size="20"
                            />
                        </a>
                        <a
                            href="https://www.youtube.com/channel/xavier-champoux/"
                            target="_blank"
                            class="w-6 h-6 flex justify-center items-center hover:text-accent-2 transition-colors duration-300"
                        >
                            <Icon
                                name="i-lucide-youtube"
                                size="20"
                            />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/xavier-champoux/"
                            target="_blank"
                            class="w-6 h-6 flex justify-center items-center hover:text-accent-3 transition-colors duration-300"
                        >
                            <Icon
                                name="i-lucide-linkedin"
                                size="20"
                            />
                        </a>
                        <a
                            href="https://github.com/xavier-champoux"
                            target="_blank"
                            class="w-6 h-6 flex justify-center items-center hover:text-accent-1 transition-colors duration-300"
                        >
                            <Icon
                                name="i-lucide-github"
                                size="20"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <div
                class="flex-auto border-l border-border overflow-hidden"
            >
                <SceneHead />
            </div>
        </div>
    </section>
</template>

<style lang="css" scoped>
.flashing-color {
    animation: flashing-color 3s ease-in-out infinite;
}

@keyframes flashing-color {
    0% {
        color: var(--color-accent-1);
    }
    25% {
        color: var(--color-accent-2);
    }
    50% {
        color: var(--color-accent-3);
    }
    75% {
        color: var(--color-accent-4);
    }
    100% {
        color: var(--color-accent-1);
    }

}
</style>
