/**
 * DGCA content for the Services overview and Pilot Training pages.
 * Edit the text here; the pages pick it up automatically.
 */

export const SUBJECTS = {
  nav: "Air Navigation",
  met: "Air Meteorology",
  regs: "Air Regulations",
  techGen: "Technical General",
  techSpec: "Technical Specific",
  rtr: "RTR (Radio Telephony)",
} as const;

/** "DGCA Exam Requirements" (Services overview) — which DGCA papers apply to each route. */
export const examRequirements = {
  india: {
    title: "Flight Training in India",
    subjects: [SUBJECTS.nav, SUBJECTS.met, SUBJECTS.regs, SUBJECTS.techGen, SUBJECTS.techSpec, SUBJECTS.rtr],
  },
  abroad: {
    title: "Flight Training Abroad",
    groups: [
      { title: "Commonwealth countries", note: "New Zealand, Canada etc.", subjects: [SUBJECTS.nav, SUBJECTS.met, SUBJECTS.regs] },
      { title: "Non-Commonwealth countries", note: "USA etc.", subjects: [SUBJECTS.nav, SUBJECTS.met, SUBJECTS.regs, SUBJECTS.rtr] },
    ],
  },
};

/** "DGCA Prerequisite Stages" (Services overview). */
export const prerequisites = [
  {
    id: "computer-number",
    title: "DGCA Computer Number",
    text: "We guide you through document preparation, verification and shortfall replies until your DGCA Computer Number is issued.",
  },
  {
    id: "medicals",
    title: "Pilot Medical Examinations",
    text: "Help booking your Class 2 and Class 1 medicals with DGCA-approved examiners, with the paperwork and follow-up handled.",
  },
  {
    id: "egca",
    title: "eGCA Support",
    text: "End-to-end help on the eGCA portal: uploading documents, drafting shortfall replies and tracking each application.",
  },
];

/** Official DGCA links (Services overview). Only official government sites. */
export const dgcaLinks = [
  { label: "DGCA (Directorate General of Civil Aviation)", href: "https://www.dgca.gov.in/" },
  { label: "DGCA Exam Portal (Pariksha)", href: "https://pariksha.dgca.gov.in/" },
  { label: "Flight Crew Notice Board", href: "https://pariksha.dgca.gov.in/" },
  { label: "eGCA Portal", href: "https://www.egca.gov.in/" },
];

/** "DGCA Computer Number Process" (Services overview). */
export const computerNumber = {
  intro:
    "A DGCA Computer Number is the first step for every pilot in India. It is your permanent, unique ID for all DGCA examinations: you use it to book exams, track your applications and see your results, and it stays with you through to your licence.",
  detail:
    "The application is made online and must be backed by the right documents. Captains' Window guides you through each step and stays with you until your number is issued.",
  steps: [
    { title: "Prepare your documents", text: "Class 10 and 12 mark sheets and certificates, ID proof and photographs, checked before you apply." },
    { title: "Apply online", text: "We help you complete and submit the application on the DGCA portal correctly the first time." },
    { title: "Verification & shortfalls", text: "If DGCA raises a query or shortfall, we help you reply quickly and accurately." },
    { title: "Number issued", text: "DGCA emails your Computer Number. Use it as your login and on all future DGCA correspondence." },
  ],
};

/** "DGCA CPL Subjects We Cover" (Pilot Training). */
export const cplSubjects = [
  {
    id: "met",
    title: SUBJECTS.met,
    icon: "cloud",
    text: "Weather theory for pilots, from Indian climatology to reading forecasts and making safe operational decisions.",
    points: ["Monsoon and seasonal weather in India", "Clouds, turbulence, icing and thunderstorms", "METAR, TAF, SIGMET and weather charts", "Weather-related operational risk"],
  },
  {
    id: "regs",
    title: SUBJECTS.regs,
    icon: "book",
    text: "A clear, structured understanding of Indian aviation law and how DGCA regulations are applied and examined.",
    points: ["DGCA CARs and the Aircraft Rules", "ICAO Annexes relevant to the CPL", "Licensing and operational approvals", "Exam-focused interpretation of regulations"],
  },
  {
    id: "nav",
    title: SUBJECTS.nav,
    icon: "compass",
    text: "One of the most important and scoring papers, taught step by step with plenty of problem-solving practice.",
    points: ["Dead reckoning and flight planning", "Radio navigation and GNSS", "Time, speed and distance calculations", "DGCA-style numerical problems"],
  },
  {
    id: "tech-gen",
    title: SUBJECTS.techGen,
    icon: "cog",
    text: "A strong foundation in aircraft systems and aerodynamics for the CPL and later airline training.",
    points: ["Piston and turbine engine fundamentals", "Aircraft instruments and systems", "Aircraft performance", "Aerodynamics and principles of flight"],
  },
  {
    id: "rtr",
    title: SUBJECTS.rtr,
    icon: "radio",
    text: "Practical training in aviation communication, building confidence and correct phraseology.",
    points: ["Standard ICAO phraseology", "RT practical and viva preparation", "Emergency and abnormal communication", "Speaking practice to build confidence"],
  },
  {
    id: "tech-spec",
    title: SUBJECTS.techSpec,
    icon: "plane",
    text: "Systems training for the specific aircraft type you fly, aligned with DGCA technical papers.",
    points: ["Aircraft-type systems and limitations", "Performance for your training aircraft", "Single- and multi-engine types", "DGCA exam and viva preparation"],
  },
] as const;

/**
 * "Course Structure & Training Model" (Pilot Training).
 * TO CONFIRM WITH CLIENT: training modes, typical duration, subject-wise enrolment and batch details.
 */
export const courseStructure = {
  intro:
    "A structured, DGCA-focused ground training programme for full-time ground school students and for pilots who are already flying.",
  blocks: [
    {
      title: "Subjects Covered",
      points: [SUBJECTS.nav, SUBJECTS.met, SUBJECTS.regs, SUBJECTS.techGen, SUBJECTS.rtr, `${SUBJECTS.techSpec} (as per aircraft type)`],
    },
    {
      title: "Training Mode",
      text: "Flexible options to suit different learning needs, without compromising DGCA exam preparation.",
      points: ["Classroom training at Calicut, Gurgaon and Ajman", "Live interactive online classes", "Hybrid learning support"],
    },
    {
      title: "Course Duration",
      text: "Planned around DGCA examination sessions and each student's preparation level.",
      points: ["Typical duration: 3 to 6 months", "Subject-wise enrolment available", "Attempt-focused preparation"],
    },
    {
      title: "Batch Structure",
      points: ["Small batches for personal attention", "Subject-wise batch planning", "Regular progress tracking"],
    },
  ],
  whoCanJoin: ["Fresh CPL aspirants", "Students undergoing flying training", "DGCA re-attempt candidates", "Students switching academies"],
  promise:
    "Our training is designed not just to help students clear their DGCA examinations, but to prepare them for professional airline training and cockpit operations.",
};
