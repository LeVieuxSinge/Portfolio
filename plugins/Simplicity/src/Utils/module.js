import * as THREE from 'three';
import * as UTILS from './Utils';
import ANIME from 'animejs';

/**
 * SimpliciT.js v1.0a
 * Updated on May 29, 2020
 * by Xavier Champoux
 * No license
 * leiveuxsinge.github.io/portfolio/
 */
var SimpliciT = (function () {

  'use strict';

  var _environments = [];
  var _scrolly;

  // -------- METHODS -------- //

  // Environment
  var newEnvironment = (function (params) {

    // -------- METHODS -------- //

    // Canvas
    var getCanvas = (function () {

      return _canvas;

    });

    var setCanvas = (function (new_canvas) {

      _canvas = new_canvas;

    });

    // Render
    var newWebGLRender = (function (canvas) {

      var _new_render;

      if (canvas !== undefined || canvas !== false) {

        _new_render = new THREE.WebGLRenderer({
          antialias: true,
          canvas: canvas,
        });

      } else {

        _new_render = new THREE.WebGLRenderer({
          antialias: true,
        });

      }

      _new_render.setSize(window.innerWidth, window.innerHeight);
      _new_render.setPixelRatio(window.devicePixelRatio);
      return _new_render;

    });

    var newWebGLTargetRender = (function () {

      var _new_render = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
      _new_render.setSize(window.innerWidth, window.innerHeight);
      return _new_render;

    });

    var getRenderer = (function () {

      return _renderer;

    });

    var setRenderer = (function (new_renderer) {

      _renderer = new_renderer;

    });

    var render = (function () {

      _renderer.render(_scene, _camera);

    });

    var renderTarget = (function (target_environment) {

      _renderer.setRenderTarget(target_environment.getRenderer());
      _renderer.render(target_environment.getScene(), target_environment.getCamera());
      _renderer.setRenderTarget(null);

    });

    // Scene
    var newScene = (function () {

      var new_scene = new THREE.Scene();
      new_scene.background = new THREE.Color(0x000000); // Default Background
      return new_scene;

    });

    var getScene = (function () {

      return _scene;

    });

    var setScene = (function (new_scene) {

      _scene = new_scene;

    });

    // Camera
    var newCamera = (function () {

      var new_camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.2, 2000);
      return new_camera;

    });

    var getCamera = (function () {

      return _camera;

    });

    var setCamera = (function (new_camera) {

      _camera = new_camera;

    });

    // Object
    var newMesh = (function (params) {

      // -------- PARAMETERS -------- //

      // General settings
      var _position = params.position !== undefined ? params.position : [0, 0, 0],
        _rotation = params.rotation !== undefined ? params.rotation : [0, 0, 0];

      // Geometry settings
      var _type = params.type !== undefined ? params.type : 'box',
        _buffer = params.buffer !== undefined ? params.buffer : false,
        _width = params.width !== undefined ? params.width : 1,
        _height = params.height !== undefined ? params.height : 1,
        _depth = params.depth !== undefined ? params.depth : 1,
        _widSeg = params.widSeg !== undefined ? params.widSeg : 1,
        _heiSeg = params.heiSeg !== undefined ? params.heiSeg : 1,
        _depSeg = params.depSeg !== undefined ? params.depSeg : 1;

      // Material settings
      var _material = params.material !== undefined ? params.material : 'basic',
        _color = params.color !== undefined ? params.color : 0xffffff,
        _side = params.side !== undefined ? params.side : 'double';

      // Mesh settings
      var _castShadow = params.castShadow !== undefined ? params.castShadow : false,
        _receiveShadow = params.receiveShadow !== undefined ? params.receiveShadow : false;

      // -------- INIT -------- //

      // Geometry
      var _geo;

      if (!_buffer) {

        switch (_type) {
          case 'box':
            _geo = new THREE.BoxGeometry(_width, _height, _depth, _widSeg, _heiSeg, _depSeg);
            break;
          case 'plane':
            _geo = new THREE.PlaneGeometry(_width, _height, _widSeg, _heiSeg);
            break;
        }

      } else {

        switch (_type) {
          case 'box':
            _geo = new THREE.BoxBufferGeometry(_width, _height, _depth, _widSeg, _heiSeg, _depSeg);
            break;
          case 'plane':
            _geo = new THREE.PlaneBufferGeometry(_width, _height, _widSeg, _heiSeg);
            break;
        }

      }

      // Material
      var _mat;

      switch (_material) {
        case 'basic':
          _mat = new THREE.MeshBasicMaterial();
          break;
        case 'phong':
          _mat = new THREE.MeshPhongMaterial();
          break;
        case 'physical':
          _mat = new THREE.MeshPhysicalMaterial();
          break;
        case 'standard':
          _mat = new THREE.MeshStandardMaterial();
          break;
      }

      _mat.color = new THREE.Color(_color);

      switch (_side) {
        case 'front':
          _mat.side = THREE.FrontSide;
          break;
        case 'back':
          _mat.side = THREE.BackSide;
          break;
        case 'double':
          _mat.side = THREE.DoubleSide;
          break;
      }

      // Mesh
      var _mesh = new THREE.Mesh(_geo, _mat);

      // Shadows
      _castShadow ? _mesh.castShadow = true : _mesh.castShadow = false;
      _receiveShadow ? _mesh.receiveShadow = true : _mesh.receiveShadow = false;

      // Position
      _mesh.position.x = _position[0];
      _mesh.position.y = _position[1];
      _mesh.position.z = _position[2];

      // Rotation
      _mesh.rotation.x = UTILS.degToRad(_rotation[0]);
      _mesh.rotation.y = UTILS.degToRad(_rotation[1]);
      _mesh.rotation.z = UTILS.degToRad(_rotation[2]);

      // Update object transforms
      _mesh.updateMatrixWorld();

      // Return mesh
      return _mesh;

    });

    var newLight = (function (params) {

      // -------- PARAMETERS -------- //

      // General settings
      var _position = params.position !== undefined ? params.position : [0, 0, 0],
        _rotation = params.rotation !== undefined ? params.rotation : [0, 0, 0];

      // Light settings
      var _type = params.type !== undefined ? params.type : 'point',
        _color = params.color !== undefined ? params.color : 0xffffff,
        _intensity = params.intensity !== undefined ? params.intensity : 1,
        _decay = params.decay !== undefined ? params.decay : 1,
        _distance = params.distance !== undefined ? params.distance : 0,
        _angle = params.angle !== undefined ? params.angle : Math.PI / 2,
        _penumbra = params.penumbra !== undefined ? params.penumbra : 0;

      // Shadow settings
      let _castShadow = params.castShadow !== undefined ? params.castShadow : false,
        _shadow_mapSize = params.mapSize !== undefined ? params.mapSize : [512, 512],
        _shadow_radius = params.mapRadius !== undefined ? params.mapRadius : 1,
        _shadow_clipSize = params.clipSize !== undefined ? params.clipSize : 10,
        _shadow_helper = params.shadowHelper !== undefined ? params.shadowHelper : false;

      // Target settings
      var _target = params.target !== undefined ? params.target : false;

      // Helper settings
      var _helper = params.helper !== undefined ? params.helper : false,
        _helper_size = params.helperSize !== undefined ? params.helperSize : 1,
        _helper_color = params.helperColor !== undefined ? params.helperColor : _color;

      // -------- INIT -------- //

      // Light
      var _light;

      switch (_type) {
        case 'point':
          _light = new THREE.PointLight(_color, _intensity, _distance, _decay);
          break;
        case 'ambient':
          _light = new THREE.AmbientLight(_color, _intensity);
          break;
        case 'directional':
          _light = new THREE.DirectionalLight(_color, _intensity);
          break;
        case 'spot':
          _light = new THREE.SpotLight(_color, _intensity, _distance, _angle, _penumbra, _decay);
          break;
      }

      // Shadow
      _castShadow ? _light.castShadow = true : _light.castShadow = false;
      _light.shadow.mapSize = new THREE.Vector2(_shadow_mapSize[0], _shadow_mapSize[1]);
      _light.shadow.radius = _shadow_radius;
      _light.shadow.camera.top = _shadow_clipSize;
      _light.shadow.camera.right = -_shadow_clipSize;
      _light.shadow.camera.bottom = -_shadow_clipSize;
      _light.shadow.camera.left = _shadow_clipSize;

      // Shadow helper
      if (_shadow_helper) {

        // Add shadow helper
        var _helper_object = new THREE.CameraHelper(_light.shadow.camera);
        _scene.add(_helper_object);
        _helper_object.updateMatrixWorld();

      }

      // Target
      if (_target) {

        // Add target
        _light.target = _target;
        _scene.add(_light.target);
        _light.target.updateMatrixWorld();

      }

      // Helper
      var _helper_object;

      if (_helper) {

        switch (_type) {
          case 'point':
            _helper_object = new THREE.PointLightHelper(_light, _helper_size, _helper_color);
            break;
          case 'directional':
            _helper_object = new THREE.DirectionalLightHelper(_light, _helper_size, _helper_color);
            break;
          case 'spot':
            _helper_object = new THREE.SpotLightHelper(_light, _helper_color);
            break;
        }

        // Add helper
        _scene.add(_helper_object);
        _helper_object.updateMatrixWorld();

      }

      // Position
      _light.position.x = _position[0];
      _light.position.y = _position[1];
      _light.position.z = _position[2];

      // Rotation
      _light.rotation.x = UTILS.degToRad(_rotation[0]);
      _light.rotation.y = UTILS.degToRad(_rotation[1]);
      _light.rotation.z = UTILS.degToRad(_rotation[2]);

      // Update object transforms
      _light.updateMatrixWorld();

      // Return light
      return _light;

    });

    var addObject = (function (object_name, object) {

      object.name = object_name;
      _scene.add(object);

    });

    var getObject = (function (object_name) {

      return _scene.getObjectByName(object_name);

    });

    // Event
    var resizeUpdate = (function () {

      _renderer.setSize(window.innerWidth, window.innerHeight);
      _camera.aspect = window.innerWidth / window.innerHeight;
      _camera.updateProjectionMatrix();

    });

    // -------- PARAMETERS -------- //

    var _canvas = params.canvas !== undefined ? params.canvas : false,
      _type = params.type !== undefined ? params.type : "WebGL",
      _target = params.target !== undefined ? params.target : false,
      _renderer = params.renderer !== undefined ? params.renderer : false,
      _scene = params.scene !== undefined ? params.scene : newScene(),
      _camera = params.camera !== undefined ? params.camera : newCamera();

    // -------- INIT -------- //

    if (!_renderer) {

      _type === 'WebGL' && !_target ? _renderer = newWebGLRender(_canvas) :
        _type === 'WebGL' && _target ? _renderer = newWebGLTargetRender(_canvas) : null;

    }

    // Resize update
    window.addEventListener('resize', () => {
      resizeUpdate();
    });

    // -------- OUTPUT -------- //

    return {

      // Canvas
      getCanvas: getCanvas,
      setCanvas: setCanvas,

      // Renders
      newWebGLRender: newWebGLRender,
      newWebGLTargetRender: newWebGLTargetRender,
      getRenderer: getRenderer,
      setRenderer: setRenderer,
      render: render,
      renderTarget: renderTarget,

      // Scene
      newScene: newScene,
      getScene: getScene,
      setScene: setScene,

      // Camera
      newCamera: newCamera,
      getCamera: getCamera,
      setCamera: setCamera,

      // Object
      newMesh: newMesh,
      newLight: newLight,
      addObject: addObject,
      getObject: getObject,

      // Event
      resizeUpdate: resizeUpdate,

    }

  });

  var addEnvironment = (function (params) {

    _environments.push(newEnvironment(params));

  });

  var getEnvironment = (function (environment_index) {

    return _environments[environment_index];

  });

  // Render
  var renderEnvironment = (function (environment_index) {

    if (environment_index !== undefined) {

      _environments[environment_index].render();

    } else {

      // !ERROR

    }

  });

  var renderEnvironments = (function () {

    _environments.forEach(e => {

      e.render();

    });

  });

  // Object
  var addObject = (function (environment_index, object_name, object) {

    _environments[environment_index].addObject(object_name, object);

  });

  var getObject = (function (environment_index, object_name) {

    return _environments[environment_index].getObject(object_name);

  });

  // Scrolly
  var newScrolly = (function (params) {

    // -------- METHODS -------- //

    // Routes
    var redirect = (function () {

      _router.push(_routes[_active]);

    });

    // Velocity
    var calculateVelocity = (function (e) {

      // Get deltaY
      _deltaY = e.wheelDeltaY || e.deltaY * -1;

      // Reduce cause too fast
      _deltaY *= 0.1;

      // Calculate velocity
      _velocity += _deltaY;

    });

    var updateVelocity = (function () {

      // Drag velocity to 0
      ANIME({
        targets: _velocity,
        value: 0,
        duration: 1000,
        easing: 'easeInOutSine',
      });

    });

    var detectScroll = (function () {

      var _state;
      _velocity > _velocity_tresh || _velocity < -_velocity_tresh ? _state = true : _state = false;
      return _state;

    });

    var updateActive = (function () {

      if (_velocity > 0) {
        // Scroll up
        _active - 1 < 0 ? _active = _routes.length - 1 : _active -= 1;
      } else if (_velocity < 0) {
        // Scroll down
        _active + 1 >= _routes.length ? _active = 0 : _active += 1;
      }

    });

    // Getters
    var getRouter = (function() {

      return _router;

    });

    var getRoutes = (function() {

      return _routes;

    });

    var getActive = (function () {

      return _active;

    });

    var getAnimationState = (function () {

      return _isAnimating;

    });

    var getVelocity = (function () {

      return _velocity;

    });

    // Setters
    var setRouter = (function (new_router) {

      _router = new_router;

    });

    var setRoutes = (function(new_routes) {

      _routes = new_routes;

    });

    var setActive = (function (new_active) {

      _active = new_active;

    });

    var setAnimationState = (function (new_boolean) {

      _isAnimating = new_boolean;

    });

    // -------- PARAMETERS -------- //

    // Build parameters
    var _router = params.router !== undefined ? params.router : null,
      _routes = params.routes !== undefined ? params.routes : ['/'],
      _active = params.active !== undefined ? params.active : 0,
      _velocity_tresh = params.threshold !== undefined ? params.threshold : 20;

    // Scroll data
    var _deltaY = 0,
      _velocity = 0,
      _isAnimating = false;

    // -------- INIT -------- //

    // Scroll listener
    window.addEventListener('mousewheel', (e) => {

      // Velocity
      calculateVelocity(e);
      updateVelocity();

      // Not animating
      if (!getAnimationState()) {

        if (detectScroll()) {

          setAnimationState(true);
          updateActive();
          redirect();

        }

      }

    }, false);

    // Touch listener (TO_DO)

    // -------- OUTPUT -------- //

    _scrolly = {

      // Getters
      getRouter: getRouter,
      getRoutes: getRoutes,
      getActive: getActive,
      getAnimationState: getAnimationState,
      getVelocity: getVelocity,

      // Setters
      setRouter: setRouter,
      setRoutes: setRoutes,
      setActive: setActive,
      setAnimationState: setAnimationState,

    };

  });

  var getScrolly = (function (params) {

    return _scrolly;

  });

  // -------- OUTPUT -------- //

  return {

    // Environment
    newEnvironment: newEnvironment,
    addEnvironment: addEnvironment,
    getEnvironment: getEnvironment,

    // Render
    renderEnvironment: renderEnvironment,
    renderEnvironments: renderEnvironments,

    // Object
    addObject: addObject,
    getObject: getObject,

    // Scrolly
    newScrolly: newScrolly,
    getScrolly: getScrolly,

  }

});

/* ============================================================= */

/**
 * Exports
 */

export {
  SimpliciT,
};

/* ============================================================= */
