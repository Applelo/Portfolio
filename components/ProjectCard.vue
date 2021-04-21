<template lang="pug">
  article.project-card
    .project-card__container
      .project-card__top
        h3.project-card__title {{project.title}}
        p.project-card__year {{year}}
      p(v-html="project.description").project-card__desc
      .project-card__bottom
        p(v-html="getOrigin").project-card__origin
        template(v-if="project.url")
          a.project-card__link(:href="project.url" :class="`project-card__link--${getUrlIcon}`")
            span.is-hidden {{project.title}}
</template>

<script lang="ts">
import Vue from 'vue';
import { prettify } from '@/mixins/markdown';

export default Vue.extend({
  mixins: [prettify],
  props: {
    project: Object,
  },
  computed: {
    year() {
      return new Date(this.$props.project.date).getFullYear();
    },
    getUrlIcon(): 'github' | 'www' | 'wordpress' {
      const url = this.$props.project.url;
      if (url.includes('https://github.com')) {
        return 'github';
      } else if (url.includes('https://wordpress.org')) {
        return 'wordpress';
      }
      return 'www';
    },
    getOrigin(): string {
      const origin = this.$props.project.origin;
      // @ts-ignore prettify exists on mixins
      return this.prettify(this.$t(`projects.origins.${origin}`) as string);
    },
  },
});
</script>

<style lang="scss">
.project-card {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 20px;
  background-color: color-get('white.2');
  color: color-get('white');
  box-shadow: $shadow-light;

  @include e('container') {
    display: flex;
    flex-direction: column;
    padding: $padding;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @include e('top') {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 35px;
    color: color-get('white.7');
  }

  @include e('year') {
    @extend %text-small-italic;
  }

  @include e('title') {
    font-weight: 400;
    @include typography-setup($text-15..., $margins: false);
    margin: 0;

    @include bp('grid-bigger') {
      @include typography-setup($text-25..., $margins: false);
    }
  }

  @include e('desc') {
    margin: 0 0 35px;
    @include typography-setup($text-20..., $margins: false);

    @include bp('grid-bigger') {
      @include typography-setup($text-30..., $margins: false);
    }
  }

  @include e('bottom') {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    color: color-get('white.7');
    min-height: 60px;
  }

  @include e('origin') {
    @extend %text-small-italic;
    margin: 0 $padding 0 0;

    a {
      color: color-get('white.5');
      text-decoration: underline;

      &:hover,
      &:focus-visible {
        color: color-get('white');
        animation: anim-text-shadow-hover $shadow-hover-anim;
      }
    }
  }

  @include e('link') {
    display: block;
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    background-image: url('~/assets/icons/link.svg');
    transition: 100ms opacity linear;
    border-radius: 50%;
    opacity: 0.7;
    flex-shrink: 0;

    &:hover,
    &:focus-visible {
      animation: anim-box-shadow-hover $shadow-hover-anim;
      opacity: 1;
    }

    @include m('www') {
      background-size: 35px 35px;
      border: 2px solid color-get('white');
    }

    @include m('github') {
      background-image: url('~/assets/icons/github-white.svg');
    }

    @include m('wordpress') {
      background-image: url('~/assets/icons/wordpress.svg');
    }
  }
}
</style>
