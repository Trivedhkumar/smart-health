import { SLIDE_DATA_TYPE } from "./types";

// error messages
export const ERROR_MESSAGES = {
  // email errors
  provideEmail: "Please provide email",
  validEmail: "Please enter a valid email",
  //   password errors
  providePassword: "Please provide password",
  maxPassword: "Password length should not exceed eight characters",
  // general errors
  minLength: "Please enter atleast three characters",
  requiredField: "This field is required",
  maxLength: "This field should not exceed more than 30 characters",
};
// Menus of different roles
export const PATIENT_MENU = [
  {
    name: "Symptom Checker",
    link: "/symptomchecker",
    id: "symptom_checker",
  },
  {
    name: "Personal Health Records (PHR):",
    link: "/personalhealthrecords",
    id: "personal_health_records",
  },
  {
    name: "Appointment Management",
    link: "/appointmentmanagement",
    id: "appointment_management",
  },
  {
    name: "Community Interaction",
    link: "/communityinteraction",
    id: "community_interaction",
  },
  {
    name: "Prescription Management",
    link: "/prescriptionmanagement",
    id: "prescription_management",
  },
];

export const ADMINISTRATOR_MENU = [
  {
    name: "User Management",
    link: "/usermanagement",
    id: "user_management",
  },
  {
    name: "Healthcare Provider Management",
    link: "/healthcareprovidermanagement",
    id: "healthcare_provider_management",
  },
  {
    name: "System Configuration",
    link: "/systemconfiguration",
    id: "system_configuration",
  },
  {
    name: "Data Oversight",
    link: "/dataoversight",
    id: "data_oversight",
  },
  {
    name: "Report Generation",
    link: "/reportgeneration",
    id: "report_generation",
  },
];
export const PHARMACIST_MENU = [
  {
    name: "Medication Dispensation",
    link: "/medicationdispensation",
    id: "medication_dispensation",
  },
  {
    name: "Medication History",
    link: "/medicationhistory",
    id: "medication_history",
  },
  {
    name: "Communication",
    link: "/communication",
    id: "communication",
  },
];
export const HEALTH_ADMINISTRATOR_MENU = [
  {
    name: "Facility Management",
    link: "/facilitymanagement",
    id: "facility_management",
  },
  {
    name: "Staff Coordination",
    link: "/staffcoordination",
    id: "staff_coordination",
  },
  {
    name: "Compliance Oversight",
    link: "/complianceoversight",
    id: "compliance_oversight",
  },
  {
    name: "Incident Response",
    link: "/incidentresponse",
    id: "incident_response",
  },
];
export const HEALTHCARE_PROVIDERS_MENU = [
  {
    name: "E-Prescriptions",
    link: "/eprescriptions",
    id: "e_prescriptions",
  },
  {
    name: "Appointment Management",
    link: "/appointmentmanagement",
    id: "appointment_management",
  },
  {
    name: "Access to Patient Health Records",
    link: "/accesstopatienthealthrecords",
    id: "access_to_patient_health_records",
  },
  {
    name: "Secure Messaging",
    link: "/",
    id: "secure_messaging",
  },
  {
    name: "Professional Collaboration",
    link: "/",
    id: "professional_collaboration",
  },
  {
    name: "Analytics Dashboard",
    link: "/",
    id: "analytics_dashboard",
  },
];
export const HOME_MENU = [
  {
    name: "HOME",
    link: "/#",
    id: "home",
  },
  {
    name: "SERVICES",
    link: "/#services",
    id: "services",
  },
  {
    name: "ABOUT US",
    link: "/#aboutus",
    id: "about_us",
  },
  {
    name: "CONTACT US",
    link: "/#contactus",
    id: "contact_us",
  },
];
// Roles of users
export const ROLES = {
  HEALTH_ADMINISTRATOR: "health_administrator",
  PHARMACIST: "pharmacist",
  ADMINISTRATOR: "administrator",
  HEALTHCARE_PROVIDERS: "healthcare_providers",
  PATIENT: "patient",
  GUEST: "guest",
};
// Corousel Images
export const SLIDEDATA: SLIDE_DATA_TYPE = [
  {
    image:
      "https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhlYWx0aCUyMGNhcmUlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWx0aCUyMGNhcmUlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoJTIwY2FyZSUyMHN5c3RlbXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhbHRoJTIwY2FyZSUyMHN5c3RlbXxlbnwwfHwwfHx8MA%3D%3D",
  },
];
// SERVICES
export const SERVICE_NAMES = {
  PRIMARY_CARE: "PRIMARY_CARE",
  SPECIALITY: "SPECIALITY",
  DIAGNOSTIC: "DIAGNOSTIC",
  PREVENTATIVE_CARE: "PREVENTATIVE_CARE",
  ADDITIONAL: "ADDITIONAL",
};
export const PRIMARY_CARE_SERVICES = [
  "Routine checkups and physical exams",
  "Immunizations and vaccinations",
  "Management of chronic conditions (e.g., diabetes, high blood pressure)",
  "Minor illness and injury care",
  "Women's health services",
  "Men's health services",
  "Pre-employment and sports physicals",
  "Travel medicine consultations",
];
export const SPECIALITY_SERVICES = [
  "Cardiology",
  "Dermatology",
  "Ear, Nose & Throat (ENT)",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology (OBGYN)",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Urology",
];
export const DIAGNOSTIC_SERVICES = [
  "Laboratory testing",
  "Imaging services (X-rays, ultrasounds, CT scans)",
  "Allergy testing",
  "Sleep studies",
];
export const PREVENTATIVE_CARE_SERVICES = [
  "Cancer screenings",
  "Vaccinations",
  "Nutritional counseling",
  "Fitness programs",
  "Chronic disease management",
];
export const ADDITIONAL_SERVICES = [
  "Telemedicine consultations",
  "Urgent care",
  "Mental health services",
  "Wellness programs",
  "Support groups",
  "Community outreach programs",
];
