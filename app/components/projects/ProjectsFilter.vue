<template>
    <div class="z-1 w-full bg-background border border-border rounded-full px-6 pt-3 pb-4 flex justify-between items-center gap-x-4">
        <div
            v-for="i in 3"
            :key="i"
            class="flex-1 flex flex-col gap-y-1"
        >
            <label class="font-label-sm text-subtext ml-4">
                Label
            </label>
            <div class="rounded-4xl bg-background p-4 border border-border" />
        </div>
    </div>
</template>
