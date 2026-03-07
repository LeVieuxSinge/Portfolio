<script setup lang="ts">
const props = defineProps<{
    deck: ResolvedDeck;
}>();
</script>

<template>
    <DeckBase class="relative flex flex-col justify-end gap-y-4 pt-28 px-5 pb-5">
        <NuxtImg
            :src="props.deck.image"
            class="absolute w-44 h-44 top-0 start-1/2 -translate-1/2 object-cover bg-red"
        />

        <h2 class="font-title-lg">
            {{ $t(props.deck.label) }}
        </h2>
        <p class="font-body-md text-muted">
            {{ $t(props.deck.description) }}
        </p>
        <div class="flex flex-wrap gap-2">
            <CommonBadge
                v-for="tool in props.deck.tools"
                :key="tool.id"
                :text="$t(tool.name)"
                color="accent-3"
            />
        </div>
        <div class="flex justify-between items-center gap-x-1 font-label-md border border-border rounded-xl px-3">
            <h5 class="flex-1 text-accent-4">
                4 featured
            </h5>
            <figure class="w-px h-8 bg-border" />
            <h5 class="flex-1 text-muted text-end">
                2 common
            </h5>
        </div>

        <NuxtLinkLocale
            :to="{ path: '/projects', query: { deck: props.deck.id } }"
            class="flex justify-between items-center font-body-md rounded-xl border border-border px-8 py-4 bg-background hover:bgmuted transition-colors duration-300"
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
