import * as THREE from 'three';

export default ({
  app
}, inject) => {
  inject('three', THREE);
}