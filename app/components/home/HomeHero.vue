<script setup lang="ts">
import { mapRange } from "animejs";

const { y } = useScroll(document);

interface TypedWord {
    text: string;
    isGood: boolean;
    // Short message to show when the user types this word, if different from the default good/bad messages
    customMessage?: string;
}

// List of words to type, with a flag indicating whether they are "good" or "bad" for the message
// Any unknown word will be treated as a "bad" word, but you can also specify custom messages for specific words if you want
const words = computed<TypedWord[]>(() => [
    // #region Qualities
    {
        text: $t("home.hero.words.qualities.curious.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.qualities.creative.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.qualities.passionate.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.qualities.intelligent.label"),
        isGood: true,
        customMessage: $t("home.hero.words.qualities.intelligent.message"),
    },
    {
        text: $t("home.hero.words.qualities.flexible.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.qualities.perfectionist.label"),
        isGood: false,
        customMessage: $t("home.hero.words.qualities.perfectionist.message"),
    },
    // #endregion
    // #region Interests
    {
        text: $t("home.hero.words.interests.starwars.label"),
        isGood: true,
        customMessage: $t("home.hero.words.interests.starwars.message"),
    },
    {
        text: $t("home.hero.words.interests.basketball.label"),
        isGood: true,
        customMessage: $t("home.hero.words.interests.basketball.message"),
    },
    {
        text: $t("home.hero.words.interests.movies.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.interests.videogames.label"),
        isGood: true,
        customMessage: $t("home.hero.words.interests.videogames.message"),
    },
    {
        text: $t("home.hero.words.interests.music.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.interests.traveling.label"),
        isGood: false,
        customMessage: $t("home.hero.words.interests.traveling.message"),
    },
    {
        text: $t("home.hero.words.interests.ai.label"),
        isGood: false,
        customMessage: $t("home.hero.words.interests.ai.message"),
    },
    {
        text: $t("home.hero.words.interests.proceduralgeneration.label"),
        isGood: true,
        customMessage: $t("home.hero.words.interests.proceduralgeneration.message"),
    },
    // #endregion
    // #region Skills
    {
        text: $t("home.hero.words.skills.modeling.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.skills.texturing.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.skills.sculpting.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.skills.programming.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.skills.videoediting.label"),
        isGood: true,
    },
    // #endregion
    // #region Softwares
    {
        text: $t("home.hero.words.softwares.blender.label"),
        isGood: true,
        customMessage: $t("home.hero.words.softwares.blender.message"),
    },
    {
        text: $t("home.hero.words.softwares.krita.label"),
        isGood: true,
        customMessage: $t("home.hero.words.softwares.krita.message"),
    },
    {
        text: $t("home.hero.words.softwares.substancepainter.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.softwares.unrealengine.label"),
        isGood: true,
        customMessage: $t("home.hero.words.softwares.unrealengine.message"),
    },
    {
        text: $t("home.hero.words.softwares.photoshop.label"),
        isGood: true,
    },
    {
        text: $t("home.hero.words.softwares.nuxt.label"),
        isGood: true,
        customMessage: $t("home.hero.words.softwares.nuxt.message"),
    },
    {
        text: $t("home.hero.words.softwares.vue.label"),
        isGood: true,
        customMessage: $t("home.hero.words.softwares.vue.message"),
    },
    {
        text: $t("home.hero.words.softwares.max.label"),
        isGood: false,
        customMessage: $t("home.hero.words.softwares.max.message"),
    },
    {
        text: $t("home.hero.words.softwares.zbrush.label"),
        isGood: false,
        customMessage: $t("home.hero.words.softwares.zbrush.message"),
    },
    {
        text: $t("home.hero.words.softwares.next.label"),
        isGood: false,
        customMessage: $t("home.hero.words.softwares.next.message"),
    },
    {
        text: $t("home.hero.words.softwares.react.label"),
        isGood: false,
        customMessage: $t("home.hero.words.softwares.react.message"),
    },
    {
        text: $t("home.hero.words.softwares.unity.label"),
        isGood: true,
        customMessage: $t("home.hero.words.softwares.unity.message"),
    },
    // #endregion
]);
function randomWord() {
    return words.value[Math.floor(Math.random() * words.value.length)]!;
}

const goodMessages = computed(() => [
    $t("home.hero.messages.good.1"),
    $t("home.hero.messages.good.2"),
    $t("home.hero.messages.good.3"),
    $t("home.hero.messages.good.4"),
    $t("home.hero.messages.good.5"),
    $t("home.hero.messages.good.6"),
    $t("home.hero.messages.good.7"),
    $t("home.hero.messages.good.8"),
]);
function randomGoodMessage() {
    return goodMessages.value[Math.floor(Math.random() * goodMessages.value.length)]!;
}

