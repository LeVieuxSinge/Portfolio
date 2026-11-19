import { animate } from "animejs";

/** Own animation handles and settle waiters when an effect is interrupted. */
export function createAnimationScope() {
    const effects: ReturnType<typeof animate>[] = [];
    const pending = new Set<(finished: boolean) => void>();

    function run(target: Parameters<typeof animate>[0], options: Parameters<typeof animate>[1]) {
        return new Promise<boolean>((resolve) => {
            pending.add(resolve);
            effects.push(animate(target, { ...options, onComplete: () => {
                pending.delete(resolve);
                resolve(true);
            } }));
        });
    }

    function cancel() {
        effects.forEach(effect => effect.cancel());
        pending.forEach(resolve => resolve(false));
        pending.clear();
    }

    function revert() {
        cancel();
        effects.splice(0).forEach(effect => effect.revert());
    }

    return { run, cancel, revert };
}
