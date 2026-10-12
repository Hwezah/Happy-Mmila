import { IMG } from "@/lib/images";

/* Single source of truth for the site's copy and data. Prices are in USD; the UI converts. */

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/masterclass", label: "Masterclass" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/** In the header bar on desktop; the rest live in the drawer. */
export const BAR_NAV = NAV.filter((n) => n.href !== "/insights" && n.href !== "/contact");
export const DRAWER_DESKTOP_NAV = NAV.filter((n) => n.href === "/insights" || n.href === "/contact");

export const SOCIALS = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/mmila_happy/" },
  { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@happymilla3" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/happy-mmila-7a1693108/" },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/happy.mmila/" },
  { key: "x", label: "X", href: "https://x.com/HappyMmila" },
] as const;

export const TRUSTED_BY = [
  { src: IMG.logoIvyRose, alt: "IvyRose" },
  { src: IMG.logoMmilaTech, alt: "Mmila Tech" },
  { src: IMG.logoLoms, alt: "LOMS Forex" },
  { src: IMG.logoCompunet, alt: "Compunet Technologies" },
  { src: IMG.logoEquator, alt: "Equator Chocolate" },
  { src: IMG.logoBmx, alt: "Brand Mechanix" },
];

export const JOURNEY = [
  {
    num: "I.",
    title: "Starting out",
    body: "You have a space and a goal. Learn listing setup, pricing and guest care before the first booking lands.",
    cta: "Starter Session",
  },
  {
    num: "II.",
    title: "Hosting, but stuck",
    body: "Bookings are slow or reviews are uneven. We audit, restyle and rebuild your playbook toward Superhost.",
    cta: "Host Accelerator",
  },
  {
    num: "III.",
    title: "Ready to hand it over",
    body: "Keep the income, lose the to-do list. Bookings, guests, cleaning and maintenance — fully managed.",
    cta: "Full Management",
  },
];

export const DISCIPLINES = [
  { name: "Strategy", body: "Pricing, positioning and calendar decisions that compound." },
  { name: "Presentation", body: "Styling, photography and copy that make guests stop scrolling." },
  { name: "Systems", body: "Check-ins, cleaning and communication that run without you." },
  { name: "Guest experience", body: "The details that turn a stay into a 5-star review." },
];

export const TESTIMONIALS = [
  {
    quote:
      "With different trainers I did not get value for money. Coach Happy is walking with me on the journey — reviews have improved, and after just one week I already have bookings.",
    name: "Alupo Brenda Lona",
    role: "Song Bird Groove",
  },
  {
    quote:
      "From the masterclasses I learned how to decorate an Airbnb, handle guests with patience, and create an experience that is extraordinary compared to their home.",
    name: "Biira Winfred",
    role: "Manager, Revamp Homes",
  },
];

export const WORK_STEPS = [
  { num: "01", name: "Assess", body: "We look honestly at your property, listing, numbers and goals." },
  { num: "02", name: "Strategise", body: "A tailored action plan — pricing, presentation, positioning." },
  { num: "03", name: "Implement", body: "Hands-on support, trusted suppliers and co-hosting while you build." },
  { num: "04", name: "Scale", body: "Ongoing optimisation as you grow toward Superhost and beyond." },
];

export const WHY_ME = [
  "Local expertise in Ugandan and East African rental markets",
  "Personalised strategies tailored to your property",
  "Proven track record of helping hosts succeed",
  "Hands-on support from setup to scaling",
  "Ongoing guidance and property optimisation",
  "A guest-experience focus built for 5-star reviews",
];

