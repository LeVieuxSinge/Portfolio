import type { Ref } from "vue";

interface NetworkInformation extends EventTarget { saveData?: boolean }

export function useInlineVideo(video: Ref<HTMLVideoElement | null>, surface: Ref<HTMLElement | null>) {
    const visibility = useDocumentVisibility();
    const reduced = usePreferredReducedMotion();
    const { isOpen } = useMenu();
    const visible = shallowRef(false);
    const playing = shallowRef(false);
    const failed = shallowRef(false);
    const manuallyPaused = shallowRef(false);
    const activated = shallowRef(false);
    const saveData = shallowRef(false);
    const connection = shallowRef<NetworkInformation | undefined>();
    const canAutoplay = computed(() => visible.value && visibility.value === "visible" && !isOpen.value && !manuallyPaused.value && (activated.value || (reduced.value !== "reduce" && !saveData.value)));

    async function play(explicit = false) {
        const media = video.value;
        if (!media || failed.value || (!explicit && !canAutoplay.value)) return;
        media.muted = true;
        try {
            await media.play();
            if (!canAutoplay.value) media.pause();
        }
        catch (cause) {
            playing.value = false;
            if (media.error || (cause instanceof DOMException && !["NotAllowedError", "AbortError"].includes(cause.name))) {
                failed.value = true;
            }
        }
    }
    function toggle() {
        if (!video.value || failed.value) return;
        if (playing.value) {
            manuallyPaused.value = true;
            video.value.pause();
        }
        else {
            manuallyPaused.value = false;
            activated.value = true;
            void play(true);
        }
    }
    function retry() {
        failed.value = false;
        video.value?.load();
        manuallyPaused.value = false;
        activated.value = true;
        void play(true);
    }
    function ended() {
        manuallyPaused.value = true;
        playing.value = false;
    }
    function error() {
        failed.value = true;
        playing.value = false;
    }

    useIntersectionObserver(surface, ([entry]) => {
        visible.value = !!entry?.isIntersecting;
    }, { threshold: 0.15 });
    watch(canAutoplay, (allowed) => {
        if (allowed) void play();
        else video.value?.pause();
    });
    onMounted(() => {
        connection.value = (navigator as Navigator & { connection?: NetworkInformation }).connection;
        saveData.value = !!connection.value?.saveData;
        if (canAutoplay.value) void play();
    });
    useEventListener(connection, "change", () => {
        saveData.value = !!connection.value?.saveData;
    });
    onBeforeUnmount(() => video.value?.pause());
    return { playing, failed, play, toggle, retry, ended, error };
}
