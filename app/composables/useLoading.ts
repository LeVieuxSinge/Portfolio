type ReadinessTask = "locale" | "route" | "shell";
const essentialTasks: ReadinessTask[] = ["locale", "route", "shell"];

export function useLoading() {
    const completed = useState<ReadinessTask[]>("entry-readiness", () => []);
    const progress = useState<number>("entry-progress", () => 0);
    const isLoading = useState<boolean>("entry-visible", () => true);
    const isRevealing = useState<boolean>("entry-revealing", () => false);
    const ready = computed(() => essentialTasks.every(task => completed.value.includes(task)));
    function complete(task: ReadinessTask) {
        if (!completed.value.includes(task)) completed.value = [...completed.value, task];
    }
    function finish() {
        isLoading.value = false;
        isRevealing.value = false;
    }
    return { progress, isLoading, isRevealing, ready, complete, finish };
}
