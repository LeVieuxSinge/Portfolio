import type { Ref } from "vue";

/** Optional browser connection hint; absence keeps normal autoplay policy. */
interface NetworkInformation extends EventTarget {
    /** User data-saving preference; explicit activation may override it. */
    saveData?: boolean;
}

/** Blocked playback offers Play; a source failure offers a separate retry action. */
type PlaybackState = "idle" | "playing" | "paused" | "blocked" | "failed";

/**
 * Own playback state, native events, visibility, preferences, and recovery for one video instance.
 * @param video Component-owned video element; native listeners follow the reactive ref.
 * @param surface Visible button surface observed with a 15% intersection threshold.
 * @returns Read-only playing/failed flags plus toggle/retry; disposal pauses media and invalidates pending play attempts.
 */
export function useInlineVideo(video: Ref<HTMLVideoElement | null>, surface: Ref<HTMLElement | null>) {
    const visibility = useDocumentVisibility();
    const reduced = usePreferredReducedMotion();
    const { isOpen } = useMenu();

    // Visibility and user intent are independent: leaving the viewport is not a manual pause.
    const visible = shallowRef(false);
    const state = shallowRef<PlaybackState>("idle");
    const manuallyPaused = shallowRef(false);
    const activated = shallowRef(false);
    const saveData = shallowRef(false);
    const connection = shallowRef<NetworkInformation | undefined>();

    // Derived flags are read-only outside this owner; templates never mutate playback state.
    const playing = computed(() => state.value === "playing");
    const failed = computed(() => state.value === "failed");
    const canAutoplay = computed(() => visible.value && visibility.value === "visible" && !isOpen.value && !manuallyPaused.value && (activated.value || (reduced.value !== "reduce" && !saveData.value)));

    // A generation rejects stale play() failures after retry, pause, or unmount.
    let request = 0;
    let disposed = false;

    /**
     * Invalidate pending play-result handling and pause the current element without changing explicit activation policy.
     */
    function pause() {
        request++;
        video.value?.pause();
    }

    /**
     * Request muted playback and reconcile the result with current visibility/policy. Stale rejections cannot overwrite newer state.
     * @param explicit True for a user action; it can bypass initial reduced-motion/data-saving restrictions but not visibility/menu suspension.
     */
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

    /**
     * Translate native button activation into manual pause or explicit playback permission; Enter/Space need no separate handlers.
     */
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

    /**
     * Clear source failure, reload media, and grant explicit playback permission; a repeated source error restores the localized retry surface.
     */
    function retry() {
        request++;
        state.value = "idle";
        manuallyPaused.value = false;
        activated.value = true;
        video.value?.load();
        void play(true);
    }

    // VueUse binds native events/observation to the reactive element refs and component scope.
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
