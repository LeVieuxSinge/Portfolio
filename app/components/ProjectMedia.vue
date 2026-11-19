<!-- Preserve intrinsic media ratios and the narrower portrait convention while delegating image/video recovery. -->
<script setup lang="ts">
import type { ProjectMedia } from "#shared/types/portfolio";

const props = defineProps<{
    /** Discriminated image/video record; this wrapper preserves source order and intrinsic proportions. */
    media: ProjectMedia;
    /** Leading-media hint forwarded to image loading or video metadata preload. */
    eager?: boolean;
}>();

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
