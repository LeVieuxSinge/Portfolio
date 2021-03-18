<template>
  <main>
    <div class="frame">
      <div class="frame__title-wrap">
        <h1 class="frame__title">WebGL Sticky Image Effect</h1>
        <p class="frame__tagline">
          Based on <a href="http://ultranoir.com">Ultranoir's website</a>
        </p>
      </div>
      <div class="frame__links">
        <a href="https://tympanus.net/Development/CrossroadsSlideshow/">Previous demo</a>
        <a href="https://tympanus.net/codrops/?p=39980">Article</a>
        <a href="https://github.com/Anemolo/StickyImageEffect">GitHub</a>
      </div>
      <p class="frame__tip">Click &amp; drag</p>
    </div>
    <div class="content" id="app">
      <StickyImageShowcase :slides="items" />
    </div>
  </main>
</template>

<script>
// import Showcase from '~/components/StickyImage/Showcase.vue';
import image1 from "~/assets/images/back.png";
import image2 from "~/assets/images/bottom.png";
import image3 from "~/assets/images/front.png";
import image4 from "~/assets/images/head_sculpt.png";
import image5 from "~/assets/images/top.png";
export default {

  data: () => ({
    items: [{
        image: image1, // target environment
        title: "Segovia",
        meta: "Spain / Castile and León"
      },
      {
        image: image2, // target environment
        title: "Barcelona",
        meta: "Spain / Catalonia"
      },
      {
        image: image3, // target environment
        title: "Málaga",
        meta: "Spain / Andalusia"
      },
      {
        image: image4, // target environment
        title: "Pamplona",
        meta: "Spain / Navarre"
      },
      {
        image: image5, // target environment
        title: "Bilbao",
        meta: "Spain / Biscay"
      }
    ],
  }),

  beforeMount() {
    // Create showcase if doesn't exist
  },

  mounted() {
    // Mount showcase to container/canvas
    // Already exists?
    var target = {
      x: 10,
      y: 20,
    };
    var target2 = {
      x: 10,
      y: 20,
    };
    var tml = this.$anime.timeline({
      update: (anim) => {
        // console.log(anim.animations[0].currentValue);
      },
    });

    tml.add({
      targets: target,
      x: 50,
      y: 80,
      easing: 'spring(1, 500, 50, 2)',
    }, 0);
    tml.add({
      targets: target2,
      x: 100,
      y: 60,
      easing: 'spring(1, 500, 50, 2)',
    }, 0);

    tml.play();
  },

  beforeDestroy() {
    // Unmount showcase
    // Already destroyed ?
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #131319;
}

canvas {
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

a {
  text-decoration: none;
  color: var(--color-link);
  outline: none;
}

a:hover,
a:focus {
  color: var(--color-link-hover);
  outline: none;
}

.frame {
  padding: 3rem 5vw;
  text-align: center;
  position: relative;
  z-index: 1000;
}

.frame__title {
  font-size: 1rem;
  margin: 0 0 1rem;
  font-weight: normal;
}

.frame__links {
  display: inline;
}

.frame__links a:not(:last-child),
.frame__demos a:not(:last-child) {
  margin-right: 1rem;
}

.frame__demos {
  margin: 1rem 0;
}

.frame__demo--current,
.frame__demo--current:hover {
  color: var(--color-text);
}

.content {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 13rem);
  position: relative;
  justify-content: flex-start;
  align-items: center;
}

@media screen and (min-width: 53em) {
  .frame {
    position: fixed;
    text-align: left;
    z-index: 10000;
    top: 0;
    left: 0;
    display: grid;
    align-content: space-between;
    width: 100%;
    max-width: none;
    height: 100vh;
    padding: 2rem;
    pointer-events: none;
    grid-template-columns: 75% 25%;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "title links"
      "... ..."
      "tip ...";
  }

  .frame__title-wrap {
    grid-area: title;
    display: flex;
  }

  .frame__title {
    margin: 0;
  }

  .frame__tagline {
    position: relative;
    margin: 0;
    padding: 0 0 0 1rem;
  }

  .frame__tagline::before {
    content: '-------------';
    letter-spacing: -0.15rem;
    margin: 0 1rem 0 0;
  }

  .frame__tip {
    grid-area: tip;
    margin: 0;
  }

  .frame__demos {
    margin: 0;
    grid-area: demos;
    justify-self: end;
  }

  .frame__links {
    grid-area: links;
    padding: 0;
    justify-self: end;
  }

  .frame a {
    pointer-events: auto;
  }

  .content {
    height: 100vh;
    justify-content: center;
  }

  .cursor {
    display: block;
  }
}
</style>
