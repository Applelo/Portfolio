<template lang="pug">
  footer.footer
    p.footer__copyright {{copyright}}
    p(v-html="credits").footer__credits
</template>

<script lang="ts">
import Vue from 'vue';
import { prettify } from '@/mixins/markdown';
export default Vue.extend({
  mixins: [prettify],
  computed: {
    copyright() {
      return '© Loïs Boubault ' + new Date().getFullYear();
    },
    credits() {
      // @ts-ignore prettify exists on mixins
      return this.prettify(this.$t('footer.credits') as string);
    },
  },
});
</script>

<style lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: #{$padding / 2} $padding;
  @extend %text-small;
  color: color-get('white.5');

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
</style>
