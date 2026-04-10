<script setup lang="ts">
const props = defineProps<{
    deck: ResolvedDeck;
}>();
</script>

<template>
    <DeckBase class="relative flex flex-col justify-between gap-y-3 pt-20 lg:pt-24 px-5 pb-5">
        <img
            :src="props.deck.image"
            class="absolute w-32 h-32 lg:w-40 lg:h-40 top-0 start-1/2 -translate-1/2 object-cover"
        >

        <div class="flex flex-col gap-y-3">
            <h2 class="font-title-md lg:font-title-lg">
                {{ $t(props.deck.label) }}
            </h2>
            <p class="font-body-sm text-muted">
                {{ $t(props.deck.description) }}
            </p>
        </div>

        <div class="flex flex-col gap-y-3">
            <div class="flex flex-wrap gap-2">
                <CommonBadge
                    v-for="tool in props.deck.tools"
                    :key="tool.id"
                    color="accent-3"
                    size="sm"
                >
                    {{ $t(tool.name) }}
                </CommonBadge>
            </div>
            <div class="flex justify-between items-center gap-x-1 font-label-sm border border-border rounded-xl px-3">
                <h5 class="flex-1 text-accent-4">
                    {{ $t("components.home.deck.featured", { count: props.deck.projects.filter(p => p.featured).length }) }}
                </h5>
                <figure class="w-px h-8 bg-border" />
                <h5 class="flex-1 text-muted text-end">
                    {{ $t("components.home.deck.common", { count: props.deck.projects.filter(p => !p.featured).length }) }}
                </h5>
            </div>

            <NuxtLinkLocale
                :to="{ path: '/projects', query: { deck: props.deck.id } }"
                class="flex justify-between items-center font-body-sm rounded-xl border border-border px-4 py-3 lg:px-6 lg:py-4 bg-background hover:bg-background-highlight transition-colors duration-300"
            >
                <h4>
                    {{ $t("components.home.deck.explore") }}
                </h4>
                <Icon
                    name="material-symbols:arrow-forward"
                    size="24"
                />
            </NuxtLinkLocale>
        </div>
    </DeckBase>
</template>
