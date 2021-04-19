<template lang="pug">
  .projects
    ul(v-if="projects").projects__list
      li(v-for="project in projects")
        ProjectCard(
          :title="project.title"
          :description="project.description"
          :origin="project.origin"
          :url="project.url"
          :year="project.year"
        )
</template>

<script lang="ts">
import type { IContentDocument } from '@nuxt/content/types/content';
import Vue from 'vue';
export default Vue.extend({
  data() {
    return { projects: [] as IContentDocument[] | IContentDocument };
  },
  async fetch() {
    this.projects = await this.$content(this.$i18n.locale, 'projects')
      .without(['body'])
      .sortBy('year', 'desc')
      .fetch();
  },
  beforeDestroy() {
    window.removeEventListener('updateFetch', this.$fetch);
  },
  mounted() {
    window.addEventListener('updateFetch', this.$fetch);
  },
});
</script>

<style lang="scss">
.projects {
  width: 100%;
  height: 100%;
  margin: 40px 0;

  @include e('list') {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: auto;
    gap: $padding;

    @include bp('3') {
      grid-template-columns: repeat(2, 1fr);
    }

    @include bp('4') {
      grid-template-columns: repeat(3, 1fr);
    }

    @include bp('7') {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
