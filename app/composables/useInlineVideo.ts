import type { Ref } from "vue";

interface NetworkInformation extends EventTarget {
    saveData?: boolean;
}
type PlaybackState = "idle" | "playing" | "paused" | "blocked" | "failed";
/** Playback policy and native events remain together, including stale play() recovery. */
export function useInlineVideo(video: Ref<HTMLVideoElement | null>, surface: Ref<HTMLElement | null>) {
    const visibility = useDocumentVisibility();
    const reduced = usePreferredReducedMotion();
    const { isOpen } = useMenu();
    const visible = shallowRef(false);
    const state = shallowRef<PlaybackState>("idle");
    const manuallyPaused = shallowRef(false);
    const activated = shallowRef(false);
    const saveData = shallowRef(false);
    const connection = shallowRef<NetworkInformation | undefined>();
    const playing = computed(() => state.value === "playing");
    const failed = computed(() => state.value === "failed");
    const canAutoplay = computed(() => visible.value && visibility.value === "visible" && !isOpen.value && !manuallyPaused.value && (activated.value || (reduced.value !== "reduce" && !saveData.value)));
    let request = 0;
    let disposed = false;
    function pause() {
        request++;
        video.value?.pause();
    }
    async function play(explicit = false) {
        const media = video.value;
        if (disposed || !media || failed.value || (!explicit && !canAutoplay.value))
            return;
        const token = ++request;
        media.muted = true;
        try {
            await media.play();
            if (disposed || !canAutoplay.value)
                media.pause();
        }
        catch (cause) {
            if (disposed || token !== request)
                return;
            const unusable = media.error || (cause instanceof DOMException && !["NotAllowedError", "AbortError"].includes(cause.name));
            state.value = unusable ? "failed" : "blocked";
        }
    }
    function toggle() {
        if (!video.value || failed.value)
            return;
        if (playing.value) {
            manuallyPaused.value = true;
            pause();
        }
        else {
            manuallyPaused.value = false;
            activated.value = true;
            void play(true);
        }
    }
    function retry() {
        request++;
        state.value = "idle";
        manuallyPaused.value = false;
        activated.value = true;
        video.value?.load();
        void play(true);
    }
    useIntersectionObserver(surface, ([entry]) => {
        visible.value = !!entry?.isIntersecting;
    }, { threshold: 0.15 });
    useEventListener(video, "canplay", () => {
        void play();
    });
    useEventListener(video, "play", () => {
        if (disposed || !canAutoplay.value)
            return pause();
        state.value = "playing";
    });
    useEventListener(video, "pause", () => {
        if (!failed.value && state.value !== "blocked")
            state.value = "paused";
    });
    useEventListener(video, "ended", () => {
        manuallyPaused.value = true;
        state.value = "paused";
    });
    useEventListener(video, "error", () => {
        request++;
        state.value = "failed";
    });
    watch(canAutoplay, (allowed) => {
        if (allowed)
            void play();
        else
            pause();
    });
    onMounted(() => {
        connection.value = (navigator as Navigator & {
            connection?: NetworkInformation;
        }).connection;
        saveData.value = !!connection.value?.saveData;
        if (canAutoplay.value)
            void play();
    });
    useEventListener(connection, "change", () => {
        saveData.value = !!connection.value?.saveData;
    });
    onBeforeUnmount(() => {
        disposed = true;
        pause();
    });
    return { playing, failed, toggle, retry };
}
