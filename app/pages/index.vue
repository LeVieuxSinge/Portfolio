<script setup lang="ts">
definePageMeta({
    name: "home",
});
</script>

<template>
    <main class="px-2 lg:px-6">
        <HomeIntro />
        <HomeContext />
        <HomeCards />
        <HomeDecks />
        <HomeReel />
        <HomeAbout />
    </main>
</template>
