<script setup lang="ts">
import { animate, createScope, stagger, cubicBezier, utils, onScroll, createAnimatable, splitText } from "animejs";

definePageMeta({
    name: "about",
});

const { isMobileOrTablet } = useDevice();
const { width } = useWindowSize();
const { t } = useI18n();

const cvItems = computed(() => [
    {
        type: "experiences",
        entries: [
            {
                date: "[2021 - 2026]",
                title: t("pages.about.cv.experiences.pixistudio.title"),
                details: "Pixistudio - Montréal",
            },
            {
                date: "[2019 - 2021]",
                title: t("pages.about.cv.experiences.retiredAssociation.title"),
                details: "Association des Retraité.es du Cégep de Saint-Hyacinthe",
            },
        ],
    },
    {
        type: "education",
        entries: [
            {
                date: "[2018 - 2021]",
                title: t("pages.about.cv.education.computationArts.title"),
                details: t("pages.about.cv.education.computationArts.details"),
            },
            {
                date: "[2016 - 2018]",
                title: t("pages.about.cv.education.arts.title"),
                details: "Cégep de Saint-Hyacinthe - Saint-Hyacinthe",
            },
        ],
    },
    {
        type: "awards",
        entries: [
            {
                date: "[2018]",
                title: t("pages.about.cv.awards.fofa.title"),
                details: t("pages.about.cv.awards.fofa.details"),
            },
            {
                date: "[2018]",
                title: t("pages.about.cv.awards.arts.title"),
                details: "Cégep de Saint-Hyacinthe - Saint-Hyacinthe",
            },
        ],
    },
    {
        type: "public_presence",
        entries: [
            {
                date: "[2025]",
                title: t("pages.about.cv.publicPresence.forumLaval.title"),
                details: "Forum in! de Laval Innov - Laval",
            },
            {
                date: "[2022]",
                title: t("pages.about.cv.publicPresence.siggraph.title"),
                details: "SIGGRAPH - Vancouver",
            },
            {
                date: "[2020]",
                title: t("pages.about.cv.publicPresence.chinaCanadaVR.title"),
                details: "China Canada VR Technology Summit",
            },
            {
                date: "[2018]",
                title: t("pages.about.cv.publicPresence.nousTv.title"),
                details: "NousTV Saint-Hyacinthe",
            },
        ],
    },
    {
        type: "teaching",
        entries: [
            {
                date: "[2025]",
                title: t("pages.about.cv.teaching.pixistudio.title"),
                details: "Pixistudio - Montréal",
            },
        ],
    },
]);

const refRoot = useTemplateRef("refRoot");

