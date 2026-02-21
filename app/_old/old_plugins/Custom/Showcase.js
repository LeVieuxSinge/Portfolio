import {
  ShowcaseGL
} from './ShowcaseGL.js';
import {
  ShowcaseGrab
} from './ShowcaseGrab';
import {
  ShowcaseReach
} from './ShowcaseReach';
import {
  spring,
  parallel
} from '~/node_modules/popmotion/dist/popmotion';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

/* ============================================================= */

class Showcase {

  constructor(params) {

    // -------- PARAMETERS -------- //

    // target environment comes in

    var _params = params !== undefined ? params : {};

    this.projects = _params.targetEnvironments !== undefined ? _params.targetEnvironments : [];
    this.GL = new ShowcaseGL({
      targetEnvironments: this.projects,
    });
    this.GL.createPlane();
    this.progress = 0;
    this.direction = 1;
    this.waveIntensity = 0;
    this.index = {
      target: 0,
      current: 0,
      initial: 0,
      scrollSize: window.innerHeight / 6,
      active: 0
    };
    this.follower = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    };
    this.followerSpring = null;
    this.textureProgressSpring = null;
    this.slidesPop = null;
    this.GLStickPop = null;
    this.grab = new ShowcaseGrab({
      onGrabStart: this.onGrabStart.bind(this),
      onGrabMove: this.onGrabMove.bind(this),
      onGrabEnd: this.onGrabEnd.bind(this),
    });

    // Custom Events
    this.onActiveIndexChange = function () {};
    this.onIndexChange = function () {};
    this.onZoomOutStart = function () {};
    this.onZoomOutFinish = function () {};
    this.onFullScreenStart = function () {};
    this.onFullScreenFinish = function () {};

