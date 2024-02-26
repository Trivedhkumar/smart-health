import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Stack,
  Center,
  VStack,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { FaInfo } from "react-icons/fa";
import { NavBar } from "../../../components";
import { getMenuItemsByRole } from "../../../utils/functions";
import { medicationHistory } from "./constants";

const MedicationHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(medicationHistory);

  const handleChange = (event) => {
    console.log(event.target.value.toLowerCase());

    setSearchTerm(event.target.value.toLowerCase()); // Search should be case-insensitive
    const filtered = medicationHistory.filter((entry) => {
      const searchString = event.target.value.toLowerCase();
      return (
        entry.date.includes(searchString) ||
        entry.medication.toLowerCase().includes(searchString) ||
        entry.prescriber.toLowerCase().includes(searchString)
      );
    });

    setFilteredData(filtered);
    console.log("filtered", filtered);
  };

  const userMenu = getMenuItemsByRole(localStorage.getItem("user"));
  console.log("rerender");

  return (
    <Box>
      <NavBar menuarray={userMenu} />
      <Stack maxWidth={"90%"} margin={"auto"} spacing={4}>
        <Heading as="h1" mb={4}>
          Medication History
        </Heading>

        <Box display="flex" alignItems="center" mb={4}>
          <Input
            placeholder="Search by name, medication, or date"
            value={searchTerm}
            onChange={handleChange}
          />
        </Box>

        {/* Add patient selection if applicable */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Medication</Th>
              <Th>Dosage</Th>
              <Th>Prescriber</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((entry) => (
              <Tr key={entry.id}>
                <Td>{entry.date}</Td>
                <Td>{entry.medication}</Td>
                <Td>{entry.dosage}</Td>
                <Td>{entry.prescriber}</Td>
                <Td>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        colorScheme={"teal"}
                        aria-label="info"
                        icon={<FaInfo />}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>{entry.medication}</PopoverHeader>
                      <PopoverBody>{entry.description}</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Box>
  );
};

export default MedicationHistory;
