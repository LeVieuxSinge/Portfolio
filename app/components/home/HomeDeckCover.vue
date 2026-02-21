<template>
    <DeckBase class="relative flex flex-col justify-end gap-y-4 pt-28 px-5 pb-5">
        <NuxtImg
            src="/images/portfolio.png"
            alt="Portfolio screenshot"
            class="absolute w-44 h-44 top-0 start-1/2 -translate-1/2 object-cover bg-red"
        />

        <h2 class="font-title-lg">
            The webbed frontier's end
        </h2>
        <p class="font-body-md text-subtext">
            As much as I respect React, I fell in love with how intuitive it is to work with Vue. This led me to Nuxt and the incredible suite of tools and community powering this framework (looking at you VoidZero and Unjs) which I constantly try explore and experiment with.
        </p>
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
        <div class="flex justify-between items-center gap-x-1 font-label-md border border-border rounded-xl px-3">
            <h5 class="flex-1 text-accent-4">
                4 featured
            </h5>
            <figure class="w-px h-8 bg-border" />
            <h5 class="flex-1 text-subtext text-end">
                2 common
            </h5>
        </div>

        <NuxtLinkLocale
            to="/projects"
            class="flex justify-between items-center font-body-md rounded-xl border border-border px-8 py-4 bg-background hover:bg-highlight transition-colors duration-300"
        >
            <h4>
                Explore deck
            </h4>
            <Icon
                name="material-symbols:arrow-forward"
                size="24"
            />
        </NuxtLinkLocale>
    </DeckBase>
</template>
