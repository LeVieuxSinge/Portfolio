<script setup lang="ts">
const isVideoPlaying = ref(false);

function playReel() {
    const video = document.querySelector("#home-reel video") as HTMLVideoElement;
    if (video) {
        video.controls = true;
        video.muted = false;
        video.currentTime = 0;
        setTimeout(() => {
            video.play();
        }, 100);

        isVideoPlaying.value = true;
    }
}
</script>

<template>
    <section
        id="home-reel"
        class="flex flex-col"
    >
        <div class="w-full flex justify-center border-y border-border">
            <div class="flex flex-col items-end border-x border-border">
                <button
                    class="relative w-full overflow-hidden aspect-video"
                    @click="playReel"
                >
                    <div
                        v-if="!isVideoPlaying"
                        class="absolute inset-0 font-display-md flex flex-col justify-center items-center gap-y-2 bg-background/50"
                    >
                        <div class="font-display-md">
                            Reel 2020
                        </div>
                        <div class="font-label-md text-muted">
                            {{ $t("components.home.reel.play") }}
                        </div>
                    </div>
                    <video
                        src="/videos/reel_2020.mp4"
                        preload="auto"
                        autoplay
                        muted
                        loop
                    />
                </button>

                <!-- <ConsoleOutput color="accent-1">
                        Want to see the 2020 version? <button
                            class="underline"
                            @click="goToReel2020"
                        >
                            Click here
                        </button>
                    </ConsoleOutput> -->
            </div>
        </div>
    </section>
</template>
