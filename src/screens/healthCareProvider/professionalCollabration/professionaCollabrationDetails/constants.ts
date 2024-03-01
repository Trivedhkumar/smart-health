import { v4 as uuidv4 } from "uuid";
import { ROLES } from "../../../../constants";

export const messages = [
  // Replace with actual message data

  {
    id: uuidv4(),
    sender: "John",
    message:
      "Absolutely, Dr. Doe. I agree that tailoring treatment for elderly patients is crucial. Early diagnosis, medication adjustments, and addressing comorbidities are key factors.",

    timestamp: "25/02/2024, 14:07:49",
    role: ROLES.PATIENT,
  },
  // ... add more messages
];
