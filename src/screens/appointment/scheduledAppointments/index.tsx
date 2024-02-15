import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Select,
  Heading,
} from "@chakra-ui/react";
import { APPOINTMENTS } from "./constants";

const ScheduledAppointments = () => {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({}); // Add filter state

  //   useEffect(() => {
  //     const fetchAppointments = async () => {
  //       setIsLoading(true);
  //       // Replace with your API call to fetch appointments
  //       // Include pagination parameters and filters based on state
  //       const response = await fetch(`/api/appointments?page=${page}`);
  //       const data = await response.json();
  //       setAppointments(data.appointments);
  //       setIsLoading(false);
  //     };
  //     fetchAppointments();
  //   }, [page, filters]); // Update on page change or filter change

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box p={4}>
      <Heading as="h3" size="md">
        Scheduled Appointments
      </Heading>
      {/* Filter options (Select, DatePicker) based on filters state */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date & Time</Th>
            <Th>Doctor</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            {/* Additional headers for other appointment details if needed */}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={5}>
                <Skeleton height="40px" />
              </Td>
            </Tr>
          ) : appointments.length === 0 ? (
            <Tr>
              <Td colSpan={5}>No appointments found.</Td>
            </Tr>
          ) : (
            appointments.map((appointment) => (
              <Tr key={appointment.id}>
                <Td>
                  {appointment.date} {appointment.time}
                </Td>
                <Td>{appointment.doctorName}</Td>
                <Td>{appointment.reason}</Td>
                <Td>{appointment.status}</Td>
                {/* Additional data cells for other appointment details */}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ScheduledAppointments;
