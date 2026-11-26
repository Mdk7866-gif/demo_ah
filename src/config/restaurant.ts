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
  /** Short label on the offer card, such as "Weekday lunch". */
  label: string;
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
  /** Direct Google Maps link for this restaurant. */
  mapsUrl: string;
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
  name: "Kritunga Restaurant",
  tagline: "Andhra meals, biryani, and spicy starters in Hanamkonda.",
  description:
    "Kritunga Restaurant is on the 3rd floor of Manikanta Gateway in Subedari, Hanamkonda, above Reliance Trends and near NIT. The kitchen serves Andhra meals, biryanis, and the region’s hotter curries and fries.",
  story: [
    "The dining room sits above Reliance Trends on Bank Colony Main Road, a short way from NIT. Families come up for lunch and stay into the evening for biryani and starters.",
    "The menu follows Andhra cooking: Chicken 65 and Guntur chicken from the fryer, gongura with mutton or pappu, natukodi pulusu, and a full meals plate when you want a bit of everything.",
    "Book a table from the site. The request opens WhatsApp so you can send it to the restaurant, and the kitchen confirms in the chat.",
  ],
  highlights: [
    {
      title: "Andhra meals at lunch",
      text: "Rice, sambar, a vegetable curry, pickle, and curd, served the way a Hanamkonda afternoon expects. The meals plate on this menu is the everyday version.",
    },
    {
      title: "Heat, when you want it",
      text: "Guntur chicken, gongura mutton, and natukodi pulusu carry the chilli the kitchen is known for. Milder plates, including the veg meals and gutti vankaya, sit beside them.",
    },
    {
      title: "A table upstairs",
      text: "You book from the site, then send the request on WhatsApp. There is no payment on this page. The restaurant confirms the table in the chat.",
    },
  ],
  address: {
    line1: "3rd Floor, Manikanta Gateway",
    line2: "Bank Colony Main Rd, above Reliance Trends, near NIT, Subedari",
    city: "Hanamkonda, Telangana 506004",
    full: "3rd Floor, Manikanta Gateway, Bank Colony Main Rd, above Reliance Trends, near NIT, Subedari, Hanamkonda, Telangana 506004",
  },
  phoneDisplay: "+91 90323 26598",
  phoneTel: "+919032326598",
  whatsappNumber: "8511274216",
  hours: [
    { day: "Monday", sessions: ["12:00 – 22:30"] },
    { day: "Tuesday", sessions: ["12:00 – 22:30"] },
    { day: "Wednesday", sessions: ["12:00 – 22:30"] },
    { day: "Thursday", sessions: ["12:00 – 22:30"] },
    { day: "Friday", sessions: ["12:00 – 22:30"] },
    { day: "Saturday", sessions: ["12:00 – 22:30"] },
    { day: "Sunday", sessions: ["12:00 – 22:30"] },
  ],
  mapsUrl: "https://maps.app.goo.gl/KaQouSU7YVZ4vNZc8",
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/kritunga.warangal/?hl=en",
    },
  ],
  marketingConsentTemplate:
    "I agree to receive up to {count} promotional WhatsApp messages per month from {name}. I can opt out anytime.",
  marketingMessagesPerMonth: 2,
  welcomeNote:
    "Leave your name and mobile number so Kritunga Restaurant can tell you when an offer is on.",
  welcomeDemoNote:
    "This is a prototype. The name and number stayed in this browser tab only. They were not sent to the restaurant and were not saved. An offer message is not sent unless you opt in, and that choice is not stored either.",
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
      alt: "Dining room with timber tables, brass lamps, and set tables",
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
      id: "chicken-65",
      name: "Chicken 65",
      description: "Fried chicken with curry leaves, chilli, and a squeeze of lime.",
      price: 320,
      category: "Starters",
      diet: "non-veg",
      image: "/images/chicken-65.jpg",
      imageAlt: "Fried Chicken 65 with curry leaves and onion",
    },
    {
      id: "paneer-tikka",
      name: "Paneer Tikka",
      description: "Hung-curd paneer, charred, with mint chutney.",
      price: 280,
      category: "Starters",
      diet: "veg",
      image: "/images/paneer-tikka.jpg",
      imageAlt: "Charred paneer tikka with mint chutney",
    },
    {
      id: "paneer-65",
      name: "Paneer 65",
      description: "Fried paneer tossed with capsicum, curry leaves, and red spice.",
      price: 280,
      category: "Starters",
      diet: "veg",
      image: "/images/paneer-65.jpg",
      imageAlt: "Paneer 65 with capsicum and curry leaves",
    },
    {
      id: "veg-kebabs",
      name: "Veg Kebabs",
      description: "Spinach and green-pea kebabs with a yogurt drizzle.",
      price: 240,
      category: "Starters",
      diet: "veg",
      image: "/images/kebabs.jpg",
      imageAlt: "Green vegetable kebabs with yogurt and pomegranate",
    },
    {
      id: "veg-pulao",
      name: "Veg Pulao",
      description: "Spiced rice with peas, fried onion, and a few cashews.",
      price: 220,
      category: "Main Course",
      diet: "veg",
      image: "/images/pulao.jpg",
      imageAlt: "Vegetable pulao with peas and fried onion",
    },
    {
      id: "gobi-65",
      name: "Gobi 65",
      description: "Crisp cauliflower florets in the same red fry as the chicken 65.",
      price: 240,
      category: "Starters",
      diet: "veg",
      image: "/images/gobi-65.jpg",
      imageAlt: "Crispy spiced cauliflower florets",
    },
    {
      id: "dal-tadka",
      name: "Dal Tadka",
      description: "Yellow dal finished with ghee, garlic, and dried chilli.",
      price: 180,
      category: "Main Course",
      diet: "veg",
      image: "/images/dal.jpg",
      imageAlt: "Dal tadka in a copper bowl finished with butter",
    },
    {
      id: "gongura-mutton",
      name: "Gongura Mutton",
      description: "Mutton simmered with sour gongura leaves and green chilli.",
      price: 480,
      category: "Main Course",
      diet: "non-veg",
      image: "/images/gongura-mutton.jpg",
      imageAlt: "Gongura mutton curry in a copper bowl",
    },
    {
      id: "veg-korma",
      name: "Mix Veg Korma",
      description: "Seasonal vegetables in a mild coconut gravy.",
      price: 260,
      category: "Main Course",
      diet: "veg",
      image: "/images/table-spread.jpg",
      imageAlt: "A vegetarian spread with rice, dal, vegetables, and bread",
    },
    {
      id: "mixed-veg",
      name: "Mixed Vegetable Curry",
      description: "A dry-and-gravy vegetable curry with coconut and curry leaf.",
      price: 220,
      category: "Main Course",
      diet: "veg",
      image: "/images/undhiyu.jpg",
      imageAlt: "A mixed vegetable curry in a clay pot",
    },
    {
      id: "gutti-vankaya",
      name: "Gutti Vankaya",
      description: "Small brinjals stuffed with a peanut and sesame masala.",
      price: 280,
      category: "Main Course",
      diet: "veg",
      image: "/images/gutti-vankaya.jpg",
      imageAlt: "Stuffed purple brinjals in a thick gravy",
    },
    {
      id: "gongura-pappu",
      name: "Gongura Pappu",
      description: "Toor dal cooked down with gongura and a dried chilli tempering.",
      price: 220,
      category: "Main Course",
      diet: "veg",
      image: "/images/gongura-pappu.jpg",
      imageAlt: "Green gongura lentil dal in a steel bowl",
    },
    {
      id: "kodi-biryani",
      name: "Kodi Biryani",
      description: "Spiced chicken biryani with fried onion. Served with raita.",
      price: 340,
      category: "Main Course",
      diet: "non-veg",
      image: "/images/kodi-biryani.jpg",
      imageAlt: "Chicken biryani with fried onion and a boiled egg",
    },
    {
      id: "andhra-meals",
      name: "Andhra Veg Meals",
      description: "Rice, sambar, a vegetable curry, pickle, and curd.",
      price: 260,
      category: "Main Course",
      diet: "veg",
      image: "/images/andhra-meals.jpg",
      imageAlt: "Andhra meals on a banana leaf with rice, sambar, pickle, and curd",
    },
    {
      id: "bagara-rice",
      name: "Bagara Rice",
      description: "Fragrant spiced rice with whole spices and fried onion.",
      price: 240,
      category: "Main Course",
      diet: "veg",
      image: "/images/bagara-rice.jpg",
      imageAlt: "Spiced bagara rice in a brass bowl",
    },
    {
      id: "majjiga",
      name: "Majjiga",
      description: "Chilled spiced buttermilk with curry leaf. A usual partner for meals.",
      price: 60,
      category: "Drinks",
      diet: "veg",
      image: "/images/majjiga.jpg",
      imageAlt: "Spiced buttermilk in a steel tumbler",
    },
    {
      id: "filter-coffee",
      name: "Filter Coffee",
      description: "Decoction and hot milk, served in a tumbler and davara.",
      price: 50,
      category: "Drinks",
      diet: "veg",
      image: "/images/coffee.jpg",
      imageAlt: "South Indian filter coffee in a steel tumbler and davara",
    },
    {
      id: "rose-milk",
      name: "Rose Milk",
      description: "Chilled milk with rose syrup, over ice.",
      price: 80,
      category: "Drinks",
      diet: "veg",
      image: "/images/rose-milk.jpg",
      imageAlt: "Pink rose milk in a tall glass with ice",
    },
    {
      id: "lime-soda",
      name: "Fresh Lime Soda",
      description: "Sweet, salted, or plain. Say which you want.",
      price: 70,
      category: "Drinks",
      diet: "veg",
      image: "/images/lime-soda.jpg",
      imageAlt: "Lime soda with ice, mint, and a lime wheel",
    },
    {
      id: "double-ka-meetha",
      name: "Double ka Meetha",
      description: "Saffron bread pudding with nuts. Served warm.",
      price: 140,
      category: "Desserts",
      diet: "veg",
      image: "/images/double-ka-meetha.jpg",
      imageAlt: "Saffron bread pudding with nuts",
    },
    {
      id: "qubani",
      name: "Qubani ka Meetha",
      description: "Stewed apricots with a spoon of cream.",
      price: 150,
      category: "Desserts",
      diet: "veg",
      image: "/images/qubani.jpg",
      imageAlt: "Apricot dessert topped with cream and almonds",
    },
    {
      id: "gulab-jamun",
      name: "Gulab Jamun",
      description: "Two warm milk dumplings in a light cardamom syrup.",
      price: 90,
      category: "Desserts",
      diet: "veg",
      image: "/images/gulab-jamun.jpg",
      imageAlt: "Two warm gulab jamun in syrup in a brass bowl",
    },
  ],
  offers: [
    {
      id: "weekday-meals",
      title: "Weekday Andhra meals",
      label: "Weekday lunch",
      description:
        "The veg meals plate at lunch, Monday to Friday, with a glass of majjiga.",
      terms:
        "Dine-in, Monday to Friday, 12:00 to 15:30. One meals plate and one majjiga per person. Tell the server when you order.",
      ctaLabel: "Reserve a lunch table",
      cta: "booking",
    },
    {
      id: "family-platter",
      title: "Vegetarian starter platter",
      label: "Tables of four",
      description:
        "A shared vegetarian starter platter with a table booked for four or more, from 7 pm.",
      terms:
        "Dine-in from 19:00. One platter for a table of four or more. Mention it when you book.",
      ctaLabel: "Book a table for four",
      cta: "booking",
    },
    {
      id: "cooler-hour",
      title: "Lime soda with a main",
      label: "3:30 to 6 pm",
      description:
        "A fresh lime soda, sweet, salted, or plain, with any main course between 3:30 pm and 6:00 pm.",
      terms:
        "Dine-in, 15:30 to 18:00. One lime soda with one main course. Ask for it with the order.",
      ctaLabel: "See the drinks",
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

export function toWhatsappPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) {
    return null;
  }
  return digits.length === 10 ? `91${digits}` : digits;
}

export function hasWhatsappNumber(config: RestaurantConfig = restaurant): boolean {
  return toWhatsappPhone(config.whatsappNumber) !== null;
}

export function whatsappChatUrl(
  text: string,
  config: RestaurantConfig = restaurant,
): string | null {
  const phone = toWhatsappPhone(config.whatsappNumber);
  if (!phone) {
    return null;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function mapsDirectionsUrl(config: RestaurantConfig = restaurant): string {
  return config.mapsUrl;
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
