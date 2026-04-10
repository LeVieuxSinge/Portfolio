<script setup lang="ts">
import type { DeckCardBaseProps } from "./DeckCardBase.vue";

const props = withDefaults(defineProps<DeckCardBaseProps>(), {
    clickable: false,
});
</script>

<template>
    <DeckCardBase
        class="drop-shadow-deck-down"
        v-bind="props"
    >
        <slot />
    </DeckCardBase>
</template>
