<script setup lang="ts">
const { toggle } = useMenu();
</script>

<template>
    <button
        class="rounded-full w-12 h-12 flex items-center justify-center border border-border"
        @click="toggle"
    >
        <Icon
            name="material-symbols:playing-cards"
            size="24"
            class="text-text"
        />
    </button>
</template>
