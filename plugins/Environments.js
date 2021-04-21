import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
  Vector2,
} from 'three';

import * as THREE from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import {
  EffectComposer
} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {
  RenderPass
} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {
  UnrealBloomPass
} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {
  ShaderPass
} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {
  FXAAShader
} from 'three/examples/jsm/shaders/FXAAShader.js';
import {
  BokehPass
} from 'three/examples/jsm/postprocessing/BokehPass.js';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

var DefaultScene = (function () {

  return new Scene();

});

var DefaultCamera = (function () {

  return new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

});

var DefaultRenderer = (function (canvas) {

  var _renderer = null;
  if (canvas) {
    _renderer = new WebGLRenderer({
      // alpha: true,
      canvas: canvas,
      antialias: true,
    });
  } else {
    _renderer = new WebGLRenderer({
      // alpha: true,
      antialias: true,
    });
  }
  _renderer.setSize(window.innerWidth, window.innerHeight);
  _renderer.setPixelRatio(window.devicePixelRatio);
  _renderer.gammaFactor = 2.2;
  _renderer.physicallyCorrectLights = true;
  // _renderer.outputEncoding = sRGBEncoding;
  return _renderer;

});

var ViewSize = (function (camera) {

  var _fovInRadians = (camera.fov * Math.PI) / 180;
  return Math.abs(camera.position.z * Math.tan(_fovInRadians / 2) * 2);

});

/* ============================================================= */

class Storage {

  constructor() {

    // -------- PARAMETERS -------- //

    this.items = [];

  }

  // -------- METHODS -------- //

  add(label, content) {

    // Transfer items to block references
    var _items = [];
    _items = _items.concat(this.items);

    // Add new item
    _items.push({
      label: label,
      content: content,
    });

    // Assign
    this.items = _items;

  }

  get(label) {

    // Return asset value with corresponding label
    var output = this.items.find(e => e.label === label);
    return output.content;

  }

  // -------- GETTERS -------- //

  get items() {

    return this._items;

  }

  // -------- SETTERS -------- //

  set items(array) {

    this._items = array;
    
  }

}

/* ============================================================= */

class Primary {

  constructor({
    canvas = null,
    orbitControls = true,
    postProcessing = true,
    bloomSettings = {
      strength: 2,
      radius: 0.4,
      threshold: 0,
    },
    bokehSettings = {
      focus: 1000,
      aperture: 1,
      maxBlur: 0.01,
    },
  }) {

    // -------- PARAMETERS -------- //

    this.storage = new Storage();
    this.GL = {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
    };
    this.POST = {
      composer: null,
      render: null,
      bloom: null,
      bokeh: null,
      fxaa: null,
    };
    this.RAF = null;

    // Setup booleans
    this.canvas = canvas;
    this.orbitControls = orbitControls;
    this.postProcessing = postProcessing;

    // Post-processing settings
    this.bloomSettings = bloomSettings;
    this.bokehSettings = bokehSettings;

    // Events (user specified)
    this.onMount = null;
    this.onUnmount = null;
    this.onResize = null;
    this.onRender = null;
    this.onEnter = null;
    this.onLeave = null;

  }

  // -------- METHODS -------- //

  mount(container) {

    // Setup GL
    this.GL.scene = DefaultScene();
    this.GL.camera = DefaultCamera();
    this.GL.renderer = DefaultRenderer(this.canvas);
    // Orbit controls (update called later)
    this.orbitControls ? this.GL.controls = new OrbitControls(this.GL.camera, this.GL.renderer.domElement) : null;

    // Post-processing
    if (this.postProcessing) {

      var rendererSize = new Vector2(0, 0);
      this.GL.renderer.getSize(rendererSize);

      // Render pass
      this.POST.render = new RenderPass(this.GL.scene, this.GL.camera);

      // Bloom pass
      this.POST.bloom = new UnrealBloomPass( new Vector2(rendererSize.x, rendererSize.y), this.bloomSettings.strength, this.bloomSettings.radius, this.bloomSettings.threshold);

      // Bokeh pass
      this.POST.bokeh = new BokehPass( this.GL.scene, this.GL.camera, {
        focus: this.bokehSettings.focus,
        aperture: this.bokehSettings.aperture,
        maxblur: this.bokehSettings.maxBlur,
        width: rendererSize.x,
        height: rendererSize.y,
      } );

      // Shader pass
      this.POST.fxaa = new ShaderPass( FXAAShader );
      var pixelRatio = this.GL.renderer.getPixelRatio();
      this.POST.fxaa.material.uniforms[ 'resolution' ].value.x = 1 / ( window.offsetWidth * pixelRatio );
			this.POST.fxaa.material.uniforms[ 'resolution' ].value.y = 1 / ( window.offsetHeight * pixelRatio );

      // Composing
      this.POST.composer = new EffectComposer(this.GL.renderer);
      this.POST.composer.addPass(this.POST.render);
      this.POST.composer.addPass(this.POST.bloom);
      // this.POST.composer.addPass(this.POST.bokeh);
      // this.POST.composer.addPass(this.POST.fxaa);

    }

    // Add resize event
    window.addEventListener('resize', this.resizeUpdate.bind(this));

    // Call user specified logic
    this.onMount ? this.onMount({env: this, three: THREE}) : null;

    // Orbit controls update (after manual camera modifications)
    this.orbitControls ? this.GL.controls.update() : null;

    // Start render
    this.render();

    // Add canvas to HTML
    !this.canvas ? container.appendChild(this.GL.renderer.domElement) : null;

  }