export type Service = {
  num: string;
  name: string;
  usd: number;
  /** How the price reads: "from" → "From $200", "monthly" → "$150 per property / month". */
  priceStyle: "from" | "monthly";
  priceSuffix?: string;
  desc: string;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    num: "01",
    name: "One-on-One Airbnb Training",
    usd: 200,
    priceStyle: "from",
    desc: "Personalised coaching tailored to your needs — from setting up your listing to mastering guest communication and earning 5-star reviews.",
    items: [
      "Listing optimisation",
      "Pricing strategies",
      "Guest communication",
      "Review management",
      "Trusted suppliers to furnish faster",
      "Bonus: 1 month co-hosting support",
    ],
  },
  {
    num: "02",
    name: "Airbnb Listing Audit",
    usd: 155,
    priceStyle: "from",
    desc: "A comprehensive review of your existing listing, with actionable recommendations to boost visibility, bookings and revenue.",
    items: ["Photo assessment", "Description review", "SEO optimisation", "Competitive analysis", "Bonus: 1 month co-hosting support"],
  },
  {
    num: "03",
    name: "Airbnb Site Visit",
    usd: 50,
    priceStyle: "from",
    priceSuffix: " · Kampala",
    desc: "I visit your property in person to assess its potential, suggest improvements and help you create an unforgettable guest experience.",
    items: ["Property assessment", "Styling advice", "Safety check", "Amenity recommendations"],
  },
  {
    num: "04",
    name: "Full Airbnb Management",
    usd: 150,
    priceStyle: "monthly",
    desc: "I handle everything while you enjoy the income — from bookings and check-ins to cleaning coordination and maintenance.",
    items: ["Booking management", "24/7 guest support", "Cleaning coordination", "Performance reports"],
  },
];

export type Package = {
  key: "starter" | "accel" | "mentor";
  audience: string;
  name: string;
  usd: number;
  term: string;
  /** Shown after the term as "save $40" (featured card only). */
  saveUsd?: number;
  desc: string;
  items: string[];
  cta: string;
  whatsapp: string;
  featured?: boolean;
};

export const PACKAGES: Package[] = [
  {
    key: "starter",
    audience: "For new hosts",
    name: "Starter Session",
    usd: 200,
    term: "one-time",
    desc: "Private one-on-one training to get your listing launch-ready and your first bookings coming in.",
    items: [
      "1:1 session, online or in person",
      "Listing setup & optimisation",
      "Pricing strategy",
      "Guest communication & review playbook",
      "Trusted suppliers to furnish faster",
      "Bonus: 1 month co-hosting support",
    ],
    cta: "Book via WhatsApp",
    whatsapp: "Hello Coach Happy, I'd like to book the Starter Session.",
  },
  {
    key: "accel",
    audience: "For active hosts",
    name: "Host Accelerator",
    usd: 365,
    term: "one-time",
    saveUsd: 40,
    desc: "Training, a full listing audit and an in-person site visit — the complete reset for listings that should be performing better.",
    items: [
      "Everything in Starter Session",
      "Full listing audit — photos, copy, SEO, competitors",
      "Kampala site visit — styling, safety, amenities",
      "Written, prioritised action plan",
      "Bonus: 1 month co-hosting support",
    ],
    cta: "Book via WhatsApp",
    whatsapp: "Hello Coach Happy, I'd like to book the Host Accelerator package.",
    featured: true,
  },
  {
    key: "mentor",
    audience: "For scaling hosts",
    name: "Superhost Mentorship",
    usd: 750,
    term: "3 months",
    desc: "Ninety days of close mentorship to reach Superhost, sharpen performance and prepare to scale.",
    items: [
      "Everything in Host Accelerator",
      "Six fortnightly coaching calls",
      "Monthly pricing & review performance check",
      "Priority WhatsApp access",
      "Masterclass host community access",
    ],
    cta: "Apply via WhatsApp",
    whatsapp: "Hello Coach Happy, I'd like to apply for the Superhost Mentorship.",
  },
];

export const MANAGEMENT = {
  name: "Full Airbnb Management",
  usd: 150,
  desc: "I handle the day-to-day while you enjoy the income.",
  items: [
    "Booking & calendar management",
    "24/7 guest support",
    "Check-ins & cleaning coordination",
    "Maintenance oversight",
    "Monthly performance reports",
  ],
  whatsapp: "Hello Coach Happy, I'd like to enquire about Full Airbnb Management.",
};

export const A_LA_CARTE = [
  { name: "One-on-One Airbnb Training", desc: "Private coaching tailored to your property and goals, online or in person.", usd: 200 },
  { name: "Airbnb Listing Audit", desc: "Structured review of photos, copy, SEO and competitors, with practical recommendations.", usd: 155 },
  { name: "Site Visit — within Kampala", desc: "On-site review of setup, guest flow, styling and safety.", usd: 50 },
  {
    name: "Masterclass Cohort",
    desc: "Twice-yearly in-person cohort plus community access. Tickets on the Events page.",
    usd: 120,
    from: true,
  },
];

