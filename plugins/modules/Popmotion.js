import * as POPMOTION from 'popmotion';

export default ({
  app
}, inject) => {
  inject('motion', POPMOTION);
}