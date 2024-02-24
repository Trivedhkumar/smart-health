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

import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";
import ScheduledAppointments from "../appointment/scheduledAppointments";
import { MEDICATIONS } from "./constants";
import MedicationRemainderScreen from "../medicationRemainders";

const PrescriptionManagementScreen = () => {
  const userMenu = getMenuItemsByRole(ROLES.PATIENT);
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
      <NavBar menuarray={userMenu} />
      <Stack width={"90%"} margin="auto">
        <Tabs>
          <TabList>
            <Tab>Medications List</Tab>
            <Tab>Adherence Alerts</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Dosage</Th>
                      <Th>Frequency</Th>
                      <Th>Next refill date</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {MEDICATIONS.map((medication, index) => (
                      <Tr key={medication.name + index.toString()}>
                        <Td>{medication.name}</Td>
                        <Td>{medication.dosage ?? "N/A"}</Td>
                        <Td>{medication.frequency ?? "N/A"}</Td>
                        <Td>{medication.nextRefillDate ?? "N/A"}</Td>
                        <Td>
                          <Button
                            colorScheme={"teal"}
                            onClick={handleRefillPress}
                          >
                            Refill
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Dosage</Th>
                      <Th>Frequency</Th>
                      <Th>Next refill date</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
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
