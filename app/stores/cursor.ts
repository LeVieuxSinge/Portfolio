export const useCursorStore = defineStore("cursor", () => {
    const text = ref("");

    return {
        text,
    };
});