useSafeAnimations(() => {
    const root = unref(refRoot);
    if (!root) return;

    const scope = createScope({
        root: root,
        mediaQueries: {
            isSmall: "(max-width: 1024px)",
            canHover: "(hover: hover) and (pointer: fine)",
        },
        defaults: {
            ease: cubicBezier(0.7, 0.1, 0.5, 0.9),
        },
    });

    // Animate the curtain cards with a floating effect
    scope.add(() => {
        const cards = utils.$(".anim-about-cards");

        utils.set(cards, {
            rotate: () => utils.random(-2, 2),
        });

        // Floating animation
        animate(cards, {
            translateY: () => `${utils.random(-2, 0)}dvh`,
            duration: 2000,
            alternate: true,
            loop: true,
            ease: "inOutSine",
        });
    });

    // Animate the mystery card with mouse movement or floating animation
    scope.add((scope) => {
        if (!scope) return;
        const { matches } = scope;

        const mysteryCard = utils.$("#anim-about-mystery-card")[0] as HTMLElement | null;
        if (!mysteryCard) return;

        // Animate wrapper rotation with mouse
        const animatable = createAnimatable(mysteryCard, {
            perspective: { unit: "px", duration: 0 },
            rotateX: 0,
            rotateY: 0,
        });
        animatable.perspective!(1000, 0);

        const onMousemove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const normalizedX = deltaX / (window.innerWidth / 2);
            const normalizedY = deltaY / (window.innerHeight / 2);

            // Clamp to [-1, 1]
            const nx = Math.max(-1, Math.min(1, normalizedX));
            const ny = Math.max(-1, Math.min(1, normalizedY));

            const rotateX = ny * 10;
            const rotateY = -nx * 10;

            animatable.rotateX!(rotateX);
            animatable.rotateY!(rotateY);
        };
        if (matches.canHover) {
            window.addEventListener("mousemove", onMousemove);
        }
        else {
            // If no mouse, add a subtle floating animation to the card
            animate(mysteryCard, {
                translateY: ["-5dvh", "5dvh"],
                rotateX: [-4, 4],
                rotateY: [-4, 4],
                duration: 4000,
                alternate: true,
                loop: true,
                ease: "inOutSine",
            });
        }

        // Introduce in frame
        animate(mysteryCard, {
            translateY: ["-75dvh", 0],
            duration: 2000,
            autoplay: true,
            ease: cubicBezier(0.648, -0.001, 0.293, 0.956),
            onComplete: () => {
                // Animate on scroll
                animate(mysteryCard, {
                    translateY: [0, "20dvh"],
                    opacity: [1, 0],
                    autoplay: onScroll({
                        container: document.body || document.documentElement,
                        enter: "top+=20% top",
                        leave: "top bottom",
                        sync: 0.8,
                    }),
                });
            },
        });

        return () => {
            if (matches.canHover) {
                window.removeEventListener("mousemove", onMousemove);
            }
        };
    });

    // Animate header texts
    scope.add(() => {
        splitText("#anim-about-header-title", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            translateX: [-100, 0],
            duration: 1000,
            delay: stagger(50),
        }));

        splitText("#anim-about-header-name", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            translateX: [-100, 0],
            duration: 1000,
            delay: stagger(50, { start: 500 }),
        }));

        splitText("#anim-about-header-console", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            opacity: [0, 1],
            duration: 0,
            delay: stagger(100, { start: 1500 }),
        }));
    });

    // On scroll fade in and translate up animation for generic targets
    scope.add(() => {
        const targets = utils.$(".anim-about-generic");
        for (const target of targets) {
            animate(target, {
                translateY: [20, 0],
                opacity: [0, 1],
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                }),
            });
        }
    });

    // Animate tragic ending texts
    scope.add(() => {
        const signatureAnim = animate("#anim-about-tragic-signature", {
            opacity: [0, 1],
            duration: 500,
            autoplay: false,
        });
        signatureAnim.init();

        const responseSplit = splitText("#anim-about-tragic-response", {
            chars: { wrap: "clip" },
        });
        const responseAnim = animate(responseSplit.chars, {
            opacity: [0, 1],
            duration: 0,
            delay: stagger(100, { start: 500 }),
            autoplay: false,
            onComplete: () => {
                signatureAnim.play();
            },
        });
        responseAnim.init();

        splitText("#anim-about-tragic-console", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            opacity: [0, 1],
            duration: 0,
            delay: stagger(1500 / chars.length),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "top+=80% top",
            }),
            onComplete: () => {
                responseAnim.play();
            },
        }));
    });

    return () => {
        scope.revert();
    };
});
</script>

