export const ANSWERS = [
  {
    id: 1,
    questionId: 1, // Should match the question being displayed
    author: "Jane Doe",
    body: "I recommend Dr. Smith! They are very knowledgeable and patient.",
    timestamp: new Date("2024-02-16T00:00:00Z"),
  },
  {
    id: 2,
    questionId: 1, // Same question
    author: "John Smith",
    body: "I've had good experiences with the clinic on Maple Street.",
    timestamp: new Date("2024-02-13T00:00:00Z"),
  },
  {
    id: 3,
    questionId: 2, // Different question
    author: "Alice Johnson",
    body: "I use a combination of diet and exercise to manage my health. There are many resources online and in libraries.",
    timestamp: new Date("2024-02-15T00:00:00Z"),
  },
  {
    id: 4,
    questionId: 3, // Another question
    author: "Anonymous",
    body: "Contacting your local government representatives or healthcare organizations might be helpful.",
    timestamp: new Date("2024-02-14T00:00:00Z"),
  },
  // Add more answers for different questions as needed
];
