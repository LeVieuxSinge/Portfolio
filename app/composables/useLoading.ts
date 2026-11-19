/** Essential document milestones, deliberately independent of project media and fonts finishing their downloads. */
type ReadinessTask = "locale" | "route" | "shell";

const essentialTasks: ReadinessTask[] = ["locale", "route", "shell"];

/**
 * Share document-entry readiness and phase through SSR-safe state; gallery downloads never participate.
 * @returns Readiness/visibility flags and milestone/phase actions; the loader is not restarted on client navigation.
 */
export function useLoading() {
    const completed = useState<ReadinessTask[]>("entry-readiness", () => []);
    const phase = useState<"loading" | "revealing" | "complete">("entry-phase", () => "loading");

    const isLoading = computed(() => phase.value !== "complete");
    const isRevealing = computed(() => phase.value === "revealing");
    const ready = computed(() => essentialTasks.every(task => completed.value.includes(task)));

    /**
     * Record an essential locale/route/shell milestone once; repeated lifecycle notifications are harmless.
     */
    function complete(task: ReadinessTask) {
        if (!completed.value.includes(task)) completed.value = [...completed.value, task];
    }

    /**
     * Remove the entry surface after its presentation-owned exit has completed.
     */
    function finish() {
        phase.value = "complete";
    }

    /**
     * Permit page entrance preparation only after all essential milestones are ready; presentation separately enforces the two-second minimum.
     */
    function beginReveal() {
        if (ready.value && phase.value === "loading") phase.value = "revealing";
    }

    return { isLoading, isRevealing, ready, complete, beginReveal, finish };
}
