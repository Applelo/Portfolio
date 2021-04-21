<template lang="pug">
  Section(:title="errorTitle" type='error')
    .error
      .error__message
        p {{errorMessage}}
        p.error__back
          NuxtLink(:to="{name: 'index'}" v-t="'error.back'")
      .error__cats
        img.error__cat(v-for="cat in cats" :src="cat.src" :style="cat.position")
    SocialHead(:title="errorTitle" :description="error.message")
</template>

<script lang="ts">
interface Cat {
  src: string;
  position: string;
}

import Vue from 'vue';
export default Vue.extend({
  props: ['error'],
  layout: 'errors',
  data() {
    return {
      cats: [] as Cat[],
      interval: 0,
      count: 0,
    };
  },
  methods: {
    async addCats() {
      if (this.count > 60) {
        clearInterval(this.interval);
        return;
      }
      this.count++;

      const src = await fetch('https://cataas.com/cat/gif')
        .then(function (response) {
          return response.blob();
        })
        .then(function (myBlob) {
          return URL.createObjectURL(myBlob);
        });

      const cat = {
        src,
        position: this.randomCatPosition(),
      };
      this.cats.push(cat);
    },
    randomCatPosition(): string {
      const top = Math.floor(Math.random() * window.innerWidth);
      const left = Math.floor(Math.random() * window.innerHeight);

      return `top:${top.toString()}px;left:${left.toString()}px;`;
    },
  },
  computed: {
    errorTitle(): string {
      return this.$t('error.title', {
        statusCode: this.error.statusCode,
      }) as string;
    },
    errorMessage(): string {
      const path = `error.${this.error.statusCode}`;
      const message = this.$t(path) as string;

      return path === message ? this.error.message : message;
    },
  },
  mounted() {
    this.addCats();
    this.interval = window.setInterval(this.addCats, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
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

  @include e('cat') {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
