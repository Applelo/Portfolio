<template lang="pug">
  .about
    .about__text(v-if="resume")
      nuxt-content(:document="resume")
    .about__galaxy-container
      .about__galaxy
        a(:href="$t('about.cv_path')" download).about__cv
          span(v-t="'about.cv_mobile'")
          span(v-t="'about.cv'")
        .about__planet.about__planet--big
        .about__planet.about__planet--big
        .about__planet.about__planet--small
        .about__planet.about__planet--small
</template>

<script lang="ts">
import type { IContentDocument } from '@nuxt/content/types/content';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return { resume: [] as IContentDocument[] | IContentDocument };
  },
  watch: {
    '$route.path': '$fetch',
  },
  async fetch() {
    this.resume = await this.$content(this.$i18n.locale, 'resume').fetch();
  },
});
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
    padding: $padding * 2 0;
    margin: auto;

    @include bp('grid-big') {
      padding: calc(5vw + #{$padding});
    }

    @include bp('grid-bigger') {
      padding: #{100px / 2 + $padding};
    }
  }

  @include e('galaxy') {
    width: 80vw;
    height: 80vw;
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

    @include bp('grid-big') {
      width: 50vw;
      height: 50vw;
    }

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
    width: 40%;
    height: 40%;
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
    text-decoration: none;

    &:hover,
    body.touch &,
    &:focus-visible {
      animation: anim-box-shadow-hover $shadow-hover-anim;
      background-color: color-get('white');
      color: color-get('black');
    }

    body.touch & + .about__planet,
    body.touch & + .about__planet ~ .about__planet,
    &:hover + .about__planet,
    &:hover + .about__planet ~ .about__planet {
      background-color: color-get('white');
    }

    body.touch & + .about__planet:before,
    body.touch & + .about__planet ~ .about__planet:before,
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
      text-align: center;
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
    transform-origin: #{40vw + 6vw / 2};

    @include bp('grid-big') {
      transform-origin: #{25vw + 6vw / 2};
    }

    @include bp('grid-bigger') {
      transform-origin: calc(20vw + #{90px / 2});
      width: 90px;
      height: 90px;
    }

    @include bp('7') {
      transform-origin: calc(15vw + #{90px / 2});
    }

    @include m('small') {
      animation-direction: reverse;
      width: 4vw;
      height: 4vw;
      left: 50% - 72% / 2;
      transform-origin: #{(40vw * 0.72) + 4vw / 2};

      @include bp('grid-big') {
        transform-origin: #{(25vw * 0.72) + 4vw / 2};
      }

      @include bp('grid-bigger') {
        transform-origin: calc(#{(20vw * 0.72)} + #{65px / 2});
        width: 65px;
        height: 65px;
      }

      @include bp('7') {
        transform-origin: calc(#{(15vw * 0.72)} + #{65px / 2});
      }
    }

    &:nth-child(2),
    &:nth-child(4) {
      animation-delay: -15s;
    }
  }
}
</style>
