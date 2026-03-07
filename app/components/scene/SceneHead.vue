<script setup lang="ts">
const { onBeforeRender } = useLoop();

const refMesh = shallowRef(null);

onBeforeRender(({ delta }) => {
    const mesh = unref(refMesh);
    if (mesh && mesh.rotation) {
        mesh.rotation.x += delta;
        mesh.rotation.y += delta;
    }
});
</script>

<template>
    <TresPerspectiveCamera />
    <TresMesh ref="refMesh">
        <TresBoxGeometry />
        <TresMeshBasicMaterial color="red" />
    </TresMesh>
</template>
