<template lang="pug">
  header.header#header
    .header__container
      h1.header__title
        NuxtLink(:to="{name: 'index___' + $i18n.locale}" v-t="'header.title'")
      nav
        h2(v-t="'header.nav.title'").is-hidden
        ul.header__nav
          template(v-for="item, index in $t('header.nav.items')")
            li.header__nav-item.header__nav-item--anchor
              NuxtLink(:to="getItemLink(item)") {{item}}
          li.header__nav-item
            NuxtLink(:to="switchLocalePath(getSwitchLocalCode)") {{getSwitchLocalCode}}
</template>

<script lang="ts">
import Vue from 'vue';
import type { LocaleObject } from 'nuxt-i18n';
import slugify from 'slugify';

export default Vue.extend({
  computed: {
    getSwitchLocalCode(): string | false {
      const locales = this.$i18n.locales as LocaleObject[];
      const locale = locales.find(
        (locale) => locale.code !== this.$i18n.locale
      );
      return locale ? locale.code : this.$i18n.locale;
    },
  },
  methods: {
    getItemLink(item: string) {
      return {
        name: 'index___' + this.$i18n.locale,
        hash: '#' + slugify(item, { lower: true }),
      };
    },
  },
});
</script>

<style lang="scss">
.header {
  position: relative;
  z-index: 2;
  width: 100%;
  margin-bottom: 45px;

  @include bp('grid-big') {
    margin-bottom: 90px;
  }

  @include bp('grid-bigger') {
    margin-bottom: 120px;
  }

  @include e('container') {
    display: flex;
    justify-content: space-between;
    padding: $padding;
  }

  @include e('title') {
    a {
      color: color-get('white');
      text-decoration: none;
      text-shadow: 10px -5px 10px color-get('black');
    }
  }

  @include e('nav') {
    text-transform: lowercase;
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    @extend %text-nav;
  }

  @include e('nav-item') {
    &:not(:last-child) {
      margin-right: 22px;

      @include bp('grid-big') {
        margin-right: 35px;
      }
    }

    @include m('anchor') {
      display: none;

      @include bp('grid-big') {
        display: block;
      }
    }
  }

  a {
    color: color-get('white');
    text-decoration: none;
    @extend %text-shadow;
  }
}
</style>
