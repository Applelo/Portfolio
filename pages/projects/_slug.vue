<template lang="pug">
  .modal
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  async asyncData({ $content, params }) {
    const article = await $content('projects', params.slug).fetch();

    return { article };
  },
});
</script>

<style lang="scss">
.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
