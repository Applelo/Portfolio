<template lang="pug">
  Error(:error="{statusCode: '404'}")
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  layout: 'errors',
});
</script>
