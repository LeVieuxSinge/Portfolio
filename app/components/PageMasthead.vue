<!-- Collection/About display heading with optional introduction and a count aligned independently of text fitting. -->
<script setup lang="ts">
const props = defineProps<{
    /** Localized display heading; fitting preserves one line where the masthead design requires it. */
    title: string;
    /** Optional upper introduction; its presence controls the heading's vertical spacing. */
    note?: string;
    /** Optional collection size; undefined hides the counter while zero remains meaningful. */
    count?: number;
}>();

const titleElement = useTemplateRef<HTMLElement>("titleElement");

const { fit } = useFitText(titleElement);

watch(() => props.title, () => nextTick(fit));
</script>

<template>
    <div
        class="pt-[45px] md:pt-[68px]"
        :class="note ? 'mb-[90px] md:mb-[150px]' : 'mb-20 md:mb-[150px]'"
    >
        <p
            v-if="note"
            data-reveal
            class="ml-auto max-w-[350px] text-[15px] leading-relaxed md:text-base"
        >
            {{ note }}
        </p>
        <div
            class="relative"
            :class="note ? 'mt-12 md:mt-16' : ''"
        >
            <h1
                data-reveal
                class="display-type min-w-0 text-[15.2vw] md:text-[clamp(90px,12.4vw,194px)]"
                :class="count !== undefined ? 'w-[calc(100%-38px)] md:w-[calc(100%-48px)]' : ''"
            >
                <span
                    ref="titleElement"
                    data-text-reveal
                    class="inline-block whitespace-nowrap"
                >{{ title }}</span>
            </h1>
            <span
                v-if="count !== undefined"
                data-reveal
                class="absolute top-[1.2em] right-0 mt-1 font-mono text-[11px] text-muted md:top-[2.4em]"
            >({{ String(count).padStart(2, '0') }})</span>
        </div>
    </div>
</template>
