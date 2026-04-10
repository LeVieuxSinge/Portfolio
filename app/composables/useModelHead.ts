import { Mesh, MeshBasicMaterial, MeshToonMaterial } from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";

export const useModelHead = createSharedComposable(() => {
    const { state, isLoading, materials, nodes } = useGLTF("/models/head.glb", { draco: true });
    watch(state, (value) => {
        if (!value) return;

        value.scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.material = new CustomShaderMaterial({
                    baseMaterial: MeshToonMaterial,
                    // vertexShader: /* glsl */ `
                    //     varying vec2 vUv;
                    //     void main() {
                    //         vUv = uv;
                    //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    //     }
                    // `,
                    fragmentShader: /* glsl */ `
                        struct ColorStop {
                            float position;
                            vec4 color;
                        };

                        #define colorRamp(colors, factor, finalColor) { \\
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
                    `,
                    patchMap: {
                        "*": {
                            // Dithering is the last include in the fragment shader, so we can safely inject our color ramp logic after it
                            "#include <dithering_fragment>": /* glsl */ `
                                #include <dithering_fragment>

                                ColorStop colors[5] = ColorStop[5](
                                    ColorStop(0.0, vec4(0.198067, 0.131582, 0.266985, 1.0)), // Darker purple
                                    ColorStop(0.1, vec4(0.282713, 0.187812, 0.381064, 1.0)), // Dark purple
                                    ColorStop(0.2, vec4(0.411182, 0.256126, 0.422175, 1.0)), // Purple
                                    ColorStop(0.5, vec4(0.737255, 0.368628, 0.08627, 1.0)), // Orange
                                    ColorStop(0.7, vec4(0.770117, 0.463343, 0.240621, 1.0)) // Light Orange
                                );

                                vec4 finalColor;
                                // Compute color luminance for the factor
                                float factor = 0.3086 * gl_FragColor.r + 0.6094 * gl_FragColor.g + 0.0820 * gl_FragColor.b;
                                colorRamp(colors, factor, finalColor);

                                gl_FragColor = finalColor;
                            `,
                        },
                    },
                });
                // child.castShadow = true;
                // child.receiveShadow = true;
            }
        });
        console.log(state);
    });

    return {
        state,
        isLoading,
        materials,
        nodes,
    };
});
