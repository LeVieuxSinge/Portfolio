<template>
  <div id="page" class="about">
    <smooth-scroller @update="animate">
      <div class="about-wrapper">

        <!-- CANVAS -->
        <canvas class="gl-canvas"></canvas>

        <!-- SECTION : INTRODUCTION -->
        <div class="introduction --container--full">

          <!-- GENERAL -->
          <div class="introduction-general">

            <div class="introduction-name">Xavier Champoux</div>
            <div class="introduction-else">
              <div class="introduction-age">21</div>
              <figure class="introduction-line"></figure>
              <div class="introduction-position">Montréal</div>
            </div>

          </div>

          <!-- SCROLL -->
          <div class="scroll-arrow">
            <!-- <div>Scroll</div> -->
            <i class="material-icons">expand_more</i>
          </div>

        </div>

        <!-- SECTION : STATEMENT -->
        <div class="statement --container--full" @mouseenter="$store.commit('setCursorInvert', false)" @mouseleave="$store.commit('setCursorInvert', true)">

          <div class="statement-wrapper">

            <!-- PRATICES -->
            <div class="statement-practices">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? '3D / VFX Artist & Game Programmer' : 'Artiste 3D / Effets Visuels & Programmeur de Jeux' }}
              </div>
            </div>

            <!-- LONG TEXT -->
            <div class="statement-text">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? statement.eng : statement.fr }}
              </div>
            </div>

          </div>

        </div>

        <!-- SECTION : EXPERIENCE -->
        <div class="experience section-half section-right --container--fluid">
          <div class="cv-block">

            <!-- TITLE -->
            <div class="cv-block-title">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Experience' : 'Expérience' }}
              </div>
            </div>

            <!-- LINE -->
            <figure class="cv-block-line"></figure>

            <!-- ITEMS -->
            <div class="cv-block-items">

              <!-- ITEM -->
              <div v-for="(item, index) in experiences" :key="index" class="cv-block-item">

                <!-- ITEM YEAR -->
                <div class="cv-block-item-year">{{ item.year }}</div>

                <!-- ITEM TEXT -->
                <div class="cv-block-item-text">
                  <div class="cv-block-item-primary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.primary.eng : item.primary.fr }}
                    </div>
                  </div>
                  <div class="cv-block-item-secondary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.secondary.eng : item.secondary.fr }}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <!-- SECTION : EDUCATION -->
        <div class="education section-half section-left --container--fluid">
          <div class="cv-block">

            <!-- TITLE -->
            <div class="cv-block-title">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Education' : 'Éducation' }}
              </div>
            </div>

            <!-- LINE -->
            <figure class="cv-block-line"></figure>

            <!-- ITEMS -->
            <div class="cv-block-items">

              <!-- ITEM -->
              <div v-for="(item, index) in educations" :key="index" class="cv-block-item">

                <!-- ITEM YEAR -->
                <div class="cv-block-item-year">{{ item.year }}</div>

                <!-- ITEM TEXT -->
                <div class="cv-block-item-text">
                  <div class="cv-block-item-primary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.primary.eng : item.primary.fr }}
                    </div>
                  </div>
                  <div class="cv-block-item-secondary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.secondary.eng : item.secondary.fr }}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <!-- SECTION : QUOTE -->
        <div class="quote section-half section-center --container--fluid">

          <!-- TEXT -->
          <div class="quote-text">
            <div class="transition-language">
              {{ $store.state.lang === 'eng' ? quote.eng : quote.fr }}
            </div>
          </div>

        </div>

        <!-- SECTION : AWARDS -->
        <div class="awards section-half section-right --container--fluid">
          <div class="cv-block">

            <!-- TITLE -->
            <div class="cv-block-title">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Awards' : 'Prix' }}
              </div>
            </div>

            <!-- LINE -->
            <figure class="cv-block-line"></figure>

            <!-- ITEMS -->
            <div class="cv-block-items">

              <!-- ITEM -->
              <div v-for="(item, index) in awards" :key="index" class="cv-block-item">

                <!-- ITEM YEAR -->
                <div class="cv-block-item-year">{{ item.year }}</div>

                <!-- ITEM TEXT -->
                <div class="cv-block-item-text">
                  <div class="cv-block-item-primary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.primary.eng : item.primary.fr }}
                    </div>
                  </div>
                  <div class="cv-block-item-secondary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.secondary.eng : item.secondary.fr }}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <!-- SECTION : PUBLIC SPEAKING -->
        <div class="public section-half section-left --container--fluid">
          <div class="cv-block">

            <!-- TITLE -->
            <div class="cv-block-title">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Public Speaking' : 'Présence Publique' }}
              </div>
            </div>

            <!-- LINE -->
            <figure class="cv-block-line"></figure>

            <!-- ITEM -->
            <div class="cv-block-items">

              <!-- ITEM -->
              <div v-for="(item, index) in speech" :key="index" class="cv-block-item">

                <!-- ITEM YEAR -->
                <div class="cv-block-item-year">{{ item.year }}</div>

                <!-- ITEM TEXT -->
                <div class="cv-block-item-text">
                  <div class="cv-block-item-primary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.primary.eng : item.primary.fr }}
                    </div>
                  </div>
                  <div class="cv-block-item-secondary">
                    <div class="transition-language">
                      {{ $store.state.lang === 'eng' ? item.secondary.eng : item.secondary.fr }}
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        <!-- SECTION : CURRENTLY -->
        <div class="currently section-half section-center --container--fluid">
            <div class="currently-wrapper">

              <!-- TITLE -->
              <div class="currently-title">
                <div class="transition-language">
                  {{ $store.state.lang === 'eng' ? 'Currently Working On' : 'Travaille Présentement Sur' }}
                </div>
              </div>

              <!-- TEXT -->
              <div class="currently-text">
                <div class="transition-language">
                  {{ $store.state.lang === 'eng' ? currently.eng : currently.fr }}
                </div>
              </div>

            </div>
        </div>

        <!-- SECTION : INFORMATION -->
        <div class="information --section --container--fluid">

          <!-- CONTACTS -->
          <div class="contacts">

            <!-- TITLE -->
            <div class="contacts-title">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Come Say Hello !' : 'Venez Dire Salut !' }}
              </div>
            </div>

            <!-- EMAIL -->
            <a class="contacts-email" href="mailto:xavierchampoux@hotmail.com">xavierchampoux@hotmail.com</a>

            <!-- SOCIALS -->
            <div class="contacts-socials">

              <a class="contacts-link" href="https://www.instagram.com/doldmk/?hl=fr">Instagram</a>
              <a class="contacts-link"
                href="https://www.youtube.com/channel/UCDPSki7JNK3iQcqjqSAE5qQ/featured">Youtube</a>
              <a class="contacts-link" href="https://www.linkedin.com/in/doldmnk/">LinkedIn</a>
              <a class="contacts-link" href="https://github.com/LeVieuxSinge">Github</a>

            </div>

          </div>

          <!-- FOOTER -->
          <div class="footer">

            <!-- CODED -->
            <div class="footer-coded">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Designed and ' : 'Design et ' }}
                <i class="material-icons">code</i>
                {{ $store.state.lang === 'eng' ? ' by Me' : ' par Moi' }}
              </div>
            </div>

            <!-- COPYRIGHT -->
            <div class="footer-copyright">© {{ new Date().getFullYear() }}</div>

          </div>

        </div>

      </div>
    </smooth-scroller>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime';
