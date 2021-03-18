<template>
  <div class="slide" :class="slideClass">
    <div class="slide-meta">
      Meta Text
    </div>
    <div class="slite-title">
      Title
    </div>
    <nuxt-link class="slide-more" to="/">
      Read More
    </nuxt-link>
  </div>
</template>

<script>
export default {

    props: {
      index: Number,
      showMeta: Boolean,
    },

    data: () => ({
      
    }),

    computed: {
      slideClass() {

      },
    },

    mounted() {

      // For state
      console.log(this.$store.state.showcase.currentIndex);
      // For mutations
      this.$store.commit('showcase/setCurrentIndex', 1);

      // Define data
      this.$el.classList.add(this.index !== 0 ? 'next' : 'show-meta');

      // Bind actions to events
      this.$events.bind('onActiveIndexChange', () => {
        this.onActiveIndexChange();
      });
    },

    methods: {
      onActiveIndexChange() {
        if (this.$store.state.showcase.currentIndex === this.index) {
          this.$el.classList.remove("next");
          this.$el.classList.remove("prev");
        } else {
          if (this.$store.state.showcase.currentIndex > this.index) {
            this.$el.classList.remove("next");
            this.$el.classList.add("prev");
          } else {
            this.$el.classList.add("next");
            this.$el.classList.remove("prev");
          }
        }
      },
      disperse(activeIndex) {
        //this.currentIdx = activeIndex;
        this.slides[this.currentIdx].classList.add("show-meta");
        this.container.classList.remove("scrolling");
        for (let index = 0; index < this.items.length; index++) {
          if (index > activeIndex) {
            this.slides[index].classList.add("next");
            this.slides[index].classList.remove("prev");
          } else if (index < activeIndex) {
            this.slides[index].classList.remove("next");
            this.slides[index].classList.add("prev");
          } else {
            this.slides[index].classList.remove("next");
            this.slides[index].classList.remove("prev");
          }
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