<template>
  <div v-if="!$store.state.loading" id="framework">

    <!-- NOISE -->
    <div class="noise"></div>

    <!-- CURSOR -->
    <layout-cursor />

    <!-- NAVIGATION : DESKTOP -->
    <section class="navigation --container--fluid">

      <!-- HEADER -->
      <div class="navigation-header">

        <!-- LOGO -->
        <nuxt-link class="navigation-home" to="/" @mouseenter.native="onCursorEnter" @mouseleave.native="onCursorLeave">
          <logo class="navigation-logo" :show="showLogo" :invert="$store.state.layout.invert" />
        </nuxt-link>

        <!-- OPTIONS -->
        <div class="navigation-options">

          <!-- TABS -->
          <div v-for="(option, index) in options" :key="index" class="transition-language" @mouseenter="onCursorEnter" @mouseleave="onCursorLeave">
            <nuxt-link class="navigation-link" :class="{'navigation-link-invert' : $store.state.layout.invert}" :to="option.link">{{ $store.state.lang === 'eng' ? option.eng : option.fr }}</nuxt-link>
          </div>

          <!-- LANGUAGE -->
          <div class="transition-language">
            <div class="navigation-language" :class="{'navigation-language-invert' : $store.state.layout.invert}" @click="changeLanguage" @mouseenter="onCursorEnter" @mouseleave="onCursorLeave">{{ $store.state.lang === 'eng' ? 'fr' : 'eng' }}</div>
          </div>

        </div>

      </div>

    </section>

    <!-- CONTENT -->
    <Nuxt />

  </div>
</template>

<!-- JAVASCRIPT -->
<script>
import LayoutCursor from '~/components/Layout/Cursor.vue';
import Logo from '~/components/Logo.vue';
export default {

  components: { 
    LayoutCursor,
    Logo,
  },

  data: () => ({
    showLogo: false,
    options: [
      // {
      //   eng: 'Projects',
      //   fr: 'Projets',
      //   link: '/projects',
      // },
      {
        eng: 'About',
        fr: 'À Propos',
        link: '/about',
      },
    ],
  }),

  mounted() {
    this.createEvents();
  },

  destroyed() {
    this.destroyEvents();
  },

  methods: {
    createEvents() {
      this.$events.bind('onLoadingDone', this.enter.bind(this));
    },
    destroyEvents() {
      this.$events.unbind('onLoadingDone', this.enter.bind(this));
    },
    enter() {
      setTimeout(() => {
        this.showLogo = true;
      }, 500);
    },
    changeLanguage() {

      // Fade out
      this.$anime({
        targets: '.transition-language',
        opacity: 0,
        duration: 200,
        delay: this.$anime.stagger(10),
        easing: 'easeInOutQuad',
        complete: () => {
          this.$store.state.lang === 'eng' ? this.$store.commit('setLanguage', 'fr') : this.$store.commit('setLanguage', 'eng');
          // Fade In
          this.$anime({
            targets: '.transition-language',
            opacity: 1,
            duration: 200,
            delay: this.$anime.stagger(10),
            easing: 'easeInOutQuad',
          });
        },
      });

    },
    onCursorEnter() {

      // Set invert according to layout invert
      if (this.$store.state.layout.invert) {
        this.$store.commit('setCursorInvert', true);
      } else {
        this.$store.commit('setCursorInvert', false);
      }

    },
    onCursorLeave() {

      // Set invert according to layout invert
      if (this.$store.state.layout.invert) {
        this.$store.commit('setCursorInvert', true);
      } else {
        this.$store.commit('setCursorInvert', false);
      }

    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

html {
  background-color: $color_dark;
  scroll-behavior: smooth;
  overflow: hidden;
}

body {
  overflow: overlay;
}

#page {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}


// Custom Scrollbar
::-webkit-scrollbar {
  // position: absolute;
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: rgba($color: $color_white, $alpha: 0.5);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba($color: $color_white, $alpha: 1.0);
}

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

#framework {
  position: relative;
  display: flex;
  min-height: 100vh;
  max-width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.noise {
  position: fixed;
  z-index: 969;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;

  &::before {
    content: "";
    position: fixed;
    top: -10rem;
    left: -10rem;
    width: calc(100% + 20rem);
    height: calc(100% + 20rem);
    opacity: 0.05;
    filter: invert(100%);
    background: url('/textures/noise.png');
    animation: noise 1s steps(2) infinite;
  }

  &::after {
    content: "";
    position: fixed;
    top: -10rem;
    left: -10rem;
    width: calc(100% + 20rem);
    height: calc(100% + 20rem);
    opacity: 0.03;
    background: url('/textures/noise.png');
    animation: noise 1s steps(2) infinite;
  }

}

// .noise-invert {
//   filter: invert(0%);
// }

@-webkit-keyframes noise {
  to {
    transform: translate3d(-7rem, 0, 0)
  }
}

@keyframes noise {
  0% {
    transform: translate3d(0, 9rem, 0)
  }

  10% {
    transform: translate3d(-1rem, -4rem, 0)
  }

  20% {
    transform: translate3d(-8rem, 2rem, 0)
  }

  30% {
    transform: translate3d(9rem, -9rem, 0)
  }

  40% {
    transform: translate3d(-2rem, 7rem, 0)
  }

  50% {
    transform: translate3d(-9rem, -4rem, 0)
  }

  60% {
    transform: translate3d(2rem, 6rem, 0)
  }

  70% {
    transform: translate3d(7rem, -8rem, 0)
  }

  80% {
    transform: translate3d(-9rem, 1rem, 0)
  }

  90% {
    transform: translate3d(6rem, -5rem, 0)
  }

  to {
    transform: translate3d(-7rem, 0, 0)
  }
}

.navigation {
  position: fixed;
  z-index: 69;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  pointer-events: none;
}

.navigation-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;

  @include for-sm {
    padding: 50px 0;
  }

  @include for-md {
    padding: 50px 0;
  }

  @include for-lg {
    padding: 50px 0;
  }
}

.navigation-home {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  pointer-events: all;
  padding: 5px;
  margin: 0 10px;

  @include for-hover {
    &:hover {
      cursor: pointer;
    }
  }

}

.navigation-logo {
  height: 30px;
  width: auto;
}

.navigation-options {
  display: flex;
  align-items: baseline;
}

.navigation-link {
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  padding: 5px;
  margin-left: 10px;
  pointer-events: all;
  text-decoration: none;
  transition: color 300ms;

  @include for-hover {
    &:hover {
      cursor: pointer;
    }
  }

}

.navigation-link-invert {
  color: $color_dark;
}

.navigation-language {
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 900;
  font-size: 0.7rem;
  text-transform: uppercase;
  padding: 5px;
  margin: 0 10px;
  transition: opacity 300ms, color 300ms;
  pointer-events: all;

  @include for-hover {
    opacity: 0.5;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

}

.navigation-language-invert {
  color: $color_dark;
}

</style>