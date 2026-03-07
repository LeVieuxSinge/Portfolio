<script setup lang="ts">
const props = withDefaults(defineProps<{
    value: string;
    as?: keyof HTMLElementTagNameMap;
    speed?: number;
}>(), {
    as: "span",
    speed: 100,
});

const isMounted = ref(false);
const currentLetters = reactive<string[]>([]);

watch(() => props.value, () => {
    currentLetters.length = 0;
    write();
});

let writeTimeout: number | null = null;
function write() {
    if (writeTimeout) {
        clearInterval(writeTimeout);
        writeTimeout = null;
    }

    let index = 0;
    writeTimeout = window.setInterval(() => {
        if (index < props.value.length) {
            currentLetters.push(props.value[index]!);
            index++;
        }
        else {
            if (writeTimeout) {
                clearInterval(writeTimeout);
                writeTimeout = null;
            }
        }
    }, props.speed);
}

const refRoot = useTemplateRef<HTMLElement>("refRoot");
const isVisible = useElementVisibility(refRoot);
watch(isVisible, (visible) => {
    if (visible && !isMounted.value) {
        isMounted.value = true;
        write();
        console.log(refRoot.value?.innerHTML);
        console.log(refRoot.value?.innerText);
    }
});
</script>

<template>
    <component
        :is="props.as"
        ref="refRoot"
    >
        {{ currentLetters.join("") }}
    </component>
</template>
