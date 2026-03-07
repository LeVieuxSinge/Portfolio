import { useBreakpoints as _, breakpointsTailwind } from "@vueuse/core";

export function useBreakpoints() {
    return _(breakpointsTailwind);
}
