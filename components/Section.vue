<template lang="pug">
  section(
    v-if="title"
    :class="`section--${type}`"
    :id="type === 'error' ? null : slug(title)"
  ).section
    div(v-if="type !== 'error'").section__intersection.section__intersection--top
    template(v-if="type === 'about'")
      h2.is-hidden {{title}}
    .section__header(v-else-if="type === 'error'")
      h2.section__title {{title}}
    .section__header(v-else)
      h2.section__title
        NuxtLink(:to="{name: 'index', hash: '#' + slug(title)}") {{title}}
      Rocket
    slot
    div(v-if="type !== 'error'").section__intersection.section__intersection--bottom
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

  &:first-of-type {
    min-height: calc(100vh - #{77px + 45px});

    @include bp('grid-big') {
      min-height: calc(100vh - #{77px + 90px});
    }

    @include bp('grid-bigger') {
      min-height: calc(100vh - #{90px + 120px});
    }
  }

  @include m('about') {
    display: flex;
    flex-direction: column;
  }

  @include m('projects') {
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    &::before {
      background: color-get('blue');
    }

    &::after {
      background: radial-gradient(
        closest-side,
        color-get('grey'),
        color-get('blue')
      );
      background-size: 50vw 50vw;
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-position: center;

      @include bp('grid-width') {
        background-size: #{bp-get('grid-width') / 2} #{bp-get('grid-width') / 2};
      }
    }
  }

  @include m('contact') {
    display: flex;
    flex-direction: column;
  }

  @include e('intersection') {
    position: absolute;
    z-index: -1;
    pointer-events: none;
    width: 100%;
    height: 50vh;
    left: 0;

    @include m('top') {
      top: 0;
    }

    @include m('bottom') {
      bottom: 0;
    }
  }

  @include e('header') {
    display: flex;
    justify-content: space-between;
    padding-top: $padding;
    height: $text-30-lineheight;

    @include bp('grid-bigger') {
      height: $text-40-lineheight;
    }
  }

  @include e('title') {
    a {
      color: color-get('white');
      text-decoration: none;
      @extend %text-shadow;
    }
  }
}
</style>
