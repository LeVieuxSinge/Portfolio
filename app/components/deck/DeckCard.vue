<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string;
    image?: string;
    featured?: boolean;
    clickable?: boolean;
}>(), {
    title: "Card",
    image: "https://picsum.photos/400/800",
    featured: false,
    clickable: false,
});
</script>

<template>
    <DeckCardBase
        class="group relative flex flex-col justify-between gap-y-4 p-4 overflow-hidden"
        :featured="props.featured"
    >
        <!-- <NuxtImg
            src="https://picsum.photos/400/800"
            alt="Portfolio screenshot"
            class="absolute w-full h-full inset-0 object-cover"
        /> -->

        <!-- Header -->
        <div class="flex justify-between items-start gap-x-4">
            <h2 class="font-title-lg">
                {{ props.title }}
            </h2>

            <CommonBadge
                v-if="props.featured"
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
                class="font-label-sm text-muted whitespace-nowrap opacity-0 transition-opacity duration-300"
                :class="{
                    'group-hover:opacity-100': props.clickable,
                }"
            >
                Click me
            </h5>
        </div>
    </DeckCardBase>
</template>
