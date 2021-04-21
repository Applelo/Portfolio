<template lang="pug">
  .projects
    .projects__filters
      .projects__filters-mobile
        ProjectsSelect(:options="options")
      nav.projects__filters-desktop
        h3.is-hidden(v-t="'projects.filters.title'")
        ul.projects__filters-list
          li(v-for="item, index in $t('projects.filters.items')").projects__filters-item
            NuxtLink(:to='getFilterUrl(index)') {{item}}

    ul(v-if="projects").projects__list
      li(v-for="project in projects" :key="project.slug")
        ProjectCard(:project="project")
</template>

<script lang="ts">
import type { IContentDocument } from '@nuxt/content/types/content';
import Vue from 'vue';
import type VueI18n from 'vue-i18n';

export default Vue.extend({
  data() {
    return { projects: [] as IContentDocument[] | IContentDocument };
  },
  watch: {
    '$route.path': '$fetch',
    '$route.query.filter': '$fetch',
  },
  async fetch() {
    const projects = this.$content(this.$i18n.locale, 'projects').without([
      'body',
    ]);

    const filter = this.$route.query.filter;
    if (filter) {
      if (filter !== 'all') {
        projects.where({ origin: { $eq: filter }, 'not-show': { $ne: true } });
      } else {
        projects.where({ 'not-show': { $ne: true } });
      }
    } else {
      projects.where({ highlighted: { $eq: true }, 'not-show': { $ne: true } });
    }

    this.projects = await projects.sortBy('date', 'desc').fetch();
  },
  computed: {
    options() {
      const options = [];
      const filtersItems = this.$t(
        'projects.filters.items'
      ) as VueI18n.LocaleMessages;
      for (const key in filtersItems) {
        if (Object.prototype.hasOwnProperty.call(filtersItems, key)) {
          const item = filtersItems[key];
          options.push({ label: item, value: key });
        }
      }
      return options;
    },
  },
  methods: {
    getFilterUrl(filter: string) {
      const query = filter === 'highlighted' ? {} : { filter };
      return {
        name: 'index',
        query,
        hash: this.$i18n.locale === 'fr' ? 'projets' : 'projects',
      };
    },
  },
});
</script>

<style lang="scss">
.projects {
  width: 100%;
  height: 100%;
  margin: 40px 0;

  @include e('filters') {
    margin: 0 0 20px;
  }

  @include e('filters-mobile') {
    @include bp('grid-big') {
      @include hidden;
    }
  }

  @include e('filters-desktop') {
    @media (min-width: 0px) and (max-width: #{$bp-3 - 1px}) {
      @include hidden;
    }
  }

  @include e('filters-list') {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @include e('filters-item') {
    color: color-get('white');
    @extend %text-small;

    &:not(:last-child) {
      margin-right: 35px;
    }

    a {
      color: color-get('white.5');
      text-decoration: none;

      &:hover,
      &.nuxt-link-exact-active,
      &:focus-visible {
        color: color-get('white');
        animation: anim-text-shadow-hover $shadow-hover-anim;
      }
    }
  }

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
