export function useImageRecovery(source: () => string) {
    const failed = shallowRef(false);
    const attempt = shallowRef(0);
    function retry() {
        failed.value = false;
        attempt.value++;
    }
    watch(source, () => {
        failed.value = false;
        attempt.value = 0;
    });
    return { failed: readonly(failed), attempt: readonly(attempt), fail: () => {
        failed.value = true;
    }, retry };
}
