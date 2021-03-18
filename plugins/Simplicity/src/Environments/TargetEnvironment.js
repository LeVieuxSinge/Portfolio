import {
  WebGLRenderTarget
} from 'three';
import {
  Basics
} from './Basics';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// Renderer
var DefaultTargetRenderer = (function () {

  var _renderer;
  _renderer = new WebGLRenderTarget(window.innerWidth, window.innerHeight);
  _renderer.setSize(window.innerWidth, window.innerHeight);
  return _renderer;

});

/* ============================================================= */

class TargetEnvironment extends Basics {

  constructor(params) {

    // -------- PARAMETERS -------- //

    var _params = params !== undefined ? params : {};

    super(_params);
    this.renderer = _params.renderer !== undefined ? _params.renderer : DefaultTargetRenderer();

    // -------- AUTO EVENTS -------- //

    window.addEventListener('resize', () => {

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

    });


  }

  // -------- METHODS -------- //

  // None

  // -------- GETTERS -------- //

  get renderer() {

    return this.renderer;

  }

  // -------- SETTERS -------- //

  set renderer(value) {

    this._renderer = value;

  }

}

/* ============================================================= */

/**
 * Exports
 */
export {
  TargetEnvironment,
}