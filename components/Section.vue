<template lang="pug">
  section(v-if="title" :class="`section--${type}`" :id='slug(title)').section
    template(v-if="type === 'about'")
      h2.is-hidden {{title}}
    .section__header(v-else)
      h2.section__title
        a(:href="'#' + slug(title)") {{title}}
      button.section__rocket(@click="goToTop()" ref='rocket')
    slot
</template>

<script lang="ts">
import Vue from 'vue';
import slugify from 'slugify';

export default Vue.extend({
  props: { title: String, type: String },
  methods: {
    slug(str: string) {
      return slugify(str, { lower: true });
    },
    goToTop() {
      const rocket = this.$refs.rocket as HTMLElement;
      rocket.style.transform = 'translateY(-200%) rotate(-45deg)';
      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
        rocket.style.transform = '';
      }, 75);
    },
  },
});
</script>

<style lang="scss">
.section {
  min-height: 100vh;
  padding: 0 $padding;
  position: relative;
  overflow: hidden;

  &:not(:last-child) {
    border-bottom: 1px solid color-get('white.2');
  }

  @include m('about') {
    min-height: calc(100vh - 77px);

    @include bp('grid-bigger') {
      min-height: calc(100vh - 90px);
    }
  }

  @include m('contact') {
    display: flex;
    flex-direction: column;
  }

  @include e('header') {
    display: flex;
    justify-content: space-between;
    padding-top: $padding;
  }

  @include e('title') {
    a {
      color: color-get('white');
      text-decoration: none;
      @extend %text-shadow;
    }
  }

  @include e('rocket') {
    width: $text-30-lineheight + $padding * 2;
    height: $text-30-lineheight;
    -webkit-appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    transform: translatex($padding) rotate(0deg);
    transition: transform linear 200ms;
    background-size: $text-30-lineheight;
    position: relative;

    @include bp('grid-bigger') {
      width: $text-40-lineheight + $padding * 2;
      height: $text-40-lineheight;
    }

    &:hover,
    body:not(.not-touch) & {
      transform: translatex($padding) rotate(-45deg);

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
  }
}
</style>
