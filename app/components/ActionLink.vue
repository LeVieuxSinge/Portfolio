<!-- Shared underlined action with typed size variants and native NuxtLink navigation semantics. -->
<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(defineProps<{
    /** Internal router location or explicit external destination; query/hash belong to the caller. */
    to: RouteLocationRaw;
    /** Typography/icon variant; defaults to default, with small and contact alternatives. */
    size?: "default" | "small" | "contact";
    /** Use the restrained underline treatment instead of the primary underline cycle. */
    secondary?: boolean;
    /** Pass external navigation semantics to NuxtLink. */
    external?: boolean;
}>(), { size: "default" });
</script>

<template>
    <NuxtLink
        :to="to"
        :external="external"
        class="action-link"
        :class="{ 'action-link--small': size === 'small', 'action-link--contact': size === 'contact', 'action-link--secondary': secondary }"
    >
        <span class="min-w-0 [overflow-wrap:anywhere]"><slot /></span>
        <Icon
            name="material-symbols:arrow-outward-rounded"
            aria-hidden="true"
            class="shrink-0"
            :class="size === 'small' ? 'size-[17px]' : 'size-6'"
        />
    </NuxtLink>
</template>
