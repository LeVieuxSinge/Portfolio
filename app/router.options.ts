import type { RouterConfig } from "@nuxt/schema";
import { useNuxtApp } from "#app";

export default {

    /**
     * Delegate saved-position/anchor restoration to the client scroll service; returning false suppresses Vue Router's competing native movement.
     */
    scrollBehavior(to, from, savedPosition) {
        return useNuxtApp().$scroll?.restoreRoute(to, from, savedPosition) ?? false;
    },
} satisfies RouterConfig;
