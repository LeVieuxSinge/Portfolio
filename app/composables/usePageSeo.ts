import { site } from "#shared/data/site";
import { localizedPath } from "#shared/utils/navigation";
import type { MaybeRefOrGetter } from "vue";

/**
 * Publish localized titles/descriptions, canonical/alternate links, and retained-media social metadata during SSR and navigation.
 * @param title Text or reactive getter in the active locale.
 * @param description Text or reactive getter in the active locale.
 * @param image Root-relative retained image; defaults to the shared public portrait.
 * @returns No state; Nuxt owns reactive head registration and cleanup.
 */
export function usePageSeo(title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>, image: MaybeRefOrGetter<string> = site.portrait.src) {
    const route = useRoute();
    const { locale } = useI18n();

    const origin = site.origin;

    const unprefixed = computed(() => localizedPath(route.path));

    useHead(() => ({
        htmlAttrs: { lang: locale.value },
        link: [
            { rel: "canonical", href: origin + route.path },
            { rel: "alternate", hreflang: "en-CA", href: origin + unprefixed.value },
            { rel: "alternate", hreflang: "fr-CA", href: origin + localizedPath(route.path, "fr") },
            { rel: "alternate", hreflang: "x-default", href: origin + unprefixed.value },
        ],
    }));
    useSeoMeta({
        title: () => `${toValue(title)} — ${site.name}`,
        description: () => toValue(description),
        ogTitle: () => `${toValue(title)} — ${site.name}`,
        ogDescription: () => toValue(description),
        ogType: "website",
        ogUrl: () => origin + route.path,
        ogLocale: () => locale.value === "fr" ? "fr_CA" : "en_CA",
        ogImage: () => origin + toValue(image),
        twitterCard: "summary_large_image",
        twitterTitle: () => `${toValue(title)} — ${site.name}`,
        twitterDescription: () => toValue(description),
        twitterImage: () => origin + toValue(image),
    });
}
