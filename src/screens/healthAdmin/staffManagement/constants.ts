import { v4 as uuidv4 } from "uuid";

export const staffData = [
  // Replace with actual staff data
  {
    id: uuidv4(),
    name: "John Doe",
    role: "Doctor",
    department: "Cardiology",
    permissions: [
      {
        label: "View Patient Records",
        value: "view_patient_records",
      },
      {
        label: "Create Prescriptions",
        value: "create_prescriptions",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Jane Smith",
    role: "Nurse",
    department: "Emergency Room",
    permissions: [
      {
        label: "View Patient Records",
        value: "view_patient_records",
      },
      {
        label: "Administer Medications",
        value: "administer_medications",
      },
    ],
  },
  // ... add more staff data
];
export const roles = [
  { id: uuidv4(), label: "Doctor", value: "doctor" },
  { id: uuidv4(), label: "Nurse", value: "nurse" },
  { id: uuidv4(), label: "Pharmacist", value: "pharmacist" },
  { id: uuidv4(), label: "Receptionist", value: "receptionist" },
  { id: uuidv4(), label: "Administrator", value: "administrator" },
];

export const departments = [
  { id: uuidv4(), label: "Cardiology", value: "cardiology" },
  { id: uuidv4(), label: "Emergency Room", value: "emergency_room" },
  { id: uuidv4(), label: "Pharmacy", value: "pharmacy" },
  { id: uuidv4(), label: "Reception", value: "reception" },
  { id: uuidv4(), label: "Management", value: "management" },
  { id: uuidv4(), label: "Pathology", value: "pathology" },
  { id: uuidv4(), label: "Radiology", value: "radiology" },
  { id: uuidv4(), label: "Anesthesiology", value: "anesthesiology" },
  { id: uuidv4(), label: "Surgery", value: "surgery" },
];
export const permissions = [
  { label: "View Patient Records", value: "view_patient_records" },
  { label: "Create Prescriptions", value: "create_prescriptions" },
  { label: "Administer Medications", value: "administer_medications" },
  { label: "Manage Appointments", value: "manage_appointments" },
  { label: "Edit Patient Information", value: "edit_patient_information" },
  { label: "Manage Inventory", value: "manage_inventory" },
  { label: "Generate Reports", value: "generate_reports" },
  { label: "Manage Users", value: "manage_users" },
];
