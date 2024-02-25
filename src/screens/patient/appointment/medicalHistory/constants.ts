export const RECORDS = [
  {
    id: 1,
    date: "2023-01-10",
    condition: "Acute bronchitis",
    description:
      "Treated with antibiotics and cough suppressant. Resolved within 2 weeks.",
    documents: [
      {
        type: "Lab report",
        url: "https://example.com/lab-report-1",
        description: "Chest X-ray and blood tests",
      },
    ],
  },
  {
    id: 2,
    date: "2022-06-15",
    provider: "Dr. Jane Smith",
    diagnosis: "Seasonal allergies",
    medication: "Loratadine",
    dosage: "10mg daily",
    notes: "Symptoms improve with medication. Recommend allergy testing.",
  },
  {
    id: 3,
    date: "2021-12-20",
    immunization: "Influenza vaccine",
    notes: "Annual influenza vaccination received.",
  },
  {
    id: 4,
    date: "2020-08-02",
    surgery: "Appendectomy",
    provider: "Dr. Michael Jones",
    hospital: "City General Hospital",
    notes: "Successful laparoscopic surgery. Uneventful recovery.",
    documents: [
      {
        type: "Discharge summary",
        url: "https://example.com/discharge-summary-4",
        description: "Surgery details and post-operative instructions",
      },
    ],
  },
  {
    id: 5,
    date: "2019-05-12",
    familyHistory: "Heart disease, diabetes",
    notes: "Family history documented during initial intake.",
  },
];
