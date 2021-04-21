<template lang="pug">
  div(ref='radiant').header-radiant
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  methods: {
    updateRadiant(e: MouseEvent) {
      const posX = e.clientX;
      const posY = e.clientY;
      const radiant = this.$refs.radiant as HTMLElement;
      const radiantHeight = radiant.clientHeight / 2;

      if (!radiant) return;

      if (radiantHeight && posY <= radiantHeight) {
        radiant.style.backgroundPositionX = `calc(${posX}px)`;
      } else {
        radiant.style.backgroundPositionX = '';
      }
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.updateRadiant);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.updateRadiant);
  },
});
</script>

<style lang="scss">
@keyframes anim-header-radiant {
  from {
    background-size: 50%;
    left: 50%;
  }

  to {
    background-size: 40%;
    left: calc(50% + 5vw);
  }
}

.header-radiant {
  position: fixed;
  top: 0;
  left: 50%;
  display: block;
  width: 200vw;
  height: 25vh;
  z-index: -1;
  background: radial-gradient(closest-side, color-get('grey'), transparent);
  background-position-x: center;
  background-size: 50%;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  transition: background-position-x linear 100ms;
  animation: anim-header-radiant 2s linear alternate infinite;
}
</style>
