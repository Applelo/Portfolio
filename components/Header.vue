<template lang="pug">
  header.header#header
    HeaderRadiant
    .header__container
      h1.header__title
        a(:href='getLocalPath' v-t="'header.title'")
      nav
        h2(v-t="'header.nav.title'").is-hidden
        ul.header__nav
          template(v-for="item, index in navItems")
            li(:class='index === 0 ? "is-hidden" : ""').header__nav-item
              a(v-bind:href="'#' + slug(item)") {{item}}
          li.header__nav-item
            nuxt-link(:to="switchLocalePath(getSwitchLocalCode)") {{getSwitchLocalCode}}
          li.header__nav-item
            Button(id="cv" :title="$t('header.nav.cv')")
</template>

<script lang="ts">
import Vue from 'vue';
import type { LocaleObject } from 'nuxt-i18n';
import slugify from 'slugify';
import Gumshoe from 'gumshoejs';

interface GumshoeEvent extends Event {
  detail: {
    link: HTMLAnchorElement;
    content: Element;
  };
}

export default Vue.extend({
  data() {
    return {
      previousScrollY: 0,
      previousDirectionScrollY: 0,
      observer: null as IntersectionObserver | null
    }
  },
  computed: {
    navItems() {
      const items = this.$t("header.nav.items");
      const map = Object.keys(items).map((item) =>
        this.$t(`header.nav.items.${item}`)
      );
      return map;
    },
    getSwitchLocalCode(): string | false {
      const locales = this.$i18n.locales as LocaleObject[]
      const local = locales.find(
        (locale) => locale.code !== this.$i18n.locale
      );
      return local ? local.code : false;
    },
    getLocalPath():string {
      return this.switchLocalePath(this.$i18n.locale);
    }
  },
  methods: {
    slug(str: string) {
      return slugify(str, {lower: true});
    },
  },
  mounted() {
    new Gumshoe('.header__nav a');
    document.addEventListener('gumshoeActivate', function (event) {
      const e = event as GumshoeEvent;
      const target = e.target as HTMLElement;
      let hash = '';

      if (!target.classList.contains('is-hidden')) {
         // The link
        const link = e.detail.link;
        const href =  link.getAttribute('href');

        if (!href) return;
        hash = href.split('#').join('');
      }

      const url = new URL(window.location.toString());
      url.hash = hash;
      window.history.pushState(null, '', url.toString());
    }, false);
  },
});
</script>

<style lang="scss">
.header {
  background-color: color-get("blue");
  position: relative;
  z-index: 2;
  width: 100%;

  @include bp("grid-bigger") {
    margin-bottom: 120px;
  }

  @include e("container") {
    display: flex;
    justify-content: space-between;
    padding: $padding;
  }

  @include e("title") {
    a {
      color: color-get("white");
      text-decoration: none;
      text-shadow: 10px -5px 10px color-get("black");
    }
  }

  @include e("nav") {
    text-transform: lowercase;
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    @extend %text-nav;
  }

  @include e("nav-item") {
    &:not(:last-child) {
      margin-right: 35px;
    }
  }

  a {
    color: color-get("white");
    text-decoration: none;
    @extend %text-shadow;
  }
}
</style>
