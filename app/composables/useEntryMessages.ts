import { entryMessages } from "~/utils/motion/tokens";

/** SSR serializes the shuffled order so hydration keeps the first sentence intact. */
export function useEntryMessages() {
    const order = useState<number[]>("entry-message-order", () => {
        const values = Array.from({ length: entryMessages.count }, (_, index) => index + 1);
        for (let index = values.length - 1; index > 0; index--) {
            const other = Math.floor(Math.random() * (index + 1));
            [values[index], values[other]] = [values[other]!, values[index]!];
        }
        return values;
    });
    const history = shallowRef<number[]>([order.value[0]!]);
    let cursor = 1;

    function insert() {
        if (cursor >= order.value.length) return;
        history.value = [order.value[cursor++]!, ...history.value].slice(0, entryMessages.history);
        if (cursor === order.value.length) pause();
    }
    const { pause, resume } = useIntervalFn(insert, entryMessages.interval, { immediate: false });
    function start(sincePaint: number) {
        while (cursor < Math.min(order.value.length, Math.floor(sincePaint / entryMessages.interval) + 1)) insert();
        if (cursor < order.value.length) resume();
    }
    return { history: readonly(history), start, stop: pause };
}
