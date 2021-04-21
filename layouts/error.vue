<template lang="pug">
  Section(:title="errorTitle" type='error')
    .error
      .error__message
        p {{errorMessage}}
        p.error__back
          NuxtLink(:to="{name: 'index'}" v-t="'error.back'")
      .error__crazy
    SocialHead(:title="errorTitle" :description="error.message")
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['error'],
  layout: 'errors',
  computed: {
    errorTitle() {
      return this.$t('error.title', { statusCode: this.error.statusCode });
    },
    errorMessage() {
      const path = `error.${this.error.statusCode}`;
      // @ts-ignore value exist
      const message = this.$t(path) as string;
      // @ts-ignore value exist
      return path === message ? this.error.message : message;
    },
  },
});
</script>

<style lang="scss">
.error {
  @include e('message') {
    margin-top: 20px;
    @extend %text-small;

    p {
      margin: 0;

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
  }
}
</style>
