<script setup lang="ts">
const props = defineProps<{
    text: string;
    color?: string;
    icon?: string;
}>();
</script>

<template>
    <span
        class="font-label-md px-2 py-0.5 rounded-md border border-border bg-background flex gap-x-2"
        :class="`text-${props.color}`"
    >
        {{ $slots.default ? $slots.default() : props.text }}
        <Icon
            v-if="props.icon"
            :name="props.icon"
            class="w-4 h-4"
        />
    </span>
</template>
