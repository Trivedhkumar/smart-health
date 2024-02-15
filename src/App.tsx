import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {
  CommunityInteractionDetailsScreen,
  CommunityInteractionScreen,
  DashboardScreen,
  ErrorPage,
  ForgotPasswordScreen,
  HomeScreen,
  LoginScreen,
  MedicationRemainderScreen,
  SignUpScreen,
} from "./screens";
import AppointmentManagementScreen from "./screens/appointment";
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
  {
    path: "/medicationreminders",
    element: <MedicationRemainderScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/communityinteraction",
    element: <CommunityInteractionScreen />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/appointmentmanagement",
    element: <AppointmentManagementScreen />,
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
