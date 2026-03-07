<script setup lang="ts">
const { locale, setLocale } = useI18n();
const routePath = computed(() => useRouteBaseName()((useRoute())));
const { isMobileOrTablet } = useDevice();
const { toggle } = useMenu();
</script>

<template>
    <header
        class="flex justify-end items-center pt-4 md:pt-10"
    >
        <!-- <MyLogo
            size="sm"
            animated
        /> -->

        <!-- Mobile or Tablet Navigation -->
        <div v-if="isMobileOrTablet">
            <button
                class="rounded-full w-12 h-12 flex items-center justify-center border border-muted"
                @click="toggle"
            >
                <Icon
                    name="material-symbols:playing-cards"
                    size="24"
                />
            </button>
            <ModalMenu />
        </div>

        <!-- Desktop Navigation -->
        <nav v-else>
            <ul class="flex gap-x-2 font-label-md">
                <li>
                    <NuxtLinkLocale
                        to="/"
                        class="hover:text-text transition-colors duration-300 px-2 py-1 flex items-center"
                        :class="[routePath === 'index' ? 'text-text' : 'text-muted']"
                    >
                        {{ $t('home') }}
                    </NuxtLinkLocale>
                </li>
                <li>
                    <NuxtLinkLocale
                        to="/projects"
                        class="hover:text-text transition-colors duration-300 px-2 py-1 flex items-center"
                        :class="[routePath === 'projects' ? 'text-text' : 'text-muted']"
                    >
                        {{ $t('projects') }}
                    </NuxtLinkLocale>
                </li>
                <li>
                    <NuxtLinkLocale
                        to="/about"
                        class="hover:text-text transition-colors duration-300 px-2 py-1 flex items-center"
                        :class="[routePath === 'about' ? 'text-text' : 'text-muted']"
                    >
                        {{ $t('about') }}
                    </NuxtLinkLocale>
                </li>
                <li>
                    <button
                        class="text-muted hover:text-text transition-colors duration-300 px-2 py-1"
                        @click="setLocale(locale === 'en' ? 'fr' : 'en')"
                    >
                        {{ locale === 'en' ? 'fr' : 'en' }}
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>
