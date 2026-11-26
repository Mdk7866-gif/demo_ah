export const menuCategories = [
  "Starters",
  "Main Course",
  "Drinks",
  "Desserts",
] as const;

export type MenuCategory = (typeof menuCategories)[number];

export type Diet = "veg" | "non-veg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  diet?: Diet;
  image: string;
  imageAlt: string;
};

export type OfferCta = "booking" | "drinks";

export type Offer = {
  id: string;
  title: string;
  description: string;
  terms: string;
  ctaLabel: string;
  cta: OfferCta;
};

export type DayHours = {
  day: string;
  /** Leave sessions empty when the restaurant is closed. */
  sessions: string[];
};

export type SocialLink = {
  label: string;
  href: string;
};

export type RestaurantConfig = {
  name: string;
  tagline: string;
  description: string;
  story: string[];
  highlights: { title: string; text: string }[];
  address: {
    line1: string;
    line2: string;
    city: string;
    /** Full address used for the map link and footer. */
    full: string;
  };
  /** Display text for the public phone number. */
  phoneDisplay: string;
  /** Value used in the tel: link, including country code. */
  phoneTel: string;
  /**
   * WhatsApp number in international digits, without + or spaces.
   * Example: "919876543210".
   * Leave this empty for the demo booking confirmation.
   * A non-empty number opens WhatsApp with a pre-filled table request.
   */
  whatsappNumber: string;
  hours: DayHours[];
  social: SocialLink[];
  /**
   * Checkbox sentence on the menu page.
   * {name} becomes the restaurant name.
   * {count} becomes marketingMessagesPerMonth.
   */
  marketingConsentTemplate: string;
  marketingMessagesPerMonth: number;
  welcomeNote: string;
  /** Shown after the welcome form. Explains that nothing is stored. */
  welcomeDemoNote: string;
  bookingTimeSlots: string[];
  maxGuests: number;
  menu: MenuItem[];
  offers: Offer[];
  gallery: { src: string; alt: string; caption: string }[];
};

