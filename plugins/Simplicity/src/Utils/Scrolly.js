/**
 * @name Scrolly.js
 * @version v1.0a
 * @author Xavier Champoux / levieuxsinge.github.io/portfolio /
 * @description Helps in the construction of a Three.js environment. (Renderer, Scene, Camera and more)
 * @updated June 6, 2020.
 * @license Free
 */

(function () {

  'use strict';

  class Scrolly {

    constructor(params) {

      // Build parameters
      this.sections = [];
      this.progress = 0;
      this.progress_anchor = [];
      this.environment = params.environment !== undefined ? params.environment : console.error('Need a main environment for Scrolly.');
      this.active = params.active !== undefined ? params.active : 0;
      this.velocity_tresh = params.threshold !== undefined ? params.threshold : 20;
      this.timeline = ANIME.timeline({
        easing: 'easeInOutSine',
        autoplay: false,
      });

      // Scroll data
      this.deltaY = 0;
      this.touchStartY = 0;
      this.velocity = 0;
      this.isAnimating = false;

      // Private methods
      var calculateVelocity = () => {

        // Calculate velocity
        this.velocity += this.deltaY;

      };

      var updateVelocity = () => {

        // Drag velocity to 0
        ANIME({
          targets: this,
          velocity: 0,
          duration: 1000,
          easing: 'easeInOutSine',
        });

      };

      var detectScroll = () => {

        var _state;
        this.velocity > this.velocity_tresh || this.velocity < -this.velocity_tresh ? _state = true : _state = false;
        return _state;

      };

      var updateActive = () => {

        if (this.velocity > 0) {
          // Scroll up
          this.active - 1 < 0 ? this.active = this.sections.length - 1 : this.active -= 1;
        } else if (this.velocity < 0) {
          // Scroll down
          this.active + 1 >= this.sections.length ? this.active = 0 : this.active += 1;
        }

      };

      var updateProgress = () => {

        ANIME({
          targets: this,
          progress: this.progress_anchor[this.getActive()],
          duration: 2000,
          easing: 'easeInOutSine',
          complete: () => {
            this.sections[this.getActive()].callEnter();
            this.setAnimationState(false);
          },
          update: () => {
            this.timeline.seek(this.progress);
          },
        });

      };

      var onScroll = () => {

        if ($('#scroll-trigger').length) {
          // Velocity
          calculateVelocity();
          updateVelocity();

          // Not animating
          if (!this.getAnimationState()) {

            if (detectScroll()) {

              this.setAnimationState(true);
              this.sections[this.getActive()].callLeave();
              updateActive();
              updateProgress();

            }

          }
        }

      }

      // Scroll listener
      window.addEventListener('mousewheel', (e) => {

        // Get deltaY
        this.deltaY = e.wheelDeltaY || e.deltaY * -1;

        // Reduce cause too fast
        this.deltaY *= 0.1;

        onScroll();

      }, false);

      // Touch listener
      window.addEventListener('touchstart', (e) => {

        var _t = (e.targetTouches) ? e.targetTouches[0] : e;
        this.touchStartY = _t.pageY;

      }, false);

      window.addEventListener('touchmove', (e) => {

        var _t = (e.targetTouches) ? e.targetTouches[0] : e;

        // the multiply factor on mobile must be about 10x the factor applied on the wheel
        this.deltaY = (_t.pageY - this.touchStartY) * 5;
        this.touchStartY = _t.pageY;

        onScroll();

      }, false);

      // Resize update
      window.addEventListener('resize', () => {
        this.resizeUpdate();
      });

    }

    // Sections
    newSection(params) {

      var _name = params.name !== undefined ? params.name : this.sections.length;
      var _targetEnvironment = params.targetEnvironment !== undefined ? params.targetEnvironment : console.error('Target Environment needed to create a new Scrolly section.');
      var _enter = params.enter !== undefined ? params.enter : function (wait) {};
      var _wait = params.wait !== undefined ? params.wait : function () {};
      var _leave = params.leave !== undefined ? params.leave : function (wait) {};

      var _geo = new THREE.PlaneGeometry(1, 1);
      var _mat = new THREE.MeshPhongMaterial({
        map: _targetEnvironment.getTargetRenderer().texture,
      });
      var _mesh = new THREE.Mesh(_geo, _mat);
      _mesh.scale.x = UTILS.visibleWidthAtZDepth(0, this.environment.getCamera());
      _mesh.scale.y = UTILS.visibleHeightAtZDepth(0, this.environment.getCamera());
      this.environment.addObject('section-' + _name, _mesh);

      this.sections.push({
        name: _name,
        mesh: _mesh,
        enter: _enter,
        wait: _wait,
        leave: _leave,
        callEnter: () => {
          _enter(_wait);
        },
        callLeave: () => {
          _leave(_wait);
        },
      });

    }

    build() {

      var _distance = 100 / this.sections.length;
      var _duration = _distance;
      var _windowHeight = UTILS.visibleHeightAtZDepth(0, this.environment.getCamera());

      // Set progress anchor
      for (var i = 0; i < this.sections.length; i++) {
        this.progress_anchor.push(_distance * i);
      }

      // First section
      // Down
      this.timeline.add({
        targets: this.sections[0].mesh.position,
        y: [0, _windowHeight],
        duration: _duration,
        autoplay: false,
      }, 0);
      // Up
      this.timeline.add({
        targets: this.sections[0].mesh.position,
        y: [-_windowHeight, 0],
        duration: _duration,
        autoplay: false,
      }, 100 - _distance);

      // Set other sections animations
      for (var i = 1; i < this.sections.length; i++) {
        var e = this.sections[i];

        this.timeline.add({
          targets: e.mesh.position,
          y: [0, _windowHeight],
          duration: _duration,
          autoplay: false,
        }, _distance * i);
        this.timeline.add({
          targets: e.mesh.position,
          y: [-_windowHeight, 0],
          duration: _duration,
          autoplay: false,
        }, _distance * (i - 1));

      }

      // Reset sections positions
      for (var i = 1; i < this.sections.length; i++) {
        this.sections[i].mesh.position.y = -_windowHeight;
      }

    }

    start() {
      this.sections[this.active].callEnter();
    }

    // Getters
    getSections() {
      return this.sections;
    }

    getActive() {
      return this.active;
    }

    getVelocity() {
      return this.velocity;
    }

    getAnimationState() {
      return this.isAnimating;
    }

    // Setters
    setActive(active) {
      this.active = active;
    }

    setVelocity(velocity) {
      this.velocity = velocity;
    }

    setAnimationState(boolean) {
      this.isAnimating = boolean;
    }

    // Event
    resizeUpdate() {

      this.sections.forEach(e => {
        e.mesh.scale.x = UTILS.visibleWidthAtZDepth(0, this.environment.getCamera());
        e.mesh.scale.y = UTILS.visibleHeightAtZDepth(0, this.environment.getCamera());
      });

    }

  }

  /* ============================================================= */

  /**
   * Exports
   */
  exports.Scrolly = Scrolly;

})();