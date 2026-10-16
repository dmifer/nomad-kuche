import Script from "next/script";

const SITE_URL = "https://nomadkuche.com";
const TITLE = "Nomad Küche — Central Asian Cuisine in Vienna";
const DESCRIPTION = "Intimate cooking workshops, pop-up dinners and shared table experiences Handmade. Authentic. Unforgettable.";
const SHORT_DESCRIPTION = "Intimate cooking workshops, pop-up dinners and shared table experiences";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: "manty workshop, Central Asian cuisine, Vienna food experience, Kyrgyz cooking, cultural dining, nomad kitchen",
  authors: [{ name: "Nomad Küche" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Nomad Küche",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport = {
  themeColor: "#1A1410",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
