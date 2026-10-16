import Script from "next/script";
import { content } from "../../content";

export const SITE_URL = "https://nomadkuche.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const PATHS = { en: "/", de: "/de/" };
const ALTERNATES = { en: "/", de: "/de/", "x-default": "/" };

export function buildMetadata(lang) {
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
        "@type": "Organization",
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

export function RootShell({ lang, children }) {
  return (
    <html lang={lang}>
      <head>
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

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KM8LRZ6Q');`}</Script>

        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7P2D6522X8" strategy="afterInteractive" />
        <Script id="gtag" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-7P2D6522X8');`}</Script>
      </body>
    </html>
  );
}
