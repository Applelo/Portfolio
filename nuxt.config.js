export default {
  target: "static",
  components: true,
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/google-fonts",
    // "nuxt-purgecss",
    "@nuxtjs/style-resources",
  ],
  css: ["~/assets/scss/base.scss"],
  styleResources: {
    scss: [
      "breakpoint-sass/stylesheets/_breakpoint.scss",
      "./assets/scss/mixins/*.scss",
      "./assets/scss/vars/*.scss",
    ],
  },
  modules: [
    [
      "nuxt-i18n",
      {
        locales: [
          { code: "en", iso: "en-US", file: "en.js" },
          { code: "fr", iso: "fr-FR", file: "fr.js" },
        ],
        defaultLocale: "en",
        langDir: "~/i18n/",
      },
    ],
  ],
  googleFonts: {
    display: "swap",
    families: {
      Arvo: {
        wght: [400, 700],
        ital: [400],
      },
    },
  },
};
