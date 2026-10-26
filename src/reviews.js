/* Google reviews, copied unaltered by hand. Refresh every 2-3 months.
   To add a review, append an object to `realReviews`. Do not edit, translate or invent reviews.
   While `realReviews` is empty the reviews section is hidden on the live site. */

export const reviewsMeta = {
  rating: 5.0, // from the Google Business Profile (shown as 5,0 on Maps)
  count: null, // e.g. 24 - set once confirmed; hidden while null
  leaveReviewUrl: "", // "Write a review" link from the Google Business Profile
};

// { name: "Anna K.", rating: 5, date: "March 2025", text: "…", lang: "de" }
export const realReviews = [];

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
