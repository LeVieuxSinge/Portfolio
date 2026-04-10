<template>
    <figure class="z-animated-noise fixed w-dvw h-dvh pointer-events-none" />
</template>

<style lang="css" scoped>
.noise {
  &::before {
    content: "";
    position: fixed;
    top: -10rem;
    left: -10rem;
    width: calc(100% + 20rem);
    height: calc(100% + 20rem);
    opacity: 0.05;
    filter: invert(100%);
    background: url('/textures/noise.png');
    animation: noise 1s steps(2) infinite;
  }

  &::after {
    content: "";
    position: fixed;
    top: -10rem;
    left: -10rem;
    width: calc(100% + 20rem);
    height: calc(100% + 20rem);
    opacity: 0.03;
    background: url('/textures/noise.png');
    animation: noise 1s steps(2) infinite;
  }

}

@-webkit-keyframes noise {
  to {
    transform: translate3d(-7rem, 0, 0)
  }
}

@keyframes noise {
  0% {
    transform: translate3d(0, 9rem, 0)
  }

  10% {
    transform: translate3d(-1rem, -4rem, 0)
  }

  20% {
    transform: translate3d(-8rem, 2rem, 0)
  }

  30% {
    transform: translate3d(9rem, -9rem, 0)
  }

  40% {
    transform: translate3d(-2rem, 7rem, 0)
  }

  50% {
    transform: translate3d(-9rem, -4rem, 0)
  }

  60% {
    transform: translate3d(2rem, 6rem, 0)
  }

  70% {
    transform: translate3d(7rem, -8rem, 0)
  }

  80% {
    transform: translate3d(-9rem, 1rem, 0)
  }

  90% {
    transform: translate3d(6rem, -5rem, 0)
  }

  to {
    transform: translate3d(-7rem, 0, 0)
  }
}
</style>
