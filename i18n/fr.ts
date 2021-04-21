export default {
  meta: {
    title: 'Loïs Boubault | Portfolio',
    description:
      'Vous pouvez trouver ici mon CV, tous mes projets et comment me contacter.',
  },
  header: {
    title: 'Loïs Boubault',
    nav: {
      title: 'Navigation principale',
      items: {
        projects: 'Projets',
        contact: 'Contact',
      },
    },
  },
  about: {
    title: 'A propos',
    cv: 'Téléchargez mon CV',
    cv_mobile: 'CV',
    cv_path: '/files/cv.pdf',
  },
  projects: {
    title: 'Projets',
    filters: {
      title: 'Navigation filtres projets',
      items: {
        highlighted: 'Mis en avant',
        all: 'Tous',
        principal: 'Principal',
        itineraireb: 'itinéraire B',
        hobby: 'Loisir',
      },
    },
    origins: {
      principal: 'Développé à [Principal](https://principal.studio)',
      itineraireb: 'Développé à itinéraire B',
      hobby: 'Développé pendant mon temps libre',
    },
  },
  contact: {
    title: 'Contact',
    socials: {
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      email: 'Contactez moi',
      github: 'GitHub',
    },
  },
  footer: {
    credits: '[Code source](https://github.com/Applelo/Portfolio)',
  },
  goToTop: 'Retourner en haut de la page',
  error: {
    title: 'Erreur {statusCode}',
    back: 'Retourner au portfolio',
    404: 'Cette page ne peut pas être trouvé',
  },
};
