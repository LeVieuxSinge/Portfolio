<!-- Reka tooltip wrapper using its child's control as trigger; tooltip text is supplementary, not its sole accessible name. -->
<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from "reka-ui";

defineProps<{
    /** Supplementary localized help; the wrapped control still needs its own accessible name. */
    text: string;
}>();
</script>

<template>
    <TooltipRoot>
        <TooltipTrigger as-child>
            <slot />
        </TooltipTrigger>
        <TooltipPortal>
            <TooltipContent
                class="tooltip-content"
                :side-offset="12"
                :collision-padding="20"
                side="top"
                align="end"
            >
                {{ text }}
            </TooltipContent>
        </TooltipPortal>
    </TooltipRoot>
</template>
