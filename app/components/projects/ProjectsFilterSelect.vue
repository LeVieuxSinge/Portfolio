<script setup lang="ts">
import { defaultWindow } from "@vueuse/core";

const props = defineProps<{
    color: "accent-1" | "accent-3" | "accent-4";
    options: { label: string; value: string }[];
    placeholder: string;
    multiple?: boolean;
}>();

const refRoot = useTemplateRef("refRoot");
const refContent = useTemplateRef("refContent");

const { bottom, left, width } = useElementBounding(refRoot);
const isLocked = useScrollLock(defaultWindow);

const values = defineModel<{ label: string; value: string }[]>("values", { default: [] });
function selectOption(option: { label: string; value: string }) {
    if (props.multiple) {
        if (values.value.some(v => v.value === option.value)) {
            values.value = values.value.filter(v => v.value !== option.value);
        }
        else {
            values.value = [...values.value, option];
        }
    }
    else {
        values.value = [option];
        closeDropdown();
    }
}
function clearOptions() {
    values.value = [];
    closeDropdown();
}

const open = ref(false);
function openDropdown() {
    open.value = true;
    isLocked.value = true;
}
function closeDropdown() {
    open.value = false;
    isLocked.value = false;
}
function toggleDropdown() {
    if (open.value) {
        closeDropdown();
    }
    else {
        openDropdown();
    }
}
onClickOutside(refContent, () => {
    closeDropdown();
}, {
    ignore: [refRoot],
});

const colorClasses = {
    "accent-1": "text-accent-1",
    "accent-3": "text-accent-3",
    "accent-4": "text-accent-4",
}[props.color];
</script>

<template>
    <button
        ref="refRoot"
        type="button"
        class="inline-flex min-h-10.5 justify-between items-center gap-x-1 bg-background px-4 py-2 border border-border hover:bgmuted transition-colors duration-200 outline-none"
        :class="{
            'rounded-b-0 rounded-t-2xl': open,
            'rounded-4xl': !open,
        }"
        @click="toggleDropdown()"
    >
        <span
            class="flex-1 text-start font-label-sm whitespace-nowrap overflow-hidden text-ellipsis"
            :class="values.length ? colorClasses : 'text-muted'"
        >
            {{ values.length ? values.map(v => $t(v.label)).join(', ') : $t(props.placeholder) }}
        </span>

        <!-- Clear button -->
        <button
            v-if="values.length"
            type="button"
            class="flex justify-center items-center text-muted hover:text-accent-2 hover:bgmuted rounded-full p-1 transition-colors duration-200"
            @click.stop="clearOptions()"
        >
            <Icon
                name="radix-icons:cross-2"
                class="h-3.5 w-3.5"
            />
        </button>

        <Icon
            name="material-symbols:arrow-drop-down"
            size="22"
            class="text-muted"
        />
    </button>

    <TeleportPopover>
        <div
            v-if="open"
            ref="refContent"
            class="absolute z-1 max-h-50 overflow-y-auto bg-background rounded-b-2xl border border-border border-t-0 flex flex-col px-1 py-2 pointer-events-auto no-scrollbar"
            :style="{ top: `${bottom}px`, left: `${left}px`, width: `${width}px` }"
        >
            <button
                v-for="(option, index) in props.options"
                :key="index"
                type="button"
                class="font-label-sm flex justify-start items-center px-2 py-1.5"
                :class="values.find(v => v.value === option.value) ? colorClasses : 'text-muted hover:text-text'"
                @click.stop="selectOption(option)"
            >
                <span>
                    {{ $t(option.label) }}
                </span>
            </button>
        </div>
    </TeleportPopover>
</template>
