<script setup lang="ts">
defineProps<{ open: boolean; label: string; accessibleLabel: string }>();
</script>

<template>
    <button
        type="button"
        class="menu-toggle flex min-h-11 min-w-11 items-center justify-center gap-3 font-sans text-[11px] md:justify-end"
        :aria-label="accessibleLabel"
        :data-open="open"
        data-menu-toggle
    >
        <span class="max-md:hidden">{{ label }}</span>
        <span
            class="menu-toggle-lines"
            aria-hidden="true"
        >
            <span />
            <span />
        </span>
    </button>
</template>

<style scoped>
.menu-toggle-lines { position: relative; display: block; width: 24px; height: 24px; flex: none; }
.menu-toggle-lines > span { position: absolute; left: 3px; top: 11px; width: 18px; height: 1px; background: currentColor; transform: translate(-3px, -3px); transition: transform 400ms cubic-bezier(.22,1,.36,1); }
.menu-toggle-lines > span:last-child { transform: translate(3px, 3px); }
.menu-toggle[data-open="true"] .menu-toggle-lines > span { transform: rotate(45deg); }
.menu-toggle[data-open="true"] .menu-toggle-lines > span:last-child { transform: rotate(-45deg); }
@media (hover: hover) and (pointer: fine) and (min-width: 701px) {
    .menu-toggle[data-open="false"]:is(:hover, :focus-visible) .menu-toggle-lines > span { transform: translate(0, -3px); }
    .menu-toggle[data-open="false"]:is(:hover, :focus-visible) .menu-toggle-lines > span:last-child { transform: translate(0, 3px); }
}
</style>
