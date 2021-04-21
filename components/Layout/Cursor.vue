<template>
  <div class="cursor" :class="{'cursor-invert' : $store.state.cursor.invert}">
    <div class="cursor-inner cursor-circle"></div>
    <div class="cursor-inner cursor-dot"></div>
    <div class="cursor-inner cursor-text">
      <!-- <div class="cursor-text-wrapper">{{ text }}</div> -->
    </div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime';
export default {

  data: () => ({
    text: '',
    DOM: {
      dot: null,
      circle: null,
      text: null,
    },
    bounds: {
      dot: null,
      circle: null,
      text: null,
    },
    scale: 1,
    opacity: 1,
    mousePos: {
      x: 0,
      y: 0,
    },
    lastMousePos: {
      dot: {
        x: 0,
        y: 0,
      },
      circle: {
        x: 0,
        y: 0,
      },
      text: {
        x: 0,
        y: 0,
      },
    },
    lastScale: 1,
  }),

  watch: {
    '$store.state.layout.invert': function() {
      this.$store.commit('setCursorInvert', this.$store.state.layout.invert);
    },
    '$store.state.cursor.text': function() {
      this.text = this.$store.state.cursor.text;
    },
  },

  mounted() {

    // Define data
    this.DOM.dot = this.$el.querySelector('.cursor-dot');
    this.DOM.circle = this.$el.querySelector('.cursor-circle');
    this.DOM.text = this.$el.querySelector('.cursor-text');
    this.bounds.dot = this.DOM.dot.getBoundingClientRect();
    this.bounds.circle = this.DOM.circle.getBoundingClientRect();
    this.bounds.text = this.DOM.text.getBoundingClientRect();

    // Add events
    window.addEventListener('mousemove', this.onMousemove, true);
    window.addEventListener('mousedown', this.onMousedown, true);
    window.addEventListener('mouseup', this.onMouseup, true);

    // Render
    requestAnimationFrame(() => this.render());

  },

  beforeDestroy() {
    // Remove events
    window.removeEventListener('mousemove', this.onMousemove, true);
    window.removeEventListener('mousedown', this.onMousedown, true);
    window.removeEventListener('mouseup', this.onMouseup, true);
  },

  methods: {
    lerp(value1, value2, amount) {
      amount = amount < 0 ? 0 : amount;
      amount = amount > 1 ? 1 : amount;
      return value1 + (value2 - value1) * amount;
    },
    render() {
      this.bounds.text = this.DOM.text.getBoundingClientRect();
      this.lastMousePos.dot.x = this.lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width / 2, 1);
      this.lastMousePos.dot.y = this.lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height / 2, 1);
      this.lastMousePos.circle.x = this.lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width / 2, 0.15);
      this.lastMousePos.circle.y = this.lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height / 2, 0.15);
      this.lastMousePos.text.x = this.lerp(this.lastMousePos.text.x, this.mousePos.x - this.bounds.text.width / 2, 0.25);
      this.lastMousePos.text.y = this.lerp(this.lastMousePos.text.y, this.mousePos.y - this.bounds.text.height / 2, 0.25);
      this.lastScale = this.lerp(this.lastScale, this.scale, 0.15);
      this.DOM.dot.style.transform = `translateX(${this.lastMousePos.dot.x}px) translateY(${this.lastMousePos.dot.y}px)`;
      this.DOM.circle.style.transform = `translateX(${this.lastMousePos.circle.x}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
      this.DOM.text.style.transform = `translateX(${this.lastMousePos.text.x}px) translateY(${this.lastMousePos.text.y}px)`;
      requestAnimationFrame(() => this.render());
    },
    onMousemove(ev) {
      let posx = 0;
      let posy = 0;
      if (!ev) ev = window.event;
      if (ev.pageX || ev.pageY) {
        posx = ev.pageX;
        posy = ev.pageY;
      } else if (ev.clientX || ev.clientY) {
        posx = ev.clientX + this.body.scrollLeft + document.documentElement.scrollLeft;
        posy = ev.clientY + this.body.scrollTop + document.documentElement.scrollTop;
      }
      this.mousePos = {
        x: posx,
        y: posy
      }
    },
    onMousedown() {
      this.scale = 1.5;
      this.DOM.dot.style.display = 'none';
    },
    onMouseup() {
      this.scale = 1;
      this.DOM.dot.style.display = '';
    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.cursor {
  display: none;
  position: fixed;
  z-index: 1069;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;

  @include for-hover {
    display: block;
  }

}

.cursor-invert {
  .cursor-dot {
    background-color: $color_dark;
  }
  .cursor-circle {
    border: 1px solid $color_dark;
  }
  .cursor-text {
    color: $color_dark;
  }
}

.cursor-inner {
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  border-radius: 50%;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: $color_white;
  transition: background-color 300ms;
}

.cursor-circle {
  width: 40px;
  height: 40px;
  border: 1px solid $color_white;
  transition: border 300ms;
}

.cursor-text {
  color: $color_white;
  font-family: $font_family_lato;
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 300;
  transition: color 300ms;
}

.cursor-text-wrapper {
  // position: absolute;
  // left: 50%;
  // transform: translateX(-50%);
  transform: translateY(40px);
}

</style>