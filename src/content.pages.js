/* Copy for the multi-page structure (nav, home sections, workshop/about/gift/privacy pages).
   Merged over the base objects in content.js. */

export const en = {
  nav: [
    { label: "Home", key: "home" },
    { label: "Manty", key: "manty" },
    { label: "Lagman", key: "lagman" },
    { label: "Gift", key: "gift" },
    { label: "Story", key: "story" },
    { label: "Gallery", key: "gallery" },
    { label: "Contact", key: "contact" },
  ],

  home_page: {
    workshopsCta: "View & book →",
    facts: "12–15 guests · 2–3 h",
    aboutTeaserCta: "Read our story →",
    gift: {
      tag: "Voucher",
      title: "Gift a Workshop",
      text: "A hands-on evening of Central Asian cooking, wrapped as a voucher. Available for Manty, Lagman or a free amount.",
      cta: "Request a voucher",
    },
    private: {
      title: "Private Events & Collaborations",
      sub: "Your group, your occasion, or a partnership - tell us what you have in mind.",
    },
  },

  workshop_page: {
    stepsTitle: "How the workshop goes",
    alsoPre: "Also on offer: ",
    giftPre: "Looking for a gift? ",
    giftLink: "Gift a workshop",
    reserveSub: "Choose a date and time that works for you.",
  },

  about_page: {
    kicker: "Our story",
    title: "Our Story",
    storyLabel: "The story",
    ctaTitle: "Join us at the table",
    cta: "See the workshops",
  },

  footer_cols: { explore: "Explore", contact: "Contact", legal: "Legal" },

  pages: {
    manty: { title: "Manty Cooking Workshop in Vienna — Nomad Küche", description: "Learn to make manty by hand: dough, filling, folds, sauces and a shared table. A 2–3 hour cooking workshop for 12–15 guests in Vienna." },
    lagman: { title: "Lagman Cooking Workshop in Vienna — Nomad Küche", description: "Pull lagman noodles by hand and cook a rich, savoury sauce. A 2–3 hour cooking workshop for 12–15 guests in Vienna." },
    gift: { title: "Gift a Cooking Workshop — Nomad Küche", description: "Give a Central Asian cooking workshop in Vienna as a gift. Voucher for Manty, Lagman or a free amount." },
    gallery: { title: "Gallery — Nomad Küche", description: "Photos from Nomad Küche cooking workshops in Vienna: handmade manty, shared tables and Central Asian food." },
    story: { title: "Our Story — Nomad Küche", description: "The story behind Nomad Küche: a Uyghur family, a Kyrgyz kitchen and Central Asian food culture shared in Vienna." },
  },

  legal: {
    privacyLabel: "Privacy Policy",
    privacy: {
      title: "Privacy Policy",
      metaTitle: "Privacy Policy — Nomad Küche",
      metaDescription: "How Nomad Küche processes personal data on this website.",
      updated: "Last updated: October 2026",
      sections: [
        { h: "1. Controller", p: [
          "The controller for data processing on this website is Nargiza Korgoldoeva (sole proprietor), Miciostrasse 3, 1150 Vienna, Austria. Email: nargiza@nomadkuche.com. Phone: +43 664 2239463.",
        ] },
        { h: "2. Overview and legal bases", p: [
          "We process personal data in line with the GDPR and the Austrian Data Protection Act (DSG). Our legal bases are your consent (Art. 6(1)(a) GDPR), performing a contract or taking steps before a contract at your request (Art. 6(1)(b)), and our legitimate interest in a secure, working website (Art. 6(1)(f)).",
        ] },
        { h: "3. Hosting (GitHub Pages)", p: [
          "This website is hosted on GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA, a Microsoft company). When you visit the site, technically necessary data such as your IP address, date and time, requested page and browser information is processed in server log files. Legal basis: Art. 6(1)(f) GDPR. Data may be transferred to the USA on the basis of the EU-US Data Privacy Framework or standard contractual clauses.",
        ] },
        { h: "4. Cookies and local storage", p: [
          "We store your cookie choice in your browser's local storage (key \"nk_consent\"). This is technically necessary to remember your decision. Analytics and marketing only run after you accept. You can change your choice at any time via \"Cookie settings\" in the footer.",
          "The traffic source of your visit (for example a link or campaign tag) is kept in memory only and is passed to the booking form so we can see where bookings come from. It is not stored in a cookie.",
        ] },
        { h: "5. Google Tag Manager and Google Analytics 4", p: [
          "With your consent we use Google Tag Manager and Google Analytics 4 (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland; Google LLC, USA) to measure how the site is used: page views, clicks, section views and key actions such as a booking, a contact request or a voucher request. We use Google Consent Mode: without your consent no analytics or advertising cookies are set, although Google Tag Manager is loaded and your IP address reaches Google when the page loads, and Google may receive cookieless signals. Legal basis for analytics: your consent (Art. 6(1)(a) GDPR). You can withdraw it at any time.",
        ] },
        { h: "6. Google Fonts", p: [
          "The fonts on this site are loaded from Google servers (fonts.googleapis.com, fonts.gstatic.com). Your IP address is transmitted to Google when the page loads. Legal basis: Art. 6(1)(f) GDPR (a consistent, attractive presentation).",
        ] },
        { h: "7. Booking via Cal.com", p: [
          "On the workshop pages we embed the booking calendar of Cal.com (Cal.com, Inc., USA). Loading it transmits your IP address to Cal.com. When you book, Cal.com processes the data you enter (name, email, date, number of guests, allergies, dietary wishes) so we can confirm and run your booking. Legal basis: Art. 6(1)(b) GDPR. Please also see Cal.com's privacy policy.",
        ] },
        { h: "8. Voucher requests, email and WhatsApp", p: [
          "If you request a voucher, we process the data you enter (name, email, voucher details, message) to answer your request and to prepare payment and the voucher. The form is sent through a form service provider acting on our behalf (currently planned: Formspree, Inc., USA). If you email us or message us on WhatsApp (WhatsApp Ireland Limited / Meta), we process your contact details and message to answer you. Legal basis: Art. 6(1)(b) or (f) GDPR.",
        ] },
        { h: "9. Links to other sites", p: [
          "We link to Instagram (Meta), WhatsApp and Google Maps. These are plain links: data is only sent to those providers once you click them, and their own privacy policies apply.",
        ] },
        { h: "10. Retention", p: [
          "We delete your data once it is no longer needed for the purpose it was collected for. Booking and payment records are kept for the statutory retention period (generally 7 years under Austrian tax and commercial law). Contact requests without a contract are deleted after the matter is closed, unless claims are still possible.",
        ] },
        { h: "11. Your rights", p: [
          "You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21 GDPR), and to withdraw consent at any time (Art. 7(3)) without affecting the lawfulness of earlier processing. Please write to nargiza@nomadkuche.com.",
          "You can also complain to the Austrian Data Protection Authority: Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Vienna, www.dsb.gv.at, dsb@dsb.gv.at.",
        ] },
      ],
    },
  },
};