const badMessages = computed(() => [
    $t("home.hero.messages.bad.1"),
    $t("home.hero.messages.bad.2"),
    $t("home.hero.messages.bad.3"),
    $t("home.hero.messages.bad.4"),
    $t("home.hero.messages.bad.5"),
    $t("home.hero.messages.bad.6"),
    $t("home.hero.messages.bad.7"),
    $t("home.hero.messages.bad.8"),
]);
function randomBadMessage() {
    return badMessages.value[Math.floor(Math.random() * badMessages.value.length)]!;
}

const currentWord = ref(randomWord());
const mistakesCount = ref(0);
const clearWord = ref(false);
const clearMistakes = ref(false);
const currentLetterIndex = ref(0);
const currentLetters = reactive<string[]>([]);
const maxLetters = computed(() => Math.max(...words.value.map(w => w.text.length)) + 5); // Max word length + some extra space for mistakes
const isLoadingMessage = ref(true);
const isGoodMessage = ref(true);
const currentMessage = ref("");
let processTimeoutHandle: number | null = null;
let messageTimeoutHandle: number | null = null;

function nextLetter() {
    if (currentLetterIndex.value < currentWord.value.text.length) {
        return currentWord.value.text[currentLetterIndex.value]!;
    }
    return null;
}

function randomLetter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)]!;
}

function process() {
    // If there are mistakes, prioritize clearing them before typing the next letter
    if (mapRange(mistakesCount.value, 0, 3, 0, 1) > Math.random()) {
        clearMistakes.value = true;
    }

    // Decide whether to type or erase
    let isTyping = true; // Start by typing
    if (clearWord.value) {
        isTyping = false;
    }
    else if (clearMistakes.value) {
        isTyping = false;
    }

    if (isTyping) {
        // Force mistakes if there are already some, otherwise allow for random mistakes
        const isTypoMistake = Math.random() < 0.2;
        if (isTypoMistake) {
            mistakesCount.value++;
            typeLetter(randomLetter());
        }
        else {
            // If there are already mistakes, count next letters as mistakes until we clear them
            if (mistakesCount.value > 0) {
                mistakesCount.value++;
            }
            typeLetter(nextLetter());
        }

        // Reach the end of the word, prepare to clear it on the next process
        if (currentLetterIndex.value === currentWord.value.text.length) {
            // If we have mistakes, prioritize clearing them first
            if (mistakesCount.value > 0) {
                clearMistakes.value = true;

                processTimeoutHandle = setTimeout(() => {
                    process();
                }, Math.random() * 200 + 100); // Random delay between 100ms and 300ms for typing
            }
            else {
                clearWord.value = true;

                currentMessage.value = currentWord.value.customMessage || randomGoodMessage();
                isGoodMessage.value = currentWord.value.isGood;
                messageTimeoutHandle = setTimeout(() => {
                    isLoadingMessage.value = false;
                    processTimeoutHandle = setTimeout(() => {
                        process();
                    }, 3000); // Wait for 3 seconds before starting to erase
                }, 1000); // Show a message after 1 second of finishing typing the word
            }
        }
        else {
            processTimeoutHandle = setTimeout(() => {
                process();
            }, Math.random() * 200 + 100); // Random delay between 100ms and 300ms for typing
        }
    }
    else {
        eraseLetter();

        // Start loading message as soon as we start erasing the word
        if (!isLoadingMessage.value) {
            messageTimeoutHandle = setTimeout(() => {
                isLoadingMessage.value = true;
            }, 500); // Show processing message after 0.5 second of starting to erase the word
        }

        // If we have cleared the whole word
        if (currentLetterIndex.value === 0) {
            // And we had mistakes, start typing the same word again to fix the mistakes
            if (mistakesCount.value > 0) {
                clearMistakes.value = false;
                mistakesCount.value = 0;
                processTimeoutHandle = setTimeout(() => {
                    process();
                }, Math.random() * 200 + 100); // Random delay between 100ms and 300ms before starting to type again
            }
            else {
                clearWord.value = false;
                clearMistakes.value = false;
                mistakesCount.value = 0;

                think();
            }
        }
        else {
            // If we have mistakes, prioritize clearing them first
            mistakesCount.value = Math.max(0, mistakesCount.value - 1);

            // If we have cleared all mistakes, reset the count
            if (clearMistakes.value && mistakesCount.value === 0) {
                clearMistakes.value = false;
            }

            processTimeoutHandle = setTimeout(() => {
                process();
            }, Math.random() * 100 + 50); // Random delay between 50ms and 150ms for erasing, faster than typing
        }
    }
}

function think(time: number = 3000) {
    if (processTimeoutHandle) {
        clearTimeout(processTimeoutHandle);
        processTimeoutHandle = null;
    }

    processTimeoutHandle = setTimeout(() => {
        currentWord.value = randomWord();
        process();
    }, time);
}

function typeLetter(letter: string | null) {
    if (letter && currentLetterIndex.value < currentWord.value.text.length) {
        currentLetters.push(letter);
        currentLetterIndex.value++;
    }
}

function eraseLetter() {
    if (currentLetterIndex.value > 0) {
        currentLetters.pop();
        currentLetterIndex.value--;
    }
}

