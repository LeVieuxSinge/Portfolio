<template>
  <div id="page" class="project">
    <smooth-scroller @update="animate">
      <div class="project-wrapper">

        <!-- SECTION : GL -->
        <div class="gl --container--full" @mouseenter="$store.commit('setCursorInvert', false)" @mouseleave="$store.commit('setCursorInvert', true)">

          <!-- CANVAS -->

          <!-- SHOWCASE -->
          <video v-if="data.showcase" class="showcase" :src="data.showcase" autoplay loop muted></video>

          <!-- SCROLL -->
          <div class="scroll-arrow" :class="{'scroll-arrow-show' : scrollShow}">
            <!-- <div>Scroll</div> -->
            <i class="material-icons">expand_more</i>
          </div>

        </div>

        <!-- SECTION : MORE -->
        <div class="more --container--fluid">

            <!-- DETAILS -->
          <div class="details">

            <!-- OVERLINE -->
            <figure class="details-line"></figure>

            <!-- OVERVIEW -->
            <div class="details-overview">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Overview' : 'Résumé' }}
              </div>
            </div>

            <!-- SPECIFIC -->
            <div class="details-specific">

              <!-- INFORMATION -->
              <div class="details-information">

                <!-- NAME -->
                <div class="details-information-property">

                  <div class="details-information-title">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? 'Name' : 'Nom' }}
                    </div>
                  </div>
                  <div class="details-information-content">{{ data.name }}</div>

                </div>

                <!-- TOOL -->
                <div class="details-information-property">

                  <div class="details-information-title">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? 'Year' : 'Année' }}
                    </div>
                  </div>
                  <div class="details-information-content">{{ data.year }}</div>

                </div>

                <!-- TYPE -->
                <div class="details-information-property">

                  <div class="details-information-title">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? 'Type' : 'Type' }}
                    </div>
                  </div>
                  <div class="details-information-content">{{ data.type }}</div>

                </div>

                <!-- TOOL -->
                <div class="details-information-property">

                  <div class="details-information-title">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? 'Tool' : 'Outil' }}
                    </div>
                  </div>
                  <div class="details-information-content">{{ data.tool }}</div>

                </div>

              </div>

              <!-- DESCRIPTION -->
              <div class="details-description">

                <!-- LINK -->
                <div v-if="data.externalLink" class="details-description-link">
                  <div class="transition-language">
                    {{ $store.state.lang === 'eng' ? 'See more : ' : 'Voir plus : ' }}<a :href="data.externalLink">{{ $store.state.lang === 'eng' ? 'Link' : 'Lien' }}</a>
                  </div>
                </div>

                <!-- TEXT -->
                <div class="details-description-text">
                  <div class="transition-language">
                    {{ $store.state.lang === 'eng' ? data.description.eng : data.description.fr }}
                  </div>
                </div>
              
              </div>

            </div>

          </div>

          <!-- IMAGES -->
          <div class="images">

            <div v-for="(video, index) in data.videos" :key="video + index" class="images-video">
              <video :src="video" autoplay controls loop muted></video>
            </div>

            <div v-for="(image, index) in data.images" :key="image + index" class="images-image">
              <img :src="image">
            </div>

          </div>

        </div>

        <!-- SECTION : NEXT -->
        <div class="next --container--full">

          <!-- IMAGE -->
          <div class="next-image">
            <video :src="getNextProject().showcase" autoplay muted loop></video>
          </div>

          <!-- TEXT -->
          <nuxt-link class="next-text" :to="getNextProject().link" @mouseenter.native="$store.commit('setCursorInvert', false)" @mouseleave.native="$store.commit('setCursorInvert', true)">
            <div class="transition-language">
              {{ $store.state.lang === 'eng' ? 'Next' : 'Suivant' }}
            </div>
          </nuxt-link>

          <!-- OVERLAY -->
          <div class="next-overlay"></div>

        </div>

      </div>
    </smooth-scroller>
  </div>
</template>