  unmount() {

    // Call user specified logic
    this.onUnmount ? this.onUnmount({env: this, three: THREE}) : null;

    // Stop render
    this.RAF ? cancelAnimationFrame(this.RAF) : null;

    // Remove resize event
    window.removeEventListener('resize', this.resizeUpdate.bind(this));

    // Clear memory
    this.GL.scene = null;
    this.GL.camera = null;
    this.GL.renderer = null;
    this.RAF = null;

  }

  add(label, object) {

    // Add object to scene
    object.name = label;
    this.GL.scene.add(object);

  }

  get(label) {

    // Find object by name
    return this.GL.scene.getObjectByName(label);

  }

  resizeUpdate() {

    var rendererSize = new Vector2(0, 0);
    this.GL.renderer.getSize(rendererSize);

    // Resize renderer
    this.GL.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Resize composer
    if (this.postProcessing) {
      this.POST.composer.setSize(window.innerWidth, window.innerHeight);
      var pixelRatio = this.GL.renderer.getPixelRatio();
      this.POST.fxaa.material.uniforms[ 'resolution' ].value.x = 1 / ( this.GL.renderer.domElement.offsetWidth * pixelRatio );
			this.POST.fxaa.material.uniforms[ 'resolution' ].value.y = 1 / ( this.GL.renderer.domElement.offsetHeight * pixelRatio );
    }

    // Resize camera
    this.GL.camera.aspect = rendererSize.x / rendererSize.y;
    this.GL.camera.updateProjectionMatrix();

    // Call user specified logic
    this.onResize ? this.onResize({env: this, three: THREE}) : null;

  }

  render() {

    // Call user specified logic
    this.onRender ? this.onRender({env: this, three: THREE}) : null;

    // Render
    this.postProcessing ? this.POST.composer.render() : this.GL.renderer.render(this.GL.scene, this.GL.camera);

    // Set render loop
    this.RAF = requestAnimationFrame(this.render.bind(this));

  }

  renderTarget(target_environment) {

    // Render specific target
    this.GL.renderer.setRenderTarget(target_environment.renderer);
    this.GL.renderer.render(target_environment.scene, target_environment.camera);
    this.GL.renderer.setRenderTarget(null);

  }

  enter(callback) {

    // Callback function ?
    typeof callback !== 'function' ? callback = function() {} : null;

    // Call user specified logic
    this.onEnter ? this.onEnter({env: this, three: THREE, done: callback}) : callback;

  }

  leave(callback) {

    // Callback function ?
    typeof callback !== 'function' ? callback = function() {} : null;

    // Call user specified logic
    this.onLeave ? this.onLeave({env: this, three: THREE, done: callback}) : callback;

  }

  // -------- GETTERS -------- //

  // None

  // -------- SETTERS -------- //

  // None

}

/* ============================================================= */

class Secondary {

  constructor() {

    // -------- PARAMETERS -------- //

    this.assets = [];
    this.GL = null;

  }

  // -------- METHODS -------- //

  mount = function (container) {
    contaier.appendChild(this.env.renderer.domElement);
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
const Environments = {
  Primary: Primary,
  Secondary: Secondary,
}
// const Environments = {
//   reel: new Primary,
//   projects: new Primary,
//   cloner: new Secondary,
//   test: new Secondary,
// }

export default ({
  app
}, inject) => {
  inject('environments', Environments);
}