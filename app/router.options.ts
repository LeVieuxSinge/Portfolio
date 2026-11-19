import type { RouterConfig } from "@nuxt/schema";
import { useNuxtApp } from "#app";

export default {
    scrollBehavior(to, from, savedPosition) {
        return useNuxtApp().$scroll?.restoreRoute(to, from, savedPosition) ?? false;
    },
} satisfies RouterConfig;
