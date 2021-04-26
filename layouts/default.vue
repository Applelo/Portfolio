<template lang="pug">
  .wrapper
    HeaderRadiant
    Header
    main
      Section(:title="$t('about.title')" type='about' :observe="observer")
        About
      Section(:title="$t('projects.title')" type='projects' :observe="observer")
        Projects
      Section(:title="$t('contact.title')" type='contact' :observe="observer")
        Contact
      Rocket.rocket--mobile
    Footer
    Nuxt
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      observer: null as null | IntersectionObserver,
      interval: undefined as undefined | number,
      count: 1,
    };
  },
  head() {
    const c: string = this.count.toString();
    return {
      link:
        // @ts-ignore ignore
        typeof this.interval === 'undefined'
          ? []
          : [
              {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: `/favicons/anim/16x16/${c}.png`,
              },
              {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: `/favicons/anim/32x32/${c}.png`,
              },
              {
                rel: 'icon',
                type: 'image/png',
                sizes: '96x96',
                href: `/favicons/anim/96x96/${c}.png`,
              },
              {
                rel: 'icon',
                type: 'image/png',
                sizes: '192x192',
                href: `/favicons/anim/192x192/${c}.png`,
              },
            ],
    };
  },
  methods: {
    intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
      let intersectionRatio = 0;
      let hash: string | false = false;

      for (let index = 0; index < entries.length; index++) {
        const entry = entries[index];
        const intersectionEl = entry.target as HTMLElement;
        const section = intersectionEl.closest('.section') as HTMLElement;

        // update active
        const hrefTitle = section?.querySelector('.section__title');
        if (hrefTitle)
          hrefTitle.classList[entry.isIntersecting ? 'add' : 'remove'](
            'is-active'
          );

        // update anchor
        if (
          !entry.isIntersecting ||
          intersectionRatio > entry.intersectionRatio
        )
          continue;
        intersectionRatio = entry.intersectionRatio;

        if (section && !section.classList.contains('section--about')) {
          // The link
          const id = section.id;
          if (!id) return;
          hash = id;
        } else {
          hash = '';
        }
      }

      if (hash !== false) {
        const url = new URL(window.location.toString());
        url.hash = hash;
        window.history.pushState(null, '', url.toString());
      }
    },
    faviconAnim() {
      if (this.count === 12) {
        this.count = 1;
      } else {
        this.count++;
      }
    },
  },
  beforeDestroy() {
    this.observer?.disconnect();
    clearInterval(this.interval);
  },
  mounted() {
    this.observer = new IntersectionObserver(
      this.intersectionObserverCallback,
      { threshold: 0 }
    );

    // Favicon animation
    if (window.innerWidth > 768)
      this.interval = window.setInterval(this.faviconAnim, 1000);
  },
});
</script>
