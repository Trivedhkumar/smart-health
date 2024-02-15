import {
  Box,
  Button,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavBar } from "../../components";
import { ROLES } from "../../constants";
import { getMenuItemsByRole } from "../../utils/functions";
import { ACTIVE_PRESCRITIONS } from "./constants";
const MedicationRemainderScreen = () => {
  const [activePrescription, setActivePrescription] = useState(
    ACTIVE_PRESCRITIONS ?? []
  );
  const [userResponded, setUserResponded] = useState(false);
  const userMenu = getMenuItemsByRole(ROLES.PATIENT);
  const notifyUser = async (
    notificationText = "Your reminder will be notified"
  ) => {
    if (!("Notification" in window)) {
      alert("Browser does not support notifications");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(notificationText);
    } else if (Notification.permission !== "denied") {
      await Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(notificationText);
        }
      });
    }
  };

  const enableNotifysAndClose = async () => {
    setUserResponded(true);
    await notifyUser();
  };
  const disableNotifysAndClose = () => {
    setUserResponded(true);
  };
  const toggleSetRemainder = (id: number) => {
    if (!userResponded && !(Notification.permission === "granted")) {
      enableNotifysAndClose();
    } else {
      disableNotifysAndClose();
    }
    const arr = activePrescription.map((prescription) =>
      prescription.id === id
        ? { ...prescription, remainderSet: !prescription.remainderSet }
        : prescription
    );
    setActivePrescription(arr);
  };
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
        <Heading as={"h3"} size="md">
          Active Prescriptions
        </Heading>
        <OrderedList spacing={3}>
          {activePrescription.map((prescription) => (
            <ListItem>
              <HStack
                justifyContent={"space-between"}
                px={4}
                py={2}
                borderWidth={1}
              >
                <Text>{prescription.medication}</Text>

                <Button
                  onClick={() => toggleSetRemainder(prescription.id)}
                  colorScheme={prescription.remainderSet ? "red" : "blue"}
                >
                  {prescription.remainderSet
                    ? "Delete Remainder"
                    : "Set Remainder"}
                </Button>
              </HStack>
            </ListItem>
          ))}
        </OrderedList>
      </Stack>
    </Box>
  );
};
export default MedicationRemainderScreen;
