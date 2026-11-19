<script setup lang="ts">
import type { Project } from "#shared/types/portfolio";

defineProps<{ project: Project }>();
const { t } = useI18n();
</script>

<template>
    <dl class="mt-10 flex min-w-0 flex-col gap-6 md:mt-[60px] md:flex-row md:gap-[35px]">
        <div
            data-reveal
            class="min-w-0 flex-1"
        >
            <dt class="eyebrow mb-3">
                {{ t('pages.project.client') }}
            </dt>
            <dd class="text-sm md:text-base">
                {{ project.client }}
            </dd>
        </div>
        <div
            class="min-w-0 md:flex-[1.4]"
            data-reveal
        >
            <dt class="eyebrow mb-3">
                {{ t('pages.project.role') }}
            </dt>
            <dd class="flex flex-wrap items-start gap-[7px]">
                <ProfileBadge
                    v-for="profile in project.profiles"
                    :key="profile"
                    :profile="profile"
                />
            </dd>
        </div>
        <div
            class="min-w-0 md:flex-[1.55]"
            data-reveal
        >
            <dt class="eyebrow mb-3">
                {{ t('pages.project.tags') }}
            </dt>
            <dd class="flex flex-wrap items-start gap-[7px]">
                <TagBadge
                    v-for="tag in project.tags"
                    :key="tag"
                    :tag="tag"
                    :label="project.tagLabels?.[tag]"
                />
            </dd>
        </div>
        <div
            class="min-w-0 md:flex-[0.4]"
            data-reveal
        >
            <dt class="eyebrow mb-3">
                {{ t('pages.project.year') }}
            </dt>
            <dd class="font-mono text-sm">
                {{ project.year }}
            </dd>
        </div>
    </dl>
</template>
