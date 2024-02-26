import { v4 as uuidv4 } from "uuid";

export const medicationHistory = [
  {
    id: uuidv4(),
    date: "2024-02-22",
    medication: "Amoxicillin (500mg capsule)",
    dosage: "30 tablets, take twice daily",
    prescriber: "Dr. Smith",
    description:
      "Amoxicillin is an antibiotic used to treat a variety of bacterial infections. It works by stopping the growth of bacteria.",
  },
  {
    id: uuidv4(),
    date: "2024-02-20",
    medication: "Albuterol (inhaler)",
    dosage: "1 inhaler, use as needed",
    prescriber: "Dr. Lee",
    description:
      "Albuterol is a bronchodilator used to relieve symptoms of asthma and other chronic obstructive pulmonary diseases.",
  },
  {
    id: uuidv4(),
    date: "2024-02-15",
    medication: "Metformin (500mg tablet)",
    dosage: "90 tablets, take once daily",
    prescriber: "Dr. Jones",
    description:
      "Metformin is  used to Controlling high blood sugar helps prevent kidney damage, blindness, nerve problems, loss of limbs",
  },
  // ... add more entries as needed
];
