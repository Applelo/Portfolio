<template lang="pug">
  .wrapper
    Header
    main
      Section(:title="$t('about.title')" type='about')
      Section(:title="$t('projects.title')" type='projects')
      Section(:title="$t('contact.title')" type='contact')
        Icon(type='twitter' href='https://twitter.com/Applel0' target='_blank')
        Icon(type='github' href='https://github.com/Applelo' target='_blank')
        Icon(type='email' href='mailto:boubaultlois@gmail.com' target='_blank')
        Icon(type='linkedin' href='https://www.linkedin.com/in/loisboubault/' target='_blank')
</template>
