<!-- Fine-pointer decoration bound to this span ref; dimensions are shared with project-preview alignment. -->
<script setup lang="ts">
import { cursorGeometry } from "#shared/utils/preview";

const icon = useTemplateRef<HTMLElement>("icon");

useCursorMotion(icon);
</script>

<template>
    <div
        class="fixed top-0 left-0 w-dvw h-dvh z-custom-cursor pointer-events-none"
    >
        <span
            ref="icon"
            :style="{ width: `${cursorGeometry.diameter}px`, height: `${cursorGeometry.diameter}px` }"
            aria-hidden="true"
            class="absolute border border-ink -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
    </div>
</template>
