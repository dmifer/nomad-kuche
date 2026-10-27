/* Google reviews, copied unaltered by hand. Refresh every 2-3 months.
   To add a review, append an object to `realReviews`. Do not edit, translate or invent reviews.
   While `realReviews` is empty the reviews section is hidden on the live site. */

export const reviewsMeta = {
  rating: 5.0, // from the Google Business Profile (shown as 5,0 on Maps)
  count: null, // e.g. 24 - set once confirmed; hidden while null
  leaveReviewUrl: "", // "Write a review" link from the Google Business Profile
};

// { name: "Anna K.", rating: 5, date: "March 2025", text: "…", lang: "de" }
// Copied unaltered from Google Maps on 2026-10-27 (original language, incl. emoji and typos).
// Google only shows relative dates ("2 months ago"), so `date` is the approximate month.
export const realReviews = [
  {
    name: "Maria Thurner", rating: 5, date: "August 2026", lang: "de",
    text: "Ich durfte an Nargiza‘s erstem Manty Workshop teilnehmen und muss sagen, ich war begeistert. Die liebevolle Begleitung durch den Kochprozess, die guten Erklärungen und auch die Verknüpfungen mit kulturellen Elementen und persönlichen Anekdoten machten diesen Tag zu einem unvergesslichen Erlebnis 👩🏼‍🍳 Die Zutaten waren von hervorragender Qualität und zwischen den einzelnen Arbeitsschritten wurde frisches Obst, Tee und kirgisische Süßigkeiten angeboten 🥹 Absolut empfehlenswert als Solo-Date oder auch als Unternehmung mit Freunden oder Familie!",
  },
  {
    name: "Alrightnacho", rating: 5, date: "August 2026", lang: "de",
    text: "Echt tolle Stimmung! Sehr empfehlenswert",
  },
  {
    name: "Elif Göktas", rating: 5, date: "August 2026", lang: "en",
    text: "The Manty Workshop at Nomad Küche was one of the coolest experiences ever! 🙊 I already knew Manti (turkish version) but had the opportunity to learn how to make a uyghur/kyrgyz version and enjoy it the traditional way 🥰 the vibes were great! our host Nargiza was so kind and you could tell how much this project means to her! I definetely recommend attending and will come back for other workshops :)",
  },
  {
    name: "Kaan Kocyigit", rating: 5, date: "June 2026", lang: "en",
    text: "I was at Nomad Küche om 21.06.2026, it was one of the best cooking Workshops, I've had in a long while.\n\nThe organizers were very patient and incredibly helpful, and after having cooked Manty together, we shared a big meal, with tea, sauces and dried yoghurt balls (Kur[u]t).\n\nWe made the Manty in 3 shapes, Kyrgyz, Uyghur and Chinese, each one beautiful on their own and very tasty!\n\nIt was a great experience and I do plan on going to the upcomming Workshops too!",
  },
  {
    name: "Alina Fedosova", rating: 5, date: "August 2026", lang: "en",
    text: "The workshop was exceptionally lovely and fun ❤️ Nargi is putting so much love and care, and is such a good teacher - I was a complete newbie but managed to do a whole bunch of manty that I was quite proud of! 🥰 Couldn't resist to eat them all at the end (no regrets!)",
  },
];

// Layout stand-ins. Shown ONLY in local development (never in a production build)
// and only while realReviews is empty. Replace with real reviews, then ignore this list.
const placeholderText = "Placeholder: copy a real review from Google here, unaltered, in its original language.";
const placeholders = [
  { name: "Reviewer name", rating: 5, date: "Month 2025", text: placeholderText, lang: "en", placeholder: true },
  { name: "Reviewer name", rating: 5, date: "Month 2025", text: `${placeholderText} Longer reviews are cut off after six lines with a "Read more" toggle, so this one is a bit longer to show that behaviour on the card.`, lang: "en", placeholder: true },
  { name: "Reviewer name", rating: 5, date: "Month 2025", text: placeholderText, lang: "en", placeholder: true },
  { name: "Reviewer name", rating: 5, date: "Month 2025", text: placeholderText, lang: "en", placeholder: true },
];

const isDev = process.env.NODE_ENV !== "production";
export const reviews = realReviews.length ? realReviews : isDev ? placeholders : [];
