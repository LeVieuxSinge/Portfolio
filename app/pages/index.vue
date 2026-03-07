<script setup lang="ts">
definePageMeta({
    name: "home",
});

const decks = useProjectsData().resolvedDecks;
</script>

<template>
    <main>
        <HomeHero />
        <div class="my-60" />
        <HomeContext />

        <div class="my-80" />

        <!-- <HomeSection>
            <div class="flex flex-col items-center gap-y-3 col-span-full">
                <h5 class="font-label-sm text-muted">
                    Pick your deck
                </h5>
                <figure class="w-full h-px bg-linear-to-r from-background/0 via-text to-background/0" />
            </div>
        </HomeSection> -->

        <div class="my-20" />

        <!-- Decks -->
        <HomeSection>
            <HomeDeck
                v-for="deck in decks"
                :key="deck.id"
                :deck="deck"
            />
        </HomeSection>

        <div class="my-80" />

        <!-- Reel -->
        <HomeSection>
            <div class="flex flex-col items-end gap-y-3 col-span-full">
                <button
                    class="relative w-full rounded-2xl overflow-hidden border border-solid border-muted aspect-video"
                    @click="playReel"
                >
                    <div class="absolute inset-0 font-display-md flex flex-col justify-center items-center gap-y-2 bg-background/50">
                        <div class="font-display-md">
                            Reel 2020
                        </div>
                        <div class="font-label-md text-muted">
                            Click to play
                        </div>
                    </div>
                    <video
                        src="/videos/reel_2020.mp4"
                        preload="auto"
                        autoplay
                        muted
                        loop
                    />
                </button>

                <ConsoleOutput color="accent-1">
                    Want to see the 2020 version? <button
                        class="underline"
                        @click="goToReel2020"
                    >
                        Click here
                    </button>
                </ConsoleOutput>
            </div>
        </HomeSection>

        <div class="my-80" />

        <!-- Contact -->
        <section class="h-lvh pt-40 pb-20 gap-y-3 flex flex-col justify-between">
            <div class="flex flex-col gap-y-3">
                <TypedMessage
                    as="h1"
                    :value="'Scammers:\nsend scam here'"
                    class="font-display-lg text-accent-4"
                />
                <ConsoleOutput color="accent-1">
                    <TypedMessage
                        value="This is a joke. like most people, Xavier does not like scammers and you will end up being ignored or reported ¯\_(ツ)_/¯"
                        speed="20"
                    />
                </ConsoleOutput>
            </div>

            <div class="flex-auto flex flex-col gap-y-3 justify-center items-end">
                <a
                    href="mailto:xavierchampoux@hotmail.com"
                    class="font-title-lg"
                >
                    xavierchampoux@hotmail.com
                </a>

                <div class="flex gap-x-3 font-body-md text-muted">
                    <a
                        href="https://www.instagram.com/xavier-champoux/"
                        target="_blank"
                        class="hover:text-accent-4 transition-colors duration-300"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.youtube.com/channel/xavier-champoux/"
                        target="_blank"
                        class="hover:text-accent-2 transition-colors duration-300"
                    >
                        Youtube
                    </a>
                    <a
                        href="https://www.linkedin.com/in/xavier-champoux/"
                        target="_blank"
                        class="hover:text-accent-3 transition-colors duration-300"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/xavier-champoux"
                        target="_blank"
                        class="hover:text-accent-1 transition-colors duration-300"
                    >
                        GitHub
                    </a>
                </div>
            </div>

            <div class="flex justify-between items-center font-label-sm text-muted">
                <h4>
                    {{ "> design and <> by him, not me" }}
                </h4>

                <h4>
                    @ {{ new Date().getFullYear() }};
                </h4>
            </div>
        </section>
    </main>
</template>
