<script setup lang="ts">
const props = withDefaults(defineProps<{
    rowCount?: number;
    colCount?: number;
}>(), {
    rowCount: 4,
    colCount: 4,
});
</script>

<template>
    <div
        ref="refShowcaseCards"
        class="relative overflow-hidden bg-background-elevated"
    >
        <div
            class="absolute top-1/2 left-1/2 -translate-1/2 grid gap-5 origin-center -skew-x-6 rotate-12"
            :style="{
                gridTemplateColumns: `repeat(${props.colCount}, 1fr)`,
                gridTemplateRows: `repeat(${props.rowCount}, 1fr)`,
            }"
        >
            <template
                v-for="row in props.rowCount"
                :key="row"
            >
                <template
                    v-for="col in props.colCount"
                    :key="col"
                >
                    <slot :index="col + row" />
                </template>
            </template>
        </div>
    </div>
</template>
