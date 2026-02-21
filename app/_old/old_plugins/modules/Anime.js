import anime from 'animejs';

export default ({
  app
}, inject) => {
  inject('anime', anime);
}