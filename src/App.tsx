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
import PersonalHealthRecordsDetailsScreen from "./screens/personalHealthRecordDetails";
import SymptomChecker from "./screens/symptomChecker";
import UserManagementScreen from "./screens/userManagement";
import HealthCareProviderManagement from "./screens/healthCareProviderManagement";
import SystemConfigurationScreen from "./screens/systemConfiguration";
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
];
const router = createBrowserRouter(ROUTES_ARRAY);

export default function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
