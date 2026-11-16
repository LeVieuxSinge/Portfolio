<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from "reka-ui";

defineProps<{ text: string }>();
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
