<script setup lang="ts">
const props = defineProps<{
    tKey: string;
    speed?: number;
}>();
</script>

<template>
    <div class="relative">
        <Transition
            mode="out-in"
            :enter-active-class="`transition-opacity duration-${props.speed ?? 500}`"
            enter-from-class="opacity-0"
            :leave-active-class="`transition-opacity duration-${props.speed ?? 500}`"
            leave-to-class="opacity-0"
        >
            <span :key="$i18n.locale">{{ $t(props.tKey) }}</span>
        </Transition>
    </div>
</template>
