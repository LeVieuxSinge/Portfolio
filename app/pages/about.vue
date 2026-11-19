<script setup lang="ts">
import { contactLinks, site } from "#shared/data/site";

const { t } = useI18n();
usePageSeo(() => t("pages.about.title"), () => t("pages.about.note"));
</script>

<template>
    <main
        id="main"
        tabindex="-1"
        class="page-gutter"
    >
        <PageMasthead
            :title="t('pages.about.title')"
            :note="t('pages.about.note')"
        />
        <AboutOpening />
        <AboutCapabilities />
        <AboutCv />
        <section
            class="section-space"
            aria-labelledby="robotics-heading"
        >
            <h2
                id="robotics-heading"
                data-reveal
                class="section-label"
            >
                {{ t('pages.about.lookingAhead') }}
            </h2>
            <p
                data-reveal
                class="max-w-[65ch] text-[15px] leading-[1.75] md:text-[19px]"
            >
                {{ t('pages.about.robotics') }}
            </p>
        </section>
        <section
            class="section-space pb-20 md:pb-[120px]"
            aria-labelledby="contact-heading"
        >
            <h2
                id="contact-heading"
                data-reveal
                class="mb-6 text-[29px] font-semibold tracking-[-0.025em] md:text-[38px]"
            >
                {{ t('pages.about.contact') }}
            </h2>
            <ActionLink
                data-reveal
                :to="`mailto:${site.email}`"
                external
                size="contact"
            >
                {{ site.email }}
            </ActionLink>
            <ul class="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                <li
                    v-for="link in contactLinks"
                    :key="link.label"
                    data-reveal
                >
                    <ActionLink
                        data-reveal
                        :to="link.url"
                        external
                        size="small"
                    >
                        {{ link.label }}
                    </ActionLink>
                </li>
            </ul>
        </section>
        <SiteFooter />
        <ScrollControl />
    </main>
</template>
