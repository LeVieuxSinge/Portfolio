<template>
  <svg class="logo" :class="{'logo-invert' : invert}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 91.71">
    <g transform="translate(-650 -338)">
      <path class="logo-1" d="M628.324,429.71h19.231L705.247,338H686.017" transform="translate(21.676)" />
      <path class="logo-2" d="M748.077,411.83H728.846L700,358.788h19.231" transform="translate(-30.769 -12.633)"/>
      <path class="logo-3" d="M813.462,399.2h19.231l-13.461-24.322L842.308,338H823.077L800,374.781" transform="translate(-92.308)"/>
    </g>
  </svg>
</template>

<script>
import { animate } from '~/node_modules/popmotion/dist/popmotion';
export default {

  props: {
    show: Boolean,
    invert: Boolean,
  },

  data: () => ({
    svg: {
      path1: null,
      path2: null,
      path3: null,
    },
  }),

  mounted() {
    this.getDOMElements();
  },

  watch: {
    show: function (value) {
      // Show logo
      if (value) {

        // Animate path 1
        animate({
          from: 100,
          to: 0,
          type: 'spring',
          stiffness: 800,
          damping: 100,
          mass: 2,
          restDelta: 0.01,
          onUpdate: value => {
            this.svg.path1.style.clipPath = `inset(${value}% 0 0 0)`;
          },
        });

        // Animate path 2
        animate({
          from: 100,
          to: 0,
          type: 'spring',
          stiffness: 1000,
          damping: 100,
          mass: 1,
          restDelta: 0.01,
          onUpdate: value => {
            this.svg.path2.style.clipPath = `inset(0 0 ${value}% 0)`;
          },
        });

        // Animate path 3
        animate({
          from: 100,
          to: 0,
          type: 'spring',
          stiffness: 500,
          damping: 100,
          mass: 5,
          restDelta: 0.01,
          onUpdate: value => {
            this.svg.path3.style.clipPath = `inset(0 ${value}% 0 0)`;
          },
        });

      }

      // Hide logo
      else {

        // Animate path 1
        animate({
          from: 0,
          to: 100,
          stiffness: 800,
          damping: 100,
          mass: 2,
          restDelta: 0.01,
          onUpdate: value => {
            this.svg.path1.style.clipPath = `inset(0 0 ${value}% 0)`;
          },
        });

        // Animate path 2
        animate({
          from: 0,
          to: 100,
          stiffness: 1000,
          damping: 100,
          mass: 1,
          restDelta: 0.01,
          onUpdate: value => {
            this.svg.path2.style.clipPath = `inset(${value}% 0 0 0)`;
          },
        });

        // Animate path 3
        animate({
          from: 0,
          to: 100,
          stiffness: 500,
          damping: 100,
          mass: 5,
          restDelta: 0.01,
          onUpdate: value => {
            this.svg.path3.style.clipPath = `inset(0 0 0 ${value}%)`;
          },
        });

      }
    },
  },

  methods: {
    getDOMElements() {
      this.svg.path1 = this.$el.querySelector('.logo-1');
      this.svg.path2 = this.$el.querySelector('.logo-2');
      this.svg.path3 = this.$el.querySelector('.logo-3');
    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.logo {
    fill: $color_white;
    @include transition(fill 300ms);
}

.logo-1 {
  clip-path: inset(100% 0 0 0);
}

.logo-2 {
  clip-path: inset(0 0 100% 0);
}

.logo-3 {
  clip-path: inset(0 100% 0 0);
}

.logo-invert {
    fill: $color_dark;
}

</style>