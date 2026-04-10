<script setup lang="ts">
import { VSMShadowMap } from "three";
import { extend } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

extend({ OrbitControls });
</script>

<template>
    <TresCanvas
        alpha
        antialias
        shadows
        :shadow-map-type="VSMShadowMap"
        :clear-alpha="0"
        class="pointer-events-none!"
    >
        <TresPerspectiveCamera
            :fov="5"
            :position="[0, 0, 40]"
        />
        <!-- <OrbitControls /> -->
        <TresAmbientLight :intensity="0.2" />
        <TresDirectionalLight
            ref="dirLight"
            :position="[0.75, 0.75, 2]"
            :intensity="0.2"
            :cast-shadow="true"
            :shadow-mapsize-width="2048"
            :shadow-mapsize-height="2048"
            :shadow-bias="-0.001"
            :shadow-camera-near="0.1"
            :shadow-camera-far="7"
            :shadow-camera-left="-2"
            :shadow-camera-right="2"
            :shadow-camera-top="2"
            :shadow-camera-bottom="-2"
        />
        <TresDirectionalLight
            ref="dirLight"
            :position="[-2, 2, -0.6]"
            :intensity="0.05"
            :shadow-mapsize-width="2048"
            :shadow-mapsize-height="2048"
            :shadow-bias="-0.001"
            :shadow-camera-near="0.1"
            :shadow-camera-far="7"
            :shadow-camera-left="-2"
            :shadow-camera-right="2"
            :shadow-camera-top="2"
            :shadow-camera-bottom="-2"
        />

        <Levioso :speed="4">
            <SceneModelHead />
        </Levioso>
    </TresCanvas>
</template>
