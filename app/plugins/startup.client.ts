export default defineNuxtPlugin({
    name: "startup-diagnostics",
    enforce: "pre",
    setup(app) {
        if (!import.meta.dev && !new URLSearchParams(location.search).has("startup")) return;
        const bootstrapAt = performance.now();
        const tasks: PerformanceEntry[] = [];
        let timer: ReturnType<typeof setTimeout> | undefined;
        const observer = PerformanceObserver.supportedEntryTypes.includes("longtask")
            ? new PerformanceObserver(list => tasks.push(...list.getEntries()))
            : undefined;
        observer?.observe({ type: "longtask", buffered: true });
        const stopMounted = app.hook("app:mounted", () => {
            const mountedAt = performance.now();
            performance.mark("portfolio:mounted");
            timer = setTimeout(() => {
                tasks.push(...observer?.takeRecords() || []);
                observer?.disconnect();
                const startupTasks = tasks.filter(task => task.startTime < mountedAt);
                console.debug("[portfolio startup]", JSON.stringify({
                    bootstrapMs: Math.round(bootstrapAt), mountedMs: Math.round(mountedAt),
                    hydrationMs: Math.round(mountedAt - bootstrapAt),
                    longestTaskMs: Math.round(Math.max(0, ...startupTasks.map(task => task.duration))),
                    longTaskCount: startupTasks.length,
                    blockingMs: Math.round(startupTasks.reduce((sum, task) => sum + Math.max(0, task.duration - 50), 0)),
                }));
            }, 0);
        });
        function dispose() {
            clearTimeout(timer);
            observer?.disconnect();
            stopMounted();
        }
        if (import.meta.hot) import.meta.hot.dispose(dispose);
        app.vueApp.onUnmount(dispose);
    },
});
