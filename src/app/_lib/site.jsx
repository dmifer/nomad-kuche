import ConsentBanner from "../../ConsentBanner";
import { content } from "../../content";
import { PAGES } from "../../pages";

export const SITE_URL = "https://nomadkuche.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const PATHS = PAGES.home;
const ALTERNATES = { en: PAGES.home.en, de: PAGES.home.de, "x-default": PAGES.home.en };

export function buildMetadata(lang, page) {
  if (page) return buildPageMetadata(lang, page);
  const m = content[lang].meta;
  const path = PATHS[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: "Nomad Küche" }],
    alternates: { canonical: path, languages: ALTERNATES },
    icons: { icon: "/favicon.svg" },
    openGraph: {
      type: "website",
      title: m.title,
      description: m.shortDescription,
      url: path,
      siteName: "Nomad Küche",
      locale: m.ogLocale,
      alternateLocale: lang === "en" ? ["de_AT"] : ["en_US"],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.shortDescription,
      images: [OG_IMAGE],
    },
  };
}

function pageCopy(t, page) {
  if (page === "thanks") return { title: t.thanks.metaTitle, description: t.thanks.text };
  if (page === "impressum") return { title: t.legal.impressum.metaTitle, description: t.legal.impressum.metaDescription };
  if (page === "privacy") return { title: t.legal.privacy.metaTitle, description: t.legal.privacy.metaDescription };
  return t.pages[page]; // manty | lagman | gift | about
}

function buildPageMetadata(lang, page) {
  const def = PAGES[page];
  const { title, description } = pageCopy(content[lang], page);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: { icon: "/favicon.svg" },
    // noindex + nofollow; robots.txt must NOT block these URLs or crawlers never see the tag
    robots: def.noindex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical: def[lang], languages: { en: def.en, de: def.de, "x-default": def.en } },
    openGraph: { type: "website", title, description, url: def[lang], siteName: "Nomad Küche", locale: content[lang].meta.ogLocale, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

export const viewport = { themeColor: "#1A1410" };

export function JsonLd({ lang }) {
  const m = content[lang].meta;
  const url = SITE_URL + PATHS[lang];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: "Nomad Küche",
        inLanguage: lang,
      },
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${url}#organization`,
        name: "Nomad Küche",
        url,
        image: OG_IMAGE,
        description: m.orgDescription,
        email: "nargiza@nomadkuche.com",
        founder: { "@type": "Person", name: "Nargiza" },
        areaServed: { "@type": "City", name: lang === "de" ? "Wien" : "Vienna" },
        sameAs: ["https://instagram.com/nomad_kuche"],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: m.workshopName,
              description: m.workshopDescription,
              url: "https://cal.com/nomadkuche/manty-workshop",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: m.lagmanName,
              description: m.lagmanDescription,
              url: "https://cal.com/nomadkuche/lagman-workshop",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: m.privateName,
              description: m.privateDescription,
            },
          },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const CONSENT_AND_GTM = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem('nk_consent')==='granted'){gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KM8LRZ6Q');`;

export function RootShell({ lang, children }) {
  return (
    <html lang={lang}>
      <head>
        {/* Consent Mode v2 defaults + data layer must run before GTM. GA4 is sent by the Google tag inside GTM. */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_AND_GTM }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Karla:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KM8LRZ6Q"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
        <ConsentBanner lang={lang} />
      </body>
    </html>
  );
}
