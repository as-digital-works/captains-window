export const brand = {
  name: "Captains' Window Aviation Solutions",
  short: "Captains' Window",
  tagline: "A Clear View for the Pilot in You",
  taglines: ["Where Dreams Take Flight: Crafting Future Aviators."],
  positioning: "A Global Aviation Training Ecosystem",
  story:
    "Captain's Window was founded with a clear vision: to bridge the gap between aviation aspirations and real career opportunities. We recognized that aspiring pilots and cabin crew professionals need more than just information — they need reliable guidance, structured pathways, and continuous support to navigate the aviation industry. We assist students from the very first stage of their aviation journey. Through professional career counselling, pilot ground classes, airline mentoring, and admission guidance for flight schools in India and internationally, we help students make informed decisions about their training and future careers. Our team includes experienced aviation professionals who understand the industry and provide practical insights into aviation training and career pathways. With the right guidance and industry knowledge, we support aspiring candidates in building a clear and confident path toward aviation careers. Today, Captains' Window Group continues to guide and support future aviation professionals with a personalized approach, helping them take their first step toward successful careers in the global aviation industry.",
  mission:
    "To empower aspiring aviation professionals with expert guidance, comprehensive training support, and structured pathways that transform dreams into successful careers. We are committed to providing personalized mentorship, transparent advice, and unwavering support throughout every student's aviation journey.",
  vision:
    "To be the most trusted aviation career consultancy, recognized for excellence in student guidance, industry partnerships, and career success rates. We envision a future where every aspiring pilot and cabin crew professional has access to world-class training pathways and expert mentorship.",
  badge: "GLOBAL COLLABORATION · YEARS OF EXPERTISE · WORLDWIDE OPPORTUNITIES",
};

export const coreValues = [
  { title: "Integrity", text: "We provide honest, transparent guidance with no hidden agendas. Your success is our only priority." },
  { title: "Support", text: "Every student receives individual attention and customized career pathways tailored to their goals." },
  { title: "Expertise", text: "Our team brings decades of aviation industry experience and insider knowledge to guide you." },
  { title: "Partnership", text: "We build long-term relationships with students, supporting them from consultation to career placement." },
  { title: "Excellence", text: "We maintain the highest standards in everything we do, from training quality to student support." },
  { title: "Global Perspective", text: "We connect students with international opportunities and maintain partnerships worldwide." },
];

export type CourseOffering = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

export const courseOfferings: CourseOffering[] = [
  {
    id: "pilot-pathway",
    title: "Pilot Career Guidance & Pathway Planning",
    summary:
      "Clear, realistic pathway planning with expert mentoring. We guide you through eligibility assessment, licensing pathways (India & International), budgeting, and career roadmap.",
    points: [
      "Clear and realistic career pathway planning",
      "Eligibility assessment and licensing guidance (India & International)",
      "Budget planning and structured aviation career roadmap",
    ],
  },
  {
    id: "ground-classes",
    title: "Pilot Ground Classes",
    summary:
      "Strong theoretical foundation before flight training. Comprehensive DGCA ground subjects preparation with experienced airline pilots.",
    points: [
      "Strong theoretical foundation before flight training",
      "DGCA ground subjects preparation",
      "Training by experienced airline pilots",
    ],
  },
  {
    id: "admission-support",
    title: "Admission Support — India & International",
    summary:
      "Complete admission support for flight schools in India and internationally, including documentation, visa guidance, and medical assistance.",
    points: [
      "Complete admission support for India & international flight schools",
      "Documentation and application assistance",
      "Visa guidance and medical support",
    ],
  },
];