import SmoothScroller from '~/components/Utils/SmoothScroller.vue';
export default {

  components: {
    SmoothScroller,
  },

  middleware({store, redirect}) {
      // Invert layout
      store.commit('setInvert', true);
      store.commit('setCursorInvert', true);
  },

  data: () => ({
    pageTimeline: null,
    DOM: {
      statement: null,
    },
    statement: {
      eng: `Long time fan of Star Wars and futuristic settings like Blade Runner and Cyberpunk 2077, I’m inspired by the idea of science-fiction dystopia as a way to criticize the constant evolution of humans and its technology. My techniques are often programming based and resolve around the concept of procedural or auto-generated algorithms`,
      fr: `Fan depuis plusieurs années de Star Wars et de décors futuristes comme Blade Runner et Cyberpunk 2077, je suis inspiré par l'idée de science-fiction dystopique comme moyen de critiquer l'évolution constante de l'homme et de sa technologie. Mes techniques sont souvent basées sur la programmation et tournent autour du concept d'algorithmes procéduraux ou auto-générés`,
    },
    quote: {
      eng: `My cegep final project was awarded the “Most Outstanding” prize during the final exhibition, recognizing my “perfect consistency between form and content with his artistic use of an interactive digital technology that he submits to criticism.”`,
      fr: `Mon projet final au cégep a reçu le prix «Oeuvre Marquante» lors de l'exposition finale, reconnaissant ma «parfaite cohérence entre la forme et le contenu avec son usage artistique d'une technologie numérique interactive qu'il soumet à la critique».`,
    },
    currently: {
      eng: `Co-developing my own UE4 indie game as the lead artist and programmer !`,
      fr: `Co-développer mon propre jeu indépendant avec UE4 en tant qu'artiste et programmeur principal !`,
    },
    experiences: [
      {
        year: '2019 - 2021',
        primary: {
          eng: 'Website Developer',
          fr: 'Développeur Web'
        },
        secondary: {
          eng: 'Association des Retraité.es du Cégep de Saint-Hyacinthe',
          fr: 'Association des Retraité.es du Cégep de Saint-Hyacinthe',
        },
      },
    ],
    educations: [
      {
        year: '2018 - 2021',
        primary: {
          eng: 'BFA Computation Arts',
          fr: 'BAC Computation Arts',
        },
        secondary: {
          eng: 'Concordia University - Montréal',
          fr: 'Concordia University - Montréal',
        },
      },
      {
        year: '2016 - 2018',
        primary: {
          eng: 'DEC Visual and Media Arts',
          fr: 'DEC Visual and Media Arts',
        },
        secondary: {
          eng: 'Cégep de Saint-Hyacinthe - Saint-Hyacinthe',
          fr: 'Cégep de Saint-Hyacinthe - Saint-Hyacinthe',
        },
      },
    ],
    awards: [
      {
        year: '2018',
        primary: {
          eng: 'Entrance Scholarship FOFA',
          fr: 'Entrance Scholarship FOFA',
        },
        secondary: {
          eng: 'Concordia University - Montréal',
          fr: 'Concordia University - Montréal',
        },
      },
      {
        year: '2018',
        primary: {
          eng: '"Most Outstanding Project"',
          fr: '"Oeuvre Marquante"'
        },
        secondary: {
          eng: 'Cégep de Saint-Hyacinthe - Saint-Hyacinthe',
          fr: 'Cégep de Saint-Hyacinthe - Saint-Hyacinthe',
        },
      },
    ],
    speech: [
      {
        year: '2020',
        primary: {
          eng: 'Guest Speaker',
          fr: 'Conférencier Invité',
        },
        secondary: {
          eng: 'China Canada VR Technology Summit',
          fr: 'Chine Canada Sommet de la Technologie VR'
        },
      },
      {
        year: '2018',
        primary: {
          eng: 'Guest Speaker',
          fr: 'Conférencier Invité',
        },
        secondary: {
          eng: 'NousTV Saint-Hyacinthe',
          fr: 'NousTV Saint-Hyacinthe',
        },
      },
    ],
  }),

  mounted() {

    // Set cursor text
    this.$store.commit('setCursorText', 'Scroll down');

    // Get DOM elements
    this.DOM.statement = this.$el.querySelector('.statement');

    // Setup timeline
    this.pageTimeline = anime.timeline({
      autoplay: false,
      easing: 'easeOutQuad',
      duration: 100,
    });
    // this.pageTimeline.add({
    //   targets: '.scroll-arrow',
    //   opacity: '0',
    //   duration: 5,
    // }, 0);

  },

  methods: {
    map(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },
    animate(progress) {

      // Set cursor text
      if (progress === 0) {
        this.$store.commit('setCursorText', 'Scroll down');
      } else {
        this.$store.commit('setCursorText', '');
      }

      // Invert layout when in statement section
      var bounds = this.DOM.statement.getBoundingClientRect();
      if (bounds.top < 150 && bounds.bottom > (this.$el.clientHeight * 0.1)) {
        this.$store.commit('setInvert', false);
      } else {
        this.$store.commit('setInvert', true);
      }

        // Seek in timeline
      this.pageTimeline.seek(this.pageTimeline.duration * (progress / 100));

    },
  },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

// General

.section-half {

  @include for-xs {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @include for-sm {
    padding: 0 50px;
    margin-top: 100px;
    margin-bottom: 100px;
  }

  @include for-md {
    margin-top: 200px;
    margin-bottom: 200px;
  }

  @include for-lg {
    margin-top: 200px;
    margin-bottom: 200px;
  }

  @include for-xl {
    margin-top: 200px;
    margin-bottom: 200px;
  }

}

.section-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.section-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.section-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.cv-block {
  display: flex;
  flex-flow: column;

  @include for-xs {
    width: 100%;
  }

  @include for-sm {
    width: 100%;
    max-width: 500px;
  }

  @include for-md {
    width: 100%;
    max-width: 500px;
  }

  @include for-lg {
    width: 100%;
    max-width: 500px;
  }

  @include for-xl {
    width: 100%;
    max-width: 500px;
  }

}

.cv-block-title {
  color: $color_dark;
  font-family: $font_family_anton;
  text-transform: uppercase;
  font-size: 2rem;
}

.cv-block-line {
  width: 100%;
  height: 1px;
  background-color: $color_dark;
  margin: 10px 0 15px 0;
}

.cv-block-items {}

.cv-block-item {
  display: flex;
  flex-flow: row wrap;
  margin: 5px;
}

.cv-block-item-year {
  flex: 0 0 25%;
  padding-right: 10px;
  color: $color_dark;
  font-family: $font_family_lato;
  font-style: italic;
  font-size: 0.8rem;
}

.cv-block-item-text {
  flex: 0 0 75%;
  padding-left: 10px;
}

.cv-block-item-primary {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 900;
  font-size: 1rem;
}

.cv-block-item-secondary {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 300;
  font-size: 0.9rem;
}

// Specific

.about {
    background-color: $color_white;
}

.about-wrapper {
  display: flex;
  flex-flow: column;
}

.gl-canvas {
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.introduction {}

.introduction-general {
    position: absolute;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    bottom: 20%;
    padding: 30px 30px;

    @include for-sm {
        bottom: 20%;
        padding: 30px 30px;
    }

    @include for-md {
        bottom: 20%;
        padding: 30px 30px;
    }

    @include for-lg {
        align-items: flex-start;
        width: auto;
        left: 20%;
        bottom: 50%;
        @include transform(translateY(50%));
    }

}

.introduction-name {
    color: $color_dark;
    font-family: $font_family_anton;
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;

    @include for-sm {
        font-size: 3rem;
    }

    @include for-md {
        font-size: 3rem;
    }

    @include for-lg {
        font-size: 3rem;
    }

}

.introduction-else {
    display: flex;
    align-items: center;
    color: $color_dark;
    font-family: $font_family_lato;
    font-style: italic;
    font-weight: 300;
    font-size: 1rem;
}

.introduction-line {
    width: 40px;
    height: 1px;
    background-color: rgba($color: $color_dark, $alpha: 0.5);
    margin: 0 10px;
}

.scroll-arrow {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 300;
  position: absolute;
  bottom: 5%;
  left: 50%;
  @include transform(translate(-50%, -50%));
  animation: scroll-arrow 2s infinite;

  display: flex;
  flex-flow: column;
  align-items: center;

  i {
    width: 25px;
    height: 25px;
  }
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

.statement {
  background-color: $color_dark;
  display: flex;
  justify-content: center;
  align-items: center;
}

.statement-wrapper {
  width: 100%;
  max-width: 800px;
  padding: 30px 30px;

  @include for-xs {
    padding: 50px 0;
  }

  @include for-sm {
    padding: 50px 50px;
  }

  @include for-md {
    padding: 50px 50px;
  }

  @include for-lg {
    padding: 50px 50px;
  }

  @include for-xl {
    padding: 50px 50px;
  }

}

.statement-practices {
    color: $color_white;
    opacity: 0.5;
    font-family: $font_family_lato;
    font-weight: 400;
    font-size: 1rem;
}

.statement-text {
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 700;

  @include for-xs {
    font-size: 1.5rem;
  }

  @include for-sm {
    font-size: 2rem;
  }

  @include for-md {
    font-size: 2rem;
  }

  @include for-lg {
    font-size: 2rem;
  }

  @include for-xl {
    font-size: 2rem;
  }
}

.experience {

  @include for-xs {
    margin-top: 150px;
  }

  @include for-sm {
    margin-top: 200px;
  }

  @include for-md {
    margin-top: 300px;
  }

  @include for-lg {
    margin-top: 300px;
  }

  @include for-xl {
    margin-top: 300px;
  }

}

.education {}

.quote {}

.quote-text {
  width: 100%;
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 900;
  font-style: italic;
  text-align: center;

  @include for-xs {
    font-size: 1.5rem;
  }

  @include for-sm {
    font-size: 1.75rem;
  }

  @include for-md {
    font-size: 2rem;
  }

  @include for-lg {
    font-size: 2rem;
  }

  @include for-xl {
    font-size: 2rem;
  }
}

.public {}

.currently-wrapper {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
}

.currently-title {
    color: $color_dark;
    font-family: $font_family_lato;
    font-weight: 300;
    font-size: 0.8rem;
}

.currently-text {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 900;
  text-align: center;

  @include for-xs {
    font-size: 1.5rem;
  }

  @include for-sm {
    font-size: 1.75rem;
  }

  @include for-md {
    font-size: 2rem;
  }

  @include for-lg {
    font-size: 2rem;
  }

  @include for-xl {
    font-size: 2rem;
  }

}

.information {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;

  @include for-xs {
    height: 250px;
    margin-bottom: 50px;
  }

  @include for-sm {
    height: 250px;
    margin-bottom: 50px;
  }

  @include for-md {
    height: 300px;
    margin-bottom: 100px;
  }

  @include for-lg {
    height: 300px;
    margin-bottom: 100px;
  }

}

.contacts {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.contacts-title {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 300;
  font-size: 0.8rem;
}

.contacts-email {
  color: $color_dark;
  font-family: $font_family_anton;
  font-weight: 400;
  text-decoration: none;

  @include for-xs {
    font-size: 1.5rem;
  }

  @include for-sm {
    font-size: 2rem;
  }

  @include for-md {
    font-size: 2rem;
  }

  @include for-lg {
    font-size: 2rem;
  }

}

.contacts-socials {
  display: flex;
  flex-flow: row wrap;
}

.contacts-link {
  color: $color_dark;
  font-family: $font_family_lato;
  font-weight: 300;
  text-decoration: none;
  padding: 5px;
  margin: 0 10px;
  text-align: center;

  @include for-xs {
    font-size: 1rem;
    flex: 1 1 40%;
  }

  @include for-sm {
    font-size: 1rem;
  }

  @include for-md {
    font-size: 1rem;
  }

  @include for-lg {
    font-size: 1rem;
  }

  @include for-hover {
    opacity: 0.5;
    transition: opacity 300ms;

    &:hover {
      opacity: 1;
    }
  }

}

.footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.footer-coded {
  display: flex;
  align-items: center;
  color: rgba($color: $color_dark, $alpha: 0.5);
  font-family: $font_family_lato;
  font-size: 0.8rem;
  font-weight: 300;

  & > div {
    display: flex;
    align-items: center;
  }

  i {
    font-size: 1.1rem;
    font-weight: 300;
    margin: 0 5px;
  }
}

.footer-copyright {
  color: rgba($color: $color_dark, $alpha: 0.5);
  font-family: $font_family_lato;
  font-size: 0.8rem;
  font-weight: 300;
}

</style>