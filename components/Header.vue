<template lang="pug">
  header.header#header
    .header__container
      h1.header__title
        a(:href='getLocalPath' v-t="'header.title'")
      nav
        h2(v-t="'header.nav.title'").is-hidden
        ul.header__nav
          template(v-for="item in navItems")
            li.header__nav-item.header__nav-item--anchor
              a(v-bind:href="'#' + slug(item)") {{item}}
          li.header__nav-item
            nuxt-link(:to="switchLocalePath(getSwitchLocalCode)" @click.native="dispatchUpdate()") {{getSwitchLocalCode}}
</template>

<script lang="ts">
import Vue from 'vue';
import type { LocaleObject } from 'nuxt-i18n';
import slugify from 'slugify';

export default Vue.extend({
  data() {
    return {
      observer: null as null | IntersectionObserver,
    };
  },
  computed: {
    navItems() {
      const items = this.$t('header.nav.items');
      const map = Object.keys(items).map((item) =>
        this.$t(`header.nav.items.${item}`)
      );
      return map;
    },
    getSwitchLocalCode(): string | false {
      const locales = this.$i18n.locales as LocaleObject[];
      const local = locales.find((locale) => locale.code !== this.$i18n.locale);
      return local ? local.code : false;
    },
    getLocalPath(): string {
      return this.switchLocalePath(this.$i18n.locale);
    },
  },
  methods: {
    slug(str: string) {
      return slugify(str, { lower: true });
    },
    dispatchUpdate() {
      const updateEvent = new CustomEvent('updateFetch');
      window.dispatchEvent(updateEvent);
    },
  },
  beforeDestroy() {
    this.observer?.disconnect();
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        let intersectionRatio = 0;
        let hash: string | false = false;

        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];
          const intersectionEl = entry.target as HTMLElement;
          const section = intersectionEl.closest('.section') as HTMLElement;

          // update active
          const hrefTitle = section?.querySelector('.section__title');
          if (hrefTitle)
            hrefTitle.classList[entry.isIntersecting ? 'add' : 'remove'](
              'is-active'
            );

          // update anchor
          if (
            !entry.isIntersecting ||
            intersectionRatio > entry.intersectionRatio
          )
            continue;
          intersectionRatio = entry.intersectionRatio;

          if (section && !section.classList.contains('section--about')) {
            // The link
            const id = section.id;
            if (!id) return;
            hash = id;
          } else {
            hash = '';
          }
        }

        if (hash !== false) {
          const url = new URL(window.location.toString());
          url.hash = hash;
          window.history.pushState(null, '', url.toString());
        }
      },
      { threshold: 0 }
    );

    const items = Array.from(
      document.getElementsByClassName('section__intersection')
    );
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      this.observer.observe(item);
    }
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
      margin-right: 35px;
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
