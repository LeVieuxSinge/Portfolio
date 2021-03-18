import {
  BackSide,
  BoxBufferGeometry,
  BoxGeometry,
  Color,
  DoubleSide,
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneBufferGeometry,
  PlaneGeometry
} from 'three';
import * as Utils from '../Utils/Utils';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class Geometry {

  constructor(params) {

    // -------- PARAMETERS -------- //

    // General settings
    var _position = params.position !== undefined ? params.position : [0, 0, 0];
    var _rotation = params.rotation !== undefined ? params.rotation : [0, 0, 0];

    // Geometry settings
    var _type = params.type !== undefined ? params.type : 'box';
    var _buffer = params.buffer !== undefined ? params.buffer : false;
    var _width = params.width !== undefined ? params.width : 1;
    var _height = params.height !== undefined ? params.height : 1;
    var _depth = params.depth !== undefined ? params.depth : 1;
    var _widSeg = params.widSeg !== undefined ? params.widSeg : 1;
    var _heiSeg = params.heiSeg !== undefined ? params.heiSeg : 1;
    var _depSeg = params.depSeg !== undefined ? params.depSeg : 1;

    // Material settings
    var _material = params.material !== undefined ? params.material : 'basic';
    var _color = params.color !== undefined ? params.color : 0xffffff;
    var _side = params.side !== undefined ? params.side : 'double';

    // Mesh settings
    var _castShadow = params.castShadow !== undefined ? params.castShadow : false;
    var _receiveShadow = params.receiveShadow !== undefined ? params.receiveShadow : false;

    // -------- INIT -------- //

    // Geometry
    var _geo;

    if (!_buffer) {

      switch (_type) {
        case 'box':
          _geo = new BoxGeometry(_width, _height, _depth, _widSeg, _heiSeg, _depSeg);
          break;
        case 'plane':
          _geo = new PlaneGeometry(_width, _height, _widSeg, _heiSeg);
          break;
      }

    } else {

      switch (_type) {
        case 'box':
          _geo = new BoxBufferGeometry(_width, _height, _depth, _widSeg, _heiSeg, _depSeg);
          break;
        case 'plane':
          _geo = new PlaneBufferGeometry(_width, _height, _widSeg, _heiSeg);
          break;
      }

    }

    // Material
    var _mat;

    switch (_material) {
      case 'basic':
        _mat = new MeshBasicMaterial();
        break;
      case 'phong':
        _mat = new MeshPhongMaterial();
        break;
      case 'physical':
        _mat = new MeshPhysicalMaterial();
        break;
      case 'standard':
        _mat = new MeshStandardMaterial();
        break;
    }

    // Material Color
    _mat.color = new Color(_color);

    // Material Side
    switch (_side) {
      case 'front':
        _mat.side = FrontSide;
        break;
      case 'back':
        _mat.side = BackSide;
        break;
      case 'double':
        _mat.side = DoubleSide;
        break;
    }

    // Mesh
    var _mesh = new Mesh(_geo, _mat);

    // Shadows
    _castShadow ? _mesh.castShadow = true : _mesh.castShadow = false;
    _receiveShadow ? _mesh.receiveShadow = true : _mesh.receiveShadow = false;

    // Position
    _mesh.position.x = _position[0];
    _mesh.position.y = _position[1];
    _mesh.position.z = _position[2];

    // Rotation
    _mesh.rotation.x = Utils.degToRad(_rotation[0]);
    _mesh.rotation.y = Utils.degToRad(_rotation[1]);
    _mesh.rotation.z = Utils.degToRad(_rotation[2]);

    // Update object transforms
    _mesh.updateMatrixWorld();

    // Return mesh
    return _mesh;

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
  Geometry,
}