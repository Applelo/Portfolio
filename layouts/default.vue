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
    };
  },
  beforeDestroy() {
    this.observer?.disconnect();
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
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
      { threshold: 0 }
    );
  },
});
</script>
