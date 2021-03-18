import Vue from 'vue';
import * as Simplicity from '../Simplicity/index.js';

// IMPORT SIMPLICITY COMPONENTS
// Object.keys(Simplicity.Components).forEach(name => {
//   Vue.component(name, Simplicity.Components[name]);
// });

const Events = new Simplicity.EventManager({
  debug: false,
});

Events.add('onActiveIndexChange');
Events.add('onIndexChange');
Events.add('onZoomStart');
Events.add('onZoomFinish');
Events.add('onFullScreenStart');
Events.add('onFullScreenFinish');

export default ({
  app
}, inject) => {
  inject('simplicity', Simplicity);
  inject('assets', new Simplicity.AssetManager({
    debug: false,
  }));
  inject('events', Events);
}