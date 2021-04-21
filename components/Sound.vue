<template>
  <div class="sound-frame" :style="'width: ' + width + '; height : ' + height + ';'">
    <div class="sound-icon">
      <figure class="sound-line-1" :class="{'sound-line-invert' : invert}"></figure>
      <figure class="sound-line-2" :class="{'sound-line-invert' : invert}"></figure>
      <figure class="sound-line-3" :class="{'sound-line-invert' : invert}"></figure>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    width: String,
    height: String,
    invert: Boolean,
  },

  data: () => ({
    
  }),
  
  mounted() {
    this.createEvents();
  },

  beforeDestroy() {
    this.destroyEvents();
  },

  methods: {
    createEvents() {
      
    },
    destroyEvents() {
      
    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.sound {

  &-frame {

  }
  
  &-icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &-line {
    &-1 {
      height: 50%;
      width: 1px;
      background-color: $color_white;
    }

    &-2 {
      height: 100%;
      width: 1px;
      background-color: $color_white;
    }

    &-3 {
      height: 70%;
      width: 1px;
      background-color: $color_white;
    }

    &-invert {
      background-color: $color_dark;
    }
  }
}

</style>