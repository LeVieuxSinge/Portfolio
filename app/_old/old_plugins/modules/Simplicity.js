import Vue from 'vue';
import * as Simplicity from '../Simplicity/index.js';
import { Showcase } from '~/plugins/Custom/Showcase.js';

// IMPORT SIMPLICITY COMPONENTS
// Object.keys(Simplicity.Components).forEach(name => {
//   Vue.component(name, Simplicity.Components[name]);
// });

var breakpoints = Vue.observable(new Simplicity.BreakpointManager({}));

export default ({
  app
}, inject) => {
  inject('simplicity', Simplicity);
  inject('assets', new Simplicity.AssetManager({
    debug: false,
  }));
  inject('breakpoints', breakpoints);
  inject('events', new Simplicity.EventManager({
    debug: false,
  }));
  inject('showcase', Showcase);
}