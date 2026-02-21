<template>
  <div class="slides" :class="{'scrolling' : scrolling}">
    <slot></slot>
  </div>
</template>

<script>
export default {

  props: {
    slides: Array,
  },

  data: () => ({
    scrolling: false,
  }),

  mounted() {
    this.createEvents();
  },

  beforeDestroy() {
    this.destroyEvents();
  },

  methods: {
    createEvents() {
      this.$events.bind('onMove', this.onMove.bind(this));
      this.$events.bind('appear', this.appear.bind(this));
      this.$events.bind('disperse', this.disperse.bind(this));
    },
    destroyEvents() {
      this.$events.unbind('onMove', this.onMove.bind(this));
      this.$events.unbind('appear', this.appear.bind(this));
      this.$events.unbind('disperse', this.disperse.bind(this));
    },
    onMove({
      index
    }) {
      this.$el.style.transform = `translateY(${(index * 100) / this.slides.length}%)`;
    },
    appear() {
      this.scrolling = true;
    },
    disperse() {
      this.scrolling = false;
    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.slides {
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  padding: 0 10vw;
  width: 100%;
  max-width: 100%;
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently */
}

.scrolling>.slide {
  transform: translateY(-50%);
  opacity: 1;
}

</style>