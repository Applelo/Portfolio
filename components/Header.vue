<template lang="pug">
  header.header
    h1(v-t="'header.title'").header__title
    nav
      h2(v-t="'header.nav.title'").is-hidden
      ul.header__nav
        template(v-for="item in navItems")
          li.header__nav-item
            a(v-bind:href="'#' + item.toLowerCase()") {{item}}
        li.header__nav-item
          nuxt-link(:to="switchLocalePath(getSwitchLocalCode)") {{getSwitchLocalCode}}
        li.header__nav-item
          a(href="#cv" v-t="'header.nav.cv'")
</template>

<script lang="ts">
import Vue from 'vue';
import type { LocaleObject } from 'nuxt-i18n';
export default Vue.extend({
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
  },
});
</script>

<style lang="scss">
.header {
  display: flex;
  position: sticky;
  top: 0;
  padding: $padding;
  margin-bottom: 120px;
  justify-content: space-between;

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 50vh;
    transform: translate(-$padding, -65%);
    z-index: -1;
    background: radial-gradient(
      closest-side,
      color-get("grey"),
      color-get("blue")
    );
  }

  @include e("nav") {
    text-transform: lowercase;
    list-style: none;
    display: flex;
  }

  @include e("nav-item") {
    &:not(:last-child) {
      margin-right: 35px;
    }

    a {
      color: color-get("white");
      text-decoration: none;
    }
  }
}
</style>
