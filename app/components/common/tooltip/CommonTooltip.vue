<script setup lang="ts">
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from "reka-ui";

const props = defineProps<{
    text: string;
}>();
</script>

<template>
    <TooltipRoot>
        <TooltipTrigger as-child>
            <slot />
        </TooltipTrigger>
        <TooltipPortal>
            <TooltipContent class="z-tooltip bg-background rounded-md px-1 py-0.75 font-label-sm">
                <div class="text-text rounded-md px-2.5 py-1.25 font-label-sm border border-dimmed">
                    {{ props.text }}
                </div>
            </TooltipContent>
        </TooltipPortal>
    </TooltipRoot>
</template>
