import {
  AmbientLight,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
  Vector2
} from 'three';
import * as Utils from '../Utils/Utils';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class Light {

  constructor(params) {

    // -------- PARAMETERS -------- //

    // General settings
    var _scene = params.scene !== undefined ? params.scene : false;
    var _position = params.position !== undefined ? params.position : [0, 0, 0];
    var _rotation = params.rotation !== undefined ? params.rotation : [0, 0, 0];

    // Light settings
    var _type = params.type !== undefined ? params.type : 'point';
    var _color = params.color !== undefined ? params.color : 0xffffff;
    var _intensity = params.intensity !== undefined ? params.intensity : 1;
    var _decay = params.decay !== undefined ? params.decay : 1;
    var _distance = params.distance !== undefined ? params.distance : 0;
    var _angle = params.angle !== undefined ? params.angle : Math.PI / 2;
    var _penumbra = params.penumbra !== undefined ? params.penumbra : 0;

    // Shadow settings
    var _castShadow = params.castShadow !== undefined ? params.castShadow : false;
    var _shadow_mapSize = params.mapSize !== undefined ? params.mapSize : [512, 512];
    var _shadow_radius = params.mapRadius !== undefined ? params.mapRadius : 1;
    var _shadow_clipSize = params.clipSize !== undefined ? params.clipSize : 10;
    var _shadow_helper = params.shadowHelper !== undefined ? params.shadowHelper : false;

    // Target settings
    var _target = params.target !== undefined ? params.target : false;

    // Helper settings
    var _helper = params.helper !== undefined ? params.helper : false;
    var _helper_size = params.helperSize !== undefined ? params.helperSize : 1;
    var _helper_color = params.helperColor !== undefined ? params.helperColor : _color;

    // -------- INIT -------- //

    // Light
    var _light;

    switch (_type) {
      case 'point':
        _light = new PointLight(_color, _intensity, _distance, _decay);
        break;
      case 'ambient':
        _light = new AmbientLight(_color, _intensity);
        break;
      case 'directional':
        _light = new DirectionalLight(_color, _intensity);
        break;
      case 'spot':
        _light = new SpotLight(_color, _intensity, _distance, _angle, _penumbra, _decay);
        break;
      case 'hemisphere':
        _light = new HemisphereLight(_color, _color, _intensity);
        break;
    }

    // Shadow
    if (_light.castShadow !== undefined) {
      _castShadow ? _light.castShadow = true : _light.castShadow = false;
    }
    if (_light.shadow !== undefined) {
      _light.shadow.mapSize = new Vector2(_shadow_mapSize[0], _shadow_mapSize[1]);
      _light.shadow.radius = _shadow_radius;
      _light.shadow.camera.top = _shadow_clipSize;
      _light.shadow.camera.right = -_shadow_clipSize;
      _light.shadow.camera.bottom = -_shadow_clipSize;
      _light.shadow.camera.left = _shadow_clipSize;
    }

    // Shadow helper
    if (_shadow_helper) {

      // Add shadow helper
      var _helper_object = new CameraHelper(_light.shadow.camera);
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
          _helper_object = new PointLightHelper(_light, _helper_size, _helper_color);
          break;
        case 'directional':
          _helper_object = new DirectionalLightHelper(_light, _helper_size, _helper_color);
          break;
        case 'spot':
          _helper_object = new SpotLightHelper(_light, _helper_color);
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
    _light.rotation.x = Utils.degToRad(_rotation[0]);
    _light.rotation.y = Utils.degToRad(_rotation[1]);
    _light.rotation.z = Utils.degToRad(_rotation[2]);

    // Update object transforms
    _light.updateMatrixWorld();

    // Return light
    return _light;

  }

  // -------- METHODS -------- //

  // None

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
  Light,
}