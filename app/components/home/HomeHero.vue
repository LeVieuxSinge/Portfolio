<template>
    <section class="h-[calc(100lvh-80px)] md:h-[calc(100lvh-80px)] flex justify-between items-center pb-[80px]">
        <!-- Scroll arrow -->
        <div class="fixed bottom-7 left-1/2 transform -translate-x-1/2">
            <Icon
                name="material-symbols:keyboard-arrow-down"
                size="24"
                class="animate-bounce"
            />
        </div>

        <HomeAutomaticTyper />
    </section>
</template>
