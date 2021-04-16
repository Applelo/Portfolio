<template lang="pug">
  header.header#header
    h1.header__title
      a(href="#me" v-t="'header.title'")
    nav
      h2(v-t="'header.nav.title'").is-hidden
      ul.header__nav
        template(v-for="item in navItems")
          li.header__nav-item
            a(v-bind:href="'#' + item.toLowerCase()") {{item}}
        li.header__nav-item
          nuxt-link(:to="switchLocalePath(getSwitchLocalCode)") {{getSwitchLocalCode}}
        li.header__nav-item
          Button(id="cv" :title="$t('header.nav.cv')")
</template>

<script lang="ts">
import Vue from 'vue';
import type { LocaleObject } from 'nuxt-i18n';
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
  },
   methods: {
    refresh () {
      const header = document.getElementById('header');
      if (!header) return;

      const scrollY = window.pageYOffset;
      const direction = scrollY < this.previousScrollY ? 'top' : 'bottom';
      const headerHeight = header.clientHeight;

      if (
        (direction === 'bottom' && header.classList.contains('is-sticky')) ||
        scrollY <= headerHeight
      ) {
        header.classList.remove('header--top');
        const percentage = ((scrollY - this.previousDirectionScrollY) / headerHeight) * 100;
        if (scrollY <= 0) {
          //fix for ios
          this.previousDirectionScrollY = 0;
          header.style.transform = '';
        } else {
          header.style.transform = `translateY(-${percentage > 100 ? 100 : percentage.toFixed(2)}%)`;
        }
      } else if (direction === 'top') {
        header.classList.add('header--top');
        header.style.transform = '';
        this.previousDirectionScrollY = scrollY;
      } else {
        header.classList.remove('header--top');
        this.previousDirectionScrollY = scrollY;
      }

      this.previousScrollY = scrollY;
    }
  },
  beforeMount () {
    const header = document.getElementById('header');
    if (!header) return;
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('is-sticky', e.intersectionRatio < 1),
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    );
    observer.observe(header);

    window.addEventListener('scroll', this.refresh);
    window.addEventListener('resize', this.refresh);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.refresh);
    window.removeEventListener('resize', this.refresh);
    this.observer?.disconnect();
  }
});
</script>

<style lang="scss">
@keyframes anim-radial-header {
  from {
    background-position-x: 90% - 90% / 4;
    background-size: 90%;
  }
  to {
    background-position-x: 80% - 80% / 4;
    background-size: 80%;
  }
}

@keyframes anim-radial-header-big {
  from {
    background-position-x: 80% - 80% / 4;
    background-size: 80%;
  }
  to {
    background-position-x: 70% - 70% / 4;
    background-size: 70%;
  }
}

@keyframes anim-nav-text-header {
  from {
    text-shadow: 0px 0px 20px color-get("white.2");
  }
  to {
    text-shadow: 0px 0px 20px color-get("white.5");
  }
}

.header {
  display: flex;
  position: sticky;
  top: 0;
  padding: $padding;
  margin-bottom: 120px;
  justify-content: space-between;

  @include m("top") {
    transition: transform 200ms linear;
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 50vh;
    transform: translate(-$padding, -75%);
    z-index: -1;
    animation: anim-radial-header 10s ease-in-out infinite alternate;
    background: radial-gradient(
      closest-side,
      color-get("grey"),
      color-get("blue")
    );
    background-position-x: 90% - 90% / 4;
    background-size: 90%;
    background-repeat: no-repeat;

    @include bp("grid-big") {
      transform: translate(-$padding, -60%);
      animation-name: anim-radial-header-big;
      background-position-x: 80% - 80% / 4;
      background-size: 80%;
    }
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
    text-shadow: 10px -5px 10px color-get("black");

    &:hover {
      animation: anim-nav-text-header 1s linear infinite alternate;
    }
  }
}
</style>
