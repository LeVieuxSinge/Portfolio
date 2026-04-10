<script setup lang="ts">
import { createAnimatable, type AnimatableObject } from "animejs";
import { Mesh, MeshPhongMaterial, MeshToonMaterial } from "three";
import type { Group } from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

const { renderer } = useTres();
const { onBeforeRender } = useLoop();

const isCanvasInViewport = useElementVisibility(renderer.domElement);

const { state } = useGLTF("/models/head.glb", { draco: true });
watch(state, (value) => {
    if (!value) return;

    value.scene.traverse((child) => {
        if (child instanceof Mesh) {
            child.material = new CustomShaderMaterial({
                baseMaterial: MeshToonMaterial,
                fragmentShader: /* glsl */ `
                        struct ColorStop {
                            float position;
                            vec4 color;
                        };

                        #define linearColorRamp(colors, factor, finalColor) { \\
                            int index = 0; \\
                            for (int i = 0; i < colors.length() - 1; i++) { \\
                                ColorStop currentColor = colors[i]; \\
                                bool isInBetween = currentColor.position <= factor; \\
                                index = isInBetween ? i : index; \\
                            } \\
                            ColorStop currentColor = colors[index]; \\
                            ColorStop nextColor = colors[index + 1]; \\
                            float range = nextColor.position - currentColor.position; \\
                            float lerpFactor = (factor - currentColor.position) / range; \\
                            finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
                        } \\

                        #define constantColorRamp(colors, factor, finalColor) { \\
                            int index = 0; \\
                            for (int i = 0; i < colors.length() - 1; i++) { \\
                                ColorStop currentColor = colors[i]; \\
                                bool isInBetween = currentColor.position <= factor; \\
                                index = isInBetween ? i : index; \\
                            } \\
                            finalColor = colors[index].color; \\
                        } \\
                    `,
                patchMap: {
                    "*": {
                        // Dithering is the last include in the fragment shader, so we can safely inject our color ramp logic after it
                        "#include <dithering_fragment>": /* glsl */ `
                                #include <dithering_fragment>

                                ColorStop colors[5] = ColorStop[5](
                                    ColorStop(0.0, vec4(0.198067, 0.131582, 0.266985, 1.0)), // Darker purple
                                    ColorStop(0.1, vec4(0.282713, 0.187812, 0.381064, 1.0)), // Dark purple
                                    ColorStop(0.25, vec4(0.411182, 0.256126, 0.422175, 1.0)), // Purple
                                    ColorStop(0.4, vec4(0.737255, 0.368628, 0.08627, 1.0)), // Orange
                                    ColorStop(0.6, vec4(0.770117, 0.463343, 0.240621, 1.0)) // Light Orange
                                );

                                // Compute color luminance for the factor
                                float factor = 0.3086 * gl_FragColor.r + 0.6094 * gl_FragColor.g + 0.0820 * gl_FragColor.b;

                                vec4 constantFinalColor;
                                constantColorRamp(colors, factor, constantFinalColor);
                                vec4 linearFinalColor;
                                linearColorRamp(colors, factor, linearFinalColor);

                                vec4 finalColor = mix(constantFinalColor, linearFinalColor, 0.5);

                                gl_FragColor = finalColor;
                            `,
                    },
                },
            });
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    groupRightEye = value.scene.getObjectByName("GR_RightEye") as Group;
    groupRightEye.traverse((child) => {
        if (child instanceof Mesh) {
            child.material = new MeshPhongMaterial({ color: "#483061", emissive: "#483061", emissiveIntensity: 1 });
        }
    });
    groupLeftEye = value.scene.getObjectByName("GR_LeftEye") as Group;
    groupLeftEye.traverse((child) => {
        if (child instanceof Mesh) {
            child.material = new MeshPhongMaterial({ color: "#483061", emissive: "#483061", emissiveIntensity: 1 });
        }
    });
    groupMouth = value.scene.getObjectByName("GR_Mouth") as Group;
    groupMouth.traverse((child) => {
        if (child instanceof Mesh) {
            child.material = new MeshPhongMaterial({ color: "#483061", emissive: "#483061", emissiveIntensity: 1 });
        }
    });

    process();
});

let groupRightEye: Group | null = null;
let groupLeftEye: Group | null = null;
let groupMouth: Group | null = null;
let headAnimatable: AnimatableObject | null = null;
const animatedProps = {
    rotationX: 0,
    rotationY: 0,
    rePosX: 0,
    rePosY: 0,
    lePosX: 0,
    lePosY: 0,
};

const areEyesClosed = ref(false);
let currentExpressionIndex = -1;
let expressionTimeoutHandle: number | null = null;
const expressions = [
    {
        name: "default",
        mouth: "ME_MouthDefault",
        rightEye: "ME_RightEyeDefault",
        leftEye: "ME_LeftEyeDefault",
    },
    {
        name: "dead",
        mouth: "ME_MouthDefault",
        rightEye: "ME_RightEyeDead",
        leftEye: "ME_LeftEyeDead",
    },
    {
        name: "wink",
        mouth: "ME_MouthOpen",
        rightEye: "ME_RightEyeSurprised",
        leftEye: "ME_LeftEyeClosed",
    },
    {
        name: "scared",
        mouth: "ME_MouthScared",
        rightEye: "ME_RightEyeDefault",
        leftEye: "ME_LeftEyeDefault",
    },
    {
        name: "surprised",
        mouth: "ME_MouthSurprised",
        rightEye: "ME_RightEyeSurprised",
        leftEye: "ME_LeftEyeSurprised",
    },
    {
        name: "smiling",
        mouth: "ME_MouthSmiling",
        rightEye: "ME_RightEyeSmiling",
        leftEye: "ME_LeftEyeSmiling",
    },
];

onBeforeRender(() => {
    if (!isCanvasInViewport.value) return;

    const scene = unref(state)?.scene;
    if (scene) {
        scene.rotation.x = animatedProps.rotationX * (Math.PI / 180);
        scene.rotation.y = animatedProps.rotationY * (Math.PI / 180);

        // if (groupRightEye) {
        //     groupRightEye.position.x = animatedProps.rePosX;
        //     groupRightEye.position.y = animatedProps.rePosY;
        // }

        // if (groupLeftEye) {
        //     groupLeftEye.position.x = animatedProps.lePosX;
        //     groupLeftEye.position.y = animatedProps.lePosY;
        // }
    }
});

function onMouseMove(e: MouseEvent) {
    if (!headAnimatable) return;

    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const normalizedX = deltaX / (rect.width / 2);
    const normalizedY = deltaY / (rect.height / 2);

    // Clamp to [-1, 1]
    const nx = Math.max(-1, Math.min(1, normalizedX));
    const ny = Math.max(-1, Math.min(1, normalizedY));

    const rotateX = ny * 10;
    const rotateY = nx * 10;

    headAnimatable!.rotationX!(rotateX);
    headAnimatable!.rotationY!(rotateY);

    // headAnimatable!.rePosX!(nx * 0.02);
    // headAnimatable!.rePosY!(ny * 0.02);
}

function process() {
    let randomIndex: number;
    do {
        randomIndex = Math.floor(Math.random() * expressions.length);
    } while (randomIndex === currentExpressionIndex);
    currentExpressionIndex = randomIndex;
    setExpression(currentExpressionIndex);

    if (expressionTimeoutHandle !== null) {
        clearTimeout(expressionTimeoutHandle);
    }

    expressionTimeoutHandle = window.setTimeout(() => {
        process();
    }, 3000);
}

function setExpression(index: number) {
    const expression = expressions[index];
    if (!expression) return;

    if (groupRightEye) {
        groupRightEye.children.forEach((child) => {
            child.visible = child.name === expression.rightEye;
        });
    }

    if (groupLeftEye) {
        groupLeftEye.children.forEach((child) => {
            child.visible = child.name === expression.leftEye;
        });
    }

    if (groupMouth) {
        groupMouth.children.forEach((child) => {
            child.visible = child.name === expression.mouth;
        });
    }
}

onMounted(() => {
    process();

    headAnimatable = createAnimatable(animatedProps, {
        rotationX: 360,
        rotationY: 360,
        rePosX: 0,
        rePosY: 0,
        lePosX: 0,
        lePosY: 0,
        ease: "out(3)",
    });

    window.addEventListener("mousemove", onMouseMove);
});

onUnmounted(() => {
    window.removeEventListener("mousemove", onMouseMove);

    if (expressionTimeoutHandle !== null) {
        clearTimeout(expressionTimeoutHandle);
    }
});
</script>

<template>
    <primitive
        v-if="state"
        :object="state.scene"
    />
</template>
