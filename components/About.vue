<template lang="pug">
  .about
    .about__text
      slot
    .about__galaxy-container
      .about__galaxy
        button.about__cv
          span(v-t="'about.cv_mobile'")
          span(v-t="'about.cv'")
        .about__planet.about__planet--big
        .about__planet.about__planet--big
        .about__planet.about__planet--small
        .about__planet.about__planet--small
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss">
@keyframes anim-planet-rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(-360deg);
  }
}

.about {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;

  @include e('text') {
    .nuxt-content {
      @include typography-setup(
        $text-20...,
        $margins-inside: true,
        $contain-margins: true
      );

      @include bp('grid-bigger') {
        @include typography-setup(
          $text-30...,
          $margins-inside: true,
          $contain-margins: true
        );
      }

      a {
        color: color-get('white');
        @extend %text-shadow;
      }
    }
  }

  @include e('galaxy-container') {
    padding: calc(5vw + #{$padding});
    margin: auto;

    @include bp('grid-bigger') {
      padding: #{100px / 2 + $padding};
    }
  }

  @include e('galaxy') {
    width: 50vw;
    height: 50vw;
    background: radial-gradient(
      closest-side,
      color-get('white.2'),
      color-get('grey'),
      transparent
    );
    background-size: 60% 60%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    border: 2px solid color-get('white.7');
    position: relative;

    @include bp('grid-bigger') {
      width: 40vw;
      height: 40vw;
    }

    @include bp('7') {
      width: 30vw;
      height: 30vw;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 72%;
      height: 72%;
      border-radius: 50%;
      border: 2px solid color-get('white.5');
    }
  }

  @include e('cv') {
    background-color: color-get('white.5');
    width: 50%;
    height: 50%;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    transition: background-color linear 100ms, color linear 100ms;
    @include typography-setup($text-20..., $margins: false);
    color: color-get('blue');
    padding: $padding;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    body:not(.not-touch) &,
    &:focus-visible {
      animation: anim-box-shadow-hover $shadow-hover-anim;
      background-color: color-get('white');
      color: color-get('black');
    }

    body:not(.not-touch) & + .about__planet,
    body:not(.not-touch) & + .about__planet ~ .about__planet,
    &:hover + .about__planet,
    &:hover + .about__planet ~ .about__planet {
      background-color: color-get('white');
    }

    body:not(.not-touch) & + .about__planet:before,
    body:not(.not-touch) & + .about__planet ~ .about__planet:before,
    &:hover + .about__planet:before,
    &:hover + .about__planet ~ .about__planet:before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      animation: anim-box-shadow-hover $shadow-hover-anim;
    }

    @include bp('grid-bigger') {
      @include typography-setup($text-30..., $margins: false);
    }

    span {
      position: relative;
      top: 2px;

      &:first-child {
        @include bp('grid-big') {
          display: none;
        }
      }

      &:last-child {
        display: none;

        @include bp('grid-big') {
          display: block;
        }
      }
    }
  }

  @include e('planet') {
    display: block;
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    background-color: color-get('grey-blue');
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    animation: anim-planet-rotate 30s linear infinite;
    transform-origin: #{25vw + 6vw / 2};

    @include bp('grid-bigger') {
      transform-origin: calc(20vw + #{100px / 2});
      width: 100px;
      height: 100px;
    }

    @include bp('7') {
      transform-origin: calc(15vw + #{100px / 2});
    }

    @include m('small') {
      animation-direction: reverse;
      width: 4vw;
      height: 4vw;
      left: 50% - 72% / 2;
      transform-origin: #{(25vw * 0.72) + 4vw / 2};

      @include bp('grid-bigger') {
        transform-origin: calc(#{(20vw * 0.72)} + #{75px / 2});
        width: 75px;
        height: 75px;
      }

      @include bp('7') {
        transform-origin: calc(#{(15vw * 0.72)} + #{75px / 2});
      }
    }

    &:nth-child(2),
    &:nth-child(4) {
      animation-delay: -15s;
    }
  }
}
</style>
