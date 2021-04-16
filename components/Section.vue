<template lang="pug">
  section(v-if="title" :class="`section--${type}`" :id='slug(title)').section
    h2(:class="type === 'about' ? 'is-hidden' : ''").section__title {{title}}
    slot
</template>

<script lang="ts">
import Vue from "vue";
import slugify from "slugify";

export default Vue.extend({
  props: { title: String, type: String },
  methods: {
    slug(str: string) {
      return slugify(str, { lower: true });
    },
  },
});
</script>

<style lang="scss">
.section {
  height: 100vh;
  margin: 0 $padding;
  border-top: 1px solid color-get("white.2");
  position: relative;
  overflow: hidden;

  @include m("about") {
    border: none;
    height: calc(100vh - 77px);
  }

  @include m("contact") {
    background: radial-gradient(
      closest-side,
      color-get("grey"),
      color-get("blue")
    );
    background-size: 50vw 50vw;
    background-position: center;
    background-repeat: no-repeat;

    &::before {
      content: "";
      background-color: transparent;
      z-index: 1;
      border: 2px solid color-get("white");
      width: 60vw;
      height: 60vw;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @include e("header") {
    display: flex;
    justify-content: space-between;
  }

  @include e("title") {
    padding-top: $padding;
  }
}
</style>
