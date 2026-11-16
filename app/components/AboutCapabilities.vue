<script setup lang="ts">
import { capabilityStacks } from "#shared/data/about";

const { t } = useI18n();
</script>

<template>
    <section
        class="section-space"
        aria-labelledby="capabilities-heading"
    >
        <h2
            id="capabilities-heading"
            class="section-label"
        >
            {{ t('pages.about.profilesTitle') }}
        </h2>
        <div class="grid min-w-0 gap-[50px] md:grid-cols-2 md:gap-x-[100px] md:gap-y-[90px]">
            <article
                v-for="capability in capabilityStacks"
                :key="capability.profile"
                class="min-w-0"
            >
                <h3 class="mb-[18px] text-xl font-semibold [overflow-wrap:anywhere] md:text-2xl">
                    <span
                        class="mr-3 inline-block size-[7px] align-middle"
                        :style="{ backgroundColor: `var(--color-${capability.profile})` }"
                        aria-hidden="true"
                    />
                    {{ t(`role.${capability.profile}`) }}
                </h3>
                <p class="max-w-[55ch] text-[15px] leading-[1.75] md:text-base">
                    {{ t(`pages.about.capabilities.${capability.profile}`) }}
                </p>
                <h4 class="eyebrow mt-6 mb-3">
                    {{ t('pages.about.stack') }}
                </h4>
                <ul class="flex flex-wrap gap-x-[18px] gap-y-2 font-sans text-xs text-ink md:text-[13px]">
                    <li
                        v-for="tool in capability.tools"
                        :key="tool"
                    >
                        {{ tool }}
                    </li>
                </ul>
            </article>
        </div>
    </section>
</template>
