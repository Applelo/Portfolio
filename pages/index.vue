<template lang="pug">
//- Nothing in here (check default.vue)

</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  head() {
    return {
      title: this.$t('meta.title') as string,
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: this.$t('meta.description') as string,
        },
      ],
    };
  },
});
</script>
