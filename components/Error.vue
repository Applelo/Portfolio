<template lang="pug">
  Section(:title="errorTitle" type='error')
    .error
      .error__message
        p {{errorMessage}}
        p.error__back
          NuxtLink(:to="{name: 'index'}" v-t="'error.back'")
      .error__cats
        img.error__cat(v-for="cat in limitCats" :key="cat.id" :src="cat.src" :style="cat.position")
    SocialHead(:title="errorTitle" :description="error.message")
</template>

<script lang="ts">
interface Cat {
  src: string;
  position: string;
  id: string;
}

import Vue from 'vue';
export default Vue.extend({
  props: ['error'],
  data() {
    return {
      cats: [] as Cat[],
      interval: 0,
      count: 0,
    };
  },
  async fetch() {
    const url = `https://cataas.com/api/cats?limit=50&skip=${
      Math.random() * 100
    }`;
    const res = await this.$http.get(url);
    const json = (await res.json()) as any[];
    for (let index = 0; index < json.length; index++) {
      const item = json[index];
      const top = Math.floor(Math.random() * 100);
      const left = Math.floor(Math.random() * 100);
      const cat = {
        src: `https://cataas.com/cat/${item.id}`,
        position: `top:${top.toString()}%;left:${left.toString()}%;`,
        id: item.id,
      };
      this.cats.push(cat);
    }
  },
  methods: {
    addCat() {
      if (this.count > 50) {
        clearInterval(this.interval);
        return;
      }
      this.count++;
    },
  },
  computed: {
    limitCats(): Cat[] {
      return this.cats.slice(0, this.count);
    },
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
    this.addCat();
    this.interval = window.setInterval(this.addCat, 1000);
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
