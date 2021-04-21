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
          <div class="scroll-arrow" :class="{'scroll-arrow-show' : scrollShow}">
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
                {{ $store.state.lang === 'eng' ? 'Come Say Hello !' : 'Viens Dire Salut !' }}
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

  middleware({
    store,
    redirect
  }) {
    // Invert layout
    store.commit('setInvert', true);
    store.commit('setCursorInvert', true);
  },

  data: () => ({
    init: false,
    environment: null,
    canvas: null,
    pageTimeline: null,
    scrollShow: true,
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
    experiences: [{
      year: '2019 - 2021',
      primary: {
        eng: 'Website Developer',
        fr: 'Développeur Web'
      },
      secondary: {
        eng: 'Association des Retraité.es du Cégep de Saint-Hyacinthe',
        fr: 'Association des Retraité.es du Cégep de Saint-Hyacinthe',
      },
    }, ],
    educations: [{
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
    awards: [{
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
    speech: [{
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
    this.canvas = this.$el.querySelector('.gl-canvas');
    this.DOM.statement = this.$el.querySelector('.statement');

    if (!this.init) {

      // Set environment
      this.environment = new this.$environments.Primary({
        canvas: this.canvas,
        manualRender: true,
        orbitControls: false,
        postProcessing: false,
        bloomSettings: {
          strength: 0.3,
          radius: 0.7,
          threshold: 0.9,
        },
      });

      // Add scenes to storage
      // this.environment.storage.add('About_0', this.$assets.get('About').scene.children[0]);
      // this.environment.storage.add('About_1', this.$assets.get('About').scene.children[1]);
      // this.environment.storage.add('About_2', this.$assets.get('About').scene.children[2]);

      // Mount specific
      this.environment.onMount = ({
        env,
        three
      }) => {

        // Set scene
        env.GL.scene.background = new three.Color(0xF1F2F5);

        // Set camera
        env.GL.camera.position.set(0, 0, 3);
        env.GL.camera.fov = Math.min(Math.max(75 + (75 - (75 * env.GL.camera.aspect)), 75), 100);

        // Add scene
        env.add('About', this.$assets.get('About').scene);
        // env.add('About_0', this.environment.storage.get('About_0'));
        // env.add('About_1', this.environment.storage.get('About_1'));
        // env.add('About_2', this.environment.storage.get('About_2'));

        // Add lights
        // var directLight = new three.DirectionalLight(0x404040, 5);
        // directLight.position.set(3, 5, 3);
        // env.add('Direct_Light', directLight);
        // var directLight2 = new three.DirectionalLight(0x404040, 1.5);
        // directLight2.position.set(-1, -3, 3);
        // env.add('Direct_Light_2', directLight2);
        var ambientLight = new three.AmbientLight( 0xfffffff, 20 );
        env.add('Ambient_Light', ambientLight);

      };

      // Unmount specific
      this.environment.onUnmount = ({
        env,
        three
      }) => {};

      // Resize specific
      this.environment.onResize = ({
        env,
        three
      }) => {

        // Set camera
        env.GL.camera.fov = Math.min(Math.max(75 + (75 - (75 * env.GL.camera.aspect)), 75), 100);

      };

      // Render specific
      this.environment.onRender = ({
        env,
        three
      }) => {};

      // Enter specific
      this.environment.onEnter = ({
        env,
        three,
        done
      }) => {

        // env.GL.renderer.domElement.style.opacity = 1;
        setTimeout(() => {
          done();
        }, 600);

      };

      // Leave specific
      this.environment.onLeave = ({
        env,
        three,
        done
      }) => {

        // env.GL.renderer.domElement.style.opacity = 0;
        setTimeout(() => {
          done();
        }, 600);

      };

      // Set init
      this.init = true;

    }

    // Mount
    this.environment.mount();

    // Setup timeline
    this.pageTimeline = anime.timeline({
      autoplay: false,
      easing: 'easeOutQuad',
      duration: 100,
      update: () => {
        this.environment.render();
      },
    });

    // Camera
    this.pageTimeline.add({
      targets: this.environment.GL.camera.position,
      y: -10,
      z: 0,
    }, 0);
    this.pageTimeline.add({
      targets: this.environment.GL.camera.rotation,
      x: this.degToRad(90),
      // duration: 70,
    }, 0);

    // Opacity
    this.pageTimeline.add({
      targets: this.canvas,
      opacity: [1, 0.1],
      duration: 50,
    }, 50);

    // Sphere
    this.pageTimeline.add({
      targets: this.environment.get('About').children[1].position,
      y: -8,
      duration: 100,
    }, 0);

    // Pillar daddy
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].position,
      y: [0, 1],
      duration: 20,
    }, 0);
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].rotation,
      x: 0,
      y: 0,
      z: 0,
      duration: 100,
    }, 0);

    // Pillar 1
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[0].position,
      x: [0.4, 3],
      duration: 100,
    }, 0);
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[0].rotation,
      // x: [0, this.degToRad(30)],
      // y: [0, this.degToRad(30)],
      z: [0, this.degToRad(90)],
      duration: 100,
    }, 0);

    // Pillar 2
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[1].position,
      z: [-0.4, -3],
      duration: 100,
    }, 0);
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[1].rotation,
      // x: [0, this.degToRad(30)],
      y: [0, this.degToRad(90)],
      z: [0, this.degToRad(90)],
      duration: 100,
    }, 0);

    // Pillar 3
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[2].position,
      z: [0.4, 3],
      duration: 100,
    }, 0);
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[2].rotation,
      // x: [0, this.degToRad(30)],
      y: [0, this.degToRad(90)],
      z: [0, this.degToRad(90)],
      duration: 100,
    }, 0);

    // Pillar 4
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[3].position,
      x: [-0.4, -3],
      duration: 100,
    }, 0);
    this.pageTimeline.add({
      targets: this.environment.get('About').children[0].children[3].rotation,
      // x: [0, this.degToRad(30)],
      // y: [0, this.degToRad(90)],
      z: [0, this.degToRad(90)],
      duration: 100,
    }, 0);

  },

  destroyed() {
    this.environment.unmount();
  },

  methods: {
    map(num, in_min, in_max, out_min, out_max) {
      return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },
    degToRad(deg) {
      return deg * Math.PI / 180;
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
  color: $color_white;
  mix-blend-mode: difference;
  font-family: $font_family_anton;
  text-transform: uppercase;
  font-size: 2rem;
}

.cv-block-line {
  width: 100%;
  height: 1px;
  background-color: $color_white;
  mix-blend-mode: difference;
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
  color: $color_white;
  mix-blend-mode: difference;
  font-family: $font_family_lato;
  font-style: italic;
  font-size: 0.8rem;
}

.cv-block-item-text {
  flex: 0 0 75%;
  padding-left: 10px;
}

.cv-block-item-primary {
  color: $color_white;
  mix-blend-mode: difference;
  font-family: $font_family_lato;
  font-weight: 900;
  font-size: 1rem;
}

.cv-block-item-secondary {
  color: $color_white;
  mix-blend-mode: difference;
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

.introduction {
  display: flex;
  align-items: flex-end;
  padding-bottom: 150px;

  @include for-sm {
    padding-bottom: 200px;
  }

  @include for-md {
    padding-bottom: 200px;
  }

  @include for-lg {
    padding-bottom: 0;
    align-items: center;
  }

}

.introduction-general {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    bottom: 20%;

    @include for-sm {
        bottom: 20%;
    }

    @include for-md {
        bottom: 20%;
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

.statement {
  background-color: $color_white;
  display: flex;
  justify-content: center;
  align-items: center;
  mix-blend-mode: difference;
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
    color: $color_dark;
    opacity: 0.5;
    font-family: $font_family_lato;
    font-weight: 400;
    font-size: 1rem;
}

.statement-text {
  color: $color_dark;
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
  color: $color_white;
  mix-blend-mode: difference;
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