export const restaurant: RestaurantConfig = {
  name: "Noor & Co.",
  tagline: "A contemporary Gujarati and Indian dining room on Ashram Road.",
  description:
    "Noor & Co. is a demonstration restaurant in Ahmedabad. The menu moves between home-style Gujarati dishes and a small charcoal grill, served in a dining room meant for unhurried evenings.",
  story: [
    "Noor & Co. is a fictional dining room created for this demo. The idea is a neighbourhood table in Ahmedabad where a weekday thali can sit beside a slow lamb curry and a filter coffee.",
    "The kitchen in this story cooks in small batches. Lunch follows the market. Dinner stretches a little longer, with starters from the grill and sweets that stay familiar: shrikhand, gulab jamun, and jaggery kulfi.",
    "Nothing on this website is a real booking channel, a live offer, or a saved guest list. It is a prototype you can walk through with restaurant owners and then refill with your own details.",
  ],
  highlights: [
    {
      title: "A thali that follows the market",
      text: "Weekday lunch is built around a Gujarati thali, with the vegetables changing as the sabzi mandi changes. The demo menu shows one standing favourite, Surti undhiyu.",
    },
    {
      title: "A short charcoal menu",
      text: "Starters stay few on purpose: paneer tikka, prawns, and green kebabs. The point of the story is a grill you can smell from the courtyard, not a long list of everything.",
    },
    {
      title: "Room to stay",
      text: "Tables are spaced for conversation. Service in this brand story is unhurried, and the courtyard is there for guests who would rather sit outside after the heat drops.",
    },
  ],
  address: {
    line1: "14, Riverfront Arcade",
    line2: "Near Ellis Bridge, Ashram Road",
    city: "Ahmedabad, Gujarat 380006",
    full: "14, Riverfront Arcade, Near Ellis Bridge, Ashram Road, Ahmedabad, Gujarat 380006",
  },
  phoneDisplay: "+91 79 4000 2211",
  phoneTel: "+917940002211",
  whatsappNumber: "",
  hours: [
    { day: "Monday", sessions: [] },
    { day: "Tuesday", sessions: ["12:00 – 15:30", "19:00 – 23:00"] },
    { day: "Wednesday", sessions: ["12:00 – 15:30", "19:00 – 23:00"] },
    { day: "Thursday", sessions: ["12:00 – 15:30", "19:00 – 23:00"] },
    { day: "Friday", sessions: ["12:00 – 15:30", "19:00 – 23:30"] },
    { day: "Saturday", sessions: ["12:00 – 15:30", "19:00 – 23:30"] },
    { day: "Sunday", sessions: ["12:00 – 15:30", "19:00 – 22:30"] },
  ],
  social: [
    { label: "Instagram", href: "https://example.com/noor-and-co-instagram" },
    { label: "Facebook", href: "https://example.com/noor-and-co-facebook" },
    { label: "Google", href: "https://example.com/noor-and-co-maps" },
  ],
  marketingConsentTemplate:
    "I agree to receive up to {count} promotional WhatsApp messages per month from {name}. I can opt out anytime.",
  marketingMessagesPerMonth: 2,
  welcomeNote:
    "Your name and mobile number are requested only to personalise this visit, or to send offers if you opt in below. You can skip this and read the menu without sharing anything.",
  welcomeDemoNote:
    "This is a prototype. The name and number you entered stayed in this browser tab for the current visit only. They were not sent to the restaurant, were not saved, and will disappear when you leave or refresh the page. Ticking the offers box is not stored either.",
  bookingTimeSlots: [
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ],
  maxGuests: 12,
  gallery: [
    {
      src: "/images/hero-dining.jpg",
      alt: "Dining room at Noor & Co. with timber tables, brass lamps, and copper plates",
      caption: "The dining room, set before service.",
    },
    {
      src: "/images/courtyard.jpg",
      alt: "Evening courtyard with stone tables, brass tumblers, and warm string lights",
      caption: "The courtyard after the heat drops.",
    },
    {
      src: "/images/table-spread.jpg",
      alt: "Indian dinner spread with dal, saffron rice, paneer, chutney, and naan",
      caption: "A table in the middle of dinner.",
    },
  ],
  menu: [
    {
      id: "paneer-tikka",
      name: "Charred Paneer Tikka",
      description:
        "Hung-curd marinade, smoked paprika, and a mint chutney. Finished on charcoal.",
      price: 345,
      category: "Starters",
      diet: "veg",
      image: "/images/paneer-tikka.jpg",
      imageAlt: "Charred paneer tikka with mint chutney on a black plate",
    },
    {
      id: "lal-mirch-prawns",
      name: "Lal Mirch Prawns",
      description:
        "Coastal prawns tossed with garlic, lime, and a short Kashmiri chilli crust.",
      price: 495,
      category: "Starters",
      diet: "non-veg",
      image: "/images/prawns.jpg",
      imageAlt: "Chilli garlic prawns in a copper pan with lime and coriander",
    },
    {
      id: "hara-bhara",
      name: "Hara Bhara Kebabs",
      description:
        "Spinach and green-pea kebabs with a yogurt drizzle and pomegranate.",
      price: 285,
      category: "Starters",
      diet: "veg",
      image: "/images/kebabs.jpg",
      imageAlt: "Three spinach and pea kebabs with yogurt and pomegranate seeds",
    },
    {
      id: "undhiyu",
      name: "Surti Undhiyu",
      description:
        "Winter vegetables and muthiya cooked the Surti way, with fresh coriander.",
      price: 420,
      category: "Main Course",
      diet: "veg",
      image: "/images/undhiyu.jpg",
      imageAlt: "Gujarati undhiyu with purple yam and beans in a clay pot",
    },
    {
      id: "lamb-rogan",
      name: "Slow Lamb Rogan",
      description:
        "Lamb simmered in a deep red gravy. Served with laccha paratha.",
      price: 645,
      category: "Main Course",
      diet: "non-veg",
      image: "/images/lamb.jpg",
      imageAlt: "Lamb rogan josh in a copper bowl beside laccha paratha",
    },
    {
      id: "black-dal",
      name: "Overnight Black Dal",
      description:
        "Whole black lentils cooked down slowly and finished with white butter.",
      price: 365,
      category: "Main Course",
      diet: "veg",
      image: "/images/dal.jpg",
      imageAlt: "Creamy black dal in a copper handi finished with butter",
    },
    {
      id: "fish-curry",
      name: "Coastal Fish Curry",
      description:
        "Seared fish in a coconut and curry-leaf gravy. Ask for it milder if you prefer.",
      price: 585,
      category: "Main Course",
      diet: "non-veg",
      image: "/images/fish.jpg",
      imageAlt: "Fish curry in a coconut gravy topped with curry leaves",
    },
    {
      id: "saffron-pulao",
      name: "Saffron Pulao",
      description: "Basmati rice with peas, fried onion, and a few cashews.",
      price: 275,
      category: "Main Course",
      diet: "veg",
      image: "/images/pulao.jpg",
      imageAlt: "Saffron pulao with peas, fried onion, and cashews in a brass bowl",
    },
    {
      id: "kesari-lassi",
      name: "Kesari Lassi",
      description: "Thick salted-sweet yogurt drink with saffron and pistachio.",
      price: 160,
      category: "Drinks",
      diet: "veg",
      image: "/images/lassi.jpg",
      imageAlt: "Saffron lassi in a short glass topped with pistachio",
    },
    {
      id: "kokum-cooler",
      name: "Kokum Cooler",
      description: "Tart kokum, lime, and mint over ice. A good answer to an Ahmedabad afternoon.",
      price: 140,
      category: "Drinks",
      diet: "veg",
      image: "/images/kokum.jpg",
      imageAlt: "Pink kokum cooler with ice, mint, and a lime wheel",
    },
    {
      id: "filter-coffee",
      name: "Filter Coffee",
      description: "Decoction and hot milk, served in a tumbler and davara.",
      price: 120,
      category: "Drinks",
      diet: "veg",
      image: "/images/coffee.jpg",
      imageAlt: "South Indian filter coffee in a steel tumbler and davara",
    },
    {
      id: "shrikhand",
      name: "Pistachio Shrikhand",
      description: "Strained saffron yogurt with pistachio. Served cold.",
      price: 195,
      category: "Desserts",
      diet: "veg",
      image: "/images/shrikhand.jpg",
      imageAlt: "Saffron shrikhand topped with pistachio and saffron",
    },
    {
      id: "gulab-jamun",
      name: "Warm Gulab Jamun",
      description: "Two milk dumplings in a light cardamom syrup.",
      price: 175,
      category: "Desserts",
      diet: "veg",
      image: "/images/gulab-jamun.jpg",
      imageAlt: "Two warm gulab jamun in syrup in a brass bowl",
    },
    {
      id: "jaggery-kulfi",
      name: "Jaggery Kulfi",
      description: "A dense jaggery kulfi with pistachio and a few rose petals.",
      price: 165,
      category: "Desserts",
      diet: "veg",
      image: "/images/kulfi.jpg",
      imageAlt: "A slice of jaggery kulfi with pistachio and rose petals",
    },
  ],
  offers: [
    {
      id: "weekday-thali",
      title: "Weekday lunch thali",
      description:
        "A set Gujarati thali from Tuesday to Friday at lunch, with unlimited rotli and a seasonal sweet.",
      terms:
        "Demo offer. Sample expiry: 30 June 2027. This is not a live promotion and cannot be redeemed.",
      ctaLabel: "Reserve a weekday table",
      cta: "booking",
    },
    {
      id: "courtyard-evening",
      title: "Courtyard platter",
      description:
        "A shared starter platter when a table is booked for four or more guests after 7 pm.",
      terms:
        "Demo offer. Sample note: one platter per booking name. This is not a live promotion.",
      ctaLabel: "Book a table for four",
      cta: "booking",
    },
    {
      id: "cooler-hour",
      title: "Cooler with a main course",
      description:
        "A kokum cooler alongside any main course between 3:30 pm and 6:00 pm.",
      terms:
        "Demo offer. Sample hours only. This card is for presentation and is not a live promotion.",
      ctaLabel: "Browse drinks",
      cta: "drinks",
    },
  ],
};

export function marketingConsentLabel(
  config: RestaurantConfig = restaurant,
): string {
  return config.marketingConsentTemplate
    .replaceAll("{count}", String(config.marketingMessagesPerMonth))
    .replaceAll("{name}", config.name);
}

export function hasWhatsappNumber(config: RestaurantConfig = restaurant): boolean {
  return config.whatsappNumber.replace(/\D/g, "").length >= 10;
}

export function mapsDirectionsUrl(config: RestaurantConfig = restaurant): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(config.address.full)}`;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
