<template>
    <div class="smooth-scroller">
        <slot></slot>
    </div>
</template>

<!-- JAVASCRIPT -->
<script>
import { animate } from '~/node_modules/popmotion/dist/popmotion';
export default {

  data: () => ({
    direction: 0,
    velocity: 0,
    speed: 5,
    maxVelocity: 120,
    progress: 0,
    animation: null,
    mobile: {
      velocity: null,
      currentPosition: null,
      lastPosition: null,
      lastDirection: 0,
    },
  }),

  mounted() {
    // Initialize values
    this.resizeUpdate();

    // Add event listeners
    window.addEventListener('resize', this.onResize, true);
    window.addEventListener('mousewheel', this.onMousewheel, true);
    window.addEventListener('touchstart', this.onTouchstart, true);
    window.addEventListener('touchmove', this.onTouchmove, true);
  },

  destroyed() {
    // Remove event listeners
    window.removeEventListener('resize', this.onResize, true);
    window.removeEventListener('mousewheel', this.onMousewheel, true);
    window.removeEventListener('touchstart', this.onTouchstart, true);
    window.removeEventListener('touchmove', this.onTouchmove, true);
  },

  methods: {
    map(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },
    resizeUpdate() {

      // Set scroll speed
      if (this.$breakpoints.mobile) {
        this.speed = 3;
        this.maxVelocity = 20;
      } else {
        this.speed = 5;
        this.maxVelocity = 100;
      }

    },
    onMousewheel(ev) {
      // Calculate direction
      ev.wheelDeltaY > 0 ? this.direction = -1 : this.direction = 1;
      this.update();
    },
    onTouchstart(ev) {
      // Initate touch position
      this.mobile.currentPosition = ev.touches[0].clientY;
      // Reset last position
      this.mobile.lastPosition = ev.touches[0].clientY;
    },
    onTouchmove(ev) {

      // Calculate direction when last position is recorded
      if (this.mobile.lastPosition) {
        this.mobile.currentPosition > this.mobile.lastPosition ? this.direction = -1 : this.direction = 1;

        // Velocity
        this.mobile.velocity = Math.abs(this.mobile.currentPosition - this.mobile.lastPosition);

        // Stop velocity if direction changes while holding to limit increase of velocity
        if (this.direction !== this.mobile.lastDirection) {
          this.velocity = 0;
          this.mobile.lastDirection = this.direction;
        }

        this.update();
      }

      // Update last position
      this.mobile.lastPosition = this.mobile.currentPosition;

      // Update current position
      this.mobile.currentPosition = ev.touches[0].clientY;

    },
    update() {

      // Add velocity
      if (this.$breakpoints.mobile) {
        this.velocity = Math.min(this.velocity + this.mobile.velocity, this.maxVelocity);
      } else {
        this.velocity = Math.min(this.velocity + this.speed, this.maxVelocity);
      }

      // Reset scroll animation
      if (this.animation) {
        this.animation.stop();
        this.animation = null;
      }

      // Animate scroll progress
      this.animation = animate({
        from: this.velocity,
        to: 0,
        type: "spring",
        stiffness: 250,
        velocity: 0,
        damping: 70,
        mass: 3,
        onUpdate: value => {
          this.velocity = value;
          this.$el.scrollTop += this.velocity * this.direction;
          this.progress = this.map(this.$el.scrollTop, 0, (this.$el.scrollHeight - this.$el.clientHeight), 0, 100);
          this.$emit('update', this.progress);
        },
      });

    },
  },

}
</script>

<!-- UNSCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.smooth-scroller {
    height: 100%;
    width: 100%;
    overflow: hidden;
}

</style>