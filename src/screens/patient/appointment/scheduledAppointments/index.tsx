import React, { useState } from "react";
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
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
  Textarea,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { APPOINTMENTS } from "./constants";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { DOCTORS } from "../../../home/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
const ScheduledAppointments = () => {
  const [appointments, setAppointments] = useState(APPOINTMENTS);

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
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const toast = useToast();

  const onSubmit = async (values: ValidationSchema) => {
    console.log("values", values);

    // Simulate backend call
    reset();
    onClose();
    toast({
      title: "Appointment Booked",
      description: "We've booked your appointment for you.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const openAppointmentModal = () => {
    onOpen();
  };
  const handleDeleteAppointment = (idText: number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== idText)
    );
  };
  const handleEditAppointment = (idText: number) => {
    openAppointmentModal();
  };
  return (
    <Box p={4}>
      <HStack my={2} alignItems={"center"} justifyContent={"space-between"}>
        <Heading as="h3" size="md">
          Scheduled Appointments
        </Heading>
        <Button
          colorScheme="teal"
          mt={4}
          onClick={openAppointmentModal}
          isLoading={isSubmitting}
          rightIcon={<FaArrowRight />}
        >
          Book a new appointment
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

            {/* Additional headers for other appointment details if needed */}
          </Tr>
        </Thead>
        <Tbody>
          {isSubmitting ? (
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
                <Td>
                  <HStack>
                    <FaEdit
                      cursor={"pointer"}
                      onClick={() => handleEditAppointment(appointment.id)}
                      color="blue"
                    />
                    <FaTrash
                      cursor={"pointer"}
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      color="red"
                    />
                  </HStack>
                </Td>
                {/* Additional data cells for other appointment details */}
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

              <Controller
                control={control}
                name="timestamp"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, error },
                }) => (
                  <FormControl py={4} isInvalid={invalid} id="symptoms">
                    <FormLabel>Select date</FormLabel>
                    <Box mb={4} borderWidth={1} borderRadius={5}>
                      <DatePicker
                        name={name}
                        ref={ref}
                        onChange={onChange}
                        onBlur={onBlur}
                        showIcon
                        selected={value}
                        showTimeSelect
                      />
                    </Box>
                    <FormErrorMessage colorScheme="red">
                      {error && error.message}
                    </FormErrorMessage>
                  </FormControl>
                )}
              />

              <FormControl isInvalid={!!errors.reason}>
                <Textarea
                  {...register("reason")}
                  placeholder="reason for appointment"
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
};

export default ScheduledAppointments;
