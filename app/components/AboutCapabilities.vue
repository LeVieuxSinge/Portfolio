<!-- Render the four capability narratives and authored tool stacks; no proficiency facts are inferred here. -->
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
            data-reveal
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
                <h3
                    data-reveal
                    class="mb-[18px] flex items-center gap-3 text-[26px] font-bold [overflow-wrap:anywhere]"
                >
                    <span
                        class="inline-block size-3 align-middle"
                        :style="{ backgroundColor: `var(--color-${capability.profile})` }"
                        aria-hidden="true"
                    />
                    {{ t(`role.${capability.profile}`) }}
                </h3>
                <p
                    data-reveal
                    class="max-w-[55ch] text-base leading-[1.75]"
                >
                    {{ t(`pages.about.capabilities.${capability.profile}`) }}
                </p>
                <h4
                    data-reveal
                    class="eyebrow mt-6 mb-3"
                >
                    {{ t('pages.about.stack') }}
                </h4>
                <ul class="flex flex-wrap gap-x-[18px] gap-y-2 font-sans text-xs text-ink md:text-[13px]">
                    <li
                        v-for="tool in capability.tools"
                        :key="tool"
                        data-reveal
                    >
                        {{ tool }}
                    </li>
                </ul>
            </article>
        </div>
    </section>
</template>
