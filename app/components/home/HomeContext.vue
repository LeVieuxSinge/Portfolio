<template>
    <HomeSection>
        <div class="flex flex-col gap-y-1 col-start-2 col-span-4">
            <h5 class="font-label-md text-accent-3">
                {{ $t("home.context.subtitle") }}
            </h5>
            <h2 class="font-title-lg">
                {{ $t("home.context.title") }}
            </h2>
            <p class="font-body-md text-muted">
                {{ $t("home.context.description") }}
            </p>
        </div>
    </HomeSection>
</template>
