<template lang="pug">
  button.rocket(@click="goToTop()" ref='rocket')
    span(v-t="'goToTop'").is-hidden
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    goToTop() {
      const rocket = this.$refs.rocket as HTMLElement;
      if (!rocket.classList.contains('rocket--mobile'))
        rocket.style.transform = 'translate(20px, -200%) rotate(-45deg)';

      window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
      const headerTitleAnchor = document.querySelector(
        '.header__title a'
      ) as HTMLAnchorElement;
      setTimeout(() => {
        headerTitleAnchor.focus();
        rocket.style.transform = '';
      }, 1000);
    },
  },
});
</script>

<style lang="scss">
.rocket {
  width: $text-30-lineheight + $padding * 2;
  height: $text-30-lineheight + $padding * 2;
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  transform: translate($padding, -$padding) rotate(0deg);
  transition: transform cubic-bezier(0.19, 1, 0.22, 1) 200ms;
  background-size: $text-30-lineheight;
  position: relative;

  @include bp('grid-bigger') {
    width: $text-40-lineheight + $padding * 2;
    height: $text-40-lineheight + $padding * 2;
  }

  body.touch & {
    display: none;
    @include bp('grid-big') {
      display: block;
    }
  }

  body.touch &,
  &:hover,
  &:focus-visible {
    transform: translate($padding, -$padding) rotate(-45deg);

    &::before {
      animation: anim-drop-shadow-hover $shadow-hover-anim;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: $text-30-lineheight;
    background-repeat: no-repeat;
    background-image: url('~/assets/icons/rocket.svg');
    filter: drop-shadow(10px -5px 10px black);

    @include bp('grid-bigger') {
      background-size: $text-40-lineheight;
    }
  }

  @include m('mobile') {
    display: none;

    body.touch & {
      display: block;
      position: fixed;
      bottom: -$padding;
      right: $padding;
      transform: translate($padding, -$padding) rotate(-45deg);

      @include bp('grid-big') {
        display: none;
      }
    }
  }
}
</style>