function onKeydown(event: KeyboardEvent) {
    const acceptedKeys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890Backspace ";
    if (!acceptedKeys.includes(event.key)) {
        return;
    }

    if (processTimeoutHandle) {
        clearTimeout(processTimeoutHandle);
        processTimeoutHandle = null;
    }

    if (messageTimeoutHandle) {
        clearTimeout(messageTimeoutHandle);
        messageTimeoutHandle = null;
    }

    // Disable space key default behavior (scrolling the page) and ignore it for typing, since it doesn't affect the current word
    if (event.key === " ") {
        event.preventDefault();
    }

    // Erase on backspace, type on any other key
    if (event.key === "Backspace") {
        currentLetters.pop();
        currentLetterIndex.value = Math.max(0, currentLetterIndex.value - 1);
    }
    else {
        if (currentLetterIndex.value < maxLetters.value) {
            currentLetters.push(event.key);
            currentLetterIndex.value++;
        }
    }

    if (currentLetterIndex.value !== 0) {
        isLoadingMessage.value = false;
        isLoadingMessage.value = true;

        messageTimeoutHandle = setTimeout(() => {
            isLoadingMessage.value = false;

            // Check if the current input matches a word, and update the message accordingly
            const currentInput = currentLetters.join("");
            const matchedWord = words.value.find(word => word.text.toLowerCase() === currentInput.toLowerCase());
            if (matchedWord && matchedWord.isGood) {
                isGoodMessage.value = true;
                currentMessage.value = matchedWord.customMessage || randomGoodMessage();
            }
            else if (matchedWord && !matchedWord.isGood) {
                isGoodMessage.value = false;
                currentMessage.value = matchedWord.customMessage || randomBadMessage();
            }
            else {
                isGoodMessage.value = false;
                currentMessage.value = randomBadMessage();
            }
        }, 1000); // Update message 1 second after user input
    }

    processTimeoutHandle = setTimeout(() => {
        clearWord.value = true;
        process();
    }, 10000); // Wait for 10 seconds of inactivity before resuming the automatic typing
}

// Restart the process to update the translated words
const { locale } = useI18n();
watch(locale, () => {
    if (processTimeoutHandle) {
        clearTimeout(processTimeoutHandle);
        processTimeoutHandle = null;
    }

    if (messageTimeoutHandle) {
        clearTimeout(messageTimeoutHandle);
        messageTimeoutHandle = null;
    }

    clearWord.value = true;
    process();
});

onMounted(() => {
    think(1000); // Start the process after 1 second

    window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
    if (processTimeoutHandle) {
        clearTimeout(processTimeoutHandle);
    }
    if (messageTimeoutHandle) {
        clearTimeout(messageTimeoutHandle);
    }

    window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
    <section class="relative h-[calc(100lvh-80px)] md:h-[calc(100lvh-80px)] flex flex-col justify-end items-center pb-[80px]">
        <!-- Scroll arrow -->
        <Transition
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="y < 100"
                class="fixed bottom-7 left-1/2 transform -translate-x-1/2"
            >
                <Icon
                    name="material-symbols:keyboard-arrow-down"
                    size="24"
                    class="animate-bounce"
                />
            </div>
        </Transition>

        <!-- 3D -->
        <div class="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full max-w-200 max-h-200 pointer-events-none">
            <TresCanvas
                alpha
                :clear-alpha="0"
            >
                <SceneHead />
            </TresCanvas>
        </div>

        <!-- Robot Typer -->
        <div class="z-1 col-span-6 flex flex-col items-center gap-y-2">
            <h5 class="min-h-6 font-body-sm text-muted">
                {{ $t("home.hero.hint") }}
            </h5>
            <div class="flex flex-col max-w-full items-center gap-y-2">
                <span class="font-display-md max-w-full flex flex-wrap justify-center items-center">
                    <span
                        v-for="(letter, index) in currentLetters"
                        :key="index"
                        :class="[
                            'inline-block',
                            letter === ' ' ? 'mx-1' : '',
                        ]"
                    >
                        {{ letter }}
                    </span>
                    <span class="inline-block w-1 h-16 ml-1 bg-toned animate-flash" />
                </span>

                <div class="min-h-6 flex items-end">
                    <ConsoleOutput
                        size="sm"
                        :color="isLoadingMessage ? 'muted' : isGoodMessage ? 'accent-1' : 'accent-2'"
                    >
                        <span
                            v-if="currentLetters.length === 0"
                            class="animate-pulse"
                        >
                            {{ $t("home.hero.waiting") }}
                        </span>
                        <span
                            v-else-if="isLoadingMessage"
                            class="flex items-end gap-x-2"
                        >
                            {{ $t("home.hero.processing") }}
                            <Icon
                                v-if="isLoadingMessage"
                                name="material-symbols:progress-activity"
                                class="animate-spin"
                                size="18"
                            />
                        </span>
                        <span v-else>
                            {{ currentMessage }}
                        </span>
                    </ConsoleOutput>
                </div>
            </div>
        </div>
    </section>
</template>
