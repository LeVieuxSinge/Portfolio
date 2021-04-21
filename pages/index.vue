<template>
  <div id="page" class="home">
    <smooth-scroller @update="animate">
      <div class="home-wrapper">

        <!-- SECTION : GL -->
        <div class="gl --container--full">

          <!-- CANVAS -->
          <canvas class="gl-canvas"></canvas>

          <!-- SCROLL -->
          <div class="scroll-arrow" :class="{'scroll-arrow-show' : scrollShow}">
            <!-- <div>Scroll</div> -->
            <i class="material-icons">expand_more</i>
          </div>

        </div>

        <!-- SECTION : WELCOME -->
        <div class="welcome --section --container--fluid">

          <!-- HELLO -->
          <div class="welcome-hello">
            <div class="transition-language">
              {{ $store.state.lang === 'eng' ? 'Hello Captain' : 'Salut Capitaine' }}
            </div>
          </div>

          <!-- MY NAME-->
          <div class="welcome-name">

            <!-- TITLE -->
            <div class="welcome-name-title">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'My Name Is' : 'Mon Nom Est' }}
              </div>
            </div>

            <!-- NAME -->
            <div class="welcome-name-name">Xavier Champoux</div>

            <!-- LINK -->
            <nuxt-link class="welcome-name-link" to="/about/">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'More About Me' : 'Plus Sur Moi' }}
              </div>
            </nuxt-link>

          </div>

        </div>

        <!-- SECTION : PRACTICES -->
        <div class="practices --section --container">

          <!-- TITLE -->
          <div class="practices-title">
            <div class="transition-language">
              {{ $store.state.lang === 'eng' ? 'My Skills' : 'Mes Compétences' }}
            </div>
          </div>

          <div class="practices-line practices-1">
            VFX CODING GAMES 3D VFX CODING GAMES 3D VFX CODING GAMES <strong>3D</strong> VFX CODING GAMES 3D VFX CODING
            GAMES 3D VFX CODING GAMES 3D
          </div>

          <div class="practices-line practices-2">
            3D VFX GAMES CODING 3D VFX GAMES CODING 3D VFX GAMES CODING 3D <strong>VFX</strong> GAMES CODING 3D VFX
            GAMES CODING 3D VFX GAMES CODING
          </div>

          <div class="practices-line practices-3">
            GAMES VFX CODING 3D GAMES VFX CODING 3D GAMES VFX CODING 3D <strong>GAMES</strong> VFX CODING 3D GAMES VFX
            CODING 3D GAMES VFX CODING 3D
          </div>

          <div class="practices-line practices-4">
            CODING 3D GAMES VFX CODING 3D GAMES VFX CODING 3D GAMES VFX <strong>CODING</strong> 3D GAMES VFX CODING 3D
            GAMES VFX CODING 3D GAMES VFX
          </div>

        </div>

        <!-- SECTION : REEL -->
        <div class="reel --section --container--fluid" @click="playReel">

          <!-- TITLE -->
          <div class="reel-title">Reel 2020</div>

          <!-- VIDEO -->
          <video src="/videos/reel_2020.mp4" preload="auto" autoplay muted loop></video>

        </div>

        <!-- SECTION : WORKS -->
        <div class="works --section --container--fluid">

          <!-- TITLE -->
          <div class="works-title">
            <div class="works-title-text">
              <div class="transition-language">
                {{ $store.state.lang === 'eng' ? 'Selected Works' : 'Projets Marquants' }}
              </div>
            </div>
          </div>

          <!-- LIST -->
          <div class="works-list">

            <div v-for="(project, index) in $store.state.projects" :key="index" class="works-item"
              :class="[{'works-item-left' : index % 2 === 0}, {'works-item-right' : index % 2 != 0}]">
              <nuxt-link class="works-item-wrapper effect-works" :to="project.link">

                <!-- IMAGE -->
                <div class="works-item-image">
                  <img :src="project.images[0]" :alt="project.name">
                </div>

                <!-- INFORMATIONS -->
                <div class="works-item-info">

                  <!-- COUNTER -->
                  <div class="works-item-counter">
                    0{{ index + 1 }} / 0{{ $store.state.projects.length }}
                  </div>

                  <!-- TITLE -->
                  <div class="works-item-title">
                    {{ project.name }}
                  </div>

                  <!-- SPECIFIC -->
                  <div class="works-item-specific">

                    <div class="works-item-text">
                      {{ project.type }}
                    </div>

                    <figure class="works-item-line"></figure>

                    <div class="works-item-text">
                      {{ project.tool }}
                    </div>

                  </div>

                </div>

              </nuxt-link>
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

    middleware({
      store,
      redirect
    }) {
      // Invert layout
      store.commit('setInvert', false);
      store.commit('setCursorInvert', false);
    },

    data: () => ({
      init: false,
      environment: null,
      canvas: null,
      effects: {
        welcome: null,
        practice: null,
        practices: null,
        works: null,
      },
      pageTimeline: null,
      scrollShow: true,
    }),

    mounted() {

      // Set cursor text
      this.$store.commit('setCursorText', 'Scroll down');

      // Get dom elements
      this.canvas = this.$el.querySelector('.gl-canvas');
      this.effects.welcome = this.$el.querySelector('.welcome-hello');
      this.effects.practice = this.$el.querySelector('.practices');
      this.effects.practices = this.$el.querySelectorAll('.practices-line');
      this.effects.works = this.$el.querySelectorAll('.effect-works');

      if (!this.init) {

        // Set environment
        this.environment = new this.$environments.Primary({
          canvas: this.canvas,
          orbitControls: false,
          postProcessing: true,
          bloomSettings: {
            strength: 0.3,
            radius: 0.7,
            threshold: 0.9,
          },
          bokehSettings: {
            focus: 10,
            aperture: 0.1,
            maxBlur: 0.01,
          },
        });

        // Mount specific
        this.environment.onMount = ({
          env,
          three
        }) => {

          // Set scene
          env.GL.scene.background = new three.Color(0x0A0A0A);
          // env.GL.scene.fog = new three.Fog(0x0A0A0A, 3, 4);

          // Set camera
          env.GL.camera.position.set(0, 0, 3);
          env.GL.camera.fov = Math.min(Math.max(75 + (75 - (75 * env.GL.camera.aspect)), 75), 100);

          // Set orbit controls
          // env.GL.controls.autoRotate = false;
          // env.GL.controls.autoRotateSpeed = 2.0;
          // if (this.$breakpoints.hover) {
          //   env.GL.controls.enabled = true;
          //   env.GL.controls.enablePan = false;
          //   env.GL.controls.enableZoom = false;
          //   env.GL.controls.dampingFactor = 100;
          // } else {
          //   env.GL.controls.enabled = false;
          // }

          // Add scene
          env.add('Landing', this.$assets.get('Landing').scene);

          // Add lights
          var directLight = new three.DirectionalLight(0x404040, 5);
          directLight.position.set(3, 5, 3);
          env.add('Direct_Light', directLight);
          var directLight2 = new three.DirectionalLight(0x404040, 1.5);
          directLight2.position.set(-1, -3, 3);
          env.add('Direct_Light_2', directLight2);
          // var ambientLight = new three.AmbientLight( 0x404040, 4 );
          // env.add('Ambient_Light', ambientLight);

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

          // Orbit controls
          // if (this.$breakpoints.hover) {
          //   env.GL.controls.enabled = true;
          //   env.GL.controls.enableZoom = false;
          //   env.GL.controls.dampingFactor = 100;
          // } else {
          //   env.GL.controls.enabled = false;
          // }

        };

        // Render specific
        this.environment.onRender = ({
          env,
          three
        }) => {

          // Orbit controls
          // env.GL.controls.update();

        };

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

          // this.$popmotion.spring({
          //   from: 20,
          //   to: 10,
          //   mass: 5,
          //   stiffness: 350,
          //   damping: 500
          // }).start({
          //   update: (value) => {
          //     env.GL.camera.position.z = value;
          //   },
          // });

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

          // this.$popmotion.spring({
          //   from: 10,
          //   to: 20,
          //   mass: 5,
          //   stiffness: 350,
          //   damping: 500
          // }).start({
          //   update: (value) => {
          //     env.GL.camera.position.z = value;
          //   },
          // });

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
      });
      this.pageTimeline.add({
        targets: this.environment.GL.camera.position,
        y: -10,
        duration: 5,
      }, 0);

    },

    destroyed() {
      this.environment.unmount();
    },

    methods: {
      map(num, in_min, in_max, out_min, out_max) {
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
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

        // Seek in timeline
        this.pageTimeline.seek(this.pageTimeline.duration * (progress / 100));

        // Animate welcome
        var welcomeBounds = this.effects.welcome.getBoundingClientRect();
        var welcomePosY = this.map(welcomeBounds.top, welcomeBounds.top - welcomeBounds.bottom, this.$el.clientHeight, 50, -50);
        this.effects.welcome.style.transform = `perspective(500px) translateY(${welcomePosY}%)`;

        // Animate practices lines
        for (var i = 0; i < this.effects.practices.length; i++) {
          const e = this.effects.practices[i];
          var bounds = this.effects.practice.getBoundingClientRect();

          // Differentiate even and odd numbers
          if (i % 2 === 0) {
            var posY = this.map(bounds.top, bounds.top - bounds.bottom, this.$el.clientHeight, 100, -100);
            e.style.transform = `perspective(500px) translateX(${posY}px)`;
          } else {
            var posY = this.map(bounds.top, bounds.top - bounds.bottom, this.$el.clientHeight, -100, 100);
            e.style.transform = `perspective(500px) translateX(${posY}px)`;
          }

        }

      },
      playReel() {

        // Get DOM elements
        var reel = this.$el.querySelector('.reel');
        var video = this.$el.querySelector('.reel video');

        reel.classList.add('reel-active');
        video.controls = true;
        video.muted = false;
        video.currentTime = 0;
        setTimeout(() => {
          video.play();
        }, 500);

      },
    },

}
</script>

