/**
 * Keep image errors/retries independent of video playback policy.
 * @param source Reactive source getter; changing files resets failure and the remount key.
 * @returns Read-only failure/attempt refs, fail for the native error event, and retry to remount the image.
 */
export function useImageRecovery(source: () => string) {
    const failed = shallowRef(false);
    const attempt = shallowRef(0);

    /**
     * Remove the fallback and increment the image key so the browser attempts the same retained source again.
     */
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