export const stats = [
  { value: 35, suffix: "+", label: "Qualified Instructors" },
  { value: 1800, suffix: "+", label: "Graduates" },
  { value: 15, suffix: "+", label: "Years Experience" },
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

export const faqs = [
  {
    q: "What is a Commercial Pilot License (CPL)?",
    a: "A CPL is the license that lets you fly professionally — for airlines, charter operators, and cargo carriers. It's issued once you've met DGCA eligibility, cleared the required exams, and logged the required flying hours.",
  },
  {
    q: "What's the difference between a CPL and a PPL?",
    a: "A Private Pilot License (PPL) lets you fly for personal, non-commercial reasons. A CPL is what allows you to be paid to fly, and it's the license every airline career starts with.",
  },
  {
    q: "Can I become a pilot after Class 12?",
    a: "Yes — as long as you've studied Physics and Mathematics. If you haven't, alternative pathways like NIOS can still get you there; our counsellors will walk you through the right route for your academic background.",
  },
  {
    q: "What is a DGCA Computer Number, and when do I need one?",
    a: "It's the unique ID the DGCA issues before you can sit any pilot exams. Getting it sorted early — ideally before ground classes begin — helps the rest of your licensing timeline move smoothly.",
  },
  {
    q: "What do DGCA Ground Classes cover?",
    a: "Air Navigation, Air Regulations, Aviation Meteorology, Technical General & Specific, and Flight Planning — the theory foundation behind every flying hour you log.",
  },
  {
    q: "How long does pilot training take?",
    a: "It varies with exam schedules, weather, and flying-hour availability. We'll map out a realistic timeline for you during a free counselling session.",
  },
  {
    q: "How do I choose the right pilot training institute?",
    a: "Look past the marketing claims — prioritize experienced instructors, transparent guidance, and a program genuinely built around your outcomes, not just enrollment numbers.",
  },
];

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

/** Additional 5-star reviews pulled verbatim from Captains' Window's Google Business listing (4.9★, 80 reviews, Calicut). Shown on the full Testimonials page alongside the featured set above. */
export const googleReviews = [
  {
    name: "Manu Fayi",
    quote:
      "I had a great experience at Academic Excellence Captians Window Pilot Training. The faculty members are very friendly and always ready to help. They focus on strong fundamentals and proper exam preparation. It's a perfect place for future pilots to build confidence and knowledge.",
  },
  {
    name: "Ahmmed Zaeem",
    quote:
      "A great place for aviation ground classes. The instructors at Captain's Window are knowledgeable and explain concepts clearly. The classes are well organized and very helpful for DGCA exam preparation. Definitely a good choice for aspiring pilots.",
  },
  {
    name: "Anjana C",
    quote:
      "I visited Captains Window about a year ago while helping my friend who was interested in pilot training. The team was very supportive and explained everything clearly. They were professional and guided us well through the process. It seemed like a good place for anyone planning to start a career in aviation.",
  },
  {
    name: "Mehzabin AK",
    quote:
      "The classes are clear, well-structured, and super helpful for understanding aviation concepts easily. The instructors are supportive and make even tough topics feel simple. Highly recommend for anyone starting their pilot journey!",
  },
  {
    name: "Vazeem Ahammad",
    quote:
      "Great academy for pilot ground training. Experienced instructors, clear explanations, and well-structured classes. Highly recommended for aspiring pilots.",
  },
  {
    name: "Mohamed Shabeeh",
    quote:
      "Captains Window Pilot Training Academy is a great place for pilot training and DGCA ground classes. The instructors are supportive and explain concepts clearly making DGCA exam preparation much easier.",
  },
  {
    name: "Mark Dev",
    quote:
      "I sat down with the team, and they didn't just give me a brochure; they gave me a plan. They explained how to become a pilot in simple steps. The rooms are filled with maps and flight gear, which makes the dream feel real.",
  },
  {
    name: "Rahila Saibak",
    quote:
      "One of the best pilot training institutes in Kerala. Highly recommend for aspiring pilots! If you are looking for the best institute to choose, Captains Window is the best option.",
  },
  {
    name: "Shaniba M T",
    quote: "From my experience this one is the best premier pilot training academy and aviation consultancy in Calicut.",
  },
  {
    name: "Ziya Rasheed",
    quote: "Supportive staff and a comfortable classroom atmosphere, which is helpful for students who are new to aviation.",
  },
  {
    name: "Zaeem Abdulla",
    quote: "Best aviation institute in Calicut. They have highly trained and professional staff to guide.",
  },
  {
    name: "Ameer S",
    quote:
      "Captains Window is one of the best ground classes. This student pilot program exceeded all my expectations. The instructors are incredibly knowledgeable, patient, and genuinely passionate about helping students succeed.",
  },
  {
    name: "Adil Madari",
    quote: "Best pilot training academy in Kerala. Best team, instructors.",
  },
  {
    name: "Abdul Shahin",
    quote: "They've got the best faculty to teach — very supportive to students.",
  },
  {
    name: "Alan P",
    quote: "Being a student of CW, I got a great exposure about pilot training and the aviation field.",
  },
  {
    name: "Najma Farhath K",
    quote: "Captains Window academy is one of the best academies in Kerala.",
  },
  {
    name: "Ajeel Sinan",
    quote: "One of the best institutes for your flying career.",
  },
  {
    name: "Shifna PK",
    quote: "One of the best institutes with a positive learning environment.",
  },
  {
    name: "Fathima Fiza P",
    quote: "Best pilot training academy in Kerala.",
  },
  {
    name: "Hamz Rihan",
    quote: "One of the best institutions you can choose for your ground classes. All the staff and teachers are just top notch.",
  },
  {
    name: "Jamshi Badar",
    quote: "The training environment is professional and motivating.",
  },
  {
    name: "Ridha Azeez",
    quote: "Excellent training with experienced instructors and modern facilities. Highly recommend for aspiring pilots!",
  },
  {
    name: "Faiqa",
    quote: "Got to learn lots from experienced CPL holders and got great guidance!",
  },
  {
    name: "Naharin YP",
    quote: "Best pilot training academy.",
  },
  {
    name: "Adnan Eyh",
    quote: "Excellent training with experienced instructors and modern facilities.",
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
  /** Short one-line hook shown on the Home globe's auto-cycling quick-view card. */
  highlight?: string;
  /** Full street address, shown on ground-training facility cards/modals. */
  address?: string;
  /** Facility phone number, shown alongside address. */
  phone?: string;
  /** Contact phone numbers shown in the "Your Contact" box on the facility modal. Falls back to `highlight` when unset. */
  contactPhones?: string[];
};

export type GlobeConfig = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  locations: LocationEntry[];
};

const flyingFacilityLocations: LocationEntry[] = [
  {
    id: "india",
    name: "India",
    lat: -3.7266,
    lon: 69.082,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/india-taj-mahal.jpg",
    description:
      "Multi-engine flight training in South Asia's aviation hub, with access to well-maintained aircraft and experienced instructors as cadets build their flying hours.",
    highlight: "Multi-engine flight training in South Asia's aviation hub",
    contactPhones: ["+91 7034416000", "+91 7034516000"],
  },
  {
    id: "usa",
    name: "USA",
    lat: 9.668,
    lon: -112.3242,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/usa-golden-gate.jpg",
    description:
      "Flight hours logged in some of the world's busiest airspace, giving cadets valuable exposure to controlled airspace procedures and radio communication.",
    highlight: "Flight hours logged in some of the world's busiest airspace",
    contactPhones: ["+91 8606745000", "+971 522954787"],
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    lat: -70.4531,
    lon: 161.8594,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/new-zealand-milford-sound.jpg",
    description:
      "VFR training over some of the clearest skies on Earth, with consistent flying weather and scenic terrain ideal for building confident visual flying skills.",
    highlight: "VFR training over some of the clearest skies on Earth",
    contactPhones: ["+91 8606745000", "+971 522954787"],
  },
  {
    id: "spain",
    name: "Spain",
    lat: 13.5703,
    lon: -11.0742,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/spain-sagrada-familia.jpg",
    description:
      "European airspace exposure for internationally-minded cadets, training alongside a diverse community of student pilots in an established general aviation environment.",
    highlight: "European airspace exposure for internationally-minded cadets",
    contactPhones: ["+91 8606745000", "+971 522954787"],
  },
  {
    id: "uae",
    name: "UAE",
    lat: -5.4492,
    lon: 45.2109,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/uae-burj-khalifa.jpg",
    description:
      "Flight training minutes from one of the world's busiest hubs, with UAE's world-class aviation infrastructure giving cadets an internationally-minded training environment close to home.",
    highlight: "Flight training minutes from one of the world's busiest hubs",
    contactPhones: ["+971 522954787"],
  },
  {
    id: "south-africa",
    name: "South Africa",
    lat: -49.7109,
    lon: 15.9961,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/south-africa-table-mountain.jpg",
    description:
      "Diverse terrain and airspace for well-rounded pilots, from coastal approaches to inland cross-country routes that build versatile flying experience.",
    highlight: "Diverse terrain and airspace for well-rounded pilots",
    contactPhones: ["+91 8606745000", "+971 522954787"],
  },
  {
    id: "serbia",
    name: "Serbia",
    lat: 14.9766,
    lon: 12.832,
    category: "flying-facility",
    categoryLabel: "Flying Facility",
    image: "/images/destinations/serbia-saint-sava.jpg",
    description:
      "European flight training with a growing cadet community, offering a supportive environment for students building their flying hours abroad.",
    highlight: "European flight training with a growing cadet community",
    contactPhones: ["+91 8606745000", "+971 522954787"],
  },
];

const groundTrainingLocations: LocationEntry[] = [
  {
    id: "calicut-kerala",
    name: "Calicut, Kerala",
    lat: -13.1836,
    lon: 66.9727,
    category: "ground-training",
    categoryLabel: "Ground Training Facility",
    image: "/images/destinations/calicut-kozhikode-beach.jpg",
    description:
      "Our home campus in Calicut, Kerala — where ground school, academic training, and DGCA exam preparation come together under one roof, led by experienced airline pilots and CPL holders.",
    highlight: "Our home campus — ground school & academic training",
    address: "Room No. 1318, 3rd Floor, HiLite Business Park, Calicut, Kerala, India – 673014",
    phone: "+91 8606 74 5000",
    contactPhones: ["+91 8606745000", "+91 8606746000"],
  },
  {
    id: "gurgaon-india",
    name: "Gurgaon, India",
    lat: -0.1406,
    lon: 64.1953,
    category: "ground-training",
    categoryLabel: "Ground Training Facility",
    image: "/images/destinations/gurgaon-cyber-city.jpg",
    description: "Our ground training facility serving North India, bringing the same structured ground school and career guidance to cadets based near Delhi NCR.",
    highlight: "Ground training facility serving North India",
    address: "Vipul Plaza, Suncity, 1st Floor – Unit No. 121-123, Sector 54, Golf Course Road, Gurgaon, 122011",
    phone: "+91 7034 41 6000",
    contactPhones: ["+91 7034 41 6000"],
  },
  {
    id: "ajman-uae",
    name: "Ajman, UAE",
    lat: -6.5039,
    lon: 48.3047,
    category: "ground-training",
    categoryLabel: "Ground Training Facility",
    image: "/images/ajman/mural-hallway.jpg",
    description:
      "Our ground training facility in Ajman, UAE, featuring a reception area, boardroom, and executive offices for students and partners in the region.",
    highlight: "Reception, boardroom & executive offices for our UAE cadets",
    address: "Room No. 1801, Floor 18, Grand Mall Business Park, Ajman, UAE",
    phone: "+971 522 954 787",
    contactPhones: ["+971 522 954 787"],
  },
];

const flyingAcademyLocations: LocationEntry[] = [
  {
    id: "guna-madhya-pradesh",
    name: "Guna, Madhya Pradesh",
    lat: -7.875,
    lon: 67.3242,
    category: "flying-academy",
    categoryLabel: "Associated Flying Academy",
    image: "/images/destinations/guna-tekri-sarkar.jpg",
    description:
      "Our associated flying academy's home base in Guna, Madhya Pradesh, where cadets complete their flight training hours in a dedicated, focused training environment.",
    highlight: "Our associated flying academy's home base",
    contactPhones: ["+91 8606745000", "+91 8606746000"],
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
  address: "Room No. 1318, 3rd Floor, HiLite Business Park, Calicut, Kerala, India – 673014",
  phones: ["+91 8606 74 5000", "+91 8606 74 6000"],
  whatsapp: "+91 8606745000",
  whatsappUAE: "+971 522954787",
  whatsappUAEPending: false,
  email: "info@captainswindow.in",
};

export const social = {
  facebook: "https://www.facebook.com/people/Captains-Window/61584797820614/",
  instagram: "https://www.instagram.com/captains_window/?hl=en",
  instagramUAE: "https://www.instagram.com/captains_window.ae/",
  youtube: "https://www.youtube.com/@CaptainsWindowAviation",
};
