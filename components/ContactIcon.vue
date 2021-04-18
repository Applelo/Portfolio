<template lang="pug">
  a(:class="`contact-icon--${type}`").contact-icon
    span
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: { type: String },
});
</script>

<style lang="scss">
@keyframes anim-icon-rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(-360deg);
  }
}

@keyframes anim-icon-content-rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}

$icon-anim-duration: 120s;

.contact-icon {
  display: block;
  width: 12vw;
  height: 12vw;
  border-radius: 50%;
  position: absolute;
  animation: anim-icon-rotate $icon-anim-duration linear infinite;
  top: 50%;
  left: calc(50% - 25vw);
  transform: translate(-50%, -50%);
  transform-origin: 25vw + 6vw;
  background-color: color-get('white');
  z-index: 1;

  @include bp('4') {
    width: 100px;
    height: 100px;
    transform-origin: calc(25vw + 50px);
  }

  @include bp('grid-width') {
    left: calc(50% - #{bp-get('grid-width') / 4});
    transform-origin: calc(#{bp-get('grid-width') / 4} + 50px);
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 10vw;
    height: 10vw;
    border-radius: 50%;

    @include bp('grid-big') {
      width: 100px;
      height: 100px;
    }
  }

  &:focus-visible:before,
  &:hover:before {
    animation: anim-box-shadow-hover 1s linear infinite alternate;
  }

  span {
    display: block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    animation: anim-icon-content-rotate $icon-anim-duration linear infinite
      reverse;
  }

  @include m('github') {
    span {
      background-image: url('~/assets/icons/github.svg');
    }
  }

  @include m('email') {
    animation-delay: -$icon-anim-duration/4;
    span {
      background-image: url('~/assets/icons/envelope.svg');
      animation-delay: -$icon-anim-duration/4;
    }
  }

  @include m('linkedin') {
    animation-delay: -$icon-anim-duration/4 * 2;
    span {
      background-image: url('~/assets/icons/linkedin.svg');
      animation-delay: -$icon-anim-duration/4 * 2;
    }
  }

  @include m('twitter') {
    animation-delay: -$icon-anim-duration/4 * 3;
    span {
      background-image: url('~/assets/icons/twitter.svg');
      animation-delay: -$icon-anim-duration/4 * 3;
    }
  }
}
</style>
