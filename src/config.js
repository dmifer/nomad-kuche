/* Site-wide settings the owner/developer may need to change. */

export const OWNER_EMAIL = "nargiza@nomadkuche.com";
export const WHATSAPP_NUMBER = "+43 664 2239463";
export const WHATSAPP_URL = "https://wa.me/436642239463";

// Form backend for the voucher request form (Formspree-compatible: JSON POST,
// answers 2xx on success). Create one form per endpoint in Formspree, set the owner email
// as recipient and enable the auto-reply there, then paste the URL, e.g.
// "https://formspree.io/f/xxxxxxxx".
// While empty, submitting opens the visitor's mail app (mailto) and NO conversion event fires.
export const VOUCHER_FORM_ENDPOINT = "";

// Smallest free voucher amount in EUR.
export const VOUCHER_MIN = 20;

// Cal.com event slugs (cal.com/nomadkuche/<slug>). The Lagman event must exist in Cal.com.
export const WORKSHOPS = {
  manty: { slug: "manty-workshop", bookingType: "manty_workshop", event: "booking_manty" },
  lagman: { slug: "lagman-workshop", bookingType: "lagman_workshop", event: "booking_lagman" },
};

export const MAPS_REVIEWS_URL = "https://maps.app.goo.gl/T5eWCoeKx18xNHr37";
