import { ForgotPassword, Home, Login, SignUp } from "../routes";
import ErrorPage from "../screens/error/error-page";
// routes
export const ROUTES_ARRAY = [
  // unprotected routes
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  // protected routes
];
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
    title: "Symptom Checker",
    id: "symptom_checker",
  },
  {
    title: "Medication Reminders",
    id: "medication_reminders",
  },
  {
    title: "Personal Health Records (PHR):",
    id: "personal_health_records",
  },
  {
    title: "Appointment Management",
    id: "appointment_management",
  },
  {
    title: "Community Interaction",
    id: "community_interaction",
  },
  {
    title: "Prescription Management",
    id: "prescription_management",
  },
];

export const HEALTHCARE_PROVIDERS_MENU = [
  {
    title: "E-Prescriptions",
    id: "e_prescriptions",
  },
  {
    title: "Appointment Management",
    id: "appointment_management",
  },
  {
    title: "Access to Patient Health Records",
    id: "access_to_patient_health_records",
  },
  {
    title: "Secure Messaging",
    id: "secure_messaging",
  },
  {
    title: "Professional Collaboration",
    id: "professional_collaboration",
  },
  {
    title: "Analytics Dashboard",
    id: "analytics_dashboard",
  },
];
export const ADMINISTRATOR_MENU = [
  {
    title: "User Management",
    id: "user_management",
  },
  {
    title: "Healthcare Provider Management",
    id: "healthcare_provider_management",
  },
  {
    title: "System Configuration",
    id: "system_configuration",
  },
  {
    title: "Data Oversight",
    id: "data_oversight",
  },
  {
    title: "Report Generation",
    id: "report_generation",
  },
];
export const PHARMACIST_MENU = [
  {
    title: "Medication Dispensation",
    id: "medication_dispensation",
  },
  {
    title: "Medication History",
    id: "medication_history",
  },
  {
    title: "Communication",
    id: "communication",
  },
];
export const HEALTH_ADMINISTRATOR_MENU = [
  {
    title: "Facility Management",
    id: "facility_management",
  },
  {
    title: "Staff Coordination",
    id: "staff_coordination",
  },
  {
    title: "Compliance Oversight",
    id: "compliance_oversight",
  },
  {
    title: "Incident Response",
    id: "incident_response",
  },
];
// Roles of users
export const ROLES = {
  HEALTH_ADMINISTRATOR: "health_administrator",
  PHARMACIST: "pharmacist",
  ADMINISTRATOR: "administrator",
  HEALTHCARE_PROVIDERS: "healthcare_providers",
  PATIENT: "patient",
};
// Corousel Images
export const SLIDEDATA = [
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
