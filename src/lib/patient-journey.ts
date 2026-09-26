export type JourneyStep = {
  title: string;
  body: string;
  detail: string;
};

export const PATIENT_JOURNEY_STEPS: JourneyStep[] = [
  {
    title: "Initial enquiry",
    body: "You contact us by form, WhatsApp, or phone and share your diagnosis, urgency, and goals.",
    detail:
      "No commitment is required at this stage. Families often start with a simple question about whether India is the right option.",
  },
  {
    title: "Hospital report review",
    body: "We securely forward reports, imaging summaries, and doctor notes to selected independent hospitals for clinical review.",
    detail:
      "If reports are incomplete, we coordinate the hospital or specialist’s request for the information needed to respond.",
  },
  {
    title: "Hospital matching & quote",
    body: "We shortlist suitable independent hospitals and doctors, then coordinate indicative package costs in writing.",
    detail:
      "Quotes typically cover hospital fees, room category, surgeon fees where applicable, and length of stay — not hidden add-ons.",
  },
  {
    title: "Medical visa & invitation",
    body: "Once you choose a pathway, we coordinate the hospital invitation letter and visa document checklist.",
    detail:
      "Attendant visas for family members are arranged alongside the patient visa when required.",
  },
  {
    title: "Travel & accommodation",
    body: "We help plan flights guidance, airport pickup, hotels near the hospital, and interpreter support.",
    detail:
      "Recovery-friendly stay options are arranged for the patient and attendants based on expected discharge timing.",
  },
  {
    title: "Treatment in India",
    body: "Our coordinators support admission, consent processes, billing clarity, and communication with the care team.",
    detail:
      "You are not left alone at the hospital — our Hyderabad team stays reachable throughout treatment.",
  },
  {
    title: "Recovery & discharge",
    body: "We coordinate discharge instructions, medicines, follow-up appointments, and safe travel home.",
    detail:
      "Physio, dietary guidance, and wound-care instructions are clarified before you leave the hospital.",
  },
  {
    title: "Follow-up after return",
    body: "Remote follow-up coordination with the Indian hospital and local doctor when needed.",
    detail:
      "Report sharing, second-line opinions, and re-admission planning can continue after you return home.",
  },
];
