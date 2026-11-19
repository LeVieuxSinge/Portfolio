<!-- Typed controlled filter/sort inputs; Archive owns URL updates and the list owns layout effects. -->
<script setup lang="ts">
import type { ArchiveSort, ProfileId, SelectOption } from "#shared/types/portfolio";
import { profileOrder } from "#shared/utils/catalog";

const props = defineProps<{
    /** Canonical profile filter; empty string selects all Archive profiles. */
    role: ProfileId | "";
    /** Canonical ordering value used by the controlled sort dropdown. */
    sort: ArchiveSort;
}>();
const emit = defineEmits<{
    /** Emit validated role and sort together; the Archive page owns URL/history updates. */
    change: [role: ProfileId | "", sort: ArchiveSort];
}>();

const { t } = useI18n();

const roles = computed<readonly SelectOption<ProfileId | "">[]>(() => [{ value: "", label: t("pages.archive.all") }, ...profileOrder.map(value => ({ value, label: t(`role.${value}`) }))]);
const sorts = computed<readonly SelectOption<ArchiveSort>[]>(() => [
    { value: "newest", label: t("pages.archive.newest") },
    { value: "oldest", label: t("pages.archive.oldest") },
    { value: "title", label: t("pages.archive.byTitle") },
]);
</script>

<template>
    <div
        class="mb-[25px] flex flex-col justify-between gap-5 md:mb-9 md:flex-row md:gap-[30px]"
        data-reveal
    >
        <div class="w-full md:max-w-[370px]">
            <ArchiveDropdown
                :model-value="role"
                :label="t('pages.project.role')"
                :accessible-label="t('pages.archive.filterLabel')"
                :options="roles"
                @update:model-value="emit('change', $event, props.sort)"
            />
        </div>
        <div class="w-full md:max-w-[280px]">
            <ArchiveDropdown
                :model-value="sort"
                :label="t('pages.archive.sort')"
                :accessible-label="t('pages.archive.sortLabel')"
                :options="sorts"
                @update:model-value="emit('change', props.role, $event)"
            />
        </div>
    </div>
</template>
