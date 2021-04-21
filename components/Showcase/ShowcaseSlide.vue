<template>
  <div class="slide" :class="[{'show-meta' : showMeta}, {'prev' : prev}, {'next' : next}]">
    <slot></slot>
  </div>
</template>

<script>
export default {

  props: {
    index: Number,
  },

  data: () => ({
    currentIndex: 0,
    showMeta: false,
    prev: false,
    next: false,
  }),

  mounted() {

    this.createEvents();

    // Define data
    this.index !== 0 ? this.next = true : this.showMeta = true;

  },

  beforeDestroy() {
    this.destroyEvents();
  },

  methods: {
    createEvents() {
      this.$events.bind('onActiveIndexChange', this.onActiveIndexChange.bind(this));
      this.$events.bind('appear', this.appear.bind(this));
      this.$events.bind('disperse', this.disperse.bind(this));
    },
    destroyEvents() {
      this.$events.unbind('onActiveIndexChange', this.onActiveIndexChange.bind(this));
      this.$events.unbind('appear', this.appear.bind(this));
      this.$events.unbind('disperse', this.disperse.bind(this));
    },
    onActiveIndexChange({
      activeIndex
    }) {
      if (activeIndex === this.index) {
        this.next = false;
        this.prev = false;
      } else {
        if (activeIndex > this.index) {
          this.next = false;
          this.prev = true;
        } else {
          this.next = true;
          this.prev = false;
        }
      }
    },
    appear() {
      this.showMeta = false;
    },
    disperse({
      activeIndex
    }) {
      this.showMeta = true;
      if (this.index > activeIndex) {
        this.next = true;
        this.prev = false;
      } else if (this.index < activeIndex) {
        this.next = false;
        this.prev = true;
      } else {
        this.next = false;
        this.prev = false;
      }
    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.slide {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 33vh;
  color: #fff;
  transform: translateY(-50%);
  transition: transform 1300ms cubic-bezier(0.2, 1, 0.3, 1), opacity 500ms cubic-bezier(0.2, 1, 0.3, 1);
}

.slide-meta {
  margin: 0;
  font-size: 1.35rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slide-meta,
.slide-more {
  opacity: 0;
  transition: opacity 900ms cubic-bezier(0.2, 1, 0.3, 1);
}

.show-meta .slide-meta,
.show-meta .slide-more {
  opacity: 1;
  transition: opacity 1500ms 300ms cubic-bezier(0.2, 1, 0.3, 1);
}

.slide-more {
  border-bottom: 1px solid;
}

.slide-more:hover {
  border-bottom: 1px solid transparent;
}

.slide-title {
  font-size: 10vw;
  margin: 0;
  color: #fafafa;
  text-indent: -0.5vw;
  font-family: gibbs, sans-serif;
  font-weight: 900;
  transition: color 500ms cubic-bezier(0.2, 1, 0.3, 1);
}

.prev,
.next {
  opacity: 0;
}

.prev {
  transform: translateY(-85%);
}

.next {
  transform: translateY(-15%);
}

.prev .slide-title,
.next .slide-title {
  -webkit-text-stroke: 1.5px #fafafa;
  text-stroke: 1.5px #fafafa;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  color: transparent;
}

</style>