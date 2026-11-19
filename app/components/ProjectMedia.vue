<script setup lang="ts">
import type { ProjectMedia } from "#shared/types/portfolio";

const props = defineProps<{ media: ProjectMedia; eager?: boolean }>();
const portrait = computed(() => props.media.height > props.media.width * 1.15);
</script>

<template>
    <figure
        class="mx-auto w-full"
        :class="portrait ? 'max-w-[280px] md:max-w-[480px]' : ''"
        :data-media-src="media.src"
        data-reveal
    >
        <ProjectImage
            v-if="media.type === 'image'"
            :media="media"
            :eager="eager"
        />
        <ProjectVideo
            v-else
            :media="media"
            :eager="eager"
        />
    </figure>
</template>
