<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

defineProps<{ to: RouteLocationRaw; small?: boolean; secondary?: boolean; external?: boolean }>();
</script>

<template>
    <NuxtLink
        :to="to"
        :external="external"
        class="action-link"
        :class="{ 'action-link--small': small, 'action-link--secondary': secondary }"
    >
        <span class="min-w-0 [overflow-wrap:anywhere]"><slot /></span>
        <Icon
            name="material-symbols:arrow-outward-rounded"
            aria-hidden="true"
            class="shrink-0"
            :class="small ? 'size-[17px]' : 'size-6'"
        />
    </NuxtLink>
</template>
