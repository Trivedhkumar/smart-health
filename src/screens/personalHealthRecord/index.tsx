import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { NavBar } from "../../components";
import ScheduledAppointments from "../appointment/scheduledAppointments";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";
import MedicalHistory from "../medicalHistory";

const PersonalHealthRecordScreen = () => {
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
        <MedicalHistory />
        <ScheduledAppointments />
      </Stack>
    </Box>
  );
};

export default PersonalHealthRecordScreen;
