import { v4 as uuidv4 } from "uuid";

export const invoices = [
  {
    id: uuidv4(),
    invoiceNumber: "INV-0001",
    patientName: "John Doe",
    medication: "Amoxicillin (500mg capsule)",
    quantity: 30,
    dispenseDate: "2024-02-22",
    totalAmount: 25.0,
  },
  {
    id: uuidv4(),
    invoiceNumber: "INV-0002",
    patientName: "Jane Smith",
    medication: "Albuterol (inhaler)",
    quantity: 1,
    dispenseDate: "2024-02-23",
    totalAmount: 40.5,
  },
  {
    id: uuidv4(),
    invoiceNumber: "INV-0003",
    patientName: "Michael Brown",
    medication: "Metformin (500mg tablet)",
    quantity: 90,
    dispenseDate: "2024-02-24",
    totalAmount: 12.75,
  },
  // ... add more invoices as needed
];
