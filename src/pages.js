/* Route registry. `noindex` pages are excluded from sitemap.js and get a noindex meta tag. */
export const PAGES = {
  home: { en: "/", de: "/de/" },
  manty: { en: "/workshops/manty/", de: "/de/workshops/manty/" },
  lagman: { en: "/workshops/lagman/", de: "/de/workshops/lagman/" },
  gift: { en: "/gift/", de: "/de/gutschein/" },
  gallery: { en: "/gallery/", de: "/de/galerie/" },
  story: { en: "/story/", de: "/de/geschichte/" },
  privacy: { en: "/privacy/", de: "/de/datenschutz/" },
  impressum: { en: "/impressum/", de: "/de/impressum/" },
  thanks: { en: "/thank-you/", de: "/de/danke/", noindex: true },
};
