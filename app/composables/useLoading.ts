type ReadinessTask = "locale" | "route" | "shell";
const essentialTasks: ReadinessTask[] = ["locale", "route", "shell"];

export function useLoading() {
    const completed = useState<ReadinessTask[]>("entry-readiness", () => []);
    const phase = useState<"loading" | "revealing" | "complete">("entry-phase", () => "loading");
    const isLoading = computed(() => phase.value !== "complete");
    const isRevealing = computed(() => phase.value === "revealing");
    const ready = computed(() => essentialTasks.every(task => completed.value.includes(task)));
    function complete(task: ReadinessTask) {
        if (!completed.value.includes(task)) completed.value = [...completed.value, task];
    }
    function finish() {
        phase.value = "complete";
    }
    function beginReveal() {
        if (ready.value && phase.value === "loading") phase.value = "revealing";
    }
    return { isLoading, isRevealing, ready, complete, beginReveal, finish };
}
