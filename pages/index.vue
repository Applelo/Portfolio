<template lang="pug">
  .wrapper
    HeaderRadiant
    Header
    main
      Section(:title="$t('about.title')" type='about')
      Section(:title="$t('projects.title')" type='projects')
      Section(:title="$t('contact.title')" type='contact')
        Contact
</template>
