import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import MedicationRemainderScreen from "../prescriptionManagement/medicationRemainders";

const MedicationRemainder = () => {
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} spacing={4}>
        <MedicationRemainderScreen />
      </Stack>
    </Box>
  );
};
export default MedicationRemainder;