export const FAQS = [
  {
    q: "Do you work with hosts outside Kampala?",
    a: "Yes. Training, audits and mentorship are all available virtually. Site visits are in person within Kampala; visits further afield can be arranged on request.",
  },
  {
    q: "Which package should I choose?",
    a: "Starter Session if you haven't launched yet. Host Accelerator if you're live but bookings or reviews are underperforming. Superhost Mentorship if you want close support over three months. Message me if you're unsure.",
  },
  {
    q: "What does co-hosting support include?",
    a: "For one month after your session, I support you on your listing as a co-host — helping with guest messages, pricing adjustments and early reviews while you build confidence.",
  },
  {
    q: "How do payments work?",
    a: "Packages are paid upfront to confirm your booking. Management is billed monthly per property. Mobile money and bank transfer are accepted.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. The amount you've paid for a Starter Session can be credited toward the Host Accelerator or Mentorship within 30 days.",
  },
];

export const MASTERCLASS_PILLARS = [
  { name: "Teach", body: "Strategy you can implement the same week — pricing, styling, listings, guest care." },
  { name: "Coach", body: "Live, hands-on coaching built around real host case studies." },
  { name: "Connect", body: "Network with operators, suppliers and partners in the room." },
];

/** Masterclass photo mosaic; span classes place each tile in the 4-column grid. */
export const MASTERCLASS_MOSAIC = [
  { src: IMG.mcLeading, alt: "Happy leading a session", span: "col-span-2 row-span-2" },
  { src: IMG.mcWithParticipants, alt: "Happy with participants", span: "" },
  { src: IMG.mcListening, alt: "Attendees listening", span: "" },
  { src: IMG.mcCertificate, alt: "Certificate presentation", span: "row-span-2" },
  { src: IMG.mcRoundTable, alt: "Round table discussions", span: "" },
  { src: IMG.mcPanel, alt: "Panel talk on stage", span: "col-span-2" },
  { src: IMG.mcNetworking, alt: "Networking", span: "" },
  { src: IMG.mcLaptop, alt: "Participant on laptop", span: "" },
  { src: IMG.mcGroup, alt: "Final cohort group photo", span: "col-span-2" },
];

export type Tier = { name: string; desc: string; usd: number };
export type EventItem = {
  slug: string;
  type: string;
  title: string;
  blurb: string;
  date: string;
  day: string;
  mon: string;
  time: string;
  venue: string;
  img: string;
  tiers: Tier[];
};

export const EVENTS: EventItem[] = [
  {
    slug: "masterclass-nov-2026",
    type: "Masterclass",
    title: "Airbnb Masterclass — November Cohort",
    blurb: "A full day of strategy, live coaching and networking — plus ongoing community access afterwards.",
    date: "Sat 21 Nov 2026",
    day: "21",
    mon: "Nov",
    time: "9:00 AM – 5:00 PM",
    venue: "Kampala · venue shared on booking",
    img: IMG.mcLeading,
    tiers: [
      { name: "Standard", desc: "Full-day access, materials, lunch & certificate", usd: 120 },
      { name: "VIP", desc: "Front-row seat plus a 15-min 1:1 listing review with Happy", usd: 200 },
      { name: "Group of 3", desc: "Three standard seats for co-hosts or teams", usd: 300 },
    ],
  },
  {
    slug: "hosting-essentials-dec-2026",
    type: "Seminar",
    title: "Hosting Essentials Seminar",
    blurb: "A focused morning on listing setup, pricing and earning your first 5-star reviews.",
    date: "Sat 5 Dec 2026",
    day: "05",
    mon: "Dec",
    time: "10:00 AM – 1:00 PM",
    venue: "Kampala & livestream",
    img: IMG.mcPanel,
    tiers: [
      { name: "In person", desc: "Seat, workbook and refreshments", usd: 40 },
      { name: "Livestream", desc: "Join live online — recording included", usd: 25 },
    ],
  },
  {
    slug: "host-evening-dec-2026",
    type: "Networking",
    title: "Host Evening",
    blurb: "Meet hosts, suppliers and partners over short talks and good conversation.",
    date: "Thu 10 Dec 2026",
    day: "10",
    mon: "Dec",
    time: "6:00 PM – 9:00 PM",
    venue: "Kampala · venue shared on booking",
    img: IMG.mcNetworking,
    tiers: [{ name: "Entry", desc: "Welcome drink, talks and networking", usd: 30 }],
  },
];

