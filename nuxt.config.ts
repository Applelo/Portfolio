import { faviconsLink, faviconsMeta } from './resources/favicons';

const title = 'Loïs Boubault';

export default {
  title,
  target: 'static',
  ssr: false,
  head: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      ...faviconsMeta,
    ],
    link: [...faviconsLink],
  },
  components: true,
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/style-resources'],
  css: ['~/assets/scss/base.scss'],
  styleResources: {
    scss: [
      'breakpoint-sass/stylesheets/_breakpoint.scss',
      './assets/scss/mixins/*.scss',
      './assets/scss/vars/*.scss',
    ],
  },
  modules: [
    '@nuxt/http',
    [
      '@nuxt/content',
      {
        markdown: {
          remarkPlugins: [
            'remark-squeeze-paragraphs',
            'remark-slug',
            'remark-autolink-headings',
            'remark-external-links',
            'remark-footnotes',
            'remark-breaks',
          ],
        },
      },
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          { code: 'en', iso: 'en-US', file: 'en.ts' },
          { code: 'fr', iso: 'fr-FR', file: 'fr.ts' },
        ],
        strategy: 'prefix',
        defaultLocale: 'fr',
        langDir: '~/i18n/',
        seo: true,
        baseUrl: process.env.URL || 'http://localhost:3000',
      },
    ],
  ],
  publicRuntimeConfig: {
    title,
    baseURL: process.env.URL || 'http://localhost:3000',
  },
};
