<template>
  <div>
    <Nuxt />
    <div class="cursor">
      <div class="cursor__inner cursor__inner--circle"></div>
      <div class="cursor__inner cursor__inner--dot"></div>
    </div>
  </div>
</template>

<script>
// import '~/assets/js/StickImage/index.js';
export default {

  mounted() {
    console.log(this);
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

</style>