/** Index of the next masterclass in EVENTS — the announcement bar and "Get tickets" CTAs open this one. */
export const MASTERCLASS_EVENT = 0;

export type Article = {
  slug: string;
  kind: string;
  title: string;
  meta: string;
  img: string;
  blurb: string;
  lead: string;
  sections: { h: string; p: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "listing-fixes",
    kind: "Hosting guide",
    title: "Five listing fixes that lift bookings in a week",
    meta: "5 min read",
    img: IMG.mcLaptop,
    blurb: "Small, fast changes to photos, titles and pricing that most hosts overlook.",
    lead: "Most underperforming listings don't need a renovation. They need a sharper first impression — and that can change in days, not months.",
    sections: [
      {
        h: "1. Lead with your best photo, not your bedroom",
        p: "Guests decide in the search results. Open with the image that sells the experience — the view, the lounge, the light — and keep the bed for photo three or four.",
      },
      {
        h: '2. Write a title that answers "why here?"',
        p: "Swap generic titles for a specific promise: location, standout amenity or the kind of stay it's perfect for. Clear beats clever.",
      },
      {
        h: "3. Price for the calendar you want",
        p: "Check your next 60 days. Empty weeknights usually mean your base price is pitched for weekends. Adjust weekdays first and let weekends hold.",
      },
      {
        h: "4. Make the first message do the work",
        p: "A warm, prepared welcome message with check-in details and one local tip sets the tone for a 5-star review before the guest arrives.",
      },
      {
        h: "5. Fix what reviews keep mentioning",
        p: "If two guests mention the same thing, it's not a coincidence. Solve it, then mention the fix in your description.",
      },
    ],
  },
  {
    slug: "pricing-kampala",
    kind: "Strategy",
    title: "Pricing a Kampala Airbnb through the year",
    meta: "6 min read",
    img: IMG.portraitSeated,
    blurb: "Weekends, events and the festive season — how to stop leaving money on the table.",
    lead: "Pricing is the lever most hosts set once and forget. In a city with strong seasonal swings, that habit is expensive.",
    sections: [
      {
        h: "Know your seasons",
        p: "Festive periods, school holidays and major city events shift demand sharply. Mark them on your calendar months ahead and price them early.",
      },
      {
        h: "Separate weekdays from weekends",
        p: "Business travellers and leisure guests book differently. A single nightly rate almost always under-prices one and over-prices the other.",
      },
      {
        h: "Use minimum stays strategically",
        p: "Longer minimums protect peak dates; shorter ones help fill gaps. Adjust them as often as you adjust price.",
      },
      {
        h: "Review monthly, not yearly",
        p: "Set a monthly reminder to compare your rates and occupancy with similar listings nearby. Small, regular corrections beat big, late ones.",
      },
    ],
  },
  {
    slug: "one-to-nine",
    kind: "Story",
    title: "From one unit to nine: what I'd do differently",
    meta: "4 min read",
    img: IMG.portraitHero,
    blurb: "Lessons from scaling a hosting business — the wins, and the mistakes worth avoiding.",
    lead: "I started with one underfunded unit and a lot of conviction. Growing to nine taught me more than any course could.",
    sections: [
      {
        h: "Build systems before you scale",
        p: "Every new unit multiplies whatever you already have — good habits and bad ones. Cleaning, check-in and communication should run without you before unit two.",
      },
      {
        h: "Furnish for reviews, not for show",
        p: "Guests remember comfort, cleanliness and thoughtful details. Spend there first; statement pieces can wait.",
      },
      {
        h: "Choose partners carefully",
        p: "Cleaners, suppliers and co-hosts are part of your guest experience. Reliable people are worth paying properly.",
      },
      {
        h: "Discomfort is often the price of ownership",
        p: "Some seasons will feel tight. Strategy and patience are what turn those seasons into long-term assets.",
      },
    ],
  },
];

