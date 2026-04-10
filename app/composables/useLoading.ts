const messages = [
    "loading.messages.1",
    "loading.messages.2",
    "loading.messages.3",
    "loading.messages.4",
    "loading.messages.5",
    "loading.messages.6",
    "loading.messages.7",
    "loading.messages.8",
    "loading.messages.9",
    "loading.messages.10",
    "loading.messages.11",
    "loading.messages.12",
    "loading.messages.13",
    "loading.messages.14",
    "loading.messages.15",
    "loading.messages.16",
];

function randomMessage() {
    return messages[Math.floor(Math.random() * messages.length)]!;
}

export function useLoading() {
    const isLoading = useState<boolean>("isLoading", () => true);
    const isPageTransitioning = useState<boolean>("isPageTransitioning", () => false);

    return {
        isLoading,
        isPageTransitioning,
        messages,
        randomMessage,
    };
}
