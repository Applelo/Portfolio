<template lang="pug">
  v-select(
    :options="options"
    v-model="selected"
    :clearable="false"
    :searchable="false"
    :filterable="false"
  )
</template>

<script lang="ts">
import Vue from 'vue';
import VueSelect from 'vue-select';
Vue.component('v-select', VueSelect);

export default Vue.extend({
  props: ['options'],
  computed: {
    selected: {
      get: function (): string {
        const filter = this.$route.query.filter;
        const path = `projects.filters.items.${
          filter ? filter : 'highlighted'
        }`;
        return this.$t(path) as string;
      },
      set: function (payload: any): void {
        const filter = payload.value;
        const query = filter === 'highlighted' ? {} : { filter };

        const hash = this.$i18n.locale === 'fr' ? 'projets' : 'projects';

        this.$router.push({
          query,
          hash,
        });
      },
    },
  },
});
</script>

<style lang="scss">
$vs-colors: (
  dark: color-get('white'),
);

$vs-border-radius: $padding;
$vs-border-color: color-get('white.2');

$vs-controls-color: color-get('white');
$vs-state-active-bg: color-get('blue');

$vs-dropdown-bg: color-get('blue');
$vs-dropdown-box-shadow: 0px 3px 6px 0px color-get('black');
@import 'vue-select/src/scss/vue-select.scss';
$padding-select: calc(#{$padding - 2px - 2px} - 0.25em);

.v-select {
  @extend %text-small;
}

.vs__dropdown-toggle {
  background-color: color-get('blue');
  padding: 0 $padding-select 4px $padding-select;
}

.vs__dropdown-option {
  color: color-get('white.7');

  &:hover,
  &:focus-visible {
    color: color-get('white');
    animation: anim-text-shadow-hover $shadow-hover-anim;
  }
}

.vs--single {
  &.vs--open .vs__selected {
    opacity: 0.7;
  }
}
</style>
