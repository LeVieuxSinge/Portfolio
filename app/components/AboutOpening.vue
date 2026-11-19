<script setup lang="ts">
import { site } from "#shared/data/site";

const { t } = useI18n();
const activities = ["web", "graphics", "design", "games", "tools"];
const motivations = ["procedural", "automation", "simulation", "optimization", "aesthetics", "organization"];
</script>

<template>
    <div class="grid min-w-0 gap-[65px] md:grid-cols-[minmax(200px,1fr)_minmax(0,3.15fr)] md:gap-[100px]">
        <aside class="grid min-w-0 grid-cols-2 gap-8 md:block">
            <img
                data-reveal
                :src="site.portrait.src"
                :alt="site.name"
                class="col-span-2 mb-1 w-full grayscale md:mb-10"
                :width="site.portrait.width"
                :height="site.portrait.height"
            >
            <div class="min-w-0 md:mb-9">
                <h2
                    data-reveal
                    class="eyebrow mb-[14px]"
                >
                    {{ t('pages.about.whatIdo') }}
                </h2>
                <ul class="space-y-1 text-sm leading-relaxed">
                    <li
                        v-for="key in activities"
                        :key="key"
                        data-reveal
                    >
                        {{ t(`pages.about.activities.${key}`) }}
                    </li>
                </ul>
            </div>
            <div class="min-w-0">
                <h2
                    data-reveal
                    class="eyebrow mb-[14px]"
                >
                    {{ t('pages.about.whatMotivates') }}
                </h2>
                <ul class="space-y-1 text-sm leading-relaxed">
                    <li
                        v-for="key in motivations"
                        :key="key"
                        data-reveal
                    >
                        {{ t(`pages.about.motivations.${key}`) }}
                    </li>
                </ul>
            </div>
        </aside>
        <section
            class="min-w-0 space-y-[100px] md:space-y-[160px]"
            :aria-label="t('pages.about.chapter')"
        >
            <article
                v-for="index in 3"
                :key="index"
            >
                <p
                    data-reveal
                    class="eyebrow mb-8"
                >
                    0{{ index }} / {{ t('pages.about.chapter') }}
                </p>
                <h2
                    data-reveal
                    class="display-type mb-8 text-[29px] [overflow-wrap:anywhere] max-[360px]:text-[25px] md:mb-10 md:text-[clamp(34px,3.25vw,52px)]"
                >
                    {{ t(`pages.about.statements.${index}.title`) }}
                </h2>
                <p
                    data-reveal
                    class="max-w-[65ch] text-[15px] leading-[1.75] md:text-[17px]"
                >
                    {{ t(`pages.about.statements.${index}.body`) }}
                </p>
            </article>
        </section>
    </div>
</template>
