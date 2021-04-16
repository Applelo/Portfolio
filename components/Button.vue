<template lang="pug">
  button.button
    span {{title}}
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title"],
});
</script>

<style lang="scss">
@keyframes anim-button {
  from {
    box-shadow: 0px 0px 20px color-get("white.2");
  }
  to {
    box-shadow: 0px 0px 20px color-get("white.5");
  }
}

.button {
  -webkit-appearance: none;
  border: 0;
  background-color: transparent;
  color: color-get("blue");
  background-color: color-get("white");
  height: $text-30-lineheight;
  padding: 0 $padding / 2;
  border-radius: 25px;
  text-transform: lowercase;
  cursor: pointer;
  box-shadow: 10px -5px 10px color-get("black");

  @include bp("grid-bigger") {
    height: $text-40-lineheight;
    padding: 0 $padding;
  }

  &:hover {
    animation: anim-button 1s linear infinite alternate;
  }

  span {
    position: relative;
    top: -3px;
  }
}
</style>
