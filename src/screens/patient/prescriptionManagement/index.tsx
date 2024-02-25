import React from "react";
import {
  Box,
  Button,
  Stack,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";

import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { ROLES } from "../../../constants";
import ScheduledAppointments from "../appointment/scheduledAppointments";
import { MEDICATIONS } from "./constants";
import MedicationRemainderScreen from "./medicationRemainders";
import PrescriptionTable from "../../../components/prescriptionTable";
interface Props {
  navbar?: boolean;
}
const PrescriptionManagementScreen = ({ navbar = true }: Props) => {
  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));

  const toast = useToast();
  const handleRefillPress = () => {
    toast({
      title: "Refill request sent",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Box>
      {navbar && <NavBar menuarray={userMenu} />}
      <Stack width={"90%"} margin="auto">
        <Tabs>
          <TabList>
            <Tab>Medications List</Tab>
            <Tab>Adherence Alerts</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <PrescriptionTable handleRefillPress={handleRefillPress} />
            </TabPanel>
            <TabPanel>
              <MedicationRemainderScreen />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Box>
  );
};

export default PrescriptionManagementScreen;
