import {
  PerspectiveCamera,
  Scene
} from 'three';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

var DefaultCamera = (function () {

  return new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

});

var DefaultScene = (function () {

  return new Scene();

});

/* ============================================================= */

class Basics {

  constructor(params) {

    // -------- PARAMETERS -------- //

    var _params = params !== undefined ? params : {};

    this.camera = _params.camera !== undefined ? _params.camera : DefaultCamera();
    this.scene = _params.scene !== undefined ? _params.scene : DefaultScene();
    this.onShow = _params.onShow !== undefined ? _params.onShow : function () {};
    this.onHide = _params.onHide !== undefined ? _params.onHide : function () {};

  }

  // -------- METHODS -------- //

  // Object
  addObject(object_name, object) {

    object.name = object_name;
    this.scene.add(object);

  }

  getObject(object_name) {

    return this.scene.getObjectByName(object_name);

  }

  // -------- GETTERS -------- //

  get camera() {

    return this._camera;

  }

  get scene() {

    return this._scene;

  }

  // -------- SETTERS -------- //

  set camera(value) {

    this._camera = value;

  }

  set scene(value) {

    this._scene = value;

  }

}

/* ============================================================= */

/**
 * Exports
 */
export {
  Basics,
}