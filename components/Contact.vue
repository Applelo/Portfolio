<template lang="pug">
  .contact
    .contact__container
      ContactIcon(
        type='twitter'
        href='https://twitter.com/Applel0'
        target='_blank'
        @mouseover.native="changeLabelOnHover('twitter')"
        @mouseleave.native="changeLabelOnHover(false)"
      )
      ContactIcon(
        type='github'
        href='https://github.com/Applelo'
        target='_blank'
        @mouseover.native="changeLabelOnHover('github')"
        @mouseleave.native="changeLabelOnHover(false)"
      )
      ContactIcon(
        type='email'
        href='mailto:boubaultlois@gmail.com'
        target='_blank'
        @mouseover.native="changeLabelOnHover('email')"
        @mouseleave.native="changeLabelOnHover(false)"
      )
      ContactIcon(
        type='linkedin'
        href='https://www.linkedin.com/in/loisboubault/'
        target='_blank'
        @mouseover.native="changeLabelOnHover('linkedin')"
        @mouseleave.native="changeLabelOnHover(false)"
      )
      p.contact__label(ref='label')
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      labelHoverTimeout: 0,
    };
  },
  methods: {
    changeLabelOnHover(type: string | false) {
      const label = this.$refs.label as HTMLElement;
      clearTimeout(this.labelHoverTimeout);
      if (type) {
        label.textContent = this.$t(`contact.socials.${type}`).toString();
        label.classList.add('is-active');
      } else {
        this.labelHoverTimeout = window.setTimeout(() => {
          label.textContent = '';
        }, 200);

        label.classList.remove('is-active');
      }
    },
  },
});
</script>

<style lang="scss">
.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;

  @include e('container') {
    position: relative;
    background-color: transparent;
    border: 2px solid color-get('white');
    width: 50vw;
    height: 50vw;
    border-radius: 50%;
    margin: 5vw;

    @include bp('grid-big') {
      margin: 100px;
    }

    @include bp('grid-width') {
      width: bp-get('grid-width') / 2;
      height: bp-get('grid-width') / 2;
    }

    &::before {
      content: '';
      background: radial-gradient(
        closest-side,
        color-get('grey'),
        color-get('blue')
      );
      width: 100%;
      height: 100%;
      background-size: 40vw 40vw;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      z-index: -1;
    }
  }

  @include e('label') {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include typography-setup($text-20..., $margins: false);
    margin: 0;
    opacity: 0;
    transition: opacity 200ms linear;

    @include bp('0-to-3') {
      opacity: 0;
    }

    @include bp('grid-big') {
      &.is-active {
        opacity: 1;
        animation: anim-text-shadow-hover $shadow-hover-anim;
      }
    }
  }
}
</style>
