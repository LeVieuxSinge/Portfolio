<script setup lang="ts">
import { profileOrder } from "#shared/utils/catalog";

const { t } = useI18n();
const localePath = useLocalePath();
usePageSeo(() => t("pages.home.title"), () => t("pages.home.introduction"));
</script>

<template>
    <main
        id="main"
        tabindex="-1"
        class="page-gutter flex min-h-[calc(100svh-var(--header-height))] flex-col pb-[30px] md:pb-[45px]"
    >
        <h1 class="sr-only">
            Xavier Champoux — {{ t('pages.home.title') }}
        </h1>
        <div
            class="min-h-20 flex-1 md:min-h-[180px]"
            aria-hidden="true"
        />
        <div class="flex w-full flex-col gap-[35px] max-md:mx-auto max-md:max-w-[640px] md:flex-row md:items-end md:justify-between md:gap-[60px]">
            <div class="min-w-0 md:max-w-[600px]">
                <p class="text-[15px] leading-[1.55] md:max-w-[390px] md:text-lg">
                    {{ t('pages.home.introduction') }}
                </p>
                <ul class="mt-[22px] flex flex-wrap gap-[7px] md:mt-7 md:gap-2">
                    <li
                        v-for="profile in profileOrder"
                        :key="profile"
                        class="flex"
                    >
                        <ProfileBadge
                            :profile="profile"
                            class="max-md:px-2 max-md:py-1 max-md:text-[9px] max-[360px]:text-[8px]"
                        />
                    </li>
                </ul>
            </div>
            <nav
                :aria-label="t('pages.home.explore')"
                class="flex w-full flex-wrap gap-6 md:w-auto md:shrink-0 md:flex-nowrap md:gap-9"
            >
                <ActionLink
                    :to="localePath('/work')"
                    class="max-md:min-w-0 max-md:flex-[1_1_calc(3.8em+36px)] max-md:justify-between max-md:gap-3 max-[360px]:text-xl!"
                >
                    {{ t('layouts.navigation.work') }}
                </ActionLink>
                <ActionLink
                    :to="localePath('/about')"
                    class="max-md:min-w-0 max-md:flex-[1_1_calc(3.8em+36px)] max-md:justify-between max-md:gap-3 max-[360px]:text-xl!"
                >
                    {{ t('layouts.navigation.about') }}
                </ActionLink>
            </nav>
        </div>
    </main>
</template>
