import {
  Box,
  Button,
  chakra,
  Heading,
  HStack,
  ListItem,
  OrderedList,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { NavBar } from "../../components";
import { ROLES } from "../../constants";
import { getMenuItemsByRole } from "../../utils/functions";
import { ACTIVE_PRESCRITIONS } from "./constants";
import { IoMdRefreshCircle } from "react-icons/io";
const MedicationRemainderScreen = () => {
  const [activePrescription, setActivePrescription] = useState(
    ACTIVE_PRESCRITIONS ?? []
  );
  const idsRef = useRef([]);
  const [timeSelected, setTimeSelected] = useState("");
  const userMenu = getMenuItemsByRole(ROLES.PATIENT);
  const toast = useToast();
  const handleTimeSelect = (event) => {
    setTimeSelected(event.target.value);
  };
  const ChIoMdRefreshCircle = chakra(IoMdRefreshCircle);
  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser doesn't support web notifications.");
      return;
    }
    if (Notification.permission === "granted") {
      return; // Permission already granted
    } else if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted!");
      } else {
        alert("Please enable notifications to receive updates.");
      }
    }
  };
  const handleButtonClick = async (id: number) => {
    toast({
      title: "Reminder added!",
      duration: 3000,
      status: "info",
      position: "top",
      isClosable: true,
    });
    toggleSetRemainder(id);
    const item = activePrescription.find((prescription) =>
      prescription.id === id
        ? { ...prescription, remainderSet: !prescription.remainderSet }
        : null
    );
    if (!item) {
      return alert("No such item");
    }

    const selectedTime = Number(timeSelected); // Extract number from '15min'
    const delay = selectedTime * 60 * 1000; // Convert to milliseconds
    const arr = activePrescription.map((prescription) =>
      prescription.id === id
        ? { ...prescription, remainderSet: true }
        : prescription
    );
    setActivePrescription(arr);

    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      idsRef.current = [...idsRef.current, id];

      showNotification("Reminder!", {
        body: ` Don't forget to take your medication: ${item.medication}`,
      });
    } catch (error) {
      console.error("Error during notification:", error);
      toast({
        title: "Error!",
        description: "An error occurred. Please try again.",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };
  const showNotification = (title, options = {}) => {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, options);
      // Handle notification clicks for additional actions
      notification.onclick = () => {
        // Open a specific app page, redirect to an external URL, etc.
      };
    }
  };

  const enableNotifysAndClose = async (id: number) => {
    await requestPermission();
  };
  const toggleSetRemainder = (id: number) => {
    enableNotifysAndClose(id);
  };
  const refreshButtons = () => {
    const arr = activePrescription.map((prescription) =>
      idsRef.current.includes(prescription.id)
        ? { ...prescription, remainderSet: false }
        : prescription
    );
    idsRef.current = [];
    setActivePrescription(arr);
  };
  return (
    <Box>
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as={"h3"} size="md">
          Active Prescriptions
        </Heading>
        <OrderedList spacing={3}>
          <Text>Remind Me In:</Text>
          <HStack>
            <Select value={timeSelected} onChange={handleTimeSelect}>
              <option value="">Select Reminder Time</option>
              <option value="1">1 Minute</option>
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="180">3 Hours</option>
              <option value="360">6 Hours</option>
            </Select>
            <ChIoMdRefreshCircle onClick={refreshButtons} color={"teal"} />
          </HStack>
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
                  isDisabled={!timeSelected || prescription.remainderSet}
                  onClick={() => handleButtonClick(prescription.id)}
                  colorScheme={"blue"}
                >
                  Set Remainder
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