<!-- NON SCOPED SCSS -->
<style lang="scss">

</style>

<!-- SCOPED SCSS -->
<style lang="scss" scoped>

.effect-translate-y {
  overflow: hidden;
}

.home {
  background-color: $color_dark;
}

.home-wrapper {
  display: flex;
  flex-flow: column;
}

.gl {}

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

.welcome {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  // margin-top: 300px;
}

.welcome-hello {
  color: rgba($color: $color_white, $alpha: 0.1);
  font-family: $font_family_anton;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;

  @include for-xs {
    font-size: 5rem;
  }

  @include for-sm {
    font-size: 6.5rem;
  }

  @include for-md {
    font-size: 8rem;
  }

  @include for-lg {
    font-size: 10rem;
  }

}

.welcome-name {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: -100px;
}

.welcome-name-title {
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 300;
  font-size: 0.8rem;

  @include for-xs {
    margin-bottom: -5px;
  }

  @include for-sm {
    margin-bottom: -5px;
  }

  @include for-md {
    margin-bottom: -5px;
  }

  @include for-lg {
    margin-bottom: -5px;
  }

}

.welcome-name-name {
  color: $color_white;
  font-family: $font_family_anton;
  font-weight: 400;
  text-transform: uppercase;

  @include for-xs {
    font-size: 2.2rem;
  }

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

.welcome-name-link {
  z-index: 1;
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 900;
  font-style: italic;
  text-decoration: none;
  font-size: 0.8rem;

  @include for-hover {
    opacity: 0.5;
    transition: opacity 300ms;
    &:hover {
      opacity: 1;
    }
  }

}

.practices {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.practices-title {
  width: 100%;
  color: $color_white;
  font-family: $font_family_anton;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 50px;

  @include for-xs {
    padding: 0 10px;
    font-size: 3.5rem;
    text-align: left;
  }

  @include for-sm {
    padding: 0 50px;
    font-size: 5rem;
    text-align: center;
  }

  @include for-md {
    padding: 0 50px;
    font-size: 5rem;
    text-align: center;
  }

  @include for-lg {
    padding: 0 100px;
    font-size: 8rem;
    text-align: center;
  }

}

.practices-line {
  color: rgba($color: $color_white, $alpha: 0.1);
  font-family: $font_family_lato;
  font-style: italic;
  font-weight: 900;
  font-size: 5rem;
  text-transform: uppercase;
  white-space: nowrap;

  strong {
    color: rgba($color: $color_white, $alpha: 1.0);
    font-weight: 900;
  }
}

.practices-1 {
  margin-left: 125px;
}

.practices-2 {
  margin-left: -400px;
}

.practices-3 {
  margin-left: -250px;
}

.practices-4 {
  margin-left: -300px;
}

.reel {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  // padding: 0 0;

  video {
    opacity: 0.5;
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 90vh;
  }

  @include for-hover {
    &:hover {
      cursor: pointer;

      .reel-title {
        color: $color_white;
      }
    }
  }

}

.reel-active {

  video {
    opacity: 1;
    object-fit: contain;
  }

  .reel-title {
    display: none;
  }

   @include for-hover {
    &:hover {
      cursor: auto;
    }
  }

}

.reel-title {
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: transparent;
  -webkit-text-stroke-color: $color_white;
  font-family: $font_family_lato;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 4rem;
  line-height: 100%;
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

.works {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.works-title {
  width: 100%;
  display: flex;
  align-items: center;

  @include for-xs {
    padding: 0 10px;
  }

  @include for-sm {
    padding: 0 50px;
  }

  @include for-md {
    padding: 0 50px;
  }

  @include for-lg {
    padding: 0 100px;
  }

}

.works-title-text {
  width: 100%;
  color: $color_white;
  font-family: $font_family_anton;
  font-weight: 400;
  text-transform: uppercase;

  @include for-xs {
    font-size: 3.5rem;
    text-align: left;
  }

  @include for-sm {
    font-size: 5rem;
    text-align: center;
  }

  @include for-md {
    font-size: 5rem;
    text-align: center;
  }

  @include for-lg {
    font-size: 8rem;
    text-align: center;
  }

}

.works-list {
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-flow: column;

  @include for-xs {
    align-items: center;
    padding: 0 10px;
  }

  @include for-sm {
    align-items: center;
    padding: 0 50px;
  }

  @include for-md {
    align-items: flex-start;
    padding: 0 50px;
  }

  @include for-lg {
    align-items: flex-start;
    padding: 0 100px;
  }

}

.works-item {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 100%;

  @include for-xs {
    margin: 20px 0;
  }

  @include for-sm {
    margin: 50px 0;
  }

  @include for-md {
    margin: 50px 0;
  }

  @include for-lg {
    margin: 50px 0;
  }

}

.works-item-left {
  justify-content: flex-start;

  .works-item-image {
    left: 0;
  }

  .works-item-info {
    align-items: flex-start;
    text-align: left;

    @include for-xs {
      left: 0;
    }

    @include for-sm {
      right: 0;
    }

    @include for-md {
      right: 0;
    }

    @include for-lg {
      right: 0;
    }

  }

}

.works-item-right {
  justify-content: flex-end;

  .works-item-image {
    right: 0;
  }

  .works-item-info {
    align-items: flex-end;
    text-align: right;

    @include for-xs {
      right: 0;
    }

    @include for-sm {
      left: 0;
    }

    @include for-md {
      left: 0;
    }

    @include for-lg {
      left: 0;
    }

  }

}

.works-item-wrapper {
  position: relative;

  @include for-xs {
    width: 100%;
    height: 30vh;
  }

  @include for-sm {
    width: 80%;
    height: 300px;
  }

  @include for-md {
    width: 70%;
    height: 350px;
  }

  @include for-lg {
    width: 60%;
    height: 350px;
  }

  @include for-hover {
    transform: perspective(500px) translateZ(0px);
    @include transition(transform 500ms ease);

    &:hover {
      transform: perspective(500px) translateZ(-50px);

      .works-item-title {
        color: $color_white;
      }
    }
  }
  
}

.works-item-image {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;

  @include for-xs {
    width: 100%;
  }

  @include for-sm {
    width: 80%;
  }

  @include for-md {
    width: 80%;
  }

  @include for-lg {
    width: 80%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

}

.works-item-info {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-flow: column;
  padding: 20px;
}

.works-item-counter {
  color: $color_white;
  font-family: $font_family_anton;
  font-size: 0.9rem;
}

.works-item-title {
  color: transparent;
  -webkit-text-stroke-color: $color_white;
  font-family: $font_family_lato;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 4rem;
  line-height: 100%;
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

.works-item-specific {
  display: flex;
  align-items: center;
}

.works-item-text {
  color: $color_white;
  font-family: $font_family_lato;
  font-style: italic;
  font-weight: 300;
  font-size: 1rem;
}

.works-item-line {
  height: 2px;
  background-color: $color_white;
  margin: 0 10px;

  @include for-xs {
    width: 30px;
  }

  @include for-sm {
    width: 50px;
  }

  @include for-md {
    width: 50px;
  }

  @include for-lg {
    width: 50px;
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
  color: $color_white;
  font-family: $font_family_lato;
  font-weight: 300;
  font-size: 0.8rem;
}

.contacts-email {
  color: $color_white;
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
  color: $color_white;
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
  color: rgba($color: $color_white, $alpha: 0.2);
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
  color: rgba($color: $color_white, $alpha: 0.2);
  font-family: $font_family_lato;
  font-size: 0.8rem;
  font-weight: 300;
}

</style>
