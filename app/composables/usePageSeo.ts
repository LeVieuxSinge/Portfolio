import type { MaybeRefOrGetter } from "vue";

export function usePageSeo(title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>, image: MaybeRefOrGetter<string> = "/portrait.webp") {
    const route = useRoute();
    const { locale } = useI18n();
    const origin = "https://xavierchampoux.com";
    const unprefixed = computed(() => route.path.replace(/^\/fr(?=\/|$)/, "") || "/");
    useHead(() => ({
        htmlAttrs: { lang: locale.value },
        link: [
            { rel: "canonical", href: origin + route.path },
            { rel: "alternate", hreflang: "en-CA", href: origin + unprefixed.value },
            { rel: "alternate", hreflang: "fr-CA", href: origin + "/fr" + (unprefixed.value === "/" ? "" : unprefixed.value) },
            { rel: "alternate", hreflang: "x-default", href: origin + unprefixed.value },
        ],
    }));
    useSeoMeta({
        title: () => `${toValue(title)} — Xavier Champoux`,
        description: () => toValue(description),
        ogTitle: () => `${toValue(title)} — Xavier Champoux`,
        ogDescription: () => toValue(description),
        ogType: "website",
        ogUrl: () => origin + route.path,
        ogLocale: () => locale.value === "fr" ? "fr_CA" : "en_CA",
        ogImage: () => origin + toValue(image),
        twitterCard: "summary_large_image",
        twitterTitle: () => `${toValue(title)} — Xavier Champoux`,
        twitterDescription: () => toValue(description),
        twitterImage: () => origin + toValue(image),
    });
}
