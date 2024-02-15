import React, { useState } from "react";
import {
  Box,
  Heading,
  Select,
  Input,
  Button,
  Toast,
  Stack,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { NavBar } from "../../components";
import { getMenuItemsByRole } from "../../utils/functions";
import { ROLES } from "../../constants";
import { DOCTORS } from "../home/constants";
import ScheduledAppointments from "./scheduledAppointments";
const AppointmentManagementScreen = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const handleDoctorChange = (e) => setSelectedDoctor(e.target.value);
  const handleDateChange = (date) => setSelectedDate(date);
  const handleTimeChange = (e) => setSelectedTime(e.target.value);
  const handleSubmit = async () => {
    setIsLoading(true); // Simulate backend call
    // Replace with your booking logic and data validation
    if (selectedDoctor && selectedDate && selectedTime) {
      setIsBooked(true);
    } else {
      // Handle errors
    }
    setIsLoading(false);
  };
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
        <Heading as="h3" size="md">
          Schedule Appointment
        </Heading>
        <Select
          placeholder="Select Doctor"
          value={selectedDoctor}
          onChange={handleDoctorChange}
          mb={4}
        >
          {DOCTORS.map((doctor) => (
            <option value={doctor.name}>{doctor.name}</option>
          ))}
        </Select>

        <Box borderWidth={1} borderRadius={5}>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
          />
        </Box>
        {selectedDate && (
          <Box mt={4}>
            <Button
              colorScheme="teal"
              mt={4}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Book Appointment
            </Button>
          </Box>
        )}
        {isBooked && (
          <Toast title="Appointment Booked!" status="success" duration={5000} />
        )}
        <ScheduledAppointments />
      </Stack>
    </Box>
  );
};

export default AppointmentManagementScreen;
