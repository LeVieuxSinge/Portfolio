<script setup lang="ts" generic="DO extends { label: string; value: string }[], SBO extends { label: string; value: string }[], FBO extends { label: string; value: string }[]">
const props = defineProps<{
    deckOptions: DO;
    sortByOptions: SBO;
    tagOptions: FBO;
}>();

const deck = defineModel<DO>("deck");
const sortBy = defineModel<SBO>("sortBy");
const tag = defineModel<FBO>("tag");
</script>

<template>
    <div class="z-1 w-full bg-background border border-border rounded-4xl md:rounded-full px-6 pt-3 pb-4 flex max-md:flex-col justify-between items-center gap-4">
        <!-- Deck -->
        <div class="w-full flex flex-col gap-y-1 overflow-hidden">
            <label class="font-label-sm text-muted ml-4">
                {{ $t('filter.deck.label') }}
            </label>
            <ProjectsFilterSelect
                v-model:values="deck"
                :options="props.deckOptions"
                placeholder="filter.deck.placeholder"
                color="accent-3"
            />
        </div>

        <!-- Sort By -->
        <div class="w-full flex flex-col gap-y-1 overflow-hidden">
            <label class="font-label-sm text-muted ml-4">
                {{ $t('filter.sortBy.label') }}
            </label>
            <ProjectsFilterSelect
                v-model:values="sortBy"
                :options="props.sortByOptions"
                placeholder="filter.sortBy.placeholder"
                color="accent-4"
            />
        </div>

        <!-- Filter By -->
        <div class="w-full flex flex-col gap-y-1 overflow-hidden">
            <label class="font-label-sm text-muted ml-4">
                {{ $t('filter.tag.label') }}
            </label>
            <ProjectsFilterSelect
                v-model:values="tag"
                :options="props.tagOptions"
                placeholder="filter.tag.placeholder"
                color="accent-1"
                multiple
            />
        </div>
    </div>
</template>
