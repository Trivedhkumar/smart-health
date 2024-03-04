import { ROLES } from "../../../constants";
import { v4 as uuidv4 } from "uuid";

export const messagesData = [
  // Replace with actual message data

  {
    id: uuidv4(),
    sender: "You",
    message: "Hi John, I need some advice on medication.",

    timestamp: "25/02/2024, 01:07:23",
    role: ROLES.PHARMACIST,
  },
  {
    id: uuidv4(),
    sender: "Healthcare Provider",
    message: "Sure, How can I help you?.",

    timestamp: "25/02/2024, 14:07:49",
    role: ROLES.HEALTHCARE_PROVIDERS,
  },
  // ... add more messages
];
