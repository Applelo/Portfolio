<template lang="pug">
  .about
    .about__text
      slot
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss">
.about {
  margin-top: 90px;

  @include bp('grid-bigger') {
    margin-top: 120px;
  }
}
</style>
