import { animate } from "animejs";

/**
 * Own AnimeJS handles and interruption-safe completion promises for one visual surface.
 * @returns run resolves true on completion and false on cancellation; revert also restores captured styles.
 */
export function createAnimationScope() {
    const effects: ReturnType<typeof animate>[] = [];
    // Canceling an AnimeJS effect does not complete it; explicitly settle every consumer waiting on it.
    const pending = new Set<(finished: boolean) => void>();

    /**
     * Start an effect and register its waiter before AnimeJS can complete synchronously.
     * @param target DOM/library targets supported by AnimeJS.
     * @param options Animation parameters; this scope owns onComplete.
     * @returns A boolean completion promise, settled even when canceled.
     */
    function run(target: Parameters<typeof animate>[0], options: Parameters<typeof animate>[1]) {
        return new Promise<boolean>((resolve) => {
            pending.add(resolve);
            effects.push(animate(target, { ...options, onComplete: () => {
                pending.delete(resolve);
                resolve(true);
            } }));
        });
    }

    /**
     * Stop active effects and resolve pending waiters with false; retain handles so styles can still be reverted.
     */
    function cancel() {
        effects.forEach(effect => effect.cancel());
        pending.forEach(resolve => resolve(false));
        pending.clear();
    }

    /**
     * Cancel waiters, restore original styles, and release every retained animation handle.
     */
    function revert() {
        cancel();
        effects.splice(0).forEach(effect => effect.revert());
    }

    return { run, cancel, revert };
}
