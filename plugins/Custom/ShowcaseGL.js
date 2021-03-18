import * as THREE from "three";
import {
  fragment,
  vertex
} from "./ShowcaseShaders";

import { Environment } from '../Simplicity/src/Environments/Environment.js';
import { Geometry } from '../Simplicity/src/Objects/Geometry.js';

/* ============================================================= */

// -------- GENERAL PARAMETERS -------- //

// None

// -------- GENERAL METHODS -------- //

// None

/* ============================================================= */

class ShowcaseGL {

  constructor(params) {

    // -------- PARAMETERS -------- //

    // Container + target environment comes in

    var _params = params !== undefined ? params : {};
    
    this.targetEnvironments = _params.targetEnvironments !== undefined ? _params.targetEnvironments : [];
    this.totalEntries = this.targetEnvironments.length;
    this.loadedEntries = 0;
    this.render = this.render.bind(this);
    this.textures = this.targetEnvironments.map((entry, i) =>
      new THREE.TextureLoader().load(
        entry.image,
        this.calculateAspectRatioFactor.bind(this, i),
      )
    );
    this.factors = this.targetEnvironments.map(e => new THREE.Vector2(1, 1));
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.textureProgress = 0;
    this.mesh = null;
    this.initialRender = false;
    this.time = 0;
    this.loopRAF = null;
    this.loop = this.loop.bind(this);
    this.debug = _params.debug !== undefined ? _params.debug : false;

    // Construct environment
    // this.environment = new Environment();
    // this.environment.camera.position.z = 5;
    // this.environment.camera.lookAt = this.environment.scene.position;
    // this.environment.camera.fov = 45;
    // this.environment.camera.aspect = 1;
    // this.environment.camera.near = 0.1;
    // this.environment.camera.far = 10000;
    // this.environment.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.environment.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
    this.camera.position.z = 5;
    this.camera.lookAt = this.scene.position;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

  }

  // -------- METHODS -------- //

  calculateAspectRatioFactor(index, texture) {
    var plane = this.planeSize;
    var windowRatio = window.innerWidth / window.innerHeight;
    var rectRatio = (plane.width / plane.height) * windowRatio;
    var imageRatio = texture.image.width / texture.image.height;

    var factorX = 1;
    var factorY = 1;
    if (rectRatio > imageRatio) {
      factorX = 1;
      factorY = (1 / rectRatio) * imageRatio;
    } else {
      factorX = (1 / rectRatio) * imageRatio;
      factorY = 1;
    }

    this.factors[index] = new THREE.Vector2(factorX, factorY);
    if (this.currentIndex === index) {
      this.mesh.material.uniforms.u_textureFactor.value = this.factors[index];
      this.mesh.material.uniforms.u_textureFactor.needsUpdate = true;
    }
    if (this.nextIndex === index) {
      this.mesh.material.uniforms.u_texture2Factor.value = this.factors[index];
      this.mesh.material.uniforms.u_texture2Factor.needsUpdate = true;
    }

    // Loading -> to be removed because i already load my assets
    if (this.initialRender) {
      this.loadedEntries++;
      if (this.loadedEntries === this.totalEntries) {
        document.body.classList.remove('loading');
      }
      this.render();
    }

  }

