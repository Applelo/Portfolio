<template lang="pug">
  .wrapper
    HeaderRadiant
    Header
    main
      Section(:title="$t('about.title')" type='about')
        About
      Section(:title="$t('projects.title')" type='projects')
        Projects
      Section(:title="$t('contact.title')" type='contact')
        Contact
      Rocket.rocket--mobile
    Footer
    Nuxt
</template>
