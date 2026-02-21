<script setup lang="ts">
const { locale, setLocale } = useI18n();
const routePath = computed(() => useRouteBaseName()((useRoute())));
const { y } = useScroll(document, {
    throttle: 100,
});
const hasScrolled = computed(() => y.value > 50);
</script>

<template>
    <header
        class="sticky top-0 z-50 flex items-center justify-end pt-4 md:pt-10 transition-all duration-300"
    >
        <!-- <MyLogo
            size="sm"
            animated
        /> -->

        <nav>
            <ul class="flex space-x-4 font-label-md">
                <li>
                    <NuxtLinkLocale
                        to="/"
                        class="hover:text-text transition-colors duration-300"
                        :class="[routePath === 'index' ? 'text-text' : 'text-subtext']"
                    >
                        {{ $t('home') }}
                    </NuxtLinkLocale>
                </li>
                <li>
                    <NuxtLinkLocale
                        to="/projects"
                        class="hover:text-text transition-colors duration-300"
                        :class="[routePath === 'projects' ? 'text-text' : 'text-subtext']"
                    >
                        {{ $t('projects') }}
                    </NuxtLinkLocale>
                </li>
                <li>
                    <NuxtLinkLocale
                        to="/about"
                        class="hover:text-text transition-colors duration-300"
                        :class="[routePath === 'about' ? 'text-text' : 'text-subtext']"
                    >
                        {{ $t('about') }}
                    </NuxtLinkLocale>
                </li>
                <li>
                    <button
                        class="text-subtext hover:text-text transition-colors duration-300"
                        @click="setLocale(locale === 'en' ? 'fr' : 'en')"
                    >
                        {{ locale === 'en' ? 'fr' : 'en' }}
                    </button>
                </li>
            </ul>
        </nav>
    </header>
</template>
