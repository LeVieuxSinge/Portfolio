<template>
  <div v-if="show" class="loading" :class="{'loading-invert' : invert}">

    <!-- LOADER -->
    <section class="loader">
      <logo class="loader-logo" :show="showLogo" :invert="invert" />
      <div class="loader-progress">{{ progress }}</div>
    </section>

  </div>
</template>

<!-- JAVASCRIPT -->
<script>
import { animate } from '~/node_modules/popmotion/dist/popmotion';
import Logo from '~/components/Logo.vue';
export default {

  components: {
    Logo,
  },

  data: () => ({
    show: true,
    showLogo: false,
    invert: false,
    DOM: {
      loading: null,
      progress: null,
    },
    progress: 0,
    progressTween: null,
    assetsLoaded: false,
  }),

  mounted() {
    this.createEvents();
    this.getDOMElements();
    this.enter();
    this.$nextTick(() => {
      // Load assets
      this.$assets.add('GLTF', 'Landing', '/models/Landing_Scene.glb');
      this.$assets.add('GLTF', 'About', '/models/About_Scene.glb');
      this.$assets.onProgress = (progress) => {
        // Reset progress animation
        if (this.progressTween) {
          this.progressTween.stop();
          this.progressTween = null;
        }

        // New progress animation
        this.progressTween = animate({
          from: this.progress,
          to: progress,
          duration: 1000,
          onUpdate: value => {
            this.progress = Math.round(value);
            this.assetsLoaded && value === 100 ? this.leave() : null;
          },
        });

      };
      this.$assets.load().then(() => {
        this.assetsLoaded = true;
      });

    });
  },

  beforeDestroy() {
    this.destroyEvents();
  },

  methods: {
    createEvents() {},
    destroyEvents() {},
    getDOMElements() {
      this.DOM.loading = this.$el;
      this.DOM.progress = this.$el.querySelector('.loader-progress');
    },
    enter() {
      this.show = true;
    },
    leave() {
      this.DOM.progress.classList.add('loader-progress-hide');
      this.showLogo = true;
      setTimeout(() => {
        // this.invert = true;
        // setTimeout(() => {
          this.showLogo = false;
          setTimeout(() => {
            this.$store.commit('setLoading', false);
            this.$events.call('onLoadingDone');
            setTimeout(() => {
              // Fade out
              animate({
                from: 1,
                to: 0,
                duration: 500,
                onUpdate: (value) => {
                  this.DOM.loading.style.opacity = value;
                },
                onComplete: () => {
                  this.show = false;
                },
              });
            }, 100);
          }, 500);
        // }, 1000);
      }, 1000);
    },
  },
}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.loading {
  z-index: 1000;
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color_dark;
  @include transition(background-color 300ms);
}

.loading-invert {
  background-color: $color_white;
}

.loader {
  position: absolute;
  width: 100%;
  height: 100%;
}

.loader-logo {
  position: absolute;
  left: 50%;
  top: 50%;
  @include transform(translate(-50%, -50%));

  height: 60px;
  width: auto;
}

.loader-progress {
  position: absolute;
  left: 50%;
  top: 50%;
  @include transform(translate(-50%, -50%));

  color: $color_white;
  opacity: 0.5;
  font-family: $font_family_lato;
  font-weight: 300;
  font-size: 0.8rem;
  @include transition(opacity 300ms);
}

.loader-progress-hide {
  opacity: 0;
}

</style>