<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

withDefaults(defineProps<{ to: RouteLocationRaw; size?: "default" | "small" | "contact"; secondary?: boolean; external?: boolean }>(), { size: "default" });
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
