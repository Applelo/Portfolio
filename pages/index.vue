<template lang="pug">
  .wrapper
    HeaderRadiant
    Header
    main
      Section(:title="$t('about.title')" type='about')
        About
          nuxt-content(:document="resume")
      Section(:title="$t('projects.title')" type='projects')
        Projects(:projects="projects")
      Section(:title="$t('contact.title')" type='contact')
        Contact
    Footer
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  async asyncData({ app, params, $content }) {
    const resume = await $content(app.i18n.locale, 'resume').fetch();
    const projects = await $content(app.i18n.locale, 'projects')
      .without(['body'])
      .sortBy('year', 'desc')
      .fetch();

    return {
      resume,
      projects,
    };
  },
});
</script>
