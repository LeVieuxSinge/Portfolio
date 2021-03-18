<template>
  <div class="cursor">
    <div class="cursor__inner cursor__inner--circle"></div>
    <div class="cursor__inner cursor__inner--dot"></div>
  </div>
</template>

<script>
export default {

    props: {

    },

    data: () => ({
      body: null,
        DOM: {
            el: null,
            dot: null,
            circle: null,
        },
        bounds: {
            dot: null,
            circle: null,
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
        },
        lastScale: 1,
    }),

    mounted() {
        // Define data
        this.body = document.body;
        this.DOM.el = document.querySelector(".cursor");
        this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
        this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
        this.bounds.dot = this.DOM.dot.getBoundingClientRect();
        this.bounds.circle = this.DOM.circle.getBoundingClientRect();

        // Call events
        this.initEvents();

        // Render
        requestAnimationFrame(() => this.render());
    },

    methods: {
      initEvents() {
        window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
      },
      getMousePos(e) {
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
          posx = e.clientX + this.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + this.body.scrollTop + document.documentElement.scrollTop;
        }
        return {
          x: posx,
          y: posy
        }
      },
      lerp(a, b, n) {
        (1 - n) * a + n * b;
      },
      render() {
        this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width / 2, 1);
        this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height / 2, 1);
        this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width / 2, 0.15);
        this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height / 2, 0.15);
        this.lastScale = lerp(this.lastScale, this.scale, 0.15);
        this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
        this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
        requestAnimationFrame(() => this.render());
      },
      enter() {
        this.scale = 1.5;
        this.DOM.dot.style.display = 'none';
      },
      leave() {
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
}

.cursor__inner {
  z-index: 9999;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  border-radius: 50%;
}

.cursor__inner--dot {
  width: 8px;
  height: 8px;
  background: #fff;
}

.cursor__inner--circle {
  width: 40px;
  height: 40px;
  border: 1px solid #fff;
}

</style>