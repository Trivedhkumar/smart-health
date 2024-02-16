import React from "react";
import { Box, Stack } from "@chakra-ui/react";

import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";

import ScheduledAppointments from "./scheduledAppointments";
const AppointmentManagementScreen = () => {
  const userMenu = getMenuItemsByRole(ROLES.PATIENT);

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
