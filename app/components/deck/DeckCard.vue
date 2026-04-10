<script setup lang="ts">
import type { DeckCardBaseProps } from "./DeckCardBase.vue";

const props = defineProps<DeckCardBaseProps & {
    image?: string;
    label?: string;
    featured?: boolean;
    hoverEffect?: boolean;
}>();
</script>

<template>
    <DeckCardBase
        class="group relative overflow-hidden"
        :class="{
            'border-accent-4!': props.featured,
        }"
        v-bind="props"
    >
        <!-- Image -->
        <div class="size-full pointer-events-none">
            <img
                v-if="props.image"
                :src="props.image"
                class="w-full h-full object-cover opacity-80"
                :class="{
                    'group-hover:opacity-100 transition-opacity duration-300': props.hoverEffect,
                }"
            >
            <div
                v-else
                class="w-full h-full bg-background/50 flex items-center justify-center text-muted font-label-md"
            >
                [{{ $t("components.deck.card.noImage") }}]
            </div>
        </div>

        <!-- Content -->
        <div class="absolute inset-0 flex flex-col justify-between gap-y-4 p-4">
            <!-- Header -->
            <div class="flex justify-between items-start gap-x-4">
                <h2 class="font-title-lg">
                    {{ props.label || $t("components.deck.card.defaultLabel") }}
                </h2>

                <CommonBadgeFeature
                    v-if="props.featured"
                    size="sm"
                    class="flex-none"
                />
            </div>

            <!-- Footer -->
            <div class="flex flex-col justify-between items-end gap-2">
                <div class="flex flex-wrap gap-1 lg:gap-2">
                    <slot name="tags" />
                </div>
            </div>
        </div>

        <!-- Click me -->
        <!-- <div
            class="absolute inset-0 max-lg:hidden flex justify-center items-center bg-background/55 font-label-sm text-muted whitespace-nowrap opacity-0 transition-opacity duration-300"
            :class="{
                'group-hover:opacity-100': props.clickable,
            }"
        >
            {{ $t("components.deck.card.clickMe") }}
        </div> -->
    </DeckCardBase>
</template>
