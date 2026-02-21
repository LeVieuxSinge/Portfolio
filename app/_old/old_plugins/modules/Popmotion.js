import * as POPMOTION from '~/node_modules/popmotion/dist/popmotion';

export default ({
  app
}, inject) => {
  inject('popmotion', POPMOTION);
}