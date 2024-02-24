import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Input,
  Text,
  Button,
  HStack,
  Heading,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  ModalFooter,
  useToast,
  Select,
} from "@chakra-ui/react";
import { RECORDS } from "./constants";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { DOCTORS } from "../home/constants";
const validationSchema = z.object({
  doctor: z.string().min(1, { message: "Please select a doctor" }),
  timestamp: z.date(),
  reason: z.string().min(1, { message: "Please enter a reason" }),
});
type ValidationSchema = z.infer<typeof validationSchema>;
const defaultFormValues = {
  doctor: "",
  timestamp: new Date(),
  reason: "",
};
function MedicalHistory() {
  const [records, setRecords] = useState(RECORDS);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    register,
  } = useForm<ValidationSchema>({
    mode: "onBlur",
    defaultValues: defaultFormValues,
    resolver: zodResolver(validationSchema),
  });
  const addRecord = () => {
    // Implement logic to add a new record
  };
  const handleDeleteAppointment = (idText: number) => {
    setRecords(records.filter((record) => record.id !== idText));
  };
  const handleEditAppointment = (idText: number) => {
    openAppointmentModal();
  };
  const toast = useToast();
  const onSubmit = async (values: ValidationSchema) => {
    console.log("values", values);

    // Simulate backend call
    reset();
    onClose();
    toast({
      title: "Appointment Booked",
      description: "We've booked your record for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const openAppointmentModal = () => {
    onOpen();
  };
  return (
    <Box p={4}>
      <HStack my={2} alignItems={"center"} justifyContent={"space-between"}>
        <Heading as="h3" size="md">
          Scheduled records
        </Heading>
        <Button
          colorScheme="teal"
          mt={4}
          onClick={openAppointmentModal}
          isLoading={isSubmitting}
          rightIcon={<FaArrowRight />}
        >
          Book a new record
        </Button>
      </HStack>
      {/* Filter options (Select, DatePicker) based on filters state */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date & Time</Th>
            <Th>Doctor</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Actions</Th>

            {/* Additional headers for other record details if needed */}
          </Tr>
        </Thead>
        <Tbody>
          {isSubmitting ? (
            <Tr>
              <Td colSpan={5}>
                <Skeleton height="40px" />
              </Td>
            </Tr>
          ) : records.length === 0 ? (
            <Tr>
              <Td colSpan={5}>No records found.</Td>
            </Tr>
          ) : (
            records.map((record) => (
              <Tr key={record.id}>
                {/* <Td>
                  {record.date} {record.some}
                </Td>
                <Td>{record.doctorName}</Td>
                <Td>{record.reason}</Td>
                <Td>{record.status}</Td> */}
                <Td>
                  <HStack>
                    <FaEdit
                      onClick={() => handleEditAppointment(record.id)}
                      color="blue"
                    />
                    <FaTrash
                      onClick={() => handleDeleteAppointment(record.id)}
                      color="red"
                    />
                  </HStack>
                </Td>
                {/* Additional data cells for other record details */}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Schedule Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl isInvalid={!!errors.doctor}>
                <Select
                  {...register("doctor")}
                  name="doctor"
                  placeholder="Select Doctor"
                  mb={4}
                >
                  {DOCTORS.map((doctor) => (
                    <option value={doctor.name}>{doctor.name}</option>
                  ))}
                </Select>
                <FormErrorMessage colorScheme="red">
                  {errors.doctor && errors.doctor.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.reason}>
                <Textarea
                  {...register("reason")}
                  placeholder="reason for record"
                  name="reason"
                />
                <FormErrorMessage colorScheme="red">
                  {errors.reason && errors.reason.message}
                </FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              onClick={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
            >
              Book Appointment
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default MedicalHistory;
