<template>
  <span v-if="false" />
</template>

<script lang="ts">
// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'website',
    },
  },

  head() {
    const siteName: string = this.$nuxt.$config.title;
    const baseURL: string = this.$nuxt.$config.baseURL;
    const image = this.image
      ? this.image
      : `${baseURL}/card/${this.$i18n.locale}.png`;
    // TODO: add project

    return {
      title: this.title,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: this.description,
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@Applel0',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: siteName,
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.description,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: image,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: this.title,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: image,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.title,
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: siteName,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: this.type,
        },
      ],
    };
  },
});
</script>
