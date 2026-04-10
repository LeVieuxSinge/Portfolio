<script setup lang="ts">
import { animate } from "animejs";

const props = withDefaults(defineProps<{
    animated?: boolean;
}>(), {
    animated: false,
});

const refPath1 = useTemplateRef("path1");
const refPath2 = useTemplateRef("path2");
const refPath3 = useTemplateRef("path3");

onMounted(() => {
    const path1 = unref(refPath1);
    const path2 = unref(refPath2);
    const path3 = unref(refPath3);

    if (!path1 || !path2 || !path3) {
        console.error("One or more SVG paths not found.");
        return;
    }

    if (!props.animated) {
        return;
    }

    animate(path1, {
        clipPath: {
            from: `inset(100% 0 0 0)`,
            to: `inset(0% 0 0 0)`,
        },
        type: "spring",
        stiffness: 800,
        damping: 100,
        mass: 2,
        restDelta: 0.01,
    });

    animate(path2, {
        clipPath: {
            from: `inset(0 0 100% 0)`,
            to: `inset(0 0 0% 0)`,
        },
        type: "spring",
        stiffness: 1000,
        damping: 100,
        mass: 1,
        restDelta: 0.01,
        delay: 100,
    });

    animate(path3, {
        clipPath: {
            from: `inset(0 100% 0 0)`,
            to: `inset(0 0% 0 0)`,
        },
        type: "spring",
        stiffness: 500,
        damping: 100,
        mass: 5,
        restDelta: 0.01,
        delay: 200,
    });
});
</script>

<template>
    <svg
        class="fill-text"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 91.71"
    >
        <g transform="translate(-650 -338)">
            <path
                ref="path1"
                d="M628.324,429.71h19.231L705.247,338H686.017"
                transform="translate(21.676)"
            />
            <path
                ref="path2"
                d="M748.077,411.83H728.846L700,358.788h19.231"
                transform="translate(-30.769 -12.633)"
            />
            <path
                ref="path3"
                d="M813.462,399.2h19.231l-13.461-24.322L842.308,338H823.077L800,374.781"
                transform="translate(-92.308)"
            />
        </g>
    </svg>
</template>
