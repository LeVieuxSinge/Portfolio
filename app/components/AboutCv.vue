<!-- Render the five authored CV categories and explicit localized organization names without sorting or rewording facts. -->
<script setup lang="ts">
import { cvGroups } from "#shared/data/about";

const { t, locale } = useI18n();
</script>

<template>
    <section
        class="section-space"
        aria-labelledby="cv-heading"
    >
        <h2
            id="cv-heading"
            data-reveal
            class="section-label"
        >
            {{ t('pages.about.cvTitle') }}
        </h2>
        <div class="space-y-12">
            <section
                v-for="group in cvGroups"
                :key="group.id"
            >
                <h3
                    data-reveal
                    class="mb-3 text-sm font-semibold md:text-base"
                >
                    {{ t(`pages.about.cvSections.${group.id}`) }}
                </h3>
                <dl>
                    <div
                        v-for="entry in group.entries"
                        :key="entry.id"
                        data-reveal
                        class="grid grid-cols-[85px_minmax(0,1fr)] gap-x-4 gap-y-[9px] border-b border-line py-5 [overflow-wrap:anywhere] max-[300px]:grid-cols-1 md:grid-cols-[130px_minmax(0,1fr)_minmax(0,1.4fr)] md:gap-[35px] md:py-6"
                    >
                        <dt class="font-mono text-[10px] leading-relaxed text-muted md:text-xs">
                            {{ entry.dates }}
                        </dt>
                        <dd class="text-sm leading-relaxed md:text-base">
                            {{ t(entry.titleKey) }}
                        </dd>
                        <dd class="col-start-2 text-xs leading-relaxed text-muted max-[300px]:col-start-1 md:col-start-auto md:text-sm">
                            {{ entry.organizationLabels?.[locale] || entry.organization }}<template v-if="entry.location">
                                · {{ entry.location }}
                            </template>
                        </dd>
                    </div>
                </dl>
            </section>
        </div>
    </section>
</template>
