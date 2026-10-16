import NomadKuche from "../NomadKuche";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://nomadkuche.com/#website",
      url: "https://nomadkuche.com/",
      name: "Nomad Küche",
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": "https://nomadkuche.com/#organization",
      name: "Nomad Küche",
      url: "https://nomadkuche.com/",
      image: "https://nomadkuche.com/og-image.jpg",
      description:
        "Central Asian cooking workshops, pop-up dinners and shared table experiences in Vienna.",
      email: "nargiza@nomadkuche.com",
      founder: { "@type": "Person", name: "Nargiza" },
      areaServed: { "@type": "City", name: "Vienna" },
      sameAs: ["https://instagram.com/nomad_kuche"],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Manty Cooking Workshop",
            description:
              "A hands-on Central Asian cooking experience from dough to shared table, for 12–15 guests, 2–3 hours.",
            url: "https://cal.com/nomadkuche/manty-workshop",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Events",
            description:
              "Private cooking experiences for birthdays, friend gatherings and team events.",
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <NomadKuche />
    </>
  );
}
