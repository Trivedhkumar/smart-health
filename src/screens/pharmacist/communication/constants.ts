import { ROLES } from "../../../constants";
import { v4 as uuidv4 } from "uuid";

export const messages = [
  // Replace with actual message data

  {
    id: uuidv4(),
    sender: "You",
    message: "Hi John, your prescription is ready for pickup.",

    timestamp: "25/02/2024, 01:07:23",
    role: ROLES.PHARMACIST,
  },
  {
    id: uuidv4(),
    sender: "Patient",
    message: "Thank you, I will be there shortly.",

    timestamp: "25/02/2024, 14:07:49",
    role: ROLES.PATIENT,
  },
  // ... add more messages
];
