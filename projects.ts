interface ProjectLang {
  description: string;
  url: string;
}
interface Project {
  title: string;
  origin: 'principal' | 'hobby' | 'itineraireb';
  year: '2018' | '2019' | '2020' | '2021';
  fr: ProjectLang;
  en: ProjectLang;
}

export const projects: Project[] = [
  {
    title: 'Switch SD2Vita',
    origin: 'hobby',
    year: '2018',
    en: {
      description: 'A PSVita utility to switch storage mount of a microSD card',
      url: 'https://github.com/Applelo/SwitchSD2Vita',
    },
    fr: {
      description:
        "Un utilitaire pour PSVita pour changer l'emplacement de stockage de la carte microSD",
      url: 'https://github.com/Applelo/SwitchSD2Vita',
    },
  },
  {
    title: 'Better Admin Users Search',
    origin: 'hobby',
    year: '2019',
    en: {
      description: 'A Wordpress plugin to improve the admin users search',
      url: 'https://wordpress.org/plugins/better-admin-users-search/',
    },
    fr: {
      description:
        "Un plugin Wordpress pour améliorer la recherche d'utilisateurs dans l'administration",
      url: 'https://wordpress.org/plugins/better-admin-users-search/',
    },
  },
  {
    title: 'IRIC',
    origin: 'principal',
    year: '2019',
    en: {
      description:
        'Website for the Institute for Research in Immunology and Cancer of the Université de Montréal',
      url: 'https://www.iric.ca/en',
    },
    fr: {
      description:
        "Site pour l'Institut de recherche en immunologie et en cancérologie de l’Université de Montréal ",
      url: 'https://www.iric.ca/fr',
    },
  },
  {
    title: 'Centrale des artistes',
    origin: 'principal',
    year: '2019',
    en: {
      description: 'Website for the Centrale des artistes',
      url: 'https://www.lacentraledesartistes.com',
    },
    fr: {
      description: "Site pour l'association Centrale des artistes",
      url: 'https://www.lacentraledesartistes.com',
    },
  },
  {
    title: 'Daily Tous Les Jours',
    origin: 'principal',
    year: '2019',
    en: {
      description: 'Website for Daily Tous Les Jours company',
      url: 'https://www.dailytouslesjours.com/en',
    },
    fr: {
      description: "Site pour l'entreprise Daily Tous Les Jours",
      url: 'https://www.dailytouslesjours.com/fr',
    },
  },
  {
    title: 'Dawson',
    origin: 'principal',
    year: '2020',
    en: {
      description: 'Website for Dawson Metal company',
      url: 'https://www.dawsonmetal.com/',
    },
    fr: {
      description: "Site pour l'entreprise Dawson Metal",
      url: 'https://www.dawsonmetal.com/',
    },
  },
  {
    title: 'Fergus',
    origin: 'principal',
    year: '2021',
    en: {
      description: 'Website for Fergus company',
      url: 'https://www.fergus.bio/en',
    },
    fr: {
      description: "Site pour l'entreprise Fergus",
      url: 'https://www.fergus.bio/fr',
    },
  },
  {
    title: 'html-inject-preload-plugin',
    origin: 'principal',
    year: '2021',
    en: {
      description: 'A HTML Webpack Plugin for injecting `link preload`',
      url: 'https://github.com/principalstudio/html-webpack-inject-preload',
    },
    fr: {
      description: 'Un plugin HTML Webpack pour injecter `link preload`',
      url: 'https://github.com/principalstudio/html-webpack-inject-preload',
    },
  },
];
