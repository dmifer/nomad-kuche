import { PAGES } from "../pages";

export const dynamic = "force-static";

const BASE = "https://nomadkuche.com";
const PRIORITY = { home: 1, manty: 0.9, lagman: 0.9, gift: 0.7, story: 0.6, gallery: 0.5, privacy: 0.2, impressum: 0.2 };

// noindex pages (thank-you) are deliberately left out.
export default function sitemap() {
  const lastModified = new Date();
  return Object.entries(PAGES)
    .filter(([, p]) => !p.noindex)
    .flatMap(([key, p]) => {
      const languages = { en: BASE + p.en, de: BASE + p.de };
      return ["en", "de"].map((l) => ({
        url: BASE + p[l], lastModified, changeFrequency: key === "home" ? "monthly" : "yearly",
        priority: l === "de" && key === "home" ? 0.9 : PRIORITY[key], alternates: { languages },
      }));
    });
}
