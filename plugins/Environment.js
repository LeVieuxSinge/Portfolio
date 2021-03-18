import * as THREE from 'three';
import {
  GLTFLoader
} from '~/node_modules/three/examples/jsm/loaders/GLTFLoader';
import ANIME from 'animejs';
import * as SimpliciT from './lib/SimpliciT/build/SimpliciT';
import * as UTILS from './lib/SimpliciT/js/Utils';

var environment;
var scrolly;
var targetEnv1;
var targetEnv2;
var targetEnv3;

var start = (function () {

  // Main environment
  environment = new SimpliciT.Environment({
    canvas: document.getElementById('three'),
  });
  environment.getCamera().position.z = 5;

  // Main light
  environment.addObject('light-front', SimpliciT.Light({
    type: 'ambient',
    intensity: 1,
  }));

  // Target environment #1
  targetEnv1 = new SimpliciT.TargetEnvironment();
  targetEnv1.getCamera().position.z = 15;
  targetEnv1.getScene().background = new THREE.Color(0x171817); // test colors
  // targetEnv1.getScene().fog = new THREE.FogExp2(0x171817, 0.06); // test colors

  targetEnv1.addObject('point-front', SimpliciT.Light({
    type: 'point',
    intensity: 3,
    position: [0, 5, 5],
  }));
  targetEnv1.addObject('point-right', SimpliciT.Light({
    type: 'point',
    intensity: 2,
    position: [5, 3, 3],
  }));
  targetEnv1.addObject('blue-bottom', SimpliciT.Light({
    type: 'point',
    intensity: 0.5,
    color: 0x98DFEA,
    position: [1, -10, -5],
  }));
  targetEnv1.addObject('point-blue', SimpliciT.Light({
    type: 'point',
    intensity: 2,
    color: 0x98DFEA,
    position: [-5, 3, 3],
  }));
  targetEnv1.addObject('point-purple', SimpliciT.Light({
    type: 'point',
    intensity: 1.5,
    color: 0x8F3985,
    position: [15, 6, -10],
  }));

  // Target environment #2
  targetEnv2 = new SimpliciT.TargetEnvironment();
  targetEnv2.getScene().background = new THREE.Color(0xEB8A90); // test colors

  // Target environment #3
  targetEnv3 = new SimpliciT.TargetEnvironment();
  targetEnv3.getScene().background = new THREE.Color('green'); // test colors

  // Scrolly
  scrolly = new SimpliciT.Scrolly({
    environment: environment,
  });

  // Geometry objects
  // Load gltf scene
  var loader = new GLTFLoader();
  loader.load('./objects/cloner_web.glb', function (gltf) {
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        // child.castShadow = true;
        // child.receiveShadow = true;
      }
    });
    gltf.scene.children[0].position.x = 99;
    gltf.scene.children[0].rotation.x = UTILS.degToRad(-20);
    gltf.scene.children[0].rotation.y = UTILS.degToRad(-30);
    gltf.scene.children[0].rotation.z = UTILS.degToRad(10);
    targetEnv1.addObject('cloner', gltf.scene.children[0]);

    scrolly.newSection({
      targetEnvironment: targetEnv1,
      enter: (wait) => {

        execute.changeText({
          lastSection: 'about',
          nextSection: 'general',
          projectTitle: 'n-42',
          projectYear: '2020',
          projectDesc: 'A 3D vechicule',
        });
        
        ANIME({
          targets: targetEnv1.getObject('cloner').position,
          x: [20, 0],
          y: [-1, 1],
          z: [-10, 0],
          duration: 2000,
          delay: 500,
          easing: 'easeOutCubic',
          complete: () => {
            wait.restart();
          },
        });

      },
      wait: ANIME({
        targets: targetEnv1.getObject('cloner').position,
        y: [1, 0.8],
        duration: 4000,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate',
      }),
      leave: (wait) => {
        ANIME({
          targets: targetEnv1.getObject('cloner').position,
          x: -20,
          duration: 1000,
          easing: 'easeInCubic',
          begin: () => {
            wait.pause();
          },
        });
      },
    });
    scrolly.newSection({
      targetEnvironment: targetEnv2,
    });
    scrolly.newSection({
      targetEnvironment: targetEnv3,
    });
    scrolly.build();

  });

  var animate = (function () {

    // Render environment
    environment.renderTarget(targetEnv1);
    environment.renderTarget(targetEnv2);
    environment.renderTarget(targetEnv3);
    environment.render();

    requestAnimationFrame(animate);

  });

  // Render
  animate();

});

var getEnvironment = (function () {

  return environment;

});

var getScrolly = (function () {

  return scrolly;

});

var execute = {
  changeText: (object) => {},
};


export {

  start,
  getEnvironment,
  getScrolly,
  execute,

};
