<template lang="pug">
  section(v-if="title" :class="`section--${type}`" :id='slug(title)').section
    template(v-if="type === 'about'")
      h2.is-hidden {{title}}
    .section__header(v-else)
      h2.section__title {{title}}
      button.section__rocket(@click="goToTop()" ref='rocket')
        RocketSvg
    slot
</template>

<script lang="ts">
import Vue from "vue";
import slugify from "slugify";
import RocketSvg from "~/assets/icons/rocket.svg?inline";

export default Vue.extend({
  props: { title: String, type: String },
  components: { RocketSvg },
  methods: {
    slug(str: string) {
      return slugify(str, { lower: true });
    },
    goToTop() {
      const rocket = this.$refs.rocket as HTMLElement;
      rocket.style.transform = "translateY(-200%) rotate(-45deg)";
      setTimeout(() => {
        window.scrollTo({ behavior: "smooth", top: 0, left: 0 });
        rocket.style.transform = "";
      }, 75);
    },
  },
});
</script>

<style lang="scss">
.section {
  height: 100vh;
  margin: 0 $padding;
  position: relative;
  overflow: hidden;

  &:not(:last-child) {
    border-bottom: 1px solid color-get("white.2");
  }

  @include m("about") {
    height: calc(100vh - 77px);

    @include bp("grid-bigger") {
      height: calc(100vh - 90px);
    }
  }

  @include e("header") {
    display: flex;
    justify-content: space-between;
    padding-top: $padding;
  }

  @include e("rocket") {
    width: $text-30-lineheight;
    height: $text-30-lineheight;
    -webkit-appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    transform: rotate(0deg);
    transition: transform linear 200ms;

    @include bp("grid-bigger") {
      width: $text-40-lineheight;
      height: $text-40-lineheight;
    }

    &:hover {
      transform: rotate(-45deg);
    }
  }
}
</style>
