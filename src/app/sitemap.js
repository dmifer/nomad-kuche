export const dynamic = "force-static";

const languages = {
  en: "https://nomadkuche.com/",
  de: "https://nomadkuche.com/de/",
};

export default function sitemap() {
  const lastModified = new Date();
  return Object.values(languages).map((url) => ({
    url,
    lastModified,
    changeFrequency: "monthly",
    priority: url === languages.en ? 1 : 0.9,
    alternates: { languages },
  }));
}
