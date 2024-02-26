import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  AppointmentManagementScreen,
  CommunityInteractionDetailsScreen,
  CommunityInteractionScreen,
  DashboardScreen,
  ErrorPage,
  ForgotPasswordScreen,
  HomeScreen,
  LoginScreen,
  PersonalHealthRecordScreen,
  PrescriptionManagementScreen,
  SignUpScreen,
} from "./screens";
import PersonalHealthRecordsDetailsScreen from "./screens/patient/personalHealthRecord/personalHealthRecordDetails";
import SymptomChecker from "./screens/patient/symptomChecker";
import UserManagementScreen from "./screens/admin/userManagement";
import HealthCareProviderManagement from "./screens/admin/healthCareProviderManagement";
import SystemConfigurationScreen from "./screens/admin/systemConfiguration";
import DataOverSightScreen from "./screens/admin/dataOversight";
import ReportGeneration from "./screens/admin/reportGeneration";
import MedicationDispenseScreen from "./screens/pharmacist/medicationDispense";
import MedicationHistory from "./screens/pharmacist/medicalHistory";
const ROUTES_ARRAY = [
  {
    path: "/login",
    element: <LoginScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <HomeScreen />,
    errorElement: <ErrorPage />,
  },
  // protected routes
  {
    path: "/dashboard",
    element: <DashboardScreen />,
    errorElement: <ErrorPage />,
  },
  // patient
  {
    path: "/symptomchecker",
    element: <SymptomChecker />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/communityinteraction",
    element: <CommunityInteractionScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/communityinteraction/:questionId",
    element: <CommunityInteractionDetailsScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/appointmentmanagement",
    element: <AppointmentManagementScreen />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/personalhealthrecords",
    element: <PersonalHealthRecordScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/personalhealthrecords/:id",
    element: <PersonalHealthRecordsDetailsScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/prescriptionmanagement",
    element: <PrescriptionManagementScreen />,
    errorElement: <ErrorPage />,
  },
  // admin
  {
    path: "/usermanagement",
    element: <UserManagementScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/healthcareprovidermanagement",
    element: <HealthCareProviderManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/systemconfiguration",
    element: <SystemConfigurationScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dataoversight",
    element: <DataOverSightScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reportgeneration",
    element: <ReportGeneration />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/medicationdispensation",
    element: <MedicationDispenseScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/medicationhistory",
    element: <MedicationHistory />,
    errorElement: <ErrorPage />,
  },
];
const router = createBrowserRouter(ROUTES_ARRAY);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
