<template lang="pug">
  div(:class="classLoader").loader
    .loader__circle
    .loader__circle
    .loader__circle
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: ['pending', 'delay'],
  data() {
    return {
      classLoader: 'is-hidden',
      timeout: 0,
    };
  },
  watch: {
    '$props.pending': 'updateShow',
  },
  methods: {
    updateShow() {
      clearTimeout(this.timeout);

      if (this.$props.pending) {
        this.timeout = window.setTimeout(() => {
          this.classLoader = '';
        }, this.$props.delay);
      } else {
        this.classLoader = 'is-hidden';
      }
    },
  },
});
</script>

<style lang="scss">
@keyframes anim-loader {
  from {
    opacity: 0;
    box-shadow: $shadow-hover-from;
  }
  to {
    box-shadow: $shadow-hover-to;
    opacity: 1;
  }
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  @include e('circle') {
    width: $padding;
    height: $padding;
    border-radius: 50%;
    background-color: color-get('white');
    animation: anim-loader 1s ease-in infinite alternate;
    animation-delay: -1s;

    &:not(:last-child) {
      margin-right: $padding / 2;
    }

    &:nth-child(2) {
      animation-delay: -666ms;
    }

    &:nth-child(3) {
      animation-delay: -333ms;
    }
  }
}
</style>