<template>
    <main
        ref="refRoot"
        class="relative px-2 lg:px-6"
    >
        <!-- Card Curtain -->
        <div class="absolute z-1 top-0 inset-x-0 h-[max(15dvh,100px)] flex justify-center items-end overflow-hidden pb-4">
            <DeckCardBase
                v-for="i in Math.ceil(width / (isMobileOrTablet ? 300 : 340))"
                :key="i"
                class="anim-about-cards flex-none w-75 lg:w-83.25 aspect-[83.25/131.25]!"
            />
        </div>

        <LayoutContainer
            class="relative pt-50 pb-21 lg:pt-[max(25dvh,150px)] flex flex-col justify-between gap-y-10"
        >
            <!-- Header -->
            <div class="flex flex-col lg:flex-row lg:items-center gap-y-10">
                <!-- Card -->
                <div
                    id="anim-about-mystery-card"
                    class="lg:order-1 flex justify-center"
                >
                    <div class="flex flex-col items-center gap-y-2 origin-center -skew-x-3 rotate-4">
                        <DeckCardBase
                            class="w-75 lg:w-83.25 aspect-[83.25/131.25]! flex justify-center items-center font-label-sm text-muted"
                        >
                            {{ $t("pages.about.mysteryCard.label") }}
                        </DeckCardBase>
                        <div class="flex items-center gap-x-1 font-label-sm text-muted">
                            <Icon name="i-lucide-chevron-down" />
                            {{ $t("pages.about.mysteryCard.hint") }}
                            <Icon name="i-lucide-chevron-down" />
                        </div>
                    </div>
                </div>

                <!-- Title -->
                <div class="lg:z-1 flex flex-col items-start gap-y-3">
                    <div
                        id="anim-about-header-title"
                        class="font-display-sm"
                    >
                        {{ $t("pages.about.header.subtitle") }}
                    </div>
                    <div
                        id="anim-about-header-name"
                        class="font-display-md lg:font-display-lg text-accent-3"
                    >
                        Xavier<br>Champoux
                    </div>
                    <ConsoleOutput
                        id="anim-about-header-console"
                        size="md"
                        color="muted"
                    >
                        {{ $t("pages.about.header.ai") }}
                    </ConsoleOutput>
                </div>
            </div>

            <!-- Spacer -->
            <div class="h-40 lg:h-100" />

            <!-- About -->
            <div class="flex flex-col lg:flex-row lg:items-center gap-20 lg:gap-40">
                <!-- Portrait -->
                <div class="anim-about-generic lg:order-1 flex justify-center">
                    <div class="relative w-75 lg:w-83.25 max-w-full aspect-[83.25/131.25] flex flex-col justify-end rounded-lg border border-border overflow-hidden">
                        <img
                            src="~/assets/images/portrait.webp"
                            alt="Portrait of Xavier Champoux"
                            class="size-full object-cover"
                        >

                        <div class="absolute bottom-0 left-0 flex items-end gap-x-2 p-4">
                            <span class="font-display-sm">{{ $t("pages.about.portrait.title") }}</span>
                            <span class="font-body-md mb-1">26</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-y-10">
                    <!-- Origins -->
                    <div class="anim-about-generic flex flex-col gap-y-1">
                        <div class="font-label-md text-accent-3">
                            {{ $t("pages.about.origins.subtitle") }}
                        </div>
                        <div class="font-title-md">
                            {{ $t("pages.about.origins.title") }}
                        </div>
                        <p class="font-body-md text-muted">
                            <i18n-t keypath="pages.about.origins.body">
                                <template #br>
                                    <br>
                                </template>
                            </i18n-t>
                        </p>
                    </div>

                    <!-- Turning Point -->
                    <div class="anim-about-generic flex flex-col gap-y-1">
                        <div class="font-label-md text-accent-4">
                            {{ $t("pages.about.turningPoint.subtitle") }}
                        </div>
                        <div class="font-title-md">
                            {{ $t("pages.about.turningPoint.title") }}
                        </div>
                        <p class="font-body-md text-muted">
                            <i18n-t keypath="pages.about.turningPoint.body">
                                <template #br>
                                    <br>
                                </template>
                            </i18n-t>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Spacer -->
            <div class="h-[25dvh] lg:h-[40dvh]" />

            <!-- Motives -->
            <div class="anim-about-generic w-full max-w-175 mx-auto flex flex-col justify-center gap-y-1">
                <div class="font-label-md text-accent-1">
                    {{ $t("pages.about.motives.subtitle") }}
                </div>
                <div class="font-title-md">
                    {{ $t("pages.about.motives.title") }}
                </div>
                <p class="font-body-md text-muted">
                    <i18n-t keypath="pages.about.motives.body">
                        <template #br>
                            <br>
                        </template>
                    </i18n-t>
                </p>
            </div>

            <!-- Spacer -->
            <div class="h-dvh" />

            <!-- Tragic Ending -->
            <div class="w-full max-w-175 mx-auto flex flex-col gap-y-4">
                <ConsoleOutput
                    id="anim-about-tragic-console"
                    :size="isMobileOrTablet ? 'sm' : 'md'"
                    color="muted"
                >
                    <i18n-t keypath="pages.about.tragicEnding.ai">
                        <template #best>
                            <span class="text-text">{{ $t("dict.best") }}</span>
                        </template>
                        <template #worst>
                            <span class="text-accent-2">{{ $t("dict.worst") }}</span>
                        </template>
                    </i18n-t>
                </ConsoleOutput>
                <div class="w-full flex flex-col items-end font-body-sm lg:font-body-md gap-y-1">
                    <span id="anim-about-tragic-response">{{ $t("pages.about.tragicEnding.human") }}</span>
                    <span
                        id="anim-about-tragic-signature"
                        class="text-muted"
                    >- X</span>
                </div>
            </div>

            <!-- Spacer -->
            <div class="h-dvh" />

            <!-- Error -->
            <div class="text-center text-accent-2 font-label-sm lg:font-label-md">
                ! {{ $t("pages.about.error") }} !
            </div>

            <!-- Logs -->
            <div class="flex flex-col">
                <div class="flex justify-end">
                    <div class="bg-text text-background rounded-t-lg px-4 py-1 font-label-sm">
                        logs.txt
                    </div>
                </div>

                <div class="flex flex-col gap-y-4 border border-border rounded-lg rounded-tr-none p-5">
                    <!-- CV -->
                    <div
                        v-for="item in cvItems"
                        :key="item.type"
                        class="flex flex-col gap-y-1"
                    >
                        <ConsoleOutput color="muted">
                            C:\Users\Xavier > <span class="text-accent-3">display</span> -t <span class="text-text">{{ item.type }}</span>
                        </ConsoleOutput>
                        <ConsoleOutput
                            v-for="entry in item.entries"
                            :key="entry.title + entry.date"
                            color="text"
                        >
                            <span class="text-muted">{{ entry.date }}</span> {{ entry.title }} <span class="text-muted">({{ entry.details }})</span>
                        </ConsoleOutput>
                    </div>

                    <!-- Gaming Data -->
                    <div class="flex flex-col gap-y-1">
                        <ConsoleOutput color="muted">
                            C:\Users\Xavier > <span class="text-accent-3">display</span> -t <span class="text-text">gaming_data</span>
                        </ConsoleOutput>
                        <ConsoleOutput color="text">
                            <span class="text-muted">fetching preferred platform...</span>
                        </ConsoleOutput>
                        <ConsoleOutput color="text">
                            {{ $t("pages.about.gamingData.platform") }}
                        </ConsoleOutput>
                        <ConsoleOutput color="text">
                            <span class="text-muted">fetching time played since birth...</span>
                        </ConsoleOutput>
                        <ConsoleOutput color="text">
                            <span class="text-accent-2">[{{ $t("dict.error") }}]</span> {{ $t("pages.about.gamingData.error") }} <span class="text-muted">({{ $t("pages.about.gamingData.errorDetails") }})</span>
                        </ConsoleOutput>
                        <ConsoleOutput color="muted">
                            C:\Users\Xavier >
                        </ConsoleOutput>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-between items-center">
                <ConsoleOutput
                    size="sm"
                    color="muted"
                >
                    {{ $t("pages.about.footer.design") }}
                </ConsoleOutput>

                <span class="font-label-sm text-muted">@ {{ new Date().getFullYear() }};</span>
            </div>
        </LayoutContainer>
    </main>
</template>
