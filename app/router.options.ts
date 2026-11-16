import type { RouterConfig } from "@nuxt/schema";
import { START_LOCATION } from "vue-router";
import { useNuxtApp } from "#app";

export default {
    scrollBehavior(to, from, savedPosition) {
        const app = useNuxtApp();
        const samePage = to.path === from.path;
        if (samePage && !to.hash && !from.hash && !savedPosition) return false;
        const restore = () => {
            if (app.$router.currentRoute.value.fullPath !== to.fullPath) return;
            const localeChange = to.path.replace(/^\/fr(?=\/|$)/, "") === from.path.replace(/^\/fr(?=\/|$)/, "");
            let anchor: HTMLElement | null = null;
            try {
                anchor = to.hash ? document.getElementById(decodeURIComponent(to.hash.slice(1))) : null;
            }
            catch { /* Invalid fragments fall back to the page start. */ }
            const target = savedPosition?.top ?? anchor ?? (localeChange ? window.scrollY : 0);
            if (app.$scroll) app.$scroll.moveTo(target, !!savedPosition || !samePage);
            else window.scrollTo({ top: typeof target === "number" ? target : 0, behavior: "instant" });
            if (!savedPosition && (!samePage || anchor)) {
                const focusTarget = anchor || document.querySelector<HTMLElement>("main#main");
                if (focusTarget) {
                    if (!focusTarget.hasAttribute("tabindex")) focusTarget.setAttribute("tabindex", "-1");
                    focusTarget.focus({ preventScroll: true });
                }
            }
        };
        if (samePage || from === START_LOCATION) {
            requestAnimationFrame(restore);
            return false;
        }
        return new Promise<false>((resolve) => {
            app.hooks.hookOnce("page:loading:end", () => {
                requestAnimationFrame(() => {
                    restore();
                    resolve(false);
                });
            });
        });
    },
} satisfies RouterConfig;
