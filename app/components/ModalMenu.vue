<script setup lang="ts">
const { locale, setLocale } = useI18n();
const routePath = computed(() => useRouteBaseName()((useRoute())));
const { isOpen, toggle } = useMenu();
</script>

<template>
    <TeleportModal>
        <Transition
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 bg-background px-4 pt-4 pb-8 flex flex-col justify-between gap-8 pointer-events-auto md:pt-10"
            >
                <!-- Header -->
                <div class="flex justify-end items-center w-full">
                    <button
                        class="rounded-full w-12 h-12 flex items-center justify-center border border-muted"
                        @click="toggle"
                    >
                        <Icon
                            name="material-symbols:close"
                            size="24"
                        />
                    </button>
                </div>

                <!-- Body -->
                <div class="flex-1">
                    <nav>
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
                </div>

                <!-- Footer -->
                <div class="space-y-8 text-muted">
                    <div class="w-full flex justify-center">
                        <button
                            class="font-label-md underline"
                            @click="setLocale(locale === 'en' ? 'fr' : 'en')"
                        >
                            {{ locale === 'en' ? 'Français' : 'English' }}
                        </button>
                    </div>

                    <div class="flex justify-between items-center font-label-sm">
                        <h4>
                            {{ "> design and <> by him, not me" }}
                        </h4>

                        <h4>
                            @ {{ new Date().getFullYear() }};
                        </h4>
                    </div>
                </div>
            </div>
        </Transition>
    </TeleportModal>
</template>