export const de = {
  nav: [
    { label: "Home", key: "home" },
    { label: "Manty", key: "manty" },
    { label: "Lagman", key: "lagman" },
    { label: "Gutschein", key: "gift" },
    { label: "Geschichte", key: "story" },
    { label: "Galerie", key: "gallery" },
    { label: "Kontakt", key: "contact" },
  ],

  home_page: {
    workshopsCta: "Ansehen & buchen →",
    facts: "12–15 Gäste · 2–3 Std.",
    aboutTeaserCta: "Unsere Geschichte lesen →",
    gift: {
      tag: "Gutschein",
      title: "Einen Workshop verschenken",
      text: "Ein Abend voller zentralasiatischer Kochkunst als Gutschein. Für Manty, Lagman oder einen freien Betrag.",
      cta: "Gutschein anfragen",
    },
    private: {
      title: "Private Events & Kooperationen",
      sub: "Deine Gruppe, dein Anlass oder eine Partnerschaft – erzähl uns, was du vorhast.",
    },
  },

  workshop_page: {
    stepsTitle: "So läuft der Workshop ab",
    alsoPre: "Ebenfalls im Angebot: ",
    giftPre: "Auf der Suche nach einem Geschenk? ",
    giftLink: "Workshop verschenken",
    reserveSub: "Wähle einen Termin, der dir passt.",
  },

  about_page: {
    kicker: "Unsere Geschichte",
    title: "Unsere Geschichte",
    storyLabel: "Die Geschichte",
    ctaTitle: "Komm an unseren Tisch",
    cta: "Workshops ansehen",
  },

  footer_cols: { explore: "Entdecken", contact: "Kontakt", legal: "Rechtliches" },

  pages: {
    manty: { title: "Manty-Kochworkshop in Wien — Nomad Küche", description: "Manty von Hand zubereiten: Teig, Füllung, Falten, Saucen und eine gemeinsame Tafel. Kochworkshop für 12–15 Gäste in Wien, 2–3 Stunden." },
    lagman: { title: "Lagman-Kochworkshop in Wien — Nomad Küche", description: "Lagman-Nudeln von Hand ziehen und eine herzhafte Sauce kochen. Kochworkshop für 12–15 Gäste in Wien, 2–3 Stunden." },
    gift: { title: "Kochworkshop verschenken — Nomad Küche", description: "Verschenke einen zentralasiatischen Kochworkshop in Wien. Gutschein für Manty, Lagman oder einen freien Betrag." },
    gallery: { title: "Galerie — Nomad Küche", description: "Fotos von den Kochworkshops von Nomad Küche in Wien: handgemachte Manty, gemeinsame Tafeln und zentralasiatisches Essen." },
    story: { title: "Unsere Geschichte — Nomad Küche", description: "Die Geschichte hinter Nomad Küche: eine uigurische Familie, eine kirgisische Küche und zentralasiatische Esskultur in Wien." },
  },

  legal: {
    privacyLabel: "Datenschutz",
    privacy: {
      title: "Datenschutzerklärung",
      metaTitle: "Datenschutzerklärung — Nomad Küche",
      metaDescription: "Wie Nomad Küche personenbezogene Daten auf dieser Website verarbeitet.",
      updated: "Stand: Oktober 2026",
      sections: [
        { h: "1. Verantwortliche", p: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist Nargiza Korgoldoeva (Einzelunternehmerin), Miciostrasse 3, 1150 Wien, Österreich. E-Mail: nargiza@nomadkuche.com. Telefon: +43 664 2239463.",
        ] },
        { h: "2. Überblick und Rechtsgrundlagen", p: [
          "Wir verarbeiten personenbezogene Daten im Einklang mit der DSGVO und dem österreichischen Datenschutzgesetz (DSG). Rechtsgrundlagen sind deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Erfüllung eines Vertrags oder vorvertragliche Maßnahmen auf deine Anfrage (Art. 6 Abs. 1 lit. b) sowie unser berechtigtes Interesse an einer sicheren, funktionierenden Website (Art. 6 Abs. 1 lit. f).",
        ] },
        { h: "3. Hosting (GitHub Pages)", p: [
          "Diese Website wird bei GitHub Pages gehostet (GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA, ein Unternehmen von Microsoft). Beim Besuch werden technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite und Browserinformationen in Server-Logfiles verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Eine Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln.",
        ] },
        { h: "4. Cookies und lokaler Speicher", p: [
          "Wir speichern deine Cookie-Entscheidung im lokalen Speicher deines Browsers (Schlüssel „nk_consent“). Das ist technisch notwendig, um deine Entscheidung zu merken. Analyse und Marketing laufen erst nach deiner Zustimmung. Du kannst deine Auswahl jederzeit über „Cookie-Einstellungen“ im Footer ändern.",
          "Die Herkunft deines Besuchs (z. B. ein Link oder ein Kampagnen-Tag) wird nur im Arbeitsspeicher gehalten und an das Buchungsformular übergeben, damit wir sehen, woher Buchungen kommen. Sie wird nicht in einem Cookie gespeichert.",
        ] },
        { h: "5. Google Tag Manager und Google Analytics 4", p: [
          "Mit deiner Einwilligung nutzen wir den Google Tag Manager und Google Analytics 4 (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland; Google LLC, USA), um die Nutzung der Website zu messen: Seitenaufrufe, Klicks, Abschnittsansichten und wichtige Aktionen wie Buchung, Kontaktanfrage oder Gutscheinanfrage. Wir verwenden den Google Consent Mode: Ohne Einwilligung werden keine Analyse- oder Werbe-Cookies gesetzt; der Google Tag Manager wird jedoch geladen, deine IP-Adresse erreicht Google beim Laden der Seite, und Google kann cookielose Signale erhalten. Rechtsgrundlage für die Analyse: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Du kannst sie jederzeit widerrufen.",
        ] },
        { h: "6. Google Fonts", p: [
          "Die Schriftarten dieser Website werden von Google-Servern geladen (fonts.googleapis.com, fonts.gstatic.com). Dabei wird deine IP-Adresse beim Laden der Seite an Google übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (einheitliche, ansprechende Darstellung).",
        ] },
        { h: "7. Buchung über Cal.com", p: [
          "Auf den Workshop-Seiten binden wir den Buchungskalender von Cal.com (Cal.com, Inc., USA) ein. Beim Laden wird deine IP-Adresse an Cal.com übermittelt. Bei einer Buchung verarbeitet Cal.com die von dir eingegebenen Daten (Name, E-Mail, Termin, Gästezahl, Allergien, Ernährungswünsche), damit wir deine Buchung bestätigen und durchführen können. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Bitte beachte auch die Datenschutzerklärung von Cal.com.",
        ] },
        { h: "8. Gutscheinanfragen, E-Mail und WhatsApp", p: [
          "Wenn du einen Gutschein anfragst, verarbeiten wir die eingegebenen Daten (Name, E-Mail, Gutscheindaten, Nachricht), um deine Anfrage zu beantworten sowie Zahlung und Gutschein vorzubereiten. Das Formular wird über einen Formular-Dienstleister in unserem Auftrag übermittelt (derzeit vorgesehen: Formspree, Inc., USA). Wenn du uns per E-Mail oder WhatsApp (WhatsApp Ireland Limited / Meta) schreibst, verarbeiten wir deine Kontaktdaten und Nachricht, um dir zu antworten. Rechtsgrundlage: Art. 6 Abs. 1 lit. b oder f DSGVO.",
        ] },
        { h: "9. Links zu anderen Seiten", p: [
          "Wir verlinken auf Instagram (Meta), WhatsApp und Google Maps. Das sind reine Links: Daten werden erst übertragen, wenn du sie anklickst, danach gelten die Datenschutzbestimmungen der jeweiligen Anbieter.",
        ] },
        { h: "10. Speicherdauer", p: [
          "Wir löschen deine Daten, sobald sie für den Zweck der Erhebung nicht mehr erforderlich sind. Buchungs- und Zahlungsunterlagen bewahren wir für die gesetzliche Frist auf (in der Regel 7 Jahre nach österreichischem Steuer- und Unternehmensrecht). Kontaktanfragen ohne Vertrag werden nach Abschluss der Angelegenheit gelöscht, sofern keine Ansprüche mehr möglich sind.",
        ] },
        { h: "11. Deine Rechte", p: [
          "Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO) sowie das Recht, eine Einwilligung jederzeit zu widerrufen (Art. 7 Abs. 3), ohne dass die Rechtmäßigkeit der bisherigen Verarbeitung berührt wird. Schreib dazu an nargiza@nomadkuche.com.",
          "Du kannst dich außerdem bei der österreichischen Datenschutzbehörde beschweren: Österreichische Datenschutzbehörde, Barichgasse 40–42, 1030 Wien, www.dsb.gv.at, dsb@dsb.gv.at.",
        ] },
      ],
    },
  },
};
