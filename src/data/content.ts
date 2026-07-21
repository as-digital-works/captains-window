export const brand = {
  name: "Captains' Window Aviation Solutions",
  short: "Captains' Window",
  tagline: "A Clear View for the Pilot in You",
  taglines: [
    "Where Dreams Take Flight: Crafting Future Aviators.",
    "Make Your Flight Dreams Pilot Dreams Into Reality!",
  ],
  positioning: "Best Pilot Training Institute in Calicut, Kerala",
  mission:
    "At Captain's Window Aviation Solutions, our mission is to soar beyond the ordinary. We are dedicated to shaping the future of aviation by providing top-tier training and consultancy services that empower individuals to reach new heights in their careers.",
  badge: "GLOBAL COLLABORATION · YEARS OF EXPERTISE · WORLDWIDE OPPORTUNITIES",
};

export const stats = [
  { value: 1000, suffix: "+", label: "Happy Students" },
  { value: 30, suffix: "+", label: "Qualified Trainers" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 0, suffix: "XX+", label: "Years Service", placeholder: true },
  { value: 0, suffix: "XX+", label: "Worldwide Students", placeholder: true },
];

export type Service = {
  id: string;
  path: string;
  title: string;
  summary: string;
  detail: string;
  sub?: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    id: "pilot-training",
    path: "/services/pilot-training",
    title: "Pilot Training",
    summary: "Flight instruction with a safety-first curriculum.",
    detail:
      "Flight instruction, hands-on training, and a safety-first curriculum that prepares candidates for commercial and private pilot careers.",
    sub: [
      {
        title: "Course Admission",
        text: "Dedicated trainer guidance through every step of the admission process.",
      },
      {
        title: "Academic Management Consulting",
        text: "Guidance on airport rules & regulations, leasing, and training standards.",
      },
    ],
  },
  {
    id: "aviation-course",
    path: "/services/aviation-course",
    title: "Aviation Course",
    summary: "Diploma programs across airport & airline operations.",
    detail:
      "A range of diploma programs covering airport operations, airline operations, ground and cargo services, and travel consultancy.",
  },
  {
    id: "consultancy",
    path: "/services/aviation-education-consultancy",
    title: "Aviation Education Consultancy",
    summary: "Helping institutions launch and improve aviation academies.",
    detail:
      "We help other institutions launch or improve their own aviation academies, alongside IATA and non-IATA certified courses.",
    sub: [
      { title: "Academic Support", text: "Curriculum design and academic oversight." },
      { title: "Faculty Support", text: "Trainer sourcing, development and quality assurance." },
      { title: "Legal Registrations", text: "Guidance through regulatory and legal registration." },
    ],
  },
];

export const nav = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Overview", path: "/services" },
      ...services.map((s) => ({ label: s.title, path: s.path })),
    ],
  },
  { label: "Destinations", path: "/destinations" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact Us", path: "/contact" },
];

export const diplomas = [
  "Diploma in Airport Operations",
  "Diploma in Airline Operations",
  "Diploma in Passenger Ground Service",
  "Diploma in Cargo Introductory",
  "Diploma in Travel and Tourism Consultant",
  "Diploma in Airline Customer Service",
];

export const galleryCategories = [
  "On Academy",
  "Off Academy",
  "Epaulets Ceremony",
  "Life at Captains' Window",
  "Achievements",
] as const;

export const testimonials = [
  {
    name: "Parvathy",
    quote:
      "I couldn't have asked for a better aviation education partner than Captains' Window Aviation. Their unwavering support and industry insights guided me towards success in the aviation sector. With their personalized approach, I not only achieved my dreams but also surpassed them.",
  },
  {
    name: "Bahir",
    quote:
      "Overall, Captains' Window proved to be a great flight training academy in Calicut. The faculty's experience and passion for aviation were truly inspiring. The facilities were well-maintained, although scheduling for flight training sessions could be improved at times. Regardless, the knowledge and confidence I gained have been immense.",
  },
  {
    name: "Athmika",
    quote:
      "I highly recommend this Pilot Training Academy. Safety was my top concern, and The Captains' Window Institute exceeded my expectations. The instructors break down complex concepts in a way that's easy to understand, and the hands-on training with different aircraft is incredibly valuable.",
  },
  {
    name: "Muhsin",
    quote:
      "I am thrilled with my experience at Captains' Window Pilot Training Institute in Calicut. The instructors are highly knowledgeable and supportive. The curriculum is extensive, covering every aspect of aviation. The practical training with actual flight hours has been the highlight.",
  },
  {
    name: "Maryam Jumana",
    quote:
      "This Pilot Training institute provided me with a solid foundation in aviation. The instructors are approachable and go the extra mile to help students. The resources available for training are good, but I wish there were more internship opportunities directly linked to the institute.",
  },
  {
    name: "Adil",
    quote:
      "Overall, I found Captains' Window to be a solid pilot training academy with a well-structured curriculum. The program effectively balances theoretical knowledge with practical flight training. While I would have preferred more opportunities to pursue advanced certifications, the dedication and expertise of the faculty were truly commendable.",
  },
];