    this.debug = _params.debug !== undefined ? _params.debug : false;

  }

  // -------- METHODS -------- //

  onMouseMove(event) {
    // Reset
    if (this.followerSpring) {
      this.followerSpring.stop();
      this.followerSpring = null;
    }

    // Animate
    this.followerSpring = new ShowcaseReach({
      from: {
        x: this.follower.x,
        y: this.follower.y,
      },
      to: {
        x: event.clientX,
        y: event.clientY,
      },
      mass: 1,
      stiffness: 500,
      damping: 50,
      velocity: {
        x: this.follower.vx,
        y: this.follower.vy,
      },
    }).start({
      update: position => {

        // Calculate velocity
        var velocity = {
          x: position.x - this.follower.x,
          y: position.y - this.follower.y,
        };

        // Update follower
        this.follower = {
          x: position.x,
          y: position.y,
          vx: velocity.x,
          vy: velocity.y,
        };

        // Update RGB
        this.GL.updateRGBEffect({
          position,
          velocity
        });

      },
      complete: () => {

        // Update RGB
        this.GL.updateRGBEffect({
          position: {
            x: this.follower.x,
            y: this.follower.y,
          },
          velocity: {
            x: 0,
            y: 0,
          },
        });

        // Reset velocity
        this.follower.vx = 0;
        this.follower.vy = 0;

      },
    });

  }

  onGrabStart() {

    this.onZoomOutStart({
      activeIndex: this.index.active
    });

    this.index.initial = this.index.current;

    // Reset
    if (this.GLStickPop) {
      this.GLStickPop.stop();
      // this.GLStickPop = null;
    }

    this.GL.scheduleLoop();

    // Create spring animations
    var directionSpring = spring({
      from: this.direction,
      to: 0,
      mass: 1,
      stiffness: 800,
      damping: 2000
    });
    var progressSpring = spring({
      from: this.progress,
      to: 1,
      mass: 5,
      stiffness: 350,
      damping: 500
    });
    var waveIntensitySpring = spring({
      from: this.waveIntensity,
      to: 0.5,
      mass: 5,
      stiffness: 10,
      damping: 200
    });

    // Animate
    this.GLStickPop = parallel(
      directionSpring,
      progressSpring,
      waveIntensitySpring,
    ).start({
      update: values => {
        this.direction = values[0];
        this.progress = values[1];
        this.waveIntensity = values[2];
        this.GL.updateStickEffect({
          progress: this.progress,
          direction: this.direction,
          waveIntensity: this.waveIntensity,
        });
      },
      complete: () => {
        this.onZoomOutFinish({
          activeIndex: this.index.active
        });
      },
    });

  }

  onGrabMove(scroll) {

    this.index.target = clamp(this.index.initial + scroll.delta / this.index.scrollSize, -this.projects.length + 0.51, 0.49);
    var index = clamp(Math.round(-this.index.target), 0, this.projects.length - 1);

    if (this.index.active !== index) {
      this.index.active = index;
      this.onActiveIndexChange(this.index.active);
      this.GL.updateTexture(index);

      // Reset
      if (this.textureProgressSpring) {
        this.textureProgressSpring.stop();
        this.textureProgressSpring = null;
      }

      // Animate
      this.textureProgressSpring = spring({
        from: 0,
        to: 1,
        stiffness: 400,
        damping: 30
      }).start(value => {
        this.GL.updateTexture(null, value);
      });

    }

    // Reset
    if (this.slidesPop) {
      this.slidesPop.stop();
      // this.slidesPop = null;
    }

    this.slidesPop = new ShowcaseReach({
      from: {
        index: this.index.current
      },
      to: {
        index: this.index.target
      },
      restDelta: 0.001,
    }).start({
      update: value => {
        this.onIndexChange(value.index);
        this.index.current = value.index;
      },
      complete: value => {
        this.onIndexChange(value.index);
        this.index.current = value.index;
      },
    });

  }

  onGrabEnd() {

    this.onFullScreenStart({
      activeIndex: this.index.active
    });

    this.snapCurrentToActiveIndex();

    // Reset
    if (this.GLStickPop) {
      this.GLStickPop.stop();
      // this.GLStickPop = null;
    }

    // Create spring animations
    var directionSpring = spring({
      from: this.direction,
      to: 1,
      mass: 1,
      stiffness: 800,
      damping: 2000
    });
    var progressSpring = spring({
      from: this.progress,
      to: 0,
      mass: 4,
      stiffness: 400,
      damping: 70,
      restDelta: 0.0001
    });
    var waveIntensitySpring = spring({
      from: this.waveIntensity,
      to: 0,
      mass: 0.1,
      stiffness: 800,
      damping: 50
    });

    // Animate
    this.GLStickPop = parallel(
      directionSpring,
      progressSpring,
      waveIntensitySpring,
    ).start({
      update: values => {
        this.direction = values[0];
        this.progress = values[1];
        this.waveIntensity = values[2];
        this.GL.updateStickEffect({
          progress: this.progress,
          direction: this.direction,
          waveIntensity: this.waveIntensity,
        });
      },
      complete: () => {
        this.onFullScreenFinish({
          activeIndex: this.index.active
        });
        this.GL.cancelLoop();
      },
    });

  }

  snapCurrentToActiveIndex() {

    // Reset
    if (this.slidesPop) {
      this.slidesPop.stop();
      // this.slidesPop = null;
    }

    // Animate
    this.slidesPop = new ShowcaseReach({
      from: {
        index: this.index.current
      },
      to: {
        index: Math.round(this.index.target)
      },
      restDelta: 0.001,
    }).start({
      update: value => {
        this.onIndexChange(value.index);
        this.index.current = value.index;
      },
      complete: () => {},
    });

  }

  mount(container) {
    this.GL.mount(container);
  }

  render() {
    this.GL.render();
  }

  onResize() {
    this.GL.onResize();
  }

  // -------- GETTERS -------- //

  // None

  // -------- SETTERS -------- //

  // None

}

/* ============================================================= */

/**
 * Exports
 */
export {
  Showcase,
}