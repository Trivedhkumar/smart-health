import React from "react";
import { Box, Stack } from "@chakra-ui/react";

import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";

import ScheduledAppointments from "./scheduledAppointments";
const AppointmentManagementScreen = () => {
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={"70%"}
        margin={"auto"}
        spacing={4}
      >
        <ScheduledAppointments />
      </Stack>
    </Box>
  );
};

export default AppointmentManagementScreen;