<!-- JAVASCRIPT -->
<script>
import SmoothScroller from '~/components/Utils/SmoothScroller.vue';
export default {

  components: {
    SmoothScroller,
  },

  middleware({ store, redirect }) {
    // Invert layout
    store.commit('setInvert', false);
    store.commit('setCursorInvert', false);
  },

  props: {
    data: Object,
  },

  data: () => ({
    scrollShow: true,
    DOM: {
      more: null,
    },
  }),

  mounted() {
    // Set cursor text
    this.$store.commit('setCursorText', 'Scroll down');

    // Get DOM elements
    this.DOM.more = this.$el.querySelector('.more');
  },

  methods: {
    map(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },
    getNextProject() {
      if (this.data.index + 1 > this.$store.state.projects.length - 1) {
        return this.$store.state.projects[0];
      } else {
        return this.$store.state.projects[this.data.index + 1];
      }
    },
    animate(progress) {

      // Set cursor text
      if (progress === 0) {
        this.scrollShow = true;
        this.$store.commit('setCursorText', 'Scroll down');
      } else {
        this.scrollShow = false;
        this.$store.commit('setCursorText', '');
      }

      // Invert layout when in more section
      var bounds = this.DOM.more.getBoundingClientRect();
      if (bounds.top < 150 && bounds.bottom > (this.$el.clientHeight * 0.1)) {
        this.$store.commit('setInvert', true);
      } else {
        this.$store.commit('setInvert', false);
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

.project {
  background-color: $color_white;
}

.project-wrapper {
  display: flex;
  flex-flow: column;
}

.gl {
  background-color: $color_dark;
  padding: 0;
  height: 100vh;
}

.showcase {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scroll-arrow {
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 300;
  position: absolute;
  bottom: 5%;
  left: 50%;
  @include transform(translate(-50%, -50%));
  animation: scroll-arrow 2s infinite;
  opacity: 0;
  transition: opacity 300ms;

  display: flex;
  flex-flow: column;
  align-items: center;

  i {
    width: 25px;
    height: 25px;
  }
}

.scroll-arrow-show {
  opacity: 1;
}

@keyframes scroll-arrow {
  0% {
    bottom: 5%
  }

  25% {
    bottom: 4%
  }

  50% {
    bottom: 5%
  }

  25% {
    bottom: 6%
  }

  100% {
    bottom: 5%
  }
}

.more {
  display: flex;
  flex-flow: column;
  align-items: center;

  @include for-xs {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @include for-sm {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @include for-md {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @include for-lg {
    margin-top: 50px;
    margin-bottom: 50px;
  }

}

.details {
  width: 100%;
  margin-bottom: 30px;

  @include for-sm {
    margin-bottom: 50px;
  }

  @include for-md {
    margin-bottom: 50px;
  }

  @include for-lg {
    margin-bottom: 50px;
  }

}

.details-line {
  width: 100%;
  height: 1px;
  background-color: $color_dark;
}

.details-overview {
  margin: 10px 0;
  text-align: left;
  color: $color_dark;
  font-family: $font_family_anton;
  font-size: 2rem;

  @include for-sm {
    margin: 20px 0;
  }

  @include for-md {
    margin: 20px 0;
  }

  @include for-lg {
    margin: 20px 0;
  }

}

.details-specific {
  display: flex;
  flex-flow: row wrap;
}

.details-information {
  display: flex;
  flex-flow: column;
  flex: 1 1 100%;
  margin: 10px 0;

  @include for-sm {
    flex: 1 1 30%;
  }

  @include for-md {
    flex: 1 1 30%;
  }

  @include for-lg {
    flex: 1 1 30%;
    margin: 0 10px 0 0;
  }

}

.details-information-property {
  display: flex;
}

.details-information-title {
  margin-right: 10px;
  color: $color_dark;
  font-size: 1rem;
  font-family: $font_family_lato;
  font-weight: 900;
  min-width: 50px;
}

.details-information-content {
  color: $color_dark;
  font-size: 1rem;
  font-family: $font_family_lato;
  font-weight: 300;
  width: 100%;
}

.details-description {
  flex: 1 1 100%;
  margin: 10px 0;

  @include for-sm {
    flex: 1 0 60%;
    margin: 0 0 0 10px;
  }

  @include for-md {
    flex: 1 0 60%;
    margin: 0 0 0 10px;
  }

  @include for-lg {
    flex: 1 0 60%;
    margin: 0 0 0 10px;
  }

}

.details-description-link {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 10px;

  a {
    color: $color_primary;
    text-decoration: none;
  }
}

.details-description-text {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 300;
  font-size: 1rem;
  text-align: justify;
}

.images {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 30px;

  @include for-sm {
    margin-bottom: 50px;
  }

  @include for-md {
    margin-bottom: 50px;
  }

  @include for-lg {
    margin-bottom: 50px;
  }

}

.images-video {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  max-height: 600px;

  video {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @include for-sm {
    height: 100vh;
    max-height: 400px;

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  @include for-md {
    height: 100vh;
    max-height: 600px;

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

}

.images-image {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
  max-height: 600px;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @include for-sm {
    height: 100vh;
    max-height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  @include for-md {
    height: 100vh;
    max-height: 600px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

}

.next {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 2px rgba($color: $color_dark, $alpha: 0.2);

  @include for-xs {
    height: 200px;
  }

  @include for-sm {
    height: 250px;
  }

  @include for-md {
    height: 300px;
  }

  @include for-lg {
    height: 350px;
  }

}

.next-image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  video {
    opacity: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

}

.next-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.4;
  background-color: $color_dark;
  transition: opacity 300ms;
}

.next-text {
  z-index: 1;
  color: transparent;
  -webkit-text-stroke-color: $color_white;
  font-family: $font_family_lato;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 4rem;
  line-height: 100%;
  text-decoration: none;
  @include transition(all 300ms);

  @include for-xs {
    -webkit-text-stroke-width: 1px;
    font-size: 2rem;
  }

  @include for-sm {
    -webkit-text-stroke-width: 2px;
    font-size: 4rem;
  }

  @include for-md {
    -webkit-text-stroke-width: 2px;
    font-size: 4rem;
  }

  @include for-lg {
    -webkit-text-stroke-width: 2px;
    font-size: 4rem;
  }

}

@include for-hover {
    .next-text:hover ~ .next-overlay {
      opacity: 0.9;
    }
    .next-text:hover {
      color: $color_white;
    }
  }

</style>
