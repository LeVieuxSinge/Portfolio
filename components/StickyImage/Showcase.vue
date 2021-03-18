<template>
  <div id="showcase">
      <!-- Canvas -->
      <div class="slides">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import { Showcase } from '~/plugins/Custom/Showcase.js';
export default {

    props: {
      slides: Array,
    },

    data: () => ({
      showcase: null,
    }),

    computed: {
      
    },

    mounted() {
      // Create showcase
      if (!this.showcase) {
        this.showcase = new Showcase({
          targetEnvironments: this.slides,
        });
        // Set internal events
        this.showcase.onActiveIndexChange = (activeIndex) => {};
        this.showcase.onIndexChange = (index) => {};
        this.showcase.onZoomOutStart = ({
          activeIndex
        }) => {};
        this.showcase.onZoomOutFinish = ({
          activeIndex
        }) => {};
        this.showcase.onFullScreenStart = ({
          activeIndex
        }) => {};
        this.showcase.onFullScreenFinish = ({
          activeIndex
        }) => {};
        // Mount
        this.showcase.mount(document.getElementById('showcase'));
        // Render
        this.showcase.render();
        // Events
        window.addEventListener('resize', () => {
          this.showcase.onResize();
        });
        window.addEventListener('mousemove', (e) => {
          this.showcase.onMouseMove(e);
        });
        console.log(this.showcase);
      }
    },

    methods: {
      onActiveIndexChange() {
        // Call events
        this.$events.call('onActiveIndexChange');
      },
      onIndexChange() {
        // Call events
        this.$events.call('onIndexChange');
      },
      onZoomStart() {
        // Call events
        this.$events.call('onZoomStart');
      },
      onZoomFinish() {
        // Call events
        this.$events.call('onZoomFinish');
      },
      onFullScreenStart() {
        // Call events
        this.$events.call('onFullScreenStart');
      },
      onFullScreenFinish() {
        // Call events
        this.$events.call('onFullScreenFinish');
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