export type PostCategory = "guides" | "press" | "masterclass";
export type Post = {
  cat: PostCategory;
  kind: string;
  title: string;
  blurb: string;
  meta: string;
  img: string;
  href: string;
  external: boolean;
  cta: string;
  video: boolean;
  /** Masterclass recaps open the ticket checkout for the next cohort. */
  buy?: boolean;
};

export const POSTS: Post[] = [
  ...ARTICLES.map((a) => ({
    cat: "guides" as const,
    kind: a.kind,
    title: a.title,
    blurb: a.blurb,
    meta: a.meta,
    img: a.img,
    href: `/insights/${a.slug}`,
    external: false,
    cta: "Read article",
    video: false,
  })),
  {
    cat: "press",
    kind: "Podcast",
    title: "Building wealth through Airbnb",
    blurb: "On ELLA Talks: lessons from Happy's hosting journey, growth decisions and the mindset behind scaling sustainably.",
    meta: "ELLA Talks Podcast UG · Mar 2026",
    img: IMG.ytEllaTalks,
    href: "https://youtu.be/2-iPUZyIq_g",
    external: true,
    cta: "Watch",
    video: true,
  },
  {
    cat: "press",
    kind: "Podcast",
    title: "How I started with one property and scaled to 10",
    blurb: "Early traction, scaling decisions and practical lessons for aspiring hosts.",
    meta: "Kampala Spaces Podcast · Mar 2026",
    img: IMG.ytKampalaSpaces,
    href: "https://youtu.be/q9ksQXkz6PE",
    external: true,
    cta: "Watch",
    video: true,
  },
  {
    cat: "press",
    kind: "Interview",
    title: "Building a multi-million Airbnb business in Uganda",
    blurb: "From 0 to 9 units in Kololo — growth decisions, income strategy and hosting mistakes to avoid.",
    meta: "CEO Insights Uganda · Aug 2025",
    img: IMG.ceoInsights,
    href: "https://www.youtube.com/watch?v=wj2OMIXuREg",
    external: true,
    cta: "Watch",
    video: true,
  },
  {
    cat: "masterclass",
    kind: "Masterclass",
    title: "Cohort II highlights",
    blurb: "Pricing systems, listing conversion and guest communication playbooks — applied the same week.",
    meta: "Coach Happy News Desk · Nov 2025",
    img: IMG.mcGroup,
    href: "/events",
    external: false,
    cta: "Next cohort tickets",
    video: false,
    buy: true,
  },
  {
    cat: "masterclass",
    kind: "Masterclass",
    title: "Cohort I recap",
    blurb: "Airbnb foundations, listing setup standards and core hosting workflows that Cohort II built on.",
    meta: "Coach Happy News Desk · May 2025",
    img: IMG.mcInSession,
    href: "/events",
    external: false,
    cta: "Next cohort tickets",
    video: false,
    buy: true,
  },
];

export const POST_FILTERS: { key: "all" | PostCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "guides", label: "Hosting guides" },
  { key: "press", label: "Press & media" },
  { key: "masterclass", label: "Masterclass" },
];

export const FEATURED_TALK = {
  href: "https://www.youtube.com/watch?v=JGK5WWwY_UA",
  img: IMG.tedx,
  meta: "Featured · TEDx Makerere University Business School · Feb 2026",
  blurb:
    "Happy reflects on growing from one underfunded Airbnb unit to nine properties — and how discernment, strategy and conviction turn temporary discomfort into long-term ownership.",
};

export const INTERESTS = [
  "Starter Session",
  "Host Accelerator",
  "Superhost Mentorship",
  "Management",
  "Masterclass",
  "Not sure yet",
] as const;

export const PAY_METHODS = [
  { key: "mtn", label: "MTN Mobile Money", sub: "Approve the prompt sent to your phone" },
  { key: "airtel", label: "Airtel Money", sub: "Approve the prompt sent to your phone" },
  { key: "card", label: "Card", sub: "Visa or Mastercard" },
  { key: "bank", label: "Bank transfer", sub: "Details by email — seat held for 48 hours" },
] as const;
