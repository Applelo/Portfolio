<template lang="pug">
  article.project
    .project__container
      .project__top
        h3.project__title {{title}}
        p.project__year {{year}}
      p(v-html="description").project__desc
      .project__bottom
        p(v-html="getOrigin").project__origin
        a.project__link(v-if="url" :href="url" :class="`project__link--${getUrlIcon}`")
</template>

<script lang="ts">
import Vue from 'vue';
import marked from 'marked';

export default Vue.extend({
  props: {
    title: String,
    description: String,
    origin: String,
    url: String,
    year: String,
  },
  methods: {
    prettify(str: string): string {
      return marked.parseInline(str);
    },
  },
  computed: {
    getUrlIcon(): 'github' | 'www' | 'wordpress' {
      const url = this.$props.url;
      if (url.includes('https://github.com')) {
        return 'github';
      } else if (url.includes('https://wordpress.org')) {
        return 'wordpress';
      }
      return 'www';
    },
    getOrigin(): string {
      const origin = this.$props.origin;
      return this.prettify(this.$t(`projects.origins.${origin}`) as string);
    },
  },
});
</script>

<style lang="scss">
.project {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 20px;
  background-color: color-get('white');
  color: color-get('black');
  @extend %box-shadow;

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
  }

  @include e('origin') {
    @extend %text-small-italic;
    margin: 0 $padding 0 0;

    a {
      color: color-get('black');
      text-decoration: underline;

      &:hover {
        text-decoration: none;
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
    transition: 200ms transform linear;

    &:hover {
      transform: scale(1.1);
    }

    @include m('www') {
      background-size: 30px 30px;
      border: 2px solid color-get('blue');
      border-radius: 50%;
    }

    @include m('github') {
      background-image: url('~/assets/icons/github.svg');
    }

    @include m('wordpress') {
      background-image: url('~/assets/icons/wordpress.svg');
    }
  }
}
</style>
