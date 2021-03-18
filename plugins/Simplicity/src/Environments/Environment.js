import {
  WebGLRenderer
} from 'three';
import {
  Basics
} from './Basics';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

var DefaultRenderer = (function (canvas) {

  var _renderer;

  if (canvas) {

    _renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas,
    });

  } else {

    _renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });

  }

  _renderer.setSize(window.innerWidth, window.innerHeight);
  _renderer.setPixelRatio(window.devicePixelRatio);
  return _renderer;

});

/* ============================================================= */

class Environment extends Basics {

  constructor(params) {

    // -------- PARAMETERS -------- //

    var _params = params !== undefined ? params : {};

    super(_params);
    this.canvas = _params.canvas !== undefined ? _params.canvas : false;
    this.renderer = _params.renderer !== undefined ? _params.renderer : DefaultRenderer(this.canvas);

    // -------- AUTO EVENTS -------- //

    window.addEventListener('resize', () => {

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

    });

  }

  // -------- METHODS -------- //

  // Render
  render() {

    this.renderer.render(this.scene, this.camera);

  }

  renderTarget(target_environment) {

    this.renderer.setRenderTarget(target_environment.renderer);
    this.renderer.render(target_environment.scene, target_environment.camera);
    this.renderer.setRenderTarget(null);

  }

  // Mount
  mount(container) {
    container.appendChild(this.renderer.domElement);
  }

  // -------- GETTERS -------- //

  get canvas() {

    return this._canvas;

  }

  get renderer() {

    return this._renderer;

  }

  // -------- SETTERS -------- //

  set canvas(value) {

    this._canvas = value;

  }

  set renderer(value) {

    this._renderer = value;

  }

}

/* ============================================================= */

/**
 * Exports
 */
export {
  Environment,
}