export type LocationCategory = "flying-facility" | "ground-training" | "flying-academy";

export type LocationEntry = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  category: LocationCategory;
  categoryLabel: string;
  image?: string;
  description?: string;
  deemphasized?: boolean;
};

export type GlobeConfig = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  locations: LocationEntry[];
};

const flyingFacilityLocations: LocationEntry[] = [
  { id: "india", name: "India", lat: 28.6139, lon: 77.209, category: "flying-facility", categoryLabel: "Flying Facility" },
  { id: "usa", name: "USA", lat: 38.9072, lon: -77.0369, category: "flying-facility", categoryLabel: "Flying Facility" },
  { id: "new-zealand", name: "New Zealand", lat: -36.8485, lon: 174.7633, category: "flying-facility", categoryLabel: "Flying Facility" },
  { id: "spain", name: "Spain", lat: 40.4168, lon: -3.7038, category: "flying-facility", categoryLabel: "Flying Facility" },
  { id: "uae", name: "UAE", lat: 25.2048, lon: 55.2708, category: "flying-facility", categoryLabel: "Flying Facility" },
  { id: "south-africa", name: "South Africa", lat: -26.2041, lon: 28.0473, category: "flying-facility", categoryLabel: "Flying Facility" },
  { id: "serbia", name: "Serbia", lat: 44.7866, lon: 20.4489, category: "flying-facility", categoryLabel: "Flying Facility" },
];

const groundTrainingLocations: LocationEntry[] = [
  { id: "calicut-kerala", name: "Calicut, Kerala", lat: 11.2588, lon: 75.7804, category: "ground-training", categoryLabel: "Ground Training Facility" },
  {
    id: "chennai-tamil-nadu",
    name: "Chennai, Tamil Nadu",
    lat: 13.0827,
    lon: 80.2707,
    category: "ground-training",
    categoryLabel: "Ground Training Facility",
    deemphasized: true,
  },
  { id: "gurgaon-india", name: "Gurgaon, India", lat: 28.4595, lon: 77.0266, category: "ground-training", categoryLabel: "Ground Training Facility" },
  {
    id: "ajman-uae",
    name: "Ajman, UAE",
    lat: 25.4052,
    lon: 55.5136,
    category: "ground-training",
    categoryLabel: "Ground Training Facility",
    image: "/images/ajman/mural-hallway.jpg",
    description:
      "Our ground training facility in Ajman, UAE, featuring a reception area, boardroom, and executive offices for students and partners in the region.",
  },
];

const flyingAcademyLocations: LocationEntry[] = [
  {
    id: "guna-madhya-pradesh",
    name: "Guna, Madhya Pradesh",
    lat: 24.6469,
    lon: 77.3113,
    category: "flying-academy",
    categoryLabel: "Associated Flying Academy",
  },
];

export const globes: GlobeConfig[] = [
  {
    id: "flying-facilities",
    eyebrow: "Where We Fly",
    title: "Flying Facilities Worldwide",
    description: "Partner flight training facilities across seven countries.",
    locations: flyingFacilityLocations,
  },
  {
    id: "ground-training",
    eyebrow: "On the Ground",
    title: "Ground Training Facilities",
    description: "Academic and ground school campuses across India and the UAE.",
    locations: groundTrainingLocations,
  },
  {
    id: "flying-academy",
    eyebrow: "Home Base",
    title: "Associated Flying Academy",
    description: "Captains' Window's associated flying academy.",
    locations: flyingAcademyLocations,
  },
];

export const allLocations: LocationEntry[] = [
  ...flyingFacilityLocations,
  ...groundTrainingLocations,
  ...flyingAcademyLocations,
];

export const contact = {
  address: "3rd Floor, HiLite Business Park, Calicut, Kerala, India – 673014",
  phones: ["+91 8606 74 5000", "+91 8606 74 6000"],
  whatsapp: "+91 8606745000",
  // UAE WhatsApp number not yet supplied by client — placeholder pending confirmation.
  whatsappUAE: "",
  whatsappUAEPending: true,
  email: "info@captainswindow.in",
  mapEmbed:
    "https://www.google.com/maps?q=Hilite+Business+Park,+Calicut,+Kerala&output=embed",
};

export const social = {
  facebook: "https://www.facebook.com/captainswindow",
  instagram: "https://instagram.com/captains_window",
  twitter: "#",
  youtube: "#",
};
