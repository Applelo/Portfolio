<template lang="pug">
  .wrapper
    HeaderRadiant
    Header
    main
      Section(:title="$t('about.title')" type='about')
      Section(:title="$t('projects.title')" type='projects')
        Projects
      Section(:title="$t('contact.title')" type='contact')
        Contact
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  mounted() {
    const touchsupport =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    if (!touchsupport) {
      // browser doesn't support touch
      document.body.classList.add('not-touch');
    }
  },
});
</script>