  createPlane() {
    // Calculate bas of Isoceles triangle(camera)
    var viewSize = this.viewSize;
    var planeSize = this.planeSize;

    var segments = 60;
    // this.mesh = new Geometry({
    //   type: 'plane',
    //   buffer: true,
    //   width: planeSize.width,
    //   height: planeSize.height,
    //   widSeg: segments,
    //   heiSeg: segments,
    // });
    var geometry = new THREE.PlaneBufferGeometry(
      planeSize.width,
      planeSize.height,
      segments,
      segments
    );
    var material = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: {
          type: "t",
          value: this.textures[this.currentIndex]
        },
        u_textureFactor: {
          type: "f",
          value: this.factors[this.currentIndex]
        },
        u_texture2: {
          type: "t",
          value: this.textures[this.nextIndex]
        },
        u_texture2Factor: {
          type: "f",
          value: this.factors[this.nextIndex]
        },
        u_textureProgress: {
          type: "f",
          value: this.textureProgress
        },
        u_offset: {
          type: "f",
          value: 8
        },
        u_progress: {
          type: "f",
          value: 0
        },
        u_direction: {
          type: "f",
          value: 1
        },
        u_effect: {
          type: "f",
          value: 0
        },
        u_time: {
          type: "f",
          value: this.time
        },
        u_waveIntensity: {
          type: "f",
          value: 0
        },
        u_resolution: {
          type: "v2",
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        u_rgbPosition: {
          type: "v2",
          value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)
        },
        u_rgbVelocity: {
          type: "v2",
          value: new THREE.Vector2(0, 0)
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
    // this.mesh.material = material;
    // this.environment.addObject('plane', this.mesh);
  }

  updateTexture(newIndex, progress) {
    var didChange = false;
    if (newIndex != null && newIndex !== this.currentIndex) {
      this.currentIndex = this.nextIndex;
      this.nextIndex = newIndex;
      this.textureProgress = 0;
      this.mesh.material.uniforms.u_textureProgress.value = 0;
      this.mesh.material.uniforms.u_texture.value = this.textures[this.currentIndex];
      this.mesh.material.uniforms.u_textureFactor.value = this.factors[this.currentIndex];
      this.mesh.material.uniforms.u_texture2.value = this.textures[newIndex];
      this.mesh.material.uniforms.u_texture2Factor.value = this.factors[newIndex];
      
      didChange = true;
    }

    if (progress != null && progress !== this.textureProgress) {
      this.mesh.material.uniforms.u_textureProgress.value = progress;
      this.textureProgress = progress;

      didChange = true;
    }

    if (!this.loopRAF && didChange) {
      this.render();
    }
  }

  updateStickEffect({progress, direction, waveIntensity}) {
    this.mesh.material.uniforms.u_progress.value = progress;
    this.mesh.material.uniforms.u_direction.value = direction;
    this.mesh.material.uniforms.u_waveIntensity.value = waveIntensity;
  }

  updateRGBEffect({position, velocity}) {
    this.mesh.material.uniforms.u_rgbPosition.value = new THREE.Vector2(
      position.x,
      position.y
    );
    this.mesh.material.uniforms.u_rgbVelocity.value = new THREE.Vector2(
      velocity.x,
      velocity.y
    );
  
    if (!this.loopRAF) {
      this.render();
    }
  }

  render() {
    if (!this.initialRender) {
      this.initialRender = true;
    }
    this.renderer.render(this.scene, this.camera);
  }

  mount(container) {
    container.prepend(this.renderer.domElement);
  }

  unmount() {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
    this.mesh = null;
    this.environment = null;
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.mesh.material.uniforms.u_resolution.value = new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    );
  //     this.camera.aspect = window.inenrWidth / window.innerHeight;
  // this.camera.updateProjectionMatrix();
    for (var i = 0; i < this.textures.length; i++) {
      if (this.textures[i].image) {
        this.calculateAspectRatioFactor(i, this.textures[i]);
      }
    }
  
    this.render();
  }

  scheduleLoop() {
    if (this.loopRAF) return;
    this.loop();
  }

  loop() {
    this.render();
    this.time += 0.1;
    this.mesh.material.uniforms.u_time.value = this.time;

    this.loopRAF = requestAnimationFrame(this.loop);
  }

  cancelLoop() {
    cancelAnimationFrame(this.loopRAF);
    this.loopRAF = null;
  }

  // -------- GETTERS -------- //

  get viewSize() {
    var fovInRadians = (this.camera.fov * Math.PI) / 180;
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
  ShowcaseGL,
}