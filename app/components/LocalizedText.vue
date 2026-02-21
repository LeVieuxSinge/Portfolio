<script setup lang="ts">
const props = defineProps<{
    tKey: string;
}>();

const { locale } = useI18n();
</script>

<template>
    <div class="relative">
        <Transition
            mode="out-in"
            enter-active-class="transition-opacity duration-500"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity duration-500"
            leave-to-class="opacity-0"
        >
            <span :key="locale">{{ $t(props.tKey) }}</span>
        </Transition>
    </div>
</template>
