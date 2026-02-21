/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class ShowcaseGrab {

  constructor(params) {

    // -------- PARAMETERS -------- //

    var _params = params !== undefined ? params : {};

    this.onGrabStart = _params.onGrabStart !== undefined ? _params.onGrabStart : function () {};
    this.onGrabMove = _params.onGrabMove !== undefined ? _params.onGrabMove : function () {};
    this.onGrabEnd = _params.onGrabEnd !== undefined ? _params.onGrabEnd : function () {};
    this.scroll = {
      start: 0,
      current: 0,
      initial: 0
    };

    // Events
    this.listen("mousedown", this.onMouseDown.bind(this));
    this.listen("mousemove", this.onMouseMove.bind(this));
    this.listen("mouseup", this.onMouseUp.bind(this));

    this.listen("touchstart", this.onMouseDown.bind(this), true);
    this.listen("touchmove", this.onMouseMove.bind(this), true);
    this.listen(["touchend", "touchcancel"], this.onMouseUp.bind(this), true);

    this.debug = _params.debug !== undefined ? _params.debug : false;

  }

  // -------- METHODS -------- //

  listen(events, grabListener, isTouch) {
    let mouseListener = function (ev) {
      if (ev.type === "mouseout" && ev.relatedTarget != null) return;
      grabListener({
        y: ev.clientY
      });
    };

    let touchListener = function (ev) {
      // if (ev.type === "touchend") {
      //   throw new Error(ev.targetTouches);
      // }
      ev.preventDefault();
      grabListener({
        y: ev.targetTouches[0] ? ev.targetTouches[0].clientY : null
      });
    };
    let listener = mouseListener;
    if (isTouch) {
      listener = touchListener;
    }
    if (Array.isArray(events)) {
      for (let i = 0; i < events.length; i++) {
        window.addEventListener(events[i], listener, false);
      }
    } else {
      window.addEventListener(events, listener, false);
    }
  }

  onMouseDown(position) {
    this.scroll.inital = this.scroll.current;

    this.scroll.start = position.y;
    this.scroll.current = position.y;
    this.scroll.delta = this.scroll.current - this.scroll.start;

    this.onGrabStart({
      delta: this.scroll.delta,
      direction: Math.abs(this.scroll.delta),
      current: this.scroll.current,
      start: this.scroll.start
    });
  }

  onMouseMove(position) {
    if (this.scroll.start) {
      this.scroll.current = position.y;
      this.scroll.delta = this.scroll.current - this.scroll.start;

      this.onGrabMove({
        delta: this.scroll.delta,
        direction: Math.abs(this.scroll.delta),
        current: this.scroll.current,
        start: this.scroll.start
      });
    }
  }
  
  onMouseUp() {
    if (this.scroll.start) {
      this.onGrabEnd({
        delta: this.scroll.delta,
        direction: Math.abs(this.scroll.delta),
        current: this.scroll.current,
        start: this.scroll.start
      });

      this.scroll.start = null;
      this.scroll.current = null;
      this.scroll.delta = null;
    }
  }

  // -------- GETTERS -------- //

  get viewSize() {
    var fovInRadians = (this.environment.camera.fov * Math.PI) / 180;
    return Math.abs(this.camera.position.z * Math.tan(fovInRadians / 2) * 2);
  }

  get planeSize() {
    var viewSize = this.viewSize;
    return {
      width: viewSize * 1.5,
      height: viewSize,
    };
  }

  // -------- SETTERS -------- //

  // None

}

/* ============================================================= */

/**
 * Exports
 */
export {
  ShowcaseGrab,
}